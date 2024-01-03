import { sortByField } from "@/helpers/array.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { TApproval } from "@/types";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Icons } from "./icons";

const StatusForm: FC = () => {
  // const { profile } = useProfile();
  const {
    registration,
    generalAssessmentForm: { approvals },
  } = useAtomStore();

  const IndexDisApprove = approvals?.findIndex(
    (item) => item.is_approved === false,
  );

  if (registration.status_no && registration?.status_no < 2) {
    return null;
  }

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
              {sortByField(approvals, "order_no")?.map((info: TApproval, i) => (
                <div key={i}>
                  <div className="grid grid-cols-3 gap-2 rounded-md bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      {info.is_approved === null && (
                        <>
                          <Icons.loader
                            className={cn(
                              "h-6 w-6 text-yellow-600",
                              IndexDisApprove > -1 && i > IndexDisApprove
                                ? "text-gray-500 line-through"
                                : "",
                            )}
                          />
                          <strong
                            className={cn(
                              "text-sm font-semibold",
                              IndexDisApprove > -1 && i > IndexDisApprove
                                ? "text-gray-500 line-through"
                                : "",
                            )}
                          >
                            รอพิจารณาอนุมัติ
                          </strong>
                        </>
                      )}
                      {info.is_approved === false && (
                        <>
                          <Icons.xCircle className="h-6 w-6 text-red-600" />
                          <strong className="text-sm font-semibold">
                            ไม่อนุมัติ
                          </strong>
                        </>
                      )}
                      {info.is_approved === true && (
                        <>
                          <Icons.checkCircle className="h-6 w-6 text-green-600" />
                          <strong className="text-sm font-semibold">
                            อนุมัติ
                          </strong>
                        </>
                      )}
                    </div>
                    <div className="flex items-center justify-start gap-2 text-xs text-primary">
                      <p className="whitespace-nowrap">
                        โดย {info?.issued_by?.toLocaleUpperCase()} (
                        {info?.position})
                      </p>
                      <p className="whitespace-nowrap text-xs text-primary">
                        {info?.issued_at?.toLocaleString()}
                      </p>
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
