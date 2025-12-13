import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { id as indonesia } from 'date-fns/locale';
import { Calendar, User, ArrowRight, Search, Loader2 } from 'lucide-react';

import { getPublishedArticles } from '../services/articleService';
import type { Article } from '../types';
import IslamicDivider from '../components/IslamicDivider';

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const location = useLocation();

  // Fetch Data saat halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPublishedArticles();
      setArticles(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchTerm(query);
      setCurrentPage(1); // Reset to page 1 when search changes
    }
  }, [location.search]);

  // Comprehensive Filtering Logic
  const filteredArticles = articles.filter(article => {
    const searchLower = searchTerm.toLowerCase();
    
    return (
      article.title.toLowerCase().includes(searchLower) ||
      article.category.toLowerCase().includes(searchLower) ||
      article.content.toLowerCase().includes(searchLower) ||
      article.excerpt.toLowerCase().includes(searchLower) ||
      article.author.toLowerCase().includes(searchLower) ||
      // Check if any tag matches the search term
      article.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Build compact pages list: always include first, last and current +/- 1
  const pagesSet = new Set<number>();
  if (totalPages >= 1) {
    pagesSet.add(1);
    pagesSet.add(totalPages);
    for (let p = currentPage - 1; p <= currentPage + 1; p++) {
      if (p > 1 && p < totalPages) pagesSet.add(p);
    }
  }
  const pagesToShow = Array.from(pagesSet).sort((a, b) => a - b);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-(--navbar-height)"> {/* pt-20 untuk kompensasi Navbar Fixed */}
      
      {/* Header Page */}
      <div className="bg-lspi-main text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">Artikel</h1>
          <p className="text-lspi-light-accent text-lg max-w-2xl mx-auto">
            Kumpulan tulisan, opini, dan berita seputar politik Islam dan dinamika keumatan.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input 
              type="text" 
              placeholder="Cari topik atau judul..." 
              className="w-full py-3 pl-12 pr-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-lspi-light-accent/50"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 when search changes
              }}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <IslamicDivider height="h-8" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-lspi-main" />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-600">Belum ada artikel yang ditemukan.</h3>
            <p className="text-gray-400 mt-2">Coba kata kunci lain atau kembali lagi nanti.</p>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedArticles.map((article) => (
                <div key={article.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
                  {/* Thumbnail */}
                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={article.thumbnail} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image")}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    <div className="mb-3">
                      <span className="bg-lspi-main text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                    {/* Meta */}
                    <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {article.createdAt 
                          ? format(article.createdAt.toDate(), 'd MMM yyyy', { locale: indonesia }) 
                          : '-'}
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        <span className="truncate max-w-[100px]">{article.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-lspi-main transition-colors">
                      <Link to={`/artikel/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 grow">
                      {article.excerpt}
                    </p>

                    {/* Read More */}
                    <Link 
                      to={`/artikel/${article.slug}`} 
                      className="inline-flex items-center text-lspi-main font-semibold text-sm hover:underline mt-auto group"
                    >
                      Baca Selengkapnya 
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                {/* Page Numbers with Ellipsis */}
                <div className="flex items-center gap-2">
                  {(() => {
                    let prev: number | null = null;
                    return pagesToShow.map((page) => {
                      const elements: React.ReactNode[] = [];
                      if (prev !== null && page - prev > 1) {
                        elements.push(
                          <span key={`ellipsis-${prev}-${page}`} className="text-gray-400 px-2">...</span>
                        );
                      }
                      elements.push(
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            currentPage === page
                              ? 'bg-lspi-main text-white shadow-md'
                              : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-lspi-main'
                          }`}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      );
                      prev = page;
                      return elements;
                    });
                  })()}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Articles;