import React, { useState, useEffect } from "react";
import { X, ShoppingBag, Users, DollarSign, Database, Download, RefreshCw, CheckCircle2, Search, ArrowUpRight } from "lucide-react";
import { getStoredOrders, getStoredLeads } from "../data/mockDatabase";
import { exportOrdersToCsv, exportLeadsToCsv } from "../services/orderService";

export function AdminDashboardModal({ isOpen, onClose, settings }) {
  const [activeTab, setActiveTab] = useState("orders"); // "orders" or "leads"
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOrders(getStoredOrders());
      setLeads(getStoredLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.interestCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="bg-slate-950 border border-purple-500/30 rounded-2xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-xl">E-Commerce AI Admin Dashboard</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px]">
                  Live Database
                </span>
              </div>
              <p className="text-slate-400 text-xs">Engineered by <strong className="text-purple-400">Fouzi</strong> • Track AI Orders & Captured Leads</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white">${totalRevenue.toFixed(2)}</div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>AI Placed Orders</span>
              <ShoppingBag className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-white">{orders.length}</div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>Captured Leads</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-xl font-black text-white">{leads.length}</div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-1">
              <span>DB Connection</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs font-extrabold text-slate-200 capitalize truncate">
              {settings?.dbMode === 'demo' ? 'Local DB' : settings?.dbMode || 'Active DB'}
            </div>
          </div>
        </div>

        {/* Nav Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "orders" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "leads" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Captured Leads ({leads.length})
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders or leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white outline-none"
              />
            </div>

            {activeTab === "orders" ? (
              <button
                onClick={() => exportOrdersToCsv(orders)}
                className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white border border-purple-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                title="Export Orders CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            ) : (
              <button
                onClick={() => exportLeadsToCsv(leads)}
                className="px-3 py-1.5 rounded-lg bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600 hover:text-white border border-cyan-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                title="Export Leads CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-y-auto border border-slate-800 rounded-xl bg-slate-900/50">
          
          {/* ORDERS TABLE */}
          {activeTab === "orders" && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-purple-400">{o.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{o.customerName}</div>
                        <div className="text-[10px] text-slate-400">{o.customerEmail}</div>
                      </td>
                      <td className="p-3">
                        {o.items?.map((item, idx) => (
                          <div key={idx} className="line-clamp-1">{item.name} (x{item.quantity})</div>
                        ))}
                      </td>
                      <td className="p-3 font-bold text-emerald-400">${o.totalAmount?.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* LEADS TABLE */}
          {activeTab === "leads" && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-3">Lead ID</th>
                  <th className="p-3">Contact Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Interest Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">No leads captured yet.</td>
                  </tr>
                ) : (
                  filteredLeads.map(l => (
                    <tr key={l.id} className="hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-400">{l.id}</td>
                      <td className="p-3 font-semibold text-white">{l.name}</td>
                      <td className="p-3">
                        <div>{l.email}</div>
                        <div className="text-[10px] text-slate-400">{l.phone || 'No phone'}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-purple-300 font-medium">{l.interestCategory}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {l.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">
                        {new Date(l.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

        </div>

      </div>
    </div>
  );
}
