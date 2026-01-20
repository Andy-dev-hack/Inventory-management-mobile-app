import { useRef, useState } from "react";
import { AssetSchema, type CreateAssetInput } from "../../schemas/asset.schema";
import { Input, Select, Button } from "../ui/Atoms";
import { ScanModal } from "../ui/ScanModal";
import { toast } from "sonner";

interface AssetFormProps {
  onSubmit: (data: CreateAssetInput) => void;
}

export const AssetForm = ({ onSubmit }: AssetFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const serialInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
      toast.error("Please fix the errors in the form.");
      return;
    }

    const form = e.currentTarget;
    setErrors({});

    try {
      await onSubmit(result.data);
      toast.success("Asset registered successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save asset.");
    } finally {
      setLoading(false);
    }
  };

  const handleScan = (code: string) => {
    if (serialInputRef.current) {
      serialInputRef.current.value = code;
      toast.success(`Scanned: ${code}`);
    }
    setIsScanOpen(false);
  };

  const handleScanError = (error: unknown) => {
    console.error("Scan error:", error);
    toast.error("Could not access camera. Ensure you are on HTTPS.");
    setIsScanOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <Input
          label="Asset Name"
          name="name"
          id="name"
          type="text"
          placeholder="e.g. MacBook Pro"
          error={errors.name}
        />

        <div className="flex gap-2 items-start">
          <div className="flex-grow">
            <Input
              ref={serialInputRef}
              label="Serial Number (Optional)"
              name="serialNumber"
              id="serialNumber"
              type="text"
              placeholder="SN-123456"
              error={errors.serialNumber}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsScanOpen(true)}
            className="mt-1 p-3.5 bg-slate-800 border border-slate-700 rounded-lg text-sky-500 hover:bg-slate-700 hover:text-sky-400 transition-colors focus:ring-2 focus:ring-sky-500 focus:outline-none"
            aria-label="Scan Serial Number"
            title="Scan QR Code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 17h.01M9 20h.01M12 14h.01M15 11h.01M12 12h.01M9 17h.01M4 17h6m4 0h2M9 10h.01M15 21v-4m-6 4v-4m-6-1v1a3 3 0 003 3h1a3 3 0 003-3v-1m0-1v1a3 3 0 003 3h1a3 3 0 003-3v-1m-10 6v-7a2 2 0 012-2h10a2 2 0 012 2v7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18"
                opacity="0.3"
              />
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="4"
                strokeWidth="2"
                opacity="0.5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 12h4m-2-2v4"
              />
            </svg>
          </button>
        </div>

        <Select
          label="Category"
          name="category"
          id="category"
          error={errors.category}
          defaultValue="laptop"
          options={[
            { value: "laptop", label: "Laptop" },
            { value: "desktop", label: "Desktop" },
            { value: "smartphone", label: "Smartphone" },
            { value: "tablet", label: "Tablet" },
            { value: "monitor", label: "Monitor" },
            { value: "peripheral", label: "Peripheral" },
            { value: "network", label: "Network Equipment" },
            { value: "server", label: "Server" },
            { value: "furniture", label: "Furniture" },
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

      <ScanModal
        isOpen={isScanOpen}
        onScan={handleScan}
        onError={handleScanError}
        onClose={() => setIsScanOpen(false)}
      />
    </>
  );
};
