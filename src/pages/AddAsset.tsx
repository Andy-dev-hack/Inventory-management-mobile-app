import { useNavigate } from "react-router-dom";
import { useInventoryContext } from "../context/InventoryContext";
import { AssetForm } from "../components/assets/AssetForm";

import type { CreateAssetInput } from "../schemas/asset.schema";

export const AddAsset = () => {
  const { addAsset, error } = useInventoryContext();
  const navigate = useNavigate();

  const handleAdd = async (data: CreateAssetInput) => {
    const success = await addAsset(data);
    if (!success) {
      throw new Error("Failed to save asset");
    }
    // Navigate back to inventory after successful add
    navigate("/inventory");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-slate-800/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700">
        <h2 className="text-3xl font-bold mb-2 text-white">Register Asset</h2>
        <p className="text-slate-400 mb-8 border-b border-slate-700/50 pb-4">
          Enter the details of the new equipment below.
        </p>

        <AssetForm onSubmit={handleAdd} />

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg animate-shake">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};
