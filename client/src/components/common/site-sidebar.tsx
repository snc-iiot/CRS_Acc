import { collapsedAtom } from "@/jotai/atom";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { WorkspaceSidebarMenu } from "./sidebar-menu";
import { SidebarHelp } from "./site-sidebar-help";

const Sidebar: FC = () => {
  const collapsed = useAtomValue(collapsedAtom);

  return (
    <div
      className={cn(
        "relative inset-y-0 z-20 flex h-full shrink-0 grow-0 flex-col border-r duration-300",
        !collapsed ? "left-0 w-[70px]" : "-left-full w-[250px] md:left-0",
      )}
    >
      <div className={cn("relative flex h-full w-full flex-1 flex-col")}>
        {/* <div
          className={cn(
            "flex w-full items-center justify-between gap-2 px-2",
            // collapsed ? "justify-center" : "justify-center",
          )}
        ></div> */}
        <WorkspaceSidebarMenu isOpen={collapsed} />
        <div className="h-full overflow-y-auto px-4"></div>
        <SidebarHelp />
      </div>
    </div>
  );
};

export default Sidebar;
