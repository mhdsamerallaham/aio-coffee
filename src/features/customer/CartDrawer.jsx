import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, Hotel, DoorClosed, User, Coffee } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useLanguageStore from '../../store/languageStore';
import { getTranslation } from '../../data/translations';

export default function CartDrawer() {
  const language = useLanguageStore((s) => s.language);
  const items = useCartStore((s) => s.items);
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotal = useCartStore((s) => s.getTotal());
  const getWhatsAppURL = useCartStore((s) => s.getWhatsAppURL);

  // 3 separate inputs as requested
  const [hotelName, setHotelName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [customerName, setCustomerName] = useState('');

  const isFormValid = hotelName.trim() !== '' && roomNumber.trim() !== '' && customerName.trim() !== '';

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!isFormValid) return;
    const url = getWhatsAppURL({
      hotelName,
      roomNumber,
      customerName,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Sliding Sheet */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header — Brand Pantone 7421 C styling */}
          <div className="p-5 sm:p-6 bg-[#4A1525] text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black font-heading text-white" style={{ color: '#FFFFFF' }}>
                  {getTranslation(language, 'yourOrder')}
                </h2>
                <p className="text-xs font-bold text-rose-200">
                  {items.length} {getTranslation(language, 'itemsInCart')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-rose-200 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer touch-target"
                  title="Clear Cart"
                  aria-label="Clear cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeCart}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15 touch-target"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Scrollable Body: Items + Separate Guest & Hotel Details */}
          <div className="p-4 sm:p-5 overflow-y-auto custom-scrollbar flex-1 space-y-5">
            {items.length > 0 ? (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => {
                    const prodName = typeof item.product.name === 'object'
                      ? item.product.name[language] || item.product.name.tr
                      : item.product.name;

                    return (
                      <div
                        key={item.id}
                        className="p-3.5 sm:p-4 rounded-xl border border-stone-200/90 bg-white shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.product.image}
                              alt={prodName}
                              className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                            />
                            <div>
                              <h4 className="text-sm sm:text-base font-bold text-stone-900 font-heading leading-snug">
                                {prodName}
                              </h4>
                              <p className="text-xs font-bold font-mono text-[#4A1525] mt-0.5">
                                ₺{item.unitPrice}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-11 h-11 min-w-[44px] min-h-[44px] text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer touch-target"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Modifiers Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {item.selectedSize && (
                            <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md text-[11px] font-semibold">
                              {typeof item.selectedSize.name === 'object'
                                ? item.selectedSize.name[language] || item.selectedSize.name.tr
                                : item.selectedSize.name}
                            </span>
                          )}
                          {item.selectedExtras.map((e, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#F8F2F4] text-[#4A1525] border border-[#4A1525]/15 rounded-md text-[11px] font-semibold"
                            >
                              + {typeof e.name === 'object' ? e.name[language] || e.name.tr : e.name}
                            </span>
                          ))}
                        </div>

                        {/* Quantity Controls (Guaranteed min 44x44px touch targets on ALL devices) & Line Item Total */}
                        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200/80">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white text-stone-800 flex items-center justify-center font-bold shadow-2xs hover:bg-stone-50 active:scale-95 cursor-pointer touch-target transition-all"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4 stroke-[2.5]" />
                            </button>
                            <span className="w-7 text-center text-sm sm:text-base font-bold text-stone-900 font-mono select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-white text-stone-800 flex items-center justify-center font-bold shadow-2xs hover:bg-stone-50 active:scale-95 cursor-pointer touch-target transition-all"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>

                          <span className="text-base font-bold font-heading text-stone-900 font-mono">
                            ₺{item.unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3 Separate Inputs Section: Hotel Name, Room Number, Customer Name — 48px Height Standards */}
                <div className="bg-[#F8F2F4]/80 p-4 sm:p-5 rounded-2xl border border-[#4A1525]/15 space-y-3.5 shadow-2xs">
                  <div className="flex items-center gap-2 pb-1 border-b border-[#4A1525]/10">
                    <Hotel className="w-4 h-4 text-[#4A1525] shrink-0" />
                    <h3 className="text-xs sm:text-sm font-bold text-[#4A1525] font-heading uppercase tracking-wide">
                      {getTranslation(language, 'guestDetailsTitle')}
                    </h3>
                  </div>

                  {/* 1. Hotel Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <Hotel className="w-3.5 h-3.5 text-[#4A1525]" />
                      <span>{getTranslation(language, 'hotelNameLabel')}</span>
                    </label>
                    <input
                      type="text"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      placeholder={getTranslation(language, 'hotelNamePlaceholder')}
                      className="w-full h-12 min-h-[48px] bg-white border border-stone-300 focus:border-[#4A1525] rounded-xl px-3.5 text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/15 transition-all shadow-2xs"
                    />
                  </div>

                  {/* 2. Room Number Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <DoorClosed className="w-3.5 h-3.5 text-[#4A1525]" />
                      <span>{getTranslation(language, 'roomNumberLabel')}</span>
                    </label>
                    <input
                      type="text"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      placeholder={getTranslation(language, 'roomNumberPlaceholder')}
                      className="w-full h-12 min-h-[48px] bg-white border border-stone-300 focus:border-[#4A1525] rounded-xl px-3.5 text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/15 transition-all shadow-2xs"
                    />
                  </div>

                  {/* 3. Customer Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#4A1525]" />
                      <span>{getTranslation(language, 'customerNameLabel')}</span>
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={getTranslation(language, 'customerNamePlaceholder')}
                      className="w-full h-12 min-h-[48px] bg-white border border-stone-300 focus:border-[#4A1525] rounded-xl px-3.5 text-sm sm:text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4A1525]/15 transition-all shadow-2xs"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Empty Cart State */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#F8F2F4] rounded-full flex items-center justify-center mx-auto text-[#4A1525]">
                  <Coffee className="w-8 h-8" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-stone-800 font-heading">
                  {getTranslation(language, 'emptyCartTitle')}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                  {getTranslation(language, 'emptyCartSubtitle')}
                </p>
                <button
                  onClick={closeCart}
                  className="h-11 min-h-[44px] px-6 bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16] text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm cursor-pointer touch-target transition-colors"
                >
                  {getTranslation(language, 'browseMenu')}
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Controls */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-stone-200/90 space-y-3 shrink-0 shadow-lg">
              
              {/* Validation Warning Hint */}
              {!isFormValid && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-amber-900">
                  <span className="text-sm">⚠️</span>
                  <span>
                    {language === 'tr'
                      ? 'Lütfen Otel Adı, Oda Numarası ve Adınızı doldurun.'
                      : 'Please fill in Hotel Name, Room Number, and Customer Name.'}
                  </span>
                </div>
              )}

              {/* Total Price Summary Row */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider font-heading">
                  {getTranslation(language, 'totalPrice')}
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#4A1525]">
                  ₺{getTotal}
                </span>
              </div>

              {/* Primary WhatsApp Checkout Button (Ergonomic 52px-56px height) */}
              <button
                onClick={handleCheckout}
                disabled={!isFormValid}
                className={`w-full h-13 sm:h-14 min-h-[52px] px-5 sm:px-6 rounded-xl font-bold font-heading text-sm sm:text-base flex items-center justify-between transition-all press-trigger ${
                  isFormValid
                    ? 'bg-[#059669] hover:bg-[#047857] active:bg-[#065F46] text-white shadow-md shadow-emerald-700/25 cursor-pointer active:scale-[0.99]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none border border-stone-300/80'
                }`}
                style={{ color: isFormValid ? '#FFFFFF' : '#9CA3AF' }}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-5 h-5 shrink-0 stroke-[2.2] text-white" />
                  <span className="font-bold tracking-tight" style={{ color: isFormValid ? '#FFFFFF' : '#9CA3AF' }}>
                    {getTranslation(language, 'callWaiterOrder')}
                  </span>
                </div>

                <span className={`font-mono text-sm sm:text-base font-bold px-3 py-1 rounded-lg shadow-2xs ${
                  isFormValid ? 'bg-[#047857] text-white border border-emerald-400/30' : 'bg-stone-300 text-stone-500'
                }`}>
                  ₺{getTotal}
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
