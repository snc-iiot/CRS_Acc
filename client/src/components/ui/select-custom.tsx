import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { forwardRef, SelectHTMLAttributes } from "react";
import { buttonVariants } from "./button";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full appearance-none bg-transparent font-normal",
            className,
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
