import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import MockData from "@/mock/r4.mock.json";
import { FC } from "react";

const R3Form: FC = () => {
  const data = MockData;
  return (
    <div className="relative flex w-full flex-col gap-2">
      <div>
        <h3 className="text-base font-bold">
          ผลประเมินอัตราส่วนทางการเงิน / Financial Ratio Assessment Report
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Table className="w-full border-collapse border-spacing-0 border">
          <TableHeader
            className={cn("top-0 z-10 bg-primary-foreground", "sticky")}
          >
            <TableRow className="text-xs ">
              <TableHead
                rowSpan={2}
                className="border text-start font-bold text-black"
              >
                รายการ
              </TableHead>
              <TableHead
                rowSpan={2}
                className="border-x-none border-y text-center font-bold text-black"
              >
                Note
              </TableHead>
              <TableHead
                colSpan={data[0]?.data[0]?.current.length}
                className="border-b-none border-l border-t text-center font-bold text-black"
              >
                งบการเงินกิจการ
              </TableHead>
            </TableRow>
            <TableRow className="text-xs">
              {data[0]?.data[0]?.current.map((data) => (
                <TableHead
                  key={data?.year}
                  className="border text-center font-bold text-black"
                >
                  {data?.year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {data.map((item, index) => (
            <TableBody key={index}>
              <TableRow className="bg-primary-foreground text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-foreground">
                <TableCell
                  className="border font-bold"
                  colSpan={item?.data[0]?.current.length + 2}
                >
                  {item.name}
                </TableCell>
              </TableRow>
              {item.data.map((data, j) => (
                <TableRow
                  className="text-xs hover:cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  key={j}
                >
                  <TableCell className="border">{data.list_name}</TableCell>
                  <TableCell className="border text-center">
                    {data.note}
                  </TableCell>
                  {data.current.map((data, i) => (
                    <TableCell
                      key={i}
                      className={cn(
                        "border text-end",
                        data?.year === new Date().getFullYear()
                          ? "bg-secondary font-bold text-secondary-foreground"
                          : "",
                      )}
                    >
                      {data?.value ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ))}
        </Table>
        <div className="flex h-96 max-h-96 w-full flex-col gap-2">
          <h2 className="text-base font-bold">ความคิดเห็น</h2>
          <div className="flex h-full w-full flex-col rounded-md border border-dashed border-primary p-2">
            <div className="flex h-0 flex-grow flex-col gap-2 overflow-auto">
              {new Array(20).fill(0).map((_, i) => (
                <div className="grid grid-cols-10" key={i}>
                  <p className="col-span-6 text-xs text-black">
                    งบการเงินน้อยเกินไป ควรปรับปรุง และปรับปรุงการบริหาร
                  </p>
                  <p className="col-span-4 text-xs text-black">
                    : นาย อนุวัฒน์ ทีสุกะ {new Date().toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button>เพิ่มความคิดเห็น</Button>
            </PopoverTrigger>
            <PopoverContent align="start" side="top" className="h-60 w-72 p-1">
              <main className="flex h-full w-full flex-col gap-2 overflow-hidden p-1">
                <h2 className="px-2 py-1 text-sm font-semibold underline">
                  เพิ่มข้อเสนอแนะ / Add Comments
                </h2>
                <Textarea className="h-full w-full" />
                <div className="text-end">
                  <Button size="sm">บันทึก</Button>
                </div>
              </main>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default R3Form;
