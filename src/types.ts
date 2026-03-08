// src/types.ts
export interface UploadedImage {
  imageUrl: string | null;
  isPrimary: boolean; // optional for now if you want
}

// --- Category ---
export interface Category {
  id: string | number;      // backend might return string or number id
  name: string;
}

// --- Platform ---
export interface Platform {
  id: string | number;
  name: string;
}

// --- Pharmacy ---
export interface Pharmacy {
  id: string | number;
  name: string;
}

// --- Product Payload (optional, for Add Product API) ---
export interface AddProductPayload {
  name: string;
  sku: string;
  category: string;
  platforms: string[];      // list of platform names
  pharmacies: string[];     // list of pharmacy names
  images: string[];         // array of uploaded image URLs
}

// src/types.ts
export interface Product {
  id: number | string;
  name: string;
  sku: string;
  pharmacy: string;
  category: string;
  platforms: string[];   // backend array of platform names
  images: string[];      // array of image URLs
  createdAt: string;
}