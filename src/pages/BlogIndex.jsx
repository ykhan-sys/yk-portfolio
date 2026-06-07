import { Link } from "react-router-dom";
import fm from "front-matter";

// Vite glob import to load all markdown files at build time
const postsRaw = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default', eager: true });

export const BlogIndex = () => {
  // Parse frontmatter and sort by date descending
  const posts = Object.entries(postsRaw).map(([path, content]) => {
    const { attributes } = fm(content);
    // Extract filename to use as slug e.g. "2026-06-06-active-directory-monitoring-setup-rc4-events"
    const filename = path.split('/').pop().replace('.md', '');
    
    // Split date and slug if formatted as YYYY-MM-DD-slug
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    let date = attributes.date;
    let slug = filename;
    
    if (match) {
      date = date || match[1];
      slug = match[2];
    }
    
    return {
      ...attributes,
      date,
      slug,
      fullRoute: `/notes/${date}/${slug}`
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl min-h-screen">
      <h1 className="text-4xl font-bold mb-12">Notes</h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <Link 
            key={post.fullRoute} 
            to={post.fullRoute}
            className="block group glass p-8 rounded-2xl hover:bg-surface transition-all"
          >
            <div className="flex gap-4 items-center mb-4">
              <span className="text-sm text-primary font-mono">{post.date}</span>
              {post.tags && (
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
