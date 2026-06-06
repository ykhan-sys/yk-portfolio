import { Shield, MonitorSmartphone } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "AWS Titanium",
      description: "Enterprise AWS Landing Zone with automated governance, security controls, and compliance monitoring across 50+ accounts.",
      icon: <Shield className="w-8 h-8 text-primary" />,
    },
    {
      title: "AppStream Implementation",
      description: "Secure application streaming platform for remote workforce enablement.",
      icon: <MonitorSmartphone className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project <span className="text-primary glow-text">Highlights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of major initiatives and architectural implementations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="glass p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-surface/50 glow-border">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
