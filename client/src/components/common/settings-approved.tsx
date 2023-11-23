import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "./icons";

const SettingsApproved: FC = () => {
  const [count, setCount] = useState<number>(5);
  const Header = [
    "ลำดับ",
    "ชื่อ-นามสกุล",
    "ตำแหน่ง",
    "สถานะ",
    "วันที่อนุมัติ",
    "หมายเหตุ",
    "จัดการ",
  ];
  return (
    <main className="flex h-full w-full flex-col gap-2 overflow-hidden">
      <section>
        <h3 className="text-base font-bold">ตั้งค่าสายอนุมัติของคุณ</h3>
        <p className="text-sm text-foreground">
          ตั้งค่าสายอนุมัติของคุณเพื่อให้สามารถอนุมัติเอกสารได้
        </p>
        <Separator className="my-2" />
      </section>
      <section>
        <Button
          variant="link"
          className="text-green-600"
          onClick={() => setCount(count + 1)}
        >
          <Icons.plus className="mr-2 h-5 w-5" />
          เพิ่มผู้อนุมัติ
        </Button>
        <Button variant="link" className="text-secondary-foreground">
          <Icons.fileEdit className="mr-2 h-5 w-5" />
          แก้ไขผู้อนุมัติ
        </Button>
      </section>
      <section className="flex h-full w-full flex-col border">
        <div className="relative flex h-0 flex-grow flex-col overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-secondary">
              <TableRow>
                {Header?.map((info, i) => (
                  <TableHead className="text-secondary-foreground" key={i}>
                    {info}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {new Array(count).fill(0).length === 0 && (
                <TableRow className="p-0">
                  <TableCell colSpan={Header.length} className="text-center">
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
              )}
              {new Array(count).fill(0).map((_, i) => (
                <TableRow className="p-0" key={i}>
                  <TableCell className="w-10 text-center">{i + 1}</TableCell>
                  <TableCell>นาย อนุวัฒน์ ทีสุกะ</TableCell>
                  <TableCell>ผู้จัดการ</TableCell>
                  <TableCell className="text-green-600">อนุมัติ</TableCell>
                  <TableCell>01/01/2564</TableCell>
                  <TableCell>อนุมัติเอกสาร</TableCell>
                  <TableCell className="text-start text-red-600">
                    <p
                      className="text-sm hover:cursor-pointer"
                      onClick={() => setCount(count - 1)}
                    >
                      ลบ
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="text-right">
        <Button>
          <Icons.save className="mr-2 h-5 w-5" />
          ยืนยันการตั้งค่า
        </Button>
      </section>
    </main>
  );
};

export default SettingsApproved;
