"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TankoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "عزيزتي";

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#d4af37]/20 text-center">
        {/* تأكد من وجود logo.png في مجلد public */}
        <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-6" />
        
        <h1 className="text-3xl font-serif text-[#1a1a1a] mb-4">تم تأكيد طلبك يا {name}!</h1>
        <p className="text-[#666] mb-8 font-light">
          شكراً لثقتك بـ "لقطة كوليكشن". بدأنا بالفعل بتجهيز طلبك الخاص.
        </p>

        <div className="p-5 bg-[#fdfaf7] rounded-2xl border border-[#d4af37]/10 mb-8">
          <p className="text-sm text-[#888]">سنتصل بكِ قريباً لتأكيد القياسات النهائية.</p>
        </div>

        <a href="/" className="text-[#d4af37] border-b border-[#d4af37] font-bold pb-1">
          العودة للمتجر
        </a>
      </div>
    </div>
  );
}

export default function Tanko() {
  return <Suspense fallback={<div>جاري التحميل...</div>}><TankoContent /></Suspense>;
}
