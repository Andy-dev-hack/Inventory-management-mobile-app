import { Navbar } from "../components/ui/Navbar";
import { BottomNav } from "../components/ui/BottomNav";
import { FloatingActionButton } from "../components/ui/FloatingActionButton";
import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  // Don't show FAB on the "Add Asset" page itself
  const showFab = location.pathname !== "/add";

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 pb-16 md:pb-0">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 text-slate-200">
        <Outlet />
      </main>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-slate-900 border-t border-slate-700 py-6 text-center text-sm text-slate-500 relative z-10">
        <p>© 2026 Plutux Vault. Premium Asset Management.</p>
      </footer>

      {/* Mobile Navigation */}
      <BottomNav />
      {showFab && <FloatingActionButton />}
    </div>
  );
};
