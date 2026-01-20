import { useState, useEffect, useCallback } from "react";
import { type Asset, type CreateAssetInput } from "../schemas/asset.schema";
import { AssetService } from "../api/asset.service";

export const useInventory = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAssets = useCallback(async () => {
    // Only set loading if not already loading to avoid eager re-renders
    setLoading((l) => (l ? l : true));
    setError(null);

    const [err, data] = await AssetService.getAssets();

    if (err) {
      setError(err.message);
      setAssets([]);
    } else {
      setAssets(data);
    }
    setLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refreshAssets();
  }, []);

  const addAsset = async (input: CreateAssetInput): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const [err, newAsset] = await AssetService.saveAsset(input);

    if (err) {
      setError(err.message);
      setLoading(false);
      return false;
    }

    if (newAsset) {
      setAssets((prev) => [...prev, newAsset]);
    }

    setLoading(false);
    return true;
  };

  const updateAsset = async (
    id: string,
    updates: Partial<Asset>,
  ): Promise<boolean> => {
    // Optimistic update could be done here, but sticking to safe "server" response for now
    const [err, updated] = await AssetService.updateAsset(id, updates);

    if (err) {
      setError(err.message);
      return false;
    }

    if (updated) {
      setAssets((prev) => prev.map((a) => (a.id === id ? updated : a)));
    }

    return true;
  };

  const deleteAsset = async (id: string): Promise<boolean> => {
    const [err] = await AssetService.deleteAsset(id);

    if (err) {
      setError(err.message);
      return false;
    }

    setAssets((prev) => prev.filter((a) => a.id !== id));
    return true;
  };

  return {
    assets,
    loading,
    error,
    refreshAssets,
    addAsset,
    updateAsset,
    deleteAsset,
  };
};
