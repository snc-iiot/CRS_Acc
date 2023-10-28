import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";

// import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
  text?: string;
  delay?: number;
  className?: string;
}

type Ref = HTMLDivElement;

export const CopyToClipboardCustom = forwardRef<Ref, Props>(
  ({ text = "", delay = 1000, className = "" }, ref) => {
    const beforeRef = useRef<SVGSVGElement>(null);
    const afterRef = useRef<SVGSVGElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    function handleCopyToClipboard() {
      beforeRef?.current?.classList?.add("hidden");
      beforeRef?.current?.classList?.remove("block");
      afterRef?.current?.classList?.remove("hidden");
      afterRef?.current?.classList?.add("block");
      setTimeout(() => {
        beforeRef?.current?.classList.remove("hidden");
        beforeRef?.current?.classList?.add("block");
        afterRef?.current?.classList?.add("hidden");
        afterRef?.current?.classList?.remove("block");
      }, delay);
      inputRef.current?.select();
      document?.execCommand("copy");
      inputRef.current?.focus();
    }

    return (
      <div ref={ref}>
        {/* <CopyToClipboard text={text}> */}
        <div className="relative overflow-hidden">
          <Icons.copy
            ref={beforeRef}
            className={cn(
              "h-3 w-3 cursor-pointer hover:scale-105 hover:drop-shadow-[1px_1px_3px_rgba(50,200,20,0.5)]",
              className,
            )}
            onClick={handleCopyToClipboard}
          />
          <Icons.checkCircle
            ref={afterRef}
            className={cn("hidden h-3 w-3 text-green-600", className)}
          />
          <input
            ref={inputRef}
            type="text"
            defaultValue={text}
            className="absolute right-[1000px] top-0"
          />
        </div>
        {/* </CopyToClipboard> */}
      </div>
    );
  },
);
