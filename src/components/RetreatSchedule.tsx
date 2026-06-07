/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trash2, CalendarClock, Dumbbell, Sparkles, Watch, Leaf, Coffee } from 'lucide-react';
import { WellnessActivity } from '../types';
import { WELLNESS_ACTIVITIES } from '../data';

interface RetreatScheduleProps {
  retreatSchedule: {
    day: string;
    time: string;
    activityId: string;
    activityName: string;
  }[];
  setRetreatSchedule: React.Dispatch<React.SetStateAction<{
    day: string;
    time: string;
    activityId: string;
    activityName: string;
  }[]>>;
  onApplySchedule: () => void;
}

export default function RetreatSchedule({ retreatSchedule, setRetreatSchedule, onApplySchedule }: RetreatScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedActivityId, setSelectedActivityId] = useState<string>(WELLNESS_ACTIVITIES[0].id);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(WELLNESS_ACTIVITIES[0].timeSlots[0]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const selectedActivityObj = WELLNESS_ACTIVITIES.find(a => a.id === selectedActivityId) || WELLNESS_ACTIVITIES[0];

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if duplicate day + time slot exists
    const duplicate = retreatSchedule.some(item => item.day === selectedDay && item.time === selectedTimeSlot);
    if (duplicate) {
      alert("A somatic alignment ritual is already registered for this coordinate.");
      return;
    }

    setRetreatSchedule(prev => [
      ...prev,
      {
        day: selectedDay,
        time: selectedTimeSlot,
        activityId: selectedActivityId,
        activityName: selectedActivityObj.name
      }
    ].sort((a, b) => {
      // Sort days, then sort times
      const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return a.time.localeCompare(b.time);
    }));
  };

  const handleRemoveSession = (day: string, time: string) => {
    setRetreatSchedule(prev => prev.filter(item => !(item.day === day && item.time === time)));
  };

  const handleClearAll = () => {
    setRetreatSchedule([]);
  };

  // Icon selector based on category type
  const getCategoryIcon = (type: string) => {
    if (type === 'ritual') return <Dumbbell className="w-4 h-4 text-amber-500/80" />;
    if (type === 'mindfulness') return <Sparkles className="w-4 h-4 text-amber-500/80" />;
    return <Coffee className="w-4 h-4 text-amber-500/80" />;
  };

  return (
    <div id="noir-retreats-scheduler" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Intros and schedulers */}
        <div className="flex-1">
          <div className="mb-12 text-left">
            <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">06 / SOMATIC RECALIBRATION</span>
            <h2 className="text-3xl md:text-5xl font-sans font-extralight tracking-tight text-white mt-1">
              Retreats & <span className="font-serif italic font-light text-stone-300">Sanctuary</span>
            </h2>
            <p className="text-stone-400 font-light text-sm md:text-base max-w-xl mt-4 leading-relaxed">
              Disconnect from outer metrics. Reconnect with metabolic cadence. Our guided daily programs align deep tissue, physical and neurological frequencies.
            </p>
          </div>

          {/* Form to configure schedule session */}
          <div className="bg-stone-900/20 border border-stone-900 rounded-sm p-8 mb-12">
            <h3 className="text-xs font-mono tracking-widest text-stone-300 uppercase mb-6 flex items-center space-x-2">
              <CalendarClock className="w-4.5 h-4.5 text-amber-500" />
              <span>Somatic Session Dispatcher</span>
            </h3>

            <form onSubmit={handleAddSession} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  ALIGNED WEEKDAY
                </label>
                <select
                  id="wellness-select-day"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3 focus:border-amber-500/40 focus:outline-none"
                >
                  {days.map((dy, idx) => (
                    <option key={idx} value={dy}>{dy.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  RESTORATION RITUAL
                </label>
                <select
                  id="wellness-select-activity"
                  value={selectedActivityId}
                  onChange={(e) => {
                    const actId = e.target.value;
                    setSelectedActivityId(actId);
                    const actObj = WELLNESS_ACTIVITIES.find(a => a.id === actId);
                    if (actObj) {
                      setSelectedTimeSlot(actObj.timeSlots[0]);
                    }
                  }}
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3 focus:border-amber-500/40 focus:outline-none"
                >
                  {WELLNESS_ACTIVITIES.map(wa => (
                    <option key={wa.id} value={wa.id}>{wa.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  TIME SLOT EXCHANGE
                </label>
                <select
                  id="wellness-select-timeslot"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3 focus:border-amber-500/40 focus:outline-none"
                >
                  {selectedActivityObj.timeSlots.map((ts, idx) => (
                    <option key={idx} value={ts}>{ts} HRS</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3 border-t border-stone-900 pt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between space-y-4 md:space-y-0 text-xs">
                <div className="text-stone-400 font-light flex items-center space-x-2">
                  <Watch className="w-4 h-4 text-stone-600" />
                  <span>Duration: {selectedActivityObj.duration} | Method: {selectedActivityObj.type.toUpperCase()}</span>
                </div>

                <button
                  id="wellness-add-session-btn"
                  type="submit"
                  className="px-6 py-3 bg-stone-950 border border-stone-800 hover:border-amber-500/50 text-stone-300 font-mono tracking-widest text-xs font-bold rounded-sm transition-colors text-center"
                >
                  DISPATCH TO SCHEDULE
                </button>
              </div>
            </form>
          </div>

          {/* Directory Descriptions of Wellness Modalities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WELLNESS_ACTIVITIES.map((wa) => (
              <div key={wa.id} id={`wellness-modalities-${wa.id}`} className="p-6 bg-stone-900/10 border border-stone-900/60 rounded-sm">
                <div className="flex items-center space-x-2 mb-3">
                  {getCategoryIcon(wa.type)}
                  <h4 className="text-sm font-sans font-normal text-stone-200">{wa.name}</h4>
                </div>
                <p className="text-stone-400 text-xs font-light leading-relaxed mb-4">
                  {wa.description}
                </p>
                <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  Session duration: {wa.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Matrix Column */}
        <div className="w-full lg:w-96">
          <div className="bg-stone-900/30 border border-stone-900 rounded-sm p-8 sticky top-24 max-h-[80vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-800">
                <h3 className="text-xs font-mono tracking-widest text-stone-400 uppercase">
                  WEEKLY SOMATIC PROGRAM
                </h3>
                {retreatSchedule.length > 0 && (
                  <button 
                    id="clear-retreat-schedule"
                    onClick={handleClearAll}
                    className="text-[9px] font-mono text-stone-600 hover:text-red-400 flex items-center"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    <span>RESET</span>
                  </button>
                )}
              </div>

              {retreatSchedule.length === 0 ? (
                <div className="text-center py-20 text-stone-600">
                  <Calendar className="w-8 h-8 mx-auto mb-3 opacity-30 text-amber-500" />
                  <p className="text-xs font-mono tracking-wider">PROGRAM GRID EMPTY</p>
                  <p className="text-[10px] font-light mt-1 normal-case leading-relaxed">
                    Formulate customized daily activities to synchronize with your upcoming stay registry.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2 scrollbar-none">
                  <AnimatePresence>
                    {retreatSchedule.map((item, idx) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        key={idx}
                        className="p-3 bg-stone-950 border border-stone-850 rounded-sm flex items-center justify-between group"
                      >
                        <div>
                          <span className="text-[9px] font-mono text-amber-500/80 block uppercase tracking-wider">
                            {item.day} • {item.time} HRS
                          </span>
                          <span className="text-xs font-sans text-stone-300 mt-1 block">
                            {item.activityName}
                          </span>
                        </div>
                        <button
                          id={`remove-schedule-item-${idx}`}
                          onClick={() => handleRemoveSession(item.day, item.time)}
                          className="text-stone-600 hover:text-stone-300 transition-colors p-1"
                          title="Remove Session"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {retreatSchedule.length > 0 && (
              <div className="border-t border-stone-900 pt-6 mt-6">
                <button
                  id="apply-schedule-integrated"
                  onClick={onApplySchedule}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-xs font-bold rounded-sm transition-colors text-center block"
                >
                  SAVE PROGRAM TO BOOKING
                </button>
                <p className="text-[9px] font-mono text-stone-500 mt-3 text-center leading-relaxed">
                  Your customized weekly program coordinates will be linked directly to your sanctuary inquiry file.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
