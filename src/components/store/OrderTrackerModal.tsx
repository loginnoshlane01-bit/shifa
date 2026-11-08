import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types/store';

export const OrderTrackerModal: React.FC = () => {
  const { isTrackingOpen, setIsTrackingOpen, orders, trackingOrder, setTrackingOrder } = useStore();
  const [searchId, setSearchId] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isTrackingOpen) return null;

  // Active displayed order: either selected trackingOrder or latest order
  const activeOrder: Order | undefined = trackingOrder || (orders.length > 0 ? orders[0] : undefined);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const clean = searchId.trim().toUpperCase();
    const found = orders.find(
      (o) => o.id.toUpperCase() === clean || o.id.replace('SH-', '').toUpperCase() === clean.replace('SH-', '')
    );
    if (found) {
      setTrackingOrder(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`No active order found with ID "${searchId}". Try sample #SH-8429.`);
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Received & Queued at Atelier', icon: CheckCircle2, done: true },
    { title: 'Bespoke Tailoring', desc: 'Hand-Cut Silk & Gold Needlework', icon: Clock, done: true },
    { title: 'Purity Inspection', desc: 'Botanical Wash & Quality Check', icon: ShieldCheck, done: activeOrder?.status === 'inspected' || activeOrder?.status === 'dispatched' || activeOrder?.status === 'delivered' },
    { title: 'Dispatched for Delivery', desc: 'TCS / DHL Express Tracking', icon: Truck, done: activeOrder?.status === 'dispatched' || activeOrder?.status === 'delivered' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracker-title"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsTrackingOpen(false)}
          aria-label="Close order tracker"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-[#1F4D3A] shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
            <Truck className="w-4 h-4" />
            <span>Real-Time Order Tracking</span>
          </div>
          <h2 id="tracker-title" className="text-2xl font-bold font-brand-serif text-[#1F4D3A] mt-1">
            Track Your Shifa Atelier Order
          </h2>
          <p className="text-xs text-[#1F4D3A]/70 mt-1">
            Real-time status of your pure silk, linen, and artisanal couture garments.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#1F4D3A]/50 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Enter Order ID (e.g. SH-8429)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#C9A24B]/30 rounded-xl text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap"
          >
            Track Order
          </button>
        </form>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Order Details View */}
        {activeOrder ? (
          <div className="space-y-6">
            {/* Order Meta Header Card */}
            <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/25 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
                  Confirmed Order
                </span>
                <p className="text-lg font-bold font-mono text-[#1F4D3A]">{activeOrder.id}</p>
                <p className="text-xs text-[#1F4D3A]/60">Placed on {activeOrder.date}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#1F4D3A]/60">Estimated Delivery</span>
                <p className="text-xs font-bold text-[#1F4D3A]">{activeOrder.estimatedDelivery}</p>
                <p className="text-[11px] font-mono text-[#C9A24B]">Tracking: {activeOrder.trackingNumber}</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="p-5 rounded-xl bg-white border border-[#C9A24B]/25">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A] mb-4">
                Atelier Timeline
              </h4>
              <div className="relative space-y-6 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C9A24B]/30">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          step.done
                            ? 'bg-[#1F4D3A] text-[#C9A24B] ring-4 ring-[#FAF6EE]'
                            : 'bg-[#FAF6EE] border-2 border-[#C9A24B]/40 text-[#1F4D3A]/40'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="pt-0.5">
                        <p className={`text-xs font-bold ${step.done ? 'text-[#1F4D3A]' : 'text-[#1F4D3A]/50'}`}>
                          {step.title}
                        </p>
                        <p className="text-[11px] text-[#1F4D3A]/70">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recipient & Shipping Information */}
            <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/25 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
              <div className="text-xs text-[#1F4D3A] space-y-0.5">
                <p className="font-bold">{activeOrder.customer.fullName} · {activeOrder.customer.phone}</p>
                <p className="text-[#1F4D3A]/80">{activeOrder.customer.address}, {activeOrder.customer.city}</p>
                <p className="text-[11px] text-[#C9A24B] font-medium uppercase tracking-wider">
                  Payment: {activeOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery (Pending upon arrival)' : 'Bank Transfer'}
                </p>
              </div>
            </div>

            {/* Itemized Receipt Summary */}
            <div className="p-4 rounded-xl bg-white border border-[#C9A24B]/25 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F4D3A]">
                Ordered Items ({activeOrder.items.length})
              </h4>
              <div className="divide-y divide-[#C9A24B]/15">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-bold text-[#1F4D3A]">{item.product.name}</p>
                        <p className="text-[11px] text-[#1F4D3A]/60">
                          Size {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#1F4D3A]">
                      {activeOrder.currency === 'PKR'
                        ? `Rs. ${(item.product.pricePKR * item.quantity).toLocaleString()}`
                        : activeOrder.currency === 'AED'
                        ? `AED ${(item.product.priceAED * item.quantity).toLocaleString()}`
                        : `$${(item.product.priceUSD * item.quantity).toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-[#C9A24B]/20 flex items-center justify-between text-sm font-bold text-[#1F4D3A]">
                <span>Total Amount</span>
                <span className="font-mono text-base">
                  {activeOrder.currency === 'PKR'
                    ? `Rs. ${activeOrder.total.toLocaleString()}`
                    : activeOrder.currency === 'AED'
                    ? `AED ${activeOrder.total.toLocaleString()}`
                    : `$${activeOrder.total.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-[#1F4D3A]/60">
            No order selected. Place an order or enter sample #SH-8429.
          </div>
        )}
      </div>
    </div>
  );
};
