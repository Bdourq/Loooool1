"use client";
import { useState } from "react";
import { User, Phone, MapPin, Home, Ruler, Weight, ShoppingBag, Loader2 } from "lucide-react";
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
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const total = quantity === 2 ? PRICE_TWO : PRICE_ONE;
  const colorName = (id) => COLORS.find((c) => c.id === id)?.name || "";

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const payload = { ...form, quantity, color: colorName(color), color2: quantity === 2 ? colorName(color2) : null, total };

    // 1. إرسال للإيميل
    await fetch("https://formspree.io/f/mojoegno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // 2. بناء رسالة الواتساب
    const msg = `🔔 طلب جديد: ${payload.name}، ${payload.gov}، ${payload.address}، قياسات: ${payload.height}/${payload.weight}`;
    window.open(`https://wa.me/962775347250?text=${encodeURIComponent(msg)}`, "_blank");

    // 3. التحويل لصفحة الشكر
    window.location.href = `/tanko?name=${encodeURIComponent(payload.name)}`;
  };

  return (
    <form onSubmit={submit} className="mt-6 rounded-3xl bg-cream p-6 shadow-soft space-y-4">
      {/* ... (باقي مكونات النموذج تبقى كما هي) ... */}
      <button type="submit" disabled={submitting} className="w-full gold-gradient py-4 rounded-2xl text-royalDark font-bold">
        {submitting ? "جاري المعالجة..." : "تأكيد الحجز الفوري"}
      </button>
    </form>
  );
}
