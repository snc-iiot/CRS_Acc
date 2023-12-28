import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderArrayBy } from "@/helpers/array.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { useFormGeneral } from "@/services/hooks/use-general-form";
// import * as SheetPrimitive from "@radix-ui/react-dialog";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Select } from "../ui/select-custom";

// import { Icons } from "./icons";

interface Props {
  closeButton: any;
}

const SettingsApproved: FC<Props> = ({ closeButton }) => {
  const [searchParams] = useSearchParams();
  const regis_id = searchParams.get("RegisID");
  const { approvalList, generalAssessmentForm, setGeneralAssessmentForm } =
    useAtomStore();
  const { mutateGetApprovalsById } = useFormGeneral();
  const [approvalSetId, setApprovalSetId] = useState<string | null>(null);
  const Header = ["ลำดับ", "ชื่อ-นามสกุล", "ตำแหน่ง"];
  const sortApprovalList = orderArrayBy(
    generalAssessmentForm?.approvals,
    "order_no",
  );

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
        <div className="flex items-center gap-2 px-1">
          <p className="whitespace-nowrap text-sm text-primary">
            เลือกสายอนุมัติที่ต้องการ
          </p>
          <div className="w-[10rem]">
            <Select
              placeholder="เลือกสายอนุมัติ"
              className="w-full"
              onChange={(e) => {
                const approval = approvalList?.find(
                  (info) => info?.approvals_set_id === e.target.value,
                );
                setGeneralAssessmentForm((prev) => ({
                  ...prev,
                  approvals: approval ? approval?.approvals : [],
                }));
                setApprovalSetId(e.target.value);
              }}
              value={approvalSetId ?? ""}
            >
              {approvalList?.map((info, i) => (
                <option value={info?.approvals_set_id} key={i}>
                  {info?.business_unit}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {approvalSetId?.length === 0 && (
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={async () => {
              if (regis_id) {
                await mutateGetApprovalsById(regis_id);
              }
            }}
          >
            รีโหลดสายอนุมัติ
          </Button>
        )}
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
              {sortApprovalList?.length === 0 && (
                <TableRow className="p-0">
                  <TableCell colSpan={Header.length} className="text-center">
                    ไม่มีข้อมูล
                  </TableCell>
                </TableRow>
              )}
              {sortApprovalList?.map((item, j) => (
                <TableRow className="border-y p-0 hover:bg-transparent" key={j}>
                  <TableCell className="w-10 text-center">{j + 1}</TableCell>
                  <TableCell className="p-0">
                    {item?.issued_by?.toLocaleUpperCase() ?? "-"}
                  </TableCell>
                  <TableCell className="p-0">
                    {item?.position?.toLocaleUpperCase() ?? "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <section className="w-full">
        <div className="flex w-full justify-end">{closeButton}</div>
      </section>
    </main>
  );
};

export default SettingsApproved;
