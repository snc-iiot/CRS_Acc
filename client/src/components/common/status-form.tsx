import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Icons } from "./icons";

const StatusForm: FC = () => {
  const status = [
    {
      status: "approved",
      statusLabel: "อนุมัติ",
      actionAt: "2021-09-01 12:00:00",
      actionBy: "นาย อนุวัฒน์ ทีสุกะ",
      comment: [
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
      ],
    },
    {
      status: "pending",
      statusLabel: "รออนุมัติ",
      actionAt: "",
      actionBy: "นาย อนุวัฒน์ ทีสุกะ",
      comment: [
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
      ],
    },
    {
      status: "pending",
      statusLabel: "รออนุมัติ",
      actionAt: "",
      actionBy: "นาย อนุวัฒน์ ทีสุกะ",
      comment: [
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
      ],
    },
    {
      status: "pending",
      statusLabel: "รออนุมัติ",
      actionAt: "",
      actionBy: "นาย อนุวัฒน์ ทีสุกะ",
      comment: [
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
      ],
    },
    {
      status: "pending",
      statusLabel: "รออนุมัติ",
      actionAt: "",
      actionBy: "นาย อนุวัฒน์ ทีสุกะ",
      comment: [],
    },
    {
      status: "pending",
      statusLabel: "รออนุมัติ",
      actionAt: "",
      actionBy: "นาย อนุวัฒน์ ทีสุกะ",
      comment: [
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
        {
          comment: "เป็นลูกค้าคนที่ดีมากๆ ครับ ขอบคุณมากครับ 🙏",
          commentAt: "2021-09-01 12:00:00",
        },
      ],
    },
  ];

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
              {status.map((info, i) => (
                <div key={i}>
                  <div className="grid grid-cols-3 gap-2 rounded-md bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      {info?.status === "approved" ? (
                        <Icons.checkCircle2 className="h-6 w-6 text-green-600" />
                      ) : info?.status === "rejected" ? (
                        <Icons.xCircle className="h-6 w-6 text-red-600" />
                      ) : info.status === "pending" ? (
                        <Icons.loader className="h-6 w-6 animate-spin text-yellow-600" />
                      ) : null}
                      <strong className="text-sm font-semibold">
                        {info?.statusLabel}
                      </strong>
                    </div>
                    <p className="flex items-center justify-center text-sm text-primary">
                      {info?.actionAt}
                    </p>
                    <div className="flex items-center justify-center text-sm text-primary">
                      โดย นาย อนุวัฒน์ ทีสุกะ
                    </div>
                  </div>
                  <div className={cn("flex h-max items-center px-[1.23rem]")}>
                    <div className="flex items-center border-l border-dashed py-1">
                      {info?.comment?.length > 0 ? (
                        <>
                          <Separator className="w-[5rem] border-dashed" />
                          <div className="flex h-max flex-col overflow-auto px-2">
                            {info?.comment?.map((comment, i) => (
                              <p
                                key={i}
                                className="flex items-center justify-center text-xs text-muted-foreground"
                              >
                                {comment?.comment} {comment?.commentAt}
                              </p>
                            ))}
                          </div>
                        </>
                      ) : null}
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
