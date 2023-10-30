import { Icons } from "@/components/common/icons";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";

interface Props {
  text?: string;
  delay?: number;
  className?: string;
}

type Ref = HTMLDivElement;

const CopyToClipboardCustom = forwardRef<Ref, Props>(
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
        <div className="relative overflow-hidden">
          <Icons.copy
            ref={beforeRef}
            className={cn("cursor-pointer hover:scale-105", className)}
            onClick={handleCopyToClipboard}
          />
          <Icons.check
            ref={afterRef}
            className={cn("hidden text-green-600", className)}
          />
          <input
            ref={inputRef}
            type="text"
            defaultValue={text}
            className="absolute right-[1000px] top-0"
          />
        </div>
      </div>
    );
  },
);

CopyToClipboardCustom.displayName = "CopyToClipboardCustom";

export { CopyToClipboardCustom };
