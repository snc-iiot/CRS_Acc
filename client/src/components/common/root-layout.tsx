import { Header } from "@/components/common/site-heder";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "./theme-toggle";

const RootLayout: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-screen w-full overflow-hidden">
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
                className="h-[2rem] bg-primary"
              />
              <div className="flex flex-col text-primary">
                <p className="text-sm font-bold">
                  CUSTOMER REGISTRATION SYSTEM
                </p>
                <p className="text-xs">
                  Powered by The Center of Digital Expertise (CoDE)
                </p>
              </div>
            </div>
          }
          right={<ThemeToggle />}
        />
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
