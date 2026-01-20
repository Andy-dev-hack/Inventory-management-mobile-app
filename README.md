# 📦 Nexus Inventory

**Nexus Inventory** is a premium, mobile-first asset management application built with **React 19**, **TypeScript**, and **"Senior Engineer" architectural standards**.

It is designed to demonstrate a robust, scalable frontend architecture without the complexity of a backend, utilizing a Service Layer pattern over `localStorage`.

![Nexus Inventory Banner](https://placehold.co/1200x400/0f172a/3b82f6?text=Nexus+Inventory)

## 🌟 Key Features

- **🛡️ Type-Safe Core**: Built with **Zod** schema validation. No data enters the state without validation.
- **📱 Mobile-First Design**: Industrial Dark theme (`Slate-900`), touch-friendly targets, and glassmorphism UI.
- **⚡ Zero-Backend**: Uses a `Service Layer` pattern to mimic an async API using `localStorage`.
- **🧩 Atomic Design**: Reusable `Atoms` (Inputs, Buttons) and `Molecules` (Cards) for a consistent UI.
- **🔍 Advanced Filtering**: Real-time filtering by category and status using optimized Hooks.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite.
- **Styling**: Tailwind CSS 4.0.
- **State**: React Context API + Custom Hooks.
- **Validation**: Zod 4.x.
- **Testing**: Vitest + React Testing Library (100% Logic Coverage).
- **Routing**: React Router DOM 7.

## 🏗️ Project Structure

The project follows a "Clean Architecture" approach allows for easy scaling:

```bash
src/
├── api/             # Infrastructure (Simulated Backend)
├── components/      # UI Library
│   ├── ui/          # Atoms (Button, Input, Badge)
│   └── assets/      # Business Logic (AssetCard, AssetForm)
├── context/         # Global State Providers
├── hooks/           # Custom Business Hooks
├── layouts/         # Page Layouts (Navbar, Footer)
├── pages/           # Route Views (Dashboard, Inventory)
├── schemas/         # Data Models (Zod)
└── utils/           # Helpers (handleAsync)
```

## 🚀 Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/nexus-inventory.git
    cd nexus-inventory
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run Development Server**:

    ```bash
    npm run dev
    ```

4.  **Run Tests**:
    ```bash
    npm test
    ```

## 🧪 Testing Strategy

We adhere to a generic testing strategy:

- **Unit Tests**: For every Hook and Utility.
- **Component Tests**: Verifying UI interactions (Forms, Cards).
- **Integration Tests**: Verifying full page flows (`App.test.tsx`).

## 🔮 Roadmap

- [x] Phase 1: Core Architecture & Logic
- [x] Phase 2: React Router & Dashboard
- [ ] **Phase 3**: Visual Overhaul (Industrial Theme & Mobile)
- [ ] **Phase 4**: QR Scanner & Analytics
- [ ] **Phase 5**: Cloud Migration (Supabase)

---

Built with ❤️ by AndyDev using the **Antigravity AI Agent**.
# Inventory-management-mobile-app
