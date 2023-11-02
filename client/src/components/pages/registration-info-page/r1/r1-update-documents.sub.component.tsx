import { Icons } from "@/components/common/icons";
import { UploadFile } from "@/hooks/upload-file";
import { ChangeEvent, FC, Fragment } from "react";

export const R1UpdateDocuments: FC = () => {
  const documentsInformation: { label: string; link: string }[] = [
    { label: "BOM + Process", link: "" },
    { label: "โครงสร้างราคา", link: "" },
    { label: "เงื่อนไขการปรับราคา", link: "" },
    { label: "เอกสารอื่นๆ 1", link: "" },
    { label: "เอกสารอื่นๆ 2", link: "" },
    { label: "เอกสารอื่นๆ 3", link: "" },
  ];

  function handleUploadFile(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.length) console.log(files?.[0]?.name);
  }

  return (
    <div className="pl-1 text-xs">
      {documentsInformation.length == 0
        ? null
        : documentsInformation.map((item, i) => (
            <div
              key={i}
              className="grid w-[80%] grid-cols-7 items-center gap-x-1"
            >
              <p className="col-span-3 overflow-x-hidden whitespace-nowrap">
                {i + 1}. {item?.label}{" "}
                {Array(100)
                  .fill(0)
                  .map(() => "........")
                  .join("")}
              </p>
              <div className="flex items-center gap-x-1">
                <div
                  className="text-righ mr-2 flex cursor-pointer items-center gap-x-0.5 whitespace-nowrap text-primary hover:underline"
                  onClick={() =>
                    window.open(
                      "https://snc-services.sncformer.com/ivrs/docs/pdf/flow-iVRS2.pdf",
                    )
                  }
                >
                  <Icons.fileDown className="h-4 w-4" />{" "}
                  <span>ดูและดาวน์โหลด</span>
                </div>
                <UploadFile
                  className="text-righ flex cursor-pointer items-center gap-x-0.5 whitespace-nowrap text-primary hover:underline"
                  accept="application/pdf"
                  onChange={handleUploadFile}
                >
                  <Fragment>
                    <Icons.fileUp className="h-4 w-4" /> <span>อัพโหลดซ้ำ</span>
                  </Fragment>
                </UploadFile>
              </div>
            </div>
          ))}
    </div>
  );
};
