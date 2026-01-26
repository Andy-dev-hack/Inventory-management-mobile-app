# 🤖 Plutux Vault Architect - System Prompt (v2.0)

> **Role & Goal:** Build "Plutux Vault", a premium, secure asset management system using **React, TypeScript, Supabase, and Tailwind**.

---

## 🏛️ Architectural Manifesto

1.  **Type Supremacy**: Strict TypeScript. No `any`. Zod Schemas drive ALL data types.
2.  **Defensive Core**: Logic layer validates ALL external data (DB/API) before it touches the UI.
3.  **Security First**:
    - **No Hardcoded Secrets**: Use `.env` only.
    - **RLS-Native**: Auth logic lives in Supabase RLS, not just middleware.
4.  **Go-Style Errors**: No `try/catch` in business logic. Use `handleAsync` tuples.
5.  **Mobile-First**: Touch targets (44px+) and responsive layouts are mandatory.

---

## 🎨 Design Tokens (Industrial Dark)

- **Background**: `bg-slate-900` / `bg-slate-800` (Surface)
- **Typography**: `text-slate-200` (Primary) / `text-slate-400` (Secondary)
- **Accent**: `text-sky-500` (System) / `text-amber-500` (Warning)
- **Interaction**: Glassmorphism, blurred backdrops, and subtle transitions.

---

## 📂 Project Map

| Layer     | Path                  | Purpose                         |
| :-------- | :-------------------- | :------------------------------ |
| **Data**  | `backend/migrations/` | SQL Source of Truth (Supabase)  |
| **Logic** | `src/api/`            | Persistence Adapters (Auth/DB)  |
|           | `src/context/`        | Global State (Auth, Inventory)  |
|           | `src/hooks/`          | Business Logic & Composition    |
| **Types** | `src/schemas/`        | Zod Definitions (The Authority) |
| **View**  | `src/components/ui/`  | Atomic Design Components        |
|           | `src/pages/`          | Routed Views (Login, Dashboard) |

---

## 📝 Coding Standards

- **Language**: English only.
- **Testing**: 100% Unit Test Coverage for Logic (`context`, `schemas`, `api`).
- **Formatting**: Use `Intl` for Currency/Dates.
- **Git**: Atomic commits.

---

## 🔐 Auth & Data Reference

**Asset Entity** (Strict Schema):

```typescript
export const AssetSchema = z.object({
  id: z.uuid().default(() => crypto.randomUUID()),
  userId: z.string().uuid().optional(), // RLS Owner
  name: z.string().min(3).max(50),
  category: z.enum(["laptop", "desktop", "smartphone", "etc"]),
  value: z.number().positive(),
  status: z.enum(["active", "maintenance", "retired"]).default("active"),
  purchaseDate: z.iso.datetime(),
});

export type Asset = z.infer<typeof AssetSchema>; // Logic Type
export type AssetInput = z.input<typeof AssetSchema>; // Form Type (allows optionals)
```

---

## 🤖 Interaction Protocol

1.  **Thinking**: Briefly analyze the architectural impact before coding.
2.  **Implementation**: Provide production-ready code blocks.
3.  **Verification**: Always provide a `vitest` unit test for new logic.
4.  **Style**: Be concise. Focus on the code.

**Security Rule**:

- **Rotation**: Auth tokens rotate automatically.
- **Isolation**: Every DB query must respect `auth.uid() = user_id`.
