import { Icons } from "@/components/common/icons";
// import { Button } from "@/components/ui/button";
import { FC, Fragment } from "react";

const UploadDocuments: FC = () => {
  const documentInformation: { label: string; file: string }[] = [
    {
      label: "นโยบายต่อต้านทุจริตคอร์ปชั่น",
      file: "#",
    },
    {
      label: "ภ.พ.20",
      file: "#",
    },
    {
      label: "หนังสือรับรองบริษัท",
      file: "#",
    },
    {
      label: "งบการเงิน 5 ปี",
      file: "#",
    },
    {
      label: "ระเบียบการวางบิล รับเช็ค/โอนเงิน/เงินสด",
      file: "#",
    },
    {
      label: "แผนที่บริษัท",
      file: "#",
    },
    {
      label: "ผังองค์กร",
      file: "#",
    },
    {
      label: "สัญญาซื้อขายกับลูกค้า",
      file: "#",
    },
    {
      label: "เยี่ยมชมโรงงาน / รูปถ่าย",
      file: "#",
    },
    {
      label: "เอกสารอื่นๆ 1",
      file: "#",
    },
    {
      label: "เอกสารอื่นๆ 2",
      file: "#",
    },
    {
      label: "เอกสารอื่นๆ 3",
      file: "#",
    },
  ];
  return (
    <div className="mb-6 grid grid-cols-5 items-center gap-0.5 gap-y-0.5 pl-1 pr-4 text-xs">
      {documentInformation?.length == 0
        ? null
        : documentInformation?.map((item, i) => (
            <Fragment key={i}>
              <h5 className="col-span-3 overflow-x-hidden whitespace-nowrap">
                {i + 1}. {item?.label}{" "}
                {Array(100)
                  .fill(0)
                  .map(() => "......")
                  .join("")}
              </h5>
              <div className="col-span-2 w-full">
                <div
                  className="col-span-2 flex w-[10rem] cursor-pointer items-center pl-1 text-left text-primary hover:underline"
                  onClick={() =>
                    window.open(
                      "https://snc-services.sncformer.com/ivrs/docs/pdf/flow-iVRS2.pdf",
                    )
                  }
                >
                  <Icons.fileText className="mr-1 h-4 w-4" />
                  <span>ดูเพิ่มเติม</span>
                </div>
              </div>
            </Fragment>
          ))}
    </div>
  );
};

export default UploadDocuments;
