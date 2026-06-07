import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fm from "front-matter";
import { TableOfContents } from "@/components/TableOfContents";

// Load all markdown files
const postsRaw = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default', eager: true });

// Helper to generate IDs from heading text
const generateId = (children) => {
  const text = Array.isArray(children) 
    ? children.map(c => typeof c === 'string' ? c : '').join('') 
    : typeof children === 'string' ? children : '';
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export const BlogPost = () => {
  const { date, slug } = useParams();
  
  // Find the matching post
  let currentPost = null;
  let currentFrontmatter = null;
  
  for (const [path, content] of Object.entries(postsRaw)) {
    const filename = path.split('/').pop().replace('.md', '');
    const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    
    let postDate = "";
    let postSlug = filename;
    
    if (match) {
      postDate = match[1];
      postSlug = match[2];
    }
    
    if (postDate === date && postSlug === slug) {
      const parsed = fm(content);
      currentFrontmatter = parsed.attributes;
      currentPost = parsed.body;
      break;
    }
  }

  if (!currentPost) {
    return (
      <div className="pt-32 container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <Link to="/notes" className="text-primary hover:underline">← Back to Notes</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl min-h-screen">
      <Link to="/notes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to Notes
      </Link>
      
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Main Content Column */}
        <article className="lg:col-span-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              {currentFrontmatter.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-white/5 py-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{currentFrontmatter.date || date}</span>
              </div>
              {currentFrontmatter.tags && (
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-primary" />
                  <div className="flex gap-2">
                    {currentFrontmatter.tags.map(tag => (
                      <span key={tag} className="text-sm px-2 py-0.5 rounded-md glass">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-[#0f1418] prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, children, ...props}) => <h2 id={generateId(children)} {...props}>{children}</h2>,
                h3: ({node, children, ...props}) => <h3 id={generateId(children)} {...props}>{children}</h3>,
              }}
            >
              {currentPost}
            </ReactMarkdown>
          </div>
        </article>

        {/* Sidebar / Table of Contents Column */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-32 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
          <TableOfContents />
        </aside>
      </div>
    </div>
  );
};
