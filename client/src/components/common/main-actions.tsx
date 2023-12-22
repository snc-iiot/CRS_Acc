import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { validateGeneralAssessmentForm } from "@/helpers/validate.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useApprovals } from "@/services";
import { useFormGeneral } from "@/services/hooks/use-general-form";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Icons } from "./icons";
import SettingsApproved from "./settings-approved";
import StatusForm from "./status-form";

interface Props {
  activeTab: "R1" | "R2" | "R3" | "R4";
}

const MainActions: FC<Props> = ({ activeTab = "R1" }) => {
  const renderElement = {
    ["R1"]: <ActionButtonR2 />,
    ["R2"]: <ActionButton />,
    ["R3"]: <ActionButton />,
    ["R4"]: <ActionButton />,
  };
  return <>{renderElement[activeTab]}</>;
};

export default MainActions;

const ActionButton = () => {
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID") || "";

  const { confirmSwal, closeSwal } = useSwal();
  const { mutateSendToEdit, mutateSendToSuspend } = useApprovals();
  const [openDialog, setOpenDialog] = useState({
    edit: false,
    suspend: false,
    reject: false,
  });

  const [comments, setComments] = useState<string>("");

  return (
    <div className="flex h-full w-full items-center justify-between gap-x-2 px-2 text-sm">
      <StatusForm />
      <div className="flex items-center gap-2">
        <Dialog
          onOpenChange={(open) => {
            setOpenDialog((prev) => ({ ...prev, edit: open }));
          }}
          open={openDialog.edit}
        >
          <DialogTrigger asChild>
            <Button
              className="w-[10rem] bg-yellow-500 hover:bg-yellow-500/80"
              onClick={() => {
                setComments("");
                setOpenDialog((prev) => ({ ...prev, edit: true }));
              }}
            >
              <Icons.edit className="mr-2 h-5 w-5" />
              ส่งกลับเพื่อแก้ไข
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col p-2">
            <h2 className="text-lg font-semibold">ความคิดเห็นจากผู้พิจารณา</h2>
            <div className="rounded-md">
              <Textarea
                className="h-32 w-full"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <Button
              className="mt-2 bg-yellow-500 hover:bg-yellow-500/80"
              onClick={async () => {
                setOpenDialog((prev) => ({ ...prev, edit: false }));
                const isConfirm = await confirmSwal(
                  "ยืนยันการส่งกลับเพื่อแก้ไข",
                  "",
                );
                if (isConfirm) {
                  const res = await mutateSendToEdit({
                    regis_id: regisId,
                    comments,
                  });
                  if (res?.status === "success") {
                    closeSwal();
                    setComments("");
                  }
                } else {
                  setOpenDialog((prev) => ({ ...prev, edit: true }));
                }
              }}
            >
              <Icons.edit className="mr-2 h-5 w-5" />
              ส่งกลับเพื่อแก้ไข
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog
          onOpenChange={(open) => {
            setOpenDialog((prev) => ({ ...prev, suspend: open }));
          }}
          open={openDialog.suspend}
        >
          <DialogTrigger asChild>
            <Button
              className="w-[10rem] bg-gray-500 hover:bg-gray-500/80"
              onClick={() => setComments("")}
            >
              <Icons.MinusCircle className="mr-2 h-5 w-5" />
              ระงับชั่วคราว
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col p-2">
            <h2 className="text-lg font-semibold">ความคิดเห็นจากผู้พิจารณา</h2>
            <div className="rounded-md">
              <Textarea
                className="h-32 w-full"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-gray-500 hover:bg-gray-500/80"
              onClick={async () => {
                setOpenDialog((prev) => ({ ...prev, suspend: false }));
                const isConfirm = await confirmSwal(
                  "ยืนยันการระงับชั่วคราว",
                  "",
                );
                if (isConfirm) {
                  const res = await mutateSendToSuspend({
                    regis_id: regisId,
                    comments,
                  });
                  if (res?.status === "success") {
                    closeSwal();
                    setComments("");
                  }
                } else {
                  setOpenDialog((prev) => ({ ...prev, suspend: true }));
                }
              }}
            >
              <Icons.MinusCircle className="mr-2 h-5 w-5" />
              ระงับชั่วคราว
            </Button>
          </DialogContent>
        </Dialog>

        <Dialog
          onOpenChange={(open) => {
            setOpenDialog((prev) => ({ ...prev, reject: open }));
          }}
          open={openDialog.reject}
        >
          <DialogTrigger asChild>
            <Button
              className="w-[10rem] bg-red-600 hover:bg-red-600/80"
              onClick={async () => setComments("")}
            >
              <Icons.xCircle className="mr-2 h-5 w-5" />
              ไม่อนุมัติ
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col p-2">
            <h2 className="text-lg font-semibold">ความคิดเห็นจากผู้พิจารณา</h2>
            <div className="rounded-md">
              <Textarea
                className="h-32 w-full"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-red-600 hover:bg-red-600/80"
              onClick={async () => {
                setOpenDialog((prev) => ({ ...prev, reject: false }));
                const isConfirm = await confirmSwal("ยืนยันการทำรายการ", "");
                if (isConfirm) {
                  const res = await mutateSendToSuspend({
                    regis_id: regisId,
                    comments,
                  });
                  if (res?.status === "success") {
                    closeSwal();
                    setComments("");
                  }
                } else {
                  setOpenDialog((prev) => ({ ...prev, reject: true }));
                }
              }}
            >
              <Icons.xCircle className="mr-2 h-5 w-5" />
              ระงับชั่วคราว
            </Button>
          </DialogContent>
        </Dialog>
        <Button
          className="w-[10rem] bg-green-600 hover:bg-green-600/80"
          onClick={async () => {}}
        >
          <Icons.checkCircle2 className="mr-2 h-5 w-5" />
          อนุมัติ
        </Button>
      </div>
    </div>
  );
};

const ActionButtonR2 = () => {
  const { mutateCreateGeneralAssessment } = useFormGeneral();
  const { generalAssessmentForm, docByRegisId, regisList, setCommon } =
    useAtomStore();
  const { confirmSwal, showError } = useSwal();

  const getStatusCodeByRegisId = (regisId: string) => {
    const regis = regisList?.find((item) => item.regis_id === regisId);
    return regis?.status_no;
  };

  return (
    <div
      className={cn(
        "flex h-full w-full items-center gap-x-2  px-2 text-sm",
        getStatusCodeByRegisId(generalAssessmentForm?.regis_id) === 0
          ? "justify-between"
          : "justify-end",
      )}
    >
      {getStatusCodeByRegisId(generalAssessmentForm?.regis_id) === 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2">
              <Icons.settings className="h-5 w-5" />
              <span>
                ตั้งค่าสายอนุมัติ
                {generalAssessmentForm?.approvals?.length > 0 ? (
                  <span className="text-xs text-primary">
                    &nbsp; (ยืนยันสายอนุมัติแล้ว)
                  </span>
                ) : null}
              </span>
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
              <SettingsApproved
                closeButton={
                  <SheetClose className="flex items-center gap-2" asChild>
                    <Button>
                      <Icons.save className="h-5 w-5" />
                      บันทึการตั้งค่าสายอนุมัติและปิดหน้าต่าง
                    </Button>
                  </SheetClose>
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
      <div className={cn("flex gap-2")}>
        <Button
          className={cn("bg-yellow-500 hover:bg-yellow-500/80")}
          onClick={() => {
            setCommon((prev) => ({
              ...prev,
              isEditGeneralAssessmentForm: !prev.isEditGeneralAssessmentForm,
            }));
          }}
        >
          <Icons.edit className="mr-2 h-5 w-5" />
          {generalAssessmentForm?.regis_id ? "แก้ไขแบบฟอร์ม" : "สร้างแบบฟอร์ม"}
        </Button>
        {getStatusCodeByRegisId(generalAssessmentForm?.regis_id) === 0 && (
          <Button
            onClick={async () => {
              const { isValid, error_th } = validateGeneralAssessmentForm(
                generalAssessmentForm,
                docByRegisId,
              );
              if (!isValid) {
                showError(error_th, "กรุณากรอกข้อมูลให้ครบถ้วน");
              } else {
                const isConfirm = await confirmSwal(
                  "ยืนยันการบันทึกข้อมูล",
                  "คุณต้องการบันทึกข้อมูลใช่หรือไม่",
                );
                if (isConfirm) {
                  await mutateCreateGeneralAssessment(generalAssessmentForm);
                }
              }
            }}
            className="bg-green-600 hover:bg-green-600/80"
          >
            <Icons.save className="mr-2 h-5 w-5" />
            บันทึกแบบฟอร์ม
          </Button>
        )}
      </div>
    </div>
  );
};
