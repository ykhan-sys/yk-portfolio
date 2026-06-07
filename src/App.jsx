import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/layout/Navbar";
import { Home } from "@/pages/Home";
import { BlogIndex } from "@/pages/BlogIndex";
import { BlogPost } from "@/pages/BlogPost";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:date/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
