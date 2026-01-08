import { useState } from "react";
import { useLocation } from "wouter";
import { useLogin } from "@/hooks/use-aqi";
import { Wind, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    loginMutation.mutate(username, {
      onSuccess: (user) => {
        // Simple client-side auth simulation
        localStorage.setItem("airaware_user", JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.username}`,
        });
        setLocation("/");
      },
      onError: (err) => {
        toast({
          title: "Login failed",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />

      <div className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
            <Wind className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white text-center">AirAware</h1>
          <p className="text-muted-foreground text-center">Monitor your environment in real-time.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-white ml-1">Username</label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="h-12 rounded-xl bg-secondary/50 border-border focus:border-primary/50 text-white placeholder:text-muted-foreground/50"
              autoComplete="off"
            />
          </div>

          <Button 
            type="submit" 
            disabled={loginMutation.isPending || !username}
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-lg transition-all"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                Connecting...
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
