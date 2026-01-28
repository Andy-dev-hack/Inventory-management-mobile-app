# Plutux Vault - Project Structure & Flow

## 📂 Directory Map

```
react enero26/           (Root)
├── backend/             # 🗄️ Backend Configuration (Supabase)
│   └── migrations/      # SQL Source of Truth
│       ├── 01_init_assets.sql
│       └── 02_auth_rls.sql  # 🔐 Auth & Row Level Security
├── Inventory_manager/   (Frontend)
│   ├── public/          # 📦 PWA Assets (Icons, Manifest)
│   ├── src/
│   │   ├── api/         # Infrastructure Layer (Supabase Adapters)
│   │   │   └── asset.service.ts
│   │   ├── lib/         # 🔌 External Clients
│   │   │   └── supabase.ts
│   │   ├── assets/      # Static assets
│   │   ├── context/     # 🌍 Global State
│   │   │   ├── AuthContext.tsx       # 🔐 User Session & RLS
│   │   │   └── InventoryContext.tsx  # 📦 Asset State
│   │   ├── components/  # 🧩 UI Components
│   │   │   ├── auth/    # 🔒 Protected Routes
│   │   │   ├── ui/      # ⚛️ Atoms (Navbar, BottomNav)
│   │   │   └── assets/  # 📋 Business Components
│   │   ├── hooks/       # 🎣 Business Logic
│   │   ├── pages/       # 📱 Routes
│   │   │   ├── Login.tsx  # 🔑 Auth Entry Point
│   │   │   ├── Inventory.tsx      # 📋 List/Grid View
│   │   │   ├── Inventory.test.tsx # ✅ UI Logic Tests
│   │   │   └── ...
│   │   ├── schemas/     # 🛡️ Zod Schemas (The Authority)
│   │   │   ├── asset.schema.ts

│   │   │   └── auth.schema.ts
│   │   └── utils/       # 🛠️ Helpers
```

## 🔄 Data Flow Patterns

### 1. Creating Data (The "Adapter" Flow)

User Input ➔ **Zod Schema** (Validate) ➔ **Service** (Map to Snake Case) ➔ **Supabase** (Persist)

- **Rule:** The App speaks `camelCase`. The DB speaks `snake_case`. The Service Layer handles the translation.
- **Safety:** We normalize all Dates to strict ISO strings (`...Z`) before sending.

### 2. Reading Data (The "Defensive" Flow)

**Supabase** (JSON) ➔ **Service** (Map to Camel Case) ➔ **Zod Schema** (Safe Parse) ➔ **UI**

- **Rule:** Trust No One. Even DB data is validated against the Schema.
- **Resilience:** If a row is corrupted, it is skipped (logged), preventing a full app crash.

### 3. Authentication Flow (The "Secure" Flow)

**User** (Login) ➔ **Supabase Auth** (JWT) ➔ **AuthContext** (State) ➔ **ProtectedRoute** (Gatekeeper)

- **Security:** RLS Policies in Postgres ensure data isolation at the engine level.
- **Rotation:** Session tokens are automatically rotated by the Supabase client.

## 🛠️ Key Utilities

### `handleAsync<T>`

Wraps Promises to avoid `try/catch` hell.

```typescript
const [error, data] = await handleAsync(promise);
if (error) return handleError(error);
return data;
```

### `AssetSchema`

The single source of truth for an Asset.

- Use `z.input<typeof AssetSchema>` for form inputs (allows optionals).

## 🚀 Deployment & PWA

### Build Pipeline

**Vite** ➔ **dist/** (Static Files) ➔ **Service Worker** (Precache)

- **Manifest**: `vite-plugin-pwa` generates `pro-manifest.webmanifest`.
- **Offline**: Service Worker caches app shell (HTML/JS/CSS).
- **Hosting**: Deployed as SPA (Single Page App) to Vercel/Netlify.
