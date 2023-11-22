import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";
import { Button } from "../ui/button";

const CalculatePlayback: FC = () => {
  const [selected, setSelected] = useState<"auto" | "manual" | "">("");
  return (
    <Dialog>
      <DialogTrigger className="text-xs text-primary">Auto</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>คำนวณ ระยะเวลาการคืนทุน</DialogTitle>
          <DialogDescription>
            ท่านสามารถเลือกวิธีการคำนวณ ระยะเวลาการคืนทุนได้ โดยที่
            "สำหรับรู้งบ"
          </DialogDescription>
        </DialogHeader>
        {selected === "" ? (
          <div>cbjksdn</div>
        ) : (
          <div className="flex flex-col space-y-2">
            <Button className="w-full" onClick={() => setSelected("auto")}>
              สำหรับรู้งบ
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setSelected("manual")}
            >
              สำหรับรู้งบ
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CalculatePlayback;
