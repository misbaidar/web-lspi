// src/components/Navbar.tsx
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react'; // Ditambahkan ChevronDown
import LSPILogo from './LSPILogo';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  path?: string; // Path jadi opsional karena parent dropdown tidak punya link sendiri
  children?: NavItem[]; // Properti baru untuk submenu
}

const navItems: NavItem[] = [
  { name: 'Beranda', path: '/' },
  { 
    name: 'Kegiatan', 
    // Tidak ada path, tapi ada children
    children: [
      { name: 'Ngopi LSPI', path: '/kegiatan/ngopi-lspi' },
      { name: 'Mata Muda', path: '/kegiatan/mata-muda' }
    ]
  }, 
  { name: 'Artikel', path: '/artikel' },
  { name: 'Tentang', path: '/tentang' },
  { name: 'Kontak', path: '/kontak' },
];

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isArticlePage = location.pathname.startsWith('/artikel/');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const transitionClasses = 'transition-all duration-300 ease-in-out';

  return (
    <div className={`${!isArticlePage ? 'sticky' : 'relative'} z-50 top-0`}> 
      <nav className="absolute w-full top-0 z-50 group">
        <div 
          className={`
            absolute inset-0 
            bg-linear-to-r from-lspi-dark to-lspi-main 
            shadow-2xl
            transition-opacity duration-300 ease-in-out
            ${(!isHomePage || scrolled) 
              ? 'opacity-100' // Kondisi Solid (Bukan Home ATAU sudah Scroll)
              : 'opacity-0 group-hover:opacity-100' // Kondisi Transparan (Home & Top), jadi solid saat hover
            }
          `}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20"> 
            <NavLink to="/" className="flex items-center max-w-20">
              <LSPILogo className={`w-full fill-white ${transitionClasses} hover:fill-lspi-light-accent`} />
            </NavLink>

            {/* Menu Desktop */}
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => {
                // 1. JIKA ITEM MEMILIKI CHILDREN (DROPDOWN)
                if (item.children) {
                  return (
                    <div 
                      key={item.name} 
                      className="relative group"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button 
                        className={`flex items-center text-white ${transitionClasses} hover:text-lspi-light-accent font-medium text-lg ${!scrolled ? 'text-shadow' : ''}`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>

                      {/* Dropdown Content */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-full mt-2 w-48 bg-lspi-dark rounded-md shadow-lg py-1 z-50 border border-lspi-main"
                            >
                            {/* 💡 INVISIBLE BRIDGE (Pseudo-element) */}
                            {/* Ini mengisi celah mt-2 agar mouse tidak terputus saat turun ke menu */}
                            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
                            {item.children.map((child) => (
                              <NavLink
                                key={child.name}
                                to={child.path!}
                                className={({ isActive }) =>
                                  `block px-4 py-2 text-sm text-white hover:bg-lspi-main hover:text-lspi-light-accent ${
                                    isActive ? 'bg-lspi-main text-lspi-light-accent' : ''
                                  }`
                                }
                              >
                                {child.name}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                // 2. JIKA ITEM BIASA (TANPA CHILDREN)
                return (
                  <NavLink
                    key={item.name}
                    to={item.path!}
                    className={({ isActive }) =>
                      `text-white ${transitionClasses} hover:text-lspi-light-accent font-medium text-lg ${
                        isActive ? 'border-b-2 border-lspi-light-accent pb-1' : ''
                      } ${!scrolled ? 'text-shadow' : ''}`
                    }
                    end 
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Tombol Hamburger Mobile */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-lspi-light-accent focus:outline-none"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden absolute w-full top-full bg-lspi-dark pb-3 shadow-xl"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            > 
              {navItems.map((item) => {
                // Tampilan Mobile untuk Dropdown
                if (item.children) {
                  return (
                    <div key={item.name}>
                      <div className="px-4 py-3 text-base font-medium text-gray-400 border-b border-gray-700/50">
                        {item.name}
                      </div>
                      {item.children.map((child) => (
                        <NavLink
                          key={child.name}
                          to={child.path!}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) =>
                            `block pl-8 pr-4 py-2 text-sm font-medium text-white hover:bg-lspi-main ${
                              isActive ? 'bg-lspi-main' : ''
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  );
                }

                // Tampilan Mobile Biasa
                return (
                  <NavLink
                    key={item.name}
                    to={item.path!}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-base font-medium text-white hover:bg-lspi-main ${
                        isActive ? 'bg-lspi-main' : ''
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Navbar;