// src/services/organizationStructureService.ts
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import type { OrganizationStructure } from "../types";

const COLLECTION_NAME = "organizationStructures";

/**
 * Fetch all organization structures (periods) from Firestore
 * Sorted by periode in descending order (most recent first)
 */
export const getAllOrganizationStructures = async (): Promise<OrganizationStructure[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("periode", "desc")
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      } as OrganizationStructure;
    });
  } catch (error) {
    console.error("Error fetching organization structures:", error);
    return [];
  }
};

/**
 * Get the current period based on the current year
 * Returns the organization structure where currentYear falls within the periode range
 * @param structures - Array of organization structures
 * @returns The current organization structure or the most recent one
 */
export const getCurrentOrganizationStructure = (
  structures: OrganizationStructure[]
): OrganizationStructure | null => {
  if (structures.length === 0) return null;

  const currentYear = new Date().getFullYear();

  // Try to find a period that matches the current year
  const current = structures.find(org => {
    const [startYear, endYear] = org.periode.split("-").map(Number);
    return currentYear >= startYear && currentYear <= endYear;
  });

  // If no match, return the most recent period
  return current || structures[0];
};

/**
 * Extract year range from periode string
 * @param periode - Period in format "YYYY-YYYY"
 * @returns Object with startYear and endYear
 */
export const extractYearRange = (
  periode: string
): { startYear: number; endYear: number } => {
  const [startYear, endYear] = periode.split("-").map(Number);
  return { startYear, endYear };
};
