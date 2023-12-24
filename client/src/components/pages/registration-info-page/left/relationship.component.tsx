import { Icons } from "@/components/common/icons";
import { useAtomStore } from "@/jotai/use-atom-store";
import { cn } from "@/lib/utils";
import { FC } from "react";

const Relationship: FC = () => {
  const {
    registration: { relationship },
  } = useAtomStore();

  return (
    <div className="w-full text-xs">
      <h5>4.1 ความสัมพันธ์กับบุคคลใน SNC</h5>
      <div className="grid w-full grid-cols-4 items-center pl-1">
        <div className="flex items-center gap-x-1">
          {relationship?.is_relationship ? (
            <Icons.checkCircle className="h-3 w-3 text-primary" />
          ) : (
            <Icons.circle className="h-3 w-3" />
          )}
          <p
            className={cn(relationship?.is_relationship ? "text-primary" : "")}
          >
            มี
          </p>
        </div>
        {relationship?.relationship_name && (
          <div className="col-span-3 h-full w-full border-b pl-1 text-primary">
            {relationship?.relationship_name}
          </div>
        )}
        <div className="col-span-4 flex items-center gap-x-1">
          {!relationship?.is_relationship ? (
            <Icons.checkCircle className="h-3 w-3 text-primary" />
          ) : (
            <Icons.circle className="h-3 w-3" />
          )}
          <p
            className={cn(!relationship?.is_relationship ? "text-primary" : "")}
          >
            ไม่มี
          </p>
        </div>
      </div>
    </div>
  );
};

export default Relationship;
