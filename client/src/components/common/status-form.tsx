import { sortByField } from "@/helpers/array.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Icons } from "./icons";

const StatusForm: FC = () => {
  const {
    generalAssessmentForm: { approvals },
  } = useAtomStore();

  return (
    <Popover>
      <PopoverTrigger className="flex cursor-pointer items-center gap-2 text-green-600">
        คลิกเพื่อดูสายอนุมัติ
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="h-[35rem] max-h-[35rem] w-[35rem] p-2"
      >
        <article className="flex h-full flex-col gap-2 overflow-y-auto">
          <h3 className="text-sm font-semibold">รายละเอียดสายอนุมัติ</h3>
          <div className="flex h-full flex-col gap-2 overflow-y-auto rounded-md border border-border p-2">
            <div className="flex flex-grow flex-col gap-1 overflow-y-auto">
              {approvals?.length === 0 && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-primary">ไม่มีข้อมูล</p>
                </div>
              )}
              {sortByField(approvals, "order_no")?.map((info, i) => (
                <div key={i}>
                  <div className="grid grid-cols-3 gap-2 rounded-md bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      {/* {info?.status === "approved" ? (
                        <Icons.checkCircle2 className="h-6 w-6 text-green-600" />
                      ) : info?.status === "rejected" ? (
                        <Icons.xCircle className="h-6 w-6 text-red-600" />
                      ) : info.status === "pending" ? (
                        <Icons.loader className="h-6 w-6 animate-spin text-yellow-600" />
                      ) : null} */}
                      {info.is_approved === null && (
                        <Icons.loader className="h-6 w-6 animate-spin text-yellow-600" />
                      )}
                      {info.is_approved === false && (
                        <Icons.xCircle className="h-6 w-6 text-red-600" />
                      )}
                      {info.is_approved === true && (
                        <Icons.checkCircle2 className="h-6 w-6 text-green-600" />
                      )}
                      <strong className="text-sm font-semibold">
                        {info?.issued_at}
                      </strong>
                    </div>
                    <p className="flex items-center justify-center text-sm text-primary">
                      ll
                    </p>
                    <div className="flex items-center justify-start text-sm text-primary">
                      {info?.issued_by?.toLocaleUpperCase()} ({info?.position})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </PopoverContent>
    </Popover>
  );
};

export default StatusForm;
