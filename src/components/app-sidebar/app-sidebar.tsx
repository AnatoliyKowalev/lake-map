import React, { FC } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import Filter from "@/components/map-kanvas/filter";

const AppSidebar: FC = () => {
  return (
    <Sidebar>
      <SidebarContent className="p-4">
        <Filter />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
