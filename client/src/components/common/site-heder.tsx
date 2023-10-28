import { Icons } from "./icons";

type Props = {
  breadcrumbs?: JSX.Element;
  left?: JSX.Element;
  right?: JSX.Element;
  setToggleSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  noHeader?: boolean;
};

export const Header: React.FC<Props> = ({
  breadcrumbs,
  left,
  right,
  noHeader,
}) => (
  <div
    className={`border-custom-border-200 bg-custom-sidebar-background-100 relative z-10 flex w-full shrink-0 flex-row items-center justify-between gap-y-4 border-b px-5 py-3 ${
      noHeader ? "md:hidden" : ""
    }`}
  >
    <div className="flex items-center gap-2">
      <div className="block md:hidden">
        <button
          type="button"
          className="border-custom-border-200 grid h-8 w-8 place-items-center rounded border"
        >
          <Icons.moon className="h-5 w-5" />
        </button>
      </div>
      {breadcrumbs}
      {left}
    </div>
    {right}
  </div>
);
