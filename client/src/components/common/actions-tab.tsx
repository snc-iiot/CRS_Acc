import { useConfirm } from "@/hooks";
import { useSwal } from "@/hooks/use-swal";
import { useForm, useUtils } from "@/services";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Icons } from "./icons";

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
              showLoading();
              await mutateSyncDBD(regisId as string);
              closeSwal();
            }}
          >
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
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
