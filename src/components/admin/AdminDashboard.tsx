import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Scissors, 
  Users, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  Package, 
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types/store';

export const AdminDashboard: React.FC = () => {
  const { orders, products, setAdminTab, updateOrderStatus } = useStore();

  // Metrics Calculation
  const totalRevenuePKR = orders.reduce((acc, o) => {
    if (o.currency === 'PKR') return acc + o.total;
    if (o.currency === 'USD') return acc + o.total * 278; // Approx conversion
    if (o.currency === 'AED') return acc + o.total * 75;
    return acc + o.total;
  }, 0);

  const pendingTailoringCount = orders.filter(
    (o) => o.status === 'confirmed' || o.status === 'tailoring'
  ).length;

  const bespokeOrders = orders.filter((o) =>
    o.items.some((i) => i.bespokeNotes || i.selectedSize.toLowerCase().includes('custom'))
  );

  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenuePKR / orders.length) : 0;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'tailoring':
        return 'bg-[#C9A24B]/20 text-[#1F4D3A] border-[#C9A24B]';
      case 'inspected':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'dispatched':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'delivered':
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#1F4D3A] text-white border border-[#C9A24B]/30 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A24B]">
            Atelier Executive Overview
          </span>
          <h2 className="text-2xl font-bold font-brand-serif text-[#FAF6EE]">
            Shifa Clothing Performance & Production
          </h2>
          <p className="text-xs text-[#FAF6EE]/75">
            Real-time atelier queue, bespoke silk cutting, and order dispatch tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAdminTab('orders')}
            className="px-4 py-2 bg-[#C9A24B] text-[#1F4D3A] hover:bg-[#C9A24B]/90 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Manage All Orders
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Garments Catalog
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A]/60">
              Total Revenue (PKR Eq.)
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#C9A24B]" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#1F4D3A]">
              Rs. {totalRevenuePKR.toLocaleString()}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% from last salon season</span>
            </p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A]/60">
              Total Placed Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#C9A24B]" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#1F4D3A]">
              {orders.length} <span className="text-sm font-normal text-[#1F4D3A]/60">Orders</span>
            </p>
            <p className="text-[11px] text-[#1F4D3A]/70 mt-1">
              100% Cash on Delivery & Direct Transfer verified
            </p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-5 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A]/60">
              Active Tailoring Queue
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/20 text-[#1F4D3A] flex items-center justify-center">
              <Scissors className="w-4 h-4 text-[#1F4D3A]" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#1F4D3A]">
              {pendingTailoringCount} <span className="text-sm font-normal text-[#1F4D3A]/60">Garments</span>
            </p>
            <p className="text-[11px] text-amber-800 font-semibold mt-1">
              {bespokeOrders.length} require bespoke measurements
            </p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F4D3A]/60">
              Average Order Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#1F4D3A]/10 text-[#1F4D3A] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#1F4D3A]">
              Rs. {averageOrderValue.toLocaleString()}
            </p>
            <p className="text-[11px] text-[#1F4D3A]/70 mt-1">
              High tier luxury patronage
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders Stream & Atelier Production Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Recent Orders Table with instant status update */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#C9A24B]/25 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-brand-serif text-[#1F4D3A]">
                Recent Orders & Production Status
              </h3>
              <p className="text-xs text-[#1F4D3A]/60 mt-0.5">
                Change order status here to immediately update the customer's live tracking view.
              </p>
            </div>
            <button
              onClick={() => setAdminTab('orders')}
              className="text-xs font-semibold text-[#C9A24B] hover:text-[#1F4D3A] flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#C9A24B]/20 text-[11px] uppercase tracking-wider text-[#1F4D3A]/60">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Live Status</th>
                  <th className="py-2.5 px-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A24B]/10">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF6EE]/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#1F4D3A]">
                      {order.id}
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-[#1F4D3A]">{order.customer.fullName}</p>
                      <p className="text-[10px] text-[#1F4D3A]/60">{order.customer.city}</p>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium">{order.items.length} pcs</span>
                      <span className="text-[10px] text-[#1F4D3A]/60 block truncate max-w-[130px]">
                        {order.items[0]?.product.name}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#1F4D3A]">
                      {order.currency === 'PKR'
                        ? `Rs. ${order.total.toLocaleString()}`
                        : order.currency === 'AED'
                        ? `AED ${order.total.toLocaleString()}`
                        : `$${order.total.toLocaleString()}`}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer focus:outline-none ${getStatusBadge(order.status)}`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="tailoring">In Tailoring</option>
                        <option value="inspected">Inspected</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setAdminTab('orders')}
                        className="text-[11px] font-semibold text-[#1F4D3A] hover:underline cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (4 cols): Bespoke Queue & Craftsmanship Capacity */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bespoke Alert Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4D3A]">
                <Scissors className="w-4 h-4 text-[#C9A24B]" />
                <span>Bespoke Queue ({bespokeOrders.length})</span>
              </div>
              <button
                onClick={() => setAdminTab('bespoke')}
                className="text-[11px] font-semibold text-[#C9A24B] hover:underline cursor-pointer"
              >
                View Queue
              </button>
            </div>

            <p className="text-xs text-[#1F4D3A]/70">
              Orders requiring custom tailor sizing (chest, shoulder, sleeves) or gold needlework customization.
            </p>

            <div className="space-y-2.5">
              {bespokeOrders.slice(0, 3).map((bo) => (
                <div key={bo.id} className="p-3 rounded-xl bg-[#FAF6EE] border border-[#C9A24B]/20 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>{bo.customer.fullName}</span>
                    <span className="font-mono text-[#C9A24B]">{bo.id}</span>
                  </div>
                  <p className="text-[11px] text-[#1F4D3A]/70 truncate">
                    Notes: {bo.items[0]?.bespokeNotes || 'Custom Measurement Requested'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Atelier House Capacity */}
          <div className="p-6 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F4D3A]">
              <Clock className="w-4 h-4 text-[#C9A24B]" />
              <span>Atelier House Capacity</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Lahore Central Loom Atelier</span>
                  <span className="font-mono font-bold text-[#1F4D3A]">82% Active</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAF6EE] overflow-hidden">
                  <div className="w-[82%] h-full bg-[#1F4D3A]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Dubai DIFC Silk Finishing Salon</span>
                  <span className="font-mono font-bold text-[#1F4D3A]">65% Active</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAF6EE] overflow-hidden">
                  <div className="w-[65%] h-full bg-[#C9A24B]" />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#C9A24B]/20 text-[11px] text-[#1F4D3A]/70 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>14 Generational Karigars Currently on Duty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
