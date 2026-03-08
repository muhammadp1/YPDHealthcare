import { useState } from "react";

export function BulkUploadModal({ isOpen, onClose, onUpload }: any) {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) return alert("Please select a CSV file");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("https://pharmacy-management-9ym8.onrender.com/products/bulk-upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            alert(data.message);
            onUpload(); // refresh products after upload
            onClose();
        } catch (err: unknown) {
            console.error(err);
            if (err instanceof Error) {
                alert(err.message);
            } else {
                alert("Unknown error occurred during bulk upload");
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-lg mb-4">Bulk Upload Products (CSV)</h3>
                <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
                    <button onClick={handleUpload} className="px-4 py-2 bg-primary text-white rounded-lg">Upload</button>
                </div>
            </div>
        </div>
    );
}