import { Icons } from "@/components/common/icons";
import RequiredTopic from "@/components/common/required-topic";
import { UploadFile } from "@/components/common/upload-file";
import { Base64Helpers } from "@/helpers/base64.helper";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { useForm, useUtils } from "@/services";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const R1UpdateDocuments: FC = () => {
  const [searchParams] = useSearchParams();
  const regisId = searchParams.get("RegisID");
  const { mutateGetDocByRegisId } = useUtils();
  const { mutateUploadFile, mutateDeleteDocById } = useForm();
  const [progress, setProgress] = useState<number>(0);
  const { docByRegisId, common } = useAtomStore();
  const [name, setName] = useState<string>("");
  const documentsInformation: {
    label: string;
    link: string;
    name: string;
  }[] = [
    {
      label: "BOM + Process",
      link: docByRegisId?.documents?.bom_process || "",
      name: "bom_process",
    },
    {
      label: "โครงสร้างราคา (Breakdown) ",
      link: docByRegisId?.documents?.cost_break_down || "",
      name: "cost_break_down",
    },
    {
      label: "ใบเสนอราคาและเงื่อนไขการปรับราคา",
      link: docByRegisId?.documents?.quotation || "",
      name: "quotation",
    },
    {
      label: "เอกสารอื่นๆ 1",
      link: docByRegisId?.documents?.internal_other1 || "",
      name: "internal_other1",
    },
    {
      label: "เอกสารอื่นๆ 2",
      link: docByRegisId?.documents?.internal_other1 || "",
      name: "internal_other2",
    },
    {
      label: "เอกสารอื่นๆ 3",
      link: docByRegisId?.documents?.internal_other1 || "",
      name: "internal_other3",
    },
  ];

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
    // Promise.all([
    //   mutateUploadFile(newReq),
    //   mutateGetDocByRegisId(regisId as string),
    // ]);
    await mutateUploadFile(newReq);
    await mutateGetDocByRegisId(regisId as string);
    document.getElementById(`${e.target.name}`)?.setAttribute("value", "");
    setTimeout(() => {
      setProgress(0);
    }, 3000);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      await handleUploadFile(file, e);
    }
  };

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
                {i + 1}. {item?.label} {i == 0 ? <RequiredTopic /> : null}
                {Array(100)
                  .fill(0)
                  .map(() => "........")
                  .join("")}
              </p>
              <div className="flex items-center gap-x-1">
                <button
                  className={cn(
                    "mr-2 flex cursor-pointer items-center gap-x-0.5 whitespace-nowrap text-right text-primary hover:underline",
                    !item?.link && "cursor-not-allowed opacity-50",
                  )}
                  onClick={() =>
                    window.open(`${docByRegisId?.file_path}/${item?.link}.pdf}`)
                  }
                  disabled={!item?.link}
                >
                  <Icons.fileDown className="h-4 w-4" />{" "}
                  <span>ดูและดาวน์โหลด</span>
                </button>
                <UploadFile
                  id={item?.name}
                  accept="application/pdf"
                  showFileName={false}
                  name={item?.name}
                  className={cn(
                    "cursor-pointer whitespace-nowrap text-primary hover:underline",
                    !common?.isEditGeneralAssessmentForm ? "hidden" : "",
                  )}
                  onChange={async (e) => {
                    console.log(e.target.files);
                    await handleFileChange(e);
                    setName(e.target.name);
                  }}
                >
                  <button className="cursor-pointer whitespace-nowrap text-xs text-primary hover:underline">
                    {item?.link ? "อัพโหลดซ้ำ" : "อัพโหลดเอกสาร"}
                    {progress > 0 && name == item?.name ? (
                      <span className="ml-2 text-xs text-red-500">
                        {progress}%
                      </span>
                    ) : null}
                  </button>
                </UploadFile>
                <button
                  className={cn(
                    "cursor-pointer whitespace-nowrap text-red-500 hover:underline",
                    !item?.link && "hidden",
                    !common?.isEditGeneralAssessmentForm && "hidden",
                  )}
                  onClick={async () => {
                    await mutateDeleteDocById({
                      regis_id: regisId as string,
                      doc_name: item?.name,
                    });
                    await mutateGetDocByRegisId(regisId as string);
                    document
                      .getElementById(`${item?.name}`)
                      ?.setAttribute("value", "");
                  }}
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};
