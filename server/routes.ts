
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerImageRoutes } from "./replit_integrations/image";
import { api } from "@shared/routes";
import { z } from "zod";
import { ai } from "./replit_integrations/image/client"; // Reusing the configured AI client

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Register Integration Routes (Optional, but good to have)
  registerChatRoutes(app);
  registerImageRoutes(app);

  // AQI Route (Mock)
  app.get(api.aqi.get.path, (req, res) => {
    const city = req.query.city as string || "San Francisco";
    // Mock Data
    const mockData = {
      city,
      aqi: Math.floor(Math.random() * 100) + 20,
      pollutants: {
        pm25: Math.floor(Math.random() * 50),
        pm10: Math.floor(Math.random() * 60),
        o3: Math.floor(Math.random() * 40),
        no2: Math.floor(Math.random() * 30),
      },
      temperature: Math.floor(Math.random() * 15) + 15,
      humidity: Math.floor(Math.random() * 30) + 40,
      condition: "Good",
      recommendation: "Air quality is good. A perfect day for outdoor activities!",
      forecast: Array.from({ length: 7 }).map((_, i) => ({
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
        aqi: Math.floor(Math.random() * 100) + 20,
      })),
    };
    
    // Simple logic to adjust condition based on AQI
    if (mockData.aqi > 50) {
      mockData.condition = "Moderate";
      mockData.recommendation = "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
    }
    if (mockData.aqi > 100) {
      mockData.condition = "Unhealthy for Sensitive Groups";
      mockData.recommendation = "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
    }
    
    res.json(mockData);
  });

  // User/Login Routes
  app.post(api.users.login.path, async (req, res) => {
    const { username } = req.body;
    let user = await storage.getUserByUsername(username);
    if (!user) {
      // Create user if not exists (simple auth)
      user = await storage.createUser({ username, preferences: {} });
    }
    res.json(user);
  });

  // Simple Chat Route
  app.post(api.chat.post.path, async (req, res) => {
    const { message, context } = req.body;
    try {
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
      const contextStr = context ? `Context: ${JSON.stringify(context)}\n` : "";
      const prompt = `You are AirAware, an AI assistant for air quality. 
      ${contextStr}
      User: ${message}
      Response:`;
      
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      res.json({ response });
    } catch (e: any) {
      console.error("Chat error:", e);
      res.status(500).json({ message: e.message || "Failed to generate response" });
    }
  });

  return httpServer;
}
