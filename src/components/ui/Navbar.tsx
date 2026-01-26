import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "./Atoms";

export const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Inventory", href: "/inventory" },
    { name: "Add Asset", href: "/add" },
  ];

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white tracking-tighter">
                Plutux Vault<span className="text-sky-500">.</span>
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-sky-500/10 text-sky-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Desktop User Menu (Logout) */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button removed in favor of BottomNav */}
            {/* We can re-use this space for logout on desktop */}
            <div className="hidden md:flex items-center gap-4">
              {user && (
                <>
                  <span className="text-xs text-slate-500 hidden lg:inline-block">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-xs"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
