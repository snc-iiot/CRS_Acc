import { FC, useEffect, useState } from "react";
import {
  Bar,
  BarChart as BarChartRechart,
  Brush,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data?: { name: string; value: number; datetime: string }[];
  domain?: [number, number];
  unitYAxis?: string;
  isBrush?: boolean;
}

const BarChart: FC<Props> = ({
  data = [
    {
      name: "Mahingsa@3666",
      value: 78.54,
      datetime: "25-12-2023 09:00:00",
    },
  ],
  domain = [0, 0],
  unitYAxis = "%",
  isBrush = false,
}) => {
  const [average, setAverage] = useState<number>(0);

  const averageBar = () => {
    const arr: number[] = data?.map((info) => Number(info["value"]) ?? 0);
    if (data?.length != 0) {
      setAverage(Number(arr?.reduce((pre, cur) => pre + cur, 0)) / arr?.length);
    }
  };

  useEffect(() => {
    averageBar();
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartRechart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: -20,
          bottom: 0,
        }}
        barSize={20}
      >
        <Tooltip
          content={(props: any) => {
            const { active, payload } = props;
            if (active) {
              return (
                <div className="items-start justify-start rounded-md bg-white px-4 py-2 font-bold shadow-md">
                  <p className="text-sm">
                    {payload?.[0]?.payload?.datetime?.slice(0, 16)}
                  </p>
                  <div className="flex w-full items-center justify-start gap-0">
                    <div
                      className="mr-2 h-3 w-3 rounded-full"
                      style={{ backgroundColor: "#3C5A99" }}
                    />
                    <p className="text-sm font-normal">
                      {payload?.[0]?.payload.name}
                    </p>
                    {payload?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 font-normal"
                      >
                        <p className="intro text-sm">
                          :{" "}
                          {Number(item?.value)?.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}{" "}
                          {unitYAxis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <XAxis
          dataKey="datetime"
          scale="point"
          fontSize={"0.6rem"}
          padding={{ left: 10, right: 10 }}
          tickFormatter={(tick) => `${tick?.slice(0, 16)}`}
        />
        <YAxis
          fontSize={"0.6rem"}
          tickFormatter={(tick) =>
            `${tick.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}`
          }
          domain={
            domain[0] === 0 && domain[1] === 0
              ? [
                  0,
                  (dataMax: number) =>
                    (dataMax + (dataMax / 100) * 25)?.toFixed(1),
                ]
              : domain
          }
        />
        <Tooltip />
        {/* <Legend /> */}
        <CartesianGrid strokeDasharray="0 3" />
        <Bar
          dataKey="value"
          fill="#3C5A99"
          label={{ position: "top", fontSize: "0.8rem" }}
        />
        {isBrush && (
          <Brush
            dataKey="name1"
            stroke="#448aff"
            height={10}
            fontSize={"0.6rem"}
          />
        )}

        <ReferenceLine
          y={average}
          label={{
            value: `ค่าเฉลี่ย: ${parseFloat(String(average))?.toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}`,
            fill: "#000000",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
          strokeWidth={1.5}
          stroke={"#00000020"}
        />
      </BarChartRechart>
    </ResponsiveContainer>
  );
};

export default BarChart;
