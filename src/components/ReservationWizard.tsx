/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trash2, ShieldAlert, Sparkles, Award, Receipt, Clock, Users, Tag, Compass } from 'lucide-react';
import { Inquiry, Sanctuary, Yacht } from '../types';
import { SANCTUARIES, YACHTS, EXPERIENCES } from '../data';

interface ReservationWizardProps {
  activeInquiries: Inquiry[];
  setActiveInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  defaultVenueId?: string;
  defaultYachtId?: string;
  retreatSchedule: {
    day: string;
    time: string;
    activityId: string;
    activityName: string;
  }[];
  selectedExperiences: string[];
}

export default function ReservationWizard({
  activeInquiries,
  setActiveInquiries,
  defaultVenueId,
  defaultYachtId,
  retreatSchedule,
  selectedExperiences
}: ReservationWizardProps) {
  // Wizard input state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [bookingType, setBookingType] = useState<'sanctuary' | 'yacht'>('sanctuary');
  
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    defaultVenueId || defaultYachtId || SANCTUARIES[0].id
  );

  const [wizardSuccess, setWizardSuccess] = useState(false);

  // If defaults change, update selection matching the type
  React.useEffect(() => {
    if (defaultVenueId) {
      setBookingType('sanctuary');
      setSelectedTargetId(defaultVenueId);
    } else if (defaultYachtId) {
      setBookingType('yacht');
      setSelectedTargetId(defaultYachtId);
    }
  }, [defaultVenueId, defaultYachtId]);

  const targetSanctuary = SANCTUARIES.find(s => s.id === selectedTargetId) || SANCTUARIES[0];
  const targetYacht = YACHTS.find(y => y.id === selectedTargetId) || YACHTS[0];

  // Price calculations
  const calculateTotalBill = () => {
    let baseRate = 0;
    let days = 1;

    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diff = e.getTime() - s.getTime();
      if (diff > 0) {
        days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      }
    }

    if (bookingType === 'sanctuary') {
      baseRate = targetSanctuary.pricePerNight;
    } else {
      baseRate = targetYacht.pricePerDay;
    }

    // Include selected experiences rate add-ons
    const experienceRates: Record<string, number> = {
      'private-chef': 2500,
      'subaquatic-expedition': 12000,
      'starlit-wellness': 1800,
      'personal-concierge': 0
    };

    const expTotal = selectedExperiences.reduce((tot, expId) => {
      const rate = experienceRates[expId] || 0;
      return tot + (rate * days);
    }, 0);

    return (baseRate * days) + expTotal;
  };

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    
    const targetName = bookingType === 'sanctuary' ? targetSanctuary.name : targetYacht.name;
    const estBill = calculateTotalBill();

    const newInquiry: Inquiry = {
      id: `NOIR-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      type: bookingType,
      targetId: selectedTargetId,
      targetName,
      guestName,
      guestEmail,
      startDate,
      endDate,
      guestCount,
      selectedExperiences: [...selectedExperiences],
      retreatSchedule: retreatSchedule.length > 0 ? [...retreatSchedule] : undefined,
      totalEstimate: estBill,
      status: 'pending',
      createdAt: new Date().toLocaleDateString()
    };

    setActiveInquiries(prev => [newInquiry, ...prev]);
    setWizardSuccess(true);
    
    setTimeout(() => {
      // Clear wizard entry state
      setGuestName('');
      setGuestEmail('');
      setStartDate('');
      setEndDate('');
      setWizardSuccess(false);
    }, 4000);
  };

  const handleCancelInquiry = (id: string) => {
    setActiveInquiries(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div id="noir-reservations-wizard" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Side Section: Custom Booking inputs */}
        <div className="flex-1 bg-stone-900/10 border border-stone-900 rounded-sm p-8">
          <div className="mb-8">
            <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">08 / RESERVATION PORTAL</span>
            <h2 className="text-2xl md:text-4xl font-sans font-light text-white mt-1">
              Sanctuary <span className="font-serif italic font-light text-stone-300">Requisitions</span>
            </h2>
            <p className="text-stone-400 font-light text-xs mt-2 max-w-xl leading-relaxed">
              Formulate stay limits and date configurations. Any existing scheduled somatic programs and experiences configured on alternate tabs will be synchronized automatically.
            </p>
          </div>

          <form onSubmit={handleCreateInquiry} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Type selector */}
              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  PORTAL ACCESS TIER
                </label>
                <div className="flex space-x-4 bg-stone-950 border border-stone-850 p-1.5 rounded-sm">
                  <button
                    id="wizard-type-sanctuary"
                    type="button"
                    onClick={() => {
                      setBookingType('sanctuary');
                      setSelectedTargetId(SANCTUARIES[0].id);
                    }}
                    className={`flex-1 py-2 text-center text-xs font-mono rounded-sm transition-colors ${
                      bookingType === 'sanctuary' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    LAND SANCTUARIES
                  </button>
                  <button
                    id="wizard-type-yacht"
                    type="button"
                    onClick={() => {
                      setBookingType('yacht');
                      setSelectedTargetId(YACHTS[0].id);
                    }}
                    className={`flex-1 py-2 text-center text-xs font-mono rounded-sm transition-colors ${
                      bookingType === 'yacht' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    MARINE FLEETS
                  </button>
                </div>
              </div>

              {/* Selection Dropdown */}
              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  SELECT INDIVIDUAL ASSET
                </label>
                <select
                  id="wizard-select-asset"
                  value={selectedTargetId}
                  onChange={(e) => setSelectedTargetId(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                >
                  {bookingType === 'sanctuary' ? (
                    SANCTUARIES.map(s => <option key={s.id} value={s.id}>{s.name} (${s.pricePerNight.toLocaleString()}/nt)</option>)
                  ) : (
                    YACHTS.map(y => <option key={y.id} value={y.id}>{y.name} (${y.pricePerDay.toLocaleString()}/day)</option>)
                  )}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  IDENTITY RECOGNITION
                </label>
                <input
                  id="wizard-guest-name"
                  type="text"
                  placeholder="Official Identity Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  SECURE MEMBER EMAIL ID
                </label>
                <input
                  id="wizard-guest-email"
                  type="email"
                  placeholder="encrypted@domain.net"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  ARRIVAL CALENDAR THRESHOLD
                </label>
                <input
                  id="wizard-start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  DEPARTURE CALENDAR THRESHOLD
                </label>
                <input
                  id="wizard-end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  ATTENDING ATTENDANTS (PARTY SIZE)
                </label>
                <input
                  id="wizard-guest-count"
                  type="number"
                  min="1"
                  max="12"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  required
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  id="submit-requisition-wizard"
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-xs font-bold rounded-sm transition-colors text-center shadow-lg"
                >
                  DISPATCH REQUISITION DOSSIER
                </button>
              </div>

            </div>
          </form>

          <AnimatePresence>
            {wizardSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-stone-900 border border-emerald-500/40 rounded-sm text-emerald-500 text-center text-xs font-mono font-bold tracking-widest uppercase"
              >
                SECURE REQUISITION DISPATCHED TO LONDON ATELIER CENTRAL REGISTRY VAULT.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Active Submitted Inquiries List */}
        <div className="w-full lg:w-[480px]">
          <div className="bg-stone-900/10 border border-stone-900 rounded-sm p-8 sticky top-24 max-h-[85vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-6">
                <h3 className="text-xs font-mono tracking-widest text-stone-300 uppercase flex items-center space-x-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Your Active Requisitions</span>
                </h3>
                <span className="text-[10px] font-mono bg-stone-950 border border-stone-850 rounded-full px-2 py-0.5 text-stone-500">
                  {activeInquiries.length} REGISTERED
                </span>
              </div>

              {activeInquiries.length === 0 ? (
                <div className="text-center py-20 text-stone-600">
                  <Calendar className="w-8 h-8 mx-auto mb-3 opacity-35 text-amber-500" />
                  <p className="text-xs font-mono tracking-wider">NO REQUISITIONS REGISTERED</p>
                  <p className="text-[10px] font-light mt-1 normal-case leading-relaxed">
                    Set up parameters on the left to lodge a formal stay statement. The status will update instantly upon review.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 overflow-y-auto max-h-[50vh] pr-2 scrollbar-none">
                  {activeInquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      id={`inquiry-record-${inq.id}`}
                      className="p-5 bg-stone-950 border border-stone-850 rounded-sm flex flex-col justify-between"
                    >
                      {/* Booking meta header */}
                      <div className="flex justify-between items-start pb-3 border-b border-stone-900/85">
                        <div>
                          <span className="text-[9px] font-mono text-amber-500 font-bold block">{inq.id}</span>
                          <span className="text-sm font-sans font-normal text-stone-150 mt-1 block">{inq.targetName}</span>
                          <span className="text-[8.5px] font-mono text-stone-500 uppercase mt-0.5 block">{inq.startDate} to {inq.endDate}</span>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="text-[8.5px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                            {inq.status.toUpperCase()}
                          </span>
                          <span className="text-[9px] font-mono text-[10px] text-stone-500 mt-2 block">Party of {inq.guestCount}</span>
                        </div>
                      </div>

                      {/* Itinerary features list summary */}
                      <div className="py-4 space-y-3">
                        {inq.selectedExperiences.length > 0 && (
                          <div>
                            <span className="text-[9px] font-mono text-stone-500 block uppercase mb-1">BUNDLED ATELIER SERVICES</span>
                            <div className="flex flex-wrap gap-1">
                              {inq.selectedExperiences.map((exId, idx) => {
                                const expObj = EXPERIENCES.find(e => e.id === exId);
                                return (
                                  <span key={idx} className="bg-stone-900 text-stone-400 text-[9px] font-mono border border-stone-850 px-2 py-0.5 rounded-sm">
                                    {expObj?.name || exId}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {inq.retreatSchedule && inq.retreatSchedule.length > 0 && (
                          <div>
                            <span className="text-[9px] font-mono text-stone-500 block uppercase mb-1">EMBEDDED SOMATIC ACTIVITIES</span>
                            <span className="text-[9.5px] font-mono text-stone-400 block italic leading-relaxed">
                              {inq.retreatSchedule.length} session blocks registered (e.g., {inq.retreatSchedule[0].activityName})
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Calculations total and delete hooks */}
                      <div className="pt-3 border-t border-stone-900 flex items-center justify-between">
                        <div>
                          <span className="text-[8px] font-mono text-stone-600 block uppercase">TOTAL REQUISITION VALUE</span>
                          <span className="text-sm font-mono text-stone-200 font-bold">${inq.totalEstimate.toLocaleString()}</span>
                        </div>

                        <button
                          id={`cancel-inquiry-${inq.id}`}
                          onClick={() => handleCancelInquiry(inq.id)}
                          className="p-2 bg-stone-900/60 hover:bg-stone-900 border border-stone-850 hover:border-red-400/40 text-stone-500 hover:text-red-400 rounded-sm transition-colors flex items-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[9px] font-mono font-bold">CANCEL</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {activeInquiries.length > 0 && (
              <div className="border-t border-stone-950 pt-4 mt-6">
                <div className="flex items-start space-x-2 text-[8px] font-mono text-stone-500 leading-relaxed uppercase">
                  <ShieldAlert className="w-4 h-4 text-amber-500/80 shrink-0" />
                  <span>
                    Your Active inquiry logs are encrypted and synchronized within your local browser profile. Dossiers are locked from outer crawler observation networks.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
