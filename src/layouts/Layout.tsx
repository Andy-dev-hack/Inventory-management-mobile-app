import { Navbar } from "../components/ui/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1d1716]">
      <div
        className="fixed inset-0 bg-repeat opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3bc77' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 text-[#f3bc77]">
        <Outlet />
      </main>
      <footer className="bg-[#1d1716] border-t border-[#a55233]/20 py-6 text-center text-sm text-[#f3bc77]/40 relative z-10">
        <p>© 2026 Nexus Inventory. Premium Asset Management.</p>
      </footer>
    </div>
  );
};
