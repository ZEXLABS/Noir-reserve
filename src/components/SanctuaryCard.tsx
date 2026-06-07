/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, Shield, ArrowRight, Eye } from 'lucide-react';
import { Sanctuary } from '../types';
import { SANCTUARIES } from '../data';

interface SanctuariesDirectoryProps {
  onBookSanctuary: (sanctuaryId: string) => void;
}

export default function SanctuariesDirectory({ onBookSanctuary }: SanctuariesDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'beachfront' | 'clifftop' | 'jungle' | 'desert' | 'water'>('all');
  const [selectedSanctuary, setSelectedSanctuary] = useState<Sanctuary | null>(null);

  const filters = [
    { value: 'all', label: 'ALL ESTATES' },
    { value: 'beachfront', label: 'BEACHFRONT' },
    { value: 'clifftop', label: 'CLIFFTOP' },
    { value: 'jungle', label: 'SECLUDED JUNGLE' },
    { value: 'desert', label: 'DESERT OASIS' },
    { value: 'water', label: 'WATER PAVILIONS' }
  ] as const;

  const filteredSanctuaries = SANCTUARIES.filter(sanctuary => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'beachfront') {
      return resortMatchesBeachfront(sanctuary);
    }
    return sanctuary.type === activeFilter;
  });

  function resortMatchesBeachfront(resort: Sanctuary) {
    // Santorini clifftop overlooks beach, Bora Bora is water lagoon, so they qualify
    return resort.id === 'azure-monolith' || resort.id === 'el-dorado-lagoon';
  }

  return (
    <div id="noir-sanctuaries-directory" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      {/* Directory Title */}
      <div className="max-w-6xl mx-auto mb-16 text-center md:text-left">
        <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">03 / ARCHITECTURAL ARCHIVES</span>
        <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-tight text-white mt-2">
          Sanctuary <span className="font-serif italic font-light text-stone-300">Directory</span>
        </h2>
        <p className="text-stone-400 font-light text-sm md:text-base max-w-2xl mt-4 leading-relaxed">
          Each sanctuary is fully isolated and strictly integrated into its environmental coordinates. Select a structure to view structural narratives, specific metrics, and secure access protocols.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto border-b border-stone-900 pb-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex space-x-8 md:space-x-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              id={`filter-tab-${filter.value}`}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                text-xs font-mono tracking-widest font-bold pb-2 border-b-2 transition-all duration-300
                ${activeFilter === filter.value 
                  ? 'text-amber-500 border-amber-500' 
                  : 'text-stone-500 border-transparent hover:text-stone-300'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Sanctuaries */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredSanctuaries.map((sanctuary) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              key={sanctuary.id}
              id={`sanctuary-card-${sanctuary.id}`}
              className="group bg-stone-900/30 rounded-sm border border-stone-900/80 overflow-hidden hover:border-stone-800 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={sanctuary.image} 
                  alt={sanctuary.name} 
                  className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-[0.7] group-hover:scale-105 transition-all duration-500 filter grayscale-[10%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
                <span className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-sm border border-stone-800 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-amber-500/90 font-bold">
                  {sanctuary.type.toUpperCase()}
                </span>
                
                <button 
                  onClick={() => setSelectedSanctuary(sanctuary)}
                  className="absolute bottom-4 right-4 bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-200 p-2 border border-stone-850 rounded-full transition-all duration-300 flex items-center justify-center group/btn"
                  title="View Specifications"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-stone-400 text-xs font-mono mb-2">
                    <MapPin className="w-3 h-3 text-amber-500/70" />
                    <span>{sanctuary.location}</span>
                  </div>
                  <h3 className="text-xl font-sans font-light text-white tracking-tight group-hover:text-amber-500 transition-colors duration-300">
                    {sanctuary.name}
                  </h3>
                  <p className="text-[11px] font-mono text-amber-500/70 tracking-widest mt-1 mb-3 uppercase">
                    {sanctuary.tagline}
                  </p>
                  <p className="text-stone-400 text-xs font-light leading-relaxed line-clamp-2">
                    {sanctuary.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-stone-900/80 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 block">NIGHTLY SOLITUDE VETTING</span>
                    <span className="text-sm font-mono text-stone-200 font-bold">${sanctuary.pricePerNight.toLocaleString()} <span className="text-xs text-stone-500 font-normal">/ Night</span></span>
                  </div>
                  
                  <button
                    onClick={() => setSelectedSanctuary(sanctuary)}
                    className="flex items-center space-x-1.5 text-xs font-mono text-amber-500/90 hover:text-amber-400 tracking-widest uppercase font-bold"
                  >
                    <span>ARCHIVES</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sanctuary Detail Modal/Overlay */}
      <AnimatePresence>
        {selectedSanctuary && (
          <motion.div 
            id={`sanctuary-modal-${selectedSanctuary.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-stone-900 border border-stone-800 rounded-sm w-full max-w-5xl overflow-hidden shadow-2xl relative my-8"
            >
              {/* Close Button */}
              <button 
                id="close-sanctuary-modal"
                onClick={() => setSelectedSanctuary(null)}
                className="absolute top-6 right-6 z-10 bg-stone-950/80 text-stone-400 hover:text-white p-2 border border-stone-850 rounded-full transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-72 md:h-auto min-h-[350px]">
                  <img 
                    src={selectedSanctuary.image} 
                    alt={selectedSanctuary.name} 
                    className="w-full h-full object-cover brightness-[0.5] filter grayscale-[10%]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/10 to-transparent" />
                  
                  {/* Floating Header */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-2 text-amber-500/90 text-xs font-mono mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="tracking-widest">{selectedSanctuary.location.toUpperCase()}</span>
                    </div>
                    <h3 className="text-3xl font-sans font-light text-white tracking-tight leading-none">
                      {selectedSanctuary.name}
                    </h3>
                    <p className="text-[11px] font-mono text-amber-500 tracking-widest mt-2 uppercase font-medium">
                      {selectedSanctuary.tagline}
                    </p>
                  </div>
                </div>

                {/* Detail Section */}
                <div className="p-8 md:p-12 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
                  <div>
                    {/* Exclusivity Guard Header */}
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-500 tracking-widest border-b border-stone-800 pb-4 mb-6">
                      <Shield className="w-4 h-4 text-amber-500/70" />
                      <span>NOIR STANDARD METRIC ARCHIVE</span>
                    </div>

                    <p className="text-xs text-stone-300 font-light leading-relaxed mb-8">
                      {selectedSanctuary.longDescription}
                    </p>

                    {/* Specifications table */}
                    <div className="mb-8">
                      <h4 className="text-xs font-mono tracking-widest text-amber-500/80 mb-4 font-bold">STRUCTURAL SPECIFICATIONS</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedSanctuary.specs.map((spec, i) => (
                          <div key={i} className="border-b border-stone-800 pb-2">
                            <span className="text-[10px] font-mono text-stone-500 block uppercase">{spec.label}</span>
                            <span className="text-xs font-sans text-stone-200 mt-0.5 block">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exclusivity Features */}
                    <div className="mb-8">
                      <h4 className="text-xs font-mono tracking-widest text-amber-500/80 mb-3 font-bold">EXCLUSIVITY HARD PROTOCOLS</h4>
                      <ul className="space-y-2">
                        {selectedSanctuary.features.map((feat, i) => (
                          <li key={i} className="flex items-start space-x-2 text-stone-400 text-xs font-light">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500/70 mt-1.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing and Book Integration */}
                  <div className="border-t border-stone-800 pt-6 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div>
                      <span className="text-[9px] font-mono text-stone-500 block tracking-widest">ESTIMATED EXCLUSIVE VETTING</span>
                      <span className="text-2xl font-mono text-white font-bold">${selectedSanctuary.pricePerNight.toLocaleString()}<span className="text-sm font-normal text-stone-500"> / Night</span></span>
                    </div>

                    <button
                      id={`modal-book-resort-${selectedSanctuary.id}`}
                      onClick={() => {
                        onBookSanctuary(selectedSanctuary.id);
                        setSelectedSanctuary(null);
                      }}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-xs font-bold leading-none rounded-sm transition-colors text-center"
                    >
                      REQUEST SANCTUARY STAY
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
