import { TiDeleteOutline } from "react-icons/ti";
import { useHabit } from "../context/HabitContext";
import { MdOutlineModeEdit } from "react-icons/md";
import AddEditHabit from "./AddEditHabit";
import { useState } from "react";
import type { HabitType } from "../types";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const HabitList = () => {
  const { habits, setHabits } = useHabit();
  const [openEditHabit, setOpenEditHabit] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState<HabitType | null>(null);
  const [page, setPage] = useState(1);
  const habitsToShow = habits.slice((page - 1) * 3, page * 3);
  const handleDeleteHabit = (id: string) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      const newHabits = habits.filter((habit) => habit.id !== id);
      setHabits(newHabits);
      setPage(1);
      localStorage.setItem("habits", JSON.stringify(newHabits));
    }
  };
  return (
    <div className="bg-white p-4 rounded-lg text-lg">
      {habitsToShow.map((habit) => (
        <div
          key={habit.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-b-black"
        >
          <div>
            <p className="text-black">{habit.description}</p>
            <p className="text-gray-500">{habit.types.join(" ")}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#F4BB4A] font-bold">
              {new Date(habit.date).toISOString().split("T")[0]}
            </p>
            <button
              className="bg-red-500 p-2 rounded-xl text-white"
              onClick={() => handleDeleteHabit(habit.id)}
            >
              <TiDeleteOutline size={25} />
            </button>
            <button
              className="bg-[#F4BB4A] p-2 rounded-xl text-white"
              onClick={() => {
                console.log(habit);
                setOpenEditHabit(true);
                setHabitToEdit(habit);
              }}
            >
              <MdOutlineModeEdit size={25} />
            </button>
          </div>
        </div>
      ))}
      {habits.length > 3 && (
        <div className="flex justify-center gap-4 items-center my-4">
          <button
            disabled={page === 1}
            className="text-black p-4 rounded-xl bg-gray-200 flex items-center justify-center shadow-2xl disabled:opacity-50"
            onClick={() => setPage(page - 1)}
          >
            <FaArrowLeft size={20} />
          </button>
          <div className="text=white bg-green-400 px-5 py-3 rounded-md font-bold">
            {page}
          </div>
          <button
            disabled={page === Math.ceil(habits.length / 3)}
            className="text-black p-4 bg-gray-200 flex items-center justify-center rounded-xl shadow-lg disabled:opacity-50"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      )}
      {openEditHabit && (
        <AddEditHabit
          open={openEditHabit}
          onClose={() => setOpenEditHabit(false)}
          habitToEdit={habitToEdit}
        />
      )}
    </div>
  );
};
export default HabitList;
