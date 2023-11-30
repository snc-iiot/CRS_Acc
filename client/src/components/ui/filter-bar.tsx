import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Input } from "./input";

const FilterBar = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));

const FilterBarInput = React.forwardRef<
  React.ElementRef<"input">,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn("w-full sm:w-[5rem] lg:w-[10rem] xl:w-[15rem]", className)}
    {...props}
  />
));

interface FilterSelectProps {
  triggerText?: string;
  options?: { label: string; value: string }[];
}

const FilterSelect = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & FilterSelectProps
>(({ className, ...props }, ref) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" role="combobox" className="border-dashed">
        <PlusCircledIcon className="mr-2 h-4 w-4" />
        {props.triggerText || "เพิ่มตัวกรอง"}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      align="start"
      className={cn(
        "flex flex-col gap-y-2 rounded-md bg-popover p-0 shadow-md",
        className,
      )}
      {...props}
      ref={ref}
    >
      <Command>
        <CommandInput placeholder="Search..." className="h-9" />
        <CommandEmpty>No states found matching </CommandEmpty>
        <CommandGroup className="max-h-64  w-full overflow-y-auto">
          {props?.options?.map((option, i) => (
            <CommandItem
              key={i}
              className={cn(
                "flex items-center gap-x-2 px-3 py-2",
                "hover:bg-primary hover:bg-opacity-10",
                "focus:bg-primary focus:bg-opacity-10",
                "active:bg-primary active:bg-opacity-20",
                "cursor-pointer",
              )}
              value={option.value}
              onSelect={(value) => console.log(value)}
            >
              <div
                className={cn(
                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                  "opacity-50 [&_svg]:invisible",
                )}
              >
                <CheckIcon className={cn("h-4 w-4")} />
              </div>
              <span>{option.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
));

const ClearButton = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className={cn("border-dashed", className)}
    {...props}
  />
));

ClearButton.displayName = "ClearButton";

FilterSelect.displayName = "FilterSelect";

FilterBarInput.displayName = "FilterBarInput";

FilterBar.displayName = "FilterBar";

const useFilterBar = () => {};

export { FilterBar, FilterBarInput, FilterSelect, ClearButton, useFilterBar };
