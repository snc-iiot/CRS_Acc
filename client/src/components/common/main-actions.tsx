import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CheckIcon, CircleIcon, Stepper, Steps } from "@/components/ui/stepper";
import { useConfirm } from "@/hooks";
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
  const { Confirm } = useConfirm();

  const CompanySteps = [
    {
      label: "นาย อนุวัฒน์ ทีสุกะ",
      value: "anuwat-thisuka",
    },
    {
      label: "นาย อนุวัฒน์ ทีสุกะ",
      value: "anuwat-thisuka",
    },
    {
      label: "นาย อนุวัฒน์ ทีสุกะ",
      value: "anuwat-thisuka",
    },
    {
      label: "นาย อนุวัฒน์ ทีสุกะ",
      value: "anuwat-thisuka",
    },
  ];

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
          <Confirm
            button={
              <Button className="bg-green-600 hover:bg-green-600/80">
                <Icons.save className="mr-2 h-5 w-5" />
                บันทึกแบบฟอร์ม
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
        </div>
      </div>
    ),
    ["R2"]: (
      <>
        <div className="flex h-full w-full items-center justify-end gap-x-2 px-2 text-sm">
          {/* <div>
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 text-green-600">
                  <Icons.checkCircle2 className="h-5 w-5" />
                  <span>กดเพื่อดูสายอนุมัติ</span>
                </div>
              </SheetTrigger>
              <SheetContent
                side="top"
                onPointerDownOutside={(e) => {
                  if (e.target === e.currentTarget) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="mt-6 max-h-96">
                  <Stepper
                    activeStep={"SCAN"}
                    icons={{
                      active: (
                        <CheckIcon className="h-[18.5px] w-[18.5px] text-primary" />
                      ),
                      inactive: (
                        <CircleIcon className="h-[18.5px] w-[15.6px] text-gray-200" />
                      ),
                    }}
                  >
                    {CompanySteps.map((item, index) => (
                      <Steps
                        key={index}
                        label={item?.label}
                        keyStep={item?.value}
                        className="w-max text-sm font-semibold"
                      />
                    ))}
                  </Stepper>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
          <div className="flex items-center gap-2">
            <Confirm
              button={
                <Button className="w-[10rem] bg-yellow-500 hover:bg-yellow-500/80">
                  <Icons.edit className="mr-2 h-5 w-5" />
                  ระงับชั่วคราว
                </Button>
              }
              title="ยืนยันการบันทึกข้อมูล"
              description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
              confirm={() => console.log("action")}
              cancel={() => console.log("cancel")}
              confirmButtonText="บันทึกข้อมูล"
              cancelButtonText="ยกเลิก"
            />
            <Confirm
              button={
                <Button className="w-[10rem] bg-red-600 hover:bg-red-600/80">
                  <Icons.xCircle className="mr-2 h-5 w-5" />
                  ไม่อนุมัติ
                </Button>
              }
              title="ยืนยันการบันทึกข้อมูล"
              description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
              confirm={() => console.log("action")}
              cancel={() => console.log("cancel")}
              confirmButtonText="บันทึกข้อมูล"
              cancelButtonText="ยกเลิก"
            />
            <Confirm
              button={
                <Button className="w-[10rem] bg-green-600 hover:bg-green-600/80">
                  <Icons.checkCircle2 className="mr-2 h-5 w-5" />
                  อนุมัติ
                </Button>
              }
              title="ยืนยันการบันทึกข้อมูล"
              description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
              confirm={() => console.log("action")}
              cancel={() => console.log("cancel")}
              confirmButtonText="บันทึกข้อมูล"
              cancelButtonText="ยกเลิก"
            />
          </div>
        </div>
      </>
    ),
    ["R3"]: (
      <div className="flex h-full w-full items-center justify-end gap-x-2 px-2 text-sm">
        {/* <div>
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 text-green-600">
                  <Icons.checkCircle2 className="h-5 w-5" />
                  <span>กดเพื่อดูสายอนุมัติ</span>
                </div>
              </SheetTrigger>
              <SheetContent
                side="top"
                onPointerDownOutside={(e) => {
                  if (e.target === e.currentTarget) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="mt-6 max-h-96">
                  <Stepper
                    activeStep={"SCAN"}
                    icons={{
                      active: (
                        <CheckIcon className="h-[18.5px] w-[18.5px] text-primary" />
                      ),
                      inactive: (
                        <CircleIcon className="h-[18.5px] w-[15.6px] text-gray-200" />
                      ),
                    }}
                  >
                    {CompanySteps.map((item, index) => (
                      <Steps
                        key={index}
                        label={item?.label}
                        keyStep={item?.value}
                        className="w-max text-sm font-semibold"
                      />
                    ))}
                  </Stepper>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
        <div className="flex items-center gap-2">
          <Confirm
            button={
              <Button className="w-[10rem] bg-yellow-500 hover:bg-yellow-500/80">
                <Icons.edit className="mr-2 h-5 w-5" />
                ระงับชั่วคราว
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
          <Confirm
            button={
              <Button className="w-[10rem] bg-red-600 hover:bg-red-600/80">
                <Icons.xCircle className="mr-2 h-5 w-5" />
                ไม่อนุมัติ
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
          <Confirm
            button={
              <Button className="w-[10rem] bg-green-600 hover:bg-green-600/80">
                <Icons.checkCircle2 className="mr-2 h-5 w-5" />
                อนุมัติ
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
        </div>
      </div>
    ),
    ["R4"]: (
      <div className="flex h-full w-full items-center justify-end gap-x-2 px-2 text-sm">
        {/* <div>
            <Sheet>
              <SheetTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 text-green-600">
                  <Icons.checkCircle2 className="h-5 w-5" />
                  <span>กดเพื่อดูสายอนุมัติ</span>
                </div>
              </SheetTrigger>
              <SheetContent
                side="top"
                onPointerDownOutside={(e) => {
                  if (e.target === e.currentTarget) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="mt-6 max-h-96">
                  <Stepper
                    activeStep={"SCAN"}
                    icons={{
                      active: (
                        <CheckIcon className="h-[18.5px] w-[18.5px] text-primary" />
                      ),
                      inactive: (
                        <CircleIcon className="h-[18.5px] w-[15.6px] text-gray-200" />
                      ),
                    }}
                  >
                    {CompanySteps.map((item, index) => (
                      <Steps
                        key={index}
                        label={item?.label}
                        keyStep={item?.value}
                        className="w-max text-sm font-semibold"
                      />
                    ))}
                  </Stepper>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
        <div className="flex items-center gap-2">
          <Confirm
            button={
              <Button className="w-[10rem] bg-yellow-500 hover:bg-yellow-500/80">
                <Icons.edit className="mr-2 h-5 w-5" />
                ระงับชั่วคราว
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
          <Confirm
            button={
              <Button className="w-[10rem] bg-red-600 hover:bg-red-600/80">
                <Icons.xCircle className="mr-2 h-5 w-5" />
                ไม่อนุมัติ
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
          <Confirm
            button={
              <Button className="w-[10rem] bg-green-600 hover:bg-green-600/80">
                <Icons.checkCircle2 className="mr-2 h-5 w-5" />
                อนุมัติ
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
        </div>
      </div>
    ),
    ["R5"]: (
      <div className="flex h-full w-full items-center justify-between gap-x-2 px-2 text-sm">
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2 text-green-600">
                <Icons.checkCircle2 className="h-5 w-5" />
                <span>กดเพื่อดูสายอนุมัติ</span>
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
              <div className="mt-6 max-h-96">
                <Stepper
                  activeStep={"anuwat-thisuka"}
                  icons={{
                    active: (
                      <CheckIcon className="h-[18.5px] w-[18.5px] text-primary" />
                    ),
                    inactive: (
                      <CircleIcon className="h-[18.5px] w-[15.6px] text-gray-200" />
                    ),
                  }}
                >
                  {CompanySteps.map((item, index) => (
                    <Steps
                      key={index}
                      label={item?.label}
                      keyStep={item?.value}
                      className="w-max text-sm font-semibold"
                    />
                  ))}
                </Stepper>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-2">
          <Confirm
            button={
              <Button className="w-[10rem] bg-yellow-500 hover:bg-yellow-500/80">
                <Icons.edit className="mr-2 h-5 w-5" />
                ระงับชั่วคราว
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
          <Confirm
            button={
              <Button className="w-[10rem] bg-red-600 hover:bg-red-600/80">
                <Icons.xCircle className="mr-2 h-5 w-5" />
                ไม่อนุมัติ
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
          <Confirm
            button={
              <Button className="w-[10rem] bg-green-600 hover:bg-green-600/80">
                <Icons.checkCircle2 className="mr-2 h-5 w-5" />
                อนุมัติ
              </Button>
            }
            title="ยืนยันการบันทึกข้อมูล"
            description="คุณต้องการบันทึกข้อมูลใช่หรือไม่"
            confirm={() => console.log("action")}
            cancel={() => console.log("cancel")}
            confirmButtonText="บันทึกข้อมูล"
            cancelButtonText="ยกเลิก"
          />
        </div>
      </div>
    ),
    ["R6"]: null,
    ["R7"]: null,
    ["R8"]: null,
    ["R9"]: null,
    ["R10"]: null,
  };
  return <>{renderElement[activeTab]}</>;
};

export default MainActions;
