import { type Asset } from "../../schemas/asset.schema";
import { AssetStatusBadge } from "./AssetStatusBadge";
import { useInventoryContext } from "../../context/InventoryContext";
import { toast } from "sonner";

interface AssetCardProps {
  asset: Asset;
}

export const AssetCard = ({ asset }: AssetCardProps) => {
  const { updateAsset, deleteAsset } = useInventoryContext();

  const handleStatusUpdate = async (id: string, newStatus: Asset["status"]) => {
    const success = await updateAsset(id, { status: newStatus });
    if (success) {
      toast.success(`Status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${asset.name}? This cannot be undone.`,
      )
    ) {
      const success = await deleteAsset(asset.id);
      if (success) {
        toast.success("Asset deleted");
      } else {
        toast.error("Failed to delete asset");
      }
    }
  };

  // Helpers for formatting
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="border border-slate-700 bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow relative group">
      {/* Delete Action (Top Right) */}
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-500 hover:bg-slate-700/50 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Delete Asset"
        aria-label="Delete Asset"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>

      <div className="flex justify-between items-start mb-2 pr-8">
        <div>
          <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
          <p className="text-sm text-slate-400">
            {asset.serialNumber || "No Serial Number"}
          </p>
        </div>
        <AssetStatusBadge
          status={asset.status}
          assetId={asset.id}
          onUpdate={handleStatusUpdate}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Category</p>
          <p className="font-medium capitalize text-slate-200">
            {asset.category}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Value</p>
          <p className="font-medium text-slate-200">
            {formatCurrency(asset.value)}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-slate-400">Purchased</p>
          <p className="font-medium text-slate-200">
            {formatDate(asset.purchaseDate)}
          </p>
        </div>
      </div>
    </div>
  );
};
