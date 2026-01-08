import { Sidebar, MobileNav } from "@/components/Sidebar";

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-20 md:pb-0 h-screen relative">
        {/* Placeholder for Map Implementation */}
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-center p-8 bg-card/80 backdrop-blur-md rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">Global Air Quality Map</h2>
            <p className="text-muted-foreground max-w-md">
              Interactive global heatmap coming soon. Visualize real-time PM2.5 concentrations across the world.
            </p>
            {/* Simulation of map points */}
            <div className="mt-8 relative w-full h-48 bg-slate-800 rounded-xl overflow-hidden opacity-50">
               <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-emerald-500 rounded-full blur-sm animate-pulse" />
               <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full blur-sm animate-pulse delay-100" />
               <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-yellow-500 rounded-full blur-sm animate-pulse delay-200" />
            </div>
          </div>
        </div>
        
        {/* Floating controls could go here */}
        <div className="absolute top-4 right-4 md:right-8 flex gap-2">
           <button className="px-4 py-2 bg-card/90 backdrop-blur text-white rounded-lg text-sm font-medium border border-white/10 hover:bg-card">
             PM2.5
           </button>
           <button className="px-4 py-2 bg-card/90 backdrop-blur text-muted-foreground rounded-lg text-sm font-medium border border-white/10 hover:bg-card hover:text-white">
             O3
           </button>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
