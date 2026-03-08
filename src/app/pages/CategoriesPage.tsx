import { useState, useEffect, ChangeEvent } from "react";
import { Plus, Edit, Trash2, X, DownloadCloud, UploadCloud } from "lucide-react";

interface Category {
  id: number;
  name: string;
  createdAt: string;
  status: "Active" | "Inactive";
}

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://pharmacy-management-9ym8.onrender.com/categories/");
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(
        data.map((c: any) => ({
          id: c.id,
          name: c.name,
          createdAt: c.createdAt,
          status: "Active",
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return alert("Enter a category name");
    try {
      const res = await fetch("https://pharmacy-management-9ym8.onrender.com/categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add category");

      setNewCategoryName("");
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  };

  // Delete category
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`https://pharmacy-management-9ym8.onrender.com/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");

      alert("Category deleted!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  };

  // Toggle status locally
  const toggleStatus = (id: number) =>
    setCategories(
      categories.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );

  // Export categories as CSV
  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,Name,Created At,Status"]
        .concat(categories.map((c) => `${c.id},${c.name},${c.createdAt},${c.status}`))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "categories.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle bulk file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setBulkFile(e.target.files[0]);
  };

  // Bulk upload categories
  const handleBulkUpload = async () => {
    if (!bulkFile) return alert("Select a CSV file");

    try {
      const text = await bulkFile.text();
      const lines = text.split("\n").map((line) => line.trim()).filter((line) => line);

      // Convert CSV lines to objects
      const requests = lines.map((name) => ({ name }));

      const res = await fetch("https://pharmacy-management-9ym8.onrender.com/categories/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requests),
      });
      if (!res.ok) throw new Error("Bulk upload failed");

      setBulkFile(null);
      fetchCategories();
      alert("Bulk upload successful!");
    } catch (err) {
      console.error(err);
      alert("Bulk upload failed");
    }
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <div>
      {/* Top Buttons */}
      <div className="flex flex-wrap gap-4 justify-end mb-6">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DownloadCloud className="w-4 h-4" />
          Export CSV
        </button>

        <label className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
          <UploadCloud className="w-4 h-4" />
          Bulk Import
          <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
        </label>

        {bulkFile && (
          <button
            onClick={handleBulkUpload}
            className="px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 transition-colors"
          >
            Upload File
          </button>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr
                key={c.id}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(c.id)}
                    className={`inline-block px-3 py-1 rounded-full text-xs cursor-pointer ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </button>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
              <h3 className="text-xl font-semibold mb-4">Add Category</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Category Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}