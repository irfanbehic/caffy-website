import type { Dict } from "./en";

const tr: Dict = {
  meta: { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  nav: {
    features: "Özellikler",
    calculator: "Hesaplayıcı",
    sleep: "Uyku",
    faq: "SSS",
    download: "İndir",
  },
  hero: {
    badge: "Bilime dayalı kafein takibi",
    titleA: "Şu an vücudunda tam olarak",
    titleAccent: "ne kadar kafein",
    titleB: "olduğunu bil.",
    sub: "Caffy her kahveni, çayını ve enerji içeceğini kaydeder, metabolizmanı gerçek zamanlı modeller — böylece uykunu korur, kontrolün sende olur.",
    primary: "App Store’dan İndir",
    secondary: "Hesaplayıcıyı dene",
    rating: "Uykusuna değer verenlerin favorisi",
  },
  calc: {
    eyebrow: "Canlı demo",
    title: "Kafeinin vücudunda nasıl hareket ettiğini gör",
    subtitle:
      "Bir içecek ekle, uyku saatini sürükle ve başını yastığa koyduğunda sistemde ne kadar kafein kaldığını gör.",
    addLabel: "İçecek ekle",
    profileLabel: "Metabolizman",
    bedtimeLabel: "Uyku saati",
    atBedtime: "Uyurken",
    peak: "Bugün zirve",
    now: "Şu anda",
    reset: "Sıfırla",
    verdictSafe: "Harika — kafein, derin uykunla aranı bozmayacak.",
    verdictCaution: "Sınırda — uykunu geciktirebilir veya hafifletebilir.",
    verdictPoor: "Çok yüksek — bu gece huzursuz, bölük bir uyku bekle.",
    note: "Gösterim amaçlı basitleştirilmiş bir model. Caffy uygulaması eğriyi yaşına, vücuduna ve duyarlılığına göre kişiselleştirir.",
    profiles: {
      average: "Ortalama",
      sensitive: "Duyarlı",
      fast: "Hızlı",
      smoker: "Sigara",
      pregnant: "Hamile",
    },
    drinks: {
      espresso: "Espresso",
      coffee: "Kahve",
      energy: "Enerji",
      tea: "Çay",
      matcha: "Matcha",
      cola: "Kola",
    },
    mg: "mg",
  },
  viz: {
    sleepScore: "Uyku skoru",
    stepDown: "7 günde kademeli azaltma",
    weeklyInsight: "Bu hafta",
    insightLine: "Kafeini 14:00’ten önce bıraktığın günlerde daha iyi uyuyorsun.",
    activeNow: "Şu an aktif",
    untilSafe: "Uykuya güvenliye",
    health: "Apple Health ile senkron",
  },
  gallery: {
    eyebrow: "Yakından bak",
    title: "İhtiyacın olan her şey, tek bakışta.",
    shots: [
      "Canlı metabolizma",
      "Uyku koruması",
      "Trendler ve detoks",
      "Haftalık AI önerileri",
      "Kafein haftan",
    ],
  },
  features: {
    eyebrow: "Vücuduna göre kurgulandı",
    title: "Vücudunun kafeini nasıl işlediğinin modeli.",
    items: {
      realtime: {
        title: "Gerçek zamanlı kafein seviyesi",
        body: "Kişiselleştirilmiş yarı-ömür modeli, kanında ne kadar kafein aktif olduğunu tam olarak gösterir — basit bir geri sayım değil, vücuduna göre ayarlanmış bir eğri.",
      },
      sleep: {
        title: "Seni uyaran bir uyku skoru",
        body: "Caffy uyku saatini bilir ve o son fincandan önce, bu gece derin uykundan çalıp çalmayacağını söyler. Dırdır değil, sessiz bir dürtme.",
      },
      detox: {
        title: "Çökmeden azalt",
        body: "Rehberli kafein detoks programları seni kademeli olarak indirir — enerjini korur, bağımlılığını bırakırsın; hem de vücudunun kaldırabileceği bir hızda.",
      },
      insights: {
        title: "Haftalık AI önerileri",
        body: "Her hafta Caffy senin göremediğin örüntüleri yakalar — gerçek tetikleyicilerini, en kötü saatlerini, uykunu sessizce şekillendiren alışkanlıklarını.",
      },
      widgets: {
        title: "Widget’lar & Apple Health",
        body: "Mevcut seviyeni Ana Ekran ve Kilit Ekranı’ndan bir bakışta gör, Apple Health ile kusursuz senkronize et. Verilerin sende kalır.",
      },
    },
  },
  science: {
    eyebrow: "Bilim",
    title: "Her sayının arkasındaki matematik.",
    body: "Caffy kafeini, farmakokinetik bir yarı-ömür eğrisi ve 45 dakikalık emilim fazıyla modeller; metabolizmanı gerçekten değiştiren faktörlere göre ayarlar — yaş, duyarlılık, hamilelik, sigara ve daha fazlası.",
    formula: "C(t) = C₀ × 0.5^(t / t½)",
    sources: "Modeller FDA, EFSA, NIH ve Sleep Foundation verilerine dayanır.",
    stats: {
      halflife: "Ortalama kafein yarı ömrü",
      halflifeVal: "~5–6 sa",
      absorption: "Zirve emilim süresi",
      absorptionVal: "45 dk",
      safe: "Güvenli günlük limit (yetişkin)",
      safeVal: "400 mg",
    },
  },
  faq: {
    eyebrow: "Sorular",
    title: "Aklına takılabilecek her şey",
    items: [
      {
        q: "Caffy ne kadar kafeinim kaldığını nasıl biliyor?",
        a: "Caffy, kaydettiğin her içeceğe farmakokinetik bir yarı-ömür modeli uygular ve eğriyi kişisel profiline göre ayarlar — yaş, vücut, duyarlılık ve hamilelik ya da sigara gibi faktörler. Sonuç, sabit bir sayaç değil, aktif kafeinin canlı bir tahmini.",
      },
      {
        q: "Uykuma gerçekten yardımcı olur mu?",
        a: "Caffy uyku saatinde ne kadar kafeinin hâlâ aktif olacağını hesaplar ve içmeden önce sana bir uyku skoru verir. Saat 16:00’daki kahvenin gece yarısı sistemde 90mg bıraktığını bilmek, çoğu zaman kararını değiştirmeye yeter.",
      },
      {
        q: "Hangi içecekleri takip edebilirim?",
        a: "Her türden kahve, çaylar, enerji içecekleri, gazlı içecekler, matcha ve daha fazlası — her biri gerçekçi kafein içeriğiyle. Kendi miktarlarınla özel içecekler de oluşturabilirsin.",
      },
      {
        q: "Verilerim gizli mi?",
        a: "Evet. Kayıtların sana ait. Apple Health erişimi cihazında kalır ve verilerini asla satmayız. Ayrıntılar için gizlilik politikasına bak.",
      },
      {
        q: "Caffy ücretsiz mi?",
        a: "Caffy temel takip dahil ücretsiz indirilir. Premium; gelişmiş öneriler, detoks programları ve tam metabolizma modelinin kilidini açar.",
      },
    ],
  },
  cta: {
    title: "Kafeinin kontrolünü ele al.",
    sub: "Gündüz daha iyi enerji. Gece daha derin uyku. Her şey kendi sayını bilmekle başlar.",
    button: "App Store’dan İndir",
  },
  footer: {
    tagline: "Uykunu koruyan gerçek zamanlı kafein takibi.",
    product: "Ürün",
    company: "Şirket",
    legal: "Yasal",
    privacy: "Gizlilik Politikası",
    support: "Destek",
    rights: "Tüm hakları saklıdır.",
    madeWith: "Hem kahveyi hem uykuyu sevenler için yapıldı.",
  },
  privacy: {
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: Haziran 2026",
    backHome: "Ana sayfaya dön",
    intro:
      "Caffy gizlilik öncelikli kurgulandı. Bu politika neyi, neden topladığımızı ve sahip olduğun kontrolü açıklar. Kısacası: kafein verilerin sana aittir ve onları satmayız.",
    sections: [
      {
        h: "Neleri topluyoruz",
        p: "Kaydettiğin kafein girişleri (içecek türü, miktar, zaman), modeli kişiselleştirmek için kullanılan profil ayarların (yaş aralığı ve duyarlılık gibi) ve dil, tema gibi temel uygulama tercihleri.",
      },
      {
        h: "Kimlik doğrulama",
        p: "Caffy varsayılan olarak anonim kimlik doğrulama kullanır, böylece hesap olmadan hemen başlayabilirsin. Apple ile giriş yapmayı seçersen, verilerini cihazlar arası taşımak için kimliğin güvenle bağlanır.",
      },
      {
        h: "Apple Health",
        p: "İzin verirsen Caffy, kişiselleştirmeyi iyileştirmek için ilgili sağlık verilerini okuyabilir. Bu erişim isteğe bağlıdır, cihazında işlenir ve Sağlık uygulamasından istediğin an iptal edilebilir.",
      },
      {
        h: "Verilerin nasıl saklanır",
        p: "Verilerin cihazında yerel olarak saklanır ve cihazların arasında erişilebilir olması için arka uca güvenle senkronize edilir. Erişim satır düzeyi güvenlikle korunur — satırlarını yalnızca sen okuyabilirsin.",
      },
      {
        h: "Yapmadıklarımız",
        p: "Kişisel verilerini satmayız. Kafein alışkanlıklarına dayalı üçüncü taraf reklamı göstermeyiz.",
      },
      {
        h: "Kontrol sende",
        p: "Herhangi bir girişi düzenleyebilir veya silebilirsin; hesabının ve ilişkili verilerin silinmesini uygulama içinden ya da bizimle iletişime geçerek istediğin an talep edebilirsin.",
      },
      {
        h: "İletişim",
        p: "Gizlilikle ilgili soruların mı var? Bize [YOUR_EMAIL] adresinden yaz, sana geri döneriz.",
      },
    ],
  },
  support: {
    title: "Destek",
    backHome: "Ana sayfaya dön",
    intro:
      "Yardım mı lazım? Çoğu yanıt aşağıda. Hâlâ takıldıysan, her mesajı okuyoruz.",
    contactTitle: "Bize ulaş",
    contactBody: "Bize yaz, genellikle 1–2 iş günü içinde yanıtlarız.",
    emailButton: "Destek e-postası",
    email: "[YOUR_EMAIL]",
    topicsTitle: "Sık konular",
    topics: [
      {
        h: "Başlarken",
        p: "Caffy’yi aç, ana ekrandan ilk içeceğini kaydet ve ayarlardan uyku saatini belirle ki uyku skorun ilk günden çalışsın.",
      },
      {
        h: "Modeli kişiselleştirme",
        p: "Profiline yaş aralığını, duyarlılığını ve ilgili faktörleri ekle ki kafein eğrisi vücudunun gerçekte nasıl çalıştığını yansıtsın.",
      },
      {
        h: "Premium & faturalandırma",
        p: "Aboneliğini Apple ID ayarlarından istediğin an yönet veya iptal et. Premium; önerilerin, detoks programlarının ve tam modelin kilidini açar.",
      },
      {
        h: "Satın alımları geri yükleme",
        p: "Yeniden mi kurdun, cihaz mı değiştirdin? Premium erişimini geri getirmek için ayarlardan “Satın Alımları Geri Yükle”yi kullan.",
      },
    ],
  },
};

export default tr;
