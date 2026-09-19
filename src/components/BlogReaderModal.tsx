import React from 'react';
import { BlogPost } from '../data/blogs';
import { X, Calendar, Clock, User, Tag, Share2, ArrowLeft, BookmarkCheck } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.metaDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl my-auto bg-white dark:bg-industrial-900 rounded-3xl border border-slate-200 dark:border-white/20 p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-sbe-royal dark:hover:text-sbe-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-industrial-700 transition-colors"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-industrial-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-industrial-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Meta Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-industrial-800 border border-blue-200 dark:border-sbe-gold/30 text-sbe-royal dark:text-sbe-gold text-xs font-semibold">
              {post.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 pb-4 border-b border-slate-200 dark:border-white/10">
            <User className="w-3.5 h-3.5 text-sbe-royal dark:text-cyan-400" />
            <span>By {post.author}</span>
          </div>
        </div>

        {/* SEO Metadata Card */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-50/70 dark:bg-industrial-950 border border-blue-200 dark:border-cyan-500/20 text-xs font-mono text-slate-700 dark:text-slate-300">
          <div className="text-[10px] text-sbe-royal dark:text-cyan-400 font-bold uppercase tracking-wider mb-1">
            SEO Context &amp; Meta Description
          </div>
          <p className="italic text-slate-600 dark:text-slate-400">{post.metaDescription}</p>
        </div>

        {/* Article Content */}
        <div className="space-y-6 text-slate-800 dark:text-slate-200 text-base leading-relaxed">
          {/* Highlighted Intro */}
          <p className="text-lg font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-industrial-950 p-4 rounded-2xl border-l-4 border-sbe-royal dark:border-sbe-gold">
            {post.intro}
          </p>

          {/* Paragraphs */}
          {post.body.map((paragraph, idx) => (
            <p key={idx} className="text-slate-700 dark:text-slate-300">
              {paragraph}
            </p>
          ))}

          {/* Conclusion */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-industrial-950 border border-blue-200 dark:border-sbe-gold/30">
            <h4 className="text-sm font-bold font-mono text-sbe-royal dark:text-sbe-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookmarkCheck className="w-4 h-4" /> Operational Conclusion
            </h4>
            <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
              {post.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-2">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Related keywords:</span>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-industrial-950 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-white/5 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
