import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderCustomer } from '../../types/store';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    currency,
    formatPrice,
    createOrder,
  } = useStore();

  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [formData, setFormData] = useState<OrderCustomer>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    postalCode: '',
    paymentMethod: 'cod',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  const currentTotal = currency === 'PKR' ? cartSubtotal.pkr : currency === 'AED' ? cartSubtotal.aed : cartSubtotal.usd;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) errors.phone = 'Please enter contact phone/WhatsApp';
    if (!formData.address.trim()) errors.address = 'Please enter delivery address';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    createOrder(formData);
    setIsCheckingOut(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md h-full bg-[#FAF6EE] border-l border-[#C9A24B]/30 flex flex-col shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#C9A24B]/20 bg-[#FAF6EE]">
          <div className="flex items-center gap-2">
            <h2 id="cart-title" className="text-lg font-bold font-brand-serif text-[#1F4D3A] tracking-wide">
              {isCheckingOut ? 'Bespoke Checkout' : 'Atelier Bag'}
            </h2>
            <span className="text-xs font-mono font-bold text-[#C9A24B]">({cart.length})</span>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckingOut(false);
            }}
            aria-label="Close cart drawer"
            className="p-1.5 rounded-lg text-[#1F4D3A]/70 hover:text-[#1F4D3A] hover:bg-[#C9A24B]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="px-5 py-2.5 bg-[#1F4D3A] text-white text-[11px] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Complimentary Insured Shipping Applied</span>
          </span>
          <span className="text-[#C9A24B] font-bold">100% Free</span>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16 text-[#1F4D3A]/60">
              <div className="w-14 h-14 rounded-full bg-[#1F4D3A]/10 flex items-center justify-center text-[#1F4D3A]">
                <ShieldCheck className="w-7 h-7 text-[#C9A24B]" />
              </div>
              <p className="text-sm font-semibold text-[#1F4D3A]">Your Atelier Bag is Empty</p>
              <p className="text-xs max-w-xs">Explore our pure silk and organic linen collections to experience healing luxury.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-4 py-2 rounded-lg bg-[#1F4D3A] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#1F4D3A]/90"
              >
                Browse Collections
              </button>
            </div>
          ) : !isCheckingOut ? (
            /* Itemized Cart View */
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                  className="p-3.5 rounded-xl bg-white border border-[#C9A24B]/20 flex gap-3.5 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover object-center shrink-0 border border-black/5"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-[#1F4D3A] truncate font-brand-serif">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-[#1F4D3A]/40 hover:text-red-700 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#1F4D3A]/70">
                      <span>Size: <strong>{item.selectedSize}</strong></span>
                      <span aria-hidden="true">·</span>
                      <span>{item.selectedColor}</span>
                    </div>

                    {item.bespokeNotes && (
                      <p className="text-[10px] text-[#C9A24B] truncate italic">
                        Bespoke: {item.bespokeNotes}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#C9A24B]/30 rounded bg-[#FAF6EE] text-xs">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-0.5 font-bold hover:text-[#1F4D3A] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-0.5 font-bold hover:text-[#1F4D3A] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="text-xs font-bold font-mono text-[#1F4D3A]">
                        {formatPrice(
                          item.product.priceUSD * item.quantity,
                          item.product.pricePKR * item.quantity,
                          item.product.priceAED * item.quantity
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Checkout Form View */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Fatima Tariq"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
                />
                {formErrors.fullName && <p className="text-red-700 text-[10px] mt-0.5">{formErrors.fullName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
                  />
                  {formErrors.phone && <p className="text-red-700 text-[10px] mt-0.5">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Lahore / Dubai / London"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="House/Apt, Street, Phase, Area"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
                />
                {formErrors.address && <p className="text-red-700 text-[10px] mt-0.5">{formErrors.address}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Payment Method
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#C9A24B]/30 bg-white cursor-pointer hover:border-[#1F4D3A]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="accent-[#1F4D3A]"
                    />
                    <div>
                      <span className="font-bold text-[#1F4D3A]">Cash on Delivery (COD)</span>
                      <p className="text-[10px] text-[#1F4D3A]/60">Pay peacefully at your doorstep upon receiving your parcel.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#C9A24B]/30 bg-white cursor-pointer hover:border-[#1F4D3A]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="accent-[#1F4D3A]"
                    />
                    <div>
                      <span className="font-bold text-[#1F4D3A]">Direct Bank Transfer</span>
                      <p className="text-[10px] text-[#1F4D3A]/60">Account details provided after confirmation (Meezan / Emirates NBD).</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1F4D3A] mb-1">
                  Atelier Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Special instructions for tailoring, urgent gifting date, or gate code..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white border border-[#C9A24B]/30 rounded-lg text-[#1F4D3A] focus:outline-none focus:border-[#1F4D3A]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#C9A24B]/20 bg-white space-y-3">
            <div className="flex items-center justify-between text-xs text-[#1F4D3A]">
              <span>Subtotal</span>
              <span className="font-bold font-mono text-sm">
                {formatPrice(cartSubtotal.usd, cartSubtotal.pkr, cartSubtotal.aed)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#1F4D3A]">
              <span>Insured Shipping</span>
              <span className="text-[#1F4D3A] font-bold">Complimentary</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-[#1F4D3A] pt-2 border-t border-[#C9A24B]/15">
              <span>Total Amount</span>
              <span className="font-mono text-base text-[#1F4D3A]">
                {formatPrice(cartSubtotal.usd, cartSubtotal.pkr, cartSubtotal.aed)}
              </span>
            </div>

            {!isCheckingOut ? (
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 px-4 rounded-xl bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#C9A24B]" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-1/3 py-3 px-3 rounded-xl border border-[#C9A24B]/40 text-[#1F4D3A] hover:bg-[#FAF6EE] text-xs font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#1F4D3A] text-white hover:bg-[#1F4D3A]/90 transition-all font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Confirm Order</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
