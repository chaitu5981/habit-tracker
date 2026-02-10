import { useState } from "react";
import { HabitContext } from "../context/HabitContext";
import type { HabitType } from "../types";

const HabitProvider = ({ children }: { children: React.ReactNode }) => {
  const [habits, setHabits] = useState<HabitType[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      return JSON.parse(storedHabits);
    }
    return [];
  });
  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
};

export default HabitProvider;
