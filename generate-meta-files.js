import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from 'fs';
import path from 'path';

// 1. Konfigurasi Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Konfigurasi Path
const DIST_DIR = './dist'; 
const BASE_URL = 'https://lspiuinbdg.vercel.app'; // Ganti dengan domain asli Anda
const TEMPLATE_PATH = './dist/index.html';

async function generateMetaFiles() {
  console.log('🚀 Starting Static Meta File & Image Generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: Folder "dist" not found. Run "npm run build" first.');
    process.exit(1);
  }

  let templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  console.log('📥 Fetching articles from Firestore...');
  const querySnapshot = await getDocs(collection(db, "articles"));
  const articles = querySnapshot.docs
    .map(doc => doc.data())
    .filter(a => a.status === 'Published');

  console.log(`📝 Processing ${articles.length} articles...`);

  for (const article of articles) {
    const articleDir = path.join(DIST_DIR, 'artikel', article.slug);
    
    // Buat folder artikel jika belum ada
    if (!fs.existsSync(articleDir)){
        fs.mkdirSync(articleDir, { recursive: true });
    }

    // --- LOGIC BARU: CONVERT BASE64 KE FILE ---
    let imageUrl = `${BASE_URL}/social-card.jpg`; // Default jika tidak ada thumbnail

    if (article.thumbnail && article.thumbnail.startsWith('data:image')) {
      try {
        // 1. Ambil data Base64 (buang prefix "data:image/jpeg;base64,")
        const matches = article.thumbnail.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        
        if (matches && matches.length === 3) {
          const buffer = Buffer.from(matches[2], 'base64');
          const imageFilename = 'thumbnail.jpg';
          const imagePath = path.join(articleDir, imageFilename);

          // 2. Tulis file gambar fisik ke folder dist/artikel/{slug}/thumbnail.jpg
          fs.writeFileSync(imagePath, buffer);
          
          // 3. Set URL publik untuk meta tag
          imageUrl = `${BASE_URL}/artikel/${article.slug}/${imageFilename}`;
          console.log(`   🖼️  Generated image for: ${article.slug}`);
        }
      } catch (err) {
        console.error(`   ⚠️ Failed to convert image for ${article.slug}:`, err);
      }
    } else if (article.thumbnail && article.thumbnail.startsWith('http')) {
      // Jika thumbnail sudah berupa URL (misal dari link eksternal), pakai langsung
      imageUrl = article.thumbnail;
    }

    // --- SUNTIKKAN METADATA (Sekarang pakai imageUrl yang valid) ---
    let finalHtml = templateHtml
      .replace(/<title>.*?<\/title>/, `<title>${article.title} | LSPI</title>`)
      .replace(/<meta name="description" content=".*?"/, `<meta name="description" content="${article.excerpt}"`)
      
      // Open Graph
      .replace(/<meta property="og:title" content=".*?"/, `<meta property="og:title" content="${article.title}"`)
      .replace(/<meta property="og:description" content=".*?"/, `<meta property="og:description" content="${article.excerpt}"`)
      .replace(/<meta property="og:image" content=".*?"/, `<meta property="og:image" content="${imageUrl}"`) // 👈 URL valid
      .replace(/<meta property="og:url" content=".*?"/, `<meta property="og:url" content="${BASE_URL}/artikel/${article.slug}"`)
      
      // Twitter
      .replace(/<meta property="twitter:title" content=".*?"/, `<meta property="twitter:title" content="${article.title}"`)
      .replace(/<meta property="twitter:description" content=".*?"/, `<meta property="twitter:description" content="${article.excerpt}"`)
      .replace(/<meta property="twitter:image" content=".*?"/, `<meta property="twitter:image" content="${imageUrl}"`); // 👈 URL valid

    fs.writeFileSync(path.join(articleDir, 'index.html'), finalHtml);
  }

  console.log('✅ Success! Static files & images generated.');
  process.exit();
}

generateMetaFiles();