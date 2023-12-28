import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getDateThai } from "@/helpers/calendar.helper";
import { validateGeneralAssessmentForm } from "@/helpers/validate.helper";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useApprovals } from "@/services";
import { useFormGeneral } from "@/services/hooks/use-general-form";
import { TGeneralAssessmentForm } from "@/types";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { Icons } from "./icons";
import SettingsApproved from "./settings-approved";
import StatusForm from "./status-form";

interface Props {
  activeTab: "R1" | "R2" | "R3" | "R4";
}

const MainActions: FC<Props> = ({ activeTab = "R1" }) => {
  const { registration } = useAtomStore();

  const actionButton = (status_no: number) => {
    if (status_no === 0) {
      //! สถานะ รออัพโหลดเอกสาร
      return {
        ["R1"]: <ActionButtonR2 />,
        ["R2"]: <ActionButtonR2 />,
        ["R3"]: <ActionButtonR2 />,
        ["R4"]: <ActionButtonR2 />,
      };
    } else if (status_no === 1) {
      //! สถานะ รอตรวจสอบข้อมูล
      return {
        ["R1"]: <ActionButtonR2 />,
        ["R2"]: <ActionButtonR2 />,
        ["R3"]: <ActionButtonR2 />,
        ["R4"]: <ActionButtonR2 />,
      };
    } else if (status_no === 2) {
      //! สถานะ รอยืนยันข้อมูลทางการเงิน
      return {
        ["R1"]: <AccAction />,
        ["R2"]: <AccAction />,
        ["R3"]: <ActionButton />,
        ["R4"]: <ActionButton />,
      };
    } else if (status_no === 3) {
      //! สถานะ รอการแก้ไข
      return {
        ["R1"]: <EditR1 />,
        ["R2"]: <EditR1 />,
        ["R3"]: null,
        ["R4"]: null,
      };
    } else if (status_no === 4) {
      //! สถานะ รอพิจารณาอนุมัติ
      return {
        ["R1"]: <ActionButton />,
        ["R2"]: <ActionButton />,
        ["R3"]: <ActionButton />,
        ["R4"]: <ActionButton />,
      };
    } else if (status_no === 5) {
      //! สถานะ ระงับชั่วคราว
      return {
        ["R1"]: <ActionButton />,
        ["R2"]: <ActionButton />,
        ["R3"]: <ActionButton />,
        ["R4"]: <ActionButton />,
      };
    } else if (status_no === 6) {
      //! สถานะ ไม่อนุมัติ
      return {
        ["R1"]: <CustomerCode />,
        ["R2"]: <CustomerCode />,
        ["R3"]: <CustomerCode />,
        ["R4"]: <CustomerCode />,
      };
    } else if (status_no === 7) {
      //! สถานะ ไม่อนุมัติ
      return {
        ["R1"]: <DisApprove />,
        ["R2"]: <DisApprove />,
        ["R3"]: <DisApprove />,
        ["R4"]: <DisApprove />,
      };
    } else if (status_no === 8) {
      //! สถานะ ดำเนินการเสร็จสิ้น
      return {
        ["R1"]: <Complete />,
        ["R2"]: <Complete />,
        ["R3"]: <Complete />,
        ["R4"]: <Complete />,
      };
    }
    return {
      ["R1"]: null,
      ["R2"]: null,
      ["R3"]: null,
      ["R4"]: null,
    };
  };

  return (
    { ...actionButton(registration?.status_no as number) }[activeTab] || null
  );
};

export default MainActions;

//! Status รอพิจารณาอนุมัติ
const ActionButton = () => {
  const { generalAssessmentForm } = useAtomStore();
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID") || "";
  const isApprove = generalAssessmentForm?.is_approver || false;

  const { confirmSwal, closeSwal } = useSwal();
  const {
    mutateSendToEdit,
    mutateSendToSuspend,
    mutateSentToReject,
    mutateSentToApprove,
  } = useApprovals();
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
              className={cn(
                "w-[10rem] bg-yellow-500 hover:bg-yellow-500/80",
                !isApprove ? "hidden" : "",
              )}
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
            <form
              onSubmit={async (e) => {
                e.preventDefault();
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
              className="flex flex-col gap-2"
            >
              <h2 className="text-lg font-semibold">
                ความคิดเห็นจากผู้พิจารณา
              </h2>
              <div className="rounded-md">
                <Textarea
                  className="h-32 w-full"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </div>
              <Button
                className="mt-2 bg-yellow-500 hover:bg-yellow-500/80"
                type="submit"
              >
                <Icons.edit className="mr-2 h-5 w-5" />
                ส่งกลับเพื่อแก้ไข
              </Button>
            </form>
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
              className={cn(
                "w-[10rem] bg-gray-500 hover:bg-gray-500/80",
                !isApprove ? "hidden" : "",
              )}
              onClick={() => setComments("")}
            >
              <Icons.MinusCircle className="mr-2 h-5 w-5" />
              ระงับชั่วคราว
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col p-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
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
              <h2 className="text-lg font-semibold">
                ความคิดเห็นจากผู้พิจารณา
              </h2>
              <div className="rounded-md">
                <Textarea
                  className="h-32 w-full"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full bg-gray-500 hover:bg-gray-500/80"
                // onClick={async () => {
                //   setOpenDialog((prev) => ({ ...prev, suspend: false }));
                //   const isConfirm = await confirmSwal(
                //     "ยืนยันการระงับชั่วคราว",
                //     "",
                //   );
                //   if (isConfirm) {
                //     const res = await mutateSendToSuspend({
                //       regis_id: regisId,
                //       comments,
                //     });
                //     if (res?.status === "success") {
                //       closeSwal();
                //       setComments("");
                //     }
                //   } else {
                //     setOpenDialog((prev) => ({ ...prev, suspend: true }));
                //   }
                // }}
              >
                <Icons.MinusCircle className="mr-2 h-5 w-5" />
                ระงับชั่วคราว
              </Button>
            </form>
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
              className={cn(
                "w-[10rem] bg-red-600 hover:bg-red-600/80",
                !isApprove ? "hidden" : "",
              )}
              onClick={async () => setComments("")}
            >
              <Icons.xCircle className="mr-2 h-5 w-5" />
              ไม่อนุมัติ
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col p-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                setOpenDialog((prev) => ({ ...prev, reject: false }));
                const isConfirm = await confirmSwal("ยืนยันการไม่อนุมัติ", "");
                if (isConfirm) {
                  const res = await mutateSentToReject({
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
              <h2 className="text-lg font-semibold">
                ความคิดเห็นจากผู้พิจารณา
              </h2>
              <div className="rounded-md">
                <Textarea
                  className="h-32 w-full"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full bg-red-600 hover:bg-red-600/80"
                // onClick={async () => {
                //   setOpenDialog((prev) => ({ ...prev, reject: false }));
                //   const isConfirm = await confirmSwal("ยืนยันการทำรายการ", "");
                //   if (isConfirm) {
                //     const res = await mutateSentToReject({
                //       regis_id: regisId,
                //       comments,
                //     });
                //     if (res?.status === "success") {
                //       closeSwal();
                //       setComments("");
                //     }
                //   } else {
                //     setOpenDialog((prev) => ({ ...prev, reject: true }));
                //   }
                // }}
              >
                <Icons.xCircle className="mr-2 h-5 w-5" />
                ไม่อนุมัติ
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          className={cn(
            "w-[10rem] bg-green-600 hover:bg-green-600/80",
            !isApprove ? "hidden" : "",
          )}
          onClick={async () => {
            const isConfirm = await confirmSwal("ยืนยันการทำรายการ", "");
            if (isConfirm) {
              await mutateSentToApprove({
                regis_id: regisId,
              });
            }
          }}
        >
          <Icons.checkCircle2 className="mr-2 h-5 w-5" />
          อนุมัติ
        </Button>
      </div>
    </div>
  );
};

//! Status รอยืนยันข้อมูลทางการเงิน
const AccAction = () => {
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID") || "";
  const { mutateSendToEdit } = useApprovals();
  const { confirmSwal } = useSwal();
  const [comments, setComments] = useState<string>("");
  const [openDialog, setOpenDialog] = useState({
    edit: false,
    suspend: false,
    reject: false,
  });

  return (
    <div className="flex h-full w-full items-center justify-end gap-x-2 px-2 text-sm">
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
          <form
            className="flex flex-col gap-2 "
            onSubmit={async (e) => {
              e.preventDefault();
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
                  setComments("");
                }
              } else {
                setOpenDialog((prev) => ({ ...prev, edit: true }));
              }
            }}
          >
            <h2 className="text-lg font-semibold">ความคิดเห็นจากผู้พิจารณา</h2>
            <div className="rounded-md">
              <Textarea
                className="h-32 w-full"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>
            <Button
              className="mt-2 bg-yellow-500 hover:bg-yellow-500/80"
              // onClick={async () => {
              //   setOpenDialog((prev) => ({ ...prev, edit: false }));
              //   const isConfirm = await confirmSwal(
              //     "ยืนยันการส่งกลับเพื่อแก้ไข",
              //     "",
              //   );
              //   if (isConfirm) {
              //     const res = await mutateSendToEdit({
              //       regis_id: regisId,
              //       comments,
              //     });
              //     if (res?.status === "success") {
              //       setComments("");
              //     }
              //   } else {
              //     setOpenDialog((prev) => ({ ...prev, edit: true }));
              //   }
              // }}
            >
              <Icons.edit className="mr-2 h-5 w-5" />
              ส่งกลับเพื่อแก้ไข
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

//! Status รอการแก้ไข
const EditR1 = () => {
  const { common, setCommon, generalAssessmentForm, setGeneralAssessmentForm } =
    useAtomStore();
  const [oldData, setOldData] = useState<TGeneralAssessmentForm>(
    generalAssessmentForm,
  );

  const { mutateUpdateGeneralAssessment } = useFormGeneral();

  const { confirmSwal } = useSwal();

  useEffect(() => {
    setOldData(generalAssessmentForm);
    // setCommon((prev) => ({
    //   ...prev,
    //   isEditGeneralAssessmentForm: false,
    // }));
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-end gap-x-2 px-2 text-sm">
      {!common.isEditGeneralAssessmentForm ? (
        <Button
          className="bg-yellow-500 hover:bg-yellow-500/80"
          onClick={() => {
            setCommon((prev) => ({
              ...prev,
              isEditGeneralAssessmentForm: !prev.isEditGeneralAssessmentForm,
            }));
          }}
        >
          <Icons.edit className="mr-2 h-5 w-5" />
          แก้ไขข้อมูลแบบฟอร์มประเมินลูกค้า
        </Button>
      ) : null}
      {common.isEditGeneralAssessmentForm ? (
        <>
          <Button
            className="bg-green-600 hover:bg-green-600/80"
            onClick={async () => {
              const isConfirm = await confirmSwal(
                "ยืนยันการแก้ไขข้อมูล",
                "คุณต้องการแก้ไขข้อมูลใช่หรือไม่",
              );
              if (isConfirm) {
                await mutateUpdateGeneralAssessment(generalAssessmentForm);
              }
            }}
          >
            <Icons.save className="mr-2 h-5 w-5" />
            ยืนยันการแก้ไขข้อมูลแบบฟอร์มประเมินลูกค้า
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-600/80"
            onClick={() => {
              setCommon((prev) => ({
                ...prev,
                isEditGeneralAssessmentForm: !prev.isEditGeneralAssessmentForm,
              }));
              setGeneralAssessmentForm(oldData);
            }}
          >
            <Icons.xCircle className="mr-2 h-5 w-5" />
            ยกเลิกการแก้ไช
          </Button>
        </>
      ) : null}
    </div>
  );
};

//! Status อนุมัติ (รอกรอกรหัสลูกค้า)
const CustomerCode = () => {
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID") || "";
  const { mutateEnterCustomerCode } = useApprovals();
  const [openDialog, setOpenDialog] = useState({
    customerCode: false,
  });
  const [customer_code, setCustomer_code] = useState<number | null>(null);

  const { confirmSwal } = useSwal();

  return (
    <div className="flex h-full w-full items-center justify-end gap-x-2 px-2 text-sm">
      <Dialog
        onOpenChange={(open) => {
          setOpenDialog((prev) => ({ ...prev, customerCode: open }));
        }}
        open={openDialog.customerCode}
      >
        <DialogTrigger asChild>
          <Button
            className="w-[10rem] bg-green-500 hover:bg-green-500/80"
            onClick={() => {
              setOpenDialog((prev) => ({ ...prev, edit: true }));
            }}
          >
            <Icons.save className="mr-2 h-5 w-5" />
            กรอกรหัสลูกค้า
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col p-2">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setOpenDialog((prev) => ({ ...prev, customerCode: false }));
              const isConfirm = await confirmSwal(
                "ยืนยันการกรอกรหัสลูกค้า",
                "",
              );
              if (isConfirm) {
                const res = await mutateEnterCustomerCode({
                  regis_id: regisId,
                  customer_code: String(customer_code),
                });
                if (res?.status === "success") {
                  setCustomer_code(null);
                }
              } else {
                setOpenDialog((prev) => ({ ...prev, customerCode: true }));
              }
            }}
            className="flex w-full flex-col gap-2"
          >
            <h2 className="text-lg font-semibold">
              กรุณากรอกรหัสลูกค้าให้ถูกต้อง
            </h2>
            <div className="flex flex-col gap-2 rounded-md">
              <p className="text-sm font-semibold">รหัสลูกค้า</p>
              <Input
                className="w-full"
                type="number"
                value={customer_code || ""}
                onChange={(e) => {
                  const value = isNaN(parseInt(e.target.value))
                    ? null
                    : parseInt(e.target.value);
                  setCustomer_code(value);
                }}
                required={true}
                pattern="[0-9]*"
                inputMode="numeric"
                minLength={6}
                maxLength={6}
              />
            </div>
            <Button
              className="mt-2 w-full bg-green-500 hover:bg-green-500/80"
              type="submit"
            >
              <Icons.save className="mr-2 h-5 w-5" />
              กรอกรหัสลูกค้า
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

//! Status ไม่อนุมัติ
const DisApprove = () => {
  return (
    <div className="flex h-full w-full items-center justify-start gap-x-2 px-2 text-sm">
      <StatusForm />
    </div>
  );
};

//! Status ดำเนินการเสร็จสิ้น
const Complete = () => {
  const { generalAssessmentForm } = useAtomStore();

  if (!generalAssessmentForm?.customer_code) {
    return null;
  }

  return (
    <div className="flex h-full w-full items-center justify-between gap-x-2 px-2 text-sm">
      <StatusForm />
      <div className="flex flex-col gap-1 border-l-2 pl-2 text-right">
        <h1 className="text-lg font-semibold">
          รหัสลูกค้า: {generalAssessmentForm?.customer_code}
        </h1>
        <p className="text-xs">
          วันและเวลาที่กรอกรหัสลูกค้า:{" "}
          {
            getDateThai(generalAssessmentForm?.filled_customer_code_at || "")
              .dateTime
          }
        </p>
      </div>
    </div>
  );
};

//! รอตรวจสอบข้อมูล
const ActionButtonR2 = () => {
  const { mutateCreateGeneralAssessment } = useFormGeneral();
  const { generalAssessmentForm, docByRegisId, setCommon, registration } =
    useAtomStore();
  const { confirmSwal, showError } = useSwal();

  return (
    <div
      className={cn(
        "flex h-full w-full items-center gap-x-2  px-2 text-sm",
        "justify-between",
      )}
    >
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
                    บันทึกการตั้งค่าสายอนุมัติและปิดหน้าต่าง
                  </Button>
                </SheetClose>
              }
            />
          </div>
        </SheetContent>
      </Sheet>

      <div className={cn("flex gap-2")}>
        <Button
          className={cn(
            "bg-yellow-500 hover:bg-yellow-500/80",
            registration?.status_no === 1 ? "hidden" : "",
          )}
          onClick={() => {
            setCommon((prev) => ({
              ...prev,
              isEditGeneralAssessmentForm: !prev.isEditGeneralAssessmentForm,
            }));
          }}
        >
          <Icons.edit className="mr-2 h-5 w-5" />
          แก้ไขแบบฟอร์ม
        </Button>
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
      </div>
    </div>
  );
};
