# 🌾 কৃষি বন্ধু (Krishi Bondhu)

<div align="center">
  <img src="./public/assets/light-logo.png" alt="Krishi Bondhu Logo" width="200"/>
  <p><strong>স্মার্ট কৃষি সহকারী — Empowering Farmers with AI & Data</strong></p>
</div>

---

### 🌐 Language Versions / ভাষার সংস্করণ
- [English Version](#english-version)
- [Bangla Version (বাংলা সংস্করণ)](#bangla-version)

---

<div id="english-version"></div>

## 🇺🇸 English Version

### 🚀 Overview
**Krishi Bondhu** is a premium, AI-powered digital companion designed for farmers in Bangladesh. It bridges the gap between traditional farming and modern technology, providing essential data, AI diagnostics, and market insights in a single, beautiful interface.

### ✨ Key Features
- **🌡️ Live Weather & Alerts**: Real-time monitoring with severe weather alerts based on BMD (Bangladesh Meteorological Department) thresholds.
- **🛡️ AI Disease Detection**: Upload photos of crop leaves to identify diseases instantly and get treatment advice.
- **📊 Market Price Monitor**: Live tracking of crop prices (Potato, Rice, Onion, etc.) across different markets.
- **🌱 Smart Crop Advice**: Personalized planting recommendations based on current Bengali seasons and soil types.
- **🤖 Agri-Bot**: An intelligent AI chatbot that understands and responds to agricultural queries in Bengali.

### 🛠️ Technology Stack
| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, Framer Motion (v12) |
| **State Management** | Zustand |
| **UI Components** | Shadcn UI, Radix UI |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **API/Data** | Axios, Google Gemini API (AI Features) |

### 🎨 Design Patterns & Aesthetics
- **Glassmorphism**: A sleek, translucent UI design that feels premium and modern.
- **Role-Based Layout**: Optimized dashboard system for different user roles.
- **Responsive & Dynamic**: Fully interactive sidebar and smooth motion transitions.
- **Micro-Animations**: Uses `framer-motion` for a lifelike, engaging user experience.

### 📄 Page Details
- **Landing Page**: High-conversion hero section with services and pricing highlights.
- **Auth System**: Secure login and registration with JWT-based persistent sessions.
- **Dashboard Overview**: A bird's eye view of weather, market trends, and quick AI tools.
- **Sub-pages**: Dedicated modules for Crop Advice, Market Prices, and AI Chatbot.

---




<div id="bangla-version"></div>

## 🇧🇩 Bangla Version (বাংলা সংস্করণ)

### 🚀 সংক্ষিপ্ত পরিচিতি
**কৃষি বন্ধু** হলো একটি আধুনিক ডিজিটাল সহকারী যা বাংলাদেশের কৃষকদের জন্য তৈরি করা হয়েছে। আধুনিক প্রযুক্তি এবং এআই (AI) ব্যবহারের মাধ্যমে কৃষিকাজকে আরও সহজ, স্মার্ট এবং লাভজনক করে তোলাই আমাদের মূল লক্ষ্য।

### ✨ মূল বৈশিষ্ট্যসমূহ
- **🌡️ সরাসরি আবহাওয়াবার্তা**: আপনার এলাকার তাৎক্ষণিক আবহাওয়ার আপডেট এবং বিরূপ আবহাওয়ায় সতর্কতা বার্তা।
- **🛡️ রোগ শনাক্তকরণ**: ফসলের পাতার ছবি তুলে এআই-এর মাধ্যমে রোগ শনাক্ত করুন এবং সঠিক প্রতিকার জানুন।
- **📊 বাজার দর আপডেট**: আলু, পেঁয়াজ, ধানসহ বিভিন্ন নিত্যপণ্যের বর্তমান বাজার দর জানুন এক পলকে।
- **🌱 স্মার্ট ফসল পরামর্শ**: মাটির ধরন এবং বাংলা ঋতু অনুযায়ী কোন ফসল চাষ করলে সবচেয়ে বেশি লাভ হবে তার সঠিক গাইড।
- **🤖 এআই চ্যাটবট (Agri-Bot)**: বাংলা ভাষায় কথা বলা বুদ্ধিমান চ্যাটবট, যা আপনার কৃষি সংক্রান্ত সকল প্রশ্নের উত্তর দিবে।

### 🛠️ টেকনোলজি স্ট্যাক
- **বেস**: Next.js 16 (React 19) এবং TypeScript।
- **ডিজাইন**: Tailwind CSS 4 এবং Framer Motion-এর মাধ্যমে আকর্ষণীয় অ্যানিমেশন।
- **স্টেট ম্যানেজমেন্ট**: Zustand।
- **ইউআই (UI)**: Shadcn UI এবং Radix UI।

### 🎨 ডিজাইন এবং প্যাটার্ন
- **প্রিমিয়াম লুক**: গ্লাস-মর্ফিজম ইউআই ব্যবহার করা হয়েছে যা একটি আধুনিক অভিজ্ঞতা প্রদান করে।
- **স্মুথ এক্সপেরিয়েন্স**: Next.js এবং Framer Motion-এর সমন্বয়ে দ্রুত এবং প্রাণবন্ত ইন্টারফেস।
- **মোবাইল ফার্স্ট**: কৃষকদের সুবিধার্থে মোবাইল ফোনে ব্যবহারের জন্য বিশেষভাবে অপ্টিমাইজ করা।

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/krisi-bondho.git
   ```
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Set up Environment Variables:**
   Create a `.env` file and add your API keys (Gemini, Weather APIs, etc.)
4. **Run the development server:**
   ```bash
   pnpm dev
   ```

---

<div align="center">
  <p>Built with ❤️ for the Farmers of Bangladesh</p>
</div>
