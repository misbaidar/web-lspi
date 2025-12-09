import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from 'fs';
import path from 'path';

// 1. Konfigurasi Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY, // 👈 Ganti jadi process.env
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Konfigurasi Path
const DIST_DIR = './dist'; // Folder hasil build Vite
const TEMPLATE_PATH = './dist/index.html'; // Template HTML utama

async function generateMetaFiles() {
  console.log('🚀 Starting Static Meta File Generation...');

  // Pastikan folder dist ada (artinya build sudah dijalankan)
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: Folder "dist" not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Baca template HTML asli
  let templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  console.log('📥 Fetching articles from Firestore...');
  const querySnapshot = await getDocs(collection(db, "articles"));
  const articles = querySnapshot.docs
    .map(doc => doc.data())
    .filter(a => a.status === 'Published');

  console.log(`📝 Processing ${articles.length} articles...`);

  for (const article of articles) {
    // 3. Buat Folder untuk setiap artikel
    // Struktur: dist/artikel/{slug}/index.html
    const articleDir = path.join(DIST_DIR, 'artikel', article.slug);
    
    if (!fs.existsSync(articleDir)){
        fs.mkdirSync(articleDir, { recursive: true });
    }

    // 4. Suntikkan Metadata ke dalam HTML
    let finalHtml = templateHtml
      // Ganti Title
      .replace(/<title>.*?<\/title>/, `<title>${article.title} | LSPI</title>`)
      // Ganti Meta Description
      .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${article.excerpt}"`)
      // Ganti Open Graph (Facebook/WhatsApp)
      .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${article.title}"`)
      .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${article.excerpt}"`)
      .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${article.thumbnail}"`)
      .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="https://lspiuinsgd.vercel.app/artikel/${article.slug}"`)
      // Ganti Twitter Card
      .replace(/<meta property="twitter:title" content=".*?"/, `<meta property="twitter:title" content="${article.title}"`)
      .replace(/<meta property="twitter:description" content=".*?"/, `<meta property="twitter:description" content="${article.excerpt}"`)
      .replace(/<meta property="twitter:image" content=".*?"/, `<meta property="twitter:image" content="${article.thumbnail}"`);

    // 5. Simpan file index.html baru
    fs.writeFileSync(path.join(articleDir, 'index.html'), finalHtml);
  }

  console.log('✅ Success! Static meta files generated.');
  process.exit();
}

generateMetaFiles();