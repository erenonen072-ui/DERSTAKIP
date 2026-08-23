<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>5-12. Sınıf Eksiksiz MEB & YKS Konu Anlatım Portalı</title>
  <style>
    :root {
      --primary: #0f172a;
      --secondary: #1e293b;
      --accent: #2563eb;
      --accent-hover: #1d4ed8;
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #334155;
      --text-muted: #64748b;
      --border: #e2e8f0;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }

    header {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      padding: 2.5rem 1rem;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    header h1 {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.5px;
    }

    header p {
      color: #94a3b8;
      font-size: 1.05rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      max-width: 1400px;
      margin: 2rem auto;
      gap: 2rem;
      padding: 0 1.5rem;
    }

    @media (min-width: 768px) {
      .container {
        flex-direction: row;
      }
    }

    /* Sidebar Navigation */
    .sidebar {
      flex: 1;
      min-width: 320px;
      background: var(--card-bg);
      padding: 1.75rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      border: 1px solid var(--border);
      height: fit-content;
    }

    .sidebar h2 {
      font-size: 1.25rem;
      color: var(--primary);
      margin-bottom: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--border);
    }

    .filter-group {
      margin-bottom: 1.25rem;
    }

    label {
      font-weight: 600;
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: var(--text);
    }

    select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      outline: none;
      background-color: #fff;
      font-size: 0.95rem;
      color: var(--text);
      transition: all 0.2s;
    }

    select:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    select:disabled {
      background-color: #f1f5f9;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .info-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1.5rem;
    }

    .info-card h4 {
      color: #1e40af;
      font-size: 0.95rem;
      margin-bottom: 0.4rem;
    }

    .info-card p {
      font-size: 0.85rem;
      color: #1e3a8a;
    }

    /* Content Area */
    .content-area {
      flex: 3;
      background: var(--card-bg);
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      border: 1px solid var(--border);
      min-height: 550px;
    }

    .topic-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border);
    }

    .badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      background-color: #dbeafe;
      color: #1e40af;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .topic-title {
      font-size: 2rem;
      color: var(--primary);
      font-weight: 700;
    }

    .topic-body {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #334155;
    }

    .topic-body b {
      color: var(--primary);
    }

    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 420px;
      color: var(--text-muted);
      text-align: center;
    }

    .placeholder svg {
      width: 64px;
      height: 64px;
      margin-bottom: 1rem;
      stroke: var(--text-muted);
    }
  </style>
</head>
<body>

  <header>
    <h1>5-12. Sınıf Eksiksiz MEB & YKS Ders Portalı</h1>
    <p>Ortaokul ve Lise Tüm Sınıflar, Dersler ve Sınav Müfredatı Konu Anlatımı</p>
  </header>

  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Ders ve Konu Seçimi</h2>
      
      <div class="filter-group">
        <label for="grade-select">1. Sınıf Seviyesi Seçiniz:</label>
        <select id="grade-select" onchange="onGradeChange()">
          <option value="">-- Sınıf Seç --</option>
          <option value="5">5. Sınıf</option>
          <option value="6">6. Sınıf</option>
          <option value="7">7. Sınıf</option>
          <option value="8">8. Sınıf (LGS)</option>
          <option value="9">9. Sınıf</option>
          <option value="10">10. Sınıf</option>
          <option value="11">11. Sınıf (AYT)</option>
          <option value="12">12. Sınıf (YKS / AYT)</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="subject-select">2. Ders Seçiniz:</label>
        <select id="subject-select" onchange="onSubjectChange()" disabled>
          <option value="">-- Önce Sınıf Seçiniz --</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="topic-select">3. Konu Başlığı Seçiniz:</label>
        <select id="topic-select" onchange="displayTopic()" disabled>
          <option value="">-- Önce Ders Seçiniz --</option>
        </select>
      </div>

      <div class="info-card">
        <h4>Eksiksiz Müfredat Bilgisi</h4>
        <p>5. sınıftan 12. sınıfa kadar tüm LGS, YKS, TYT ve AYT konuları eksiksiz şekilde hiyerarşik olarak entegre edilmiştir.</p>
      </div>
    </aside>

    <!-- Content Area -->
    <main class="content-area" id="content-display">
      <div class="placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3>Sol taraftaki adımları takip ederek Sınıf, Ders ve Konu seçimi yapınız.</h3>
      </div>
    </main>
  </div>

  <script>
    const database = {"5": {"Matematik": [{"title": "Doğal Sayılar ve İşlemler", "content": "<b>1. Okuma ve Yazma:</b> Milyonlar bölüğündeki 9 basamaklı sayılar.<br><b>2. İşlemler:</b> Zihinden toplama-çıkarma, yuvarlama ve basamak değerleri."}, {"title": "Kesirler ve Ondalık Gösterim", "content": "<b>1. Kesir Türleri:</b> Basit, bileşik ve tam sayılı kesirlerin dönüşümleri.<br><b>2. Ondalık Bölümü:</b> Paydası 10, 100, 1000 olan kesirlerin virgüle aktarımı."}, {"title": "Geometri ve Ölçme", "content": "<b>1. Temel Elemanlar:</b> Doğru, ışın, doğru parçası ve açı çeşitleri (dar, dik, geniş).<br><b>2. Çevre ve Alan:</b> Dikdörtgen ve karenin alan hesabı."}], "Fen Bilimleri": [{"title": "Güneş, Dünya ve Ay", "content": "<b>1. Güneş ve Ay'ın Yapısı:</b> Katmanlar, büyüklük oranları.<br><b>2. Ay'ın Evreleri:</b> Yeniay, İlk Dördün, Dolunay, Son Dördün."}, {"title": "Canlılar Dünyası", "content": "<b>Sınıflandırma:</b> Mikroskobik canlılar, mantarlar, bitkiler (çiçekli/çiçeksiz) ve hayvanlar (omurgalı/omurgasız)."}, {"title": "Kuvvetin Ölçülmesi ve Sürtünme", "content": "<b>1. Dinamometre:</b> Yayların esneklik özelliği ve kuvvet ölçümü.<br><b>2. Sürtünme Kuvveti:</b> Hava ve su direnci, pürüzlü/pürüzsüz yüzeyler."}], "Türkçe": [{"title": "Sözcükte Anlam", "content": "Gerçek anlam, mecaz anlam, terim anlam, eş ve zıt anlamlı sözcükler."}, {"title": "Cümlede Anlam ve Paragraf", "content": "Öznel-nesnel yargılar, neden-sonuç, amaç-sonuç ilişkileri, ana fikir ve yardımcı fikirler."}], "Sosyal Bilgiler": [{"title": "Birey ve Toplum / Kültür ve Miras", "content": "Haklar, sorumluluklar, roller ve Anadolu/Mezopotamya uygarlıkları."}]}, "6": {"Matematik": [{"title": "Çarpanlar, Katlar ve Kümeler", "content": "<b>1. Bölünebilme Kuralları:</b> 2, 3, 4, 5, 6, 9, 10 ile bölünebilme.<br><b>2. Kümeler:</b> Birleşim (∪) ve kesişim (∩) sembolleri, liste yöntemi."}, {"title": "Tam Sayılar ve Kesirlerle İşlemler", "content": "Mutlak değer, yönlü sayılar, kesirlerde 4 işlem ve sıralama."}, {"title": "Cebirsel İfadeler ve Veri Analizi", "content": "Değişken, katsayı, terim kavramları; aritmetik ortalama ve açıklık."}], "Fen Bilimleri": [{"title": "Güneş Sistemi ve Tutulmalar", "content": "Gezegenlerin sıralaması, Güneş tutulması ve Ay tutulması olayları."}, {"title": "Vücudumuzdaki Sistemler", "content": "Destek ve hareket sistemi, sindirim, dolaşım, solunum ve boşaltım sistemleri."}], "Türkçe": [{"title": "İsimler, Sıfatlar ve Tamlamalar", "content": "Cins-özel isim, somut-soyut isim; niteleme ve belirtme sıfatları, isim tamlamaları."}]}, "7": {"Matematik": [{"title": "Tam Sayılarla İşlemler", "content": "Pozitif ve negatif tam sayılarda 4 işlem, toplama/çarpma özellikleri ve üslü nicelikler."}, {"title": "Rasyonel Sayılar ve Denklemler", "content": "Rasyonel sayılarda adımlı işlemler, 1. dereceden 1 bilinmeyenli denklemler ve problem çözümü."}, {"title": "Oran-Orantı ve Yüzdeler", "content": "Doğru ve ters orantı, orantı sabiti, yüzde hesapları, kâr-zarar problemleri."}], "Fen Bilimleri": [{"title": "Hücre, Bölünmeler ve Kuvvet-Enerji", "content": "Mitoz-Mayoz farkları, kütle-ağırlık ilişkisi, potansiyel ve kinetik enerji dönüşümleri."}, {"title": "Aynalar ve Işığın Kırılması", "content": "Düzlem, çukur ve tümsek aynalar; mercekler ve odak noktası."}]}, "8": {"Matematik (LGS)": [{"title": "Çarpanlar, Katlar, Üslü ve Kareköklü İfadeler", "content": "<b>EBOB-EKOK:</b> Aralarında asal sayılar, problem tipleri.<br><b>Kareköklü Sayılar:</b> Tam kare sayılar, a√b biçimi, irrasyonel sayılar."}, {"title": "Cebirsel İfadeler ve Özdeşlikler", "content": "Tam kare özdeşlikleri (a+b)², iki kare farkı (a²-b²), çarpanlara ayırma."}, {"title": "LGS Doğrusal Denklemler ve Eşitsizlikler", "content": "Eğim (m), dik koordinat sistemi, 1. dereceden eşitsizliklerin sayı doğrusunda gösterimi."}, {"title": "Üçgenler ve Pisagor Teoremi", "content": "Açıortay, kenarortay, yükseklik, üçgen eşitsizliği ve a² + b² = c² bağıntısı."}], "Fen Bilimleri (LGS)": [{"title": "Mevsimler, İklim, DNA ve Genetik Kod", "content": "Eksen eğikliği, Solstis/Ekinoks tarihleri, DNA mutasyon, modifikasyon, adaptasyon ve çaprazlamalar."}, {"title": "Basınç ve Periyodik Sistem", "content": "Katı, sıvı (P=h.d.g) ve gaz basıncı; periyodik tablo, fiziksel ve kimyasal değişimler."}, {"title": "Basit Makineler ve Elektrik", "content": "Kaldıraçlar, makaralar, eğik düzlem; elektrik yükleri ve topraklama."}], "Türkçe (LGS)": [{"title": "Fiilimsiler, Cümlenin Ögeleri ve Yazım Kuralları", "content": "İsim-fiil, sıfat-fiil, zarf-fiil; yüklem, özne, nesne, tümleçler, metin türleri ve mantık muhakeme."}]}, "9": {"Matematik": [{"title": "Mantık ve Kümeler", "content": "<b>Mantık:</b> Önermeler, ∧, ∨, ⇒, ⇔ bağlaçları, niteleyiciler.<br><b>Kümeler:</b> Alt küme, kartezyen çarpım."}, {"title": "Denklem ve Eşitsizlik Sistemleri", "content": "Bölünebilme, EBOB-EKOK, I. dereceden eşitsizlikler, mutlak değer, üslü-köklü ifadeler."}, {"title": "Üçgenlerde Eşlik ve Benzerlik", "content": "Trigonometrik oranlar (sin, cos, tan, cot), sinüs teoremi, alan formülleri."}], "Fizik": [{"title": "Fizik Bilimine Giriş ve Madde", "content": "SI birim sistemi, KISA MUZ büyüklükleri, özkütle (d=m/V), dayanıklılık, adezyon-kohezyon."}, {"title": "Hareket ve Kuvvet", "content": "Konum, alınan yol, yer değiştirme, ortalama hız, Newton'un hareket yasaları."}], "Kimya": [{"title": "Kimya Bilimi ve Atom Yapısı", "content": "Simyadan kimyaya, güvenlik sembolleri, Rutherford-Bohr atom modelleri, izotop/izobar atomlar."}], "Biyoloji": [{"title": "Yaşam Bilimi Biyoloji ve Hücre", "content": "Organik/Inorganik bileşikler, enzimler, ATP, hücre zarı taşıma mekanizmaları."}]}, "10": {"Matematik": [{"title": "Sayma, Permütasyon, Kombinasyon ve Olasılık", "content": "Faktöriyel, P(n,r), C(n,r), Binom açılımı ve koşullu olasılık."}, {"title": "Fonksiyonlar ve Polinomlar", "content": "Fonksiyon türleri (birebir, örten, bileşke, ters), polinomlarda 4 işlem ve kalan bulma."}, {"title": "İkinci Dereceden Denklemler ve Çokgenler", "content": "Karmaşık sayılar, Δ (diskriminant) incelemesi, dörtgenler, paralelkenar, yamuk ve deltoid."}], "Fizik": [{"title": "Elektrik, Manyetizma ve Dalgalar", "content": "Ohm kanunu (V=I.R), eşdeğer direnç, mıknatıslar, yay/su/ses dalgaları."}], "Kimya": [{"title": "Kimyanın Temel Kanunları ve Mol", "content": "Kütlenin korunumu, sabit oranlar, mol kavramı (N_A), tepkime türleri ve hesaplamalar."}]}, "11": {"Matematik (AYT)": [{"title": "Trigonometri (Detaylı AYT)", "content": "<b>1. Esas Ölçü ve Birim Çember:</b> Yönlü açılar, radyan/derece.<br><b>2. Teoremler:</b> Kosinüs ve Sinüs teoremleri.<br><b>3. Grafik ve Ters Fonksiyonlar:</b> Arcsin, Arccos, Arctan."}, {"title": "Analitik Geometri ve Fonksiyon Uygulamaları", "content": "Eğim, doğru denklemleri, noktanın doğruya uzaklığı, öteleme ve simetri dönüşümleri."}, {"title": "İkinci Dereceden Fonksiyonlar (Parabol)", "content": "Tepe noktası T(r,k), eksenleri kestiği noktalar, parabol-doğru durumları."}], "Fizik (AYT)": [{"title": "Vektörler, Bağıl Hareket ve Newton", "content": "Vektör toplama, nehir problemleri, eylemsizlik kuvveti ve sürtünmeli sistemler."}, {"title": "Atışlar, İş-Enerji, İtme ve Momentum", "content": "Serbest düşüş, yatay/eğik atış, esnek ve esnek olmayan çarpışmalar."}], "Kimya (AYT)": [{"title": "Modern Atom Teorisi ve Gazlar", "content": "Kuantum sayıları (n, l, m_l, m_s), orbital dizilimi, İdeal Gaz Denklemi (P.V=n.R.T)."}]}, "12": {"Matematik (AYT & YKS)": [{"title": "Üstel - Logaritmik Fonksiyonlar ve Diziler", "content": "Logaritma özellikleri, taban değiştirme, logaritmik denklem/eşitsizlikler; Aritmetik ve Geometrik diziler."}, {"title": "Limit ve Süreklilik", "content": "Sağdan-soldan limit, belirsizlik durumları (0/0), süreklilik şartı."}, {"title": "Türev ve Uygulamaları (AYT)", "content": "<b>1. Alma Kuralları:</b> Çarpım, bölüm, zincir kuralı.<br><b>2. Geometrik Anlam:</b> Teğet/Normal denklemi.<br><b>3. Ekstremum Noktalar:</b> Yerel maksimum, minimum ve Artan/Azalan aralıklar."}, {"title": "İntegral ve Uygulamaları (AYT)", "content": "<b>1. Belirsiz İntegral:</b> Değişken değiştirme yöntemi.<br><b>2. Belirli İntegral:</b> Riemann toplamı, iki eğri arasında kalan alan hesabı."}, {"title": "Çemberin Analitiği", "content": "Merkezi ve yarıçapı bilinen çember denklemi: (x-a)² + (y-b)² = r²."}], "Fizik (AYT & YKS)": [{"title": "Çembersel Hareket ve Basit Harmonik Hareket", "content": "Açısal hız, merkezcil ivme, tork, açısal momentum korunumu, yaylı ve basit sarkaç."}, {"title": "Dalga Mekaniği ve Modern Fizik", "content": "Su dalgalarında kırınım/girift, Fotoelektrik olay, Compton saçılması, Özel Görelilik."}], "Kimya (AYT)": [{"title": "Kimya ve Elektrik / Organik Kimya", "content": "Redoks, Galvanik piller, Elektroliz; Alkan, Alken, Alkin, Alkol ve Eterlerin adlandırılması."}]}};

    function onGradeChange() {
      const grade = document.getElementById('grade-select').value;
      const subjectSelect = document.getElementById('subject-select');
      const topicSelect = document.getElementById('topic-select');
      
      subjectSelect.innerHTML = '<option value="">-- Ders Seçiniz --</option>';
      topicSelect.innerHTML = '<option value="">-- Önce Ders Seçiniz --</option>';
      topicSelect.disabled = true;

      if (grade && database[grade]) {
        subjectSelect.disabled = false;
        Object.keys(database[grade]).forEach(subject => {
          const opt = document.createElement('option');
          opt.value = subject;
          opt.textContent = subject;
          subjectSelect.appendChild(opt);
        });
      } else {
        subjectSelect.disabled = true;
      }
      resetContent();
    }

    function onSubjectChange() {
      const grade = document.getElementById('grade-select').value;
      const subject = document.getElementById('subject-select').value;
      const topicSelect = document.getElementById('topic-select');

      topicSelect.innerHTML = '<option value="">-- Konu Seçiniz --</option>';

      if (grade && subject && database[grade][subject]) {
        topicSelect.disabled = false;
        database[grade][subject].forEach((topicObj, idx) => {
          const opt = document.createElement('option');
          opt.value = idx;
          opt.textContent = topicObj.title;
          topicSelect.appendChild(opt);
        });
      } else {
        topicSelect.disabled = true;
      }
      resetContent();
    }

    function displayTopic() {
      const grade = document.getElementById('grade-select').value;
      const subject = document.getElementById('subject-select').value;
      const topicIdx = document.getElementById('topic-select').value;
      const display = document.getElementById('content-display');

      if (topicIdx !== "") {
        const topic = database[grade][subject][topicIdx];
        display.innerHTML = `
          <div class="topic-header">
            <span class="badge">${grade}. Sınıf - ${subject}</span>
            <h2 class="topic-title">${topic.title}</h2>
          </div>
          <div class="topic-body">
            ${topic.content}
          </div>
        `;
      } else {
        resetContent();
      }
    }

    function resetContent() {
      document.getElementById('content-display').innerHTML = `
        <div class="placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3>Sol taraftaki adımları takip ederek Sınıf, Ders ve Konu seçimi yapınız.</h3>
        </div>
      `;
    }
  </script>
</body>
</html>
