import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { collapsedAtom } from "@/jotai/atom";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "./icons";
import { WorkspaceSidebarMenu } from "./sidebar-menu";
import { SidebarHelp } from "./site-sidebar-help";

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const collapsed = useAtomValue(collapsedAtom);

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-20 flex h-full shrink-0 grow-0 flex-col border-r duration-300 md:relative",
        !collapsed ? "left-0" : "-left-full md:left-0",
      )}
    >
      <div className={cn("flex h-full w-full flex-1 flex-col")}>
        <div
          className={cn(
            "flex w-full items-center justify-between gap-2 px-2 pt-4",
            collapsed ? "justify-center" : "justify-center",
          )}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "group flex items-center justify-start gap-2.5",
                  collapsed ? "w-full justify-start" : "w-full justify-center",
                )}
              >
                <Avatar className="h-6 w-6 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 uppercase">
                    A
                  </AvatarFallback>
                </Avatar>
                {collapsed && (
                  <p className="text-sm font-semibold uppercase">
                    Anuwat Thisuka
                  </p>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="start"
              className={cn("w-80")}
            >
              <DropdownMenuLabel>
                <p className="text-sm font-semibold">Anuwat Thisuka</p>
                <p className="text-xs text-gray-400">
                  Anuwat_Thisuka@gmail.com
                </p>
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/settings/profile");
                }}
              >
                <Icons.userCircle2 className="h-5 w-5" />
                <p className="ml-2">
                  <span className="font-semibold">Profile</span>
                  <span className="text-xs text-gray-400">
                    {" "}
                    &middot; View your profile
                  </span>
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate("/settings");
                }}
              >
                <Icons.settings className="h-5 w-5" />
                <p className="ml-2">
                  <span className="font-semibold">Settings</span>
                  <span className="text-xs text-gray-400">
                    {" "}
                    &middot; Manage your account settings
                  </span>
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.logOut className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-red-500">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <WorkspaceSidebarMenu isOpen={collapsed} />
        <div className="h-full overflow-y-auto px-4"></div>
        <SidebarHelp />
      </div>
    </div>
  );
};
