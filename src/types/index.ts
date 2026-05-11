// src/types/index.ts
import { Timestamp } from "firebase/firestore";

export interface Article {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string; // Markdown content
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: "Draft" | "Published";
  createdAt: Timestamp;
}

// Organization Structure Types
export interface OrganisasiMember {
  id: string;
  nama: string;
  email?: string;
  phone?: string;
  foto?: string; // Base64 encoded image or image URL
  bio?: string;
  mulai_tanggal?: Timestamp;
  selesai_tanggal?: Timestamp;
}

export interface Posisi {
  id: string;
  nama_posisi: string; // Position title (e.g., "Ketua Umum", "Bidang Kajian Strategis")
  order: number;
  anggota: OrganisasiMember[];
}

export interface Sektor {
  id: string;
  nama_sektor: "Rijal" | "Nisa"; // Only these two values
  posisi: Posisi[];
}

export interface OrganizationStructure {
  id?: string;
  periode: string; // Format: "YYYY-YYYY" (e.g., "2025-2026")
  sektors: Sektor[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

// Comment Type
export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
}
