<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>5-12. Sınıf Eksiksiz Konu Anlatım Portalı</title>
  <style>
    :root {
      --primary: #1e293b;
      --secondary: #0f172a;
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
      padding: 2rem 1rem;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    header h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    header p {
      color: #94a3b8;
      font-size: 1rem;
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
      min-width: 300px;
      background: var(--card-bg);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid var(--border);
      height: fit-content;
    }

    .sidebar h2 {
      font-size: 1.25rem;
      color: var(--primary);
      margin-bottom: 1rem;
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
      padding: 0.75rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      outline: none;
      background-color: #fff;
      font-size: 0.95rem;
      color: var(--text);
      transition: border-color 0.2s;
    }

    select:focus {
      border-color: var(--accent);
    }

    select:disabled {
      background-color: #f1f5f9;
      cursor: not-allowed;
    }

    .stats-card {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1.5rem;
    }

    .stats-card h4 {
      color: #1e40af;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .stats-card p {
      font-size: 0.85rem;
      color: #1e3a8a;
    }

    /* Content Area */
    .content-area {
      flex: 3;
      background: var(--card-bg);
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      border: 1px solid var(--border);
      min-height: 500px;
    }

    .topic-header {
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border);
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: #dbeafe;
      color: #1e40af;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .topic-title {
      font-size: 1.8rem;
      color: var(--primary);
    }

    .topic-body {
      font-size: 1.05rem;
      line-height: 1.8;
      color: #334155;
    }

    .topic-body h3 {
      font-size: 1.3rem;
      color: var(--primary);
      margin: 1.5rem 0 0.75rem 0;
    }

    .topic-body ul, .topic-body ol {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }

    .topic-body li {
      margin-bottom: 0.5rem;
    }

    .topic-body code {
      background-color: #f1f5f9;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.9em;
      color: #0f172a;
    }

    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 400px;
      color: var(--text-muted);
      text-align: center;
    }

    .placeholder svg {
      width: 64px;
      height: 64px;
      margin-bottom: 1rem;
      stroke: var(--text-muted);
    }

    /* Sub-topics List */
    .subtopics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .subtopic-card {
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #f8fafc;
    }

    .subtopic-card:hover {
      border-color: var(--accent);
      background-color: #eff6ff;
      transform: translateY(-2px);
    }

    .subtopic-card h4 {
      font-size: 1rem;
      color: var(--primary);
    }
  </style>
</head>
<body>

  <header>
    <h1>5-12. Sınıf Eksiksiz Ders Konu Anlatım Portalı</h1>
    <p>Milli Eğitim Bakanlığı (MEB) Müfredatına Uygun Tüm Sınıf ve Ders Konuları</p>
  </header>

  <div class="container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2>Ders ve Konu Seçimi</h2>
      
      <div class="filter-group">
        <label for="grade-select">Sınıf Seviyesi:</label>
        <select id="grade-select" onchange="onGradeChange()">
          <option value="">-- Sınıf Seçiniz --</option>
          <option value="5">5. Sınıf</option>
          <option value="6">6. Sınıf</option>
          <option value="7">7. Sınıf</option>
          <option value="8">8. Sınıf (LGS)</option>
          <option value="9">9. Sınıf</option>
          <option value="10">10. Sınıf</option>
          <option value="11">11. Sınıf</option>
          <option value="12">12. Sınıf (YKS)</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="subject-select">Ders:</label>
        <select id="subject-select" onchange="onSubjectChange()" disabled>
          <option value="">-- Önce Sınıf Seçiniz --</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="topic-select">Konu Başlığı:</label>
        <select id="topic-select" onchange="displayTopic()" disabled>
          <option value="">-- Önce Ders Seçiniz --</option>
        </select>
      </div>

      <div class="stats-card">
        <h4>Portala Hoş Geldiniz</h4>
        <p>Sol taraftaki menüleri kullanarak 5. sınıftan 12. sınıfa kadar olan tüm temel derslerin ünite ve konularına ulaşabilirsiniz.</p>
      </div>
    </aside>

    <!-- Content Area -->
    <main class="content-area" id="content-display">
      <div class="placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3>Lütfen incelemek istediğiniz Sınıf, Ders ve Konuyu seçiniz.</h3>
      </div>
    </main>
  </div>

  <script>
    // 5. Sınıftan 12. Sınıfa Eksiksiz Müfredat Veritabanı
    const database = {
      "5": {
        "Matematik": [
          {
            title: "Doğal Sayılar ve İşlemler",
            content: `
              <h3>1. Doğal Sayıları Okuma ve Yazma</h3>
              <p>En az 7, en çok 9 basamaklı doğal sayılar okunurken ve yazılırken sayılar bölüklerine ayrılır. Bölükler sağdan sola doğru üçerli gruplardır (Birler, Binler, Milyonlar bölüğü).</p>
              <h3>2. Basamak Değerleri</h3>
              <p>Rakamların bulunduğu basamağa göre aldığı değere <b>basamak değeri</b> denir. Örneğin 12.345.678 sayısında 2 rakamının basamak değeri 2.000.000'dur.</p>
              <h3>3. Zihinden İşlemler</h3>
              <p>Toplama ve çıkarma işlemlerinde yuvarlama, parçalama ve kolay toplanan sayılardan başlama stratejileri kullanılır.</p>
            `
          },
          {
            title: "Kesirler ve Ondalık Gösterim",
            content: `
              <h3>1. Kesir Çeşitleri</h3>
              <ul>
                <li><b>Basit Kesir:</b> Payı paydasından küçük olan kesirlerdir (ör: 3/5).</li>
                <li><b>Bileşik Kesir:</b> Payı paydasına eşit veya payından büyük olan kesirlerdir (ör: 7/4).</li>
                <li><b>Tam Sayılı Kesir:</b> Bir tam sayı ve bir basit kesirden oluşan kesirlerdir (ör: 2 tam 1/3).</li>
              </ul>
              <h3>2. Ondalık Gösterim</h3>
              <p>Paydası 10, 100, 1000 olan kesirler virgül kullanılarak gösterilir. Örneğin 3/10 = 0,3 ve 45/100 = 0,45 şeklinde ifade edilir.</p>
            `
          },
          {
            title: "Geometrik Kavramlar ve Çizimler",
            content: `
              <h3>1. Doğru, Doğru Parçası ve Işın</h3>
              <p><b>Doğru:</b> İki yönden sonsuza giden noktalar kümesi.</p>
              <p><b>Işın:</b> Başlangıç noktası belli, tek yönde sonsuza giden çizgi.</p>
              <p><b>Doğru Parçası:</b> İki ucu sınırlandırılmış çizgi modeli.</p>
            `
          }
        ],
        "Fen Bilimleri": [
          {
            title: "Güneş, Dünya ve Ay",
            content: `
              <h3>1. Güneş'in Yapısı ve Özellikleri</h3>
              <p>Güneş, orta büyüklükte bir yıldızdır. Katmanlardan oluşur ve yüzey sıcaklığı yaklaşık 6000°C'dir. Isı ve ışık kaynağımızdır.</p>
              <h3>2. Ay'ın Evreleri</h3>
              <p>Ay'ın 4 ana evresi (Yeniay, İlk Dördün, Dolunay, Son Dördün) ve ara evreleri (Hilal, Şişkin Ay) bulunmaktadır. Ana evreler arası süre yaklaşık 1 haftadır.</p>
            `
          },
          {
            title: "Canlılar Dünyası",
            content: `
              <h3>Canlıların Sınıflandırılması</h3>
              <p>Canlılar 4 ana grupta incelenir:</p>
              <ul>
                <li><b>Mikroskobik Canlılar:</b> Bakteriler, amip, paramesyum.</li>
                <li><b>Mantarlar:</b> Maya, küf, şapkalı mantarlar.</li>
                <li><b>Bitkiler:</b> Çiçeksiz ve çiçekli bitkiler.</li>
                <li><b>Hayvanlar:</b> Omurgalı ve omurgasız hayvanlar.</li>
              </ul>
            `
          }
        ],
        "Türkçe": [
          {
            title: "Sözcükte Anlam",
            content: `
              <h3>1. Gerçek, Mecaz ve Terim Anlam</h3>
              <p><b>Gerçek Anlam:</b> Sözcüğün akla gelen ilk anlamıdır.</p>
              <p><b>Mecaz Anlam:</b> Sözcüğün gerçek anlamından tamamen uzaklaşarak kazandığı yeni anlamdır.</p>
              <p><b>Terim Anlam:</b> Bilim, sanat, spor gibi özel alanlara özgü kavramları karşılayan sözcüklerdir.</p>
            `
          }
        ]
      },
      "6": {
        "Matematik": [
          {
            title: "Çarpanlar ve Katlar",
            content: `
              <h3>1. Bir Doğal Sayının Çarpanları (Bölenleri)</h3>
              <p>Her doğal sayı iki doğal sayının çarpımı şeklinde yazılabilir. Bu sayılara o sayının çarpanları denir.</p>
              <h3>2. Bölünebilme Kuralları</h3>
              <ul>
                <li><b>2 ile Bölünebilme:</b> Son basamağı çift olan sayılar.</li>
                <li><b>3 ile Bölünebilme:</b> Rakamları toplamı 3 ve 3'ün katı olan sayılar.</li>
                <li><b>5 ile Bölünebilme:</b> Son basamağı 0 veya 5 olan sayılar.</li>
              </ul>
            `
          },
          {
            title: "Kümeler",
            content: `
              <h3>Kümelerde Temel Kavramlar</h3>
              <p>İyi tanımlanmış nesneler topluluğuna <b>küme</b> denir. Elemanı olmayan kümeye <i>boş küme</i> denir (Ø veya {}).</p>
              <p><b>Kesişim (∩):</b> İki kümedeki ortak elemanlar.</p>
              <p><b>Birleşim (∪):</b> İki kümedeki tüm elemanların bir kez yazılmasıyla oluşan küme.</p>
            `
          }
        ],
        "Fen Bilimleri": [
          {
            title: "Güneş Sistemi ve Tutulmalar",
            content: `
              <h3>1. Güneş Sistemi Gezegenleri</h3>
              <p>Güneş'e yakınlıklarına göre gezegenler: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün.</p>
              <h3>2. Güneş ve Ay Tutulması</h3>
              <p><b>Güneş Tutulması:</b> Ay, Dünya ile Güneş arasına girer. (Yeniay evresinde olur)</p>
              <p><b>Ay Tutulması:</b> Dünya, Güneş ile Ay arasına girer. (Dolunay evresinde olur)</p>
            `
          }
        ]
      },
      "7": {
        "Matematik": [
          {
            title: "Tam Sayılarla İşlemler",
            content: `
              <h3>Toplama ve Çıkarma Kuralları</h3>
              <p>Aynı işaretli tam sayılar toplanır ve ortak işaret verilir. Zıt işaretli sayılarda mutlak değeri büyük olandan küçük çıkarılır ve büyüğün işareti verilir.</p>
              <h3>Çarpma ve Bölme İşaret Kuralları</h3>
              <ul>
                <li>(+) x (+) = (+) | (-) x (-) = (+)</li>
                <li>(+) x (-) = (-) | (-) x (+) = (-)</li>
              </ul>
            `
          },
          {
            title: "Cebirsel İfadeler ve Denklemler",
            content: `
              <h3>Birinci Dereceden Bir Bilinmeyenli Denklemler</h3>
              <p>İçinde bilinmeyen bulunan ve eşitlik barındıran ifadelere denklem denir. Denklem çözerken "bilinmeyenler bir tarafa, bilinenler diğer tarafa" kuralı uygulanır.</p>
            `
          }
        ],
        "Fen Bilimleri": [
          {
            title: "Hücre ve Bölünmeler",
            content: `
              <h3>1. Hücrenin Yapısı</h3>
              <p>Hücre 3 ana kısımdan oluşur: Hücre zarı, Sitoplazma, Çekirdek.</p>
              <h3>2. Mitoz ve Mayoz Bölünme</h3>
              <p><b>Mitoz:</b> Vücut hücrelerinde görülür, 2 yeni hücre oluşur, kromozom sayısı sabit kalır.</p>
              <p><b>Mayoz:</b> Üreme ana hücrelerinde görülür, 4 yeni hücre oluşur, kromozom sayısı yarıya iner.</p>
            `
          }
        ]
      },
      "8": {
        "Matematik": [
          {
            title: "Çarpanlar ve Katlar (EBOB - EKOK)",
            content: `
              <h3>1. Asal Sayılar ve Asal Çarpanlar</h3>
              <p>Sadece 1'e ve kendisine bölünebilen 1'den büyük sayılara asal sayı denir. Pozitif tam sayılar asal çarpanlar algoritması ile asal çarpanlarına ayrılır.</p>
              <h3>2. EBOB ve EKOK</h3>
              <p><b>EBOB:</b> En Büyük Ortak Bölen. Parçadan bütüne değil, bütünden parçaya gidişte (bölme sorularında) kullanılır.</p>
              <p><b>EKOK:</b> En Küçük Ortak Kat. Parçadan bütüne ulaşma (periyot, nöbet, ortak zillenme) sorularında kullanılır.</p>
            `
          },
          {
            title: "Üslü İfadeler ve Kareköklü İfadeler",
            content: `
              <h3>1. Üslü İfadeler</h3>
              <p>Negatif kuvvet kuralı: <code>a^-n = 1 / a^n</code>. Üssün üssü alınırken üsler çarpılır.</p>
              <h3>2. Kareköklü İfadeler</h3>
              <p>Tam kare sayılar (1, 4, 9, 16, 25, 36...) kök dışına tam çıkar. Tam kare olmayan sayılar <code>a√b</code> şeklinde yazılır.</p>
            `
          }
        ],
        "Fen Bilimleri": [
          {
            title: "Mevsimler ve İklim",
            content: `
              <h3>Mevsimlerin Oluşumu</h3>
              <p>Mevsimlerin oluşmasının iki temel sebebi vardır:</p>
              <ol>
                <li>Dünya'nın dönme ekseninin 23° 27' eğik olması.</li>
                <li>Dünya'nın Güneş etrafında dolanma hareketi.</li>
              </ol>
            `
          },
          {
            title: "DNA ve Genetik Kod",
            content: `
              <h3>Genetik Yapılar</h3>
              <p>Karmaşıktan basite sıralama: <b>Kromozom > DNA > Gen > Nükleotid</b> (KediGen kuralı).</p>
              <p>DNA'da Adenin (A) karşısına Timin (T), Guanin (G) karşısına Sitozin (C) gelir.</p>
            `
          }
        ]
      },
      "9": {
        "Matematik": [
          {
            title: "Mantık ve Kümeler",
            content: `
              <h3>Önermeler ve Bağlaçlar</h3>
              <p>Doğru ya da yanlış kesin bir hüküm bildiren ifadelere <b>önerme</b> denir.</p>

              <p>Bağlaçlar: <code>Ve (∧)</code>, <code>Veya (∨)</code>, <code>İse (⇒)</code>, <code>Ancak ve Ancak (⇔)</code>.</p>
            `
          },
          {
            title: "Denklem ve Eşitsizlikler",
            content: `
              <h3>Reel Sayılarda Mutlak Değer</h3>
              <p>Bir gerçek sayının sayı doğrusundaki 0 (orijin) noktasına olan uzaklığına mutlak değer denir. |x| ≥ 0 her zaman geçerlidir.</p>
            `
          }
        ],
        "Fizik": [
          {
            title: "Fizik Bilimine Giriş ve Madde Özellikleri",
            content: `
              <h3>Fiziksel Büyüklükler</h3>
              <p><b>Temel Büyüklükler (KISA MUZ):</b> Kütle, Işık Şiddeti, Sıcaklık, Akım Şiddeti, Madde Miktarı, Uzunluk, Zaman.</p>
              <p><b>Özkütle:</b> <code>d = m / V</code> (Kütle / Hacim).</p>
            `
          }
        ],
        "Kimya": [
          {
            title: "Kimya Bilimi ve Atom Yapısı",
            content: `
              <h3>Atom Modelleri Tarihsel Gelişimi</h3>
              <p>Dalton → Thomson (Üzümlü Kek) → Rutherford (Çekirdekli) → Bohr (Yörüngeli) → Modern Atom Teorisi.</p>
            `
          }
        ]
      },
      "10": {
        "Matematik": [
          {
            title: "Sayma ve Olasılık (Permütasyon - Kombinasyon)",
            content: `
              <h3>1. Permütasyon (Sıralama)</h3>
              <p>n elemanlı bir kümenin r'li permütasyonu: <code>P(n,r) = n! / (n-r)!</code></p>
              <h3>2. Kombinasyon (Seçme)</h3>
              <p>n elemanlı bir kümenin r'li kombinasyonu: <code>C(n,r) = n! / (r! * (n-r)!)</code></p>
            `
          },
          {
            title: "Fonksiyonlar",
            content: `
              <h3>Fonksiyon Tanımı</h3>
              <p>A kümesinin her elemanını B kümesinin yalnız bir elemanıyla eşleyen bağıntıya fonksiyon denir. Tanım kümesi ve Değer kümesi kavramları esastır.</p>
            `
          }
        ],
        "Fizik": [
          {
            title: "Elektrik ve Manyetizma",
            content: `
              <h3>Ohm Kanunu</h3>
              <p>Bir iletkenin uçları arasındaki gerilimin, üzerinden geçen akıma oranı sabittir. <code>V = I * R</code> (Gerilim = Akım x Direnç).</p>
            `
          }
        ]
      },
      "11": {
        "Matematik": [
          {
            title: "Trigonometri",
            content: `
              <h3>1. Yönlü Açılar ve Birim Çember</h3>
              <p>Yarıçapı 1 birim olan çembere birim çember denir (x² + y² = 1). x ekseni kosinüs, y ekseni sinüs eksenidir.</p>
              <h3>2. Trigonometrik Özdeşlikler</h3>
              <p><code>sin²x + cos²x = 1</code></p>
              <p><code>tan x = sin x / cos x</code> | <code>cot x = cos x / sin x</code></p>
            `
          },
          {
            title: "Analitik Geometri",
            content: `
              <h3>İki Nokta Arasındaki Uzaklık</h3>
              <p>A(x1, y1) ve B(x2, y2) noktaları için uzaklık: <code>|AB| = √[(x2 - x1)² + (y2 - y1)²]</code></p>
            `
          }
        ],
        "Fizik": [
          {
            title: "Vektörler ve Kuvvet Hareket",
            content: `
              <h3>Newton'un Hareket Yasaları</h3>
              <ol>
                <li>Eylemsizlik Prensibi</li>
                <li>Temel Prensip (<code>F = m * a</code>)</li>
                <li>Etki-Tepki Prensibi</li>
              </ol>
            `
          }
        ]
      },
      "12": {
        "Matematik": [
          {
            title: "Logaritma ve Diziler",
            content: `
              <h3>1. Logaritma Fonksiyonu</h3>
              <p>Üstel fonksiyonun tersidir. <code>y = a^x ⇔ x = log_a(y)</code></p>
              <p>Özellik: <code>log(a * b) = log(a) + log(b)</code></p>
              <h3>2. Aritmetik ve Geometrik Diziler</h3>
              <p>Ardışık terimleri arasındaki fark sabit olan dizilere <b>Aritmetik Dizi</b>, oranı sabit olan dizilere <b>Geometrik Dizi</b> denir.</p>
            `
          },
          {
            title: "Türev ve İntegral",
            content: `
              <h3>1. Türev Tanımı</h3>
              <p>Bir fonksiyonun grafiğindeki teğetin eğimidir. Limite bağlı türev tanımı: <code>f'(x) = lim(h->0) [f(x+h) - f(x)] / h</code></p>
              <h3>2. İntegral</h3>
              <p>Türevi bilinen fonksiyonu bulma işlemidir (Belirsiz İntegral) veya eğri altında kalan alanı hesaplama yöntemidir (Belirli İntegral).</p>
            `
          }
        ],
        "Fizik": [
          {
            title: "Çembersel Hareket ve Modern Fizik",
            content: `
              <h3>Düzgün Çembersel Hareket</h3>
              <p>Çizgisel Hız: <code>v = 2πr / T</code> | Açısal Hız: <code>ω = 2π / T</code></p>
              <p>Merkezcil Kuvvet: <code>Fm = m * v² / r</code></p>
            `
          }
        ]
      }
    };

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
          <h3>Lütfen incelemek istediğiniz Sınıf, Ders ve Konuyu seçiniz.</h3>
        </div>
      `;
    }
  </script>
</body>
</html>
