import { Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import MapEmbed from '../components/MapEmbed';

const Kontak = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-(--navbar-height) pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12 pt-20">
          
          {/* 1. Header Section */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Hubungi Kami</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hubungi kami melalui kanal di bawah ini atau kunjungi sekretariat kami.
            </p>
          </div>

          {/* LAYOUT UTAMA: GRID 2 KOLOM (Desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* --- KOLOM KIRI: DAFTAR KARTU (LIST) --- */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Email Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                </div>
                <a 
                  href="mailto:lspi.uinsgd@gmail.com" 
                  className="text-brand-main font-medium text-sm hover:underline break-all"
                >
                  lspi.uinsgd@gmail.com
                </a>
              </motion.div>

              {/* WA Ikhwan */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Narahubung Ikhwan</h3>
                </div>
                <a 
                  href="https://wa.me/6282116257977" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full text-xs font-medium hover:bg-green-700 transition-colors gap-2 w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp +62 821-1625-7977
                </a>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-pink-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Narahubung Akhwat</h3>
                </div>
                <a 
                  href="https://wa.me/62895626422177" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-full text-xs font-medium hover:bg-green-700 transition-colors gap-2 w-full"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp +62 895-6264-22177
                </a>
              </motion.div>

            </div>

            {/* --- KOLOM KANAN: PETA (MAP) --- */}
            <div className="lg:col-span-2 h-full">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-bold text-gray-900">Lokasi Sekretariat</h2>
                </div>
                <p className="mb-4 text-sm text-gray-600 px-2">
                  <strong>Alamat:</strong> Jln. Permai V No. B1/126 Komplek Cipadung Permai, Kec. Cibiru, Bandung
                </p>
                <MapEmbed />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Kontak;