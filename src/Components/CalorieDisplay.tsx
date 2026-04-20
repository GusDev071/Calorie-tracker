type CalorieDisplayProps = {
  calories: number;
  text: string;
};

export default function CalorieDisplay({
  calories,
  text,
}: CalorieDisplayProps) {
  const accentStyles = {
    Consumidas:
      "from-orange-300/30 via-orange-200/10 to-transparent text-orange-200 border-orange-200/15",
    Ejercicio:
      "from-cyan-300/30 via-cyan-200/10 to-transparent text-cyan-200 border-cyan-200/15",
    Diferencia:
      "from-violet-300/25 via-sky-200/10 to-transparent text-violet-100 border-violet-200/15",
  };

  const style = accentStyles[text as keyof typeof accentStyles];

  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-[1.75rem] border bg-white/8 p-5 backdrop-blur-sm md:p-6 ${style?.split(" ").find((token) => token.startsWith("border-")) ?? "border-white/10"}`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${style ?? "from-white/10 via-transparent to-transparent"}`}
      />
      <div className="relative min-w-0 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
          {text}
        </p>
        <p className="min-w-0 text-[clamp(2.5rem,5vw,2.6rem)] font-black leading-none tracking-[-0.04em] text-white tabular-nums">
          {calories}
        </p>
        <p className="text-sm font-medium text-slate-300">Calorías</p>
      </div>
    </article>
  );
}
