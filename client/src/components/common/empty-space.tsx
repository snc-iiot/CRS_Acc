import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "./icons";

type EmptySpaceProps = {
  title: string;
  description: string;
  children: any;
  Icon?: any;
  link?: { text: string; href: string };
};

const EmptySpace: React.FC<EmptySpaceProps> = ({
  title,
  description,
  children,
  Icon,
  link,
}) => (
  <>
    <div className="max-w-lg">
      {Icon ? (
        <div className="mb-4">
          <Icon className="text-custom-text-200 h-14 w-14" />
        </div>
      ) : null}

      <h2 className="text-custom-text-100 text-lg font-medium">{title}</h2>
      <div className="text-custom-text-200 mt-1 text-sm">{description}</div>
      <ul
        role="list"
        className="divide-custom-border-200 border-custom-border-200 mt-6 divide-y border-b border-t"
      >
        {children}
      </ul>
      {link ? (
        <div className="mt-6 flex">
          <Link to={link.href}>
            <a className="text-custom-primary hover:text-custom-primary text-sm font-medium">
              {link.text}
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  </>
);

type EmptySpaceItemProps = {
  title: string;
  description?: React.ReactNode | string;
  Icon: any;
  action: () => void;
};

const EmptySpaceItem: React.FC<EmptySpaceItemProps> = ({
  title,
  description,
  Icon,
  action,
}) => (
  <>
    <li className="cursor-pointer" onClick={action}>
      <div
        className={`group relative flex ${
          description ? "items-start" : "items-center"
        } space-x-3 py-4`}
      >
        <div className="flex-shrink-0">
          <span className="bg-custom-primary inline-flex h-10 w-10 items-center justify-center rounded-lg">
            <Icon className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
        </div>
        <div className="text-custom-text-200 min-w-0 flex-1">
          <div className="group-hover:text-custom-text-100 text-sm font-medium">
            {title}
          </div>
          {description ? <div className="text-sm">{description}</div> : null}
        </div>
        <div className="flex-shrink-0 self-center">
          <Icons.arrowLeft
            className="text-custom-text-200 group-hover:text-custom-text-100 h-5 w-5"
            aria-hidden="true"
          />
        </div>
      </div>
    </li>
  </>
);

export { EmptySpace, EmptySpaceItem };
