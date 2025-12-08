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
