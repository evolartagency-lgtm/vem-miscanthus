/**
 * VEM sales funnels — 79 directions, structure and logic fixed by the client.
 * Order matters: funnel #1 (buy rhizomes) is the primary landing CTA.
 * Each funnel carries its title and pipeline steps in en / uk / he.
 */

export type FunnelCategory =
  | "orders" | "land" | "licenses" | "biomass" | "production"
  | "carbon" | "partners" | "programs" | "grants" | "investment" | "consulting";

export interface LocalizedText {
  en: string;
  uk: string;
  he: string;
}

export interface FunnelStep {
  en: string;
  uk: string;
  he: string;
}

export interface Funnel {
  n: number;
  slug: string;
  category: FunnelCategory;
  title: LocalizedText;
  steps: FunnelStep[];
}

export const FUNNEL_CATEGORIES: { id: FunnelCategory; name: LocalizedText }[] = [
  { id: "orders", name: { en: "Purchase & Orders", uk: "Купівля та замовлення", he: "רכישה והזמנות" } },
  { id: "land", name: { en: "Land, Soil & Agronomy", uk: "Земля, ґрунт та агрономія", he: "קרקע, קרקע חקלאית ואגרונומיה" } },
  { id: "licenses", name: { en: "Licensing", uk: "Ліцензування", he: "רישוי" } },
  { id: "biomass", name: { en: "Biomass & Offtake", uk: "Біомаса та офтейк", he: "ביומסה ורכש" } },
  { id: "production", name: { en: "Production & Processing", uk: "Виробництво та переробка", he: "ייצור ועיבוד" } },
  { id: "carbon", name: { en: "Carbon & ESG", uk: "Вуглець та ESG", he: "פחמן ו-ESG" } },
  { id: "partners", name: { en: "Partnership & Franchise", uk: "Партнерство та франшиза", he: "שותפויות וזכיינות" } },
  { id: "programs", name: { en: "Programs & Clusters", uk: "Програми та кластери", he: "תוכניות וקלאסטרים" } },
  { id: "grants", name: { en: "Grants, R&D & Science", uk: "Гранти, R&D та наука", he: "מענקים, R&D ומדע" } },
  { id: "investment", name: { en: "Investment", uk: "Інвестиції", he: "השקעות" } },
  { id: "consulting", name: { en: "Consulting & Documents", uk: "Консалтинг та документи", he: "ייעוץ ומסמכים" } },
];

export const FUNNELS: Funnel[] = [
  {
    n: 1, slug: "buy-miscanthus-rhizomes", category: "orders",
    title: { en: "BUY MISCANTHUS RHIZOMES", uk: "КУПИТИ РИЗОМИ МІСКАНТУСУ", he: "לרכוש שורשי מיסקנטוס" },
    steps: [
      { en: "Variety", uk: "Сорт", he: "זן" },
      { en: "Quantity", uk: "Кількість", he: "כמות" },
      { en: "Region suitability", uk: "Відповідність регіону", he: "התאמה אזורית" },
      { en: "Price", uk: "Ціна", he: "מחיר" },
      { en: "Delivery", uk: "Доставка", he: "משלוח" },
      { en: "Order", uk: "Замовлення", he: "הזמנה" },
    ],
  },
  {
    n: 2, slug: "purchase-or-evaluate-land", category: "land",
    title: { en: "PURCHASE OR EVALUATE YOUR LAND PLOT", uk: "ПРИДБАТИ ЧИ ОЦІНИТИ ВАШУ ЗЕМЕЛЬНУ ДІЛЯНКУ", he: "לרכוש או להעריך את חלקת הקרקע שלכם" },
    steps: [
      { en: "GIS", uk: "GIS", he: "GIS" },
      { en: "Soil", uk: "Ґрунт", he: "קרקע" },
      { en: "Salinity", uk: "Засолення", he: "מליחות" },
      { en: "Degradation", uk: "Деградація", he: "הידרדרות" },
      { en: "Infrastructure", uk: "Інфраструктура", he: "תשתית" },
      { en: "Suitability", uk: "Придатність", he: "התאמה" },
    ],
  },
  {
    n: 3, slug: "get-soil-water-passport", category: "land",
    title: { en: "GET A SOIL & WATER PASSPORT", uk: "ОТРИМАТИ ПАСПОРТ ҐРУНТУ ТА ВОДИ", he: "קבלת דרכון קרקע ומים" },
    steps: [
      { en: "Soil analysis", uk: "Аналіз ґрунту", he: "בדיקת קרקע" },
      { en: "Water analysis", uk: "Аналіз води", he: "בדיקת מים" },
      { en: "EC/SAR", uk: "EC/SAR", he: "EC/SAR" },
      { en: "Risks", uk: "Ризики", he: "סיכונים" },
      { en: "VEM qualification", uk: "Кваліфікація VEM", he: "הסמכת VEM" },
    ],
  },
  {
    n: 4, slug: "get-agronomic-plan", category: "land",
    title: { en: "GET AN AGRONOMIC PLAN", uk: "ОТРИМАТИ АГРОНОМІЧНИЙ ПЛАН", he: "קבלת תוכנית אגרונומית" },
    steps: [
      { en: "Land preparation", uk: "Підготовка землі", he: "הכנת קרקע" },
      { en: "Planting", uk: "Посадка", he: "שתילה" },
      { en: "Irrigation", uk: "Зрошення", he: "השקיה" },
      { en: "Fertigation", uk: "Фертигація", he: "פרטיגציה" },
      { en: "Weed control", uk: "Контроль бур’янів", he: "הדברת עשבים" },
      { en: "Harvest", uk: "Збирання врожаю", he: "קציר" },
    ],
  },
  {
    n: 5, slug: "get-vem-methodology", category: "land",
    title: { en: "GET THE VEM METHODOLOGY", uk: "ОТРИМАТИ МЕТОДОЛОГІЮ VEM", he: "קבלת מתודולוגיית VEM" },
    steps: [
      { en: "Region", uk: "Регіон", he: "אזור" },
      { en: "Climate", uk: "Клімат", he: "אקלים" },
      { en: "Soil", uk: "Ґрунт", he: "קרקע" },
      { en: "Water", uk: "Вода", he: "מים" },
      { en: "Salinity", uk: "Засолення", he: "מליחות" },
      { en: "Planting protocol", uk: "Протокол посадки", he: "פרוטוקול שתילה" },
      { en: "KPI", uk: "KPI", he: "KPI" },
      { en: "SOP", uk: "SOP", he: "SOP" },
    ],
  },
  {
    n: 6, slug: "license-vem-variety", category: "licenses",
    title: { en: "LICENSE THE VEM VARIETY", uk: "ЛІЦЕНЗУВАТИ СОРТ VEM", he: "רישוי זן VEM" },
    steps: [
      { en: "Variety", uk: "Сорт", he: "זן" },
      { en: "Territory", uk: "Територія", he: "טריטוריה" },
      { en: "Propagation rights", uk: "Права на розмноження", he: "זכויות ריבוי" },
      { en: "Commercial license", uk: "Комерційна ліцензія", he: "רישיון מסחרי" },
    ],
  },
  {
    n: 7, slug: "license-vem-methodology", category: "licenses",
    title: { en: "LICENSE THE VEM METHODOLOGY", uk: "ЛІЦЕНЗУВАТИ МЕТОДОЛОГІЮ VEM", he: "רישוי מתודולוגיית VEM" },
    steps: [
      { en: "Territory", uk: "Територія", he: "טריטוריה" },
      { en: "Protocol", uk: "Протокол", he: "פרוטוקול" },
      { en: "Training", uk: "Навчання", he: "הדרכה" },
      { en: "Implementation", uk: "Впровадження", he: "יישום" },
      { en: "License", uk: "Ліцензія", he: "רישיון" },
    ],
  },
  {
    n: 8, slug: "create-miscanthus-plantation", category: "land",
    title: { en: "CREATE A MISCANTHUS PLANTATION", uk: "СТВОРИТИ ПЛАНТАЦІЮ МІСКАНТУСУ", he: "הקמת מטע מיסקנטוס" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Rhizomes", uk: "Ризоми", he: "שורשים (ריזומים)" },
      { en: "Irrigation", uk: "Зрошення", he: "השקיה" },
      { en: "Planting", uk: "Посадка", he: "שתילה" },
      { en: "Establishment", uk: "Укорінення", he: "השתרשות" },
      { en: "Management", uk: "Управління", he: "ניהול" },
      { en: "Harvest", uk: "Збирання врожаю", he: "קציר" },
    ],
  },
  {
    n: 9, slug: "get-vem-agronomic-support", category: "land",
    title: { en: "GET VEM AGRONOMIC SUPPORT", uk: "ОТРИМАТИ АГРОНОМІЧНИЙ СУПРОВІД VEM", he: "קבלת ליווי אגרונומי של VEM" },
    steps: [
      { en: "Field audit", uk: "Аудит поля", he: "ביקורת שדה" },
      { en: "Agronomist", uk: "Агроном", he: "אגרונום" },
      { en: "Monitoring", uk: "Моніторинг", he: "מעקב" },
      { en: "Corrective actions", uk: "Коригувальні дії", he: "פעולות תיקון" },
      { en: "Yield optimization", uk: "Оптимізація врожайності", he: "מיטוב תנובה" },
    ],
  },
  {
    n: 10, slug: "design-irrigation-system", category: "land",
    title: { en: "DESIGN AN IRRIGATION SYSTEM", uk: "СПРОЄКТУВАТИ СИСТЕМУ ЗРОШЕННЯ", he: "תכנון מערכת השקיה" },
    steps: [
      { en: "Water source", uk: "Джерело води", he: "מקור מים" },
      { en: "Water quality", uk: "Якість води", he: "איכות מים" },
      { en: "Soil", uk: "Ґрунт", he: "קרקע" },
      { en: "Drip irrigation design", uk: "Проєкт крапельного зрошення", he: "תכנון טפטפת" },
      { en: "Monitoring", uk: "Моніторинг", he: "מעקב" },
      { en: "Optimization", uk: "Оптимізація", he: "מיטוב" },
    ],
  },
  {
    n: 11, slug: "use-treated-wastewater", category: "land",
    title: { en: "USE TREATED WASTEWATER", uk: "ВИКОРИСТОВУВАТИ ОЧИЩЕНІ СТІЧНІ ВОДИ", he: "שימוש במי שופכין מטוהרים" },
    steps: [
      { en: "Water analysis", uk: "Аналіз води", he: "בדיקת מים" },
      { en: "Salinity risk", uk: "Ризик засолення", he: "סיכון מליחות" },
      { en: "Irrigation strategy", uk: "Стратегія зрошення", he: "אסטרטגיית השקיה" },
      { en: "Soil monitoring", uk: "Моніторинг ґрунту", he: "מעקב קרקע" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
    ],
  },
  {
    n: 12, slug: "restore-your-land", category: "land",
    title: { en: "RESTORE YOUR LAND", uk: "ВІДНОВИТИ ВАШІ ЗЕМЛІ", he: "שיקום הקרקע שלכם" },
    steps: [
      { en: "Baseline condition", uk: "Базовий стан", he: "מצב בסיס" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Soil recovery", uk: "Відновлення ґрунту", he: "שיקום קרקע" },
      { en: "Water retention", uk: "Утримання води", he: "אגירת מים" },
      { en: "Monitoring", uk: "Моніторинг", he: "מעקב" },
      { en: "Impact", uk: "Вплив", he: "השפעה" },
    ],
  },
  {
    n: 13, slug: "vem-soil-renewal", category: "land",
    title: { en: "VEM SOIL RENEWAL — SOIL RESTORATION", uk: "VEM SOIL RENEWAL — ВІДНОВЛЕННЯ ҐРУНТУ", he: "VEM SOIL RENEWAL — שיקום קרקע" },
    steps: [
      { en: "Soil baseline", uk: "Базовий стан ґрунту", he: "קו בסיס של הקרקע" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "SOC", uk: "SOC", he: "SOC" },
      { en: "Soil structure", uk: "Структура ґрунту", he: "מבנה קרקע" },
      { en: "Regeneration KPIs", uk: "KPI регенерації", he: "מדדי KPI לרגנרציה" },
    ],
  },
  {
    n: 14, slug: "vem-water-restoration", category: "land",
    title: { en: "VEM WATER RESTORATION — WATER BALANCE RECOVERY", uk: "VEM WATER RESTORATION — ВІДНОВЛЕННЯ ВОДНОГО БАЛАНСУ", he: "VEM WATER RESTORATION — שיקום מאזן המים" },
    steps: [
      { en: "Water problem", uk: "Водна проблема", he: "בעיית מים" },
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Water-use efficiency", uk: "Ефективність використання води", he: "יעילות שימוש במים" },
      { en: "Soil-water KPIs", uk: "Ґрунтово-водні KPI", he: "מדדי KPI קרקע-מים" },
    ],
  },
  {
    n: 15, slug: "vem-wind-shield", category: "land",
    title: { en: "VEM WIND SHIELD — WIND PROTECTION", uk: "VEM WIND SHIELD — ВІТРОЗАХИСТ", he: "VEM WIND SHIELD — הגנה מפני רוח" },
    steps: [
      { en: "Site", uk: "Ділянка", he: "חלקה" },
      { en: "Wind-erosion risk", uk: "Ризик вітрової ерозії", he: "סיכון סחיפת רוח" },
      { en: "Miscanthus system design", uk: "Дизайн системи з міскантусу", he: "תכנון מערכת מיסקנטוס" },
      { en: "Belt formation", uk: "Формування насаджень", he: "יצירת חגורות נטיעה" },
      { en: "Protection", uk: "Захист", he: "הגנה" },
    ],
  },
  {
    n: 16, slug: "vem-flood-shield", category: "land",
    title: { en: "VEM FLOOD SHIELD — FLOOD PROTECTION", uk: "VEM FLOOD SHIELD — ПРОТИПАВОДКОВИЙ ЗАХИСТ", he: "VEM FLOOD SHIELD — הגנה מפני הצפות" },
    steps: [
      { en: "Site", uk: "Ділянка", he: "חלקה" },
      { en: "Runoff / erosion risk", uk: "Ризик стоку/ерозії", he: "סיכון נגר / סחיפה" },
      { en: "Miscanthus system", uk: "Система з міскантусу", he: "מערכת מיסקנטוס" },
      { en: "Monitoring", uk: "Моніторинг", he: "מעקב" },
      { en: "Protection", uk: "Захист", he: "הגנה" },
    ],
  },
  {
    n: 17, slug: "sell-your-biomass", category: "biomass",
    title: { en: "SELL YOUR BIOMASS", uk: "ПРОДАТИ ВАШУ БІОМАСУ", he: "מכירת הביומסה שלכם" },
    steps: [
      { en: "Volume", uk: "Обсяг", he: "נפח" },
      { en: "Quality", uk: "Якість", he: "איכות" },
      { en: "Location", uk: "Локація", he: "מיקום" },
      { en: "Harvest", uk: "Збирання", he: "קציר" },
      { en: "Logistics", uk: "Логістика", he: "לוגיסטיקה" },
      { en: "Buyer", uk: "Покупець", he: "קונה" },
    ],
  },
  {
    n: 18, slug: "guaranteed-biomass-offtake", category: "biomass",
    title: { en: "GET GUARANTEED BIOMASS OFFTAKE", uk: "ОТРИМАТИ ГАРАНТОВАНИЙ ВИКУП БІОМАСИ", he: "קבלת רכש ביומסה מובטח" },
    steps: [
      { en: "Plantation", uk: "Плантація", he: "מטע" },
      { en: "Yield forecast", uk: "Прогноз урожайності", he: "תחזית תנובה" },
      { en: "Quality", uk: "Якість", he: "איכות" },
      { en: "Contract", uk: "Контракт", he: "חוזה" },
      { en: "Harvest", uk: "Збирання", he: "קציר" },
      { en: "Offtake", uk: "Викуп", he: "רכישה" },
    ],
  },
  {
    n: 19, slug: "become-biomass-offtaker", category: "biomass",
    title: { en: "BECOME A BIOMASS OFFTAKER", uk: "СТАТИ ОФТЕЙКЕРОМ БІОМАСИ", he: "הפיכה לרוכש ביומסה (Offtaker)" },
    steps: [
      { en: "Specification", uk: "Специфікація", he: "מפרט" },
      { en: "Annual volume", uk: "Річний обсяг", he: "נפח שנתי" },
      { en: "Location", uk: "Локація", he: "מיקום" },
      { en: "Supply contract", uk: "Контракт на постачання", he: "חוזה אספקה" },
      { en: "Delivery", uk: "Доставка", he: "משלוח" },
    ],
  },
  {
    n: 20, slug: "produce-cellulose", category: "production",
    title: { en: "PRODUCE CELLULOSE", uk: "ВИРОБЛЯТИ ЦЕЛЮЛОЗУ", he: "ייצור תאית" },
    steps: [
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Pre-treatment", uk: "Попередня обробка", he: "עיבוד מקדים" },
      { en: "Fractionation", uk: "Фракціонування", he: "הפרדת רכיבים" },
      { en: "Cellulose", uk: "Целюлоза", he: "תאית" },
      { en: "Industrial product", uk: "Промисловий продукт", he: "מוצר תעשייתי" },
      { en: "Buyer", uk: "Покупець", he: "קונה" },
    ],
  },
  {
    n: 21, slug: "produce-lignin", category: "production",
    title: { en: "PRODUCE LIGNIN", uk: "ВИРОБЛЯТИ ЛІГНІН", he: "ייצור ליגנין" },
    steps: [
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Fractionation", uk: "Фракціонування", he: "הפרדת רכיבים" },
      { en: "Lignin", uk: "Лігнін", he: "ליגנין" },
      { en: "Product specification", uk: "Специфікація продукту", he: "מפרט מוצר" },
      { en: "Industrial market", uk: "Промисловий ринок", he: "שוק תעשייתי" },
    ],
  },
  {
    n: 22, slug: "produce-biochar", category: "production",
    title: { en: "PRODUCE BIOCHAR", uk: "ВИРОБЛЯТИ БІОВУГІЛЛЯ (BIOCHAR)", he: "ייצור ביו-פחם (Biochar)" },
    steps: [
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Pyrolysis", uk: "Піроліз", he: "פירוליזה" },
      { en: "Biochar", uk: "Біовугілля", he: "ביו-פחם" },
      { en: "Soil / carbon applications", uk: "Застосування для ґрунту / вуглецевих проєктів", he: "יישומים לקרקע / פרויקטי פחמן" },
      { en: "Market", uk: "Ринок", he: "שוק" },
    ],
  },
  {
    n: 23, slug: "produce-saf-biofuel", category: "production",
    title: { en: "PRODUCE SAF & BIOFUEL", uk: "ВИРОБЛЯТИ SAF ТА БІОПАЛИВО", he: "ייצור SAF ודלק ביולוגי" },
    steps: [
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Conversion technology", uk: "Технологія конверсії", he: "טכנולוגיית המרה" },
      { en: "Fuel", uk: "Паливо", he: "דלק" },
      { en: "Certification", uk: "Сертифікація", he: "תקינה ואישורים" },
      { en: "Offtake", uk: "Офтейк", he: "התחייבות רכש" },
    ],
  },
  {
    n: 24, slug: "produce-pellets-bioenergy", category: "production",
    title: { en: "PRODUCE PELLETS & BIOENERGY", uk: "ВИРОБЛЯТИ ПЕЛЕТИ ТА БІОЕНЕРГІЮ", he: "ייצור פלטות ואנרגיה ביולוגית" },
    steps: [
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
      { en: "Pellets / fuel", uk: "Пелети/паливо", he: "פלטות / דלק" },
      { en: "Energy consumer", uk: "Споживач енергії", he: "צרכן אנרגיה" },
      { en: "Offtake", uk: "Офтейк", he: "התחייבות רכש" },
    ],
  },
  {
    n: 25, slug: "produce-pulp-paper-carton", category: "production",
    title: { en: "PRODUCE PULP, PAPER & CARDBOARD", uk: "ВИРОБЛЯТИ ЦЕЛЮЛОЗНУ МАСУ, ПАПІР І КАРТОН", he: "ייצור עיסת תאית, נייר וקרטון" },
    steps: [
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Pulp", uk: "Целюлозна маса", he: "עיסת תאית" },
      { en: "Paper / Cardboard / Packaging", uk: "Папір / Картон / Пакування", he: "נייר / קרטון / אריזות" },
      { en: "Market", uk: "Ринок", he: "שוק" },
    ],
  },
  {
    n: 26, slug: "produce-building-materials", category: "production",
    title: { en: "PRODUCE BUILDING MATERIALS", uk: "ВИРОБЛЯТИ БУДІВЕЛЬНІ МАТЕРІАЛИ", he: "ייצור חומרי בניין" },
    steps: [
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Fiber", uk: "Волокно", he: "סיבים" },
      { en: "Insulation / Composites / Panels", uk: "Ізоляція / Композити / Панелі", he: "בידוד / קומפוזיטים / פאנלים" },
      { en: "Construction market", uk: "Будівельний ринок", he: "שוק הבנייה" },
    ],
  },
  {
    n: 27, slug: "produce-acoustic-materials", category: "production",
    title: { en: "PRODUCE ACOUSTIC MATERIALS", uk: "ВИРОБЛЯТИ АКУСТИЧНІ МАТЕРІАЛИ", he: "ייצור חומרים אקוסטיים" },
    steps: [
      { en: "Miscanthus fiber", uk: "Волокно міскантусу", he: "סיבי מיסקנטוס" },
      { en: "Acoustic material", uk: "Акустичний матеріал", he: "חומר אקוסטי" },
      { en: "Panel / product", uk: "Панель/продукт", he: "פאנל / מוצר" },
      { en: "B2B market", uk: "B2B-ринок", he: "שוק B2B" },
    ],
  },
  {
    n: 28, slug: "develop-biomaterials", category: "production",
    title: { en: "DEVELOP BIOMATERIALS", uk: "РОЗРОБЛЯТИ БІОМАТЕРІАЛИ", he: "פיתוח חומרים ביולוגיים" },
    steps: [
      { en: "Cellulose / Fiber / Lignin", uk: "Целюлоза/Волокно/Лігнін", he: "תאית / סיבים / ליגנין" },
      { en: "Material development", uk: "Розробка матеріалу", he: "פיתוח חומר" },
      { en: "Product", uk: "Продукт", he: "מוצר" },
      { en: "Manufacturer", uk: "Виробник", he: "יצרן" },
    ],
  },
  {
    n: 29, slug: "industrial-biotechnology", category: "production",
    title: { en: "INDUSTRIAL BIOTECHNOLOGY", uk: "ПРОМИСЛОВА БІОТЕХНОЛОГІЯ", he: "ביוטכנולוגיה תעשייתית" },
    steps: [
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Sugars / Cellulose", uk: "Цукри/Целюлоза", he: "סוכרים / תאית" },
      { en: "Fermentation", uk: "Ферментація", he: "תסיסה" },
      { en: "Biochemicals / Nanocellulose", uk: "Біохімікати / Наноцелюлоза", he: "כימיקלים ביולוגיים / ננו-תאית" },
      { en: "Market", uk: "Ринок", he: "שוק" },
    ],
  },
  {
    n: 30, slug: "build-biorefinery-plant", category: "production",
    title: { en: "BUILD A CELLULOSE / BIOREFINERY PLANT", uk: "ПОБУДУВАТИ ЦЕЛЮЛОЗНИЙ / БІОРЕФАЙНЕРІЙНИЙ ЗАВОД", he: "הקמת מפעל תאית / ביורפיינרי" },
    steps: [
      { en: "Feedstock", uk: "Сировина", he: "חומר גלם" },
      { en: "Technology", uk: "Технологія", he: "טכנולוגיה" },
      { en: "Capacity", uk: "Потужність", he: "קיבולת" },
      { en: "CAPEX/OPEX", uk: "CAPEX/OPEX", he: "CAPEX/OPEX" },
      { en: "Location", uk: "Локація", he: "מיקום" },
      { en: "Production", uk: "Виробництво", he: "ייצור" },
      { en: "Offtake", uk: "Офтейк", he: "התחייבות רכש" },
    ],
  },
  {
    n: 31, slug: "carbon-farming-project", category: "carbon",
    title: { en: "CREATE A CARBON FARMING PROJECT", uk: "СТВОРИТИ ПРОЄКТ CARBON FARMING", he: "הקמת פרויקט Carbon Farming" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Baseline", uk: "Базовий рівень", he: "קו בסיס" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Soil carbon", uk: "Вуглець у ґрунті", he: "פחמן בקרקע" },
      { en: "Monitoring", uk: "Моніторинг", he: "מעקב" },
      { en: "Carbon value", uk: "Вуглецева цінність", he: "ערך פחמן" },
    ],
  },
  {
    n: 32, slug: "generate-carbon-credits", category: "carbon",
    title: { en: "GENERATE CARBON CREDITS", uk: "ГЕНЕРУВАТИ ВУГЛЕЦЕВІ КРЕДИТИ", he: "ייצור קרדיטים פחמניים" },
    steps: [
      { en: "Project", uk: "Проєкт", he: "פרויקט" },
      { en: "Methodology", uk: "Методологія", he: "מתודולוגיה" },
      { en: "Baseline", uk: "Базовий рівень", he: "קו בסיס" },
      { en: "MRV", uk: "MRV", he: "MRV" },
      { en: "Verification", uk: "Верифікація", he: "אימות" },
      { en: "Credits", uk: "Кредити", he: "קרדיטים" },
      { en: "Buyers", uk: "Покупці", he: "קונים" },
    ],
  },
  {
    n: 33, slug: "get-mrv-services", category: "carbon",
    title: { en: "GET MRV SERVICES", uk: "ОТРИМАТИ ПОСЛУГИ MRV", he: "קבלת שירותי MRV" },
    steps: [
      { en: "Baseline", uk: "Базовий рівень", he: "קו בסיס" },
      { en: "GIS / Remote sensing", uk: "GIS/Дистанційне зондування", he: "GIS / חישה מרחוק" },
      { en: "Soil", uk: "Ґрунт", he: "קרקע" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Carbon data", uk: "Вуглецеві дані", he: "נתוני פחמן" },
      { en: "Verification", uk: "Верифікація", he: "אימות" },
    ],
  },
  {
    n: 34, slug: "get-esg-reporting", category: "carbon",
    title: { en: "GET ESG REPORTING", uk: "ОТРИМАТИ ESG-ЗВІТНІСТЬ", he: "קבלת דוחות ESG" },
    steps: [
      { en: "Environmental data", uk: "Екологічні дані", he: "נתונים סביבתיים" },
      { en: "Social impact", uk: "Соціальний вплив", he: "השפעה חברתית" },
      { en: "Governance", uk: "Корпоративне управління", he: "ממשל תאגידי" },
      { en: "KPI", uk: "KPI", he: "KPI" },
      { en: "ESG report", uk: "ESG-звіт", he: "דוח ESG" },
    ],
  },
  {
    n: 35, slug: "corporate-net-zero-project", category: "carbon",
    title: { en: "CREATE A CORPORATE NET ZERO PROJECT", uk: "СТВОРИТИ КОРПОРАТИВНИЙ NET ZERO ПРОЄКТ", he: "הקמת פרויקט Net Zero תאגידי" },
    steps: [
      { en: "Corporate carbon footprint", uk: "Вуглецевий слід компанії", he: "טביעת רגל פחמנית של החברה" },
      { en: "Miscanthus project", uk: "Проєкт із міскантусом", he: "פרויקט מיסקנטוס" },
      { en: "CO₂ reduction / removal", uk: "Скорочення/видалення CO₂", he: "הפחתה / סילוק CO₂" },
      { en: "MRV", uk: "MRV", he: "MRV" },
      { en: "ESG", uk: "ESG", he: "ESG" },
    ],
  },
  {
    n: 36, slug: "decarbonize-your-business", category: "carbon",
    title: { en: "DECARBONIZE YOUR BUSINESS", uk: "ДЕКАРБОНІЗУВАТИ ВАШ БІЗНЕС", he: "דה-קרבון של העסק שלכם" },
    steps: [
      { en: "Emissions", uk: "Викиди", he: "פליטות" },
      { en: "Land / biomass solution", uk: "Земельне/біомасове рішення", he: "פתרון קרקע / ביומסה" },
      { en: "Industrial feedstock substitution", uk: "Заміщення промислової сировини", he: "החלפת חומרי גלם תעשייתיים" },
      { en: "Carbon", uk: "Вуглець", he: "פחמן" },
      { en: "Net Zero Roadmap", uk: "Net Zero Roadmap", he: "מפת דרכים ל-Net Zero" },
    ],
  },
  {
    n: 37, slug: "become-vem-farmer-partner", category: "partners",
    title: { en: "BECOME A VEM FARMER PARTNER", uk: "СТАТИ ФЕРМЕРОМ-ПАРТНЕРОМ VEM", he: "הפיכה לחקלאי שותף של VEM" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Rhizomes", uk: "Ризоми", he: "שורשים" },
      { en: "Methodology", uk: "Методологія", he: "מתודולוגיה" },
      { en: "Agronomic support", uk: "Агрономічний супровід", he: "ליווי אגרונומי" },
      { en: "Yield", uk: "Урожай", he: "תנובה" },
      { en: "Offtake", uk: "Викуп", he: "רכישה" },
      { en: "Income", uk: "Дохід", he: "הכנסה" },
    ],
  },
  {
    n: 38, slug: "get-vem-franchise", category: "partners",
    title: { en: "GET A VEM FRANCHISE", uk: "ОТРИМАТИ ФРАНШИЗУ VEM", he: "קבלת זכיינות VEM" },
    steps: [
      { en: "Territory", uk: "Територія", he: "טריטוריה" },
      { en: "Brand", uk: "Бренд", he: "מותג" },
      { en: "Variety", uk: "Сорт", he: "זן" },
      { en: "Methodology", uk: "Методологія", he: "מתודולוגיה" },
      { en: "Training", uk: "Навчання", he: "הדרכה" },
      { en: "Sales", uk: "Продажі", he: "מכירות" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Income", uk: "Дохід", he: "הכנסה" },
    ],
  },
  {
    n: 39, slug: "become-regional-partner", category: "partners",
    title: { en: "BECOME A REGIONAL VEM PARTNER", uk: "СТАТИ РЕГІОНАЛЬНИМ ПАРТНЕРОМ VEM", he: "הפיכה לשותף אזורי של VEM" },
    steps: [
      { en: "Region", uk: "Регіон", he: "אזור" },
      { en: "Nursery", uk: "Розсадник", he: "משתלה" },
      { en: "Rhizome sales", uk: "Продаж ризом", he: "מכירת שורשים" },
      { en: "Farmers", uk: "Фермери", he: "חקלאים" },
      { en: "Biomass network", uk: "Мережа біомаси", he: "רשת ביומסה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
    ],
  },
  {
    n: 40, slug: "become-international-partner", category: "partners",
    title: { en: "BECOME AN INTERNATIONAL VEM PARTNER", uk: "СТАТИ МІЖНАРОДНИМ ПАРТНЕРОМ VEM", he: "הפיכה לשותף בינלאומי של VEM" },
    steps: [
      { en: "Country", uk: "Країна", he: "מדינה" },
      { en: "Market entry", uk: "Вихід на ринок", he: "כניסה לשוק" },
      { en: "Licensing", uk: "Ліцензування", he: "רישוי" },
      { en: "Regional network", uk: "Регіональна мережа", he: "רשת אזורית" },
      { en: "Industrial development", uk: "Промисловий розвиток", he: "פיתוח תעשייתי" },
    ],
  },
  {
    n: 41, slug: "become-industrial-partner", category: "partners",
    title: { en: "BECOME AN INDUSTRIAL VEM PARTNER", uk: "СТАТИ ПРОМИСЛОВИМ ПАРТНЕРОМ VEM", he: "הפיכה לשותף תעשייתי של VEM" },
    steps: [
      { en: "Feedstock", uk: "Сировина", he: "חומר גלם" },
      { en: "Technology / Product", uk: "Технологія/Продукт", he: "טכנולוגיה / מוצר" },
      { en: "Pilot", uk: "Пілот", he: "פיילוט" },
      { en: "Production", uk: "Виробництво", he: "ייצור" },
      { en: "Long-term partnership", uk: "Довгострокове партнерство", he: "שותפות ארוכת טווח" },
    ],
  },
  {
    n: 42, slug: "join-grant-consortium", category: "grants",
    title: { en: "JOIN THE VEM GRANT CONSORTIUM", uk: "ПРИЄДНАТИСЯ ДО ГРАНТОВОГО КОНСОРЦІУМУ VEM", he: "הצטרפות לקונסורציום המענקים של VEM" },
    steps: [
      { en: "Call", uk: "Конкурс", he: "קול קורא" },
      { en: "Partner role", uk: "Роль партнера", he: "תפקיד שותף" },
      { en: "Consortium", uk: "Консорціум", he: "קונסורציום" },
      { en: "Pilot site", uk: "Пілотна ділянка", he: "אתר פיילוט" },
      { en: "Application", uk: "Заявка", he: "הגשה" },
      { en: "Funding", uk: "Фінансування", he: "מימון" },
    ],
  },
  {
    n: 43, slug: "join-vem-horizon-europe", category: "grants",
    title: { en: "JOIN VEM HORIZON EUROPE", uk: "ПРИЄДНАТИСЯ ДО VEM HORIZON EUROPE", he: "הצטרפות ל-VEM Horizon Europe" },
    steps: [
      { en: "Horizon call", uk: "Конкурс Horizon", he: "קול קורא Horizon" },
      { en: "VEM concept", uk: "Концепція VEM", he: "קונספט VEM" },
      { en: "Consortium", uk: "Консорціум", he: "קונסורציום" },
      { en: "Work package", uk: "Робочий пакет", he: "חבילת עבודה" },
      { en: "Application", uk: "Заявка", he: "הגשה" },
      { en: "Project", uk: "Проєкт", he: "פרויקט" },
    ],
  },
  {
    n: 44, slug: "launch-rd-pilot", category: "grants",
    title: { en: "LAUNCH AN R&D / PILOT PROJECT", uk: "ЗАПУСТИТИ R&D / ПІЛОТНИЙ ПРОЄКТ", he: "הקמת פרויקט R&D / פיילוט" },
    steps: [
      { en: "Challenge", uk: "Виклик", he: "אתגר" },
      { en: "Hypothesis", uk: "Гіпотеза", he: "השערה" },
      { en: "VEM pilot", uk: "Пілот VEM", he: "פיילוט VEM" },
      { en: "Data", uk: "Дані", he: "נתונים" },
      { en: "Validation", uk: "Валідація", he: "ולידציה" },
      { en: "Commercialization", uk: "Комерціалізація", he: "הפצה מסחרית" },
    ],
  },
  {
    n: 45, slug: "become-research-partner", category: "grants",
    title: { en: "BECOME A VEM RESEARCH PARTNER", uk: "СТАТИ НАУКОВО-ДОСЛІДНИМ ПАРТНЕРОМ VEM", he: "הפיכה לשותף מחקר של VEM" },
    steps: [
      { en: "Agronomy / Genetics / Soil / Water / Cellulose", uk: "Агрономія / Генетика / Ґрунт / Вода / Целюлоза", he: "אגרונומיה / גנטיקה / קרקע / מים / תאית" },
      { en: "Research", uk: "Дослідження", he: "מחקר" },
      { en: "Pilot", uk: "Пілот", he: "פיילוט" },
      { en: "IP", uk: "IP", he: "קניין רוחני (IP)" },
      { en: "Scaling", uk: "Масштабування", he: "הרחבה" },
    ],
  },
  {
    n: 46, slug: "invest-in-vem", category: "investment",
    title: { en: "INVEST IN VEM", uk: "ІНВЕСТУВАТИ У VEM", he: "השקעה ב-VEM" },
    steps: [
      { en: "Opportunity", uk: "Можливість", he: "הזדמנות" },
      { en: "Business model", uk: "Бізнес-модель", he: "מודל עסקי" },
      { en: "Financials", uk: "Фінансові показники", he: "מדדים פיננסיים" },
      { en: "Due Diligence", uk: "Due Diligence", he: "בדיקת נאותות" },
      { en: "Investment", uk: "Інвестиція", he: "השקעה" },
      { en: "Scaling", uk: "Масштабування", he: "הרחבה" },
    ],
  },
  {
    n: 47, slug: "invest-in-vem-plantation", category: "investment",
    title: { en: "INVEST IN A VEM PLANTATION", uk: "ІНВЕСТУВАТИ У ПЛАНТАЦІЮ VEM", he: "השקעה במטע VEM" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "CAPEX", uk: "CAPEX", he: "CAPEX" },
      { en: "Rhizomes", uk: "Ризоми", he: "שורשים" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
      { en: "Project return", uk: "Дохідність проєкту", he: "תשואת הפרויקט" },
    ],
  },
  {
    n: 48, slug: "invest-in-vem-processing", category: "investment",
    title: { en: "INVEST IN VEM PROCESSING", uk: "ІНВЕСТУВАТИ У ПЕРЕРОБКУ VEM", he: "השקעה בעיבוד VEM" },
    steps: [
      { en: "Feedstock", uk: "Сировина", he: "חומר גלם" },
      { en: "Technology", uk: "Технологія", he: "טכנולוגיה" },
      { en: "Processing complex", uk: "Переробний комплекс", he: "מכלול עיבוד" },
      { en: "Products", uk: "Продукти", he: "מוצרים" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
      { en: "Return", uk: "Дохідність", he: "תשואה" },
    ],
  },
  {
    n: 49, slug: "invest-in-fiber-cellulose-plant", category: "investment",
    title: { en: "INVEST IN A FIBER / CELLULOSE PLANT", uk: "ІНВЕСТУВАТИ У ЗАВОД З ВИРОБНИЦТВА ВОЛОКНА / ЦЕЛЮЛОЗИ", he: "השקעה במפעל סיבים / תאית" },
    steps: [
      { en: "Biomass supply", uk: "Постачання біомаси", he: "אספקת ביומסה" },
      { en: "Plant", uk: "Завод", he: "מפעל" },
      { en: "Cellulose / Fiber", uk: "Целюлоза/Волокно", he: "תאית / סיבים" },
      { en: "Industrial buyers", uk: "Промислові покупці", he: "קונים תעשייתיים" },
      { en: "Return", uk: "Дохідність", he: "תשואה" },
    ],
  },
  {
    n: 50, slug: "join-industrial-cluster", category: "partners",
    title: { en: "JOIN THE VEM INDUSTRIAL CLUSTER", uk: "ПРИЄДНАТИСЯ ДО ПРОМИСЛОВОГО КЛАСТЕРА VEM", he: "הצטרפות לקלאסטר התעשייתי של VEM" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Farmers", uk: "Фермери", he: "חקלאים" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Logistics", uk: "Логістика", he: "לוגיסטיקה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
      { en: "Cellulose", uk: "Целюлоза", he: "תאית" },
      { en: "Materials", uk: "Матеріали", he: "חומרים" },
      { en: "Energy", uk: "Енергія", he: "אנרגיה" },
      { en: "Buyers", uk: "Покупці", he: "קונים" },
    ],
  },
  {
    n: 51, slug: "create-energy-autonomy", category: "programs",
    title: { en: "CREATE ENERGY AUTONOMY", uk: "СТВОРИТИ ЕНЕРГЕТИЧНУ АВТОНОМІЮ", he: "יצירת אוטונומיה אנרגטית" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Energy / Biofuel", uk: "Енергія/Біопаливо", he: "אנרגיה / דלק ביולוגי" },
      { en: "Local supply", uk: "Локальне постачання", he: "אספקה מקומית" },
      { en: "Energy independence", uk: "Енергетична незалежність", he: "עצמאות אנרגטית" },
    ],
  },
  {
    n: 52, slug: "join-vem-ukraine-recovery", category: "programs",
    title: { en: "JOIN VEM UKRAINE RECOVERY", uk: "ПРИЄДНАТИСЯ ДО VEM UKRAINE RECOVERY", he: "הצטרפות ל-VEM Ukraine Recovery" },
    steps: [
      { en: "Degraded land", uk: "Деградовані землі", he: "קרקעות מודרדרות" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Restoration", uk: "Відновлення", he: "שיקום" },
      { en: "Farmers / Jobs", uk: "Фермери/Робочі місця", he: "חקלאים / מקומות עבודה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
      { en: "Regional industry", uk: "Регіональна промисловість", he: "תעשייה אזורית" },
    ],
  },
  {
    n: 53, slug: "join-vem-israel-bioeconomy", category: "programs",
    title: { en: "JOIN VEM ISRAEL REGENERATIVE BIOECONOMY", uk: "ПРИЄДНАТИСЯ ДО VEM ISRAEL REGENERATIVE BIOECONOMY", he: "הצטרפות ל-VEM Israel Regenerative Bioeconomy" },
    steps: [
      { en: "Low-productivity land", uk: "Малопродуктивні землі", he: "קרקעות בעלות פוריות נמוכה" },
      { en: "Treated wastewater", uk: "Очищені стічні води", he: "מי שופכין מטוהרים" },
      { en: "Miscanthus", uk: "Міскантус", he: "מיסקנטוס" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Industry", uk: "Промисловість", he: "תעשייה" },
      { en: "Carbon", uk: "Вуглець", he: "פחמן" },
      { en: "Regional value", uk: "Регіональна цінність", he: "ערך אזורי" },
    ],
  },
  {
    n: 54, slug: "build-vem-in-your-region", category: "programs",
    title: { en: "BUILD VEM IN YOUR REGION", uk: "ПОБУДУВАТИ VEM У ВАШОМУ РЕГІОНІ", he: "הקמת VEM באזור שלכם" },
    steps: [
      { en: "Region", uk: "Регіон", he: "אזור" },
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Variety", uk: "Сорт", he: "זן" },
      { en: "Nursery", uk: "Розсадник", he: "משתלה" },
      { en: "Farmers", uk: "Фермери", he: "חקלאים" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
      { en: "Local VEM ecosystem", uk: "Локальна екосистема VEM", he: "מערכת אקולוגית מקומית של VEM" },
    ],
  },
  {
    n: 55, slug: "join-vem-global-net-zero-2050", category: "programs",
    title: { en: "JOIN VEM GLOBAL NET ZERO 2050", uk: "ПРИЄДНАТИСЯ ДО VEM GLOBAL NET ZERO 2050", he: "הצטרפות ל-VEM Global Net Zero 2050" },
    steps: [
      { en: "Land restoration", uk: "Відновлення земель", he: "שיקום קרקעות" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Industrial decarbonization", uk: "Промислова декарбонізація", he: "דה-קרבון תעשייתי" },
      { en: "Carbon", uk: "Вуглець", he: "פחמן" },
      { en: "ESG", uk: "ESG", he: "ESG" },
      { en: "Global scaling", uk: "Глобальне масштабування", he: "הרחבה גלובלית" },
    ],
  },
  {
    n: 56, slug: "join-vem-esg-academy", category: "programs",
    title: { en: "JOIN VEM ESG ACADEMY", uk: "ПРИЄДНАТИСЯ ДО VEM ESG ACADEMY", he: "הצטרפות ל-VEM ESG Academy" },
    steps: [
      { en: "ESG", uk: "ESG", he: "ESG" },
      { en: "Carbon", uk: "Вуглець", he: "פחמן" },
      { en: "Soil", uk: "Ґрунт", he: "קרקע" },
      { en: "MRV", uk: "MRV", he: "MRV" },
      { en: "Reporting", uk: "Звітність", he: "דיווח" },
      { en: "Certification / Implementation", uk: "Сертифікація / Впровадження", he: "הסמכה / יישום" },
    ],
  },
  {
    n: 57, slug: "join-vem-marketplace", category: "programs",
    title: { en: "JOIN VEM MARKETPLACE", uk: "ПРИЄДНАТИСЯ ДО VEM MARKETPLACE", he: "הצטרפות ל-VEM Marketplace" },
    steps: [
      { en: "Rhizomes", uk: "Ризоми", he: "שורשים" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Cellulose", uk: "Целюлоза", he: "תאית" },
      { en: "Lignin", uk: "Лігнін", he: "ליגנין" },
      { en: "Biochar", uk: "Біовугілля", he: "ביו-פחם" },
      { en: "Materials", uk: "Матеріали", he: "חומרים" },
      { en: "Buyers & sellers", uk: "Покупці та продавці", he: "קונים ומוכרים" },
    ],
  },
  {
    n: 58, slug: "buy-vem-biomass", category: "orders",
    title: { en: "BUY VEM BIOMASS", uk: "КУПИТИ БІОМАСУ VEM", he: "רכישת ביומסה של VEM" },
    steps: [
      { en: "Specification", uk: "Специфікація", he: "מפרט" },
      { en: "Quantity", uk: "Кількість", he: "כמות" },
      { en: "Location", uk: "Локація", he: "מיקום" },
      { en: "Price", uk: "Ціна", he: "מחיר" },
      { en: "Logistics", uk: "Логістика", he: "לוגיסטיקה" },
      { en: "Supply contract", uk: "Контракт на постачання", he: "חוזה אספקה" },
    ],
  },
  {
    n: 59, slug: "buy-vem-cellulose", category: "orders",
    title: { en: "BUY VEM CELLULOSE", uk: "КУПИТИ ЦЕЛЮЛОЗУ VEM", he: "רכישת תאית של VEM" },
    steps: [
      { en: "Specification", uk: "Специфікація", he: "מפרט" },
      { en: "Grade", uk: "Клас/марка", he: "דרגה / סוג" },
      { en: "Quantity", uk: "Кількість", he: "כמות" },
      { en: "Sample", uk: "Зразок", he: "דוגמית" },
      { en: "Commercial proposal", uk: "Комерційна пропозиція", he: "הצעה מסחרית" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
    ],
  },
  {
    n: 60, slug: "become-vem-product-buyer", category: "orders",
    title: { en: "BECOME A VEM PRODUCT BUYER", uk: "СТАТИ ПОКУПЦЕМ ПРОДУКЦІЇ VEM", he: "הפיכה לקונה של מוצרי VEM" },
    steps: [
      { en: "Product", uk: "Продукт", he: "מוצר" },
      { en: "Specification", uk: "Специфікація", he: "מפרט" },
      { en: "Volume", uk: "Обсяг", he: "נפח" },
      { en: "Supply", uk: "Постачання", he: "אספקה" },
      { en: "Long-term contract", uk: "Довгостроковий контракт", he: "חוזה ארוך טווח" },
    ],
  },
  {
    n: 61, slug: "create-contract-growing", category: "biomass",
    title: { en: "CREATE A CONTRACT GROWING PROGRAM", uk: "СТВОРИТИ ПРОГРАМУ КОНТРАКТНОГО ВИРОЩУВАННЯ", he: "יצירת תוכנית גידול בחוזה" },
    steps: [
      { en: "Required biomass volume", uk: "Необхідний обсяг біомаси", he: "נפח ביומסה נדרש" },
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Farmers", uk: "Фермери", he: "חקלאים" },
      { en: "VEM methodology", uk: "Методологія VEM", he: "מתודולוגיית VEM" },
      { en: "Production", uk: "Виробництво", he: "ייצור" },
      { en: "Guaranteed supply", uk: "Гарантоване постачання", he: "אספקה מובטחת" },
    ],
  },
  {
    n: 62, slug: "create-regional-nursery", category: "partners",
    title: { en: "CREATE A REGIONAL NURSERY", uk: "СТВОРИТИ РЕГІОНАЛЬНИЙ РОЗСАДНИК", he: "הקמת משתלה אזורית" },
    steps: [
      { en: "Mother stock", uk: "Маточний матеріал", he: "מלאי אם" },
      { en: "Propagation", uk: "Розмноження", he: "ריבוי" },
      { en: "Certified rhizomes", uk: "Сертифіковані ризоми", he: "שורשים מוסמכים" },
      { en: "Farmers", uk: "Фермери", he: "חקלאים" },
      { en: "Regional sales", uk: "Регіональні продажі", he: "מכירות אזוריות" },
    ],
  },
  {
    n: 63, slug: "get-vem-project-tea", category: "consulting",
    title: { en: "GET A VEM PROJECT FEASIBILITY ASSESSMENT", uk: "ОТРИМАТИ ТЕХНІКО-ЕКОНОМІЧНУ ОЦІНКУ ПРОЄКТУ VEM", he: "קבלת הערכה טכנית-כלכלית לפרויקט VEM" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Water", uk: "Вода", he: "מים" },
      { en: "Agronomy", uk: "Агрономія", he: "אגרונומיה" },
      { en: "Biomass", uk: "Біомаса", he: "ביומסה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
      { en: "CAPEX/OPEX", uk: "CAPEX/OPEX", he: "CAPEX/OPEX" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
      { en: "Investment decision", uk: "Інвестиційне рішення", he: "החלטת השקעה" },
    ],
  },
  {
    n: 64, slug: "get-commercialization-strategy", category: "consulting",
    title: { en: "GET A VEM COMMERCIALIZATION STRATEGY", uk: "ОТРИМАТИ СТРАТЕГІЮ КОМЕРЦІАЛІЗАЦІЇ VEM", he: "קבלת אסטרטגיית הפצה מסחרית של VEM" },
    steps: [
      { en: "Product", uk: "Продукт", he: "מוצר" },
      { en: "Market", uk: "Ринок", he: "שוק" },
      { en: "Buyer", uk: "Покупець", he: "קונה" },
      { en: "Pricing", uk: "Ціноутворення", he: "תמחור" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
      { en: "Scaling", uk: "Масштабування", he: "הרחבה" },
    ],
  },
  {
    n: 65, slug: "book-vem-consultation", category: "consulting",
    title: { en: "BOOK A VEM CONSULTATION", uk: "ЗАБРОНЮВАТИ КОНСУЛЬТАЦІЮ VEM", he: "קביעת ייעוץ VEM" },
    steps: [
      { en: "Choose direction", uk: "Обрати напрям", he: "בחירת כיוון" },
      { en: "Project assessment", uk: "Оцінка проєкту", he: "הערכת פרויקט" },
      { en: "VEM decision", uk: "Рішення VEM", he: "החלטת VEM" },
      { en: "Commercial proposal", uk: "Комерційна пропозиція", he: "הצעה מסחרית" },
      { en: "Start", uk: "Старт", he: "יציאה לדרך" },
    ],
  },
  {
    n: 66, slug: "prepare-your-project", category: "consulting",
    title: { en: "PREPARE YOUR PROJECT", uk: "ПІДГОТУВАТИ ВАШ ПРОЄКТ", he: "הכנת הפרויקט שלכם" },
    steps: [
      { en: "Idea", uk: "Ідея", he: "רעיון" },
      { en: "Concept", uk: "Концепція", he: "קונספט" },
      { en: "Goals", uk: "Цілі", he: "יעדים" },
      { en: "Location", uk: "Локація", he: "מיקום" },
      { en: "Technology", uk: "Технологія", he: "טכנולוגיה" },
      { en: "Partners", uk: "Партнери", he: "שותפים" },
      { en: "Budget", uk: "Бюджет", he: "תקציב" },
      { en: "Timeline", uk: "Терміни", he: "לוחות זמנים" },
      { en: "KPI", uk: "KPI", he: "KPI" },
      { en: "Implementation plan", uk: "План реалізації", he: "תוכנית יישום" },
    ],
  },
  {
    n: 67, slug: "get-business-plan", category: "consulting",
    title: { en: "GET A BUSINESS PLAN", uk: "ОТРИМАТИ БІЗНЕС-ПЛАН", he: "קבלת תוכנית עסקית" },
    steps: [
      { en: "Business model", uk: "Бізнес-модель", he: "מודל עסקי" },
      { en: "Market", uk: "Ринок", he: "שוק" },
      { en: "Product", uk: "Продукт", he: "מוצר" },
      { en: "CAPEX/OPEX", uk: "CAPEX/OPEX", he: "CAPEX/OPEX" },
      { en: "Revenue", uk: "Дохід", he: "הכנסה" },
      { en: "Unit Economics", uk: "Unit Economics", he: "כלכלת יחידה" },
      { en: "Cash flow", uk: "Грошовий потік", he: "תזרים מזומנים" },
      { en: "ROI", uk: "ROI", he: "ROI" },
      { en: "Risks", uk: "Ризики", he: "סיכונים" },
      { en: "Scaling", uk: "Масштабування", he: "הרחבה" },
      { en: "Investment case", uk: "Інвестиційний кейс", he: "תיק השקעה" },
    ],
  },
  {
    n: 68, slug: "prepare-grant-application", category: "grants",
    title: { en: "PREPARE A GRANT APPLICATION", uk: "ПІДГОТУВАТИ ГРАНТОВУ ЗАЯВКУ", he: "הכנת בקשה למענק" },
    steps: [
      { en: "Funding search", uk: "Пошук фінансування", he: "חיפוש מימון" },
      { en: "Call selection", uk: "Вибір конкурсу", he: "בחירת קול קורא" },
      { en: "Eligibility check", uk: "Перевірка відповідності", he: "בדיקת זכאות" },
      { en: "Concept Note", uk: "Concept Note", he: "Concept Note" },
      { en: "Consortium", uk: "Консорціум", he: "קונסורציום" },
      { en: "Work packages", uk: "Робочі пакети", he: "חבילות עבודה" },
      { en: "Budget", uk: "Бюджет", he: "תקציב" },
      { en: "Impact", uk: "Вплив", he: "השפעה" },
      { en: "KPI", uk: "KPI", he: "KPI" },
      { en: "Full application", uk: "Повна заявка", he: "בקשה מלאה" },
      { en: "Submission", uk: "Подання", he: "הגשה" },
    ],
  },
  {
    n: 69, slug: "prepare-investment-project", category: "consulting",
    title: { en: "PREPARE AN INVESTMENT PROJECT", uk: "ПІДГОТУВАТИ ІНВЕСТИЦІЙНИЙ ПРОЄКТ", he: "הכנת פרויקט להשקעה" },
    steps: [
      { en: "Project", uk: "Проєкт", he: "פרויקט" },
      { en: "Feasibility Study", uk: "Feasibility Study", he: "בדיקת כדאיות" },
      { en: "Business plan", uk: "Бізнес-план", he: "תוכנית עסקית" },
      { en: "Financial model", uk: "Фінансова модель", he: "מודל פיננסי" },
      { en: "Investment structure", uk: "Інвестиційна структура", he: "מבנה השקעה" },
      { en: "Investor materials", uk: "Матеріали для інвесторів", he: "חומרים למשקיעים" },
      { en: "Due Diligence package", uk: "Пакет Due Diligence", he: "חבילת בדיקת נאותות" },
    ],
  },
  {
    n: 70, slug: "get-financial-model", category: "consulting",
    title: { en: "GET A FINANCIAL MODEL", uk: "ОТРИМАТИ ФІНАНСОВУ МОДЕЛЬ", he: "קבלת מודל פיננסי" },
    steps: [
      { en: "CAPEX", uk: "CAPEX", he: "CAPEX" },
      { en: "OPEX", uk: "OPEX", he: "OPEX" },
      { en: "Yield", uk: "Урожайність", he: "תנובה" },
      { en: "Processing", uk: "Переробка", he: "עיבוד" },
      { en: "Revenue", uk: "Дохід", he: "הכנסה" },
      { en: "Cash flow", uk: "Грошовий потік", he: "תזרים מזומנים" },
      { en: "EBITDA", uk: "EBITDA", he: "EBITDA" },
      { en: "Break-even point", uk: "Точка беззбитковості", he: "נקודת איזון" },
      { en: "IRR", uk: "IRR", he: "IRR" },
      { en: "ROI", uk: "ROI", he: "ROI" },
      { en: "Scenarios", uk: "Сценарії", he: "תרחישים" },
    ],
  },
  {
    n: 71, slug: "get-feasibility-study", category: "consulting",
    title: { en: "GET A FEASIBILITY STUDY", uk: "ОТРИМАТИ FEASIBILITY STUDY / ТЕХНІКО-ЕКОНОМІЧНЕ ОБҐРУНТУВАННЯ", he: "קבלת בדיקת כדאיות (Feasibility Study)" },
    steps: [
      { en: "Land", uk: "Земля", he: "קרקע" },
      { en: "Water", uk: "Вода", he: "מים" },
      { en: "Feedstock", uk: "Сировина", he: "חומר גלם" },
      { en: "Technology", uk: "Технологія", he: "טכנולוגיה" },
      { en: "Infrastructure", uk: "Інфраструктура", he: "תשתית" },
      { en: "Market", uk: "Ринок", he: "שוק" },
      { en: "Economics", uk: "Економіка", he: "כלכלה" },
      { en: "Risks", uk: "Ризики", he: "סיכונים" },
      { en: "Go / No-Go", uk: "Go / No-Go", he: "Go / No-Go" },
    ],
  },
  {
    n: 72, slug: "get-grant-funding-strategy", category: "grants",
    title: { en: "GET A GRANT FUNDING STRATEGY", uk: "ОТРИМАТИ СТРАТЕГІЮ ГРАНТОВОГО ФІНАНСУВАННЯ", he: "קבלת אסטרטגיית מימון מענקים" },
    steps: [
      { en: "Company / Project", uk: "Компанія/Проєкт", he: "חברה / פרויקט" },
      { en: "Country", uk: "Країна", he: "מדינה" },
      { en: "TRL", uk: "TRL", he: "TRL" },
      { en: "Funding programs", uk: "Програми фінансування", he: "תוכניות מימון" },
      { en: "Calls", uk: "Конкурси", he: "קולות קוראים" },
      { en: "Eligibility", uk: "Відповідність", he: "התאמה" },
      { en: "Funding roadmap", uk: "Дорожня карта фінансування", he: "מפת דרכים למימון" },
    ],
  },
  {
    n: 73, slug: "prepare-horizon-europe-application", category: "grants",
    title: { en: "PREPARE A HORIZON EUROPE APPLICATION", uk: "ПІДГОТУВАТИ ЗАЯВКУ HORIZON EUROPE", he: "הכנת בקשה ל-Horizon Europe" },
    steps: [
      { en: "Call", uk: "Конкурс", he: "קול קורא" },
      { en: "Excellence", uk: "Excellence", he: "Excellence" },
      { en: "Impact", uk: "Impact", he: "Impact" },
      { en: "Implementation", uk: "Implementation", he: "Implementation" },
      { en: "Consortium", uk: "Консорціум", he: "קונסורציום" },
      { en: "Work packages", uk: "Робочі пакети", he: "חבילות עבודה" },
      { en: "Budget", uk: "Бюджет", he: "תקציב" },
      { en: "KPI", uk: "KPI", he: "KPI" },
      { en: "Submission", uk: "Подання", he: "הגשה" },
    ],
  },
  {
    n: 74, slug: "prepare-cbe-ju-application", category: "grants",
    title: { en: "PREPARE A CBE JU APPLICATION", uk: "ПІДГОТУВАТИ ЗАЯВКУ CBE JU", he: "הכנת בקשה ל-CBE JU" },
    steps: [
      { en: "Call", uk: "Конкурс", he: "קול קורא" },
      { en: "Bio-based value chain", uk: "Біоорієнтований ланцюг створення вартості", he: "שרשרת ערך מבוססת ביו" },
      { en: "Feedstock", uk: "Сировина", he: "חומר גלם" },
      { en: "Technology", uk: "Технологія", he: "טכנולוגיה" },
      { en: "Consortium", uk: "Консорціум", he: "קונסורציום" },
      { en: "TRL", uk: "TRL", he: "TRL" },
      { en: "Impact", uk: "Вплив", he: "השפעה" },
      { en: "Business case", uk: "Бізнес-кейс", he: "תיק עסקי" },
      { en: "Submission", uk: "Подання", he: "הגשה" },
    ],
  },
  {
    n: 75, slug: "build-grant-consortium", category: "grants",
    title: { en: "BUILD A GRANT CONSORTIUM", uk: "СФОРМУВАТИ ГРАНТОВИЙ КОНСОРЦІУМ", he: "הקמת קונסורציום מענקים" },
    steps: [
      { en: "Call", uk: "Конкурс", he: "קול קורא" },
      { en: "Required competencies", uk: "Необхідні компетенції", he: "כשירויות נדרשות" },
      { en: "Universities", uk: "Університети", he: "אוניברסיטאות" },
      { en: "Industry", uk: "Промисловість", he: "תעשייה" },
      { en: "Pilot sites", uk: "Пілотні майданчики", he: "אתרי פיילוט" },
      { en: "Offtakers", uk: "Офтейкери", he: "רוכשים" },
      { en: "Roles", uk: "Ролі", he: "תפקידים" },
      { en: "Consortium", uk: "Консорціум", he: "קונסורציום" },
    ],
  },
  {
    n: 76, slug: "get-concept-note", category: "consulting",
    title: { en: "GET A CONCEPT NOTE", uk: "ОТРИМАТИ CONCEPT NOTE", he: "קבלת Concept Note" },
    steps: [
      { en: "Problem", uk: "Проблема", he: "בעיה" },
      { en: "VEM solution", uk: "Рішення VEM", he: "פתרון VEM" },
      { en: "Innovation", uk: "Інновація", he: "חדשנות" },
      { en: "Location", uk: "Локація", he: "מיקום" },
      { en: "Partners", uk: "Партнери", he: "שותפים" },
      { en: "Impact", uk: "Вплив", he: "השפעה" },
      { en: "Budget", uk: "Бюджет", he: "תקציב" },
      { en: "Next step", uk: "Наступний крок", he: "הצעד הבא" },
    ],
  },
  {
    n: 77, slug: "get-investor-package", category: "consulting",
    title: { en: "GET AN INVESTOR PACKAGE", uk: "ОТРИМАТИ ПАКЕТ ДЛЯ ІНВЕСТОРА", he: "קבלת חבילה למשקיעים" },
    steps: [
      { en: "Business plan", uk: "Бізнес-план", he: "תוכנית עסקית" },
      { en: "Financial model", uk: "Фінансова модель", he: "מודל פיננסי" },
      { en: "Pitch Deck", uk: "Pitch Deck", he: "Pitch Deck" },
      { en: "Investment memorandum", uk: "Інвестиційний меморандум", he: "מזכר השקעה" },
      { en: "Data Room", uk: "Data Room", he: "Data Room" },
      { en: "Investor outreach", uk: "Залучення інвесторів", he: "גיוס משקיעים" },
    ],
  },
  {
    n: 78, slug: "get-commercialization-plan", category: "consulting",
    title: { en: "GET A PROJECT COMMERCIALIZATION PLAN", uk: "ОТРИМАТИ ПЛАН КОМЕРЦІАЛІЗАЦІЇ ПРОЄКТУ", he: "קבלת תוכנית הפצה מסחרית לפרויקט" },
    steps: [
      { en: "Technology", uk: "Технологія", he: "טכנולוגיה" },
      { en: "Product", uk: "Продукт", he: "מוצר" },
      { en: "TRL", uk: "TRL", he: "TRL" },
      { en: "Market", uk: "Ринок", he: "שוק" },
      { en: "Pricing", uk: "Ціноутворення", he: "תמחור" },
      { en: "Customers", uk: "Клієнти", he: "לקוחות" },
      { en: "Offtake", uk: "Офтейк", he: "רכש" },
      { en: "Scaling", uk: "Масштабування", he: "הרחבה" },
    ],
  },
  {
    n: 79, slug: "get-financial-support", category: "consulting",
    title: { en: "GET FINANCIAL SUPPORT FROM VEM", uk: "ОТРИМАТИ ФІНАНСОВУ ПІДТРИМКУ З VEM", he: "קבלת תמיכה פיננסית מ-VEM" },
    steps: [
      { en: "Project preparation", uk: "Підготовка проєкту", he: "הכנת פרויקט" },
      { en: "Concept Note", uk: "Concept Note", he: "Concept Note" },
      { en: "Feasibility Study", uk: "Feasibility Study / Техніко-економічне обґрунтування", he: "בדיקת כדאיות" },
      { en: "Business plan", uk: "Бізнес-план", he: "תוכנית עסקית" },
      { en: "Financial model", uk: "Фінансова модель", he: "מודל פיננסי" },
      { en: "Grant funding strategy", uk: "Стратегія грантового фінансування", he: "אסטרטגיית מימון מענקים" },
      { en: "Grant application writing", uk: "Написання грантових заявок", he: "כתיבת בקשות למענקים" },
      { en: "Horizon Europe / CBE JU applications", uk: "Заявки Horizon Europe / CBE JU", he: "בקשות Horizon Europe / CBE JU" },
      { en: "Consortium building", uk: "Формування консорціуму", he: "הקמת קונסורציום" },
      { en: "Investment project", uk: "Інвестиційний проєкт", he: "פרויקט השקעה" },
      { en: "Investor package", uk: "Пакет для інвестора", he: "חבילה למשקיעים" },
      { en: "Commercialization", uk: "Комерціалізація", he: "הפצה מסחרית" },
    ],
  },
];

export function getFunnel(slug: string): Funnel | undefined {
  return FUNNELS.find((f) => f.slug === slug);
}

export function funnelsInCategory(category: FunnelCategory): Funnel[] {
  return FUNNELS.filter((f) => f.category === category);
}

export function funnelTitle(f: Funnel, locale: string): string {
  return f.title[locale as keyof LocalizedText] ?? f.title.en;
}

export function funnelSteps(f: Funnel, locale: string): string[] {
  return f.steps.map((s) => s[locale as keyof FunnelStep] ?? s.en);
}

export const ORDER_FUNNEL_SLUG = "buy-miscanthus-rhizomes";
