import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy_key" });

interface SOSRequest {
  id: string;
  type: string;
  peopleCount: number;
  info: string;
  location: { lat: number; lng: number; name: string };
  status: 'Request Sent' | 'Rescue Team Notified' | 'In Progress' | 'Resolved';
  timestamp: string;
  priorityScore?: number;
}

// In-memory store for demo APIs
let sosStore: SOSRequest[] = [
  {
    id: "SOS-2026-0001",
    type: "Flood",
    peopleCount: 4,
    info: "Water level rising on 1st floor, family trapped.",
    location: { lat: 28.6692, lng: 77.4538, name: "Ghaziabad, Sector 4" },
    status: "Rescue Team Notified",
    timestamp: "10 min ago",
    priorityScore: 94
  },
  {
    id: "SOS-2026-0002",
    type: "Medical",
    peopleCount: 2,
    info: "Elderly person needs oxygen supply.",
    location: { lat: 28.6720, lng: 77.4400, name: "Area B, Ghaziabad" },
    status: "In Progress",
    timestamp: "25 min ago",
    priorityScore: 81
  },
  {
    id: "SOS-2026-0003",
    type: "Fire",
    peopleCount: 6,
    info: "Short circuit fire in commercial building.",
    location: { lat: 28.6580, lng: 77.4320, name: "Sector 7 Commercial Complex" },
    status: "Request Sent",
    timestamp: "5 min ago",
    priorityScore: 98
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API: Gemini AI Chatbot ---
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const history = (messages || []).map((m: any) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      if (!process.env.GEMINI_API_KEY) {
        return res.json({
          reply: "SafeSignal AI Offline Mode: Please move to higher ground if in flood risk area, keep emergency radio on, and call local helpline 112."
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: history,
        config: {
          systemInstruction: "You are SafeSignal AI, an advanced disaster early warning and emergency response assistant. Keep responses concise, clear, action-oriented, and formatted in short bullet points. Always add standard emergency disclaimers.",
        },
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate AI response" });
    }
  });

  // --- API: Gemini AI Priority Assessment ---
  app.post("/api/ai-priority", async (req, res) => {
    try {
      const { incident } = req.body;
      if (!incident) {
        return res.status(400).json({ error: "Incident required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        // Fallback priority calculation
        const score = Math.floor(70 + Math.random() * 28);
        return res.json({
          priorityScore: score,
          recommendation: `High urgency dispatch recommended for ${incident.type || 'incident'} in ${incident.location || 'area'}.`
        });
      }

      const prompt = `Analyze this disaster emergency report and assign a rescue priority score between 1 and 100 based on severity, headcount, and vulnerability:
Type: ${incident.type}
People Trapped: ${incident.peopleCount}
Details: ${incident.info}
Location: ${incident.location?.name || 'Unknown'}

Return ONLY a JSON object with keys: "priorityScore" (number), "urgency" ("Critical"|"High"|"Medium"|"Low"), and "recommendation" (string summary).`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      const text = response.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return res.json(result);
      }

      res.json({ priorityScore: 85, urgency: "High", recommendation: "Dispatch nearest rescue team immediately." });
    } catch (error) {
      console.error("AI Priority Error:", error);
      res.json({ priorityScore: 88, urgency: "High", recommendation: "Priority response dispatched based on risk severity." });
    }
  });

  // --- API: Live Weather Data (Open-Meteo) ---
  app.get("/api/weather", async (req, res) => {
    try {
      const lat = req.query.lat || "28.6692";
      const lon = req.query.lon || "77.4538";
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      if (response.ok) {
        const data = await response.json();
        return res.json({
          temp: Math.round(data.current_weather.temperature),
          condition: "Partly Cloudy",
          windspeed: data.current_weather.windspeed,
          location: "Ghaziabad, India"
        });
      }
      throw new Error("Weather API error");
    } catch {
      res.json({ temp: 26, condition: "Partly Cloudy", windspeed: 12, location: "Ghaziabad, India" });
    }
  });

  // --- API: Active Disaster Alerts ---
  app.get("/api/alerts", (req, res) => {
    res.json({
      activeAlertsCount: 12,
      activeIncidentsCount: 5,
      peopleAffected: 8420,
      alerts: [
        {
          id: "ALT-101",
          title: "FLASH FLOOD WARNING",
          level: "CRITICAL",
          color: "red",
          location: "Ghaziabad — River Bed Area",
          impact: "Your area may experience flooding within the next 2 hours.",
          action: "Move to higher ground immediately.",
          time: "10:45 AM",
          affectedCount: 4500
        },
        {
          id: "ALT-102",
          title: "Heavy Rainfall Alert",
          level: "HIGH",
          color: "orange",
          location: "Ghaziabad Central",
          impact: "High chances of heavy rainfall in the next 6 hours.",
          action: "Stay indoors, secure emergency kit.",
          time: "08:30 AM",
          affectedCount: 3200
        },
        {
          id: "ALT-103",
          title: "Landslide Risk Warning",
          level: "MODERATE",
          color: "yellow",
          location: "Uttarakhand Hilly Belt",
          impact: "Moderate risk of landslides in hilly areas.",
          action: "Avoid travel on mountain roads.",
          time: "06:15 AM",
          affectedCount: 720
        }
      ]
    });
  });

  // --- API: SOS Emergency Management ---
  app.get("/api/sos", (req, res) => {
    res.json(sosStore);
  });

  app.post("/api/sos", (req, res) => {
    const { type, peopleCount, info, location } = req.body;
    const newSOS: SOSRequest = {
      id: `SOS-2026-${String(sosStore.length + 1).padStart(4, '0')}`,
      type: type || 'Emergency',
      peopleCount: peopleCount || 1,
      info: info || 'Emergency assistance requested',
      location: location || { lat: 28.6692, lng: 77.4538, name: "Ghaziabad" },
      status: 'Request Sent',
      timestamp: 'Just now',
      priorityScore: Math.floor(80 + Math.random() * 18)
    };
    sosStore.unshift(newSOS);
    res.json({ success: true, sos: newSOS });
  });

  // --- API: Evacuation Route Calculator ---
  app.post("/api/route", (req, res) => {
    const { origin, destination } = req.body;
    res.json({
      origin: origin || "Current Location",
      destination: destination || "Nearest Safe Shelter",
      distanceKm: 3.2,
      estimatedMinutes: 12,
      riskLevel: "Low",
      waypoints: [
        { lat: 28.6692, lng: 77.4538, name: "Current Location" },
        { lat: 28.6710, lng: 77.4500, name: "Safe Waypoint A (Avoiding River Bed)" },
        { lat: 28.6750, lng: 77.4420, name: "Shelter Entrance - Sector 4" }
      ],
      blockedRoads: ["G.T. Road Underpass (Flooded)"],
      dangerZones: ["Hindon River Banks (High Flood Zone)"]
    });
  });

  // --- API: Resource Management Stats ---
  app.get("/api/resources", (req, res) => {
    res.json({
      hospitals: { total: 12, availableBeds: 482, totalBeds: 900, icuBeds: 38, doctors: 112 },
      shelters: { total: 18, availableCapacity: 2430, totalCapacity: 3200, currentOccupancy: 770, occupancyPercent: 24 },
      teams: { activeTeams: 18, pendingDispatches: 3, vehicleCount: 46 }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
