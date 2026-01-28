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

- [x] **Environment**: Configure `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- [x] **Client**: Initialize `@supabase/supabase-js` singleton.
- [x] **Database**: Create `assets` table with strict typing matching our Zod schema.

### 2. 🔄 Data Layer Migration

- [x] **Refactor Service**: Rewrite `AssetService.ts` to replace `localStorage` logic with Supabase queries.
- [x] **Error Handling**: Adapt `handleAsync` to wrap Supabase errors.
- [x] **Verification**: Ensure `useInventory` hook works unchanged (Interface Segregation).

### 3. 🔐 Authentication (Bonus)

- [x] **Auth Context**: Manage user session.
- [x] **Row Level Security (RLS)**: Secure data so users only see their own inventory.

## ✅ Phase 7: Deployment & PWA (Completed)

We have successfully transformed the app into a Production-Ready PWA.

### Executed Tasks

- **[x] PWA Transformation**:
  - Configured `vite-plugin-pwa` for offline capabilities.
  - Added "Industrial Dark" `manifest.json`.
- **[x] UI Polish**:
  - Implemented Grid/List view toggle with `localStorage` persistence.
  - Added Skeleton Loaders and "Shake" Error Alerts.
- **[x] Verification**:
  - 100% Test Coverage (55/55 passed).
  - Clean Production Build (`npm run build`).

### 🚀 Deployment Manual (Vercel)

Follow these steps to go live:

#### 1. Account Setup

1.  Go to [vercel.com](https://vercel.com) and Sign Up.
2.  Choose **"Continue with GitHub"** (easiest way to connect your repo).

#### 2. Project Import

1.  On the Vercel Dashboard, click **"Add New..."** -> **"Project"**.
2.  Find your `inventory-manager` repository and click **"Import"**.

#### 3. Build Configuration

Vercel usually auto-detects Vite, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### 4. Environment Variables (CRITICAL)

Expand the **"Environment Variables"** section and paste your Supabase keys:

| Key                      | Value                           |
| :----------------------- | :------------------------------ |
| `VITE_SUPABASE_URL`      | _Your Supabase Project URL_     |
| `VITE_SUPABASE_ANON_KEY` | _Your Supabase Anon/Public Key_ |

> **Note**: Do not disable "Include in Build" (Vite needs these at build time).

#### 5. Deploy

1.  Click **"Deploy"**.
2.  Wait ~1 minute.
3.  🎉 Your app is live! Vercel will give you a domain (e.g., `plutux-vault.vercel.app`).

## 📦 Phase 8: Data Sovereignty & Auditing (SaaS Foundation)

These features turn the app from a "tool" into a "platform" that businesses can trust.

### 1. 📤 Data Sovereignty (Import/Export)

_Problem: Users fear lock-in or data loss._

- [ ] **Export Module**: Download inventory as JSON/CSV.
- [ ] **Import Module**: Restore inventory from a backup file.
- [ ] **Backup Strategy**: Document how users can keep their own backups.

### 2. 📝 Maintenance Log & Audit Trail

_Problem: "Who changed this?" and "When was this serviced?"_

- [ ] **MaintenanceLog Entity**: Link to `Asset` (Date, Description, Cost, Tech).
- [ ] **History View**: Show timeline of asset changes (Status changes, Edits).

## 🧠 Phase 9: Enterprise Intelligence (Advanced)

Adding high-value "Manager" features that justify a premium tier.

### 1. 📉 Financial Intelligence

_Problem: "What is my inventory worth right now?"_

- [ ] **Depreciation Engine**: Implement Straight-Line Depreciation.
- [ ] **Value Reporting**: Show Purchase Price vs. Current Estimated Value.

### 2. 📍 Location Management & Geo-Tagging

_Problem: "Where is this laptop physically?"_

- [ ] **Location Schema**: Add `location` field (Office A, Warehouse B).
- [ ] **Location Filter**: Filter dashboard by physical site.

### 3. 📸 Advanced QR Workflows

_Problem: "I want to do more than just find things."_

- [ ] **Quick Action**: Scan to instantly toggle status (Check-in/Check-out).
- [ ] **Batch Operations**: Scan multiple items to move them all to a new location.

## 💎 Phase 10: Native Experience (The "App" Feel)

Closing the final gap between Web and Native functionality.

- [ ] **Gestures**: Swipe-to-delete, Drag-and-drop reordering.
- [ ] **Haptics**: Vibration feedback on success/error.
- [ ] **Advanced PWA**:
  - [ ] **Push Notifications**: Server-side VAPID integration for alerts (e.g., "Asset due for maintenance").
  - [ ] **Biometrics**: Integration with FaceID/TouchID for quick login.
  - [ ] **Background Sync**: Offline data queuing and auto-upload when online.
