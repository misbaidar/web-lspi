// src/components/Footer.tsx
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import XTwitterIcon from './XTwitterIcon';
import { NavLink } from 'react-router-dom';
import LSPILogo from './LSPILogo';
import MapEmbed from './MapEmbed';

const Footer = () => {
  return (
    // Gradasi halus: lspi-dark (atas) ke lspi-main (bawah)
    <footer className="bg-linear-to-r from-[#013757] to-lspi-main text-white pt-10 pb-6 mt-auto border-t border-lspi-main/50"> 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[auto_1fr_1fr_1fr] gap-8">        
        {/* 1. Info Organisasi */}
        <div>
          <LSPILogo className="w-32 mb-4 fill-white" />
          <p className="text-sm text-gray-300 mb-4">
            Lembaga Studi Politik Islam (LSPI)
            <span className="block font-bold">Universitas Islam Negeri Sunan Gunung Djati</span>
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/lspiuinbdg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Instagram LSPI"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="https://www.facebook.com/lspiuinbdg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Facebook LSPI"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="https://www.youtube.com/@lspiuinbandung9161" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Youtube LSPI"
            >
              <Youtube className="h-6 w-6" />
            </a>
            <a 
              href="https://x.com/lspiuinbdg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="X LSPI"
            >
              <XTwitterIcon className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* 2. Tautan Cepat */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-lspi-light-accent">Tautan Cepat</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><NavLink to="/" className="hover:text-white transition-colors">Beranda</NavLink></li>
            <li><NavLink to="/kegiatan/ngopi-lspi" className="hover:text-white transition-colors">Ngopi LSPI</NavLink></li>
            <li><NavLink to="/kegiatan/mata-muda" className="hover:text-white transition-colors">Mata Muda</NavLink></li>
            <li><NavLink to="/artikel" className="hover:text-white transition-colors">Artikel</NavLink></li>
            <li><NavLink to="/tentang" className="hover:text-white transition-colors">Tentang Kami</NavLink></li>
            <li><NavLink to="/gabung" className="hover:text-white transition-colors">Bergabung</NavLink></li>
          </ul>
        </div>

        {/* 3. Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-lspi-light-accent">Kontak</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-lspi-light-accent" />
              <a href="mailto:lspi.uinsgd@gmail.com" className="hover:text-white transition-colors">lspi.uinsgd@gmail.com</a>
            </li>
            <li>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-lspi-light-accent" />
                <p>WhatsApp</p>
              </div>
              <div className="flex flex-col ml-6 mt-1 space-y-1">
                <a href="https://wa.me/6282116257977" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(Ikhwan) +6282116257977</a>
                <a href="https://wa.me/62895626422177" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(Akhwat) +62895626422177</a>
              </div>
            </li>
          </ul>
        </div>
        
        {/* 4. Placeholder Map */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-4 text-lspi-light-accent">
            <MapPin className="h-6 w-6 mr-2 shrink-0" />
            <h3 className="text-lg font-semibold">Sekretariat</h3>          
          </div>
          <p className="text-sm text-gray-300 mb-3">Jln. Permai V No. B1/126 Komplek Cipadung Permai, Kec. Cibiru, Bandung</p>
          <div className="w-full h-48 md:h-48 rounded-lg overflow-hidden"> 
              <MapEmbed />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-white text-center">
        <p className="text-xs text-gray-300">
          &copy; {new Date().getFullYear()} LSPI UIN SGD Bandung. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;