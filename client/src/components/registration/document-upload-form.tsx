import { DocumentUpload } from "@/helpers/document.helper";
import { Sections } from "@/helpers/register.helper";
import { FC } from "react";
import { Icons } from "../common/icons";
import { UploadFile } from "../common/upload-file";

const DocumentUploadForm: FC = () => {
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
                    console.log(e);
                  }}
                  accept="application/pdf"
                  showFileName={true}
                  deleteButton={
                    <Icons.trash className="h-4 w-4 text-red-500" />
                  }
                  disabled
                >
                  <Icons.file className="h-4 w-4 text-primary" />
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
