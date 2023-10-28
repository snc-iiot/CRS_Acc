import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  "flex h-9 w-full rounded-md px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outline: "border border-input",
        filled: cn(
          "bg-input text-input-foreground",
          "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:bg-transparent",
        ),
        flushed: cn(
          "border-b border-input rounded-none px-0",
          "focus-visible:border-primary focus-visible:ring-0",
        ),
        unstyled: "border-0 bg-transparent focus-visible:ring-0",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "input" : "input";
    return (
      <Comp
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
