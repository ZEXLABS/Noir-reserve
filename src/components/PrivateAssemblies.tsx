/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Network, TowerControl, Calendar, UserCheck, ArrowRight } from 'lucide-react';
import { SANCTUARIES } from '../data';

interface PrivateAssembliesProps {
  onBookAssembly: (assemblyData: {
    eventName: string;
    sanctuaryId: string;
    guestCount: number;
    durationDays: number;
    cateringTier: string;
    securityRequired: boolean;
    totalEstimate: number;
  }) => void;
}

export default function PrivateAssemblies({ onBookAssembly }: PrivateAssembliesProps) {
  const [eventName, setEventName] = useState('Sovereign Council Summit');
  const [selectedSanctuaryId, setSelectedSanctuaryId] = useState(SANCTUARIES[0].id);
  const [guestCount, setGuestCount] = useState(25);
  const [durationDays, setDurationDays] = useState(4);
  const [cateringTier, setCateringTier] = useState('michelin_three');
  const [securityRequired, setSecurityRequired] = useState(true);

  const [inquiryDispatched, setInquiryDispatched] = useState(false);

  // Price calculations
  const selectedSanctuary = SANCTUARIES.find(s => s.id === selectedSanctuaryId) || SANCTUARIES[0];
  const cateringCosts: Record<string, number> = {
    michelin_three: 1500,
    artisan_local: 800,
    alchemist_bespoke: 3000
  };

  const calculateEstimate = () => {
    const venueCost = selectedSanctuary.pricePerNight * durationDays * 2.5; // Vennue buyouts are multi-coefficient
    const cateringCost = (cateringCosts[cateringTier] || 1500) * guestCount * durationDays;
    const securityCost = securityRequired ? 12000 * durationDays : 0;
    return venueCost + cateringCost + securityCost;
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const estimate = calculateEstimate();
    onBookAssembly({
      eventName,
      sanctuaryId: selectedSanctuaryId,
      guestCount,
      durationDays,
      cateringTier,
      securityRequired,
      totalEstimate: estimate
    });

    setInquiryDispatched(true);
    setTimeout(() => {
      setInquiryDispatched(false);
    }, 4000);
  };

  return (
    <div id="noir-private-assemblies" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Assembly configurations */}
        <div className="flex-1">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">07 / PRIVATE ASSEMBLIES</span>
            <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-tight text-white mt-1">
              Sovereign <span className="font-serif italic font-light text-stone-300">Conclaves</span> & Galas
            </h2>
            <p className="text-stone-400 font-light text-sm md:text-base max-w-xl mt-4 leading-relaxed">
              Complete private buyouts of our secluded land assets for sovereign boards, summits, and historic moments. Completely security-isolated and fully integrated.
            </p>
          </div>

          {/* Assemblies selection options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-stone-900/10 border border-stone-900 rounded-sm">
              <span className="text-[9px] font-mono text-amber-500/80 uppercase block mb-2">Buyout Category 01</span>
              <h4 className="text-lg font-sans font-normal text-stone-100 mb-3">Sovereign Summits</h4>
              <p className="text-stone-400 text-xs font-light leading-relaxed leading-6">
                Complete sanctuary isolation with high-level encryption towers, physical drone barriers, and private maritime escorts. Engineered for critical summits where complete secrecy is expected.
              </p>
            </div>

            <div className="p-8 bg-stone-900/10 border border-stone-900 rounded-sm">
              <span className="text-[9px] font-mono text-amber-500/80 uppercase block mb-2">Buyout Category 02</span>
              <h4 className="text-lg font-sans font-normal text-stone-100 mb-3">Beachfront Conclaves</h4>
              <p className="text-stone-400 text-xs font-light leading-relaxed leading-6">
                Exclusive seaside celebrations, corporate alignment galas, and bespoke culinary alignment programs. The entire resort space acts as a private playground for your esteemed board or circle.
              </p>
            </div>
          </div>

          {/* Assembly Builder Form */}
          <div className="bg-stone-900/20 border border-stone-900 rounded-sm p-8">
            <h3 className="text-xs font-mono tracking-widest text-stone-300 uppercase mb-6 flex items-center space-x-2">
              <Network className="w-4.5 h-4.5 text-amber-500" />
              <span>Assembly Structural Planner</span>
            </h3>

            <form onSubmit={handleDispatch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                    CONCLAVE TITLE / IDENTITY
                  </label>
                  <input
                    id="assembly-name-input"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                    VEHICLE SANCTUARY SECLUSION SITE
                  </label>
                  <select
                    id="assembly-select-venue"
                    value={selectedSanctuaryId}
                    onChange={(e) => setSelectedSanctuaryId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-855 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                  >
                    {SANCTUARIES.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.location})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                    ATTENDANCE CAP (No. of Guests)
                  </label>
                  <input
                    id="assembly-guest-count"
                    type="number"
                    min="5"
                    max="150"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    required
                    className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                    BUYOUT DURATION (Days)
                  </label>
                  <input
                    id="assembly-duration-days"
                    type="number"
                    min="2"
                    max="14"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                    CULINARY ALCHEMY TIER
                  </label>
                  <select
                    id="assembly-catering"
                    value={cateringTier}
                    onChange={(e) => setCateringTier(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                  >
                    <option value="michelin_three">3-Star Culinary Guild Coordination ($1,500/guest/day)</option>
                    <option value="artisan_local">Artisan Regional Foraged Protocols ($800/guest/day)</option>
                    <option value="alchemist_bespoke">Bespoke Metabolic Molecular Cuisine ($3,000/guest/day)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 bg-stone-950 border border-stone-850 rounded-sm p-3.5">
                  <input
                    id="assembly-security-toggle"
                    type="checkbox"
                    checked={securityRequired}
                    onChange={(e) => setSecurityRequired(e.target.checked)}
                    className="accent-amber-500 h-4 w-4"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-stone-300 block font-bold">TACTICAL SECURITY DETAIL</span>
                    <span className="text-[9px] font-mono text-stone-500 block uppercase">Continuous physical air & land perimeter control</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-900 pt-6 flex items-center justify-between">
                <button
                  id="assembly-submit-btn"
                  type="submit"
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-xs font-bold rounded-sm transition-colors"
                >
                  DISPATCH CONCLAVE RESERVATION
                </button>

                <AnimatePresence>
                  {inquiryDispatched && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono text-amber-500 animate-pulse font-bold"
                    >
                      SECURE DOSSIER CREATED. ATELIER BOARD VETTING REGISTERED.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>

        {/* Estimates Summary sidebar */}
        <div className="w-full lg:w-96">
          <div className="bg-stone-900/30 border border-stone-900 rounded-sm p-8 sticky top-24">
            <h3 className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-6 pb-2 border-b border-stone-800">
              SECURE VENUE ESTIMATES
            </h3>

            <div className="space-y-4 mb-8">
              <div>
                <span className="text-[9px] font-mono text-stone-500 block">SELECTED BUYOUT ASSET</span>
                <span className="text-xs font-sans text-stone-300 block mt-1">{selectedSanctuary.name}</span>
                <span className="text-[10px] font-mono text-stone-500 block italic">{selectedSanctuary.location}</span>
              </div>

              <div>
                <span className="text-[9px] font-mono text-stone-500 block">BASE BUYOUT MULTIPLIER VALUE</span>
                <span className="text-xs font-mono text-stone-300 block mt-1">${(selectedSanctuary.pricePerNight * durationDays * 2.5).toLocaleString()}</span>
              </div>

              <div>
                <span className="text-[9px] font-mono text-stone-500 block">CULINARY MATRIX ({guestCount} Guests)</span>
                <span className="text-xs font-mono text-stone-300 block mt-1">
                  ${((cateringCosts[cateringTier] || 1500) * guestCount * durationDays).toLocaleString()}
                </span>
              </div>

              {securityRequired && (
                <div>
                  <span className="text-[9px] font-mono text-stone-500 block">TACTICAL ESCORT & BARRIER</span>
                  <span className="text-xs font-mono text-stone-300 block mt-1">${(12000 * durationDays).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="border-t border-stone-800 pt-6">
              <span className="text-[9px] font-mono text-stone-500 block uppercase">ESTIMATED ASSEMBLED VALUE EX-TAX</span>
              <span className="text-2xl font-mono text-amber-500 font-bold block mt-1">
                ${calculateEstimate().toLocaleString()}
              </span>
              <p className="text-[8.5px] font-mono text-stone-600 mt-2 leading-relaxed normal-case">
                Sovereign conclaves require a complete 25% security reservation deposit, finalized only upon direct satellite interview with our Atelier board.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
