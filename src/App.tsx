import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-w-full min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artikel" element={<Articles />} />
            <Route path="/artikel/:slug" element={<ArticleDetail />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/gabung" element={<div>Halaman Gabung/Contact</div>} />
            <Route path="*" element={<div>404 Halaman Tidak Ditemukan</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;