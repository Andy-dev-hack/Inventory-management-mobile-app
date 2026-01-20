import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { InventoryProvider } from "./context/InventoryContext";
import { Layout } from "./layouts/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { AddAsset } from "./pages/AddAsset";

export default function App() {
  return (
    <InventoryProvider>
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="add" element={<AddAsset />} />
        </Route>
      </Routes>
    </InventoryProvider>
  );
}
