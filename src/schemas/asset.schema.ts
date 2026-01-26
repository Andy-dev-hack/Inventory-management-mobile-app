import { z } from "zod";

export const AssetSchema = z.object({
  // UUID generado automáticamente si no existe (ideal para LocalStorage)
  id: z.uuid().default(() => globalThis.crypto.randomUUID()),

  // Owner ID (Supabase Auth)
  userId: z.string().uuid().optional(),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),

  // Campo opcional para nº de serie
  serialNumber: z.string().optional(),

  // Categoría cerrada para filtrar fácilmente después
  category: z.enum([
    "laptop",
    "desktop",
    "smartphone",
    "tablet",
    "monitor",
    "peripheral",
    "network",
    "server",
    "furniture",
    "other",
  ]),

  value: z.number().positive("Value must be positive"),

  status: z
    .enum(["active", "maintenance", "retired", "lost"])
    .default("active"),

  purchaseDate: z
    .string()
    .datetime()
    .default(() => new Date().toISOString()),
});

// Tipos inferidos
export type Asset = z.infer<typeof AssetSchema>;

// Para el formulario, usamos un "Partial" o "Omit" del Asset
// Pero gracias al .default(), podemos usar el mismo esquema para validar la entrada del form.
export type CreateAssetInput = z.input<typeof AssetSchema>;
