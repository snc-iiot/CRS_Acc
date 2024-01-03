import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export interface InputAddonProps extends InputHTMLAttributes<HTMLSpanElement> {}

const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full",
          "[&>span]:block [&>span]:whitespace-nowrap",
          "[&_input]:block [&_input]:whitespace-nowrap",
          // "[&>span:not(:first-child):not(:last-child)]:rounded-0",
          "[&>span:first-child]:rounded-[6px_0_0_6px]",
          "[&_input:first-child]:rounded-[6px_0_0_6px]",
          "[&>span:last-child]:rounded-[0_6px_6px_0]",
          "[&_input:last-child]:rounded-[0_6px_6px_0]",
          "[&>span:not(:first-child)]:ml-[-1px]",
          "[&_input:not(:first-child)]:ml-[-1px]",
          "[&_input]:relative [&_input]:z-[1] [&_input]:my-0 [&_input]:w-[1%] [&_input]:flex-[1_1_auto]",
          "[&>span]:border [&>span]:border-[#CDD9ED] [&>span]:bg-[#EEF4FF] [&>span]:px-[.75rem] [&>span]:py-[.5rem] [&>span]:text-center [&>span]:leading-[1rem] [&>span]:text-[#99A3BA] [&>span]:transition-[background_border_color] [&>span]:delay-300 [&>span]:ease-in-out",
          "focus-within:[&>span]:border-[#275EFE] focus-within:[&>span]:bg-[#678EFE] focus-within:[&>span]:text-[#fff]",
          className,
        )}
        {...props}
      />
    );
  },
);
InputGroup.displayName = "InputGroup";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        style={{ WebkitAppearance: "none" }}
        className={cn(
          "block w-full border border-[#CDD9ED] bg-[#fff] px-[1rem] py-[0.5rem] text-[1rem] font-[500] leading-[1rem] text-[#99A3BA] transition-[border] delay-300 ease-in-out",
          "placeholder:text-[#CBD1DC]",
          "focus:border-[#275EFE] focus:outline-0",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputLeftAddon = forwardRef<HTMLSpanElement, InputAddonProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={cn("", className)} {...props} />;
  },
);
InputLeftAddon.displayName = "InputLeftAddon";

const InputRightAddon = forwardRef<HTMLSpanElement, InputAddonProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={cn("", className)} {...props} />;
  },
);
InputRightAddon.displayName = "InputRightAddon";

//create input number component and manage state
const InputNumber = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="number"
        style={{ WebkitAppearance: "none" }}
        className={cn(
          "block w-full border border-[#CDD9ED] bg-[#fff] px-[1rem] py-[0.5rem] leading-[1rem] text-[#99A3BA] transition-[border] delay-300 ease-in-out",
          "placeholder:text-[#CBD1DC]",
          "focus:border-[#275EFE] focus:outline-0",
          className,
        )}
        onChange={(e) => {
          // ถ้า value มันเป็น 0 ก็ให้เป็น 0 อยู่เลย แต่ถ้าไม่ใช่ก็ให้เป็นตัวเลขตัวแรกที่ไม่ใช่ 0
          const value = e.target.value;
          if (value === "0") {
            props.onChange?.(e);
            return;
          }
          const number = parseInt(value);
          if (isNaN(number)) {
            props.onChange?.(e);
            return;
          }
          if (number === 0) {
            props.onChange?.(e);
            return;
          }
          if (number) {
            props.onChange?.(e);
            return;
          }

          props.onChange?.(e);
        }}
        value={
          props.value === undefined || props.value === null
            ? ""
            : props.value.toString()
        }
        {...props}
      />
    );
  },
);
InputNumber.displayName = "InputNumber";

export { InputGroup, Input, InputLeftAddon, InputRightAddon, InputNumber };
