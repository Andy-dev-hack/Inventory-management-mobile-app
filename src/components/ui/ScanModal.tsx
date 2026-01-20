import { Scanner } from "@yudiel/react-qr-scanner";
import { useEffect } from "react";

interface ScanModalProps {
  isOpen: boolean;
  onScan: (result: string) => void;
  onError?: (error: unknown) => void; // Made optional to simplify usage
  onClose: () => void;
}

export const ScanModal = ({
  isOpen,
  onScan,
  onError,
  onClose,
}: ScanModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b border-slate-700">
          <h3 className="text-lg font-bold text-white">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
            aria-label="Close Scanner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scanner Area */}
        <div className="flex-1 bg-black relative aspect-square">
          <Scanner
            onScan={(result) => {
              if (result && result.length > 0) {
                onScan(result[0].rawValue);
              }
            }}
            onError={(error) => {
              if (onError) onError(error);
            }}
            /* Clean UI options */
            components={{
              onOff: false,
              torch: true,
              zoom: false,
              finder: true,
            }}
            styles={{
              container: { width: "100%", height: "100%" },
            }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-800 text-center">
          <p className="text-sm text-slate-400">
            Point camera at a barcode or QR code
          </p>
        </div>
      </div>
    </div>
  );
};
