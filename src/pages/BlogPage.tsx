import React, { useState } from 'react';
import { BLOGS_DATA, BlogPost } from '../data/blogs';
import { BlogReaderModal } from '../components/BlogReaderModal';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  ArrowRight, 
  Search, 
  Bookmark, 
  Sparkles 
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Industrial Insights', 'Automotive Operations', 'Workforce Dynamics', 'Regional Coverage'];

  const filteredPosts = BLOGS_DATA.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="relative pt-6 sm:pt-12 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-industrial-900 border border-blue-200 dark:border-sbe-gold/40 text-xs font-mono text-sbe-royal dark:text-sbe-gold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>MANPOWER &amp; LABOUR INSIGHTS FOR MYSORE INDUSTRIES</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-tight">
          Industrial Labour <span className="text-gradient-sbe">Knowledge Hub &amp; Blog</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
          Operational guides, labour compliance best practices, and shop-floor productivity insights for manufacturing plants around Mysuru.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by keyword, automotive, contract labour, UP/Bihar, Tandavpura..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-200 focus:outline-none focus:border-sbe-royal"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-sbe-royal dark:bg-sbe-gold text-white dark:text-industrial-950 font-bold shadow-md'
                    : 'bg-white dark:bg-industrial-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="glass-panel glass-panel-hover rounded-3xl p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between cursor-pointer group shadow-sm"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-industrial-800 border border-blue-200 dark:border-sbe-gold/30 text-sbe-royal dark:text-sbe-gold text-xs font-mono font-semibold">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white group-hover:text-sbe-royal dark:group-hover:text-sbe-gold transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {post.intro}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-industrial-900 border border-slate-200 dark:border-white/5 text-[11px] font-mono text-sbe-royal dark:text-cyan-300 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Read Action */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  By {post.author.split(',')[0]}
                </span>
                <span className="text-xs font-bold text-sbe-royal dark:text-sbe-gold group-hover:underline flex items-center gap-1.5 transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reader Modal */}
      <BlogReaderModal
        post={activePost}
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
      />
    </div>
  );
};
