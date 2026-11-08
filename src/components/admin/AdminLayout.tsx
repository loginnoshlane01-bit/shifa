import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Scissors, 
  Users, 
  Settings, 
  ExternalLink, 
  Palette, 
  ShieldCheck, 
  Search, 
  Bell, 
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminTab } from '../../types/store';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminTab, setAdminTab, setViewMode, orders, products } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'confirmed' || o.status === 'tailoring'
  ).length;

  const bespokeOrdersCount = orders.filter(
    (o) => o.items.some((i) => i.bespokeNotes || i.selectedSize.toLowerCase().includes('custom'))
  ).length;

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Atelier Dashboard', icon: LayoutDashboard },
    { id: 'orders' as AdminTab, label: 'Orders & Dispatch', icon: ShoppingBag, badge: pendingOrdersCount },
    { id: 'products' as AdminTab, label: 'Garments & Stock', icon: Layers, badge: products.length },
    { id: 'bespoke' as AdminTab, label: 'Bespoke Tailoring Queue', icon: Scissors, badge: bespokeOrdersCount },
    { id: 'customers' as AdminTab, label: 'Patrons & Clients', icon: Users },
    { id: 'settings' as AdminTab, label: 'Atelier Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F4D3A] flex flex-col lg:flex-row font-brand-sans">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#1F4D3A] text-white border-b border-[#C9A24B]/30 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" fill="#FAF6EE" />
            <circle cx="50" cy="50" r="43.5" stroke="#C9A24B" strokeWidth="2" fill="none" />
            <path
              d="M 50 24 C 42 32, 35 44, 35 55 C 35 63, 42 70, 50 74 C 58 70, 65 63, 65 55 C 65 44, 58 32, 50 24 Z"
              fill="#1F4D3A"
            />
          </svg>
          <span className="font-brand-serif font-bold tracking-widest text-sm text-[#FAF6EE]">
            SHIFA ATELIER ADMIN
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-[#C9A24B] hover:bg-white/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 w-72 h-screen bg-[#1F4D3A] text-[#FAF6EE] border-r border-[#C9A24B]/25 flex flex-col justify-between transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-[#C9A24B]/20">
            <svg className="w-9 h-9 shrink-0" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" fill="#FAF6EE" />
              <circle cx="50" cy="50" r="43.5" stroke="#C9A24B" strokeWidth="2" fill="none" />
              <path
                d="M 50 24 C 42 32, 35 44, 35 55 C 35 63, 42 70, 50 74 C 58 70, 65 63, 65 55 C 65 44, 58 32, 50 24 Z"
                fill="#1F4D3A"
              />
              <line x1="50" y1="24" x2="50" y2="74" stroke="#FAF6EE" strokeWidth="1.5" />
              <path
                d="M 36 78 C 44 83, 56 83, 64 78"
                stroke="#C9A24B"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <h1 className="text-base font-bold font-brand-serif tracking-[0.2em] text-[#FAF6EE] leading-none">
                SHIFA
              </h1>
              <span className="text-[9px] font-semibold tracking-[0.4em] text-[#C9A24B] uppercase mt-1 block font-brand-sans">
                ATELIER CONSOLE
              </span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C9A24B] text-[#1F4D3A] shadow-md font-bold'
                      : 'text-[#FAF6EE]/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#1F4D3A]' : 'text-[#C9A24B]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#1F4D3A] text-[#C9A24B]'
                          : 'bg-[#C9A24B]/30 text-[#FAF6EE]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Quick Links */}
        <div className="p-6 border-t border-[#C9A24B]/20 space-y-2 bg-[#183c2d]">
          <div className="flex items-center justify-between text-xs text-[#FAF6EE]/70 mb-2">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#C9A24B]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Atelier Verified Console</span>
            </span>
            <span className="text-[10px] font-mono opacity-60">v1.2</span>
          </div>

          <button
            onClick={() => setViewMode('storefront')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A24B]" />
          </button>

          <button
            onClick={() => setViewMode('logo-studio')}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg border border-[#C9A24B]/40 hover:bg-[#C9A24B]/20 text-[#C9A24B] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            <span>Vector Logo Studio</span>
            <Palette className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Viewport Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Context Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/80 border-b border-[#C9A24B]/20 sticky top-0 z-20 backdrop-blur-md">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs text-[#1F4D3A]/60">
            <span className="font-semibold text-[#1F4D3A]">Atelier</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className="font-bold text-[#1F4D3A] capitalize">
              {adminTab.replace('-', ' ')}
            </span>
          </div>

          {/* Quick Header Affordances */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('storefront')}
              className="px-3 py-1.5 text-xs font-semibold text-[#1F4D3A] bg-[#C9A24B]/15 hover:bg-[#C9A24B]/25 border border-[#C9A24B]/40 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#1F4D3A]" />
              <span>Preview Storefront</span>
            </button>

            <div className="flex items-center gap-2.5 pl-4 border-l border-[#C9A24B]/20">
              <div className="w-8 h-8 rounded-full bg-[#1F4D3A] text-[#C9A24B] font-bold text-xs flex items-center justify-center border border-[#C9A24B]">
                SC
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-[#1F4D3A] leading-tight">Master Director</p>
                <p className="text-[10px] text-[#1F4D3A]/60 leading-none">Lahore & Dubai Atelier</p>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport Render */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
