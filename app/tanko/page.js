"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TankoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "عزيزتي";

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-[#e5e0d8] text-center">
        
        {/* أيقونة ذهبية بتصميم رفيع */}
        <div className="mx-auto w-16 h-16 mb-8 flex items-center justify-center bg-[#fdfaf7] rounded-full border border-[#d4af37]/20">
          <span className="text-3xl">✨</span>
        </div>

        <h1 className="text-3xl font-serif font-medium text-[#1a1a1a] mb-4 tracking-tight">
          تم استلام طلبك
        </h1>
        
        <p className="text-[#666] text-lg leading-relaxed mb-10 font-light">
          شكراً لثقتك يا <span className="font-semibold text-[#1a1a1a]">{name}</span>. <br/>
          فريق "لقطة كوليكشن" بدأ الآن بتجهيز طلبك المخصص بكل عناية.
        </p>

        {/* بطاقة معلومات الطلب */}
        <div className="space-y-6 mb-12">
          <div className="p-5 rounded-2xl bg-[#fcfaf7] border border-[#f0ede5]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#b3a48e] font-bold mb-1">الخطوة القادمة</p>
            <p className="text-[#1a1a1a] text-sm font-medium">سنتواصل معكِ هاتفياً لتأكيد القياسات النهائية وتحديد موعد التسليم.</p>
          </div>
        </div>

        {/* خيار الواتساب (اختياري وبأناقة) */}
        <a 
          href={`https://wa.me/962775347250?text=أهلاً لقطة كوليكشن، أود متابعة طلبي - ${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[#d4af37] border-b border-[#d4af37] pb-1 font-semibold text-sm hover:text-[#b8962d] hover:border-[#b8962d] transition-all duration-300"
        >
          أو تابعي الطلب عبر واتساب 
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Tanko() {
  return (
    <Suspense fallback={<div className="text-sm text-[#999] animate-pulse">جاري التحميل...</div>}>
      <TankoContent />
    </Suspense>
  );
}
