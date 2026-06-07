/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Sanctuary {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  location: string;
  type: 'beachfront' | 'clifftop' | 'jungle' | 'desert' | 'water';
  pricePerNight: number;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
}

export interface Yacht {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  length: string;
  crewCount: number;
  guestCapacity: number;
  pricePerDay: number;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  amenities: string[];
}

export interface Experience {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  priceEstimate: string;
  options: string[];
}

export interface WellnessActivity {
  id: string;
  name: string;
  type: 'ritual' | 'mindfulness' | 'nutrition';
  description: string;
  duration: string;
  timeSlots: string[];
}

export interface Inquiry {
  id: string;
  type: 'sanctuary' | 'yacht' | 'custom' | 'assembly';
  targetId?: string; // Sanctuary ID or Yacht ID
  targetName: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  selectedExperiences: string[];
  retreatSchedule?: {
    day: string;
    time: string;
    activityId: string;
    activityName: string;
  }[];
  customRequests?: string;
  totalEstimate: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  content: string;
  timestamp: string;
  isPending?: boolean;
}

export interface AssemblyConfig {
  type: 'island_takeover' | 'corporate_sanctuary' | 'beachfront_gala' | 'bespoke_event';
  guestCount: number;
  durationDays: number;
  sanctuaryId: string;
  cateringTier: 'michelin_three' | 'artisan_local' | 'alchemist_bespoke';
  securityRequired: boolean;
}
