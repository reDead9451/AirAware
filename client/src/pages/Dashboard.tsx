import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAqi } from "@/hooks/use-aqi";
import { Sidebar, MobileNav } from "@/components/Sidebar";
import { AqiCard } from "@/components/AqiCard";
import { PollutantCard } from "@/components/PollutantCard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [city, setCity] = useState("New York");
  
  // Auth Check
  useEffect(() => {
    const user = localStorage.getItem("airaware_user");
    if (!user) setLocation("/login");
  }, [setLocation]);

  const { data, isLoading, error } = useAqi(city);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-20 md:pb-8 p-4 md:p-8 overflow-x-hidden">
        {/* Top Bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
            <p className="text-muted-foreground">Real-time air quality monitoring</p>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-card border-border h-12 rounded-xl text-white">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New York">New York, USA</SelectItem>
                <SelectItem value="London">London, UK</SelectItem>
                <SelectItem value="Beijing">Beijing, China</SelectItem>
                <SelectItem value="Delhi">Delhi, India</SelectItem>
                <SelectItem value="Tokyo">Tokyo, Japan</SelectItem>
                <SelectItem value="San Francisco">San Francisco, USA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <div className="p-8 rounded-3xl bg-destructive/10 border border-destructive/20 text-center">
            <h3 className="text-xl font-bold text-destructive mb-2">Failed to load data</h3>
            <p className="text-muted-foreground">Could not fetch AQI data for {city}. Please try again.</p>
          </div>
        ) : data ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Main AQI Card */}
            <AqiCard 
              city={data.city}
              aqi={data.aqi}
              condition={data.condition}
              recommendation={data.recommendation}
            />

            {/* Charts & Pollutants Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Pollutants Column */}
              <motion.div variants={item} className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  Detailed Pollutants
                </h3>
                <PollutantCard 
                  name="PM2.5" 
                  value={data.pollutants.pm25} 
                  unit="µg/m³" 
                  level={data.pollutants.pm25 < 12 ? "good" : "moderate"}
                  description="Fine particles that can enter lungs."
                />
                <PollutantCard 
                  name="PM10" 
                  value={data.pollutants.pm10} 
                  unit="µg/m³" 
                  level={data.pollutants.pm10 < 54 ? "good" : "moderate"}
                  description="Inhalable particles from dust & smoke."
                />
                <PollutantCard 
                  name="Ozone (O3)" 
                  value={data.pollutants.o3} 
                  unit="ppb" 
                  level="good"
                  description="Gas formed by chemical reactions."
                />
              </motion.div>

              {/* Chart Column */}
              <motion.div variants={item} className="lg:col-span-2">
                <div className="bg-card border border-border/50 rounded-3xl p-6 h-full min-h-[400px]">
                  <h3 className="text-lg font-semibold text-white mb-6">7-Day Forecast Trend</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.forecast}>
                        <defs>
                          <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                          dataKey="day" 
                          stroke="rgba(255,255,255,0.4)" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="rgba(255,255,255,0.4)" 
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'white' }}
                          itemStyle={{ color: 'hsl(var(--primary))' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="aqi" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorAqi)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-sm text-center text-muted-foreground mt-4">
                    Predicted Air Quality Index for the upcoming week based on weather patterns.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Environmental Stats */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card/50 p-6 rounded-2xl border border-border/50 text-center">
                <p className="text-muted-foreground text-sm mb-1">Temperature</p>
                <p className="text-2xl font-bold text-white">{data.temperature}°C</p>
              </div>
              <div className="bg-card/50 p-6 rounded-2xl border border-border/50 text-center">
                <p className="text-muted-foreground text-sm mb-1">Humidity</p>
                <p className="text-2xl font-bold text-white">{data.humidity}%</p>
              </div>
              <div className="bg-card/50 p-6 rounded-2xl border border-border/50 text-center">
                <p className="text-muted-foreground text-sm mb-1">Wind Speed</p>
                <p className="text-2xl font-bold text-white">12 km/h</p>
              </div>
              <div className="bg-card/50 p-6 rounded-2xl border border-border/50 text-center">
                <p className="text-muted-foreground text-sm mb-1">UV Index</p>
                <p className="text-2xl font-bold text-white">Moderate (4)</p>
              </div>
            </motion.div>

          </motion.div>
        ) : null}
      </main>

      <ChatAssistant contextData={data} />
      <MobileNav />
    </div>
  );
}
