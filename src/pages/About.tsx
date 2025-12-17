import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, History, Target, ChevronRight, Eye } from 'lucide-react';

// Definisi Data Konten Tab
const tabData = [
  {
    id: 'deskripsi',
    label: 'Mengenal LSPI',
    icon: Info,
    title: 'Mengenal LSPI',
    content: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          <strong>Lembaga Studi Politik Islam (LSPI)</strong> adalah wadah intelektual mahasiswa UIN Sunan Gunung Djati Bandung yang berfokus pada kajian, penelitian, dan pengembangan pemikiran politik dalam perspektif Islam.
        </p>
        <p>
          LSPI berkomitmen untuk membangun kepedulian politik di kalangan mahasiswa melalui diskusi mendalam tentang isu-isu sosial-politik kontemporer. Organisasi ini menjadi platform bagi mahasiswa untuk mengembangkan kesadaran kritis dan pemahaman mendalam tentang dinamika politik dalam konteks nilai-nilai Islam.
        </p>
        <p>
          Dengan berbagai kegiatan diskusi, seminar, dan publikasi, LSPI berupaya mencetak generasi muda yang tidak hanya cerdas secara akademik, tetapi juga memiliki kepedulian tinggi terhadap persoalan-persoalan bangsa dan umat.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-4">
          <p className="text-sm italic text-blue-700">
            "Peduli Politik, Peduli Kaum Muslim."
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'sejarah',
    label: 'Sejarah',
    icon: History,
    title: 'Sejarah Berdirinya',
    content: (
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          LSPI didirikan pada 17 Agustus 2003 dengan tujuan utama untuk membangun kepedulian politik di kalangan mahasiswa UIN Sunan Gunung Djati Bandung. Organisasi ini lahir dari kesadaran bahwa mahasiswa perlu memiliki pemahaman yang lebih dalam tentang dinamika politik dan sosial masyarakat.
        </p>
        <p>
          Melalui serangkaian kegiatan seperti diskusi rutin dan seminar, LSPI berkembang menjadi salah satu lembaga studi yang aktif memberikan kontribusi pada pengembangan wawasan dan kepedulian mahasiswa terhadap isu-isu sosial-politik.
        </p>
      </div>
    )
  },
  {
    id: 'visi',
    label: 'Visi',
    icon: Eye,
    title: 'Visi Organisasi',
    content: (
      <div className="space-y-6">
        <div className="text-xl font-medium text-center text-brand-main px-8 py-6 bg-gray-50 rounded-xl border border-gray-100">
          Menjadi pusat kajian politik Islam terdepan di UIN SGD Bandung, dalam mengembangkan potensi intelektual mahasiswa sebagai <span className="font-semibold text-lspi-main italic">Mufakkirun Siyasi</span>.
        </div>
      </div>
    )
  },
  {
    id: 'misi',
    label: 'Misi',
    icon: Target,
    title: 'Misi Organisasi',
    content: (
      <ul className="space-y-4 p-0">
        {[
          "Menyelenggarakan pengkajian dan penelitian mengenai realitas politik yang berkembang di tengah-tengah masyarakat dengan Islam sebagai landasannya.",
          "Menyebarluaskan gagasan-gagasan atau pemikiran-pemikiran Islam yang berkaitan dengan masalah-masalah politik keumatan, baik dalam lingkup lokal, nasional, maupun internasional."
        ].map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="shrink-0 w-6 h-6 bg-lspi-light-accent text-lspi-dark rounded-full flex items-center justify-center text-xs font-bold mt-1 mr-3">
              {index + 1}
            </div>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    )
  }
];

const About = () => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  return (
    <>

      <div className="min-h-screen bg-gray-50 pt-(--navbar-height) pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto pt-20">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">Tentang LSPI</h1>
            <p className="text-gray-500">Mengenal lebih dalam identitas, perjalanan, dan cita-cita kami.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              
              {/* SIDEBAR TABS (Kiri) */}
              <div 
                className="w-full md:w-3/12 bg-lspi-main p-2 md:p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible"
                style={{
                  backgroundImage: 'url(https://www.transparenttextures.com/patterns/arabesque.png)',
                  backgroundBlendMode: 'overlay'
                }}
              >
                {tabData.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left whitespace-nowrap md:whitespace-normal
                        ${isActive 
                          ? 'bg-white text-lspi-main shadow-md ring-1 ring-lspi-main font-semibold' 
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-lspi-main' : 'text-white/70'}`} />
                      <span className="flex-1">{tab.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 hidden md:block text-lspi-main" />}
                    </button>
                  );
                })}
              </div>

              {/* CONTENT AREA (Kanan) */}
              <div className="flex-1 p-6 md:p-10 relative">
                <AnimatePresence mode="wait">
                  {tabData.map((tab) => {
                    if (tab.id !== activeTab) return null;

                    return (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                      >
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                          <div className="p-2 bg-brand-main/10 rounded-lg">
                            <tab.icon className="w-6 h-6 text-brand-main" />
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">{tab.title}</h2>
                        </div>
                        
                        <div className="prose prose-blue max-w-none">
                          {tab.content}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default About;