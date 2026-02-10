import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHabit } from "../context/HabitContext";
import { getHabitsCount } from "../utils";

// #region Sample data

// #endregion
const HabitBarChart = () => {
  const { habits } = useHabit();
  const lastWeekHabits = habits.filter((habit) => {
    const habitDate = new Date(habit.date);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return habitDate >= lastWeek;
  });
  const data = getHabitsCount(lastWeekHabits);

  return (
    <div className="bg-white rounded-lg px-12 h-auto w-[200px] sm:w-[300px] md:w-[400px]">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          //   width={300}
          //   height={250}
          responsive
          data={data}
          layout="vertical"
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="value" type="number" width={"auto"} />
          <YAxis dataKey="name" type="category" width={"auto"} />
          <Tooltip
            contentStyle={{ backgroundColor: "white", color: "black" }}
          />
          <Bar dataKey="value" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitBarChart;
