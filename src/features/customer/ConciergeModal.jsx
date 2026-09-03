import React from 'react';
import { X, Clock, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import useLanguageStore from '../../store/languageStore';
import { getTranslation } from '../../data/translations';

// WhatsApp number — pulled from env, matches cartStore
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '905322719155';


export default function ConciergeModal({ isOpen, onClose }) {
  const language = useLanguageStore((s) => s.language);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-7 space-y-5 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#F8F2F4] text-[#4A1525] flex items-center justify-center font-bold border border-[#4A1525]/15 shrink-0">
              <Sparkles className="w-5 h-5 text-[#4A1525]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg text-stone-900 font-bold font-heading">
                {getTranslation(language, 'contactTitle')}
              </h2>
              <p className="text-xs font-medium text-stone-500 mt-0.5">
                {getTranslation(language, 'contactSubtitle')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 min-w-[44px] min-h-[44px] text-stone-400 hover:text-stone-800 rounded-xl hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer touch-target"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#4A1525] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                {getTranslation(language, 'serviceHoursTitle')}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5 font-medium">
                {getTranslation(language, 'serviceHoursValue')}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#4A1525] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                {getTranslation(language, 'roomDeliveryLabel')}
              </h4>
              <p className="text-xs text-stone-600 mt-0.5 font-medium">
                {getTranslation(language, 'roomDeliveryValue')}
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Action */}
        <div className="pt-1">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 sm:h-13 min-h-[48px] bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold font-heading text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-emerald-700/20 press-trigger transition-colors touch-target"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{getTranslation(language, 'chatWhatsApp')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
