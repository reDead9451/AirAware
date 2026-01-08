import { Sidebar, MobileNav } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UserCircle, Bell, Heart, Shield } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [sensitive, setSensitive] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 md:ml-64 pb-20 md:pb-8 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-display font-bold text-white mb-8">Health Profile</h1>

          <div className="bg-card border border-border/50 rounded-3xl p-8 mb-8 flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Guest User</h2>
              <p className="text-muted-foreground">Standard Account</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Health Settings
              </h3>
              
              <div className="flex items-center justify-between py-4 border-b border-border/30">
                <div>
                  <p className="font-medium text-white">Sensitive Group</p>
                  <p className="text-sm text-muted-foreground">Enable stricter alerts for asthma/allergies</p>
                </div>
                <Switch checked={sensitive} onCheckedChange={setSensitive} />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-white">Daily Health Summary</p>
                  <p className="text-sm text-muted-foreground">Receive morning briefing based on local AQI</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </h3>
              
              <div className="flex items-center justify-between py-4 border-b border-border/30">
                <div>
                  <p className="font-medium text-white">High Pollution Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify when AQI exceeds 150</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-white">Weekly Report</p>
                  <p className="text-sm text-muted-foreground">Summary of your exposure</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
             <Button variant="destructive" onClick={() => {
               localStorage.removeItem('airaware_user');
               window.location.href = '/login';
             }}>
               Sign Out
             </Button>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
