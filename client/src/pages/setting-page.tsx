import { FadeIn } from "@/components/common/framer-motion";
import { Icons } from "@/components/common/icons";
import { Separator } from "@/components/ui/separator";
import { settingsConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

const SettingPage: FC = () => {
  return (
    <FadeIn>
      <div className="relative h-full w-full">
        <main className="h-full w-full flex-col space-y-4">
          <section className="flex flex-col">
            <h1 className="text-xl font-bold">ตั้งค่าระบบ</h1>
            <p className="text-sm text-muted-foreground">
              ท่านสามารถตั้งค่าระบบได้ที่นี่
            </p>
          </section>
          <Separator />
          <section className="h-full w-full">
            <div className="mt-4 grid w-full grid-cols-2 gap-4">
              {settingsConfig?.mainMenu?.map((item, i) => (
                <Link
                  to={`/settings${item.href}`}
                  key={i}
                  className={cn(
                    "relative flex items-center justify-between overflow-hidden rounded-md border px-4 py-4",
                    "cursor-pointer hover:bg-accent",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-lg",
                        "h-10 w-10 border-2 ",
                      )}
                    >
                      {item.icon === "lock" ? (
                        <Icons.lock className="h-8 w-8 rounded-md bg-accent p-2" />
                      ) : (
                        <Icons.userCircle2 className="h-8 w-8 rounded-md bg-accent p-2" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h1 className="text-sm font-semibold">{item.title}</h1>
                      <p className="text-xs text-muted-foreground">
                        {item.description || "No description available"}
                      </p>
                    </div>
                  </div>
                  <Icons.chevronRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </FadeIn>
  );
};

export default SettingPage;
