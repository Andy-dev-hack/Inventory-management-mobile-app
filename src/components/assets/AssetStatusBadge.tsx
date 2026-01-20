import { type Asset } from "../../schemas/asset.schema";
import { Badge, type BadgeVariant } from "../ui/Badge";

interface AssetStatusBadgeProps {
  status: Asset["status"];
}

export const AssetStatusBadge = ({ status }: AssetStatusBadgeProps) => {
  // Logic: Map Business Status -> Visual Variant
  const getVariant = (status: Asset["status"]): BadgeVariant => {
    switch (status) {
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

  return <Badge variant={getVariant(status)}>{status}</Badge>;
};
