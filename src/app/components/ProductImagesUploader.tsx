// src/components/ProductImagesUploader.tsx
import { Upload } from "lucide-react";
import { UploadedImage } from "../../types";

interface ProductImagesUploaderProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export function ProductImagesUploader({ images, setImages }: ProductImagesUploaderProps) {
  const handleImageUpload = async (file: File, index: number) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Call backend API to upload
      const res = await fetch("https://pharmacy-management-9ym8.onrender.com/images/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json(); // backend returns { url: "..." }

      // Update state
      const newImages = [...images];
      newImages[index] = { imageUrl: data.url, isPrimary: false };
      setImages(newImages);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  return (
    <div>
      <label className="block mb-2">Product Images (5 max)</label>
      <div className="grid grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="aspect-square border-2 border-dashed border-border rounded-lg flex items-center justify-center relative hover:bg-muted transition-colors"
          >
            {img.imageUrl ? (
              <img
                src={img.imageUrl}
                alt={`img-${idx}`}
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <Upload className="w-6 h-6 text-muted-foreground" />
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files?.[0]) handleImageUpload(e.target.files[0], idx);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}