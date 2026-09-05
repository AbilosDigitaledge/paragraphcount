# AI Agent Guidelines & Persistent Configurations

This document contains critical project-specific configuration rules, assets, and third-party integrations for **ParagraphCount**. All AI coding agents operating on this repository must read, adhere to, and preserve these settings.

---

## 1. Third-Party Integrations (Do Not Remove or Edit)

### Google AdSense
- **Client ID**: `ca-pub-1362766699039725`
- **Location**: Enclosed between `<head></head>` tags in `/index.html`
- **Snippet**:
  ```html
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1362766699039725"
       crossorigin="anonymous"></script>
  ```

### Google Analytics (gtag.js)
- **Measurement ID**: `G-H0V18FRXGQ`
- **Location**: Immediately after the opening `<head>` tag in `/index.html`
- **Snippet**:
  ```html
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-H0V18FRXGQ"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-H0V18FRXGQ');
  </script>
  ```

---

## 2. Branding & Custom Assets

### Favicon
- **Asset Path**: `/public/favicon.svg` (Vite static assets folder)
- **Design Specifications**: Solid editorial-rust orange square (`#C2410C`) surrounding a centered, clean white stroke outline of the stacked layers logo.
- **Reference Tag**: `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />` inside `/index.html`.

---

## 3. Contact & Communication

### Footer Help Center
- **Location**: Column 3 ("About the Project") of `/src/components/Footer.tsx`.
- **Content**:
  ```text
  Have questions?
  abilosdigitaledge1@gmail.com
  ```
- **Constraint**: Must remain properly formatted as a highly scannable, modern block using an active `mailto:abilosdigitaledge1@gmail.com` link.

---

## 4. Visual Identity & Design Guidelines
- **Core Theme**: High-contrast, premium, flat-design Editorial/Journalistic Magazine Aesthetic.
- **Color Scheme**: Warm parchment paper background (`#F5F2ED` / `#121110` dark-mode), dark charcoal text (`#1A1A1A`), and active rust-red highlights (`#C2410C`).
- **Layout Rule**: Strictly sharp, rectangular, non-rounded boxes with thin elegant solid border lines. No soft shadows, gradients, or heavy borders.
