/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ChevronDown, ChevronUp, Plus, Minus, DollarSign, CalendarRange } from 'lucide-react';
import { EXPERIENCES } from '../data';

interface ExperiencesConfiguratorProps {
  selectedExperiences: string[];
  toggleExperience: (id: string) => void;
  experienceQuantities: Record<string, number>;
  setExperienceQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  experiencePreferences: Record<string, string>;
  setExperiencePreferences: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onNavigateToBooking: () => void;
}

export default function ExperiencesConfigurator({
  selectedExperiences,
  toggleExperience,
  experienceQuantities,
  setExperienceQuantities,
  experiencePreferences,
  setExperiencePreferences,
  onNavigateToBooking
}: ExperiencesConfiguratorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Experience Rates (numerical parsing for real calculations)
  const experienceRates: Record<string, number> = {
    'private-chef': 2500,
    'subaquatic-expedition': 12000,
    'starlit-wellness': 1800,
    'personal-concierge': 0
  };

  const incrementQty = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExperienceQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  };

  const decrementQty = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExperienceQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1)
    }));
  };

  const handlePreferenceChange = (id: string, val: string) => {
    setExperiencePreferences(prev => ({
      ...prev,
      [id]: val
    }));
  };

  // Calculate Experiential Cost Estimate
  const calculateTotal = () => {
    return selectedExperiences.reduce((tot, id) => {
      const qty = experienceQuantities[id] || 1;
      const rate = experienceRates[id] || 0;
      return tot + (rate * qty);
    }, 0);
  };

  return (
    <div id="noir-experiences-configurator" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Main List and Description */}
        <div className="flex-1">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">04 / EXPERIENCE ATELIER</span>
            <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-tight text-white mt-2">
              Beyond the <span className="font-serif italic font-light text-stone-300">Threshold</span> of Ordinary
            </h2>
            <p className="text-stone-400 font-light text-sm md:text-base max-w-xl mt-4 leading-relaxed">
              True leisure is not passive. It is actively sculpted. Our specialized global services are tailored from biological analysis to secret deep-sea access coordinates.
            </p>
          </div>

          <div className="space-y-6">
            {EXPERIENCES.map((exp) => {
              const isSelected = selectedExperiences.includes(exp.id);
              const qty = experienceQuantities[exp.id] || 1;
              const isExpanded = expandedId === exp.id;

              return (
                <div 
                  key={exp.id}
                  id={`experience-item-${exp.id}`}
                  className={`
                    border rounded-sm transition-all duration-300 block overflow-hidden
                    ${isSelected 
                      ? 'bg-stone-900/40 border-amber-500/50 shadow-md' 
                      : 'bg-stone-900/10 border-stone-900 hover:border-stone-850'
                    }
                  `}
                >
                  {/* Top Header Card Section */}
                  <div 
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer space-y-4 md:space-y-0"
                  >
                    <div className="flex items-start md:items-center space-x-4">
                      {/* Check Toggle button */}
                      <button
                        id={`toggle-select-exp-${exp.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExperience(exp.id);
                        }}
                        className={`
                          h-6 w-6 rounded-sm border flex items-center justify-center transition-all duration-300
                          ${isSelected 
                            ? 'bg-amber-500 border-amber-500 text-stone-950' 
                            : 'border-stone-700 hover:border-stone-500 text-transparent'
                          }
                        `}
                      >
                        <Check className="w-4 h-4" />
                      </button>

                      {/* Info lines */}
                      <div>
                        <h3 className="text-lg font-sans font-normal text-stone-100 flex items-center space-x-2">
                          <span>{exp.name}</span>
                          <span className="text-[9px] font-mono bg-stone-950 border border-stone-800 text-stone-500 px-2 py-0.5 rounded-sm uppercase tracking-widest font-normal">
                            {exp.tagline}
                          </span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-1 max-w-xl font-light">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    {/* Cost and Expand toggle */}
                    <div className="flex items-center space-x-6 self-end md:self-auto">
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-stone-500 block uppercase">ESTIMATION VETTING</span>
                        <span className="text-xs font-mono text-stone-200 font-bold">{exp.priceEstimate}</span>
                      </div>
                      
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-500" /> : <ChevronDown className="w-5 h-5 text-stone-500" />}
                    </div>
                  </div>

                  {/* Expanded Customizer section */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="border-t border-stone-800/50 p-6 bg-stone-950/40"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Selector parameters */}
                        <div>
                          {exp.priceEstimate !== 'Inclusive in Club Membership' && (
                            <div className="mb-6">
                              <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                                QUANTITY REQUISITIONS (Sessions / Days)
                              </label>
                              <div className="flex items-center space-x-4">
                                <button 
                                  id={`decrement-qty-${exp.id}`}
                                  onClick={(e) => decrementQty(exp.id, e)}
                                  className="h-8 w-8 rounded-sm bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-sm font-mono text-white font-bold w-6 text-center">{qty}</span>
                                <button 
                                  id={`increment-qty-${exp.id}`}
                                  onClick={(e) => incrementQty(exp.id, e)}
                                  className="h-8 w-8 rounded-sm bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                              SELECT METABOLIC / OPERATIONAL SUITE
                            </label>
                            <select
                              id={`select-preference-${exp.id}`}
                              value={experiencePreferences[exp.id] || exp.options[0]}
                              onChange={(e) => handlePreferenceChange(exp.id, e.target.value)}
                              className="w-full bg-stone-900 border border-stone-800 rounded-sm text-xs font-mono text-stone-200 p-2.5 focus:border-amber-500/50 focus:outline-none"
                            >
                              {exp.options.map((opt, keyIdx) => (
                                <option key={keyIdx} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Image aspect preview */}
                        <div className="relative h-44 rounded-sm overflow-hidden border border-stone-900">
                          <img 
                            src={exp.image} 
                            alt={exp.name} 
                            className="w-full h-full object-cover brightness-[0.4] filter grayscale"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-stone-950/20" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="text-[10px] font-mono text-amber-500 block uppercase">ATELIER HIGHLIGHT</span>
                            <span className="text-xs font-sans text-stone-200 mt-0.5 block italic">{exp.name} – {experiencePreferences[exp.id] || exp.options[0]}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar Summary Estimate */}
        <div className="w-full lg:w-96">
          <div className="bg-stone-900/30 border border-stone-900 rounded-sm p-8 sticky top-24">
            <h3 className="text-xs font-mono tracking-widest text-stone-400 uppercase mb-6 pb-2 border-b border-stone-800">
              CUSTOM EXPERIENTIAL ESTIMATES
            </h3>

            {selectedExperiences.length === 0 ? (
              <div className="text-center py-12 text-stone-600">
                <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-30 text-amber-500" />
                <p className="text-xs font-mono tracking-wider">NO SERVICES ACTIVATED</p>
                <p className="text-[10px] font-light mt-1 normal-case leading-relaxed">
                  Select and configure custom artisan operations to embed into your secure retreat itinerary.
                </p>
              </div>
            ) : (
              <div>
                <ul className="space-y-4 mb-8">
                  {selectedExperiences.map((id) => {
                    const exp = EXPERIENCES.find(e => e.id === id);
                    if (!exp) return null;
                    const qty = experienceQuantities[id] || 1;
                    const rate = experienceRates[id] || 0;
                    const pref = experiencePreferences[id] || exp.options[0];

                    return (
                      <li key={id} className="text-xs">
                        <div className="flex justify-between font-mono font-bold text-stone-200">
                          <span>{exp.name}</span>
                          <span>{rate === 0 ? 'MEMBERSHIP' : `$${(rate * qty).toLocaleString()}`}</span>
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-stone-500 mt-1">
                          <span>Preference: {pref}</span>
                          {rate > 0 && <span>{qty} × ${rate.toLocaleString()}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-stone-800 pt-6 mb-8 flex justify-between items-center">
                  <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">ITINERARY ADD-ON TOTAL</span>
                  <span className="text-xl font-mono text-amber-500 font-bold">${calculateTotal().toLocaleString()}</span>
                </div>

                <button 
                  id="experiences-apply-to-booking"
                  onClick={onNavigateToBooking}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-xs font-bold rounded-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <CalendarRange className="w-4 h-4" />
                  <span>EMBED IN RESERVATION</span>
                </button>
                <p className="text-[9px] font-mono text-stone-500 mt-3 text-center leading-relaxed">
                  Active estimates will be directly synchronized into your final Atelier Sanctuary Inquiries.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
