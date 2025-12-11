// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { id as indonesia } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Eye, Target, Calendar, ArrowRight, User } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import InstagramWidget from '../components/InstagramWidget';
import IslamicDivider from '../components/IslamicDivider';
import { getRecentArticles } from '../services/articleService';
import type { Article } from '../types';

const Home = () => {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHomeData = async () => {
      // Fetch 6 most recent articles
      const data = await getRecentArticles(6);
      setRecentArticles(data);
      setLoading(false);
    };
    fetchHomeData();
  }, []);
  
  // Variabel animasi untuk scroll reveal (Default Vertical)
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
    }
  };

  // 💡 Variabel animasi KHUSUS Jargon (Fade Left to Right)
  const jargonVariants = {
    hidden: { opacity: 0, x: -50 }, // Mulai dari kiri
    visible: { 
      opacity: 1, 
      x: 0, 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* 1. HERO SECTION */}
      <HeroSection />
      
      {/* Divider Geometris */}
      <IslamicDivider />

      {/* 2. PROFIL SECTION (Jargon, Visi, Misi) */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Jargon Utama */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={jargonVariants} // 💡 Menggunakan varian kiri-ke-kanan
          // 💡 Menambahkan delay 0.3 detik
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} 
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-lspi-dark leading-tight">
            "Peduli Politik, <br className="hidden md:block" />
            <span className="text-lspi-main">Peduli Kaum Muslim"</span>
          </h2>
        </motion.div>

        {/* Grid Visi & Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Kolom Visi */}
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-lspi-main hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            // 💡 Delay 0.5s (muncul setelah jargon)
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-lspi-main/10 rounded-lg mr-4">
                <Eye className="w-8 h-8 text-lspi-main" />
              </div>
              <h3 className="text-2xl font-bold text-lspi-dark">Visi Kami</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi pusat kajian politik Islam terdepan di UIN SGD Bandung, dalam mengembangkan potensi intelektual mahasiswa sebagai <span className="font-semibold text-lspi-main italic">Mufakkirun Siyasi</span>.
            </p>
          </motion.div>

          {/* Kolom Misi */}
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-lspi-dark hover:shadow-xl transition-shadow duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            // 💡 Delay 0.7s (muncul setelah visi)
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-lspi-dark/10 rounded-lg mr-4">
                <Target className="w-8 h-8 text-lspi-dark" />
              </div>
              <h3 className="text-2xl font-bold text-lspi-dark">Misi Kami</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="shrink-0 w-6 h-6 bg-lspi-light-accent text-lspi-dark rounded-full flex items-center justify-center text-xs font-bold mt-1 mr-3">1</span>
                <p className="text-gray-700">
                  Menyelenggarakan pengkajian dan penelitian mengenai realitas politik yang berkembang di tengah-tengah masyarakat dengan Islam sebagai landasannya.
                </p>
              </li>
              <li className="flex items-start">
                <span className="shrink-0 w-6 h-6 bg-lspi-light-accent text-lspi-dark rounded-full flex items-center justify-center text-xs font-bold mt-1 mr-3">2</span>
                <p className="text-gray-700">
                  Menyebarluaskan gagasan-gagasan atau pemikiran-pemikiran Islam yang berkaitan dengan masalah-masalah politik keumatan, baik dalam lingkup lokal, nasional, maupun internasional.
                </p>
              </li>
            </ul>
          </motion.div>

        </div>
      </section>


      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-lspi-dark">Artikel Terbaru Kami</h2>
            <p className="text-gray-600 mt-2">Dalami pemikiran politik Islam terkini bersama kami.</p>
          </div>
          <Link to="/artikel" className="text-lspi-main font-bold flex items-center hover:underline">
            Lihat Semua Artikel <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white h-80 rounded-2xl animate-pulse border border-gray-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              >
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
              </motion.div>
            ))}
          </div>
        )}
      </section>


      {/* 3. INSTAGRAM SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col max-w-full items-center justify-center mx-auto px-4 text-center">
          
          {/* Header Section */}
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:pr-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // 💡 Delay 0.4s
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-lspi-dark mb-4">
              Ikuti Aktivitas Terbaru Kami
            </h2>
            <p className="text-gray-600 mx-auto">
              Jangan lewatkan update kajian, diskusi, dan kegiatan sosial LSPI melalui laman Instagram kami.
            </p>
          </motion.div>

          {/* Widget Container */}
          <motion.div 
            className="rounded-sm shadow-xl md:min-w-2xl w-full overflow-hidden border border-gray-300"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            // 💡 Delay 0.6s
            transition={{ duration: 1, delay: 0.6 }}
          >
            <InstagramWidget />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            // 💡 Delay 0.8s
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://instagram.com/lspiuinbdg" 
              target="_blank" 
              rel="noreferrer"
              className="inline-block bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold mt-8 py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Lihat Profil Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider Penutup sebelum Footer */}
      <IslamicDivider />
      
    </div>
  );
};

export default Home;