async function solveAIQuestion() {
  const question =
    document.getElementById("aiQuestion").value.trim();

  const subject =
    document.getElementById("aiSubject").value;

  const mode =
    document.getElementById("aiMode").value;

  const result =
    document.getElementById("aiResult");

  const loading =
    document.getElementById("aiLoading");

  const button =
    document.getElementById("aiSolveButton");

  if (!question && !aiImageData) {
    toast("Lütfen soru yaz veya fotoğraf yükle.");
    return;
  }

  result.style.display = "none";
  result.textContent = "";

  loading.style.display = "block";

  button.disabled = true;
  button.style.opacity = "0.6";
  button.textContent = "🤖 Çözülüyor...";

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image: aiImageData || null,
        question: question || null,
        subject: subject,
        mode: mode
      })
    });

    /*
     * ÖNEMLİ:
     * Direkt response.json() kullanmıyoruz.
     * Çünkü Vercel bazen JSON yerine HTML hata sayfası döndürebilir.
     */
    const rawText = await response.text();

    let data;

    try {
      data = JSON.parse(rawText);
    } catch (jsonError) {
      console.error("API JSON DEĞİL:", rawText);

      throw new Error(
        "API JSON yerine başka bir yanıt döndürdü. " +
        "Vercel üzerinde /api/solve dosyası bulunamıyor veya API hata veriyor."
      );
    }

    if (!response.ok || !data.success) {
      throw new Error(
        data.error ||
        data.message ||
        "Yapay zeka soruyu çözemedi."
      );
    }

    result.textContent =
      data.answer || "Yanıt alınamadı.";

    result.style.display = "block";

    toast("Soru başarıyla çözüldü 🧠✅");

  } catch (error) {

    console.error("AI SOLVE ERROR:", error);

    result.textContent =
      "❌ Soru çözme servisine bağlanılamadı.\n\n" +
      error.message;

    result.style.display = "block";

    toast("Soru çözülürken hata oluştu.");

  } finally {

    loading.style.display = "none";

    button.disabled = false;
    button.style.opacity = "1";
    button.textContent = "🧠 Soruyu Çöz";
  }
}
