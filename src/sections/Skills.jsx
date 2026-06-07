import { useRef, useEffect } from "react";

const skillList = [
  "AWS Control Tower", "AWS Organizations", "AWS SSO", "AWS Config",
  "GuardDuty", "Security Hub", "Terraform", "CloudFormation", "AWS CDK",
  "AWS CodePipeline", "AWS CodeBuild", "AWS CodeCommit", "GitHub Actions",
  "Packer", "AWS Systems Manager", "EC2 Image Builder",
  "CloudWatch", "OpenSearch", "AWS X-Ray", "CloudTrail",
  "IAM", "Macie", "Network Firewall", "VPC", "Transit Gateway",
  "Route 53", "ALB", "NLB", "Amazon ECS", "ECR", "Docker",
  "S3", "EFS", "EBS", "RDS", "DynamoDB", "Python", "Bash", "PowerShell",
];

export const Skills = () => {
  const containerRef = useRef(null);
  const skillRefs = useRef([]);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const init = () => {
      const W = container.offsetWidth;
      const H = container.offsetHeight;
      const count = skillList.length;

      // Grid-based placement with jitter for even spread
      const cols = Math.ceil(Math.sqrt(count * (W / H)));
      const rows = Math.ceil(count / cols);
      const cellW = W / cols;
      const cellH = H / rows;

      particlesRef.current = skillRefs.current.filter(Boolean).map((el, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const elW = el.offsetWidth;
        const elH = el.offsetHeight;

        const x = Math.max(0, Math.min(W - elW,
          cellW * col + (cellW - elW) / 2 + (Math.random() - 0.5) * cellW * 0.4
        ));
        const y = Math.max(0, Math.min(H - elH,
          cellH * row + (cellH - elH) / 2 + (Math.random() - 0.5) * cellH * 0.4
        ));

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;

        return {
          el, x, y, w: elW, h: elH,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        };
      });

      const pts = particlesRef.current;

      const animate = () => {
        animRef.current = requestAnimationFrame(animate);
        const W = container.offsetWidth;
        const H = container.offsetHeight;
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // ── 1. Particle ↔ Particle collision separation ──────────────────
        const GAP = 10; // minimum gap between pills in px
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i];
            const b = pts[j];
            const cax = a.x + a.w / 2;
            const cay = a.y + a.h / 2;
            const cbx = b.x + b.w / 2;
            const cby = b.y + b.h / 2;
            const dx = cax - cbx;
            const dy = cay - cby;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
            // Min centre-to-centre = average half-widths + gap
            const minDist = (a.w + b.w) / 2 + GAP;

            if (dist < minDist) {
              const overlap = (minDist - dist) / minDist;
              const force = overlap * 0.45;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              a.vx += fx; a.vy += fy;
              b.vx -= fx; b.vy -= fy;
            }
          }
        }

        // ── 2. Per-particle forces ────────────────────────────────────────
        pts.forEach((p) => {
          const cx = p.x + p.w / 2;
          const cy = p.y + p.h / 2;

          // Mouse orbital swirl
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;

          if (dist < 180) {
            if (dist < 45) {
              // Inner zone: gentle push away
              const f = ((45 - dist) / 45) * 0.35;
              p.vx += (dx / dist) * f;
              p.vy += (dy / dist) * f;
            } else {
              // Orbital band: tangential force → swirling
              const strength = ((180 - dist) / 180) * 0.22;
              p.vx += (-dy / dist) * strength;
              p.vy += (dx / dist) * strength;
            }
          }

          // Very gentle centre gravity keeps them spread across the whole canvas
          const toCX = W / 2 - cx;
          const toCY = H / 2 - cy;
          const cDist = Math.sqrt(toCX * toCX + toCY * toCY) || 0.01;
          if (cDist > 60) {
            p.vx += (toCX / cDist) * 0.012;
            p.vy += (toCY / cDist) * 0.012;
          }

          // Dampen + baseline drift so it never fully stops
          p.vx *= 0.96;
          p.vy *= 0.96;
          if (Math.abs(p.vx) < 0.06) p.vx += (Math.random() - 0.5) * 0.04;
          if (Math.abs(p.vy) < 0.06) p.vy += (Math.random() - 0.5) * 0.04;

          // Speed cap
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2.2) { p.vx = (p.vx / speed) * 2.2; p.vy = (p.vy / speed) * 2.2; }

          p.x += p.vx;
          p.y += p.vy;

          // Wall bounce
          if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
          if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
          if (p.x + p.w > W) { p.x = W - p.w; p.vx = -Math.abs(p.vx); }
          if (p.y + p.h > H) { p.y = H - p.h; p.vy = -Math.abs(p.vy); }

          p.el.style.left = `${p.x}px`;
          p.el.style.top = `${p.y}px`;
        });
      };

      animRef.current = requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(init);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(animRef.current);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="text-primary glow-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-sm">Move your cursor to interact</p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ height: "460px" }}
        >
          {skillList.map((skill, i) => (
            <span
              key={skill}
              ref={(el) => (skillRefs.current[i] = el)}
              className="absolute px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-muted-foreground cursor-default select-none whitespace-nowrap transition-colors duration-200 hover:text-primary hover:border-primary/40 hover:bg-primary/[0.06]"
              style={{
                fontSize: "0.75rem",
                opacity: 0.55 + (i % 5) * 0.09,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
