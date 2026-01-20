import { useNavigate } from "react-router-dom";
import { useInventoryContext } from "../context/InventoryContext";
import { AssetForm } from "../components/assets/AssetForm";

export const AddAsset = () => {
  const { addAsset, error } = useInventoryContext();
  const navigate = useNavigate();

  const handleAdd = async (data: any) => {
    await addAsset(data);
    // Navigate back to inventory after successful add
    navigate("/inventory");
  };

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-[#402a23]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-[#a55233]/30">
        <h2 className="text-3xl font-bold mb-2 text-white">Register Asset</h2>
        <p className="text-[#f3bc77]/70 mb-8 border-b border-[#a55233]/30 pb-4">
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
