import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Loader = ({ children, className = "" }: Props) => (
  <div className={`${className} animate-pulse`} role="status">
    {children}
  </div>
);

type ItemProps = {
  height?: string;
  width?: string;
};

const Item: React.FC<ItemProps> = ({ height = "auto", width = "auto" }) => (
  <div
    className="bg-custom-background-80 rounded-md"
    style={{ height: height, width: width }}
  />
);

Loader.Item = Item;

export { Loader };
