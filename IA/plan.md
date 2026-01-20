# Nexus Inventory - Project Roadmap

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

## 📱 Phase 3: Mobile App Experience (Current Focus)

**Goal**: Transform the responsive website into a specialized "Mobile-First" experience.

### 1. Mobile Navigation (Bottom Tab Bar)

- replace Top Navbar with a fixed **Bottom Tab Bar** for mobile screens.
- Easy thumb access to "Dashboard", "Browse", and "Add".

### 2. Native Interactions

- **Touch Targets**: Ensure all buttons are at least 44x44px.
- **Haptics**: Use `navigator.vibrate` for tactile feedback on success/error.
- **Gestures**: Implement "Swipe to Delete" on Inventory items.

### 3. PWA Capabilities (Installable App)

- **Manifest**: Create `manifest.json` for "Add to Home Screen".
- **Icons**: Add proper app icons.
- **Meta Tags**: Configure `viewport-fit=cover` and "standalone" mode to remove browser chrome.

### 4. Visual Design Evolution (Best-in-Class Benchmarks)

- **Inspiration**:
  - **Sortly**: Use "Card View" for high-level browsing (Image + Name + Quantity).
  - **Snipe-IT**: Use "Dense List" for detailed audits (Barcode + Serial + Status).
- **Palette Shift**: Move to "Industrial Dark" (Slate/Midnight) to match modern SaaS trends.
  - Background: Deep Slate (`#0f172a`).
  - Surface: Lighter Slate (`#1e293b`).
  - Accent: Electric Blue (`#3b82f6`) for actions, Amber (`#f59e0b`) for status.
- **Typography**: Use distinct weights (Bold Headings, Medium Labels) for hierarchy.
- **Skeleton Screens**: Replace spinning loaders with shimmering skeleton placeholders.

### 5. Specialized Mobile UI

- **Pull-to-Refresh**: Simulate native list reloading.
- **Action Sheets**: Replace native alerts/confirmations with bottom-sheet modals.
- **Floating Action Button (FAB)**: Replace the "Add Asset" button with a sticky FAB in the bottom-right corner.
- **List vs Card Toggle**: Allow users to switch between dense "List View" (Rows) and visual "Card View".

## 🚀 Phase 4: Advanced Features (Market-Ready)

### 1. 📸 Integrated Barcode/QR Scanner

- **Scan-to-Search**: Instantly find an asset by scanning its tag.
- **Scan-to-Add**: Auto-fill the "Serial Number" field during registration.
- **Tech**: `react-qr-scanner`.

### 2. 📊 Advanced Analytics (The "Manager View")

- **Visual Reports**: Mobile-friendly charts using `recharts`.
  - **Donut Chart**: "Assets by Category".
  - **Value Card**: "Total Inventory Value" with trend indicators.
- **Asset History**: Vertical timeline showing audit trails for each item.

## ☁️ Phase 5: Cloud Migration (Future Roadmap)

Since `localStorage` is limited (5MB) and local-only, here is the "Senior Engineer" path to scaling:

### Option A: Supabase (Recommended)

- **What**: An open-source Firebase alternative (Postgres).
- **Why**: Gives you a Real Database, Authentication, and Edge Functions with minimal backend code.
- **Migration**: Replace `AssetService` (which simulates async) with the Supabase JS Client.

### Option B: Local-First Architecture (Offline King)

- **What**: Use `SQLite` in the browser (via WASM) and sync to the cloud later.
- **Why**: Best for field workers who might lose internet connection.
- **Tech**: `ElectricSQL` or `RxDB`.

### Option C: Custom Backend

- **What**: Node.js/NestJS + PostgreSQL.
- **Why**: Full control, but effective "Overkill" for this scale.
