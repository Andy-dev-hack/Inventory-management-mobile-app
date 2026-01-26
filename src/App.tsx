import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { InventoryProvider } from "./context/InventoryContext";
import { Layout } from "./layouts/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { AddAsset } from "./pages/AddAsset";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <InventoryProvider>
      <Toaster position="top-center" richColors theme="dark" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="add" element={<AddAsset />} />
        </Route>
      </Routes>
    </InventoryProvider>
  );
}
