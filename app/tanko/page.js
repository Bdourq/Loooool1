"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TankoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "عزيزتي";

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
      {/* بطاقة الشكر - بتصميم دار أزياء */}
      <div className="max-w-lg w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-[#d4af37]/10 text-center">
        
        {/* أيقونة ذهبية رقيقة */}
        <div className="mb-8">
          <span className="text-5xl">✨</span>
        </div>

        <h1 className="text-4xl font-serif font-light text-[#1a1a1a] mb-6 tracking-wide">
          تم اعتماد طلبك
        </h1>
        
        <p className="text-[#666] text-lg mb-10 leading-relaxed font-light">
          أهلاً بكِ <span className="font-semibold text-[#1a1a1a]">{name}</span>، <br />
          لقد استقبلنا تفاصيل طلبك بكل اهتمام. بدأ فريق "لقطة كوليكشن" الآن في مرحلة القص والتفصيل الخاص لقطعتك الفريدة.
        </p>

        {/* صندوق معلومات الاتصال */}
        <div className="py-6 border-y border-[#f0f0f0] mb-10">
          <p className="text-sm uppercase tracking-widest text-[#999] mb-2 font-bold">الخطوة القادمة</p>
          <p className="text-[#1a1a1a] font-medium">سنتصل بكِ قريباً لتأكيد القياسات وموعد التسليم المخصص لكِ.</p>
        </div>

        {/* زر الواتساب - بتصميم غير متطفل */}
        <a 
          href="https://wa.me/962775347250" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-[#d4af37] border border-[#d4af37] px-8 py-4 rounded-full font-bold hover:bg-[#d4af37] hover:text-white transition-all duration-300"
        >
          متابعة الطلب عبر الواتساب
        </a>
      </div>
    </div>
  );
}

export default function Tanko() {
  return (
    <Suspense fallback={<div className="text-[#1a1a1a] animate-pulse">جاري التحميل...</div>}>
      <TankoContent />
    </Suspense>
  );
}
