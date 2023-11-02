import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const inputVariants = cva(
  "flex h-9 w-full bg-transparent rounded-md px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const children = React.Children.toArray(props.children);
  const inputIndex = children.findIndex(
    (child) => React.isValidElement(child) && child.type === Input,
  );
  const input = children[inputIndex] as React.ReactElement<InputProps>;
  const inputProps = input.props;
  const inputVariant = inputProps.variant;
  const inputLeftAddonIndex = children.findIndex(
    (child) => React.isValidElement(child) && child.type === InputLeftAddon,
  );
  const inputLeftAddon = children[inputLeftAddonIndex] as React.ReactElement;
  const inputRightAddonIndex = children.findIndex(
    (child) => React.isValidElement(child) && child.type === InputRightAddon,
  );
  const inputRightAddon = children[inputRightAddonIndex] as React.ReactElement;
  //? Conditionally render the input group based on the addon index
  const isLeftAddon = inputLeftAddonIndex === 0 && inputRightAddonIndex === -1;
  const isRightAddon = inputLeftAddonIndex === -1 && inputRightAddonIndex === 1;
  const isBothAddon = inputLeftAddonIndex === 0 && inputRightAddonIndex === 2;

  // console.log(inputLeftAddonIndex, inputRightAddonIndex);

  //? Conditionally render the input group based on the element index
  // const isLeftElement =
  //   inputLeftElementIndex === 0 && inputRightElementIndex === -1;
  // const isRightElement =
  //   inputLeftElementIndex === -1 && inputRightElementIndex === 0;
  // const isBothElement =
  //   inputLeftElementIndex === 0 && inputRightElementIndex === 2;

  return (
    <div
      className={cn(inputVariant, className, "flex w-full")}
      ref={ref}
      {...props}
    >
      {inputLeftAddonIndex !== -1 && <div>{inputLeftAddon}</div>}

      {React.cloneElement(input, {
        className: cn(
          input.props.className,
          isLeftAddon
            ? "rounded-l-none"
            : isRightAddon
            ? "rounded-r-none"
            : isBothAddon
            ? "rounded-none"
            : "",
        ),
      })}
      {inputRightAddonIndex !== -1 && <div>{inputRightAddon}</div>}
    </div>
  );
});

InputGroup.displayName = "InputGroup";

const InputLeftAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-full w-max items-center whitespace-nowrap rounded-l-md bg-primary px-3 text-primary-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

InputLeftAddon.displayName = "InputLeftAddon";

const InputRightAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-full w-max items-center whitespace-nowrap rounded-r-md bg-primary px-3 text-primary-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

InputRightAddon.displayName = "InputRightAddon";

const InputLeftElement = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-full w-max items-center whitespace-nowrap rounded-l-md px-3 text-primary",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

InputLeftElement.displayName = "InputLeftElement";

const InputRightElement = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-full w-max items-center whitespace-nowrap rounded-r-md px-3 text-primary",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

InputRightElement.displayName = "InputRightElement";

export {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
};
