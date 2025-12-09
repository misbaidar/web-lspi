// generate-sitemap.js
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fs from 'fs';

// 1. Firebase Config (Copy from your .env or config file)
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

// 2. Configuration
const BASE_URL = 'https://lspiuinbdg.vercel.app'; // Ganti dengan domain publik Anda
const PUBLIC_DIR = './public';

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&"']/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
      default: return c;
    }
  });
}

async function generateSitemap() {
  console.log('Fetching articles from Firestore...');
  
  const querySnapshot = await getDocs(collection(db, "articles"));
  const articles = querySnapshot.docs
    .map(doc => doc.data())
    .filter(a => a.status === 'Published');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/artikel</loc>
    <priority>0.8</priority>
  </url>

  ${articles.map(article => `
  <url>
    <loc>${BASE_URL}/artikel/${escapeXml(article.slug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(`${PUBLIC_DIR}/sitemap.xml`, sitemap);
  console.log(`Successfully generated sitemap with ${articles.length} articles.`);
  process.exit();
}

generateSitemap();