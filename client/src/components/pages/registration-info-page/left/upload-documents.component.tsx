import { Icons } from "@/components/common/icons";
import { FC, Fragment } from "react";

const UploadDocuments: FC = () => {
  // console.log(docByRegisId);

  // const docList = Object.entries(docByRegisId?.documents).map(
  //   ([key, value]) => {
  //     return { label: key, value };
  //   },
  // );

  const MakArray = new Array(10).fill(0);

  return (
    <div className="mb-6 grid grid-cols-5 items-center gap-0.5 gap-y-0.5 pl-1 pr-4 text-xs">
      {MakArray?.length == 0
        ? null
        : MakArray?.map((item, i) => (
            <Fragment key={i}>
              <h5 className="col-span-3 overflow-x-hidden whitespace-nowrap">
                {i + 1}.
                {Array(100)
                  .fill(0)
                  .map(() => "......")
                  .join("")}
              </h5>
              <div className="col-span-2">
                <div className="flex select-none items-center pl-1 text-primary">
                  <Icons.fileText className="mr-1 h-4 w-4" />
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() =>
                      window.open(
                        "https://snc-services.sncformer.com/ivrs/docs/pdf/flow-iVRS2.pdf",
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
