import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { collapsedAtom } from "@/jotai/atom";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icons } from "./icons";
import { Header } from "./site-header";
import Sidebar from "./site-sidebar";
import ThemeToggle from "./theme-toggle";

const RootLayout: FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useAtom(collapsedAtom);

  function resetAtom() {
    setCollapsed(false);
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <main className="relative flex h-full w-full flex-col overflow-hidden">
        <Header
          left={
            <div className="flex items-center">
              <div
                className="grid h-[40px] w-[45px] cursor-pointer place-items-center delay-200 hover:rounded-full hover:bg-primary-foreground"
                onClick={() => setCollapsed(!collapsed)}
              >
                <Icons.menu className="text-gray-500" />
              </div>
              <div
                className="flex cursor-pointer items-center gap-x-2"
                onClick={() => navigate("//")}
              >
                <img
                  src="/images/logo.webp"
                  alt="SNC Logo"
                  width={230}
                  height={230}
                  className="h-auto w-[5.5rem] select-none"
                />
                <Separator
                  orientation="vertical"
                  className="h-[2rem] bg-foreground"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-bold">
                    CUSTOMER REGISTRATION SYSTEM
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Powered by The Center of Digital Expertise (CoDE)
                  </p>
                </div>
              </div>
            </div>
          }
          right={
            <div className="flex items-center gap-2">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div
                      className={cn(
                        "group flex cursor-pointer items-center justify-start gap-2.5",
                      )}
                    >
                      <Avatar className="h-6 w-6 cursor-pointer">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 uppercase">
                          {"Administrator".at(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-semibold uppercase">
                        {"Administrator"}
                      </p>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    align="start"
                    className={cn("w-72")}
                  >
                    <DropdownMenuLabel>
                      <p className="text-sm font-semibold">
                        {"admin@mail.com"}
                      </p>
                      <p className="text-xs text-gray-400">{"Administrator"}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/settings/profile");
                      }}
                    >
                      <Icons.userCircle2 className="h-5 w-5" />
                      <p className="ml-2">Profile</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/settings");
                      }}
                    >
                      <Icons.settings className="h-5 w-5" />
                      <p className="ml-2">Settings</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem("auth");
                        resetAtom();
                        navigate("/login");
                      }}
                    >
                      <Icons.logOut className="h-5 w-5 text-red-500" />
                      <p className="ml-2 text-red-500">Logout</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ThemeToggle />
            </div>
          }
        />
        <div className="flex h-full">
          <Sidebar />
          <div className="w-full p-2">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
