import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types/store';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStock } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Adding / Editing
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'emerald-heritage',
    categoryLabel: 'Emerald Heritage',
    priceUSD: 180,
    pricePKR: 45000,
    priceAED: 680,
    image: '/src/assets/images/product_emerald_silk_kurta_1794118736123.jpg',
    badge: 'Atelier Edition',
    fabric: '100% Pure Mulberry Silk',
    healingProperties: 'Chemical-free natural botanical wash, hypoallergenic.',
    description: 'Bespoke hand-tailored garment crafted in the Shifa atelier.',
    details: ['Pure natural fibers', 'Artisanal gold needlecraft', 'Dry clean only'],
    colors: [
      { name: 'Deep Emerald', hex: '#1F4D3A' },
      { name: 'Artisanal Gold', hex: '#C9A24B' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Bespoke'],
    inStock: true,
    rating: 5.0,
    reviewsCount: 1,
  });

  const filteredProducts = products.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      p.name.toLowerCase().includes(cleanSearch) ||
      p.fabric.toLowerCase().includes(cleanSearch);
    return matchesCat && matchesSearch;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'emerald-heritage',
      categoryLabel: 'Emerald Heritage',
      priceUSD: 195,
      pricePKR: 48000,
      priceAED: 720,
      image: '/src/assets/images/product_emerald_silk_kurta_1794118736123.jpg',
      badge: 'Atelier New Edition',
      fabric: '100% Raw Mulberry Silk',
      healingProperties: 'Pure organic aloe finish, hypoallergenic.',
      description: 'Exclusive seasonal release from the Shifa tailoring house.',
      details: ['Pure Mulberry silk', 'Artisanal gold zari stitching', 'Custom fit available'],
      colors: [
        { name: 'Deep Emerald', hex: '#1F4D3A' },
        { name: 'Artisanal Gold', hex: '#C9A24B' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Bespoke'],
      inStock: true,
      rating: 5.0,
      reviewsCount: 1,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addProduct(formData);
    setIsAddModalOpen(false);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-brand-serif text-[#1F4D3A]">
            Garments & Inventory
          </h2>
          <p className="text-xs text-[#1F4D3A]/60 mt-0.5">
            Manage product listings, fabric specifications, stock availability, and prices.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C9A24B]" />
          <span>Add New Garment</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Garments' },
            { id: 'emerald-heritage', label: 'Emerald Heritage' },
            { id: 'organic-linen', label: 'Organic Linen' },
            { id: 'silk-atelier', label: 'Silk Atelier & Abayas' },
            { id: 'accessories', label: 'Accessories' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === tab.id
                  ? 'bg-[#1F4D3A] text-white shadow-xs'
                  : 'bg-white border border-[#C9A24B]/20 text-[#1F4D3A]/70 hover:text-[#1F4D3A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#1F4D3A]/50 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search garment or fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#C9A24B]/30 rounded-xl text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#C9A24B]/25 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF6EE] border-b border-[#C9A24B]/20 text-[11px] uppercase tracking-wider text-[#1F4D3A]/70 font-semibold">
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Fabric</th>
                <th className="py-3 px-4">Price (PKR / USD / AED)</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A24B]/10">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#FAF6EE]/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover border border-black/5 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-sm text-[#1F4D3A]">{p.name}</p>
                        {p.badge && (
                          <span className="text-[9.5px] uppercase font-bold text-[#C9A24B] tracking-wider">
                            {p.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-[#1F4D3A]">{p.categoryLabel}</span>
                  </td>

                  <td className="py-3 px-4 text-[#1F4D3A]/75">
                    {p.fabric}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-[#1F4D3A]">
                    <div>Rs. {p.pricePKR.toLocaleString()}</div>
                    <div className="text-[10px] text-[#1F4D3A]/60 font-normal">
                      ${p.priceUSD} · AED {p.priceAED}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleProductStock(p.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer border transition-colors flex items-center gap-1.5 ${
                        p.inStock
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-600' : 'bg-red-600'}`} />
                      <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#C9A24B]/20 text-[#1F4D3A] transition-colors cursor-pointer"
                        title="Edit Garment"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[#1F4D3A]/40 hover:text-red-700 transition-colors cursor-pointer"
                        title="Delete Garment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#1F4D3A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-brand-serif text-[#1F4D3A] mb-4">
              Add New Atelier Garment
            </h3>

            <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Garment Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Imperial Emerald Velvet Sherwani"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      const labelMap: Record<string, string> = {
                        'emerald-heritage': 'Emerald Heritage',
                        'organic-linen': 'Organic Linen Atelier',
                        'silk-atelier': 'Silk Atelier & Abayas',
                        'accessories': 'Artisanal Accessories',
                      };
                      setFormData({ ...formData, category: cat, categoryLabel: labelMap[cat] });
                    }}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                  >
                    <option value="emerald-heritage">Emerald Heritage</option>
                    <option value="organic-linen">Organic Linen Atelier</option>
                    <option value="silk-atelier">Silk Atelier & Abayas</option>
                    <option value="accessories">Artisanal Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Price PKR
                  </label>
                  <input
                    type="number"
                    value={formData.pricePKR}
                    onChange={(e) => setFormData({ ...formData, pricePKR: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg font-mono text-[#1F4D3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Price USD
                  </label>
                  <input
                    type="number"
                    value={formData.priceUSD}
                    onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg font-mono text-[#1F4D3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Price AED
                  </label>
                  <input
                    type="number"
                    value={formData.priceAED}
                    onChange={(e) => setFormData({ ...formData, priceAED: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg font-mono text-[#1F4D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Fabric Type
                </label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Therapeutic Healing Properties
                </label>
                <input
                  type="text"
                  value={formData.healingProperties}
                  onChange={(e) => setFormData({ ...formData, healingProperties: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              {/* Image Preset Selector */}
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Select Visual Asset:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Emerald Silk Kurta', url: '/src/assets/images/product_emerald_silk_kurta_1794118736123.jpg' },
                    { label: 'Ivory Linen Set', url: '/src/assets/images/product_ivory_linen_ensemble_1794118736350.jpg' },
                    { label: 'Emerald Abaya', url: '/src/assets/images/product_silk_abaya_emerald_1794118736685.jpg' },
                  ].map((imgOpt) => (
                    <button
                      key={imgOpt.url}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: imgOpt.url })}
                      className={`p-1.5 rounded-lg border text-left flex flex-col gap-1 cursor-pointer ${
                        formData.image === imgOpt.url ? 'border-[#1F4D3A] bg-white ring-2 ring-[#C9A24B]' : 'border-neutral-200'
                      }`}
                    >
                      <img src={imgOpt.url} alt="" className="w-full h-14 object-cover rounded" />
                      <span className="text-[10px] font-semibold truncate">{imgOpt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#C9A24B]/40 text-[#1F4D3A] rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 rounded-xl text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl bg-[#FAF6EE] border border-[#C9A24B]/40 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#1F4D3A] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-brand-serif text-[#1F4D3A] mb-4">
              Edit Garment: {editingProduct.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Price PKR
                  </label>
                  <input
                    type="number"
                    value={editingProduct.pricePKR}
                    onChange={(e) => setEditingProduct({ ...editingProduct, pricePKR: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg font-mono text-[#1F4D3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Price USD
                  </label>
                  <input
                    type="number"
                    value={editingProduct.priceUSD}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg font-mono text-[#1F4D3A]"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Price AED
                  </label>
                  <input
                    type="number"
                    value={editingProduct.priceAED}
                    onChange={(e) => setEditingProduct({ ...editingProduct, priceAED: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg font-mono text-[#1F4D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Fabric Specifications
                </label>
                <input
                  type="text"
                  value={editingProduct.fabric}
                  onChange={(e) => setEditingProduct({ ...editingProduct, fabric: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-[#C9A24B]/40 text-[#1F4D3A] rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Update Garment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
