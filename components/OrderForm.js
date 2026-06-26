"use client";
import { useState } from "react";
import { User, Phone, MapPin, Home, Ruler, Weight, ShoppingBag } from "lucide-react";
import { COLORS, GOVERNORATES, PRICE_ONE, PRICE_TWO } from "../app/data";
import InlineVideo from "./InlineVideo";

function Field({ icon: Icon, children }) {
  return (
    <div className="relative">
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
        <Icon size={18} />
      </span>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-gold/30 bg-cream pr-10 pl-3 py-3 text-royal placeholder-earth/50 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none transition";

export default function OrderForm({ quantity, setQuantity, color, setColor, formRef }) {
  const [form, setForm] = useState({ name: "", phone: "", gov: "عمان", address: "", height: "", weight: "" });
  const [color2, setColor2] = useState("maroon");
  const [submitting, setSubmitting] = useState(false);
  
  const total = quantity === 2 ? PRICE_TWO : PRICE_ONE;
  const colorName = (id) => COLORS.find((c) => c.id === id)?.name || "";
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = { ...form, quantity, color: colorName(color), color2: quantity === 2 ? colorName(color2) : null, total };

    // 1. إرسال للإيميل
    try {
      await fetch("https://formspree.io/f/mojoegno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) { console.error(err); }

    // 2. واتساب إجباري
    const msg = `🔔 طلب جديد من ${payload.name}\nالمحافظة: ${payload.gov}\nالعنوان: ${payload.address}\nالقياسات: ${payload.height}سم / ${payload.weight}كغ`;
    window.open(`https://wa.me/962775347250?text=${encodeURIComponent(msg)}`, "_blank");

    // 3. التحويل
    window.location.href = `/tanko?name=${encodeURIComponent(payload.name)}`;
  };

  return (
    <section ref={formRef} className="py-10 scroll-mt-20">
      <div className="max-w-xl mx-auto px-4">
        <h2 className="font-display text-3xl text-royal text-center font-bold mb-8">استمارة الطلب</h2>
        <form onSubmit={submit} className="rounded-3xl bg-cream p-6 shadow-soft space-y-4">
          <div className="grid grid-cols-2 gap-3">
             <button type="button" onClick={() => setQuantity(1)} className={`py-3 rounded-xl font-bold border-2 ${quantity === 1 ? "border-gold bg-royal text-goldLight" : "border-gold/25"}`}>قطعة واحدة</button>
             <button type="button" onClick={() => setQuantity(2)} className={`py-3 rounded-xl font-bold border-2 ${quantity === 2 ? "border-gold bg-royal text-goldLight" : "border-gold/25"}`}>قطعتين</button>
          </div>
          <Field icon={User}><input className={inputCls} placeholder="الاسم الكامل" required value={form.name} onChange={set("name")} /></Field>
          <Field icon={Phone}><input className={inputCls} placeholder="رقم الهاتف" required value={form.phone} onChange={set("phone")} /></Field>
          <Field icon={MapPin}><select className={inputCls} value={form.gov} onChange={set("gov")}>{GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}</select></Field>
          <Field icon={Home}><input className={inputCls} placeholder="العنوان التفصيلي" required value={form.address} onChange={set("address")} /></Field>
          <div className="grid grid-cols-2 gap-3">
             <Field icon={Ruler}><input className={inputCls} placeholder="الطول (سم)" required value={form.height} onChange={set("height")} /></Field>
             <Field icon={Weight}><input className={inputCls} placeholder="الوزن (كغ)" required value={form.weight} onChange={set("weight")} /></Field>
          </div>
          <button type="submit" disabled={submitting} className="w-full gold-gradient py-4 rounded-2xl font-bold text-royalDark">
            {submitting ? "جاري الإرسال..." : "تأكيد الحجز الفوري"}
          </button>
        </form>
      </div>
    </section>
  );
}
