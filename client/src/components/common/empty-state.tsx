import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description?: React.ReactNode;
  image: any;
  primaryButton?: {
    icon?: any;
    text: string;
    onClick: () => void;
  };
  secondaryButton?: React.ReactNode;
  isFullScreen?: boolean;
};

export const EmptyState: React.FC<Props> = ({
  title,
  description,
  image,
  primaryButton,
  secondaryButton,
  isFullScreen = true,
}) => (
  <div
    className={`mx-auto grid h-full w-full place-items-center p-8 ${
      isFullScreen ? "md:w-4/5 lg:w-3/5" : ""
    }`}
  >
    <div className="flex w-full flex-col items-center text-center">
      <img src={image} className="w-52 sm:w-60" alt={primaryButton?.text} />
      <h6 className="mb-3 mt-6 text-xl font-semibold sm:mt-8">{title}</h6>
      {description && (
        <p className="text-custom-text-300 mb-7 sm:mb-8">{description}</p>
      )}
      <div className="flex items-center gap-4">
        {primaryButton && (
          <Button
            className="flex items-center gap-1.5"
            onClick={primaryButton.onClick}
          >
            {primaryButton.icon}
            {primaryButton.text}
          </Button>
        )}
        {secondaryButton}
      </div>
    </div>
  </div>
);
