import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useConfirm } from "@/hooks";
import { useSwal } from "@/hooks/use-swal";
import { useAtomStore } from "@/jotai/use-atom-store";
import { useForm, useUtils } from "@/services";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { TableFinancialRatio } from "../pages/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Icons } from "./icons";
import TableDBD from "./table-dbd";

interface Props {
  activeTab: "R2" | "R3" | "R4" | "R5";
}

const ActionTab: FC<Props> = ({ activeTab = "R2" }) => {
  const { Confirm } = useConfirm();
  const { showLoading, closeSwal, confirmSwal } = useSwal();
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID");
  const { mutateSyncDBD } = useUtils();
  const { mutateConfirmDBDInfo } = useForm();

  const { dbdSyncList } = useAtomStore();

  const UploadDBDDialog = () => {
    const Financial = dbdSyncList?.financial_position?.map((item) => {
      return {
        Topic: item.topic_th,
        Info: item?.info?.map((info) => {
          return {
            Year: info.year,
            Amount: info.amount,
            Change: info.change,
          };
        }),
      };
    });

    const Income = dbdSyncList?.income_statement?.map((item) => {
      return {
        Topic: item.topic_th,
        Info: item?.info?.map((info) => {
          return {
            Year: info.year,
            Amount: info.amount,
            Change: info.change,
          };
        }),
      };
    });
    return (
      <div className="flex items-center justify-end text-sm">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icons.uploadCloudIcon className="mr-2" />
              Upload ข้อมูล DBD
            </Button>
          </DialogTrigger>
          <DialogContent
            style={{ minWidth: "max-content", maxHeight: "80%" }}
            className="flex flex-col overflow-clip p-2"
          >
            <div className="flex w-full flex-col gap-2 overflow-clip">
              <h2 className="text-lg font-semibold">
                กรุณากรอกรหัสลูกค้าให้ถูกต้อง
              </h2>
              <div className="flex gap-2">
                <Button className="w-[20rem]">
                  <Icons.uploadCloudIcon className="mr-2" />
                  Upload ข้อมูล งบแสดงฐานะการเงิน
                </Button>
                <Button className="w-[20rem]">
                  <Icons.uploadCloudIcon className="mr-2" />
                  Upload ข้อมูล งบกำไรขาดทุน
                </Button>
                <Button className="w-[20rem]">
                  <Icons.uploadCloudIcon className="mr-2" />
                  Upload ข้อมูล อัตราส่วนทางการเงินที่สำคัญ
                </Button>
              </div>
              <div className="flex h-full w-full overflow-auto">
                <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
                  <AccordionItem className="min-w-[1200px]" value="item-1">
                    <AccordionTrigger className="p-1 text-xs font-bold">
                      งบการเงิน / Statement of Financial Position
                    </AccordionTrigger>
                    <AccordionContent>
                      <TableDBD className="w-full" data={Financial} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="p-1 text-xs font-bold">
                      งบกำไรขาดทุน / Income Statement
                    </AccordionTrigger>
                    <AccordionContent>
                      <TableDBD className="w-full" data={Income} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="p-1 text-xs font-bold">
                      อัตราส่วนทางการเงิน / Financial Ratio
                    </AccordionTrigger>
                    <AccordionContent>
                      <TableFinancialRatio />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="flex w-full items-end justify-end gap-2">
                <Button className="bg-green-600 hover:bg-green-600/80">
                  <Icons.save className="mr-2" />
                  ยืนยันข้อมูลการเงิน
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderElement = {
    // ["R1"]: (
    //   <div className="flex w-full items-center justify-end gap-2">
    //     <Button className="bg-yellow-500 hover:bg-yellow-500/80">
    //       <Icons.fileEdit className="mr-2 h-5 w-5" />
    //       แก้ไขข้อมูล
    //     </Button>
    //     <Button className="bg-green-600 hover:bg-green-600/80">
    //       <Icons.save className="mr-2 h-5 w-5" />
    //       บันทึกข้อมูล
    //     </Button>
    //   </div>
    // ),
    ["R2"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button
            onClick={async () => {
              showLoading(
                "กำลังดำเนินการ Sync ข้อมูล DBD",
                "กรุณารอสักครู่...",
              );
              await mutateSyncDBD(regisId as string);
              closeSwal();
            }}
          >
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <UploadDBDDialog />
        </div>
        <Button
          className="bg-green-600 hover:bg-green-600/80"
          onClick={async () => {
            const isConfirm = await confirmSwal(
              "ยืนยันข้อมูลการเงิน",
              "คุณต้องการยืนยันข้อมูลการเงินใช่หรือไม่",
            );
            if (isConfirm) {
              await mutateConfirmDBDInfo(regisId as string);
            }
          }}
        >
          <Icons.save className="mr-2 h-5 w-5" />
          ยืนยันข้อมูลการเงิน
        </Button>
      </div>
    ),
    ["R3"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.downloadCloud className="mr-2" />
            อัพโหลดข้อมูลโดย Excel{" "}
          </Button>
        </div>
        <Confirm
          button={
            <Button className="bg-green-600 hover:bg-green-600/80">
              <Icons.save className="mr-2 h-5 w-5" />
              ยืนยันข้อมูลและคำนวณ
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
    ),
    ["R4"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.downloadCloud className="mr-2" />
            อัพโหลดข้อมูลโดย Excel{" "}
          </Button>
        </div>
        <Confirm
          button={
            <Button className="bg-green-600 hover:bg-green-600/80">
              <Icons.save className="mr-2 h-5 w-5" />
              ยืนยันข้อมูลและคำนวณ
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
    ),
    ["R5"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.downloadCloud className="mr-2" />
            อัพโหลดข้อมูลโดย Excel{" "}
          </Button>
        </div>
        <Confirm
          button={
            <Button className="bg-green-600 hover:bg-green-600/80">
              <Icons.save className="mr-2 h-5 w-5" />
              ยืนยันข้อมูลและคำนวณ
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
    ),
  };

  return <>{renderElement[activeTab]}</>;
};

export default ActionTab;
