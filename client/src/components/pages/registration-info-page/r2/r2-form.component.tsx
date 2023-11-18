import TableDBD, { ITableDBD } from "@/components/common/table-dbd";
import MockDBDData from "@/mock/dbd.mock.json";
import { FC } from "react";

const R2Form: FC = () => {
  const data: ITableDBD[] = MockDBDData;
  return (
    <div className="pb-4">
      <h3 className="text-4xl font-bold">R2</h3>
      <div className="flex flex-col gap-2">
        <div>
          <TableDBD
            className="w-full"
            data={data}
            description="For the year 2018 - 2022"
            header="Statement of Financial Position SNC CREATIVITY ANTHOLOGY COMPANY LIMITED"
          />
        </div>
        <div>
          <TableDBD
            className="w-full"
            data={data}
            header="Income Statement SNC CREATIVITY ANTHOLOGY COMPANY LIMITED"
          />
        </div>
      </div>
    </div>
  );
};

export default R2Form;
