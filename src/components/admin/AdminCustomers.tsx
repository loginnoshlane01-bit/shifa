import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Award } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface PatronData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  orderCount: number;
  totalSpentPKR: number;
  latestOrderDate: string;
}

export const AdminCustomers: React.FC = () => {
  const { orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Group orders by customer phone/email
  const patronsMap = new Map<string, PatronData>();

  orders.forEach((o) => {
    const key = o.customer.phone || o.customer.email;
    const pricePKR = o.currency === 'PKR' ? o.total : o.currency === 'USD' ? o.total * 278 : o.total * 75;

    if (!patronsMap.has(key)) {
      patronsMap.set(key, {
        fullName: o.customer.fullName,
        email: o.customer.email,
        phone: o.customer.phone,
        city: o.customer.city,
        orderCount: 1,
        totalSpentPKR: pricePKR,
        latestOrderDate: o.date,
      });
    } else {
      const existing = patronsMap.get(key)!;
      existing.orderCount += 1;
      existing.totalSpentPKR += pricePKR;
    }
  });

  const patrons = Array.from(patronsMap.values()).filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    return !q || p.fullName.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.phone.includes(q);
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-brand-serif text-[#1F4D3A]">
            Patrons & Client Registry
          </h2>
          <p className="text-xs text-[#1F4D3A]/60 mt-0.5">
            Directory of patrons, lifetime bespoke spending, and contact details.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#1F4D3A]/50 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search patron by name, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C9A24B]/30 rounded-xl text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#C9A24B]/25 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#C9A24B]/20 text-[11px] uppercase tracking-wider text-[#1F4D3A]/70 font-semibold">
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Residence</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spent (PKR)</th>
                <th className="py-3 px-4 text-right">Patron Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A24B]/10">
              {patrons.length > 0 ? (
                patrons.map((patron, i) => (
                  <tr key={i} className="hover:bg-[#FAF6EE]/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-sm text-[#1F4D3A]">
                      {patron.fullName}
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5">
                      <p className="font-mono text-[11px] text-[#1F4D3A]">{patron.phone}</p>
                      <p className="text-[10px] text-[#1F4D3A]/60">{patron.email}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#1F4D3A]">{patron.city}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-[#1F4D3A]">
                      {patron.orderCount} orders
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#1F4D3A]">
                      Rs. {Math.round(patron.totalSpentPKR).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#C9A24B]/20 text-[#1F4D3A] border border-[#C9A24B]/40">
                        <Award className="w-3 h-3 text-[#C9A24B]" />
                        <span>Royal Patron</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[#1F4D3A]/60 text-xs">
                    No patrons registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
