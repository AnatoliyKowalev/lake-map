"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const DEFAULT_SETTINGS = {
  opacity_2018: 0,
  opacity_2022: 0,
  show_layers: true,
  show_objects: true,
};

type TypeMapFilter = {
  opacity_2018: number;
  opacity_2022: number;
  show_layers: boolean;
  show_objects: boolean;
};

type TypeMapFilterContext = {
  filter: TypeMapFilter;
  updateFilter: (value: Partial<TypeMapFilter>) => void;
};

const MapFilterContext = createContext<TypeMapFilterContext | undefined>(
  undefined
);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<TypeMapFilter>(DEFAULT_SETTINGS);

  const updateFilter = (value: Partial<TypeMapFilter>) =>
    setFilter((prev) => ({
      ...prev,
      ...value,
    }));

  return (
    <MapFilterContext.Provider value={{ filter, updateFilter }}>
      {children}
    </MapFilterContext.Provider>
  );
};

export function useMapFilter() {
  const ctx = useContext(MapFilterContext);
  if (!ctx) throw new Error("useMapFilter must be used within FilterProvider");
  return ctx;
}
