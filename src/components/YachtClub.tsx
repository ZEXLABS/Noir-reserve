/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Ship, Anchor, Wind, Shield, Users, ArrowRight, Eye, Calendar, MapPin, X } from 'lucide-react';
import { Yacht } from '../types';
import { YACHTS } from '../data';

interface YachtClubProps {
  onBookYacht: (yachtId: string) => void;
}

export default function YachtClub({ onBookYacht }: YachtClubProps) {
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);
  
  // Custom Charter Route Estimator state
  const [activeYachtId, setActiveYachtId] = useState<string>('vela-noir');
  const [charterDays, setCharterDays] = useState<number>(3);
  const [targetRoute, setTargetRoute] = useState<string>('Aegean Caldera Seclusion (Greece)');
  const [manifestRequested, setManifestRequested] = useState<boolean>(false);

  const selectedForEstimator = YACHTS.find(y => y.id === activeYachtId) || YACHTS[0];
  const totalEstimate = selectedForEstimator.pricePerDay * charterDays;

  const routes = [
    'Aegean Caldera Seclusion (Greece)',
    'Arctic Fjord Uncharted Expedition (Svalbard)',
    'Polynesian Coral Crater Isolation (Bora Bora Outer Ring)',
    'Carribean Trench Hidden Archipelagos'
  ];

  const handleRequestManifest = (e: React.FormEvent) => {
    e.preventDefault();
    setManifestRequested(true);
    setTimeout(() => {
      setManifestRequested(false);
    }, 4000);
  };

  return (
    <div id="noir-yacht-club" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      {/* Editorial Title */}
      <div className="max-w-6xl mx-auto mb-16 text-center md:text-left">
        <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">05 / OCEANS OF SOLITUDE</span>
        <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-tight text-white mt-2">
          The Yacht <span className="font-serif italic font-light text-stone-300">Club</span>
        </h2>
        <p className="text-stone-400 font-light text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
          Sanctuaries that move. Charting paths across coordinates unlisted by conventional vessels. Complete hydro-acoustic shielding, military structural integrity, and Michelin hospitality on water.
        </p>
      </div>

      {/* Fleets Showcase */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        {YACHTS.map((yacht) => (
          <div 
            key={yacht.id}
            id={`yacht-showcase-${yacht.id}`}
            className="group bg-stone-900/20 border border-stone-900 rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Image banner */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src={yacht.image} 
                alt={yacht.name} 
                className="w-full h-full object-cover brightness-[0.55] group-hover:scale-103 transition-transform duration-700 filter grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] font-mono text-amber-500 tracking-[0.3em] uppercase block mb-1">
                  FLEET MANIFEST REQUISITION
                </span>
                <h3 className="text-2xl font-sans font-light text-white tracking-tight">
                  {yacht.name}
                </h3>
                <p className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-widest">{yacht.tagline}</p>
              </div>
            </div>

            {/* Vessel Description & Amenities */}
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-6">
                  {yacht.longDescription}
                </p>

                {/* Grid details */}
                <div className="grid grid-cols-2 gap-4 mb-6 border-b border-stone-800 pb-6">
                  <div>
                    <span className="text-[9px] font-mono text-stone-500 block uppercase">VESSEL LENGTH</span>
                    <span className="text-xs font-sans text-stone-300 font-medium">{yacht.length}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-stone-500 block uppercase">COMPLEMENTED CREW</span>
                    <span className="text-xs font-sans text-stone-300 font-medium">{yacht.crewCount} Elite Marine Operatives</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-stone-500 block uppercase">GUEST SUITE CAPACITY</span>
                    <span className="text-xs font-sans text-stone-300 font-medium">{yacht.guestCapacity} Guests (Full Isolation)</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-stone-500 block uppercase">DAILY CHARTER EXCHANGE</span>
                    <span className="text-xs font-mono text-amber-500 font-bold">${yacht.pricePerDay.toLocaleString()} / Day</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <span className="text-[9px] font-mono text-stone-500 block uppercase mb-3 tracking-widest">ON-BOARD LUXURIES & SYSTEMS</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {yacht.amenities.map((am, i) => (
                      <div key={i} className="flex items-center space-x-2 text-[11px] text-stone-400 font-light">
                        <span className="h-1 w-1 bg-amber-500/70 rounded-full" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Actions */}
              <div className="flex space-x-4">
                <button
                  id={`yacht-book-action-${yacht.id}`}
                  onClick={() => onBookYacht(yacht.id)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-[11px] font-bold rounded-sm transition-colors flex-1 text-center"
                >
                  REQUEST EXPEDITION CHARTER
                </button>
                <button
                  id={`yacht-spec-action-${yacht.id}`}
                  onClick={() => setSelectedYacht(yacht)}
                  className="px-4 py-3 bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono tracking-widest text-[11px] rounded-sm transition-colors border border-stone-800"
                >
                  SPECIFICATIONS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive charter estimator & router */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 bg-stone-900/20 border border-stone-900 rounded-sm p-8">
        <div className="lg:col-span-2">
          <h3 className="text-xl font-sans font-light text-stone-100 flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Charter Expedition Portal</span>
          </h3>
          <p className="text-stone-400 font-light text-xs mt-2 max-w-xl leading-relaxed">
            Craft custom coordinates, select an elite vessel configuration, and formulate your marine retreat timeline below to evaluate current yacht inventory availability.
          </p>

          <form onSubmit={handleRequestManifest} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                SELECT OCEANIC VESSEL
              </label>
              <select
                id="estimator-select-yacht"
                value={activeYachtId}
                onChange={(e) => setActiveYachtId(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-sm text-xs font-mono text-stone-200 p-3 focus:border-amber-500/50 focus:outline-none"
              >
                {YACHTS.map(y => (
                  <option key={y.id} value={y.id}>{y.name} ({y.length})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                CHARTER TIMELINE DURATION
              </label>
              <div className="flex items-center space-x-4 bg-stone-950 border border-stone-800 rounded-sm px-3 py-2">
                <input 
                  id="estimator-yacht-duration"
                  type="range" 
                  min="3" 
                  max="30" 
                  value={charterDays}
                  onChange={(e) => setCharterDays(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <span className="text-xs font-mono text-white font-bold whitespace-nowrap">{charterDays} Days</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                TARGET EXPEDITION COGNISANCE ROUTE
              </label>
              <select
                id="estimator-select-route"
                value={targetRoute}
                onChange={(e) => setTargetRoute(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-sm text-xs font-mono text-stone-200 p-3 focus:border-amber-500/50 focus:outline-none"
              >
                {routes.map((rt, idx) => (
                  <option key={idx} value={rt}>{rt}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 flex items-center justify-between border-t border-stone-800 pt-6 mt-4">
              <button 
                id="request-manifest-submit"
                type="submit"
                className="px-6 py-3 bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-white font-mono tracking-widest text-xs rounded-sm transition-colors flex items-center space-x-2"
              >
                <Ship className="w-4 h-4 text-amber-500" />
                <span>REQUEST COMPLETE MANIFEST PDF</span>
              </button>

              <AnimatePresence>
                {manifestRequested && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] font-mono text-amber-500 animate-pulse font-bold"
                  >
                    MANIFEST EXPEDIENTLY DISPATCHED TO ENCRYPTED INBOX
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

        {/* Column charter card */}
        <div className="lg:col-span-1 bg-stone-950 border border-stone-800 p-6 rounded-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-500 tracking-widest pb-4 border-b border-stone-900 mb-6">
              <Anchor className="w-4 h-4 text-amber-500" />
              <span>COMMERCIAL MARITIME COGNIZANCE</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-stone-500 block">VESSEL</span>
                <span className="text-sm font-sans text-stone-200 mt-1 block">{selectedForEstimator.name}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-500 block">CHARTER RATE</span>
                <span className="text-sm font-mono text-stone-200 mt-1 block">${selectedForEstimator.pricePerDay.toLocaleString()} / Day</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-stone-500 block">EXPEDITION ROUTE</span>
                <span className="text-xs font-mono text-stone-300 mt-1 block italic">{targetRoute}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-900 pt-6 mt-6">
            <span className="text-[9px] font-mono text-stone-500 block">ESTIMATED EXPEDITION RATE EX-TAX</span>
            <span className="text-xl font-mono text-white font-bold block mt-1">${totalEstimate.toLocaleString()}</span>
            
            <button
              id="charter-portal-apply"
              onClick={() => onBookYacht(selectedForEstimator.id)}
              className="w-full mt-4 py-3 bg-amber-500 text-stone-950 hover:bg-amber-400 font-mono tracking-widest text-xs font-bold rounded-sm transition-colors text-center"
            >
              INITIAL STATEMENT OF INQUIRY
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Modal Overlay */}
      <AnimatePresence>
        {selectedYacht && (
          <motion.div 
            id={`yacht-modal-${selectedYacht.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-stone-900 border border-stone-800 rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl p-8 relative"
            >
              <button 
                id="close-yacht-modal"
                onClick={() => setSelectedYacht(null)}
                className="absolute top-6 right-6 z-10 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-500 tracking-widest pb-4 border-b border-stone-800 mb-6 uppercase">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>SPECIFICATIONS LOG: {selectedYacht.name}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-500 block uppercase">Vessel Outline</span>
                  <p className="text-stone-300 text-xs mt-2 font-light leading-relaxed">{selectedYacht.longDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedYacht.specs.map((item, key) => (
                    <div key={key} className="border-b border-stone-800 pb-2">
                      <span className="text-[10px] font-mono text-stone-500 block uppercase">{item.label}</span>
                      <span className="text-xs text-stone-200 mt-1 block">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-stone-800">
                  <div className="text-left">
                    <span className="text-[9px] font-mono text-stone-500 block">BASE VETTING EXCHANGE</span>
                    <span className="text-lg font-mono text-white font-bold">${selectedYacht.pricePerDay.toLocaleString()} / Day</span>
                  </div>

                  <button 
                    id={`yacht-charter-modal-${selectedYacht.id}`}
                    onClick={() => {
                      onBookYacht(selectedYacht.id);
                      setSelectedYacht(null);
                    }}
                    className="px-6 py-3 bg-amber-500 text-stone-950 hover:bg-amber-400 font-mono tracking-widest text-[11px] font-bold rounded-sm transition-colors"
                  >
                    CHARTER INQUIRY
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
