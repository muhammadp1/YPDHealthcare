import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

interface Pharmacy {
  id: number;
  name: string;
  location?: string;
  createdAt: string;
  status: "Active" | "Inactive";
}

export function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPharmacyName, setNewPharmacyName] = useState("");

  // Fetch pharmacies
  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://pharmacy-management-9ym8.onrender.com/pharmacies");
      if (!res.ok) throw new Error("Failed to fetch pharmacies");

      const data = await res.json();
      setPharmacies(
        data.map((p: any) => ({
          id: p.id,
          name: p.name,
          createdAt: p.createdAt,
          status: "Active",
        }))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load pharmacies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleAddPharmacy = async () => {
    if (!newPharmacyName.trim()) return alert("Enter a pharmacy name");

    try {
      const res = await fetch("https://pharmacy-management-9ym8.onrender.com/pharmacies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newPharmacyName.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add pharmacy");

      setNewPharmacyName("");
      setIsModalOpen(false);
      fetchPharmacies(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add pharmacy");
    }
  };

  const handleDelete = (id: number) =>
    setPharmacies(pharmacies.filter((p) => p.id !== id));

  const toggleStatus = (id: number) =>
    setPharmacies(
      pharmacies.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );

  if (loading) return <div>Loading pharmacies...</div>;

  return (
    <div>
      {/* Add Pharmacy Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Pharmacy
        </button>
      </div>

      {/* Pharmacies Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Location</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((p) => (
              <tr
                key={p.id}
                className="border-t border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {p.location || "-"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(p.id)}
                    className={`inline-block px-3 py-1 rounded-full text-xs cursor-pointer ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </button>
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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

      {/* Add Pharmacy Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
              <h3 className="text-xl font-semibold mb-4">Add Pharmacy</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Pharmacy Name"
                value={newPharmacyName}
                onChange={(e) => setNewPharmacyName(e.target.value)}
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
                  onClick={handleAddPharmacy}
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