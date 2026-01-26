# Cloud Migration Plan (Phase 5) - The "Senior Architect" Standard

## Code Analysis & Context

After analyzing `AssetService.ts` and `AssetSchema.ts`, I have confirmed:

1.  **Strict "Go-Style" Pattern**: The app relies heavily on `[error, data] = await ...`. We MUST preserve this signature in the new Supabase service to strictly follow specific user rules on this project.
2.  **Zod Integrity**: The current service runs `AssetSchema.safeParse` on _read_. We will maintain this "Distrust Verify" pattern for Cloud data too.
3.  **Enum Mapping**: `status` and `category` are TypeScript Enums. We must create matching Postgres Enums.

## Goal

Transition "Plutux Vault" to a professional Cloud Architecture (Supabase) while strictly adhering to `PROMPT_AI.md` standards.

## 🏗️ Architectural Pattern: Monorepo "Backend-as-Code"

We will elevate the workspace to manage the full stack.

```
react enero26/                   (Project Root)
├── Inventory_manager/           [FRONTEND]
│   ├── src/
│   │   ├── api/                 (Service Layer - Adapts Supabase to App Domain)
│   │   ├── lib/                 (Supabase Client Singleton)
│   │   └── ...
│   ├── .env
│   └── vite.config.ts
│
└── backend/                     [BACKEND CONFIGURATION]
    ├── migrations/              (SQL Scripts - The Source of Truth)
    │   └── 0000_init_schema.sql
    └── types/                   (Database Definitions)
```

## User Review Required

> [!IMPORTANT]
> **Action**: We will create the `backend` folder structure.
> **Verification**: Do you have a Supabase Project URL & Anon Key ready?

## Detailed Implementation Steps

### 1. 🛡️ Database Engineering (SQL matches Zod)

We will write raw SQL that strictly mirrors the `AssetSchema` in `PROMPT_AI.md`.

#### [NEW] `backend/migrations/01_init_assets.sql`

```sql
-- 1. Create Enums (Matching Zod exactly)
create type asset_category as enum (
  'laptop', 'desktop', 'smartphone', 'tablet', 'monitor',
  'peripheral', 'network', 'server', 'furniture', 'other'
);
create type asset_status as enum ('active', 'maintenance', 'retired', 'lost');

-- 2. Create Table
create table assets (
  id uuid default gen_random_uuid() primary key,
  name text not null check (char_length(name) >= 3), -- Zod min(3)
  serial_number text, -- Snake case in DB (requires mapping)
  category asset_category not null,
  value numeric not null check (value > 0),          -- Zod positive()
  status asset_status default 'active'::asset_status not null,
  purchase_date timestamptz default now() not null,   -- Map to purchaseDate
  created_at timestamptz default now() not null
);

-- 3. Security (RLS)
alter table assets enable row level security;
create policy "Public Access" on assets for all using (true);
```

### 2. 🔌 The "Go-Style" Adapter Pattern

We will normalize `snake_case` (DB) to `camelCase` (App) inside the service.

#### [NEW] `Inventory_manager/src/lib/supabase.ts`

Initialize the client.

#### [MODIFY] `Inventory_manager/src/api/asset.service.ts`

We will replace `localStorage` calls with Supabase calls.

**Critical Adaptation (Mapping):**
Supabase returns `snake_case` (e.g., `serial_number`). Our Zod schema expects `camelCase` (`serialNumber`).

- **Strategy**: We will use a `mapToAsset` helper function inside `getAll` to transform the DB row into a Zod-compliant object BEFORE validation.

```typescript
// Proposed concept for "Defensive" fetching
async getAll(): Promise<AsyncResult<Asset[]>> {
  const { data, error } = await supabase.from('assets').select('*');

  if (error) return [new Error(error.message), null];

  // Transform snake_case -> camelCase
  const transformed = data.map(row => ({
    ...row,
    serialNumber: row.serial_number,
    purchaseDate: row.purchase_date
  }));

  // Verify
  const parsed = z.array(AssetSchema).safeParse(transformed);
  if (!parsed.success) return [new Error("Data Corruption"), null];

  return [null, parsed.data];
}
```

### 3. 🧪 Testing Strategy

- **Unit Tests**: We will create a `__mocks__/supabase.ts` to test the Service Layer without hitting the real network.
- **Integration**: We will verify the `useInventory` hook still works exactly as before.

## Execution Order

1.  **Scaffold**: Create `backend/` folder and SQL file.
2.  **Infrastructure**: Set up `.env` and `src/lib/supabase.ts`.
3.  **Refactor**: Modify `asset.service.ts` to implement the Adapter pattern with CamelCase mapping.
4.  **Verify**: Run the app.
