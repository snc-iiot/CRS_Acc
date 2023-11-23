import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FC } from "react";
import { Button } from "../ui/button";
import { Icons } from "./icons";
import SettingsApproved from "./settings-approved";

interface Props {
  activeTab:
    | "R1"
    | "R2"
    | "R3"
    | "R4"
    | "R5"
    | "R6"
    | "R7"
    | "R8"
    | "R9"
    | "R10";
}

const MainActions: FC<Props> = ({ activeTab = "R1" }) => {
  const renderElement = {
    ["R1"]: (
      <div className="flex h-full w-full items-center justify-between gap-x-2 px-2 text-sm">
        <>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2">
                <Icons.settings className="h-5 w-5" />
                <span>ตั้งค่าสายอนุมัติ</span>
              </div>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              onPointerDownOutside={(e) => {
                if (e.target === e.currentTarget) {
                  e.preventDefault();
                }
              }}
            >
              <div className="h-96">
                <SettingsApproved />
              </div>
            </SheetContent>
          </Sheet>
        </>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-600/80">
            <Icons.save className="mr-2 h-5 w-5" />
            บันทึกสายอนุมัติ
          </Button>
        </div>
      </div>
    ),
    ["R2"]: null,
    ["R3"]: null,
    ["R4"]: null,
    ["R5"]: null,
    ["R6"]: null,
    ["R7"]: null,
    ["R8"]: null,
    ["R9"]: null,
    ["R10"]: null,
  };
  return <>{renderElement[activeTab]}</>;
};

export default MainActions;
