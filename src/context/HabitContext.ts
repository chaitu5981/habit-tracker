import { createContext, useContext } from "react";
import type { HabitType } from "../types";

interface HabitContextType {
  habits: HabitType[];
  setHabits: (habits: HabitType[]) => void;
}

export const HabitContext = createContext<HabitContextType>({
  habits: [],
  setHabits: () => {},
});

export const useHabit = () => {
  return useContext(HabitContext);
};
