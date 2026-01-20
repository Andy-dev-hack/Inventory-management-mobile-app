import { useInventoryContext } from "../context/InventoryContext";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const { assets } = useInventoryContext();

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const activeCount = assets.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white/90 drop-shadow-sm">
          Nexus <span className="text-[#a55233]">Inventory</span>
        </h1>
        <p className="mt-2 text-[#f3bc77]/80 text-lg">
          Premium Asset Management System
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#402a23]/60 backdrop-blur-md p-6 rounded-xl border border-[#a55233]/20 hover:border-[#a55233]/50 transition-colors">
          <p className="text-sm text-[#f3bc77]/70 uppercase tracking-widest font-semibold">
            Total Assets
          </p>
          <p className="text-4xl font-bold text-white mt-2">{assets.length}</p>
        </div>

        <div className="bg-[#402a23]/60 backdrop-blur-md p-6 rounded-xl border border-[#a55233]/20 hover:border-[#a55233]/50 transition-colors">
          <p className="text-sm text-[#f3bc77]/70 uppercase tracking-widest font-semibold">
            Total Value
          </p>
          <p className="text-4xl font-bold text-white mt-2">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EUR",
              notation: "compact",
            }).format(totalValue)}
          </p>
        </div>

        <div className="bg-[#402a23]/60 backdrop-blur-md p-6 rounded-xl border border-[#a55233]/20 hover:border-[#a55233]/50 transition-colors">
          <p className="text-sm text-[#f3bc77]/70 uppercase tracking-widest font-semibold">
            Active Assets
          </p>
          <p className="text-4xl font-bold text-white mt-2">{activeCount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Link
          to="/add"
          className="group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1d1716] to-[#402a23] rounded-2xl border border-[#a55233]/30 hover:shadow-2xl hover:shadow-[#a55233]/10 transition-all duration-300"
        >
          <span className="text-2xl mb-2 text-[#f3bc77] group-hover:scale-110 transition-transform">
            ＋
          </span>
          <span className="text-xl font-bold text-white">
            Register New Asset
          </span>
          <p className="text-sm text-gray-400 mt-2">
            Add equipment to your inventory
          </p>
        </Link>

        <Link
          to="/inventory"
          className="group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1d1716] to-[#402a23] rounded-2xl border border-[#a55233]/30 hover:shadow-2xl hover:shadow-[#a55233]/10 transition-all duration-300"
        >
          <span className="text-2xl mb-2 text-[#f3bc77] group-hover:scale-110 transition-transform">
            📋
          </span>
          <span className="text-xl font-bold text-white">View Inventory</span>
          <p className="text-sm text-gray-400 mt-2">
            Search, filter and manage assets
          </p>
        </Link>
      </div>
    </div>
  );
};
