# 🫖 Chai & Kafe — Artisan Indian Bistro

A modern, responsive Indian Cafe & Chai Bar web application featuring authentic Kulhad Masala Chai, South Indian Filter Kaapi, Punjabi Samosas, Mumbai Vada Pav, live order tracking, INR (₹) pricing, UPI checkout, and an executive Admin Management Dashboard.

---

## 🚀 How to Deploy on Vercel

### Method 1: Using Vercel CLI (Quickest)

1. Open terminal in this project directory:
   ```bash
   cd "SEQA TAE"
   ```
2. Run the Vercel deployment command:
   ```bash
   npx vercel
   ```
3. Follow the interactive prompts:
   - Log in or sign up if prompted.
   - Set project scope & confirm project name (`chai-and-kafe-bistro`).
   - Choose `No` when asked to modify settings (Vercel automatically detects static site & reads `vercel.json`).
4. To deploy to production:
   ```bash
   npx vercel --prod
   ```

---

### Method 2: Via GitHub & Vercel Dashboard (Recommended for Auto-Deploys)

1. Push this project folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Chai & Kafe app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chai-and-kafe.git
   git push -u origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Click **Import Repository** and select your `chai-and-kafe` repository.
4. Click **Deploy**. Vercel will instantly publish your site live with a free SSL `.vercel.app` domain!

---

## 📁 Project Structure

```
├── index.html       # Customer Menu, Cart Drawer & Live Tracker
├── admin.html       # Executive Admin Dashboard & Analytics
├── vercel.json      # Vercel deployment configuration & routing
├── css/
│   └── styles.css   # Responsive CSS design system (Dark/Light themes)
├── js/
│   ├── app.js       # Customer logic (Chai options, UPI, Cart, Tracker)
│   └── admin.js     # Admin dashboard logic (Analytics, Inventory, Orders)
└── assets/
    └── images/      # High-res food & beverage photos
```

---

## 🔑 Credentials

- **Admin Dashboard Passcode**: `admin123`
- **Promo Codes**: `DESI20` (20% off), `CHAI10` (10% off)
