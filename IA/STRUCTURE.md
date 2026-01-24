# Plutux Vault - Project Structure & Flow

## 📂 Directory Map

```
src/
├── api/             # Infrastructure Layer (LocalStorage, APIs)
│   └── asset.service.ts
├── assets/          # Static assets (images, fonts)
├── context/         # 🌍 Global State (InventoryContext)
├── components/
│   ├── assets/      # 📦 Domain Components (AssetCard, InventoryFilters)
│   ├── charts/      # 📊 Data Visualization (CategoryDonutChart)
│   └── ui/          # 🧱 Atomic Components (Navbar, Badge, Button)
├── hooks/           # Business Logic Hooks (useInventory, useAssetFilter)
├── layouts/         # 📐 Page Skeletals (Layout)
├── pages/           # 📱 Route Views (Dashboard, Inventory, AddAsset)
├── schemas/         # 🛡️ Data Types & Validation (Zod)
│   └── asset.schema.ts
└── utils/           # Shared Utilities
    └── handle-async.ts
```

## 🔄 Data Flow Patterns

### 1. Creating Data (The "Defense" Flow)

User Input ➔ **Zod Schema** (Validate & Transform) ➔ **Service** (Save) ➔ **LocalStorage**

- **Rule:** Never send raw input to the service. Validate first.
- **Ids:** Generated automatically by Zod default (`crypto.randomUUID`).

### 2. Reading Data (The "Verify" Flow)

**LocalStorage** ➔ **Service** (Get) ➔ **Zod Schema** (Integrity Check) ➔ **UI**

- **Rule:** Always filter loaded data through `Schema.safeParse`. If external data is corrupted, the UI shouldn't crash.

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

- Use `z.infer<typeof AssetSchema>` for the complete Type.
- Use `z.input<typeof AssetSchema>` for form inputs (allows optionals).
