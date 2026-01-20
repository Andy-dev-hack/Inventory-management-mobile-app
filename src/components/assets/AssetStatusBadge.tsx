import { type Asset } from "../../schemas/asset.schema";
import { Badge, type BadgeVariant } from "../ui/Badge";

interface AssetStatusBadgeProps {
  status: Asset["status"];
}

export const AssetStatusBadge = ({
  assetId,
  status,
  onUpdate,
}: {
  assetId?: string;
  status: Asset["status"];
  onUpdate?: (id: string, newStatus: Asset["status"]) => void;
}) => {
  // Logic: Map Business Status -> Visual Variant
  const getVariant = (s: Asset["status"]): BadgeVariant => {
    switch (s) {
      case "active":
        return "success";
      case "maintenance":
        return "warning";
      case "lost":
        return "destructive";
      case "retired":
      default:
        return "default";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onUpdate && assetId) {
      onUpdate(assetId, e.target.value as Asset["status"]);
    }
  };

  if (!onUpdate || !assetId) {
    return <Badge variant={getVariant(status)}>{status}</Badge>;
  }

  return (
    <div className="relative group cursor-pointer">
      <Badge variant={getVariant(status)}>{status}</Badge>
      <select
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={status}
        onChange={handleChange}
        title="Change Status"
      >
        <option value="active">Active</option>
        <option value="maintenance">Maintenance</option>
        <option value="retired">Retired</option>
        <option value="lost">Lost</option>
      </select>
    </div>
  );
};
