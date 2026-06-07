/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navigation, { NavTab } from './components/Navigation';
import EthosHome from './components/EthosHome';
import SanctuariesDirectory from './components/SanctuaryCard';
import ExperiencesConfigurator from './components/ExperiencesConfigurator';
import YachtClub from './components/YachtClub';
import RetreatSchedule from './components/RetreatSchedule';
import PrivateAssemblies from './components/PrivateAssemblies';
import ConciergeAtelier from './components/ConciergeAtelier';
import ReservationWizard from './components/ReservationWizard';
import { Inquiry, ChatMessage } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Interactive booking defaults for cross-tab workflows
  const [defaultVenueId, setDefaultVenueId] = useState<string | undefined>(undefined);
  const [defaultYachtId, setDefaultYachtId] = useState<string | undefined>(undefined);

  // Core Persisted States across the entire stay
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>(['private-chef']);
  const [experienceQuantities, setExperienceQuantities] = useState<Record<string, number>>({
    'private-chef': 3,
    'subaquatic-expedition': 1
  });
  const [experiencePreferences, setExperiencePreferences] = useState<Record<string, string>>({
    'private-chef': 'Molecular Botanical Cuisine',
    'subaquatic-expedition': 'Mid-Water Bioluminescent Dive'
  });

  const [retreatSchedule, setRetreatSchedule] = useState<{
    day: string;
    time: string;
    activityId: string;
    activityName: string;
  }[]>([
    { day: 'Monday', time: '08:00', activityId: 'basalt-ritual', activityName: 'Deep Tissue Basalt Chamber' },
    { day: 'Wednesday', time: '11:00', activityId: 'silent-cavern', activityName: 'Silent Meditation in Lava Crypt' }
  ]);

  // Pre-load active inquiries list to demonstrate booking dashboard capability out of the box
  const [activeInquiries, setActiveInquiries] = useState<Inquiry[]>([
    {
      id: 'NOIR-INQ-482012',
      type: 'sanctuary',
      targetId: 'azure-monolith',
      targetName: 'The Azure Monolith',
      guestName: 'Sterling Vance',
      guestEmail: 'sterling@vance.club',
      startDate: '2026-07-15',
      endDate: '2026-07-22',
      guestCount: 2,
      selectedExperiences: ['private-chef', 'subaquatic-expedition'],
      retreatSchedule: [
        { day: 'Monday', time: '08:00', activityId: 'basalt-ritual', activityName: 'Deep Tissue Basalt Chamber' },
        { day: 'Wednesday', time: '11:00', activityId: 'silent-cavern', activityName: 'Silent Meditation in Lava Crypt' }
      ],
      totalEstimate: 87500,
      status: 'pending',
      createdAt: '06/07/2026'
    }
  ]);

  // Pre-loaded Chat workspace history
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      content: 'Welcome to the Noir Reserve Concierge Atelier. I am your lifestyle architect, representing our silent clifftops, deep jungles, and polar-expedition water vessels. I have unlocked your direct telemetric link to our Mayfair and Point Dume registries. How may I orchestrate your upcoming sanctuary stay parameters, or draft a proprietary customized itinerary today?',
      timestamp: '12:00 PM'
    }
  ]);

  // Experience Toggle Helper
  const toggleExperience = (id: string) => {
    setSelectedExperiences(prev => {
      if (prev.includes(id)) {
        return prev.filter(e => e !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Cross-Tab Book Sanctuary Helper
  const handleBookSanctuaryRedirect = (sanctuaryId: string) => {
    setDefaultVenueId(sanctuaryId);
    setDefaultYachtId(undefined);
    setActiveTab('reserve');
  };

  // Cross-Tab Book Yacht Helper
  const handleBookYachtRedirect = (yachtId: string) => {
    setDefaultYachtId(yachtId);
    setDefaultVenueId(undefined);
    setActiveTab('reserve');
  };

  // Switch to Reservation tab from experiences / schedule
  const handleNavigateToReservation = () => {
    setActiveTab('reserve');
  };

  // Handle Assemblies Dispatch redirect to 예약 status
  const handleBookAssemblyRedirect = (assemblyData: {
    eventName: string;
    sanctuaryId: string;
    guestCount: number;
    durationDays: number;
    cateringTier: string;
    securityRequired: boolean;
    totalEstimate: number;
  }) => {
    const newAssemblyInquiry: Inquiry = {
      id: `NOIR-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'assembly',
      targetId: assemblyData.sanctuaryId,
      targetName: `Private Assembly buy-out: ${assemblyData.eventName}`,
      guestName: 'Member-Exclusive Board',
      guestEmail: 'confidential@conclave.club',
      startDate: new Date().toLocaleDateString(),
      endDate: new Date(Date.now() + assemblyData.durationDays * 24 * 60 * 60 * 1000).toLocaleDateString(),
      guestCount: assemblyData.guestCount,
      selectedExperiences: ['personal-concierge'],
      totalEstimate: assemblyData.totalEstimate,
      status: 'pending',
      createdAt: new Date().toLocaleDateString()
    };

    setActiveInquiries(prev => [newAssemblyInquiry, ...prev]);
    setTimeout(() => {
      setActiveTab('reserve');
    }, 1500);
  };

  // Render proper compartment matching tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <EthosHome 
            onExplore={setActiveTab} 
            onSelectSanctuary={handleBookSanctuaryRedirect} 
          />
        );
      case 'sanctuaries':
        return (
          <SanctuariesDirectory 
            onBookSanctuary={handleBookSanctuaryRedirect} 
          />
        );
      case 'yacht_club':
        return (
          <YachtClub 
            onBookYacht={handleBookYachtRedirect} 
          />
        );
      case 'experiences':
        return (
          <ExperiencesConfigurator
            selectedExperiences={selectedExperiences}
            toggleExperience={toggleExperience}
            experienceQuantities={experienceQuantities}
            setExperienceQuantities={setExperienceQuantities}
            experiencePreferences={experiencePreferences}
            setExperiencePreferences={setExperiencePreferences}
            onNavigateToBooking={handleNavigateToReservation}
          />
        );
      case 'retreats':
        return (
          <RetreatSchedule
            retreatSchedule={retreatSchedule}
            setRetreatSchedule={setRetreatSchedule}
            onApplySchedule={handleNavigateToReservation}
          />
        );
      case 'concierge':
        return (
          <ConciergeAtelier
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        );
      case 'reserve':
        return (
          <ReservationWizard
            activeInquiries={activeInquiries}
            setActiveInquiries={setActiveInquiries}
            defaultVenueId={defaultVenueId}
            defaultYachtId={defaultYachtId}
            retreatSchedule={retreatSchedule}
            selectedExperiences={selectedExperiences}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div id="noir-reserve-application-shell" className="relative min-h-screen bg-stone-950 font-sans tracking-normal select-none pb-24">
      {/* Dynamic Tab Body rendering space */}
      <main id="tab-outlet-shell" className="relative z-10">
        {renderTabContent()}
      </main>

      {/* Floating Bottom Navigator bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeInquiriesCount={activeInquiries.length}
      />
    </div>
  );
}
