import { Icons } from "@/components/common/icons";
import { UploadFile } from "@/components/common/upload-file";
import { Button } from "@/components/ui/button";
import { Base64Helpers } from "@/helpers/base64.helper";
import { UploadDocument } from "@/helpers/document.helper";
import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useForm, useUtils } from "@/services";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DocumentUploadForm: FC = () => {
  const { mutateGetDocByRegisId } = useUtils();
  const { mutateUploadFile } = useForm();
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID");
  const { registration, docByRegisId } = useAtomStore();
  const [progress, setProgress] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const handleUploadFile = async (
    file: File | Blob,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const base64 = await Base64Helpers.getBase64(file as File);
    const newReq = {
      req: {
        regis_id: regisId as string,
        doc_name: e.target.name,
        content: base64.split(",")[1],
      },
      setProgress: (progress: number) => setProgress(progress),
    };
    await mutateUploadFile(newReq);
    await mutateGetDocByRegisId(regisId as string);
    setTimeout(() => {
      setProgress(0);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadFile(file, e);
      setName(e.target.name);
    }
  };

  return (
    <section id="upload-documents" className="pr-4">
      <main className="flex h-full w-full flex-col gap-2">
        <section className="flex w-full items-center justify-between">
          <h2 className="text-base font-bold">
            {Sections?.find((item) => item.id === "upload-documents")?.title}
          </h2>
        </section>
        <section className="flex h-full w-full flex-col gap-2">
          {UploadDocument(registration)?.map((item, i) => (
            <div
              className="grid w-full grid-cols-10 items-center gap-2"
              key={i}
            >
              <div className="col-span-4 flex justify-end">
                <h3 className="text-sm">{item?.label}</h3>
              </div>
              <div className="col-span-6 flex items-center">
                <UploadFile
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  id={item?.name}
                  accept="application/pdf"
                  showFileName={false}
                  name={item?.name}
                >
                  <Button
                    className={cn(
                      "rounded-md px-2 py-1 text-white",
                      docByRegisId?.documents?.[item?.name] !== ""
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-primary hover:bg-primary/80",
                      "w-[8rem]",
                    )}
                    type="button"
                  >
                    {docByRegisId?.documents?.[item?.name] !== "" ? (
                      <Icons.checkCircle2 className="mr-2 h-4 w-4" />
                    ) : (
                      <Icons.uploadCloudIcon className="mr-2 h-4 w-4" />
                    )}
                    {docByRegisId?.documents?.[item?.name] !== "" ? (
                      <p className="text-xs text-white">อัพโหลดใหม่</p>
                    ) : (
                      <p className="text-xs text-white">อัพโหลดเอกสาร</p>
                    )}
                  </Button>
                </UploadFile>
                <div>
                  {docByRegisId?.documents?.[item?.name] !== "" ? (
                    <div className="flex items-center gap-2">
                      <p
                        className="cursor-pointer text-sm text-primary hover:underline"
                        onClick={() => {
                          window.open(
                            `${docByRegisId?.file_path}/${docByRegisId
                              ?.documents?.[item?.name]}`,
                            "_blank",
                          );
                        }}
                      >
                        {docByRegisId?.documents?.[item?.name]}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      ยังไม่ได้อัพโหลดเอกสาร
                    </p>
                  )}
                  {progress > 0 && name === item?.name && (
                    <div className="flex items-center">
                      <div className="mr-3 h-2 w-20 rounded-full bg-gray-300">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{progress}%</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default DocumentUploadForm;
