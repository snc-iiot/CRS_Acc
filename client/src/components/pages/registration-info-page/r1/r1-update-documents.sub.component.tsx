import { Icons } from "@/components/common/icons";
import { UploadFile } from "@/hooks/upload-file";
import Base64Tools from "@/lib/base64-tools";
import { FC, Fragment } from "react";

export const R1UpdateDocuments: FC = () => {
  const documentsInformation: { label: string; link: string }[] = [
    { label: "BOM + Process", link: "" },
    { label: "โครงสร้างราคา", link: "" },
    { label: "เงื่อนไขการปรับราคา", link: "" },
    { label: "เอกสารอื่นๆ 1", link: "" },
    { label: "เอกสารอื่นๆ 2", link: "" },
    { label: "เอกสารอื่นๆ 3", link: "" },
  ];

  function handleUploadFile(filename: string, base64: string) {
    console.log(filename);
    console.log(base64);

    const test = new Base64Tools();
    test.openBase64NewTab(
      base64.split("data:application/pdf;base64,").join(""),
    );
  }

  return (
    <div className="pl-1 text-xs">
      {documentsInformation.length == 0
        ? null
        : documentsInformation.map((item, i) => (
            <div key={i} className="flex w-[80%] items-center gap-x-1">
              <p className="overflow-x-hidden whitespace-nowrap">
                {i + 1}. {item?.label}{" "}
                {Array(100)
                  .fill(0)
                  .map(() => "........")
                  .join("")}
              </p>
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
                acceptFiles="application/pdf"
                callbackFn={handleUploadFile}
              >
                <Fragment>
                  <Icons.fileUp className="h-4 w-4" /> <span>อัพโหลดซ้ำ</span>
                </Fragment>
              </UploadFile>
            </div>
          ))}
    </div>
  );
};
