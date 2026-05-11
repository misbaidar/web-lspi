// src/services/commentService.ts
import { collection, addDoc, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import type { Comment } from "../types";

const COLLECTION_NAME = "comments";

/**
 * Save a new comment to Firestore
 */
export const saveComment = async (
  articleId: string,
  authorName: string,
  content: string
): Promise<string | null> => {
  try {
    if (!content.trim()) {
      throw new Error("Comment cannot be empty");
    }

    if (content.length > 500) {
      throw new Error("Comment must be 500 characters or less");
    }

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      articleId,
      authorName: authorName.trim() || "Guest",
      content: content.trim(),
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error saving comment:", error);
    throw error;
  }
};

/**
 * Get all comments for a specific article, ordered by newest first
 */
export const getCommentsByArticleId = async (articleId: string): Promise<Comment[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("articleId", "==", articleId)
    );

    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt,
    })) as Comment[];

    // Sort by createdAt in JavaScript (newest first)
    return comments.sort((a, b) => {
      const timeA = a.createdAt?.toMillis?.() || 0;
      const timeB = b.createdAt?.toMillis?.() || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

/**
 * Format timestamp to readable date string
 */
export const formatCommentDate = (timestamp: Timestamp): string => {
  if (!timestamp) return "";
  
  const date = timestamp.toDate();
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
