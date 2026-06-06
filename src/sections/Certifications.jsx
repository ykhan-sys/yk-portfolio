import { Award } from "lucide-react";

export const Certifications = () => {
  const certifications = [
    "AWS Certified SysOps Administrator",
    "Microsoft Certified Azure Solutions Architect Expert",
    "GCP Certified Associate Cloud Engineer",
    "Microsoft Certified Azure Administrator",
    "Red Hat Certified Engineer (RHCE)",
    "Red Hat Certified System Administrator (RHCSA)",
    "CKA - Certified Kubernetes Administrator",
    "GCP - Gen AI Leader",
    "IBM Certified DB2 DBA 10.1 LUW",
  ];

  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-primary glow-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognized industry credentials across major cloud providers and enterprise systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl flex items-start gap-4 hover:glass-strong transition-all duration-300 group"
            >
              <div className="flex-shrink-0 mt-1">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cert}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
