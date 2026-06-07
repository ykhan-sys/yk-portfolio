import { Link } from "react-router-dom";
import fm from "front-matter";
import { ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";

// Eagerly load all markdown files at build time
const postsRaw = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default', eager: true });

export const FeaturedPosts = () => {
  const posts = Object.entries(postsRaw).map(([path, content]) => {
    const { attributes } = fm(content);
    const filename = path.split('/').pop().replace('.md', '');
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    const date = attributes.date || (match ? match[1] : '');
    const slug = match ? match[2] : filename;

    return { ...attributes, date, slug, fullRoute: `/notes/${date}/${slug}` };
  }).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3); // Show latest 3

  if (posts.length === 0) return null;

  return (
    <section id="notes" className="py-24">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-medium mb-6">
            <BookOpen size={14} />
            Field Notes & Technical Write-Ups
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From the <span className="text-primary glow-text">Notes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world solutions to complex infrastructure problems — documented for engineers who want the full picture.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <Link
              key={post.fullRoute}
              to={post.fullRoute}
              className={`group relative flex flex-col glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:glow-border ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary/80 via-primary to-primary/40" />

              <div className="flex flex-col flex-1 p-6">
                {/* Date & Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-primary/80">
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  {post.tags && post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Description */}
                {post.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                    {post.description}
                  </p>
                )}

                {/* Read more CTA */}
                <div className="flex items-center gap-2 mt-5 text-sm font-medium text-primary/70 group-hover:text-primary transition-colors">
                  Read full post
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass glow-border text-foreground hover:text-primary hover:bg-surface transition-all duration-300 font-medium"
          >
            View All Notes
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
