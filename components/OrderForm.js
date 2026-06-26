"use client";
import { useState } from "react";
import { User, Phone, MapPin, Home, Ruler, Weight as WeightIcon } from "lucide-react";
import { GOVERNORATES } from "../app/data";

const inputCls = "w-full bg-white rounded-xl py-3 px-4 text-royal border border-gold/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition placeholder:text-earth/40";

function Field({ icon: Icon, children }) {
  return (
    <div className="relative">
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
        <Icon size={18} />
      </div>
      <div className="pr-11">
        {children}
      </div>
    </div>
  );
}

export default function OrderForm({ quantity, setQuantity, color, setColor, formRef }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gov: GOVERNORATES[0],
    address: "",
    height: "",
    weight: "",
  });

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quantity, color }),
      });
      
      if (response.ok) {
        alert("تم تأكيد طلبك! سنتواصل معك قريباً.");
        setForm({
          name: "",
          phone: "",
          gov: GOVERNORATES[0],
          address: "",
          height: "",
          weight: "",
        });
      } else {
        alert("حدث خطأ. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      alert("حدث خطأ. يرجى المحاولة مرة أخرى.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={formRef} className="py-10 scroll-mt-20">
      <div className="max-w-xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl text-royal font-bold">بيانات التوصيل والتفصيل</h2>
          <p className="text-earth text-sm mt-2">يرجى تعبئة بياناتكِ بدقة لنتمكن من تجهيز وتوصيل قطعتكِ الفريدة.</p>
        </div>

        <form onSubmit={submit} className="rounded-3xl bg-cream p-6 shadow-soft space-y-4 border border-gold/10">
          {/* هنا قمت بإزالة أزرار اختيار الألوان لأنها موجودة في صفحة الهبوط أعلاه */}
          
          <Field icon={User}><input className={inputCls} placeholder="الاسم الكامل" required value={form.name} onChange={set("name")} /></Field>
          <Field icon={Phone}><input className={inputCls} placeholder="رقم الهاتف (079XXXXXXX)" required value={form.phone} onChange={set("phone")} /></Field>
          <Field icon={MapPin}><select className={inputCls} value={form.gov} onChange={set("gov")}>{GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}</select></Field>
          <Field icon={Home}><input className={inputCls} placeholder="العنوان التفصيلي" required value={form.address} onChange={set("address")} /></Field>
          
          <div className="grid grid-cols-2 gap-3">
             <Field icon={Ruler}><input className={inputCls} placeholder="الطول (سم)" required value={form.height} onChange={set("height")} /></Field>
             <Field icon={WeightIcon}><input className={inputCls} placeholder="الوزن (كغ)" required value={form.weight} onChange={set("weight")} /></Field>
          </div>

          <button type="submit" disabled={submitting} className="w-full gold-gradient py-4 rounded-2xl font-bold text-royalDark text-lg hover:opacity-90 transition">
            {submitting ? "جاري التأكيد..." : "تأكيد الحجز الفوري"}
          </button>
        </form>
      </div>
    </section>
  );
}
