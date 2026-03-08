export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  image: string;
  platformAvailability: {
    [key: string]: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

export interface Platform {
  id: string;
  name: string;
  logo: string;
  status: "Active" | "Inactive";
}

export interface Pharmacy {
  id: string;
  name: string;
  location: string;
  status: "Active" | "Inactive";
}

export const platforms: Platform[] = [
  { id: "1", name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", status: "Active" },
  { id: "2", name: "CVS", logo: "https://logo.clearbit.com/cvs.com", status: "Active" },
  { id: "3", name: "Walgreens", logo: "https://logo.clearbit.com/walgreens.com", status: "Active" },
  { id: "4", name: "Walmart", logo: "https://logo.clearbit.com/walmart.com", status: "Inactive" },
];

export const pharmacies: Pharmacy[] = [
  { id: "1", name: "Downtown Pharmacy", location: "123 Main St, New York, NY", status: "Active" },
  { id: "2", name: "Riverside Pharmacy", location: "456 River Rd, Boston, MA", status: "Active" },
  { id: "3", name: "Central Pharmacy", location: "789 Central Ave, Chicago, IL", status: "Active" },
  { id: "4", name: "Sunset Pharmacy", location: "321 Sunset Blvd, Los Angeles, CA", status: "Inactive" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Vitamin D3 Capsules",
    sku: "VIT-D3-1000",
    category: "Vitamins",
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudCUyMGNhcHN1bGVzfGVufDF8fHx8MTc3MjkzODgwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": true,
      "CVS": true,
      "Walgreens": false,
      "Walmart": true,
    },
  },
  {
    id: "2",
    name: "Aspirin 500mg Tablets",
    sku: "ASP-500-100",
    category: "Pain Relief",
    image: "https://images.unsplash.com/photo-1769702247711-5f554fcfc103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBtZWRpY2F0aW9uJTIwdGFibGV0c3xlbnwxfHx8fDE3NzI5Mzg4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": true,
      "CVS": false,
      "Walgreens": true,
      "Walmart": true,
    },
  },
  {
    id: "3",
    name: "Omega-3 Fish Oil",
    sku: "OMG-FO-1200",
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1632024956972-90f6f1ab7807?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGwlMjBib3R0bGV8ZW58MXx8fHwxNzcyOTM4ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": true,
      "CVS": true,
      "Walgreens": true,
      "Walmart": false,
    },
  },
  {
    id: "4",
    name: "Pain Relief Cream",
    sku: "PRC-50G-01",
    category: "Topical",
    image: "https://images.unsplash.com/photo-1532017572539-7c0563019cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY3JlYW0lMjB0dWJlfGVufDF8fHx8MTc3MjkzODgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": false,
      "CVS": true,
      "Walgreens": true,
      "Walmart": true,
    },
  },
  {
    id: "5",
    name: "Cough Syrup 120ml",
    sku: "CS-120-RED",
    category: "Cold & Flu",
    image: "https://images.unsplash.com/photo-1647943746660-1640133068d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMHN5cnVwJTIwYm90dGxlfGVufDF8fHx8MTc3MjkzODgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": true,
      "CVS": true,
      "Walgreens": false,
      "Walmart": false,
    },
  },
  {
    id: "6",
    name: "Protein Powder Vanilla",
    sku: "PP-VAN-1KG",
    category: "Supplements",
    image: "https://images.unsplash.com/photo-1764175098858-d206d4fbc084?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzdXBwbGVtZW50JTIwcG93ZGVyfGVufDF8fHx8MTc3MjkzODgxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": true,
      "CVS": false,
      "Walgreens": true,
      "Walmart": true,
    },
  },
  {
    id: "7",
    name: "Multivitamin Complex",
    sku: "MVC-100-DLY",
    category: "Vitamins",
    image: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudCUyMGNhcHN1bGVzfGVufDF8fHx8MTc3MjkzODgwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": true,
      "CVS": true,
      "Walgreens": true,
      "Walmart": true,
    },
  },
  {
    id: "8",
    name: "Ibuprofen 200mg",
    sku: "IBU-200-50",
    category: "Pain Relief",
    image: "https://images.unsplash.com/photo-1769702247711-5f554fcfc103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBtZWRpY2F0aW9uJTIwdGFibGV0c3xlbnwxfHx8fDE3NzI5Mzg4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    platformAvailability: {
      "Amazon": false,
      "CVS": true,
      "Walgreens": true,
      "Walmart": false,
    },
  },
];

export const users: User[] = [
  { id: "1", email: "admin@example.com", role: "Admin", status: "Active" },
  { id: "2", email: "manager@example.com", role: "Manager", status: "Active" },
  { id: "3", email: "staff@example.com", role: "Staff", status: "Active" },
  { id: "4", email: "viewer@example.com", role: "Viewer", status: "Inactive" },
];
