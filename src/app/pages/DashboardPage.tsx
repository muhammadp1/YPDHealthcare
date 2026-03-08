import { useState, useEffect } from "react";
import { Package, Layers, Building2 } from "lucide-react";

export function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [platformCount, setPlatformCount] = useState(0);
  const [pharmacyCount, setPharmacyCount] = useState(0);

  useEffect(() => {
    fetch("https://pharmacy-management-9ym8.onrender.com/products/count")
      .then(res => res.json())
      .then(data => setProductCount(data.count));

    fetch("https://pharmacy-management-9ym8.onrender.com/platforms/count?status=Active")
      .then(res => res.json())
      .then(data => setPlatformCount(data.count));

    fetch("https://pharmacy-management-9ym8.onrender.com/pharmacies/count")
      .then(res => res.json())
      .then(data => setPharmacyCount(data.count));
  }, []);

  const summaryCards = [
    { title: "Total Products", value: productCount, icon: Package, color: "bg-blue-500" },
    { title: "Active Platforms", value: platformCount, icon: Layers, color: "bg-green-500" },
    { title: "Total Pharmacies", value: pharmacyCount, icon: Building2, color: "bg-purple-500" },
  ];

  // Hardcoded recent activity
  const recentActivity = [
    { color: "green", text: "New product added: Vitamin D3 Capsules" },
    { color: "blue", text: "Platform updated: Amazon integration active" },
    { color: "purple", text: "New pharmacy registered: Downtown Pharmacy" },
    { color: "yellow", text: "Product price updated: Paracetamol 500mg" },
  ];

  // Hardcoded platform status
  const platforms = [
    { name: "Amazon", status: "Active", logo: "/src/app/components/image.png" },
    { name: "Ebay", status: "Inactive", logo: "/src/app/components/image.png" },
    { name: "Temu", status: "Active", logo: "/src/app/components/image.png" },
    { name: "TikTok", status: "Active", logo: "/src/app/components/image.png" },
  ];

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map(card => (
          <div key={card.title} className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
            <div className={`flex items-center justify-between mb-4`}>
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl mb-2">{card.value}</h3>
            <p className="text-muted-foreground">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity + Platform Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((act, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className={`w-2 h-2 rounded-full bg-${act.color}-500`}></div>
                <span className="text-sm">{act.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Status */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="mb-4 text-lg font-semibold">Platform Status</h3>
          <div className="space-y-3">
            {platforms.map((platform, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={platform.logo} alt={platform.name} className="w-8 h-8 rounded" />
                  <span className="text-sm">{platform.name}</span>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  platform.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {platform.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}