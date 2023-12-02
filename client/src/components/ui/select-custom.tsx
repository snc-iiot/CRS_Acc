import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { forwardRef } from "react";
import { buttonVariants } from "./button";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          {...props}
          ref={ref}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-full w-full appearance-none bg-transparent font-normal shadow-none",
            className,
          )}
        >
          {props?.placeholder && <option value="">{props.placeholder}</option>}

          {props?.children}
        </select>
        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
