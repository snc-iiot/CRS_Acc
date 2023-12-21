// import { Icons } from "@/co/common/icons";
import { Icons } from "@/components/common/icons";
import { UploadFile } from "@/components/common/upload-file";
// import { Button } from "../ui/button";
import { Button } from "@/components/ui/button";
import { DocumentUpload } from "@/helpers/document.helper";
import { Sections } from "@/helpers/register.helper";
import { FC } from "react";

const DocumentUploadForm: FC = () => {
  const data = [...DocumentUpload];

  return (
    <section id="upload-documents" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "upload-documents")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {data?.map((item, i) => (
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
                >
                  <Button
                    className="rounded-md bg-primary px-2 py-1 text-white"
                    type="button"
                  >
                    <Icons.uploadCloudIcon className="mr-2 h-4 w-4" />
                    อัพโหลดเอกสาร
                  </Button>
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
