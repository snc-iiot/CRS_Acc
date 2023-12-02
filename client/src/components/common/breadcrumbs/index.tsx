import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../icons";

type BreadcrumbsProps = {
  children: React.ReactNode;
};

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center">
        <button
          type="button"
          className="border-custom-sidebar-border-200 hover:bg-custom-sidebar-background-90 group grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded border text-center text-sm"
          onClick={() => navigate(-1)}
        >
          <Icons.arrowLeft className="text-custom-sidebar-text-200 group-hover:text-custom-sidebar-text-100 h-4 w-4 text-base leading-4" />
        </button>
        {children}
      </div>
    </>
  );
};

type BreadcrumbItemProps = {
  title: string;
  link?: string;
  icon?: JSX.Element;
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  title,
  link,
  icon,
}) => (
  <>
    {link ? (
      <Link to={link}>
        <div className="border-r-2 px-3 text-sm">
          <p className={`${icon ? "flex items-center gap-2" : ""}`}>
            {icon ?? null}
            {title}
          </p>
        </div>
      </Link>
    ) : (
      <div className="max-w-64 px-3 text-sm">
        <p className={`${icon ? "flex items-center gap-2" : ""}`}>
          {icon}
          <span className="break-words">{title}</span>
        </p>
      </div>
    )}
  </>
);

Breadcrumbs.BreadcrumbItem = BreadcrumbItem;

export { Breadcrumbs, BreadcrumbItem };
