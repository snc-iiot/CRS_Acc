// import { COLORS_SERIES } from "@/lib/utils";
import { ResponsivePie } from "@nivo/pie";
import { animated } from "@react-spring/web";
import { FC } from "react";

const MockData = [
  {
    id: "scope-1",
    label: "Scope 1",
    value: 146,
  },
  {
    id: "scope-2",
    label: "Scope 2",
    value: 535,
  },
];

interface PieChartProps {
  isShowLegend?: boolean;
  enableArcLinkLabels?: boolean;
  data?: {
    id: string;
    label: string;
    value: number;
  }[];
  arcLabelsTextColor?: string;
  scheme?:
    | "nivo"
    | "category10"
    | "accent"
    | "dark2"
    | "paired"
    | "pastel1"
    | "pastel2"
    | "set1"
    | "set2"
    | "set3"
    | "brown_blueGreen"
    | "purpleRed_green"
    | "pink_yellowGreen"
    | "greens"
    | "blues"
    | "custom";
  arcLinkLabelsTextColor?: string;
  arcLabelsTextColorMode?: "darker" | "brighter";
  unit?: string;
  isLegend?: boolean;
  isPercent?: boolean;
}

const PieChart: FC<PieChartProps> = ({
  data = MockData,
  isShowLegend = true,
  enableArcLinkLabels = false,
  scheme = "nivo",
  arcLinkLabelsTextColor = "#333333",
  unit = "",
  isLegend = false,
  isPercent = false,
}) => {
  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 50, bottom: 80, left: 40 }}
        innerRadius={0.5}
        padAngle={1.5}
        cornerRadius={3}
        sortByValue={true}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={
          scheme === "custom"
            ? {
                datum: "data.color",
              }
            : {
                scheme,
              }
        }
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLinkLabels={enableArcLinkLabels}
        arcLinkLabel={(d) => {
          const All = data.reduce((a, b) => a + b.value, 0);
          const Percent = ((d.value / All) * 100).toFixed(2);
          if (isLegend) {
            return `(${Percent}%)`;
          }
          return `${d?.id} ${isPercent ? "" : `(${Percent}%)`} `;
        }}
        arcLabel={(d) => {
          return `${d.value?.toLocaleString() ?? "-"}`;
        }}
        arcLinkLabelsStraightLength={3}
        tooltip={(d) => {
          const All = data.reduce((a, b) => a + b.value, 0);
          const Percent = ((d.datum.value / All) * 100).toFixed(2);
          return (
            <div className="flex w-max items-center gap-2 rounded-md bg-white px-1 py-2 text-primary">
              <div
                className={"h-3 w-3 rounded-full"}
                style={{
                  backgroundColor: d?.datum?.color,
                }}
              />
              <span className="text-sm font-bold">{d.datum.id}</span>
              <span className="text-sm font-bold">
                {d.datum.value?.toLocaleString() ?? "-"}{" "}
                {isPercent ? "%" : unit}
              </span>
              {!isPercent && (
                <span className="text-sm font-bold">({Percent}%)</span>
              )}
            </div>
          );
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={arcLinkLabelsTextColor}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsComponent={({ label, style, datum }) => (
          <animated.g
            transform={style.transform}
            style={{
              pointerEvents: "none",
            }}
          >
            <rect
              x={
                datum.id === "scope-1"
                  ? -42
                  : datum.id === "scope-2"
                  ? -42
                  : -42
              }
              y={-11}
              fill="#FFFFFF"
              style={{
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                opacity: 0.8,
                width: 85,
                height: 20,
                borderRadius: 10,
                border: "1px solid #E5E5E5",
              }}
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill={style.textColor}
              style={{
                fontSize: 10,
                fontWeight: 800,
              }}
            >
              {label} {isPercent ? "%" : unit}
            </text>
          </animated.g>
        )}
        legends={
          isShowLegend
            ? [
                {
                  anchor: "top-left",
                  direction: "column",
                  justify: false,
                  translateX: -50,
                  translateY: 0,
                  itemsSpacing: 5,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]
            : []
        }
      />
    </>
  );
};

export default PieChart;
