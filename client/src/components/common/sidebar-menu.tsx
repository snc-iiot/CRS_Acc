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

export const Links = () => [
  {
    Icon: <Icons.layoutGrid className="h-5 w-5" />,
    name: "หน้าหลัก",
    href: `/`,
    disabled: false,
  },
  {
    Icon: <Icons.barChart className="h-5 w-5" />,
    name: "สรุปการปล่อยก๊าซเรือนกระจก",
    href: `/insights`,
    disabled: false,
  },
  {
    Icon: <Icons.bellRing className="h-5 w-5" />,
    name: "รายละเอียดการปล่อยก๊าซเรือนกระจก",
    href: `/details`,
    disabled: false,
  },
  {
    Icon: <Icons.clipBoardCheck className="h-5 w-5" />,
    name: "คำนวน CO2",
    href: `/calculations`,
    disabled: false,
  },
  {
    Icon: <Icons.shieldAlert className="h-5 w-5" />,
    name: "กำหนดค่า Factor",
    href: `/factors`,
    disabled: false,
  },
  {
    Icon: <Icons.circleDollarSign className="h-5 w-5" />,
    name: "ซื้อ-ขาย Credit",
    href: `/trade-credit`,
    disabled: false,
  },
  {
    Icon: <Icons.fileText className="h-5 w-5" />,
    name: "รายงาน",
    href: `/reports`,
    disabled: false,
  },
  {
    Icon: <Icons.userCircle2 className="h-5 w-5" />,
    name: "เกี่ยวกับเรา",
    href: `/about`,
    disabled: false,
  },
  {
    Icon: <Icons.twitter className="h-5 w-5" />,
    name: "ติดต่อเรา",
    href: `/contact`,
    disabled: false,
  },
  {
    Icon: <Icons.scroll className="h-5 w-5" />,
    name: "คำถามที่พบบ่อย",
    href: `/faq`,
    disabled: false,
  },
  {
    Icon: <Icons.share className="h-5 w-5" />,
    name: "นโยบายความเป็นส่วนตัว",
    href: `/privacy`,
    disabled: false,
  },
  {
    Icon: <Icons.refreshCcw className="h-5 w-5" />,
    name: "ข้อกำหนดและเงื่อนไข",
    href: `/terms`,
    disabled: false,
  },
  {
    Icon: <Icons.list className="h-5 w-5" />,
    name: "คำแนะนำการใช้งาน",
    href: `/guide`,
    disabled: false,
  },
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
      {Links().map((link, index) => {
        const isActive = pathname === link.href;
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
                        "group flex w-full items-center gap-2.5 text-sm",
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
