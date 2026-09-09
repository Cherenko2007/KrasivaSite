# KRASIVA — Aesthetics Studio

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Apps Script](https://img.shields.io/badge/Google_Apps_Script-4285F4?logo=google&logoColor=white)](https://developers.google.com/apps-script)
[![License](https://img.shields.io/badge/License-Commercial-red)]()

> **Live site:** [krasiva-kirov.ru](https://krasiva-kirov.ru/)

---

## About

**KRASIVA** is a fully responsive business card website for a private massage studio in Kirov, Russia.  
The project was built from scratch with a focus on performance, SEO, and a smooth user experience.  
It serves as the studio's main online presence, helping clients discover services, read real reviews, and book appointments directly through the site.

---

## Key Features

- **Fully responsive** — works flawlessly on desktops, tablets, and mobile devices.
- **Bilingual support** — Russian/English language switcher with separate pages for each version.
- **Interactive elements** — modal booking form, FAQ accordion, lightbox for certificates, smooth scroll navigation.
- **Backend integration** — booking data is sent to Google Sheets and the studio master receives instant Telegram notifications via Google Apps Script.
- **SEO‑friendly** — Schema.org structured data (`LocalBusiness`, `Service`, `Review`, `FAQPage`), Open Graph tags, Twitter Cards, canonical URLs, `sitemap.xml`, and `robots.txt`.
- **Analytics** — Google Analytics 4 and Yandex.Metrica are pre‑configured.
- **Performance** — lightweight vanilla JS, lazy‑loaded images, and minimal external dependencies.

---

## Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| **Frontend** | HTML5, CSS3 (Custom Properties, Flexbox, Grid), Vanilla JavaScript (ES6+) |
| **Backend**  | Google Apps Script (form handling + Telegram bot) |
| **Fonts**    | Playfair Display, Inter (Google Fonts) |
| **Analytics**| Google Analytics 4, Yandex.Metrica |
| **SEO**      | Schema.org JSON‑LD, Open Graph, Twitter Cards, sitemap.xml |

---

## Project Structure

```
krasiva-kirov.ru/
├── index.html                # Homepage (RU)
├── en.html                   # Homepage (EN)
├── services.html             # Services & prices (RU)
├── services-en.html          # Services & prices (EN)
├── reviews.html              # Client reviews (RU)
├── reviews-en.html           # Client reviews (EN)
├── contacts.html             # Contacts & map (RU)
├── contacts-en.html          # Contacts & map (EN)
├── privacy.html              # Privacy policy (RU)
├── privacy-en.html           # Privacy policy (EN)
├── 404.html                  # Custom 404 error page
├── style.css                 # Single stylesheet (all styles)
├── script.js                 # Client‑side logic (modal, FAQ, lightbox, etc.)
├── sitemap.xml               # Sitemap for search engines
├── robots.txt                # Crawler instructions
├── bot-form.gs               # Google Apps Script (backend) — see below

```

## Backend (Google Apps Script)

The booking forms on the site connect to a Google Apps Script backend. The script:

- Receives POST requests from the site.
- Validates input (name, phone, service, date, time).
- Appends new records to a Google Sheet.
- Sends a Telegram message to the studio master with the booking details.
- Responds to the client with a success message.

**Key files:** `bot-form.gs` (included in the repo)  
**Required configuration:**  
- `TOKEN` — Telegram bot token  
- `CHAT_ID` — master's Telegram chat ID  
- `SPREADSHEET_ID` — ID of the Google Sheet  

The script must be published as a web app. The frontend `script.js` sends requests to the deployed URL.

---

## SEO & Analytics

- **Structured Data** — JSON‑LD is embedded on all pages to help search engines understand the business, services, reviews, and FAQ.
- **Meta Tags** — Open Graph and Twitter Cards are set for social sharing.
- **Sitemap** — `sitemap.xml` includes all RU and EN pages with priorities.
- **Robots** — `robots.txt` allows full crawling and points to the sitemap.
- **Analytics** — GA4 and Yandex.Metrica tracking codes are placed in the `<head>` of every page.

---

## Browser Support

The site is tested on modern browsers:
- Chrome / Edge (latest)
- Firefox (latest)
- Safari (iOS and macOS)
- Mobile browsers (Android Chrome, iOS Safari)

Internet Explorer is not supported.

---

## License

This project is **commercial** and was developed for a private client.  
All rights are reserved by **KRASIVA — Aesthetics Studio**.

The source code is provided for reference and review purposes only.  
You may not reproduce, distribute, or use this code for commercial or personal projects without explicit permission.

© 2026 KRASIVA. All rights reserved.

---

## Author

- **Developer** — Cherenko Juliana *(design, markup, logic, deployment)*  
- **Studio** — [KRASIVA](https://krasiva-kirov.ru/), Kirov, Russia

---

**Visit the site:** [krasiva-kirov.ru](https://krasiva-kirov.ru)
