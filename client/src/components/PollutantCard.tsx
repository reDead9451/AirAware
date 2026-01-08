import { cn } from "@/lib/utils";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  description: string;
  level: "good" | "moderate" | "bad";
}

export function PollutantCard({ name, value, unit, description, level }: PollutantCardProps) {
  const getColor = (l: string) => {
    switch (l) {
      case "good": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "moderate": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "bad": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const style = getColor(level);

  return (
    <div className="bg-card/50 border border-border/50 rounded-2xl p-5 hover:border-border transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-display font-bold text-lg text-white">{name}</h4>
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded uppercase", style)}>
          {level}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {description}
      </p>
    </div>
  );
}
