import Modal from "react-modal";
import { customStyles } from "../styles.ts";
import { useState } from "react";
import { habitTypes } from "../constants.ts";
import { useHabit } from "../context/HabitContext.ts";
import type { HabitType } from "../types.ts";
import type { SubmitEvent } from "react";
const AddEditHabit = ({
  open,
  onClose,
  habitToEdit = null,
}: {
  open: boolean;
  onClose: () => void;
  habitToEdit?: HabitType | null;
}) => {
  const { habits, setHabits } = useHabit();
  const [date, setDate] = useState<Date | null>(
    habitToEdit?.date ? new Date(habitToEdit?.date) : null
  );
  const [selectedHabits, setSelectedHabits] = useState<string[]>(
    habitToEdit?.types || []
  );
  const [description, setDescription] = useState(
    habitToEdit?.description || ""
  );

  const toggleHabit = (habit: string) => {
    if (selectedHabits.includes(habit)) {
      setSelectedHabits(selectedHabits.filter((h) => h !== habit));
    } else {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || selectedHabits.length == 0 || !description) {
      return;
    }
    const newHabits = [
      ...habits,
      { id: Date.now().toString(), types: selectedHabits, description, date },
    ];
    newHabits.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setHabits(newHabits);
    localStorage.setItem("habits", JSON.stringify(newHabits));
    onClose();
    setSelectedHabits([]);
    setDescription("");
    setDate(null);
  };
  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
      <form onSubmit={handleSubmit}>
        <div className="bg-[#F9F9F9] p-5 rounded-lg space-y-4">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {habitToEdit ? "Update Habit" : "Add Habit"}
          </h1>
          <div className="flex items-center gap-2">
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              value={date ? date.toISOString().split("T")[0] : ""}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          {habitTypes.map((habitType) => (
            <div key={habitType} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={habitType}
                value={habitType}
                name={habitType}
                checked={selectedHabits.includes(habitType)}
                onChange={() => toggleHabit(habitType)}
              />
              <label htmlFor={habitType} className="text-lg">
                {habitType}
              </label>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <label htmlFor="description">Short Description:</label>
            <input
              type="text"
              id="description"
              className="w-full p-2 rounded-md border border-gray-300"
              placeholder="Enter a short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-2">
          <button
            type="submit"
            className="hover:bg-[#0056B3] text-lg bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
          <button
            className="bg-[#FF0000] text-lg text-white p-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default AddEditHabit;
