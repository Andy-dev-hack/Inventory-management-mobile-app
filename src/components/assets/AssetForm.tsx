import { useState } from "react";
import { AssetSchema, type CreateAssetInput } from "../../schemas/asset.schema";
import { Input, Select, Button } from "../ui/Atoms";

interface AssetFormProps {
  onSubmit: (data: CreateAssetInput) => void;
}

export const AssetForm = ({ onSubmit }: AssetFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Tiny delay to show off the loading state in a real app context
    // await new Promise(r => setTimeout(r, 500));

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const processedData = {
      ...data,
      value: Number(data.value),
      purchaseDate:
        data.purchaseDate === ""
          ? undefined
          : new Date(data.purchaseDate as string).toISOString(),
      status: data.status || undefined,
    };

    const result = AssetSchema.safeParse(processedData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    setErrors({});
    await onSubmit(result.data);
    form.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <Input
        label="Asset Name"
        name="name"
        id="name"
        type="text"
        placeholder="e.g. MacBook Pro"
        error={errors.name}
      />

      <Input
        label="Serial Number (Optional)"
        name="serialNumber"
        id="serialNumber"
        type="text"
        placeholder="SN-123456"
        error={errors.serialNumber}
      />

      <Select
        label="Category"
        name="category"
        id="category"
        error={errors.category}
        defaultValue="electronics"
        options={[
          { value: "electronics", label: "Electronics" },
          { value: "furniture", label: "Furniture" },
          { value: "vehicles", label: "Vehicles" },
          { value: "other", label: "Other" },
        ]}
      />

      <Input
        label="Value (EUR)"
        name="value"
        id="value"
        type="number"
        step="0.01"
        placeholder="0.00"
        error={errors.value}
      />

      <Select
        label="Status"
        name="status"
        id="status"
        error={errors.status}
        defaultValue="active"
        options={[
          { value: "active", label: "Active" },
          { value: "maintenance", label: "Maintenance" },
          { value: "retired", label: "Retired" },
          { value: "lost", label: "Lost" },
        ]}
      />

      <Input
        label="Purchase Date"
        name="purchaseDate"
        id="purchaseDate"
        type="date"
        defaultValue={new Date().toISOString().split("T")[0]}
        error={errors.purchaseDate}
      />

      <div className="pt-2">
        <Button type="submit" isLoading={loading} className="w-full">
          Register Asset
        </Button>
      </div>
    </form>
  );
};
