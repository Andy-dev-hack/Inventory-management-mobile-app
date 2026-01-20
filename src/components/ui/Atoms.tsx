import React from "react";

// --- INPUT ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="relative group">
        <input
          ref={ref}
          className={`peer block w-full appearance-none rounded-lg border bg-slate-800/50 px-4 pb-2.5 pt-5 text-sm text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50 ${
            error ? "border-red-500" : "border-slate-700"
          } ${className}`}
          placeholder=" " // required for peer-placeholder-shown
          {...props}
        />
        <label
          htmlFor={props.id}
          className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 ${
            error ? "text-red-400" : "text-slate-400 peer-focus:text-sky-500"
          }`}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

// --- SELECT ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="relative group">
        <select
          ref={ref}
          className={`peer block w-full appearance-none rounded-lg border bg-slate-800/50 px-4 pb-2.5 pt-5 text-sm text-slate-200 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:opacity-50 ${
            error ? "border-red-500" : "border-slate-700"
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-slate-800 text-slate-200"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={props.id}
          className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 ${
            error ? "text-red-400" : "text-slate-400 peer-focus:text-sky-500"
          }`}
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);
Select.displayName = "Select";

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = "primary", isLoading, className = "", ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-sky-600 to-sky-500 text-white hover:brightness-110 focus:ring-sky-500 shadow-sky-500/20",
      secondary:
        "bg-slate-800 text-sky-400 hover:bg-slate-700 focus:ring-slate-500 border border-slate-700",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      ghost:
        "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 shadow-none",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
        ) : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
