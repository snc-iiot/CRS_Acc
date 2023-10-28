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

export const workspaceLinks = () => [
  {
    Icon: <Icons.layoutGrid className="h-5 w-5" />,
    name: "Home",
    href: `/`,
    disabled: false,
  },
  {
    Icon: <Icons.fileText className="h-5 w-5" />,
    name: "Registrations",
    href: `/registrations`,
    disabled: false,
  },
  // {
  //   Icon: <Icons.checkCircle className="h-5 w-5" />,
  //   name: "Customers",
  //   href: `/customers`,
  //   disabled: false,
  // },
  // {
  //   Icon: <Icons.shoppingCart className="h-5 w-5" />,
  //   name: "Products",
  //   href: `/products`,
  // },
  // {
  //   Icon: <Icons.users className="h-5 w-5" />,
  //   name: "Authorized",
  //   href: `/authorized`,
  // },
  // {
  //   Icon: <Icons.settings className="h-5 w-5" />,
  //   name: "Settings",
  //   href: `/settings`,
  // },
];

export type WorkspaceSidebarMenuProps = {
  isOpen: boolean;
};

export const WorkspaceSidebarMenu: React.FC<WorkspaceSidebarMenuProps> = ({
  isOpen,
}) => {
  const { pathname } = useLocation();
  return (
    <div className="mt-5 w-full cursor-pointer space-y-2 px-2">
      {workspaceLinks().map((link, index) => {
        const isActive =
          link.name === "Quotations" ||
          link.name === "Customers" ||
          link.name === "Products" ||
          link.name === "Authorized" ||
          link.name === "Settings"
            ? pathname.includes(link.href)
            : pathname === link.href;

        return (
          <Fragment key={index}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={link.href} aria-controls="mobile-menu">
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
