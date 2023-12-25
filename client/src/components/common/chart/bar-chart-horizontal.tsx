/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS_SERIES } from "@/lib/utils";
import { FC, useMemo } from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const newData = [
  {
    name: "Scope1",
    value: 400,
  },
  {
    name: "Scope2",
    value: 300,
  },
  {
    name: "Scope3",
    value: 300,
  },
  {
    name: "Other",
    value: 200,
  },
];

const KEY_MAP = ["value"];

export interface NewPayload {
  dataKey: string;
  name: string;
  value: number;
  payload: Payload;
}

export interface Payload {
  name: string;
  value: number;
}

type BarChartComponentProps = {
  data?: {
    name: string;
    value: number;
    color?: string;
  }[];
  keyMap?: string[];
  label?: string;
  keyXAxis?: string;
  keyYAxis?: string;
  isShowLabel?: boolean;
  unitTooltip?: string;
  isLabelInside?: boolean;
};

const BarChartHorizontal: FC<BarChartComponentProps> = ({
  data = newData,
  keyMap = KEY_MAP,
  label = "tCO2e",
  keyXAxis = "name",
  // isShowLabel = true,
  unitTooltip = "",
  isLabelInside = false,
}) => {
  const BAR_AXIS_SPACE = 60;
  const measureText14HelveticaNeue = (text: string) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = "14px Helvetica Neue";
      return context.measureText(text).width;
    }
    return 0;
  };
  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur[keyMap?.[0] as keyof typeof cur];
        const width = measureText14HelveticaNeue(value?.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [data, keyMap],
  );

  const renderCustomizedLabel = (props: {
    x: number;
    y: number;
    width: number;
    height: number;
    value: number;
    name: string;
  }) => {
    const { y, width, height, name } = props;
    const widthText = measureText14HelveticaNeue(name);
    return (
      <text
        // x={
        //   widthText > width
        //     ? x + width + 10
        //     : x + width - 10 - (width - widthText) / 2
        // }
        x={15}
        y={y + height / 2}
        fill="#ffffff"
        textAnchor="start"
        dominantBaseline="middle"
        fontSize={12}
        display={widthText > width ? "none" : "block"}
        width={width}
      >
        {name}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} debounce={50} height="98%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          left: isLabelInside ? 10 : maxTextWidth + BAR_AXIS_SPACE - 40,
          right: maxTextWidth + (BAR_AXIS_SPACE - 10),
          bottom: isLabelInside ? 5 : 0,
        }}
      >
        <Tooltip
          content={(props: any) => {
            const { active, payload } = props;
            if (active) {
              return (
                <div className="flex items-center gap-2 rounded-md bg-white p-2 font-bold shadow-md">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: payload[0]?.payload?.color }}
                  />
                  <p className="text-sm">{payload?.[0]?.payload?.name}</p>
                  {payload?.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <p className="intro text-sm">
                        :{" "}
                        {Number(item?.value)?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}{" "}
                        {unitTooltip}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <XAxis hide axisLine={false} type="number" />
        {isLabelInside && (
          <XAxis
            hide
            axisLine={false}
            type="number"
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 500,
              fill: "#1F2C57",
            }}
            tickFormatter={(value) => value?.toLocaleString()}
          />
        )}
        {!isLabelInside && (
          <YAxis
            yAxisId={0}
            dataKey={keyXAxis}
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 500,
              fill: "#1F2C57",
            }}
            tickFormatter={(value) => value?.toLocaleString()}
          />
        )}
        <YAxis
          orientation="right"
          yAxisId={1}
          dataKey={keyMap?.[0]}
          type="category"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${value?.toLocaleString()} ${label}`}
          mirror
          tick={{
            transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`,
            fontSize: 12,
            display: "none",
          }}
        />
        <Bar
          dataKey={keyMap?.[0]}
          yAxisId={1}
          barSize={32}
          isAnimationActive={false}
          minPointSize={2}
          maxBarSize={32}
          label={
            isLabelInside
              ? renderCustomizedLabel
              : {
                  position: "right",
                  offset: 10,
                  formatter: (value: { toLocaleString: () => any }) =>
                    `${value?.toLocaleString()} ${label}`,
                  fill: "#1F2C57",
                  fontSize: 12,
                }
          }
        >
          {isLabelInside && (
            <LabelList
              dataKey={keyMap?.[0]}
              position="right"
              offset={10}
              formatter={(value: { toLocaleString: () => any }) =>
                `${value?.toLocaleString()} ${label}`
              }
              fill="#1F2C57"
              fontSize={10}
            />
          )}
          {data?.map((d, idx) => {
            return (
              <Cell
                key={d[keyXAxis as keyof typeof d]}
                fill={COLORS_SERIES[9 + (idx % COLORS_SERIES.length)]}
                stroke={COLORS_SERIES[9 + (idx % COLORS_SERIES.length)]}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartHorizontal;
