import type { Activity } from "../types/index";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: React.Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [activities],
  );

  const isEmptyActivities = useMemo(() => {
    return activities.length === 0;
  }, [activities]);

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
            Historial
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
            Comida y actividades
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          Edita o elimina registros desde una lista más clara y fácil de
          recorrer.
        </p>
      </div>

      {isEmptyActivities ? (
        <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No hay actividades disponibles
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Cuando agregues tu primera comida o ejercicio aparecerá aquí.
          </p>
        </div>
      ) : null}

      <div className="mt-8 space-y-4">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="group flex flex-col gap-6 rounded-[1.75rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(15,23,42,0.45)] md:flex-row md:items-center md:justify-between md:px-6"
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-white ${
                  activity.category === 1 ? "bg-sky-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-black tracking-tight text-slate-900">
                  {activity.name}
                </p>
                <p className="text-sm text-slate-500">
                  Registro guardado en tu historial diario.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="min-w-40 rounded-2xl bg-slate-950 px-5 py-4 text-center text-3xl font-black tracking-tight text-white shadow-[0_20px_30px_-25px_rgba(15,23,42,0.9)]">
                {activity.calories}
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
                  Calorías
                </span>
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: { id: activity.id },
                    })
                  }
                  className="rounded-2xl border border-slate-200 p-3 text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
                  aria-label={`Editar ${activity.name}`}
                >
                  <PencilSquareIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { id: activity.id },
                    })
                  }
                  className="rounded-2xl border border-slate-200 p-3 text-rose-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  aria-label={`Eliminar ${activity.name}`}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
