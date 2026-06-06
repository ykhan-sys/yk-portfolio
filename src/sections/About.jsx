import { Activity, Clock, DollarSign, ShieldCheck, Users, Server } from "lucide-react";

export const About = () => {
  const achievements = [
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "80% Faster Deployments",
      description: "Reduced infrastructure deployment time through automated Terraform modules and CI/CD pipelines.",
    },
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      title: "99.9% Uptime",
      description: "Achieved across all managed environments through robust monitoring and automated remediation.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-primary" />,
      title: "25% Cost Reduction",
      description: "Implemented cost optimization strategies resulting in a significant reduction in AWS spending.",
    },
    {
      icon: <Server className="w-6 h-6 text-primary" />,
      title: "30+ Migrations",
      description: "Successfully migrated legacy applications to cloud-native architectures.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "SOC 2 & ISO 27001",
      description: "Established a robust security compliance framework meeting stringent enterprise requirements.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Led 8 Engineers",
      description: "Led a cross-functional team in delivering complex multi-account AWS implementations.",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Key <span className="text-primary glow-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Delivering scalable, secure, and cost-effective cloud infrastructure solutions for enterprise organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl hover:glass-strong transition-all duration-300 group"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface glow-border">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
