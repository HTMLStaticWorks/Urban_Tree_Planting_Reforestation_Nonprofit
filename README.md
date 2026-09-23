# Urban Forest | Tree Planting & Reforestation Nonprofit

A static multi-page website and supporter impact portal for **Urban Forest**, a nonprofit organization dedicated to restoring urban tree canopy, protecting native ecosystems, and empowering community stewardship.

---

## 🌲 Website Pages

| Page | File | Description |
|---|---|---|
| **Home (Landing)** | [`index.html`](index.html) | Primary landing page featuring hero, live impact counters, ecological pillars, core programs, and volunteer CTA. |
| **Home 2 (Mission)** | [`home2.html`](home2.html) | Organization mission, field work photo gallery, 4-stage restoration model, and newsletter subscription. |
| **Our Work** | [`work.html`](work.html) | Restoration programs: Forest Recovery, Urban Canopy, and Habitat Renewal with methodology details. |
| **Volunteer** | [`volunteer.html`](volunteer.html) | Volunteer roles (Planting, Tree Care, Monitoring, Community), upcoming event registration, and portal onboarding. |
| **Donate** | [`donate.html`](donate.html) | Financial support tier selector ($25, $50, $100, $250, custom amount), allocation transparency, and donor portal CTA. |
| **Contact** | [`contact.html`](contact.html) | Community office location, direct emails/phone, interactive inquiry form, and embedded OpenStreetMap. |
| **Supporter Login** | [`login.html`](login.html) | Authentication portal with "Remember Me", password recovery, social logins (Google, Apple), and direct dashboard access. |
| **Create Account** | [`signup.html`](signup.html) | Supporter registration with name, email, password, terms agreement, and social sign-up. |
| **Registration Alias** | [`register.html`](register.html) | Convenience redirect to `signup.html`. |
| **Impact Portal** | [`dashboard.html`](dashboard.html) | Supporter portal with Overview, My Impact, Projects, and Activity tabs, interactive charts, and volunteer milestone tracker. |
| **404 Not Found** | [`404.html`](404.html) | Branded error page with navigation back to safety. |

---

## 🎨 Asset Structure

```
assets/
├── css/
│   └── style.css            # Consolidated design system, themes (Light/Dark), RTL layouts, and responsive breakpoints
└── js/
    ├── main.js              # Theme toggle, RTL toggle, mobile menu, reveals, image fallbacks, and form handling
    └── dashboard.js         # Tab switching, supporter stats, chart rendering, and logout flow
```

---

## 🚀 Key Features

- **Light & Dark Theme**: Toggle anytime via the top navigation or auth/dashboard bars; preference is automatically saved in `localStorage`.
- **Bidirectional RTL Support**: Full right-to-left layout switching with persistent state for Arabic/Hebrew localization.
- **Interactive Forms**:
  - Live donation amount selector with custom number entry.
  - One-click volunteer event registration with instant toast feedback.
  - Interactive message submission form.
  - Newsletter subscription with validation.
  - Simulated authentication workflow populating user profile state across the dashboard.
- **Responsive Design**: Custom-tuned for wide desktops, tablets, mobile devices, and small screens (390px).
- **Graceful Image Fallbacks**: Built-in SVG generator if remote photographic assets fail to resolve.
