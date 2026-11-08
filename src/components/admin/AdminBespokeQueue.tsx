import React, { useState } from 'react';
import { Scissors, CheckCircle2, User, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types/store';

export const AdminBespokeQueue: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const bespokeOrders = orders.filter((o) =>
    o.items.some((i) => i.bespokeNotes || i.selectedSize.toLowerCase().includes('custom'))
  );

  const karigars = [
    'Ustad Zahid (Lahore Central Loom)',
    'Master Karigar Tariq (Gold Zari Specialist)',
    'Karigar Salman (Normandy Flax Expert)',
    'Karigar Bilal (Silk Abaya Atelier)',
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A24B]">
          <Scissors className="w-4 h-4" />
          <span>Made-to-Measure Division</span>
        </div>
        <h2 className="text-2xl font-bold font-brand-serif text-[#1F4D3A] mt-1">
          Bespoke Tailoring Queue
        </h2>
        <p className="text-xs text-[#1F4D3A]/60 mt-0.5">
          Special client orders requiring individual body measurements, custom sleeves, or gold needlework.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bespokeOrders.length > 0 ? (
          bespokeOrders.map((order) => {
            const bespokeItem = order.items.find(
              (i) => i.bespokeNotes || i.selectedSize.toLowerCase().includes('custom')
            ) || order.items[0];

            return (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-white border border-[#C9A24B]/30 shadow-xs space-y-5"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#C9A24B]/20">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-lg text-[#1F4D3A]">
                      {order.id}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 bg-[#C9A24B]/20 text-[#1F4D3A] rounded border border-[#C9A24B]/40">
                      Bespoke Order
                    </span>
                    <span className="text-xs text-[#1F4D3A]/60">Ordered on {order.date}</span>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#1F4D3A]/60 font-semibold">Stage:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#C9A24B]/40 bg-[#FAF6EE] text-[#1F4D3A] cursor-pointer"
                    >
                      <option value="confirmed">Confirmed / In Queue</option>
                      <option value="tailoring">Cutting & Tailoring</option>
                      <option value="inspected">Quality Inspected</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Content: Garment + Custom Measurements Specs */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Garment Preview */}
                  <div className="md:col-span-4 flex gap-3.5 items-start">
                    <img
                      src={bespokeItem.product.image}
                      alt={bespokeItem.product.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-black/5"
                    />
                    <div className="space-y-1 text-xs">
                      <p className="font-bold text-sm font-brand-serif text-[#1F4D3A]">
                        {bespokeItem.product.name}
                      </p>
                      <p className="text-[#1F4D3A]/70">{bespokeItem.product.fabric}</p>
                      <p className="text-[11px] text-[#C9A24B] font-semibold">
                        Base Size: {bespokeItem.selectedSize} · Color: {bespokeItem.selectedColor}
                      </p>
                    </div>
                  </div>

                  {/* Bespoke Measurements Box */}
                  <div className="md:col-span-5 p-4 rounded-xl bg-[#FAF6EE] border border-[#C9A24B]/30 space-y-1.5 text-xs">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-[#1F4D3A] flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span>Submitted Client Sizing & Notes</span>
                    </span>
                    <p className="font-mono text-sm font-bold text-[#1F4D3A] bg-white p-2.5 rounded-lg border border-[#C9A24B]/20">
                      {bespokeItem.bespokeNotes || order.customer.notes || 'Chest 42, Shoulder 18.5, Sleeve 25, Kurta Length 44 (Standard Bespoke)'}
                    </p>
                    <p className="text-[10px] text-[#1F4D3A]/60">
                      Client Contact: {order.customer.fullName} ({order.customer.phone})
                    </p>
                  </div>

                  {/* Karigar Assignment */}
                  <div className="md:col-span-3 space-y-2 text-xs">
                    <label className="font-semibold uppercase tracking-wider text-[11px] text-[#1F4D3A] block">
                      Assigned Master Karigar:
                    </label>
                    <select
                      value={order.assignedKarigar || karigars[0]}
                      onChange={(e) => updateOrderStatus(order.id, order.status, e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-xs font-medium text-[#1F4D3A]"
                    >
                      {karigars.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => updateOrderStatus(order.id, 'inspected')}
                      className="w-full mt-2 py-2 px-3 bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                    >
                      Mark Tailoring Complete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#C9A24B]/25 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
            <h3 className="font-brand-serif font-bold text-lg text-[#1F4D3A]">
              Bespoke Tailoring Queue is Clear
            </h3>
            <p className="text-xs text-[#1F4D3A]/60 max-w-sm mx-auto">
              Any future orders placed with custom measurements from the storefront will appear directly here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
