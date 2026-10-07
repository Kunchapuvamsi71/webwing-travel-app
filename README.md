# 🦇🕸️ Webwing Travel Mobile Application

> **Spider-Man ("Web") x Batman ("Wing") Superhero Travel App**

Webwing is a cross-platform mobile travel application built with **React Native, Expo, and TypeScript**. It combines **Spider-Man ("Web")** web-slinging route planning & Spider-Sense alerts with **Batman ("Wing")** stealth UI, Bat-shelter stays, and high-tech traveler utility belt.

---

## 🌟 Key Features

- **🕷️ Spider-Sense Travel Radar**: Live price-drop alerts, weather warnings, and exclusive deal notifications.
- **🕸️ Spidey Web-Itinerary Weaver**: Interactive day-by-day trip planner linking spots like a web, budget expense tracking, and activity checklists.
- **🦇 Wing Stealth Flight & Hotel Search**: Fast flight finder, luxury Bat-Shelter stays, price comparison, and digital pass vouchers.
- **🛠️ Bat-Gadget Utility Belt**: Real-time currency converter, multi-language phrasebook, and one-tap Bat-Signal Emergency SOS.
- **🛡️ Webwing HQ Profile**: Saved wishlist destinations, digital vouchers, passport stats, and Play Store package metadata.

---

## 🚀 Getting Started

### Prerequisites
- Node.js LTS (v18+)
- Expo CLI (`npx expo`)

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on Web Browser
npm run web
```

---

## 📦 Building Free Standalone APK & Play Store AAB

### 1. Free Standalone Android APK (No Google Fee Required)
```bash
npx eas build -p android --profile preview
```
Download the resulting `.apk` installer and install it directly onto any Android device!

### 2. Google Play Store Android App Bundle (.aab)
```bash
npx eas build -p android --profile production
```
Upload the generated `.aab` file to your **Google Play Console** under Production or Testing tracks.

---

## 🛠️ Tech Stack
- **Framework**: React Native with Expo (v51)
- **Language**: TypeScript
- **Icons**: Lucide React Native
- **Theme**: Superhero Dark Mode (Batcave Charcoal `#0B0E14`, Spidey Red `#FF2E4D`, Web Cyan `#00F0FF`, Bat Gold `#FFC700`)
- **Package ID**: `com.webwing.travel`

---

## 📄 License
MIT License. Created for Webwing Superhero Travel.
