# Plutux Vault - Project Roadmap

**Project Context**: A premium asset management system built with React, TypeScript, and "Senior Engineer" standards. The goal is to evolve the web application into a high-fidelity **Mobile Web App (PWA)** that feels native.

## ✅ Phase 1: Core Architecture & Logic (Exercises 1-10)

- **Foundation**: Strict Schema-First (Zod), No-Backend (localStorage), Go-Style Error Handling (`handleAsync`).
- **Components**: `AssetCard` (Molecule), `StatusBadge` (Atom), `AssetForm` (Business Logic).
- **State**: `useInventory` hook and `InventoryContext` for global management.
- **Features**: Dynamic Filtering (`useAssetFilter`), Integration Tests.
- **Status**: **[COMPLETED]**

## ✅ Phase 2: UI/UX & Navigation Overhaul

- **Architecture**: Client-side Routing with `react-router-dom`.
- **Design System**: Glassmorphism Atoms (`Input`, `Select`, `Button`) with premium styling.
- **Structure**:
  - Split into Pages: `Dashboard`, `Inventory`, `AddAsset`.
  - Implemented Global Layout with Top Navbar.
- **Status**: **[COMPLETED]**

## ✅ Phase 3: Visual & Mobile Overhaul (Completed)

We have successfully transformed the app into a premium, mobile-first experience.

### Executed Tasks

- **[x] Visual Design Overhaul**:
  - Implemented "Industrial Dark" theme (`bg-slate-900`, `text-slate-200`).
  - Updated color palette from Earthy/Brown to Professional Slate/Sky Blue.
  - Refactored all Atomic components (`Input`, `Select`, `Button`) to match new design.
- **[x] Mobile Navigation**:
  - **[x] Bottom Tab Bar**: Fixed navigation for easy thumb access.
  - **[x] Sticky FAB**: Floating Action Button for "Add Asset".
  - **[x] Navbar Refactor**: Simplified top bar for mobile, removed hamburger menu.
- **[x] Interactive Feedback**:
  - **[x] Toast Notifications**: Integrated `sonner` for elegant success/error messages.
  - **[x] Error Handling**: Replaced native `alert()` with toast feedback.
- **[x] Codebase Cleanup**:
  - **[x] Tests**: 100% pass rate on all updated components.
  - **[x] Linting**: Resolved unused variables and strict type issues.

### Deferred / Future Mobile Enhancements

These items remain in the backlog for future mobile optimization:

- [ ] **PWA Capabilities**: Manifest.json, Service Workers.
- [ ] **Native Gestures**: Swipe to delete, Drag and drop.
- [ ] **Haptics**: Vibration feedback.
- [ ] **View Toggles**: List vs Grid view switch.

## ✅ Phase 4: Advanced Features (Completed)

### 1. 📸 Integrated Barcode/QR Scanner

- **[x] Scan-to-Search**: Instantly find an asset by scanning its tag.
- **[x] Scan-to-Add**: Auto-fill the "Serial Number" field during registration.
- **[x] Tech**: `@yudiel/react-qr-scanner`.

### 2. 📊 Advanced Analytics (The "Manager View")

- **[x] Visual Reports**: Mobile-friendly charts using `recharts`.
  - **[x] Donut Chart**: "Assets by Category" (Implemented `CategoryDonutChart`).
  - **[x] Value Card**: "Total Inventory Value" (Enhanced Dashboard Stats).
- **[ ] Asset History**: (Deferred).

## ☁️ Phase 5: Cloud Migration (Supabase)

Transitioning from local-only storage to a scalable cloud backend.

### 1. 🏗️ Infrastructure Setup

- [ ] **Environment**: Configure `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- [ ] **Client**: Initialize `@supabase/supabase-js` singleton.
- [ ] **Database**: Create `assets` table with strict typing matching our Zod schema.

### 2. 🔄 Data Layer Migration

- [ ] **Refactor Service**: Rewrite `AssetService.ts` to replace `localStorage` logic with Supabase queries.
- [ ] **Error Handling**: Adapt `handleAsync` to wrap Supabase errors.
- [ ] **Verification**: Ensure `useInventory` hook works unchanged (Interface Segregation).

### 3. 🔐 Authentication (Bonus)

- [ ] **Auth Context**: Manage user session.
- [ ] **Row Level Security (RLS)**: Secure data so users only see their own inventory.
