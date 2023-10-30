import { Icons } from "@/components/common/icons";
import Base64Tools from "@/lib/base64-tools";
import { cn } from "@/lib/utils";
import { forwardRef, Fragment, useRef } from "react";

interface Props {
  children?: string | JSX.Element;
  className?: string;
  acceptFiles?: string;
  callbackFn: (filename: string, base64: string) => void;
}

type Ref = HTMLDivElement;

const UploadFile = forwardRef<Ref, Props>(
  ({ className, children, acceptFiles = "*", callbackFn, ...props }, ref) => {
    const base64Tools = new Base64Tools();
    const inputRef = useRef<HTMLInputElement>(null);
    const uploadingRef = useRef<SVGSVGElement>(null);
    const uploadedRef = useRef<SVGSVGElement>(null);

    function handleUpload() {
      inputRef.current?.click();
    }

    async function handleSelectedFile() {
      if (inputRef.current?.files?.length) {
        try {
          uploadingRef.current?.classList?.remove("hidden");
          uploadingRef.current?.classList?.add("block");
          const file = inputRef.current?.files[0];
          const filename: string = file?.name;
          const base64 = await base64Tools.getBase64(file);
          // console.log(base64);
          uploadingRef.current?.classList?.remove("block");
          uploadingRef.current?.classList?.add("hidden");

          uploadedRef.current?.classList?.remove("hidden");
          uploadedRef.current?.classList?.add("block");
          setTimeout(() => {
            uploadedRef.current?.classList?.remove("block");
            uploadedRef.current?.classList?.add("hidden");
          }, 1000);

          callbackFn(filename, base64);
        } catch (error) {
          console.error(error);
        }
      }
    }

    return (
      <div ref={ref}>
        <div
          className={cn("relative", className)}
          {...props}
          onClick={handleUpload}
        >
          <Fragment>
            {children}
            <input
              ref={inputRef}
              type="file"
              accept={acceptFiles}
              className="hidden"
              onChange={handleSelectedFile}
            />
            <Icons.hourglass
              ref={uploadingRef}
              className="absolute right-[-1.5rem] top-[50%] hidden h-4 w-4 translate-y-[-50%] text-yellow-500"
            />
            <Icons.check
              ref={uploadedRef}
              className="absolute right-[-1.5rem] top-[50%] hidden h-4 w-4 translate-y-[-50%] text-green-500"
            />
          </Fragment>
        </div>
      </div>
    );
  },
);

UploadFile.displayName = "UploadFile";

export { UploadFile };
