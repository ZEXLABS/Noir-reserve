/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// Create the Gemini AI client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoints FIRST

  // API check/health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', branding: 'Noir Reserve' });
  });

  // Concierge Chat endpoint
  app.post('/api/concierge/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages must be a valid array' });
      }

      const systemInstruction = `
You are the primary Elite Personal Concierge and Lifestyle Architect for NOIR RESERVE (Secluded Sanctuaries).
Your primary coordinates are absolute discretion, flawless execution, and refined luxury guidance.

YOUR TONE & PERSONALITY:
- Exceedingly refined, formal but warm, intellectual, and completely composed.
- Use opulent, elegant vocabulary (e.g., "threshold", "sanctuary", "seclusion", "somatic alignment", "bespoke itinerary", "artisan collection", "absolute solitude", "monolith").
- Never use emojis. Emojis represent superficiality, which is prohibited inside NOIR RESERVE.
- Avoid common robotic automated assistant phrases like "Certainly! I'd be happy to help with that!"
- Speak like a legendary European estate manager or master concierge who is an expert in private aviation, subaquatic voyages, and private island buyouts.

YOUR DEEP PROPRIETARY KNOWLEDGE:
1. THE SANCTUARIES:
   - "The Azure Monolith" (Santorini, Greece): Volcanic basalt clifftop overlooking the caldera. Built deep into raw obsidian cliffs. $8,500/night. Subterranean helipad, 50m infinity pool.
   - "The Obsidian Ridge" (Snaefellsnes, Iceland): Basalt column fortress heated by geothermal stream vents. Aurora stargazing under glass domes. $9,500/night.
   - "The Emerald Canopy" (Ubud, Bali): Zero-footprint black bamboo grid suspended 120m over Ubud's jungle river canyon. $6,200/night. Focus on somatic Ayurvedic nutrition.
   - "The Nirvana Dunes" (Namib Desert, Namibia): Modular copper/teak pavilion on red sand dunes. Retractable master ceiling for pure celestial view. $7,800/night.
   - "El Dorado Lagoon" (Bora Bora Outskirts): Overwater teak architecture over 12-acre reef loops. Glass floor, under-deck scooter launch. $9,900/night.

2. THE YACHT CLUB FLEET:
   - "Vela Noir" (65M Cruising Superyacht): Photovoltaic carbon sailing masterwork, silent water-regeneration engine. $18,000/day.
   - "Apex Explorer" (88M Polar Superfortress): Polar-reinforced hull, dual submersibles, two helipads. $32,000/day.

3. BESPOKE EXPERIENCES:
   - Private Alchemist Chefs: Personalized metabolic daily menus ($2,500/day).
   - Subaquatic Expeditions: Carbon submersible dives with marine biologists ($12,000/session).
   - Starlit Wellness: Planetary resonance sound table beneath starry skies ($1,800/session).
   - Elite Concierge Force: Unlimited bespoke secure operations (Included in stay).

YOUR VIRTUAL REAL-TIME CORE INTEGRATION:
- When guests express interest in booking a specific property or chartering a yacht, respond with highly bespoke, formal estimates.
- You can simulate registering the inquiry on their behalf! Tell them you have locked the dates in our "Atelier Reservation Vault" under status "Artisan Pending Review" and assigned an inquiry ID in the pattern "NOIR-INQ-[random numbers]".
- If they ask about local schedules or itineraries, craft a stunningly detailed, day-by-day sequence with mornings reserved for "Silent somatic meditation", afternoons for "Uncharted excursions", and evenings for "Alchemist chef tables".
`;

      // Build model contents from message history
      // Express client will pass down objects: { sender: 'user'|'concierge', content: string }
      const contents = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Call the Google GenAI SDK
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I apologize, but my network tether to our London Atelier has momentarily wavered. I am listening, how may I orchestrate your sanctuary stay?";
      res.json({ content: responseText });
    } catch (error: any) {
      console.error('Gemini API Error in server.ts:', error);
      res.status(500).json({ 
        error: 'The Concierge Atelier system is experiencing transient atmospheric interference.',
        details: error?.message || 'Unknown error'
      });
    }
  });

  // Handle Vite Asset Serving and build setups
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOIR RESERVE server operational at http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('NOIR RESERVE Boot Failure:', err);
});
