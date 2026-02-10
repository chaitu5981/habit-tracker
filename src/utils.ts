import { habitTypes } from "./constants";
import type { ChartDataType, HabitType } from "./types";

export const getHabitsCount = (habits: HabitType[]) => {
  const data: ChartDataType[] = [];
  habitTypes.forEach((type) => {
    const typeCount = habits.filter((habit) =>
      habit.types.includes(type)
    ).length;
    data.push({ name: type, value: typeCount });
  });
  return data;
};
