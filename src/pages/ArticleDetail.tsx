// src/pages/ArticleDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { format } from 'date-fns';
import { id as indonesia } from 'date-fns/locale';
import { 
  Calendar, User, ArrowLeft, Tag, Share2, Search, Link as LinkIcon, 
  Facebook, Phone, 
  Loader2, ArrowUp
} from 'lucide-react';

import { getArticleBySlug, getRecentArticles } from '../services/articleService';
import type { Article } from '../types';
import IslamicDivider from '../components/IslamicDivider';
import XTwitterIcon from '../components/XTwitterIcon';

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  // show/hide "scroll to top" button
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (slug) {
        window.scrollTo(0, 0);
        // 👇 Use the new slug-based service
        const data = await getArticleBySlug(slug);
        setArticle(data);
        
        const recent = await getRecentArticles(4);
        setRecentArticles(recent.filter(a => a.slug !== slug));
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    // set initial visibility (in case page is loaded scrolled)
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/artikel?search=${keyword}`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link artikel berhasil disalin!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareUrl = window.location.href;
  const shareText = article ? `Baca artikel "${article.title}" di LSPI:` : "";

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-lspi-main" />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative bg-lspi-dark text-white py-16 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm scale-105"
          style={{ backgroundImage: `url(${article.thumbnail})` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-lspi-dark via-lspi-dark/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <Link to="/artikel" className="inline-flex items-center text-gray-300 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Artikel
          </Link>
          
          <div className="max-w-4xl">
            <span className="bg-lspi-light-accent text-lspi-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-lspi-light-accent" />
                <span>{article.author || 'Admin LSPI'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-lspi-light-accent" />
                <span>{article.createdAt ? format(article.createdAt.toDate(), 'd MMMM yyyy', { locale: indonesia }) : '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IslamicDivider height="h-8" />

      {/* 2. MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          
          {/* --- KOLOM KIRI: KONTEN (Scrollable) --- */}
          <div className="lg:col-span-8">
            
            {/* Gambar Utama */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className="w-full h-auto object-cover max-h-[500px]"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/800x400?text=Image+Error")}
              />
            </div>

            {/* Tags (Di atas konten) */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-gray-200">
                <Tag className="w-4 h-4 text-lspi-main" />
                {article.tags.map((tag, idx) => (
                  <Link key={idx} to={`/artikel?search=${tag}`} className="bg-gray-100 hover:bg-lspi-main hover:text-white transition-colors text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none prose-a:text-lspi-main prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md">
              <div data-color-mode="light">
                <MDEditor.Markdown 
                  source={article.content} 
                  style={{ 
                    backgroundColor: 'transparent', 
                    lineHeight: '1.8',
                    fontFamily: 'inherit',
                  }} 
                />
              </div>
            </div>
          </div>


          {/* --- KOLOM KANAN: SIDEBAR (STICKY) --- */}
          {/* Tambahkan 'lg:sticky lg:top-24' dan 'h-fit' agar sidebar diam saat scroll */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-lspi-dark mb-6 border-l-4 border-lspi-main pl-3">
                Artikel Terbaru
              </h3>
              <div className="space-y-6">
                {recentArticles.length === 0 ? (
                  <p className="text-gray-500 text-sm">Belum ada artikel lain.</p>
                ) : (
                  recentArticles.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <Link to={`/artikel/${item.slug}`} className="shrink-0 w-20 h-20 rounded-lg overflow-hidden relative">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </Link>
                      <div>
                        <span className="text-[10px] font-bold text-lspi-main uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-lspi-main transition-colors mb-1 line-clamp-2">
                          <Link to={`/artikel/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h4>
                        <span className="text-xs text-gray-400">
                          {item.createdAt ? format(item.createdAt.toDate(), 'd MMM yyyy', { locale: indonesia }) : ''}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-lspi-dark mb-4">Cari Artikel</h3>
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Ketik kata kunci..." 
                  className="w-full py-3 pl-4 pr-12 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-lspi-main/50 transition-all"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-2 p-1.5 bg-lspi-main text-white rounded-md hover:bg-lspi-dark transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="">
              <h3 className="text-lg font-bold text-lspi-dark mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-lspi-main" /> Bagikan Artikel
              </h3>
              <div className="flex gap-2">
                {/* WhatsApp */}
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank" rel="noreferrer"
                  className="aspect-square p-2 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                  title="WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </a>

                {/* Twitter / X */}
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noreferrer"
                  className="aspect-square p-2 rounded-lg bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  title="X (Twitter)"
                >
                  <XTwitterIcon className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noreferrer"
                  className="aspect-square p-2 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* Copy Link */}
                <button 
                  onClick={handleCopyLink}
                  className="aspect-square p-2 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  title="Salin Link"
                >
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Scroll to Top Button (floating) */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50 p-3 rounded-full bg-lspi-main text-white shadow-lg hover:bg-lspi-dark transition-colors"
          title="Ke Atas"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ArticleDetail;