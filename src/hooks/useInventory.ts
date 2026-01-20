import { useState, useEffect, useCallback } from "react";
import { type Asset, type CreateAssetInput } from "../schemas/asset.schema";
import { AssetService } from "../api/asset.service";

export const useInventory = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAssets = useCallback(async () => {
    setLoading(true);
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
    refreshAssets();
  }, [refreshAssets]);

  const addAsset = async (input: CreateAssetInput) => {
    setLoading(true);
    setError(null);

    const [err, newAsset] = await AssetService.saveAsset(input);

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    if (newAsset) {
      // Optimistic update or just append?
      // Since we simulate a backend that saves to localStorage,
      // we can just append, but to be safe and sync with "DB",
      // we could re-fetch. But for performance in this specific
      // localStorage context, appending is fine as long as
      // saveAsset returns the fully created object (with ID).
      setAssets((prev) => [...prev, newAsset]);
    }

    setLoading(false);
  };

  return {
    assets,
    loading,
    error,
    refreshAssets,
    addAsset,
  };
};
