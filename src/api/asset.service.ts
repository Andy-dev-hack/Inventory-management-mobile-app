import { AssetSchema, type Asset } from "../schemas/asset.schema";
import { handleAsync, type AsyncResult } from "../utils/handle-async";

const STORAGE_KEY = "nexus_assets_data";

export const AssetService = {
  getAssets: (): AsyncResult<Asset[]> => {
    const fetchAction = new Promise<Asset[]>((resolve) => {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      // Data integrity check: filter out items that don't match our schema
      const validated = data.filter(
        (item: unknown) => AssetSchema.safeParse(item).success,
      );
      resolve(validated);
    });
    return handleAsync(fetchAction);
  },

  saveAsset: async (input: unknown): AsyncResult<Asset> => {
    // Definimos la lógica principal en una función interna o promesa
    const saveAction = (async (): Promise<Asset> => {
      // 1. Validamos (Si falla, safeParse devuelve success: false)
      const result = AssetSchema.safeParse(input);

      if (!result.success) {
        // Lanzamos error para que handleAsync lo capture y lo devuelva en la tupla
        throw new Error(`Validation failed: ${result.error.message}`);
      }

      // 2. Obtenemos actuales (Usamos el patrón de tupla)
      const [err, current] = await AssetService.getAssets();
      if (err) throw err;

      const updated = [...(current || []), result.data];

      // 3. Persistimos
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return result.data;
    })();

    // Retornamos usando el handler universal
    return handleAsync(saveAction);
  },
};
