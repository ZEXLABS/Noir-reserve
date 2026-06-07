/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Compass, 
  Map, 
  Moon, 
  Compass as YachtIcon, 
  Calendar, 
  MessageSquare, 
  Sparkles,
  Home, 
  Dumbbell
} from 'lucide-react';

export type NavTab = 
  | 'home'
  | 'sanctuaries'
  | 'yacht_club'
  | 'experiences'
  | 'retreats'
  | 'concierge'
  | 'reserve';

interface NavigationProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeInquiriesCount: number;
}

export default function Navigation({ activeTab, setActiveTab, activeInquiriesCount }: NavigationProps) {
  const tabs: { id: NavTab; label: string; icon: any; badge?: boolean }[] = [
    { id: 'home', label: 'THE ETHOS', icon: Home },
    { id: 'sanctuaries', label: 'SANCTUARIES', icon: Moon },
    { id: 'yacht_club', label: 'YACHT CLUB', icon: YachtIcon },
    { id: 'experiences', label: 'EXPERIENCES', icon: Sparkles },
    { id: 'retreats', label: 'RETREATS', icon: Compass },
    { id: 'concierge', label: 'CONCIERGE', icon: MessageSquare },
    { id: 'reserve', label: 'RESERVATIONS', icon: Calendar, badge: true },
  ];

  return (
    <nav 
      id="noir-navigation-bar"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-stone-950/80 backdrop-blur-md rounded-full border border-stone-800/60 shadow-2xl p-2 transition-all duration-300"
    >
      <div className="flex items-center justify-around md:justify-between px-2 md:px-4">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as NavTab)}
              className={`
                relative flex flex-col items-center justify-center p-2.5 rounded-full transition-all duration-300 group
                ${isActive 
                  ? 'text-amber-500 scale-105' 
                  : 'text-stone-500 hover:text-stone-300 hover:scale-102'
                }
              `}
            >
              <div className="relative">
                <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3" />
                {tab.badge && activeInquiriesCount > 0 && (
                  <span 
                    id="nav-badge-count"
                    className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-stone-950 animate-pulse"
                  >
                    {activeInquiriesCount}
                  </span>
                )}
              </div>
              
              <span className="hidden md:block text-[9px] font-mono tracking-widest mt-1 font-semibold">
                {tab.label}
              </span>

              {isActive && (
                <div 
                  id={`nav-active-indicator-${tab.id}`}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-500 rounded-full" 
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
