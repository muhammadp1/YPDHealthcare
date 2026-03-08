import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ProductImagesUploader } from "./ProductImagesUploader";
import { UploadedImage, Category, Platform, Pharmacy, Product } from "../../types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null; // <-- new prop
}

export function AddProductModal({ isOpen, onClose, productToEdit }: AddProductModalProps) {
  // Form State
  const [images, setImages] = useState<UploadedImage[]>(Array(5).fill({ imageUrl: null, isPrimary: false }));
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPharmacies, setSelectedPharmacies] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");      // what user types / sees
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // ID sent to backend

  // Dropdown Data
  const [categories, setCategories] = useState<Category[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  // Prefill fields when editing
 useEffect(() => {
  if (!isOpen) return;

  if (productToEdit) {
    setProductName(productToEdit.name);
    setSku(productToEdit.sku);

    // Prefill category AFTER categories are loaded
    if (categories.length > 0) {
      const category = categories.find(cat => cat.name === productToEdit.category);
      if (category) {
        setSelectedCategoryId(category.id.toString());
        setCategoryInput(category.name); // ✅ This sets the input field
      } else {
        setSelectedCategoryId("");
        setCategoryInput("");
      }
    }

    const platformIds = platforms
      .filter(p => productToEdit.platforms.includes(p.name))
      .map(p => p.id.toString());
    setSelectedPlatforms(platformIds);

    const pharmacyId = pharmacies.find(ph => ph.name === productToEdit.pharmacy)?.id;
    setSelectedPharmacies(pharmacyId !== undefined ? [pharmacyId.toString()] : []);

    setImages(
      productToEdit.images.map(img => ({ imageUrl: img, isPrimary: false }))
        .concat(Array(5 - productToEdit.images.length).fill({ imageUrl: null, isPrimary: false }))
    );
  } else {
    resetForm();
  }
}, [productToEdit, categories, platforms, pharmacies, isOpen]);
  // Fetch categories, platforms, pharmacies
  useEffect(() => {
    if (!isOpen) return;

    fetch("https://pharmacy-management-9ym8.onrender.com/categories/").then(res => res.json()).then(data => setCategories(Array.isArray(data) ? data : [])).catch(() => setCategories([]));
    fetch("https://pharmacy-management-9ym8.onrender.com/platforms").then(res => res.json()).then(setPlatforms).catch(console.error);
    fetch("https://pharmacy-management-9ym8.onrender.com/pharmacies").then(res => res.json()).then(setPharmacies).catch(console.error);
  }, [isOpen]);

  const togglePlatform = (platform: string) => setSelectedPlatforms(prev =>
    prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
  );
  const togglePharmacy = (pharmacy: string) => setSelectedPharmacies(prev =>
    prev.includes(pharmacy) ? prev.filter(p => p !== pharmacy) : [...prev, pharmacy]
  );

  const resetForm = () => {
    setImages(Array(5).fill({ imageUrl: null, isPrimary: false }));
    setProductName("");
    setSku("");
    setSelectedCategory("");
    setSelectedPlatforms([]);
    setSelectedPharmacies([]);
  };

  const handleSubmit = async () => {
    const payload = {
      name: productName,
      sku,
      categoryId: selectedCategoryId, // must be ID (Long) not name
      platformIds: selectedPlatforms,
      pharmacyId: selectedPharmacies[0],
      images: images.filter(img => img.imageUrl).map(img => ({ imageUrl: img.imageUrl, isPrimary: img.isPrimary })),
    };

    try {
      const url = productToEdit
        ? `https://pharmacy-management-9ym8.onrender.com/products/${productToEdit.id}/update`
        : "https://pharmacy-management-9ym8.onrender.com/products";
      const method = productToEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save product");

      alert(productToEdit ? "Product updated!" : "Product added!");
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { resetForm(); onClose(); }} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
            <h3 className="text-xl">{productToEdit ? "Edit Product" : "Add New Product"}</h3>
            <button onClick={() => { resetForm(); onClose(); }} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            <ProductImagesUploader images={images} setImages={setImages} />
            {/* Product Name */}
            <div>
              <label className="block mb-2">Product Name</label>
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {/* SKU */}
            <div>
              <label className="block mb-2">SKU</label>
              <input type="text" value={sku} onChange={e => setSku(e.target.value)}
                placeholder="Enter SKU"
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {/* Category */}
            <div>
             
              <div>
                <label className="block mb-2">Category</label>
                <div className="relative">
                  <input
                    type="text"
                    value={categoryInput}
                    onChange={(e) => {
                      setCategoryInput(e.target.value);
                      setSelectedCategoryId(""); // reset ID if user types
                    }}
                    placeholder="Select or type category"
                    className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />

                  {/* Dropdown list */}
                  {isOpen && categoryInput && (
                    <ul className="absolute z-50 w-full max-h-48 overflow-y-auto bg-white border border-border mt-1 rounded-lg shadow-md">
                      {categories
                        .filter(cat => cat.name.toLowerCase().includes(categoryInput.toLowerCase()))
                        .map(cat => (
                          <li
                            key={cat.id}
                            onClick={() => {
                              setCategoryInput(cat.name);
                              setSelectedCategoryId(cat.id.toString());
                            }}
                            className="px-4 py-2 hover:bg-muted cursor-pointer"
                          >
                            {cat.name}
                          </li>
                        ))}

                      {/* Add new category if not exists */}
                      {!categories.some(cat => cat.name.toLowerCase() === categoryInput.toLowerCase()) && (
                        <li
                          onClick={async () => {
                            try {
                              const res = await fetch("https://pharmacy-management-9ym8.onrender.com/categories/", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ name: categoryInput }),
                              });
                              if (!res.ok) throw new Error("Failed to create category");
                              const newCat = await res.json();
                              setCategories([...categories, newCat]);
                              setCategoryInput(newCat.name);
                              setSelectedCategoryId(newCat.id.toString());
                              alert(`Category "${newCat.name}" added!`);
                            } catch (err) {
                              console.error(err);
                              alert("Error adding category");
                            }
                          }}
                          className="px-4 py-2 hover:bg-green-100 cursor-pointer flex items-center justify-between"
                        >
                          <span>Add "{categoryInput}"</span>
                          <span className="text-green-500 font-bold">+</span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {/* Platforms */}
            <div>
              <label className="block mb-3">Select Platforms</label>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map(p => (
                  <label key={p.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                    <input type="checkbox"
                      checked={selectedPlatforms.includes(p.id.toString())}
                      onChange={() => togglePlatform(p.id.toString())}
                      className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Pharmacies */}
            <div>
              <label className="block mb-3">Select Pharmacies</label>
              <div className="grid grid-cols-1 gap-3">
                {pharmacies.map(p => (
                  <label key={p.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                    <input type="checkbox"
                      checked={selectedPharmacies.includes(p.id.toString())}
                      onChange={() => togglePharmacy(p.id.toString())}
                      className="w-4 h-4 rounded border-border" />
                    <span className="text-sm">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button onClick={() => { resetForm(); onClose(); }}
                className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors">Cancel</button>
              <button onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                {productToEdit ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}