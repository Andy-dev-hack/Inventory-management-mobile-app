import { useInventoryContext } from "../context/InventoryContext";
import { Link } from "react-router-dom";
import { CategoryDonutChart } from "../components/charts/CategoryDonutChart";

export const Dashboard = () => {
  const { assets } = useInventoryContext();

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const activeCount = assets.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white/90 drop-shadow-sm">
          Plutux <span className="text-sky-500">Vault</span>
        </h1>
        <p className="mt-2 text-slate-400 text-lg">
          Premium Asset Management System
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors">
          <p className="text-sm text-sky-500/80 uppercase tracking-widest font-semibold">
            Total Assets
          </p>
          <p className="text-4xl font-bold text-white mt-2">{assets.length}</p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors">
          <p className="text-sm text-sky-500/80 uppercase tracking-widest font-semibold">
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

        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700 hover:border-sky-500/50 transition-colors">
          <p className="text-sm text-sky-500/80 uppercase tracking-widest font-semibold">
            Active Assets
          </p>
          <p className="text-4xl font-bold text-white mt-2">{activeCount}</p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700">
          {/* Chart */}
          <CategoryDonutChart assets={assets} />
        </div>
        {/* Placeholder for future History Chart or Recent Activity */}
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-xl border border-slate-700 flex items-center justify-center">
          <p className="text-slate-500 italic">Recent Activity (Coming Soon)</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link
          to="/add"
          className="group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group-hover:border-sky-500/30"
        >
          <span className="text-2xl mb-2 text-sky-500 group-hover:scale-110 transition-transform">
            ＋
          </span>
          <span className="text-xl font-bold text-white">
            Register New Asset
          </span>
          <p className="text-sm text-slate-400 mt-2">
            Add equipment to your inventory
          </p>
        </Link>

        <Link
          to="/inventory"
          className="group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 group-hover:border-sky-500/30"
        >
          <span className="text-2xl mb-2 text-sky-500 group-hover:scale-110 transition-transform">
            📋
          </span>
          <span className="text-xl font-bold text-white">View Inventory</span>
          <p className="text-sm text-slate-400 mt-2">
            Search, filter and manage assets
          </p>
        </Link>
      </div>
    </div>
  );
};
