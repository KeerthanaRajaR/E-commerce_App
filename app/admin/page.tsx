"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type TimeRange = "7d" | "30d" | "90d";

type StoreSettings = {
  storeName: string;
  supportEmail: string;
  currency: string;
  lowStockThreshold: number;
  autoConfirmOrders: boolean;
};

const defaultSettings: StoreSettings = {
  storeName: "SmartCart",
  supportEmail: "support@smartcart.com",
  currency: "INR",
  lowStockThreshold: 5,
  autoConfirmOrders: false,
};

export default function AdminPage() {
  const [range, setRange] = useState<TimeRange>("30d");
  const [lastReportAt, setLastReportAt] = useState<string>("");
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [saveMessage, setSaveMessage] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_settings");
    if (!saved) return;
    try {
      setSettings(JSON.parse(saved) as StoreSettings);
    } catch {
      setSettings(defaultSettings);
    }
  }, []);

  const analytics = useMemo(() => {
    if (range === "7d") return { revenue: "₹58,200", orders: 34, conversion: "3.6%", avgOrder: "₹1,712" };
    if (range === "90d") return { revenue: "₹6,73,400", orders: 398, conversion: "4.2%", avgOrder: "₹1,692" };
    return { revenue: "₹2,45,000", orders: 156, conversion: "3.9%", avgOrder: "₹1,570" };
  }, [range]);

  const handleGenerateReport = () => {
    setLastReportAt(new Date().toLocaleString("en-IN"));
  };

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_settings", JSON.stringify(settings));
    setSaveMessage("Settings saved successfully.");
  };

  const handleResetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem("admin_settings", JSON.stringify(defaultSettings));
    setSaveMessage("Settings reset to default values.");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Sales</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">₹2,45,000</p>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Orders</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">156</p>
            <p className="text-sm text-blue-600 mt-2">23 pending</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold uppercase">Total Products</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">42</p>
            <p className="text-sm text-purple-600 mt-2">5 low stock</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold uppercase">Customers</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">328</p>
            <p className="text-sm text-orange-600 mt-2">+45 this week</p>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">📦 Product Management</h3>
            <p className="text-gray-600 mb-4">Add, edit, and delete products from your catalog</p>
            <Link href="/products" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
              Manage Products
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">📋 Order Management</h3>
            <p className="text-gray-600 mb-4">Track and manage all customer orders</p>
            <Link href="#recent-orders" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
              View Orders
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">👥 Customer Management</h3>
            <p className="text-gray-600 mb-4">View customer details and purchase history</p>
            <Link href="/wishlist" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
              View Customers
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">📊 Analytics</h3>
            <p className="text-gray-600 mb-4">View sales trends and business insights</p>
            <Link href="#analytics" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
              View Analytics
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">⚙️ Settings</h3>
            <p className="text-gray-600 mb-4">Configure store settings and preferences</p>
            <Link href="#settings" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
              Settings
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">🔍 AI Insights</h3>
            <p className="text-gray-600 mb-4">Get AI-powered insights for your store</p>
            <Link href="#analytics" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
              AI Analytics
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div id="recent-orders" className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold">Total</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">#ORD-001</td>
                  <td className="px-4 py-3">John Doe</td>
                  <td className="px-4 py-3">₹8,999</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Delivered
                    </span>
                  </td>
                  <td className="px-4 py-3">2024-04-01</td>
                </tr>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">#ORD-002</td>
                  <td className="px-4 py-3">Jane Smith</td>
                  <td className="px-4 py-3">₹15,499</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Processing
                    </span>
                  </td>
                  <td className="px-4 py-3">2024-04-02</td>
                </tr>
                <tr className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">#ORD-003</td>
                  <td className="px-4 py-3">Mike Johnson</td>
                  <td className="px-4 py-3">₹22,500</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3">2024-04-03</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="analytics" className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold mb-4">Analytics Snapshot</h3>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <label htmlFor="range" className="text-sm font-medium text-gray-700">Time Range</label>
            <select
              id="range"
              value={range}
              onChange={(e) => setRange(e.target.value as TimeRange)}
              className="border rounded px-3 py-2"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              type="button"
              onClick={handleGenerateReport}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
            >
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded border p-4">
              <p className="text-xs uppercase text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.revenue}</p>
            </div>
            <div className="rounded border p-4">
              <p className="text-xs uppercase text-gray-500">Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.orders}</p>
            </div>
            <div className="rounded border p-4">
              <p className="text-xs uppercase text-gray-500">Conversion</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.conversion}</p>
            </div>
            <div className="rounded border p-4">
              <p className="text-xs uppercase text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{analytics.avgOrder}</p>
            </div>
          </div>

          {lastReportAt && (
            <p className="text-sm text-green-700 mt-4">Report generated at {lastReportAt}</p>
          )}
        </div>

        <div id="settings" className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold mb-4">Settings</h3>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  value={settings.storeName}
                  onChange={(e) => setSettings((prev) => ({ ...prev, storeName: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings((prev) => ({ ...prev, currency: e.target.value }))}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
                <input
                  type="number"
                  min={1}
                  value={settings.lowStockThreshold}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, lowStockThreshold: Number(e.target.value) || 1 }))
                  }
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={settings.autoConfirmOrders}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, autoConfirmOrders: e.target.checked }))
                }
              />
              Auto-confirm orders after successful payment
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
              >
                Save Settings
              </button>
              <button
                type="button"
                onClick={handleResetSettings}
                className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition font-semibold"
              >
                Reset
              </button>
            </div>
          </form>

          {saveMessage && <p className="text-sm text-green-700 mt-4">{saveMessage}</p>}
        </div>
      </div>
    </>
  );
}
