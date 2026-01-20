import React, { createContext, useContext } from "react";
import { useInventory } from "../hooks/useInventory";

// Infer return type from the hook for perfect sync
type UseInventoryReturn = ReturnType<typeof useInventory>;

const InventoryContext = createContext<UseInventoryReturn | null>(null);

interface InventoryProviderProps {
  children: React.ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({
  children,
}) => {
  const inventory = useInventory();

  return (
    <InventoryContext.Provider value={inventory}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error(
      "useInventoryContext must be used within an InventoryProvider",
    );
  }

  return context;
};
