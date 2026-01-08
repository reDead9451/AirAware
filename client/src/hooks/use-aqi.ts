import { useQuery, useMutation } from "@tanstack/react-query";
import { api, buildUrl, type AqiData } from "@shared/routes";
import { aqiDataSchema } from "@shared/schema";
import { z } from "zod";

// Fetch AQI Data
export function useAqi(city: string) {
  return useQuery({
    queryKey: [api.aqi.get.path, city],
    queryFn: async () => {
      const url = buildUrl(api.aqi.get.path) + `?city=${encodeURIComponent(city)}`;
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch AQI data");
      }
      const data = await res.json();
      return aqiDataSchema.parse(data);
    },
    enabled: !!city, // Only run if city is selected
  });
}

// Chat Assistant Hook
export function useChat() {
  return useMutation({
    mutationFn: async ({ message, context }: { message: string, context?: any }) => {
      const res = await fetch(api.chat.post.path, {
        method: api.chat.post.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, context }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      
      const data = await res.json();
      return api.chat.post.responses[200].parse(data);
    }
  });
}

// User Login / Session Hook
export function useLogin() {
  return useMutation({
    mutationFn: async (username: string) => {
      const res = await fetch(api.users.login.path, {
        method: api.users.login.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Login failed");
      return api.users.login.responses[200].parse(await res.json());
    }
  });
}
