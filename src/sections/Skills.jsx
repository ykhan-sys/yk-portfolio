export const Skills = () => {
  const skillCategories = [
    {
      title: "Cloud Platforms",
      skills: ["AWS Control Tower", "AWS Organizations", "AWS SSO", "AWS Config", "GuardDuty", "Security Hub"]
    },
    {
      title: "Infrastructure as Code",
      skills: ["Terraform", "CloudFormation", "AWS CDK"]
    },
    {
      title: "Automation & CI/CD",
      skills: ["AWS CodePipeline", "AWS CodeBuild", "AWS CodeCommit", "GitHub Actions"]
    },
    {
      title: "Configuration Management",
      skills: ["Packer", "AWS Systems Manager", "EC2 Image Builder"]
    },
    {
      title: "Monitoring & Logging",
      skills: ["CloudWatch", "OpenSearch", "AWS X-Ray", "CloudTrail"]
    },
    {
      title: "Security & Networking",
      skills: ["IAM", "Macie", "Network Firewall", "VPC", "Transit Gateway", "Route 53", "ALB", "NLB"]
    },
    {
      title: "Containers & Storage",
      skills: ["Amazon ECS", "ECR", "Docker", "S3", "EFS", "EBS"]
    },
    {
      title: "Databases & Scripting",
      skills: ["RDS", "DynamoDB", "Python", "Bash", "PowerShell"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary glow-text">Skills</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl hover:glass-strong transition-all">
              <h3 className="text-lg font-bold mb-4 text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1 text-sm rounded-full bg-surface text-muted-foreground border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
