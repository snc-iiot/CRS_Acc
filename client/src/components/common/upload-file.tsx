import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, useRef, useState } from "react";
import { Button } from "../ui/button";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode | JSX.Element | JSX.Element[] | string;
  callback?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showFileName?: boolean;
}

const UploadFile = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      className,
      onChange,
      children,
      showFileName = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const onButtonClick = () => {
      inputRef?.current?.click();
    };
    return (
      <div
        ref={ref}
        className={cn("item-center flex items-center gap-2", className)}
        id="upload-file"
      >
        <input
          type="file"
          name={name}
          className={cn("hidden")}
          ref={inputRef}
          onChange={(e) => {
            setFileNames(
              Array.from(e.target.files || []).map((item) => item.name),
            );
            onChange?.(e);
          }}
          {...props}
        />
        <Button type="button" onClick={onButtonClick}>
          {children}
        </Button>
        {showFileName && (
          <p className="text-mute-foreground text-sm">
            {fileNames?.map((item, i) => <span key={i}>{item}</span>)}
          </p>
        )}
      </div>
    );
  },
);

UploadFile.displayName = "UploadFile";

export { UploadFile };
