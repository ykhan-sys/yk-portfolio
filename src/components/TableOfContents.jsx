import { useEffect, useState } from "react";

export const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    // Add a small delay to ensure ReactMarkdown has finished rendering into the DOM
    const initToC = () => {
      const elements = Array.from(document.querySelectorAll(".prose h2, .prose h3"));
      if (!elements.length) return;

      setHeadings(elements.map((elem) => ({
        id: elem.id,
        text: elem.innerText,
        level: Number(elem.tagName.charAt(1)),
      })));

      const handleScroll = () => {
        let currentId = elements[0].id; // Default to first heading
        for (const elem of elements) {
          // If the heading has crossed the top 30% of the screen, it becomes active
          if (elem.getBoundingClientRect().top < window.innerHeight * 0.3) {
            currentId = elem.id;
          } else {
            break; 
          }
        }
        setActiveId(currentId);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // Trigger immediately to highlight the first item

      return () => window.removeEventListener("scroll", handleScroll);
    };

    const timeoutId = setTimeout(initToC, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Table of Contents</h3>
      <ul className="space-y-2 border-l border-white/10 pl-4">
        {headings.map((heading) => (
          <li 
            key={heading.id} 
            className={`${heading.level === 3 ? "ml-4" : ""} transition-colors duration-200`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`text-sm block ${
                activeId === heading.id 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
