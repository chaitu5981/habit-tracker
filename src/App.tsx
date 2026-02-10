import { useState } from "react";
import "./App.css";
import AddEditHabit from "./components/AddEditHabit";
import HabitList from "./components/HabitList";
import HabitPieChart from "./components/HabitPieChart";
import HabitBarChart from "./components/HabitBarChart";
const App = () => {
  const [openAddEditHabit, setOpenAddEditHabit] = useState(false);
  return (
    <div className="bg-[#3B3B3B] min-h-screen text-white p-6 space-y-6">
      <h1 className="text-4xl text-white font-bold">Habit Tracker</h1>
      <div className="flex justify-around py-8 px-3 rounded-lg bg-[#626262] my-6 flex-col lg:flex-row gap-4 items-center">
        <div className="bg-[#9B9B9B] px-4 py-20 rounded-lg flex flex-col justify-center">
          <h2 className="text-3xl text-white font-semibold">
            Update Today's Progress
          </h2>
          <button
            onClick={() => setOpenAddEditHabit(true)}
            className="bg-[#45A049] mx-auto block mt-5 text-white px-4 py-2 rounded-lg"
          >
            + Add data
          </button>
        </div>
        <div>
          <h1 className="italic text-2xl  font-bold">Average Completions</h1>
          <HabitPieChart />
        </div>
        <div>
          <h1 className="italic text-2xl mb-3 font-bold">
            Top Habits (Last Week)
          </h1>
          <HabitBarChart />
        </div>
      </div>
      <h1 className="text-3xl italic font-bold">Recent Habit Completions</h1>
      <HabitList />
      <AddEditHabit
        open={openAddEditHabit}
        onClose={() => setOpenAddEditHabit(false)}
      />
    </div>
  );
};
export default App;
