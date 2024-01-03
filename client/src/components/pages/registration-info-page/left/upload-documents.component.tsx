import { Icons } from "@/components/common/icons";
import { UploadDocument } from "@/helpers/document.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC, Fragment } from "react";

const UploadDocuments: FC = () => {
  const { docByRegisId, registration } = useAtomStore();

  // console.log(docList);

  // if (UploadDocument(registration)?.length == 0) {
  //   return (
  //     <div>
  //       <h5 className="text-center">ไม่มีเอกสารที่ต้องอัพโหลด</h5>
  //     </div>
  //   );
  // }

  return (
    <div className="mb-6 grid grid-cols-5 items-center gap-0.5 gap-y-0.5 pl-1 pr-4 text-xs">
      {UploadDocument(registration)?.length == 0
        ? null
        : UploadDocument(registration)?.map((item, i) => (
            <Fragment key={i}>
              <h5 className="col-span-3 overflow-x-hidden whitespace-nowrap">
                {i + 1}. {item?.label}
                {Array(100)
                  .fill(0)
                  .map(() => "......")
                  .join("")}
              </h5>
              <div className="col-span-2">
                <div className="flex select-none items-center pl-1 text-primary">
                  <Icons.fileText className="mr-1 h-4 w-4" />
                  <span
                    className={cn(
                      "cursor-pointer hover:underline",
                      docByRegisId?.documents[item?.name] === ""
                        ? "pointer-events-none cursor-not-allowed text-gray-500"
                        : "",
                    )}
                    onClick={() =>
                      window.open(
                        `${docByRegisId?.file_path}/${docByRegisId?.documents[
                          item?.name
                        ]}`,
                      )
                    }
                  >
                    ดูเพิ่มเติม
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
    </div>
  );
};

export default UploadDocuments;
