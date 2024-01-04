import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { ChangeEvent, forwardRef, Fragment, HTMLAttributes, useRef, useState } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: string | JSX.Element;
  className?: string;
  accept?: string;
  showFileName?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadFile = forwardRef<HTMLDivElement, Props>(
  ({ className, children, accept = "*", onChange, showFileName = true, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);

    function handleUpload() {
      inputRef.current?.click();
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      setFileNames(Array.from(e.target.files || []).map((item) => item.name));
      onChange?.(e);
    }

    function handleDeleteFilename() {
      setFileNames([]);
    }

    return (
      <div ref={ref} className="flex items-center gap-x-2">
        <div className={cn("relative overflow-visible", className)} {...props} onClick={handleUpload}>
          <Fragment>
            {children}
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleOnChange}
              required={false}
            />

            {!showFileName || fileNames?.length == 0 ? null : (
              <div className="text-mute-foreground text-secondary-foreground/60 no-underline">
                {fileNames?.map((item, i) => <span key={i}>{item}</span>)}
              </div>
            )}
          </Fragment>
        </div>
        {/* <button onClick={handleDeleteFilename}>ลบ</button> */}
        {!showFileName || fileNames?.length == 0 ? null : (
          <Icons.trash2 className="h-3.5 w-3.5 cursor-pointer text-red-500" onClick={handleDeleteFilename} />
        )}
      </div>
    );
  }
);

UploadFile.displayName = "UploadFile";

export { UploadFile };
