import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  //contadores

  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0,
      ),
    [activities],
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0,
      ),
    [activities],
  );
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities],
  );

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">
            Resumen del día
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
            Balance de calorías
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-300">
          Consulta rápidamente cuánto consumiste, cuánto quemaste y la
          diferencia actual.
        </p>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="Ejercicio" />
        <CalorieDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}
