import AppSidebar from "@/components/app-sidebar";
import MapKanvas from "@/components/map-kanvas/map-kanvas";
import { FilterProvider } from "@/contexts/map-filter";

export default function Home() {
  return (
    <FilterProvider>
      <div className="min-h-screen flex flex-row container px-4">
        <AppSidebar />
        <MapKanvas />
      </div>
    </FilterProvider>
  );
}
