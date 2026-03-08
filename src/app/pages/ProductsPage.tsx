import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { AddProductModal } from "../components/AddProductModal";
import { Product } from "../../types";
import { BulkUploadModal } from "../components/BulkUploadModal";

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null); // <-- new
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  // Fetch products
 useEffect(() => {
  fetchProducts(); 
      
  }, [isModalOpen]);

  const fetchProducts = (page = 0, size = 1000) => { // fetch many items at once
  fetch(`http://localhost:8080/products?page=${page}&size=${size}`)
    .then(res => res.json())
    .then(data => {
      if (data.content) setProducts(data.content);
    })
    .catch(console.error);
};



  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];
  const platformNames = ["all", ...Array.from(new Set(products.flatMap((p) => p.platforms)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesPlatform = platformFilter === "all" || product.platforms.includes(platformFilter);
    return matchesSearch && matchesCategory && matchesPlatform;
  });

  const handleEdit = (product: Product) => {
    setProductToEdit(product); // <-- set product to edit
    setIsModalOpen(true);      // <-- open modal
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8080/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      alert("Product deleted!");
      // Refresh product list after deletion
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  const handleModalClose = () => {
    setProductToEdit(null); // clear edit state
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Filters & Add Button */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring">
            {platformNames.map((platform) => (
              <option key={platform} value={platform}>
                {platform === "all" ? "All Platforms" : platform}
              </option>
            ))}
          </select>
          {/* bulk upload button */}
          <button
            onClick={() => setIsBulkUploadOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Bulk Upload
          </button>

          <button onClick={() => { setProductToEdit(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={() => handleDelete(Number(product.id))}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No products found matching your filters.
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        productToEdit={productToEdit} // <-- pass product to edit
      />

      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onUpload={() => {
          fetchProducts(); // refresh products after bulk upload
        }}
      />
    </div>
  );
}