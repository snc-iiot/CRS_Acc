import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cloneElement, FC, useRef, useState } from "react";

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  type ConfirmProps = {
    button?: JSX.Element;
    title: string;
    description: string;
    confirm: () => void;
    cancel?: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
    buttonClassName?: string;
    buttonText?: string;
  };

  const Confirm: FC<ConfirmProps> = ({
    button,
    title,
    description,
    confirm,
    cancel,
    confirmButtonText = "ยืนยัน",
    cancelButtonText = "ยกเลิก",
    buttonClassName,
    buttonText = "ยืนยัน",
  }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const cancelRef = useRef(null);

    return (
      <>
        {button ? (
          cloneElement(button, {
            onClick: () => setIsConfirmOpen(true),
            className: cn(buttonClassName, button.props.className),
          })
        ) : (
          <Button
            onClick={() => setIsConfirmOpen(true)}
            className={cn(buttonClassName)}
          >
            {buttonText}
          </Button>
        )}
        <AlertDialog
          open={isConfirmOpen}
          onOpenChange={() => setIsConfirmOpen(false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>{description}</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel ref={cancelRef} asChild>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsConfirmOpen(false);
                    if (cancel) cancel();
                  }}
                >
                  {cancelButtonText}
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={() => {
                    setIsConfirmOpen(false);
                    confirm();
                  }}
                  className="bg-green-600 hover:bg-green-600/80"
                >
                  {confirmButtonText}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  };

  return {
    Confirm,
    setIsOpen,
    isOpen,
  };
};

export default useConfirm;
