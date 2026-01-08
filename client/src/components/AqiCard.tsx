import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Wind, ThumbsUp, AlertTriangle, AlertOctagon } from "lucide-react";

interface AqiCardProps {
  aqi: number;
  condition: string;
  recommendation: string;
  city: string;
}

export function AqiCard({ aqi, condition, recommendation, city }: AqiCardProps) {
  // Determine color theme based on AQI
  const getTheme = (aqi: number) => {
    if (aqi <= 50) return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: ThumbsUp, label: "Good" };
    if (aqi <= 100) return { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: Wind, label: "Moderate" };
    if (aqi <= 150) return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: AlertTriangle, label: "Unhealthy for Sensitive Groups" };
    return { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: AlertOctagon, label: "Unhealthy" };
  };

  const theme = getTheme(aqi);
  const Icon = theme.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative overflow-hidden rounded-3xl p-8 border backdrop-blur-sm",
        "bg-gradient-to-br from-card to-card/50",
        theme.border
      )}
    >
      {/* Background decoration */}
      <div className={cn("absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-10", theme.bg.replace('/10', '/30'))} />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wind className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Current Air Quality</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{city}</h2>
          <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold", theme.bg, theme.color)}>
            <Icon className="w-4 h-4" />
            {theme.label}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right space-y-1">
            <p className="text-sm text-muted-foreground">US AQI</p>
            <div className={cn("text-6xl md:text-7xl font-display font-bold", theme.color)}>
              {aqi}
            </div>
          </div>
          
          {/* Circular Gauge Placeholder (Visual) */}
          <div className="w-24 h-24 rounded-full border-8 border-muted/20 relative flex items-center justify-center">
             <div 
               className={cn("absolute inset-0 rounded-full border-8 border-current border-t-transparent border-l-transparent transform -rotate-45", theme.color)} 
               style={{ opacity: 0.8 }}
             />
             <Wind className={cn("w-8 h-8", theme.color)} />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/50">
        <p className="text-lg text-white/80 font-medium">
          "{recommendation}"
        </p>
      </div>
    </motion.div>
  );
}
