import { useReducer, useEffect, useMemo } from "react";
import Form from "./Components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import ActivityList from "./Components/ActivityList";
import CalorieTracker from "./Components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length,
    [state.activities],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf5_0%,_#f8fbff_42%,_#eef6ff_100%)] text-slate-900">
      <header className="border-b border-sky-100/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
              Bienestar diario
            </p>
            <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900 md:text-3xl">
              Contador de Calorías
            </h1>
          </div>
          <button
            onClick={() => dispatch({ type: "restart-app" })}
            disabled={!canRestartApp}
            className="rounded-full border border-sky-900/10 bg-sky-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-0.5 hover:bg-sky-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            Reiniciar Aplicación
          </button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8 md:py-10">
        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.65)] md:px-8 md:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.35),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.22),_transparent_38%)]" />
            <div className="relative space-y-6">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                  Panel de seguimiento
                </span>
                <h2 className="max-w-xl text-3xl font-black leading-tight md:text-5xl">
                  Controla comidas y ejercicio desde una sola vista clara.
                </h2>
                <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                  Registra lo que consumes, lo que quemas y revisa tu balance
                  calórico.
                </p>
              </div>
              <CalorieTracker activities={state.activities} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/85 p-3 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,_rgba(240,249,255,0.95),_rgba(255,247,237,0.95))] p-4 md:p-6">
              <Form dispatch={dispatch} state={state} />
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] backdrop-blur-xl md:p-8">
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </section>
      </main>
    </div>
  );
}

export default App;
