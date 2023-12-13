import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "./icons";

export type WorkspaceSidebarMenuProps = {
  isOpen: boolean;
};

export const WorkspaceSidebarMenu: React.FC<WorkspaceSidebarMenuProps> = ({
  isOpen,
}) => {
  const { pathname } = useLocation();

  const workspaceLinks = [
    {
      Icon: <Icons.layoutGrid className="h-5 w-5" />,
      name: "หน้าหลัก",
      href: `/`,
      disabled: false,
    },
    {
      Icon: <Icons.fileText className="h-5 w-5" />,
      name: "รายการลงทะเบียนลูกค้า",
      href: `/registrations`,
      disabled: false,
    },
    // {
    //   Icon: <Icons.settings className="h-5 w-5" />,
    //   name: "ตั้งค่า",
    //   href: `/settings`,
    //   disabled: false,
    // },
  ];

  return (
    <div className="mt-5 w-full cursor-pointer space-y-2 px-2">
      {workspaceLinks.map((link, index) => {
        const isActive =
          link.href === "/settings" || link.href === "/registrations"
            ? pathname.includes(link.href)
            : pathname === link.href;

        return (
          <Fragment key={index}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={link.href}
                    aria-controls="mobile-menu"
                    className={cn(
                      link?.disabled ? "pointer-events-none opacity-50" : "",
                    )}
                  >
                    <div
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "group flex w-full items-center gap-2.5",
                        !isOpen ? "justify-center" : " justify-start",
                        index === 0 ? "mt-0" : "mt-2",
                        isActive ? "bg-primary/10" : "bg-transparent",
                      )}
                      aria-label="Sample Tabs"
                    >
                      {link.Icon}
                      {isOpen && link.name}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className={cn(isOpen && "hidden")}>
                  {link.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Fragment>
        );
      })}
    </div>
  );
};
