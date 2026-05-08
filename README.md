# YatraVerse AI 🇮🇳
### *Discover India Intelligently*

> India's first AI-powered travel planning & experience engine — built for the modern Indian explorer.

**Live Demo:** [https://voyage-ai-1071306195083.us-central1.run.app](https://voyage-ai-1071306195083.us-central1.run.app)

---

## 🌟 What is YatraVerse AI?

YatraVerse AI transforms how people plan travel across India. Powered by **Google Gemini 2.5 Flash**, it generates complete, context-aware itineraries tailored to 9 iconic Indian destinations — from Kashmir to Andaman — with local food guides, INR budgeting, hidden gems, and "How to Reach" transport cards.

---

## ✨ Core Features

| Feature | Description |
|---|---|
| 🗺️ **Destination Hub** | 9 rich destination pages: Kashmir, Goa, Kerala, Jaipur, Ladakh, Varanasi, Meghalaya, Andaman, Hyderabad |
| 🤖 **AI Yatra Planner** | Gemini-powered itinerary generation with animated AI loading |
| 🍛 **Local Food Guide** | Street food, vegetarian/non-veg highlights, local cafes per destination |
| 🚂 **How To Reach** | Flight, train, bus, and local transport cards with ₹ cost estimates |
| 🌟 **Hidden Gems** | AI-curated off-the-beaten-path locations per destination |
| 🛡️ **Travel Like a Local** | Cultural tips, scam alerts, local phrases, etiquette guide |
| 💰 **INR-First Budgeting** | All costs in ₹ with animated Recharts pie chart breakdown |
| 💬 **AI Chat Assistant** | Floating India-aware travel assistant with contextual responses |
| 🎒 **Packing Checklist** | Destination-specific packing recommendations |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (lightweight, CSS-optimized)
- **Auth & DB:** Firebase Auth + Firestore
- **AI Engine:** Google Gemini 2.5 Flash (`@google/genai`)
- **Charts:** Recharts (INR budget pie chart)
- **Deployment:** Google Cloud Run (Docker)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Afzal-Mansury/Voyage_AI_Travel_Planner.git
cd Voyage_AI_Travel_Planner
npm install
```

### 2. Set Environment Variables
```bash
cp .env.example .env.local
# Fill in your API keys
```

Required keys in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_GEMINI_API_KEY=...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```

### 3. Run Locally
```bash
npm run dev
# Open http://localhost:3000
```

---

## ☁️ Google Cloud Run Deployment

```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com

# Deploy (builds Docker image automatically)
gcloud run deploy yatraverse-ai \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing — India-inspired hero
│   ├── destinations/         # India Destination Hub (9 locations)
│   ├── planner/              # AI Yatra Planner form
│   ├── trip/[id]/            # Trip Results — itinerary, food, transport
│   ├── dashboard/            # My Trips dashboard
│   └── globals.css           # India-first saffron theme
├── components/
│   ├── Navbar.tsx            # YatraVerse AI navbar
│   ├── ChatWidget.tsx        # Floating AI assistant
│   ├── ExpenseEstimator.tsx  # INR budget chart
│   ├── InteractiveMap.tsx    # Map visualization
│   └── Footer.tsx
└── lib/
    ├── destinations.ts       # India destinations data
    ├── firebase.ts           # Firebase client
    └── gemini.ts             # Gemini AI integration
```

---

## 🏆 Hackathon Details

Built for the **Google Hackathon** focusing on Travel Planning & Experience Engine.

**Google Technologies Used:**
- ✅ Gemini 2.5 Flash API
- ✅ Firebase Authentication + Firestore
- ✅ Google Cloud Run
- ✅ Google Cloud Build
- ✅ Google Maps API ready

---

*Made with ❤️ for Incredible India 🇮🇳 · Powered by Google Gemini AI*
