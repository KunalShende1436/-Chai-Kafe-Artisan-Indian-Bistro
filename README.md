<div align="center">

  <h1>🫖 Chai & Kafe — Artisan Indian Bistro</h1>
  <p><strong>A luxury, state-of-the-art Web Application for authentic Indian Chai, Kaapi, Desi Street Snacks & Executive Admin Analytics</strong></p>

  <p>
    <a href="https://chai-kafe-artisan-indian-bistro.vercel.app/"><img src="https://img.shields.io/badge/Vercel-Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
    <a href="https://github.com/KunalShende1436/-Chai-Kafe-Artisan-Indian-Bistro"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo"></a>
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome">
  </p>

  <br />

  <a href="https://chai-kafe-artisan-indian-bistro.vercel.app/"><strong>🌐 Visit Live Website »</strong></a>
</div>

<br />

---

## 📌 Overview

**Chai & Kafe** is a high-performance, responsive web application designed for a modern Indian Cafe & Bistro. It features a rich warm aesthetic, instant **Dark & Light theme switching**, high-resolution food photography, customizable chai brewing options, an interactive cart with **UPI payments**, live order status tracking, and a secure **Executive Admin Dashboard** for real-time sales analytics and inventory control.

---

## 🌟 Key Features

### ☕ Customer Experience
- 🫖 **Authentic Desi Menu**: *Kulhad Masala Chai*, *South Indian Filter Kaapi*, *Crispy Punjabi Samosas*, *Mumbai Vada Pav*, *Matcha Latte*, and *New York Cheesecake*.
- ⚙️ **Item Customization Modal**: Choose brew strength (*Kadak / Medium / Light*), sugar level (*Full / Kam Chini / Bina Chini*), and add-ons (*Extra Adrak, Elaichi, Kesar, Extra Pav*).
- 🏷️ **Dietary & Category Filters**: Easily filter by 🟢 Pure Veg, 🔴 Non-Veg, 🌱 Jain Friendly, Bestsellers, or search by keyword.
- 🛒 **Slide-out Cart & Checkout**:
  - Currency displayed in **Indian Rupees (`₹`)**.
  - Tip calculator (`₹0`, `₹10`, `₹20`, `₹50`).
  - Discount promo codes (`DESI20` for 20% off, `CHAI10` for 10% off).
  - Flexible dining options (*Dine-In Table Service, Takeaway, Local Delivery*).
  - Multiple payment options (*UPI via GPay/PhonePe/Paytm, Credit/Debit Card, Pay at Counter*).
- ⏱️ **Live Order Tracker**: Real-time 4-step progress bar (*Order Received → Brewing / Cooking → Ready for Table → Served*) with detailed itemized tax receipts.
- ❤️ **Favorites / Wishlist**: Save favorite items with persistent local storage.
- 🌓 **Dark & Light Mode**: Seamless theme switcher with smooth glassmorphism effects.

### 📊 Executive Admin Dashboard
- 🔒 **Passcode Security**: Protected access with passcode `admin123` and session termination (**Logout** button).
- 📈 **Real-Time Analytics**: Gross revenue metrics (`₹`), total orders count, low-stock warnings, and an interactive weekly sales chart.
- 📦 **Inventory Management**: Add and edit menu items using custom modal forms with image presets, pricing, stock levels, and dietary tags.
- 🧾 **Orders Pipeline**: Track live orders and advance status through fulfillment stages (*Placed → Preparing → Ready → Completed*).
- 💳 **Billing & Revenue History**: Full transaction history with subtotal, discount, tip, and timestamps.
- 👥 **Staff Team Management**: Manage barista and kitchen staff schedules and roles.
- 📥 **Data Export & Reset**: Export order records to CSV or reset demo datasets anytime.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox, Grid, Glassmorphism, CSS Animations)
- **Logic**: Vanilla JavaScript (ES6 Modules, LocalStorage & SessionStorage API)
- **Icons**: Feather Icons SVG Vector Library
- **Typography**: Google Fonts (*Playfair Display* & *Plus Jakarta Sans*)
- **Deployment**: Vercel Static Hosting (`vercel.json`)

---

## 📁 Repository Structure

```
.
├── index.html       # Customer Menu, Cart Drawer & Live Order Tracker
├── admin.html       # Executive Admin Dashboard & Analytics Console
├── vercel.json      # Vercel deployment configuration & routing
├── README.md        # Documentation
├── css/
│   └── styles.css   # Responsive CSS design system (Dark & Light themes)
├── js/
│   ├── app.js       # Customer menu, customization, cart & tracker logic
│   └── admin.js     # Admin metrics, inventory, orders & staff logic
└── assets/
    └── images/      # High-resolution food & beverage assets
```

---

## 🚀 Quick Start & Local Setup

No node server or database setup required! Run directly in your browser:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KunalShende1436/-Chai-Kafe-Artisan-Indian-Bistro.git
   cd -Chai-Kafe-Artisan-Indian-Bistro
   ```

2. **Open in Browser**:
   - Double click `index.html` to open the customer menu.
   - Double click `admin.html` to open the admin dashboard.
   - Alternatively, serve using Live Server extension in VS Code.

---

## 🌐 Deploying to Vercel

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Deploy preview
npx vercel

# Deploy to production
npx vercel --prod
```

### Method 2: Import to Vercel Dashboard

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import `KunalShende1436/-Chai-Kafe-Artisan-Indian-Bistro`.
4. Click **Deploy**.

Live Vercel URL: **[https://chai-kafe-artisan-indian-bistro.vercel.app/](https://chai-kafe-artisan-indian-bistro.vercel.app/)**

---

## 🔑 Credentials & Testing Helpers

| Access | Credentials / Codes |
| :--- | :--- |
| **Admin Passcode** | `admin123` |
| **20% Promo Code** | `DESI20` |
| **10% Promo Code** | `CHAI10` |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/KunalShende1436/-Chai-Kafe-Artisan-Indian-Bistro/issues).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Crafted with ❤️ for Chai & Coffee lovers across India.</sub>
</div>
