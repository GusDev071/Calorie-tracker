import { categories } from "../data/categories";
import { v4 as uuidv4 } from "uuid";
import type { ActivityActions } from "../reducers/activityReducer";
import type { Activity } from "../types";
import { useState, type Dispatch, useEffect } from "react";
import type { ActivityState } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId,
      )[0];
      if (selectedActivity) {
        setActivity(selectedActivity);
      }
    }
  }, [state.activeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    console.log(isNumberField);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          Registrar movimiento
        </p>
        <h3 className="text-3xl font-black tracking-tight text-slate-900">
          Añade una comida o una actividad.
        </h3>
        <p className="text-sm leading-6 text-slate-500">
          Completa los datos para actualizar el balance del día al instante.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="category"
          className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500"
        >
          Categoría
        </label>
        <select
          id="category"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="name"
          className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500"
        >
          Actividad
        </label>
        <input
          id="name"
          type="text"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label
          htmlFor="calories"
          className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500"
        >
          Calorías
        </label>
        <input
          id="calories"
          type="number"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          placeholder="Ej. 200, 300, 400"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="w-full cursor-pointer rounded-2xl bg-sky-950 px-4 py-4 text-sm font-black uppercase tracking-[0.25em] text-white shadow-[0_18px_30px_-18px_rgba(15,23,42,0.9)] transition hover:-translate-y-0.5 hover:bg-sky-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        value={activity.category === 1 ? "Agregar comida" : "Agregar actividad"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
