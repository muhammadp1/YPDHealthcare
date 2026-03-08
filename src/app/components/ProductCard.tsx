import { Check, X, Edit, Trash2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string | number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.images.length ? product.images : [""];

  // Auto slideshow: change image every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return; // no need to auto-slide if only one image
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000); // 3000ms = 3 seconds
    return () => clearInterval(interval);
  }, [images]);

  const nextImage = () => setCurrentIndex(prev => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex(prev => (prev - 1 + images.length) % images.length);

const downloadImage = async (url: string) => {
  try {
    const res = await fetch(url, { mode: "cors" }); // fetch image as blob
    if (!res.ok) throw new Error("Failed to fetch image");
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = url.split("/").pop() || "image.jpg";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl); // free memory
  } catch (err) {
    console.error(err);
    alert("Failed to download image");
  }
};

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Carousel */}
      <div className="relative aspect-square bg-muted flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Previous / Next buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1 rounded-full hover:bg-black/50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Download button */}
        {images[currentIndex] && (
          <button
            onClick={() => downloadImage(images[currentIndex])}
            className="absolute bottom-2 right-2 bg-white/80 text-gray-800 p-1 rounded-full hover:bg-white/100"
          >
            <Download className="w-5 h-5" />
          </button>
        )}

        {/* Image indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 bg-black/30 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h4 className="mb-1 font-semibold">{product.name}</h4>
        <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
        
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mb-4">
          {product.category}
        </span>
        
        <div className="mb-4">
          <p className="text-sm mb-2">Platforms:</p>
          <div className="flex flex-wrap gap-2">
            {product.platforms.map((platform) => (
              <span key={platform} className="text-xs px-2 py-1 bg-gray-100 rounded">
                {platform}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}