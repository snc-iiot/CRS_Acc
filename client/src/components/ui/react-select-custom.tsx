import { FC } from "react";
import Select from "react-select";

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  className?: string;
}

const demoOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const ReactSelectCustom: FC<Props> = ({
  options = demoOptions,
  onChange,
  value,
  placeholder,
  className,
}) => {
  return (
    <Select
      options={options}
      onChange={(e) => {
        if (e) {
          onChange(e.value);
        }
      }}
      value={options.find((e) => e.value === value)}
      placeholder={placeholder}
      classNames={{
        control: (state) =>
          state.isFocused
            ? `${className} border border-primary-foreground focus:border-primary-foreground`
            : `${className} border border-secondary-foreground`,
      }}
    />
  );
};

export default ReactSelectCustom;
