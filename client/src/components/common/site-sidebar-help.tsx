import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { collapsedAtom } from "@/jotai/atom";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { Button } from "../ui/button";
import { Icons } from "./icons";

// import ThemeToggle from "./theme-toggle";

export const SidebarHelp: FC = () => {
  // const [collapsed, setCollapsed] = useAtom(collapsedAtom);
  const collapsed = useAtomValue(collapsedAtom);

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0",
        "border-custom-border-200 bg-custom-sidebar-background-100 flex w-full items-center justify-between gap-1 self-baseline border-t",
        !collapsed ? "flex-col py-2" : "px-4 py-2",
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "text-custom-text-200 flex justify-start gap-1 hover:bg-transparent",
              "hover:text-custom-text-100 focus:bg-transparent",
            )}
          >
            <Icons.helpCircle className="h-5 w-5" />
            <span
              className={cn(
                "text-custom-sidebar-text-200",
                !collapsed ? "hidden" : "",
              )}
            >
              Help
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-max p-2">
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-1"
            onClick={() => {
              window.open(
                "https://snc-services.sncformer.com/icsd/",
                "_blank",
                "noopener noreferrer",
              );
            }}
          >
            <span>
              ศูนย์ให้บริการด้านเทคนิคและฟังก์ชั่นการใช้งาน (CoDE Service Desk)
            </span>
            <Icons.externalLink className="h-5 w-5" />
          </Button>
        </PopoverContent>
      </Popover>
      {/* <ThemeToggle /> */}
      {/* <Button
        variant="ghost"
        size="icon"
        className={cn("flex justify-center", "text-custom-text-200")}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <Icons.panelLeftClose className="h-5 w-5" />
        ) : (
          <Icons.panelLeftOpen className="h-5 w-5" />
        )}
      </Button> */}
    </div>
  );
};
