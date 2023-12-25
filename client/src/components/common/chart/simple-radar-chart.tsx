import { FC } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data?: { name: string; value: number }[];
  domain?: [number, number];
  unitYAxis?: string;
}

const SimpleRadarChart: FC<Props> = ({
  data = [
    {
      name: "Math",
      value: 277,
    },
    {
      name: "test",
      value: 28,
    },
    {
      name: "Mahhhth",
      value: 172,
    },
  ],
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" fontSize={"0.6rem"} />
        <PolarRadiusAxis fontSize={"0.6rem"} />
        <Radar
          dataKey="value"
          stroke="#3C5A99"
          fill="#3C5A99"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SimpleRadarChart;
