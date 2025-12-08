// src/services/articleService.ts
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Article } from "../types";

const COLLECTION_NAME = "articles";

// 1. Ambil Semua Artikel Terbit (Untuk Halaman Artikel)
export const getPublishedArticles = async (): Promise<Article[]> => {
  try {
    // Query: Ambil koleksi 'articles' DI MANA status == 'Published', Urutkan Tanggal Descending
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("status", "==", "Published"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
  } catch (error) {
    console.error("Error fetching public articles:", error);
    return [];
  }
};

// 2. Ambil Artikel Terbaru (Untuk ditampilkan di Home sebagai preview - Opsional)
export const getRecentArticles = async (count: number = 3): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where("status", "==", "Published"),
      orderBy("createdAt", "desc"),
      limit(count)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Article[];
  } catch (error) {
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("slug", "==", slug),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Article;
    }
    return null;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
};