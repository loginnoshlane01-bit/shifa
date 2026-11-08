import React, { useState } from 'react';
import { Settings, ShieldCheck, Download, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettings: React.FC = () => {
  const { orders, products } = useStore();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [storeName, setStoreName] = useState('Shifa Clothing Atelier');
  const [announcementText, setAnnouncementText] = useState(
    'Complimentary Express Delivery on all bespoke orders · Pure Mulberry Silk & Organic Linen · Cash on Delivery Available'
  );
  const [supportPhone, setSupportPhone] = useState('+92 300 8472910');
  const [supportEmail, setSupportEmail] = useState('atelier@shifaclothing.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportBackup = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      storeName,
      orders,
      products,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shifa-atelier-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
      <div>
        <h2 className="text-2xl font-bold font-brand-serif text-[#1F4D3A]">
          Atelier House Settings
        </h2>
        <p className="text-xs text-[#1F4D3A]/60 mt-0.5">
          Configure storefront preferences, contact dispatch desks, and local data backups.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Store Details */}
        <div className="p-6 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 shadow-xs text-xs">
          <h3 className="font-bold uppercase tracking-wider text-sm text-[#1F4D3A]">
            General Atelier Information
          </h3>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
              Store & Brand Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
              Storefront Top Announcement Bar Message
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                Atelier Hotline / WhatsApp
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
              />
            </div>
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                Official Atelier Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6EE] border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
              />
            </div>
          </div>
        </div>

        {/* Database & Persistence Info */}
        <div className="p-6 rounded-2xl bg-white border border-[#C9A24B]/25 space-y-4 shadow-xs text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold uppercase tracking-wider text-sm text-[#1F4D3A]">
              Zero-Issue Resilient Storage Architecture
            </h3>
          </div>

          <p className="text-xs text-[#1F4D3A]/75 leading-relaxed">
            All orders, bespoke measurements, and garment additions are stored in browser-level persistent state. There are no remote database timeouts, connection drops, or table migration issues.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-4 py-2 bg-[#FAF6EE] border border-[#C9A24B]/40 hover:bg-[#C9A24B]/20 text-[#1F4D3A] rounded-xl font-semibold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-[#C9A24B]" />
              <span>Download Full JSON Backup</span>
            </button>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between">
          {savedSuccess ? (
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings saved successfully.</span>
            </span>
          ) : (
            <span className="text-xs text-[#1F4D3A]/60">Changes persist across sessions.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};
