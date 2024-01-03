import { cn } from "@/lib/utils";
import { bool, func, number, object, string } from "prop-types";
import { useEffect, useRef, useState } from "react";

interface InputNumberProps {
  className?: string;
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  step?: number;
  style?: object;
  value?: number;
  readOnly?: boolean;
  onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
}

export const InputNumber = ({
  className,
  defaultValue,
  disabled,
  max,
  min,
  name,
  onChange,
  placeholder,
  step,
  style,
  value,
  readOnly,
  onWheel,
  ...props
}: InputNumberProps) => {
  const [inputValue, setInputValue] = useState<number | string>(
    defaultValue || value || "",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(defaultValue || value || "");
  }, [defaultValue, value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue("" + Number(event.target.value));
    // onChange && onChange("" + Number(event.target.value));
    if (Number(event.target.value) > max!) {
      setInputValue("" + Number(max));
      onChange && onChange("" + Number(max));
    } else if (Number(event.target.value) < min!) {
      setInputValue("" + Number(min));
      onChange && onChange("" + Number(min));
    } else {
      setInputValue("" + Number(event.target.value));
      onChange && onChange("" + Number(event.target.value));
    }
  };

  const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      if (Number(event.target.value) > max!) {
        setInputValue("" + Number(max));
        onChange && onChange("" + Number(max));
      } else if (Number(event.target.value) < min!) {
        setInputValue("" + Number(min));
        onChange && onChange("" + Number(min));
      } else {
        setInputValue("" + Number(event.target.value));
        onChange && onChange("" + Number(event.target.value));
      }
    } else {
      setInputValue(defaultValue || value || "");
    }
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <input
      {...props}
      className={cn(
        "block w-full border border-[#CDD9ED] bg-[#fff] px-[1rem] py-[0.5rem] leading-[1rem] text-[#99A3BA] transition-[border] delay-300 ease-in-out",
        "placeholder:text-[#CBD1DC]",
        "focus:border-[#275EFE] focus:outline-0",
        className,
      )}
      disabled={disabled}
      max={max}
      min={min}
      name={name}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
      onKeyDown={handleOnKeyDown}
      placeholder={placeholder}
      ref={inputRef}
      step={step}
      style={style}
      type="number"
      value={inputValue === 0 || inputValue === "" ? 0 : inputValue}
      readOnly={readOnly}
      onWheel={(event) => {
        onWheel && onWheel(event);
      }}
    />
  );
};

InputNumber.propTypes = {
  className: string,
  defaultValue: number,
  disabled: bool,
  max: number,
  min: number,
  name: string,
  onChange: func,
  placeholder: string,
  step: number,
  style: object,
  value: number,
};

InputNumber.defaultProps = {
  className: "",
  defaultValue: undefined,
  disabled: false,
  max: undefined,
  min: undefined,
  name: "",
  onChange: undefined,
  placeholder: "",
  step: undefined,
  style: {},
  value: undefined,
};
