import { CheckCircle2 } from "lucide-react";

export const Experience = () => {
  const experiences = [
    "Architected and implemented enterprise-scale AWS Landing Zone using AWS Control Tower and Customizations for Control Tower (CfCT), managing 50+ AWS accounts across multiple organizational units with automated governance and compliance",
    "Developed comprehensive Infrastructure as Code (IaC) solutions using Terraform and CloudFormation, creating reusable modules for network, security, monitoring, and application infrastructure components",
    "Built and maintained automated AMI pipeline using AWS EC2 Image Builder, Packer, and Terraform, delivering standardized golden images for RHEL 7/8, Amazon Linux 2, and Windows Server 2022 across multiple regions",
    "Implemented multi-region Active Directory deployment and management using CloudFormation templates, supporting global infrastructure requirements across US, Europe, and Asia-Pacific regions",
    "Designed and deployed AWS AppStream 2.0 infrastructure for secure application streaming, managing user access and session monitoring with automated usage reporting",
    "Established centralized logging and monitoring solutions using AWS CloudWatch, OpenSearch, and custom dashboards, providing real-time visibility across all managed accounts",
    "Implemented comprehensive security controls including AWS Config rules, GuardDuty, Security Hub, Macie, and IAM Access Analyzer with automated remediation workflows",
    "Developed CI/CD pipelines using AWS CodePipeline, CodeBuild, and CodeCommit for automated infrastructure deployment and application delivery",
    "Created disaster recovery and backup solutions using AWS Backup, cross-region replication, and automated failover mechanisms",
    "Managed network infrastructure including VPC design, Transit Gateway, VPN connections, and AWS Network Firewall with centralized security policies",
  ];

  return (
    <section id="experience" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-primary glow-text">Experience</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border"></div>

          {/* DXC Technology Role */}
          <div className="relative pl-8 md:pl-24 py-6 group">
            {/* Timeline Dot */}
            <div className="absolute left-[-4px] md:left-[28px] top-8 w-3 h-3 rounded-full bg-primary glow-border"></div>
            
            <div className="glass p-8 rounded-2xl group-hover:glass-strong transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Senior Cloud Infrastructure Engineer</h3>
                  <p className="text-lg text-primary">DXC Technology (Project – CES)</p>
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface text-sm border border-border">
                  2022 - Present
                </div>
              </div>

              <ul className="space-y-4">
                {experiences.map((exp, index) => (
                  <li key={index} className="flex gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
