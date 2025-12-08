// src/pages/About.tsx
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto p-8 pt-(--navbar-height) mb-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-green-800">Tentang Lembaga Studi Politik Islam (LSPI)</h1>
      <div className="space-y-4 text-gray-700">
        <p>Placeholder untuk Visi, Misi, Sejarah Singkat, dan Struktur Organisasi LSPI.</p>
        <p>LSPI berfokus pada kajian isu-isu politik kontemporer dengan perspektif Islam. Kami adalah organisasi mahasiswa yang aktif berdiskusi dan beropini.</p>
      </div>
    </motion.div>
  );
};

export default About;