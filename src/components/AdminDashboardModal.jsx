import React, { useState, useEffect } from "react";
import { X, ShoppingBag, Users, DollarSign, Database, Download, Search, Activity, ShieldCheck, UserCheck, BarChart3 } from "lucide-react";
import { getStoredOrders, getStoredLeads } from "../data/mockDatabase";
import { exportOrdersToCsv, exportLeadsToCsv } from "../services/orderService";

export function AdminDashboardModal({ isOpen, onClose, settings }) {
  const [activeTab, setActiveTab] = useState("orders"); // "orders", "leads", "analytics"
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHumanTakeover, setIsHumanTakeover] = useState(false);

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
        className="bg-white border border-purple-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden animate-slideUp max-h-[90vh] flex flex-col text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 shrink-0">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Business Intelligence & Admin Dashboard</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 font-bold text-[11px]">
                  Live Analytics
                </span>
              </div>
              <p className="text-slate-600 text-xs font-semibold">Engineered by <strong className="text-purple-600">Fouzi</strong> • Real-Time AI Sales & Performance Suite</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Key Metrics Cards (25-Module BI Analytics) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>AI Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-slate-900">${totalRevenue.toFixed(2)}</div>
            <span className="text-[10px] text-emerald-600 font-bold">+24.8% vs last month</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>AI Placed Orders</span>
              <ShoppingBag className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xl font-black text-slate-900">{orders.length}</div>
            <span className="text-[10px] text-purple-600 font-bold">18.5% Conv. Rate</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>Captured Leads</span>
              <Users className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-xl font-black text-slate-900">{leads.length}</div>
            <span className="text-[10px] text-cyan-600 font-bold">94.2% AI Resolution</span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
              <span>CSAT Rating</span>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-black text-slate-900">4.9 / 5.0</div>
            <span className="text-[10px] text-amber-600 font-bold">98.4% NPS Score</span>
          </div>
        </div>

        {/* Live Chat Human Handoff Controller */}
        <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-purple-600" />
            <span className="font-extrabold text-slate-900">Live Human Support Handoff Mode:</span>
            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${isHumanTakeover ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {isHumanTakeover ? 'Human Agent Active' : 'AI Agent Autonomous'}
            </span>
          </div>
          <button
            onClick={() => setIsHumanTakeover(!isHumanTakeover)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
              isHumanTakeover ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white'
            }`}
          >
            {isHumanTakeover ? 'Resume AI Agent' : 'Takeover Chat'}
          </button>
        </div>

        {/* Nav Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === "orders" ? "bg-purple-600 text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                activeTab === "leads" ? "bg-cyan-600 text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 outline-none"
              />
            </div>

            {activeTab === "orders" ? (
              <button
                onClick={() => exportOrdersToCsv(orders)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-90 transition-all"
                title="Export Orders CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            ) : (
              <button
                onClick={() => exportLeadsToCsv(leads)}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-90 transition-all"
                title="Export Leads CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-y-auto border border-slate-200 rounded-2xl bg-white shadow-inner">
          
          {/* ORDERS TABLE */}
          {activeTab === "orders" && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-medium">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500 font-medium">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map(o => (
                    <tr key={o.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono font-extrabold text-purple-700">{o.id}</td>
                      <td className="p-3">
                        <div className="font-extrabold text-slate-900">{o.customerName}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{o.customerEmail}</div>
                      </td>
                      <td className="p-3">
                        {o.items?.map((item, idx) => (
                          <div key={idx} className="line-clamp-1">{item.name} (x{item.quantity})</div>
                        ))}
                      </td>
                      <td className="p-3 font-black text-emerald-700">${o.totalAmount?.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 border border-purple-200">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 text-[11px]">
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
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-extrabold text-slate-600 uppercase tracking-wider">
                  <th className="p-3">Lead ID</th>
                  <th className="p-3">Contact Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Interest Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-medium">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500 font-medium">No leads captured yet.</td>
                  </tr>
                ) : (
                  filteredLeads.map(l => (
                    <tr key={l.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono font-extrabold text-cyan-700">{l.id}</td>
                      <td className="p-3 font-extrabold text-slate-900">{l.name}</td>
                      <td className="p-3">
                        <div>{l.email}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{l.phone || 'No phone'}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-purple-700 font-bold">{l.interestCategory}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-100 text-cyan-800 border border-cyan-200">
                          {l.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 text-[11px]">
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
