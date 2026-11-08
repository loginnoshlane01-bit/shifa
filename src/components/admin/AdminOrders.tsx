import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  X, 
  Printer, 
  MapPin, 
  Phone, 
  User, 
  Scissors 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types/store';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, formatPrice } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [assignedKarigarInput, setAssignedKarigarInput] = useState('');

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      o.id.toLowerCase().includes(cleanSearch) ||
      o.customer.fullName.toLowerCase().includes(cleanSearch) ||
      o.customer.city.toLowerCase().includes(cleanSearch) ||
      o.customer.phone.includes(cleanSearch);
    return matchesStatus && matchesSearch;
  });

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

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'Items Count', 'Total', 'Currency', 'Payment Method', 'Status'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.date}"`,
      `"${o.customer.fullName}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.city}"`,
      o.items.length,
      o.total,
      o.currency,
      o.customer.paymentMethod,
      o.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `shifa-orders-report-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = (status: OrderStatus) => {
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, status, assignedKarigarInput || selectedOrder.assignedKarigar);
    setSelectedOrder((prev) => (prev ? { ...prev, status, assignedKarigar: assignedKarigarInput || prev.assignedKarigar } : null));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-brand-serif text-[#1F4D3A]">
            Orders & Atelier Production
          </h2>
          <p className="text-xs text-[#1F4D3A]/60 mt-0.5">
            Manage bespoke orders, assign karigars, and control live customer tracking status.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-white border border-[#C9A24B]/40 hover:bg-[#FAF6EE] text-[#1F4D3A] rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
        >
          <Download className="w-4 h-4 text-[#C9A24B]" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Controls Bar: Search & Status Filter Tabs */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'tailoring', label: 'In Tailoring' },
            { id: 'inspected', label: 'Inspected' },
            { id: 'dispatched', label: 'Dispatched' },
            { id: 'delivered', label: 'Delivered' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#1F4D3A] text-white shadow-xs'
                  : 'bg-white border border-[#C9A24B]/20 text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#1F4D3A]/50 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search order ID, name, city, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C9A24B]/30 rounded-xl text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#C9A24B]/25 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#C9A24B]/20 text-[11px] uppercase tracking-wider text-[#1F4D3A]/70 font-semibold">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Garments</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status & Karigar</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A24B]/10">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const hasBespoke = order.items.some(
                    (i) => i.bespokeNotes || i.selectedSize.toLowerCase().includes('custom')
                  );

                  return (
                    <tr key={order.id} className="hover:bg-[#FAF6EE]/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-sm text-[#1F4D3A] block">
                          {order.id}
                        </span>
                        <span className="text-[10px] text-[#1F4D3A]/60">{order.date}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-[#1F4D3A]">{order.customer.fullName}</p>
                        <p className="text-[11px] text-[#1F4D3A]/70">{order.customer.city} · {order.customer.phone}</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold">{order.items.length} items</span>
                          {hasBespoke && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-[#C9A24B]/25 text-[#1F4D3A] px-1.5 py-0.5 rounded">
                              Bespoke
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#1F4D3A]/60 block truncate max-w-[150px]">
                          {order.items.map((i) => i.product.name).join(', ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="capitalize font-medium text-[#1F4D3A]">
                          {order.customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#1F4D3A]">
                        {order.currency === 'PKR'
                          ? `Rs. ${order.total.toLocaleString()}`
                          : order.currency === 'AED'
                          ? `AED ${order.total.toLocaleString()}`
                          : `$${order.total.toLocaleString()}`}
                      </td>

                      <td className="py-3.5 px-4 space-y-1">
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
                        {order.assignedKarigar && (
                          <span className="text-[10px] text-[#1F4D3A]/60 block truncate max-w-[140px]">
                            {order.assignedKarigar}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setAssignedKarigarInput(order.assignedKarigar || '');
                            }}
                            className="p-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#C9A24B]/20 text-[#1F4D3A] transition-colors cursor-pointer"
                            title="View Full Order & Packing Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete order ${order.id}?`)) {
                                deleteOrder(order.id);
                              }
                            }}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-[#1F4D3A]/40 hover:text-red-700 transition-colors cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#1F4D3A]/60 text-xs">
                    No orders matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal / Packing Slip */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setSelectedOrder(null)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-[#1F4D3A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#C9A24B]/20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
                  Atelier Dispatch Docket
                </span>
                <h3 className="text-2xl font-bold font-mono text-[#1F4D3A]">
                  {selectedOrder.id}
                </h3>
                <p className="text-xs text-[#1F4D3A]/60">Placed on {selectedOrder.date}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#1F4D3A]/60">Payment</span>
                <p className="text-xs font-bold text-[#1F4D3A] uppercase">
                  {selectedOrder.customer.paymentMethod}
                </p>
                <p className="text-xs font-mono font-bold text-[#C9A24B]">
                  Tracking: {selectedOrder.trackingNumber}
                </p>
              </div>
            </div>

            {/* Status Change Control Bar */}
            <div className="my-5 p-4 rounded-xl bg-white border border-[#C9A24B]/25 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A] block">
                Update Live Production Stage (Customer Tracker Syncs Instantly):
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['confirmed', 'tailoring', 'inspected', 'dispatched', 'delivered'] as OrderStatus[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-2 py-2 rounded-lg text-xs font-semibold capitalize border transition-all cursor-pointer ${
                      selectedOrder.status === st
                        ? 'bg-[#1F4D3A] text-white border-[#1F4D3A] shadow-xs'
                        : 'bg-[#FAF6EE] text-[#1F4D3A]/70 border-[#C9A24B]/30 hover:border-[#1F4D3A]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-[#C9A24B]" />
                <input
                  type="text"
                  placeholder="Assign Master Karigar (e.g. Ustad Zahid)"
                  value={assignedKarigarInput}
                  onChange={(e) => setAssignedKarigarInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.status)}
                  className="px-3 py-1.5 bg-[#1F4D3A] text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Save Karigar
                </button>
              </div>
            </div>

            {/* Customer & Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/20 space-y-1 text-xs">
                <span className="font-bold text-[#1F4D3A] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Patron Contact</span>
                </span>
                <p className="font-semibold text-sm">{selectedOrder.customer.fullName}</p>
                <p className="text-[#1F4D3A]/70">{selectedOrder.customer.email}</p>
                <p className="text-[#1F4D3A]/70 font-mono">{selectedOrder.customer.phone}</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/20 space-y-1 text-xs">
                <span className="font-bold text-[#1F4D3A] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Shipping Address</span>
                </span>
                <p className="text-[#1F4D3A] font-medium">{selectedOrder.customer.address}</p>
                <p className="text-[#1F4D3A]/70">{selectedOrder.customer.city}, {selectedOrder.customer.postalCode}</p>
              </div>
            </div>

            {/* Bespoke Customer Notes if any */}
            {selectedOrder.customer.notes && (
              <div className="mb-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-[#1F4D3A]">
                <strong className="text-amber-900 block mb-0.5">Special Order / Tailoring Note:</strong>
                <p>{selectedOrder.customer.notes}</p>
              </div>
            )}

            {/* Itemized Garments List */}
            <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/20 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A]">
                Garments Ordered ({selectedOrder.items.length})
              </h4>
              <div className="divide-y divide-[#C9A24B]/10">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-3 text-xs">
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm text-[#1F4D3A]">{item.product.name}</p>
                        <p className="text-[11px] text-[#1F4D3A]/70">
                          Size: <strong>{item.selectedSize}</strong> · Color: {item.selectedColor} · Qty: {item.quantity}
                        </p>
                        {item.bespokeNotes && (
                          <p className="text-[10px] text-[#C9A24B] font-semibold mt-0.5">
                            Bespoke Measurements: {item.bespokeNotes}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#1F4D3A]">
                      {selectedOrder.currency === 'PKR'
                        ? `Rs. ${(item.product.pricePKR * item.quantity).toLocaleString()}`
                        : selectedOrder.currency === 'AED'
                        ? `AED ${(item.product.priceAED * item.quantity).toLocaleString()}`
                        : `$${(item.product.priceUSD * item.quantity).toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-[#C9A24B]/20 flex items-center justify-between text-base font-bold text-[#1F4D3A]">
                <span>Total Invoice</span>
                <span className="font-mono">
                  {selectedOrder.currency === 'PKR'
                    ? `Rs. ${selectedOrder.total.toLocaleString()}`
                    : selectedOrder.currency === 'AED'
                    ? `AED ${selectedOrder.total.toLocaleString()}`
                    : `$${selectedOrder.total.toLocaleString()}`}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white border border-[#C9A24B]/40 hover:bg-[#FAF6EE] text-[#1F4D3A] rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#C9A24B]" />
                <span>Print Docket</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#1F4D3A] text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
