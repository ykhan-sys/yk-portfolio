---
title: "Active Directory Monitoring Setup: RC4 Events"
date: "2026-06-06"
description: "A comprehensive guide on tracking down legacy RC4 encryption usage in Active Directory using Windows Event Forwarding and AWS CloudWatch."
tags: ["Active Directory", "Security", "AWS"]
---

## Introduction

As organizations move toward Zero Trust, eliminating legacy encryption protocols like RC4 in Active Directory is critical. Microsoft has strongly advised against using RC4, but disabling it blindly can cause massive outages if legacy systems still depend on it.

This guide covers how to set up monitoring to identify exactly which service accounts and devices are still negotiating RC4 tickets before you flip the kill switch.

## Prerequisites

Before we begin, ensure you have the following:
1. Domain Admin access (or equivalent) to configure Group Policy.
2. A centralized log aggregation system (we will use AWS CloudWatch Logs in this example).
3. Windows Server 2016 or higher Domain Controllers.

## Step 1: Enable Kerberos Auditing via GPO

By default, Active Directory does not log the encryption type used in Kerberos tickets. We need to enable advanced auditing.

1. Open **Group Policy Management Console (GPMC)**.
2. Edit the **Default Domain Controllers Policy**.
3. Navigate to: `Computer Configuration -> Policies -> Windows Settings -> Security Settings -> Advanced Audit Policy Configuration -> Audit Policies -> Account Logon`.
4. Enable **Audit Kerberos Authentication Service** and **Audit Kerberos Service Ticket Operations** for both `Success` and `Failure`.

## Step 2: The Event IDs to Watch

Once auditing is enabled, your Domain Controllers will start generating `Event ID 4768` (TGT Request) and `Event ID 4769` (Service Ticket Request).

We are specifically looking for the `Ticket Encryption Type` field within these events.

### The Magic Number: 0x17

The encryption types map to hexadecimal codes:
- **0x12**: AES256-CTS-HMAC-SHA1-96 (Good)
- **0x11**: AES128-CTS-HMAC-SHA1-96 (Good)
- **0x17**: RC4-HMAC (Bad)

If you see `0x17`, it means the client or the service requested RC4.

## Step 3: Forwarding Events to AWS CloudWatch

To analyze this at scale, we'll install the AWS CloudWatch agent on the DCs and configure it to push these specific events.

Create a `amazon-cloudwatch-agent.json` config:

```json
{
  "logs": {
    "logs_collected": {
      "windows_events": {
        "collect_list": [
          {
            "event_name": "Security",
            "event_levels": ["INFORMATION"],
            "event_format": "xml",
            "log_group_name": "/ad/kerberos-tickets",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
```

## Step 4: Building the CloudWatch Insight Query

Now that the logs are in AWS, we can use CloudWatch Logs Insights to build a hit-list of RC4 offenders.

Navigate to CloudWatch > Logs Insights and run this query against your `/ad/kerberos-tickets` log group:

```sql
fields @timestamp, EventData.TargetUserName, EventData.IpAddress, EventData.TicketEncryptionType
| filter EventID = 4769 and EventData.TicketEncryptionType = "0x17"
| stats count(*) as TicketCount by EventData.TargetUserName, EventData.IpAddress
| sort TicketCount desc
```

### Analyzing the Results

The query will output a table of users/services and the IP addresses they are connecting from. 

## Conclusion

With this data, you can systematically track down the legacy applications, update their configurations to support AES, and safely disable RC4 at the domain level without causing a resume-generating event.
