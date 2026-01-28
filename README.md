# 📦 Plutux Vault

**Plutux Vault** is a premium, mobile-first **Progressive Web App (PWA)** for asset management, built with **React 19**, **TypeScript**, and **Supabase**.

It combines "Senior Engineer" architectural standards with a native-like mobile experience.

![Plutux Vault Banner](https://placehold.co/1200x400/0f172a/3b82f6?text=Plutux+Vault+PWA)

## 🌟 Key Features

- **📱 Progressive Web App (PWA)**: Installable on iOS/Android, works offline, and feels native (Industrial Dark Theme).
- **☁️ Supabase Backend**: Scalable Postgres database with Real-time capabilities and **Row Level Security (RLS)**.
- **🛡️ Type-Safe Core**: End-to-End type safety with **Zod** schemas (DB to UI).
- **⚡ Performance First**: Zero-layout shift, Skeleton loaders, and "grid/list" view toggles.
- **🧩 Atomic Design**: Reusable components (`AssetCard`, `StatusBadge`) with Glassmorphism styling.
- **🔍 Smart Filtering**: Real-time search by category, status, and value.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite (PWA Plugin).
- **Backend**: Supabase (Postgres, Auth, Edge Functions).
- **Styling**: Tailwind CSS 4.0, Lucide Icons.
- **State**: React Context API + Custom Hooks.
- **Testing**: Vitest + React Testing Library (100% Logic Coverage).
- **Routing**: React Router DOM 7 (Protected Routes).

## 🚀 Getting Started

### 1. Requirements

- Node.js 18+
- A Supabase Project (Free Tier)

### 2. Installation

```bash
git clone https://github.com/yourusername/plutux-vault.git
cd plutux-vault
npm install
```

### 3. Environment Setup

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_public_key
```

### 4. Run Locally

```bash
npm run dev
```

### 5. Deployment (Vercel)

This project is optimized for Vercel deployment:

1.  Import repository to Vercel.
2.  Add Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
3.  Deploy! (PWA assets are auto-generated).

## 🧪 Testing

We adhere to strict TDD principles:

```bash
npm run test        # Run Unit Tests (Logic & Components)
npm run coverage    # Verify 100% Coverage on core modules
```

## 🏗️ Project Structure

```bash
src/
├── api/             # Supabase Adapters (snake_case -> camelCase)
├── components/      # Atomic UI Library
│   ├── auth/        # ProtectedRoute, Layouts
│   ├── ui/          # Buttons, Inputs, Skeletons
│   └── assets/      # AssetCard, InventoryFilters
├── context/         # Global State (Auth, Inventory)
├── hooks/           # Business Logic (useAssetFilter, useInventory)
├── pages/           # Views (Login, Dashboard, Inventory)
└── schemas/         # Zod Definitions (The Authority)
```

## 🔮 Roadmap Status

- [x] **Phase 1-4**: Core Logic & UI Overhaul
- [x] **Phase 5**: Supabase Migration (Completed)
- [x] **Phase 7**: Deployment & PWA (Completed)
- [ ] **Phase 8**: Data Sovereignty (Import/Export)
- [ ] **Phase 9**: Advanced Analytics (Depreciation Engine)

---

Built with ❤️ by AndyDev using the **Antigravity AI Agent**.
