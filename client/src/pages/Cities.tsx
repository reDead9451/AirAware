import { Sidebar, MobileNav } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Cities() {
  const cities = [
    { name: "New York", country: "USA", aqi: 45, status: "Good" },
    { name: "London", country: "UK", aqi: 52, status: "Moderate" },
    { name: "Beijing", country: "China", aqi: 156, status: "Unhealthy" },
    { name: "Tokyo", country: "Japan", aqi: 34, status: "Good" },
    { name: "Delhi", country: "India", aqi: 189, status: "Unhealthy" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-20 md:pb-8 p-4 md:p-8">
        <h1 className="text-3xl font-display font-bold text-white mb-6">Tracked Cities</h1>
        
        <div className="relative mb-8 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search for a city..." 
            className="pl-12 h-12 bg-card border-border rounded-xl text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <div key={city.name} className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{city.name}</h3>
                  <p className="text-muted-foreground text-sm">{city.country}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                  ${city.aqi < 50 ? 'bg-emerald-500/10 text-emerald-400' : 
                    city.aqi < 100 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`
                }>
                  AQI {city.aqi}
                </div>
              </div>
              <p className="text-sm text-white/80">Status: {city.status}</p>
            </div>
          ))}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
