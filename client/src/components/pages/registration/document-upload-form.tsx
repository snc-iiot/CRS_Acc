import { Button } from "@/components/ui/button";
import { DocumentUpload } from "@/helpers/document.helper";
import { Sections } from "@/helpers/register.helper";
import { UploadFile } from "@/hooks/upload-file";
// import Base64Tools from "@/lib/base64-tools";
import { FC } from "react";

const DocumentUploadForm: FC = () => {
  // const base64Tools = new Base64Tools();
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
                    const files = e.target.files;
                    if (files?.length) {
                      // base64Tools.getBase64(e.target.files[0]).then((res) => {
                      // base64Tools.openBase64NewTab(res);
                      // });
                      console.log(files?.[0]?.name);
                    }
                  }}
                  accept="application/pdf"
                  showFileName={true}
                  className="flex items-center gap-x-1"
                >
                  <Button type="button">อัพโหลดไฟล์</Button>
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
