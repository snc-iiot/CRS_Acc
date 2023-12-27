import { UploadDocument } from "@/helpers/document.helper";
import { IDecodedToken } from "@/helpers/jwt.helper";
import { Sections } from "@/helpers/register.helper";
import { useAtomStore } from "@/store/use-atom-store";
import { FC } from "react";

const DocumentUploadForm: FC = () => {
  const payload: IDecodedToken | null = JSON.parse(
    localStorage.getItem("payload-icrs") || "null",
  );
  const { registration } = useAtomStore();

  if (!payload) return null;

  return (
    <section id="upload-documents" className="flex flex-col gap-1 pr-4">
      {/* <main className="flex h-full w-full flex-col gap-2">
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
                  <Button className="rounded-md bg-primary px-2 py-1 text-white">
                    <Icons.uploadCloudIcon className="mr-2 h-4 w-4" />
                    อัพโหลดเอกสาร
                  </Button>
                </UploadFile>
              </div>
            </div>
          ))}
        </section>
      </main> */}
      <h2 className=" text-base font-bold">
        {Sections?.find((item) => item.id === "upload-documents")?.title}
      </h2>
      <h3 className="ml-[14rem] text-sm font-bold text-red-600">
        หมายเหตุ: เพื่อให้การลงทะเบียนเสร็จสมบูรณ์
        กรุณานำส่งเอกสารที่เกี่ยวข้องได้ที่ Email: {payload?.email}
      </h3>
      <div className="ml-[14rem]">
        <h3 className="text-sm  font-bold">เอกสารที่ต้องใช้</h3>
        {UploadDocument(registration)?.map((info, i) => (
          <li key={i} className="text-sm">
            {info?.label}
          </li>
        ))}
      </div>
    </section>
  );
};

export default DocumentUploadForm;
