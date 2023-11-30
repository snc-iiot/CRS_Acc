import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import ThaiProvince from "@/mock/demo-province.json";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Icons } from "./icons";

const SettingsApproved: FC = () => {
  const [numberOfApprover, setNumberOfApprover] = useState<number>(0);
  const [searchOptions, setSearchOptions] = useState<string>("");
  const [selected, setSelected] = useState<
    {
      index: number;
      id: string;
      value: string;
    }[]
  >([]);

  const Header = [
    "ลำดับ",
    "ชื่อ-นามสกุล",
    "ตำแหน่ง",
    "Email",
    "เบอร์โทรศัพท์",
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
      <section className="flex items-center gap-2">
        <Button
          variant="link"
          className="text-green-600"
          onClick={() => {
            setNumberOfApprover(numberOfApprover + 1);
          }}
        >
          <Icons.plus className="mr-2 h-5 w-5" />
          เพิ่มผู้อนุมัติ
        </Button>
        <Button variant="link" className="text-muted-foreground">
          <Icons.helpCircle className="mr-2 h-5 w-5" />
          วิธีการตั้งค่าสายอนุมัติ
        </Button>
      </section>
      <section className="flex h-full w-full flex-col border">
        <div className="relative flex h-0 flex-grow flex-col overflow-y-auto">
          <Table className="h-full w-full">
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
              {new Array(numberOfApprover).fill(0).length === 0 && (
                <TableRow className="p-0">
                  <TableCell colSpan={Header.length} className="text-center">
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
              )}
              {new Array(numberOfApprover).fill(0).map((_, j) => (
                <TableRow className="border-y p-0 hover:bg-transparent" key={j}>
                  <TableCell className="w-10 text-center">{j + 1}</TableCell>
                  <TableCell className="p-0">
                    <Popover modal>
                      <PopoverTrigger className="text-primary hover:underline">
                        {selected?.find((item) => item?.index === j)?.id ||
                          "เลือกผู้อนุมัติ"}
                      </PopoverTrigger>
                      <PopoverContent align="start" className="h-60 w-72 p-1">
                        <main className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                          <section>
                            <div className="relative">
                              <Input
                                placeholder="ค้นหา"
                                onChange={(e) => {
                                  setSearchOptions(e.target.value);
                                }}
                                value={searchOptions}
                              />
                              <Icons.close
                                className="absolute right-2 top-1/2 z-10 h-6 w-6 -translate-y-1/2 transform rounded-full bg-secondary p-1 text-secondary-foreground hover:text-primary"
                                onClick={() => {
                                  setSearchOptions("");
                                }}
                              />
                            </div>
                          </section>
                          <section className="flex h-full w-full flex-col gap-2 overflow-hidden rounded-md border">
                            <div className="flex h-0 flex-grow flex-col overflow-y-auto">
                              {ThaiProvince?.filter(
                                (info) =>
                                  info?.name_th
                                    .toLowerCase()
                                    .includes(searchOptions.toLowerCase()),
                              )?.filter(
                                (info) =>
                                  !selected?.find(
                                    (item) => item?.id === info?.name_th,
                                  ),
                              ).length === 0 && (
                                <p className="p-2 text-center text-sm hover:bg-primary-foreground">
                                  ไม่มีข้อมูล
                                </p>
                              )}
                              {ThaiProvince?.filter(
                                (info) =>
                                  info?.name_th
                                    .toLowerCase()
                                    .includes(searchOptions.toLowerCase()),
                              )
                                ?.filter(
                                  (info) =>
                                    !selected?.find(
                                      (item) => item?.id === info?.name_th,
                                    ),
                                )
                                ?.map((info, i) => (
                                  <p
                                    className={cn(
                                      "cursor-pointer p-2 text-sm",
                                      selected?.find(
                                        (item) => item?.index === j,
                                      )?.id == info?.name_th
                                        ? "bg-primary p-2 text-primary-foreground"
                                        : "p-2 text-sm hover:bg-primary-foreground",
                                    )}
                                    onClick={() => {
                                      console.log(info?.name_th);
                                      setSelected([
                                        ...selected.filter(
                                          (item) => item?.index !== j,
                                        ),
                                        {
                                          index: j,
                                          id: info?.name_th,
                                          value: info?.name_th,
                                        },
                                      ]);
                                    }}
                                    key={i}
                                  >
                                    {info?.name_th}
                                  </p>
                                ))}
                            </div>
                          </section>
                        </main>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>ผู้จัดการ</TableCell>
                  <TableCell>Anuwat57766@gmail.com</TableCell>
                  <TableCell>098-765-4321</TableCell>
                  <TableCell className="text-start text-red-600">
                    <p
                      className="text-sm hover:cursor-pointer"
                      onClick={() => {
                        setNumberOfApprover(numberOfApprover - 1);
                      }}
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
