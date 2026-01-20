import { AssetSchema, type Asset } from "../schemas/asset.schema";
import { handleAsync, type AsyncResult } from "../utils/handle-async";

const STORAGE_KEY = "plutux_vault_assets_data";

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

  updateAsset: async (
    id: string,
    updates: Partial<Asset>,
  ): AsyncResult<Asset> => {
    const updateAction = (async (): Promise<Asset> => {
      const [err, current] = await AssetService.getAssets();
      if (err) throw err;

      const assets = current || [];
      const index = assets.findIndex((a) => a.id === id);

      if (index === -1) {
        throw new Error(`Asset with ID ${id} not found`);
      }

      // Merge existing asset with updates
      // Important: We validate the MERGED object to ensure consistency
      const rawUpdated = { ...assets[index], ...updates };
      const validation = AssetSchema.safeParse(rawUpdated);

      if (!validation.success) {
        throw new Error(`Validation failed: ${validation.error.message}`);
      }

      const updatedAsset = validation.data;
      assets[index] = updatedAsset;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));

      return updatedAsset;
    })();

    return handleAsync(updateAction);
  },

  deleteAsset: async (id: string): AsyncResult<boolean> => {
    const deleteAction = (async (): Promise<boolean> => {
      const [err, current] = await AssetService.getAssets();
      if (err) throw err;

      const assets = current || [];
      const filtered = assets.filter((a) => a.id !== id);

      if (filtered.length === assets.length) {
        throw new Error(`Asset with ID ${id} not found`);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    })();

    return handleAsync(deleteAction);
  },
};
