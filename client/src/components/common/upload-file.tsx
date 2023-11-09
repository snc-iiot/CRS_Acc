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
  deleteButton?: React.ReactNode | JSX.Element | JSX.Element[] | string;
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
      deleteButton = <></>,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const onButtonClick = () => {
      inputRef?.current?.click();
    };

    const conditionChildren = (children: any, props: Props) => {
      if (typeof children === "string") {
        return (
          <Button
            onClick={onButtonClick}
            type="button"
            disabled={props.disabled}
          >
            {children}
          </Button>
        );
      }
      return (
        <div
          onClick={onButtonClick}
          className={cn("cursor-pointer", {
            "pointer-events-none cursor-not-allowed opacity-50 hover:cursor-not-allowed":
              props.disabled,
          })}
        >
          {children}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn("item-center flex items-center gap-2 text-sm", className)}
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

        {label ? <label htmlFor={name}>{label}</label> : null}
        {conditionChildren(children, props)}
        {showFileName ? (
          <p className="text-mute-foreground truncate">
            {fileNames?.map((item, i) => <span key={i}>{item}</span>)}
          </p>
        ) : null}
        <div
          onClick={() => {
            setFileNames([]);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
          className={cn("cursor-pointer", {
            "opacity-0": !fileNames?.length,
            "opacity-100": fileNames?.length,
          })}
        >
          {deleteButton}
        </div>
      </div>
    );
  },
);

UploadFile.displayName = "UploadFile";

export { UploadFile };
