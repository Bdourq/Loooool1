const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const first = document.querySelector("[data-err='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const payload = {
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      gov: form.gov,
      address: form.address.trim(),
      height: form.height,
      weight: form.weight,
      quantity,
      color: colorName(color),
      color2: quantity === 2 ? colorName(color2) : null,
      total,
    };
    setSubmitting(true);
    
    // إرسال الطلب للإيميل (سيصلك دائماً بغض النظر عن الواتساب)
    try {
      await fetch("https://formspree.io/f/mojoegno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("فشل إرسال الإيميل:", err);
    }

    // الانتقال المباشر لصفحة الشكر (بدون فتح الواتساب تلقائياً)
    const params = new URLSearchParams({ name: payload.name });
    window.location.href = `/tanko?${params.toString()}`;
  };
