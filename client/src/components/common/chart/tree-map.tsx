import { COLORS_SERIES } from "@/lib/utils";
import { FC, PureComponent } from "react";
import { ResponsiveContainer, Treemap } from "recharts";

type Props = {
  data?: {
    name: string;
    children: { name: string; size: number }[];
  }[];
};

const TreeMap: FC<Props> = ({ data = [] }) => {
  const DataLength = data
    ?.map(({ children }) => children[0]?.size)
    ?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  class CustomizedContent extends PureComponent {
    render() {
      const data: any = this.props;
      const { root, depth, x, y, width, height, index, name, children } = data;

      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
              fill:
                depth < 2
                  ? COLORS_SERIES[
                      Math.floor((index / root?.children?.length) * 6) + 10
                    ]
                  : "#ffffff00",
              stroke: "#fff",
              strokeWidth: 2 / (depth + 1e-10),
              strokeOpacity: 1 / (depth + 1e-10),
            }}
          />
          {depth === 1 && (children[0]?.size / DataLength) * 100 > 10 ? (
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
            >
              {name}
            </text>
          ) : null}

          {depth === 1 ? (
            <text
              x={x + 20}
              y={y + 12}
              fillOpacity={0.9}
              textAnchor="middle"
              fill="#fff"
              fontSize={10}
            >
              {((children[0]?.size / DataLength) * 100)?.toFixed(0)} %
            </text>
          ) : null}

          {depth === 1 && (children[0]?.size / DataLength) * 100 > 5 ? (
            <text
              x={x + 26}
              y={y + 20}
              fillOpacity={0.9}
              textAnchor="middle"
              fill="#fff"
              fontSize={8}
            >
              {children[0]?.size} รายการ
            </text>
          ) : null}
        </g>
      );
    }
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        width={400}
        height={200}
        data={data?.sort((a, b) => b.children[0].size - a.children[0].size)}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
        content={<CustomizedContent />}
        style={{ color: "#FF0000" }}
      />
    </ResponsiveContainer>
  );
};

export default TreeMap;