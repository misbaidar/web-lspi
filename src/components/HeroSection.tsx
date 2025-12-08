// src/components/HeroSection.tsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// URL gambar latar belakang (Ganti dengan path gambar LSPI yang relevan)
const BACKGROUND_IMAGE = 'src/assets/photo_hero.jpg'; 

// Varian animasi untuk teks (agar muncul perlahan)
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
  }
};

const HeroSection = () => {
  return (
    // 1. Kontainer Utama: Atur tinggi dan gambar latar
    <div 
      className="relative h-[60vh] md:h-screen flex items-center justify-center bg-cover bg-top"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
    >
      
      {/* 2. Layer Transparan Biru (Overlay) */}
      {/* Gunakan lspi-main (kode #004368) dengan opasitas 70% (bg-opacity-70) */}
      <div className="absolute inset-0 bg-lspi-main/70"></div>
      
      {/* 3. Konten Teks (di atas overlay) */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto p-6"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, staggerChildren: 0.3 }}
      >
        {/* Judul Utama */}
        <motion.h1 
          className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-lspi-light-accent mb-4 tracking-tight"
          variants={textVariants}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
        >
          Lembaga Studi Politik Islam
        </motion.h1>

        {/* Pengantar Singkat */}
        <motion.p 
          className="text-base sm:text-xl text-white mb-8 font-light max-w-2xl mx-auto"
          variants={textVariants}
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
        >
          Wadah intelektual mahasiswa UIN SGD Bandung yang berfokus pada kajian isu-isu politik kontemporer dari perspektif Islam. Mencetak kader yang responsif dan kritis.
        </motion.p>
        
        {/* Tombol Selengkapnya */}
        <motion.div variants={textVariants} transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}>
          <NavLink
            to="/tentang"
            className="bg-lspi-light-accent text-lspi-main py-3 px-8 rounded-full font-bold text-lg hover:bg-white transition duration-300 shadow-xl"
          >
            Selengkapnya
          </NavLink>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default HeroSection;