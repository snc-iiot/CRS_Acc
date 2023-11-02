import { DocumentUpload } from "@/helpers/document.helper";
import { Sections } from "@/helpers/register.helper";
import Base64Tools from "@/lib/base64-tools";
import { FC } from "react";
import { UploadFile } from "../common/upload-file";

const DocumentUploadForm: FC = () => {
  const base64Tools = new Base64Tools();
  return (
    <section id="upload-documents" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "upload-documents")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {DocumentUpload?.map((item, i) => (
            <div
              className="grid w-full grid-cols-10 items-center gap-2"
              key={i}
            >
              <div className="col-span-4 flex justify-end">
                <h3 className="text-sm">{item?.label}</h3>
              </div>
              <div className="col-span-6 flex">
                <UploadFile
                  onChange={(e) => {
                    if (e.target.files) {
                      base64Tools.getBase64(e.target.files[0]).then((res) => {
                        base64Tools.openBase64NewTab(res);
                      });
                    }
                  }}
                  accept="application/pdf"
                  showFileName={true}
                >
                  อัพโหลดไฟล์
                </UploadFile>
              </div>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default DocumentUploadForm;
