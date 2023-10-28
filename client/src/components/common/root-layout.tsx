import { Header } from "@/components/common/site-heder";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./site-sidebar";

const RootLayout: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="relative flex h-full w-full flex-col overflow-hidden">
        <Header
          left={
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => navigate("/")}
            >
              <img
                src="/assets/images/logo.webp"
                alt="SNC Logo"
                width={230}
                height={230}
                className="h-auto w-[5.5rem]"
              />
              <Separator
                orientation="vertical"
                className="h-[2rem] bg-foreground"
              />
              <div className="flex flex-col">
                <p className="text-sm font-bold">CARBON TRADING SYSTEM (CTS)</p>
                <p className="text-xs text-muted-foreground">
                  Powered by The Center of Digital Expertise (CoDE)
                </p>
              </div>
            </div>
          }
        />
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
