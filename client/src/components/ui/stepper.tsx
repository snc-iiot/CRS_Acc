import { cn } from "@/lib/utils";
import * as React from "react";

export interface StepperProps {
  className?: string;
  activeStep?: string | number;
  children: React.ReactNode;
  icons?: {
    active?: React.ReactNode | JSX.Element;
    inactive?: React.ReactNode | JSX.Element;
  };
}

interface SvgProps {
  className?: string;
}

export const CheckIcon: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={cn("h-5 w-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export const CircleIcon: React.FC<SvgProps> = ({ className }) => (
  <svg
    className={cn("h-5 w-5 pt-[2px]", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <circle cx="10" cy="10" r="10" />
  </svg>
);

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, activeStep = 0, ...props }, ref) => {
    const children = React.Children.toArray(props.children);
    const totalSteps = children
      .filter((child) => React.isValidElement(child))
      .map((child) => (child as React.ReactElement).props);
    return (
      <div
        ref={ref}
        className={cn(
          "relative z-10 flex w-full flex-row items-center justify-between",
          className,
        )}
        {...props}
      >
        <ol className="relative flex w-full flex-row items-center justify-between ">
          <div className="absolute z-0 mt-5 h-[2px] w-full border border-dashed transition-all duration-500 ease-in-out"></div>
          {React.Children.map(props?.children, (child) => {
            return React.cloneElement(child as React.ReactElement, {
              activeStep,
              totalSteps,
              icons: props.icons,
            });
          })}
        </ol>
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

type StepProps = {
  label: string;
  keyStep: string | number;
  className?: string;
  activeStep?: string | number;
  totalSteps?: {
    label: string;
    keyStep: string | number;
  }[];
  icons?: {
    active?: React.ReactNode | JSX.Element;
    inactive?: React.ReactNode | JSX.Element;
  };
};

const Steps = ({
  className,
  label,
  keyStep,
  activeStep,
  totalSteps,
  icons = {
    active: <CheckIcon />,
    inactive: <CircleIcon />,
  },
  ...props
}: React.HTMLAttributes<HTMLLIElement> & StepProps) => {
  const indexActive = totalSteps?.findIndex(
    (step) => step.keyStep.toString() === activeStep?.toString(),
  );

  const active = (keyStep: string) => {
    if (indexActive === undefined) return false;
    return (
      indexActive >=
      (totalSteps != undefined
        ? totalSteps.findIndex(
            (step) => step.keyStep.toString() === keyStep.toString(),
          )!
        : 0)
    );
  };

  return (
    <li
      className={cn(
        "relative z-10 flex flex-col items-center justify-center bg-white",
        className,
      )}
      {...props}
    >
      <span>{label}</span>
      {active(keyStep?.toString()) ? icons.active : icons.inactive}
    </li>
  );
};

Steps.displayName = "Steps";

export { Stepper, Steps };
