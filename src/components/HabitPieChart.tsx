import {
  Pie,
  PieChart,
  type PieLabelRenderProps,
  type PieSectorShapeProps,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { habitTypes } from "../constants";
import { useHabit } from "../context/HabitContext";
import { getHabitsCount } from "../utils";
// #region Sample data

// #endregion
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export default function HabitPieChart() {
  const { habits } = useHabit();
  const data = getHabitsCount(habits);
  return (
    <div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart responsive>
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            isAnimationActive
            fill="#8884d8"
            dataKey="value"
            shape={MyCustomPie}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-between gap-2 flex-col sm:flex-row">
        {habitTypes.map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: COLORS[habitTypes.indexOf(type)] }}
            ></div>
            <p>{type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
