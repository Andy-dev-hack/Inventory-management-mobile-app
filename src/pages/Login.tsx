import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";
import { Input, Button } from "../components/ui/Atoms";
import { LoginSchema } from "../schemas/auth.schema";
import { useAuth } from "../context/AuthContext";

type Mode = "login" | "signup";

export const Login = () => {
  const { user, refreshSession } = useAuth(); // <--- Hook into context
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Declarative Redirect: Only move when we actually HAVE the user
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validate Input (Zod)
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    // 2. Perform Auth Action
    if (mode === "signup") {
      const { error, data } = await supabase.auth.signUp({ email, password });

      if (error) {
        toast.error(error.message);
      } else if (data.user && !data.session) {
        // Email confirmation required case
        toast.success("Account created! Please check your email to confirm.");
        setMode("login");
      } else {
        // Auto-login (if email confirm disabled)
        toast.success("Account created! Logging in...");
        await refreshSession();
      }
    } else {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        await refreshSession();
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-8 shadow-xl backdrop-blur-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white">
            Plutux Vault<span className="text-sky-500">.</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login"
              ? "Sign in to manage your inventory"
              : "Create a secure account"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@plutux.com"
              autoComplete="email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-slate-400 hover:text-sky-400 transition-colors"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setEmail("");
              setPassword("");
            }}
          >
            {mode === "login"
              ? "No account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
