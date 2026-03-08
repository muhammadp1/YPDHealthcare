import { Check, X, Edit, Trash2 } from "lucide-react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string | number) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      {/* First image as thumbnail */}
      <div className="aspect-square bg-muted">
        <img
          src={product.images[0] || ""}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h4 className="mb-1">{product.name}</h4>
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