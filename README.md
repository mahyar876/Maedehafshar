# وب‌سایت شخصی Maedeh Afshar

وب‌سایت استاتیک، تک‌صفحه‌ای و سه‌زبانه (فارسی، انگلیسی، روسی) برای معرفی مائده افشار، مدرس زبان انگلیسی.

**تکنولوژی:** HTML5، CSS3، JavaScript خالص — بدون Build و بدون Backend.

---

## ۱. ساختار پروژه

```
Maedeh/
├── index.html              # ساختار صفحه
├── css/
│   └── styles.css          # طراحی، تم روشن/تیره، ریسپانسیو
├── js/
│   ├── content.js          # تمام متن‌ها، FAQ، دوره‌ها، تماس، مسیر عکس‌ها
│   └── main.js             # زبان، تم، منو، انیمیشن، رندر بخش‌ها
├── assets/
│   ├── icons/
│   │   └── favicon.svg     # فاویکون مونوگرام MA
│   └── images/             # عکس‌های شما (پایین توضیح داده شده)
└── README.md
```

---

## ۲. اجرای محلی (VS Code + Live Server)

1. پوشه پروژه را در VS Code باز کنید.
2. افزونه **Live Server** را نصب کنید (در صورت نبود).
3. روی `index.html` راست‌کلیک → **Open with Live Server**.
4. مرورگر باز می‌شود؛ تغییرات فایل‌ها را با ذخیره و Refresh می‌بینید.

**جایگزین:** هر سرور استاتیک ساده (مثلاً `npx serve` در همان پوشه) — npm برای خود سایت لازم نیست.

---

## ۳. ویرایش متن‌های FA / EN / RU

همه متن‌ها در `js/content.js` داخل شیء `CONTENT` هستند:

- `CONTENT.fa` — فارسی
- `CONTENT.en` — انگلیسی
- `CONTENT.ru` — روسی

بخش‌ها: `meta`, `nav`, `hero`, `about`, `journey`, `experience`, `teaching`, `courses`, `faq`, `contact`, `footer`, `ui`.

**نام برند** `Maedeh Afshar` و مونوگرام **MA** در `SITE.brand` ثابت می‌مانند.

---

## ۴. افزودن و جایگزینی عکس‌ها

در `js/content.js` → `SITE.images`:

| فایل روی دیسک | کلید در content.js |
|---------------|-------------------|
| `assets/images/maedeh-portrait.jpg` | `portrait` |
| `assets/images/russia-journey-1.jpg` | `journey[0]` |
| `assets/images/russia-journey-2.jpg` | `journey[1]` |

فقط فایل را در مسیر قرار دهید (یا مسیر را در `SITE.images` عوض کنید). اگر فایل نباشد، **Placeholder** ترجمه‌شده نمایش داده می‌شود.

**پیشنهاد:** پرتره حدود ۴:۵ (مثلاً 960×1200)، تصاویر مسیر سفر ۱۶:۱۰.

---

## ۵. تنظیم ایمیل، اینستاگرام و تلگرام

در `js/content.js` → `SITE.contact`:

```javascript
contact: {
  email: "",        // مثال: "hello@example.com"
  instagram: "",    // مثال: "https://instagram.com/username"
  telegram: "",     // مثال: "https://t.me/username"
},
```

- تا وقتی مقدار **خالی** است، دکمه‌ها لینک جعلی ندارند و پیام «به‌زودی فعال می‌شود» (یا معادل EN/RU) نشان داده می‌شود.
- پس از پر کردن، ایمیل → `mailto:` و شبکه‌ها در تب جدید با `rel="noopener noreferrer"`.

---

## ۶. دوره‌ها و FAQ

**دوره جدید:** در هر سه زبان، به `courses.items` یک آبجکت با **`id` یکسان** اضافه کنید:

```javascript
{
  id: "my-course",
  visible: true,
  title: "...",
  description: "...",
}
```

`visible: false` کارت را مخفی می‌کند.

**سؤال FAQ جدید:** در هر سه زبان، به `faq.items` با **`id` یکسان**:

```javascript
{ id: "new-q", question: "...", answer: "..." }
```

---

## ۷. تست زبان، RTL/LTR و تم

| مورد | انتظار |
|------|--------|
| اولین بازدید | زبان **فارسی**، جهت **RTL** |
| EN / RU | تمام متن‌ها عوض شود، FA/EN → LTR، FA → RTL |
| تم | دکمه خورشید/ماه در هدر؛ انتخاب در `localStorage` (`maedeh_theme`) |
| زبان | `localStorage` کلید `maedeh_lang` |

DevTools → Rendering → **Emulate prefers-reduced-motion** برای بررسی کاهش انیمیشن.

---

## ۸. انتشار روی هاست استاتیک

محتوای **ریشه پروژه** (همان پوشه‌ای که `index.html` داخلش است) را آپلود کنید.

### GitHub Pages

1. مخزن Git بسازید و فایل‌ها را push کنید.
2. Settings → Pages → Source: branch `main`, folder `/ (root)`.
3. آدرس `https://<user>.github.io/<repo>/` — در صورت نیاز مسیرها را نسبی نگه دارید (فعلی همین‌طور است).

### Netlify

1. [netlify.com](https://www.netlify.com) → Add new site → Deploy manually یا اتصال Git.
2. Publish directory = ریشه پروژه (جایی که `index.html` است).

### Cloudflare Pages

1. Pages → Create project → آپلود یا Git.
2. Build command: **خالی** — Output directory: `/`.

---

## ۹. اتصال دامنه اختصاصی

1. در پنل هاست، دامنه را اضافه کنید.
2. در DNS رégistrar رکورد **A** یا **CNAME** را طبق راهنمای هاست تنظیم کنید.
3. پس از تغییر DNS معمولاً **چند دقیقه تا ۴۸ ساعت** طول می‌کشد — با `dig` یا ابزار آنلاین DNS propagation را بررسی کنید.
4. در `js/content.js` مقدار **`SITE.canonicalUrl`** را به آدرس نهایی با `https://` تنظیم کنید (برای SEO).

---

## ۱۰. HTTPS و بررسی نهایی

- Netlify / Cloudflare Pages / GitHub Pages معمولاً **HTTPS خودکار** دارند.
- پس از انتشار: زبان‌ها، تم، منوی موبایل، FAQ، اسکرول به بخش‌ها، Placeholder عکس، حالت تماس خالی/پر را یک‌بار روی موبایل و دسکتاپ تست کنید.

---

## یادآوری

- دوره **فعال** فقط **زبان انگلیسی** است؛ روسی در مسیر شخصی/تحصیلی مطرح می‌شود، نه به‌عنوان دوره قطعی.
- قیمت، تعداد زبان‌آموز، آمار ساختگی و اطلاعات تماس جعلی در پروژه عمداً وجود ندارد.

---

© پروژه شخصی Maedeh Afshar
