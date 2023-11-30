import { useConfirm } from "@/hooks";
import { FC } from "react";
import { Button } from "../ui/button";
import { Icons } from "./icons";

interface Props {
  activeTab: "R1" | "R2" | "R3" | "R4" | "R5";
}

const ActionTab: FC<Props> = ({ activeTab = "R1" }) => {
  const { Confirm } = useConfirm();
  const renderElement = {
    ["R1"]: (
      <div className="flex w-full items-center justify-end">
        <Button className="bg-green-600 hover:bg-green-600/80">
          <Icons.save className="mr-2 h-5 w-5" />
          บันทึกข้อมูล
        </Button>
      </div>
    ),
    ["R2"]: (
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Icons.refreshCcw className="mr-2" />
            Sync ข้อมูล DBD
          </Button>
          <Button variant="secondary">
            <Icons.uploadCloudIcon className="mr-2" />
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
