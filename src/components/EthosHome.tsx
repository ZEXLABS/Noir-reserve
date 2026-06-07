/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Moon, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { NavTab } from './Navigation';

interface EthosHomeProps {
  onExplore: (tab: NavTab) => void;
  onSelectSanctuary: (id: string) => void;
}

export default function EthosHome({ onExplore, onSelectSanctuary }: EthosHomeProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div id="noir-ethos-home" className="min-h-screen text-stone-100 flex flex-col">
      {/* Editorial Header */}
      <header className="relative w-full h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12">
        {/* Background Image Layer with Heavy Noir Gradations */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000" 
            alt="Secluded Clifftop Horizon" 
            className="w-full h-full object-cover brightness-[0.35] scale-102 filter grayscale-[15%] transition-transform duration-[6000ms] ease-out hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/60" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 to-transparent" />
        </div>

        {/* Brand Banner */}
        <div className="relative z-10 flex items-center justify-between w-full border-b border-stone-800/40 pb-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold tracking-[0.3em] text-stone-300 font-sans">
              NOIR RESERVE
            </h1>
            <span className="text-[9px] font-mono tracking-[0.4em] text-amber-500/70">
              SECLUDED SANCTUARIES
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-xs font-mono tracking-widest text-stone-400">
            <button onClick={() => onExplore('sanctuaries')} className="hover:text-amber-500 transition-colors">THE COLLECTS</button>
            <span className="text-stone-800">|</span>
            <button onClick={() => onExplore('yacht_club')} className="hover:text-amber-500 transition-colors">YACHT CLUB</button>
            <span className="text-stone-800">|</span>
            <button onClick={() => onExplore('concierge')} className="hover:text-amber-500 transition-colors">ATELIER CONTACT</button>
          </div>
        </div>

        {/* Ambient Tagline */}
        <div className="relative z-10 my-auto flex flex-col max-w-4xl pt-12 md:pt-24">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-xs font-mono tracking-[0.5em] text-amber-500/80 mb-4"
          >
            BEYOND THE THRESHOLD OF ORDINARY
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-4xl md:text-7xl font-sans font-extralight tracking-tight text-white mb-6 leading-tight"
          >
            The World's Most <br className="hidden md:block" />
            <span className="font-serif italic font-light text-stone-300">Secluded Sanctuaries</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="text-stone-400 font-light text-sm md:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Unreachable by popular access routes. Hidden from planetary scanners. 
            Noir Reserve is a private collection of deep-solitude architectural retreats 
            for those who understand that isolation is the ultimate luxury.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button 
              id="home-action-reserve"
              onClick={() => onExplore('reserve')}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono tracking-widest text-xs font-bold rounded-sm transition-all duration-300 shadow-md flex items-center group"
            >
              INITIALIZE INQUIRY
              <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              id="home-action-sanctuaries"
              onClick={() => onExplore('sanctuaries')}
              className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-800 hover:border-stone-700 font-mono tracking-widest text-xs rounded-sm transition-all duration-300"
            >
              VIEW DIRECTORY
            </button>
          </motion.div>
        </div>

        {/* Bottom Status Block */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-t border-stone-800/40 pt-4 text-xs font-mono text-stone-400/80 space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="tracking-widest">ATELIER CORE IS LIVE</span>
          </div>
          <div className="tracking-widest">
            ESTABLISHED IN DEEP SOLITUDE
          </div>
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 bg-stone-950 px-6 md:px-12 flex flex-col items-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl w-full"
        >
          {/* Section Indicator */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80 uppercase">01 / BRAND ETHOS</span>
            <h3 className="text-2xl md:text-4xl text-white font-sans font-light mt-3 tracking-tight">Architectural Purity & Seclusion</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <motion.div variants={itemVariants} className="bg-stone-900/40 p-8 border border-stone-900 rounded-sm">
              <div className="h-10 w-10 flex items-center justify-center bg-stone-950 rounded-sm mb-6 border border-stone-800/80">
                <Moon className="w-5 h-5 text-amber-500/80" />
              </div>
              <h4 className="text-lg font-sans font-normal text-stone-200 mb-3">Absolute Solitude</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Our sanctuaries are geographically secluded by natural fortifications—situated in volcanic rifts, private canyons, and sovereign lagoons. Completely immune to standard flyover pathways and orbital observation.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-stone-900/40 p-8 border border-stone-900 rounded-sm">
              <div className="h-10 w-10 flex items-center justify-center bg-stone-950 rounded-sm mb-6 border border-stone-800/80">
                <Compass className="w-5 h-5 text-amber-500/80" />
              </div>
              <h4 className="text-lg font-sans font-normal text-stone-200 mb-3">Brutalist Geometry</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Constructed from regional, raw elements—charred timber, structural volcanic basalt, copper plating, and native clay composites. Every shelter is custom-cut into the topography, fading completely into the environment.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-stone-900/40 p-8 border border-stone-900 rounded-sm">
              <div className="h-10 w-10 flex items-center justify-center bg-stone-950 rounded-sm mb-6 border border-stone-800/80">
                <Shield className="w-5 h-5 text-amber-500/80" />
              </div>
              <h4 className="text-lg font-sans font-normal text-stone-200 mb-3">Encrypted Operations</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                From satellite-encrypted mail logs to deep subterranean helipads and biometric entry grids, your transit and residence are fully insulated. The registry of Noir Reserve owners is entirely unwritten.
              </p>
            </motion.div>
          </div>

          {/* Visual Showcase Call */}
          <motion.div 
            variants={itemVariants} 
            className="relative w-full h-[400px] overflow-hidden rounded-sm border border-stone-900 flex items-center justify-center p-8 group cursor-pointer"
            onClick={() => onExplore('sanctuaries')}
          >
            <img 
              src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200" 
              alt="Iceland Cold Seclusion" 
              className="absolute inset-0 w-full h-full object-cover brightness-[0.25] group-hover:scale-102 transition-transform duration-700 filter grayscale"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply" />
            <div className="relative z-10 text-center max-w-xl">
              <span className="text-xs font-mono tracking-widest text-amber-500">FEATURED COLLECT</span>
              <h4 className="text-2xl md:text-3xl font-light text-stone-200 mt-2 tracking-tight">Icelandic Obsidian Thermal Crypts</h4>
              <p className="text-stone-400 font-light text-sm mt-3 leading-relaxed">
                Venture into the outer crags. High geothermal temperatures meets pure sub-zero arctic currents. Retractable dome shelters for observing solar flares.
              </p>
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-amber-500 mt-6 tracking-widest uppercase hover:text-amber-400">
                <span>View Estate Profile</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Experiences highlight */}
      <section className="py-24 bg-stone-900/30 border-t border-b border-stone-900 px-6 md:px-12 flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[10px] font-mono tracking-[0.4em] text-amber-500/80">02 / EMBEDDED REALITY</span>
              <h3 className="text-2xl md:text-3xl font-sans font-light text-white mt-1 tracking-tight">Extending Beyond Ordinary</h3>
            </div>
            <button 
              onClick={() => onExplore('experiences')}
              className="text-amber-500 hover:text-amber-400 font-mono text-xs tracking-widest mt-4 md:mt-0 flex items-center group"
            >
              EXPLORE ALL SERVICES
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col md:flex-row bg-stone-950/40 rounded-sm border border-stone-900 overflow-hidden">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                  alt="Alchemist cuisine" 
                  className="w-full h-full object-cover brightness-[0.6] filter grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-500/60 uppercase">DAILY RECOVERY</span>
                  <h4 className="text-lg font-sans font-normal text-stone-200 mt-1 mb-3">Michelin Foraged Alchemy</h4>
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    Personal alchemist chefs build botanical nutrient flows custom-forged for your DNA signature. Organic volcanic soil vegetation and freshly dived sea kelp.
                  </p>
                </div>
                <button onClick={() => onExplore('experiences')} className="text-stone-400 text-xs font-mono font-semibold tracking-widest uppercase hover:text-amber-500 mt-6 self-start flex items-center">
                  CONFIGURE PLAN <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row bg-stone-950/40 rounded-sm border border-stone-900 overflow-hidden">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800" 
                  alt="Deep Sea Submersible" 
                  className="w-full h-full object-cover brightness-[0.6] filter grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-500/60 uppercase">DEEP HYDRO VOYAGE</span>
                  <h4 className="text-lg font-sans font-normal text-stone-200 mt-1 mb-3">Subaquatic Excavation</h4>
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    Submerge into untracked deep-sea calderas in complete silence inside custom pressurized submersibles. Discover underwater bioluminescence.
                  </p>
                </div>
                <button onClick={() => onExplore('experiences')} className="text-stone-400 text-xs font-mono font-semibold tracking-widest uppercase hover:text-amber-500 mt-6 self-start flex items-center">
                  CONFIGURE PLAN <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer block */}
      <footer className="mt-auto bg-stone-950 border-t border-stone-900 pt-16 pb-32 px-6 md:px-12 text-stone-400 text-xs font-mono tracking-widest flex flex-col items-center">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-stone-900 pb-16">
          <div className="md:col-span-1">
            <span className="text-sm font-semibold tracking-[0.2em] text-stone-200">NOIR RESERVE</span>
            <p className="text-[10px] font-light font-mono text-stone-500 mt-3 leading-relaxed normal-case">
              The world's most inaccessible clifftops, deep jungles, private lagoons, and deep ocean vessels. Established in deep confidentiality.
            </p>
          </div>
          <div>
            <span className="text-[10px] text-stone-200 tracking-[0.22em] uppercase">REGISTRY</span>
            <ul className="mt-4 space-y-2 text-[11px] font-light">
              <li><button onClick={() => onExplore('sanctuaries')} className="hover:text-amber-500 text-left">Santorini Monolith</button></li>
              <li><button onClick={() => onExplore('sanctuaries')} className="hover:text-amber-500 text-left">Iceland Ridge</button></li>
              <li><button onClick={() => onExplore('sanctuaries')} className="hover:text-amber-500 text-left">Bali Jungle Gorge</button></li>
              <li><button onClick={() => onExplore('sanctuaries')} className="hover:text-amber-500 text-left">Namib Sand Dunes</button></li>
            </ul>
          </div>
          <div>
            <span className="text-[10px] text-stone-200 tracking-[0.22em] uppercase">VESSELS</span>
            <ul className="mt-4 space-y-2 text-[11px] font-light">
              <li><button onClick={() => onExplore('yacht_club')} className="hover:text-amber-500 text-left">S/Y Vela Noir</button></li>
              <li><button onClick={() => onExplore('yacht_club')} className="hover:text-amber-500 text-left">M/Y Apex Explorer</button></li>
            </ul>
          </div>
          <div>
            <span className="text-[10px] text-stone-200 tracking-[0.22em] uppercase">DISCRETION SECURED</span>
            <p className="text-[10px] font-light leading-relaxed text-stone-500 mt-4 normal-case">
              Noir Reserve does not track user sessions, cookies, or telemetry outside encrypted local profiles. All reservations undergo vetting by our Global Artisan Board.
            </p>
          </div>
        </div>
        
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between text-[10px] text-stone-600">
          <div>© {new Date().getFullYear()} NOIR RESERVE LTD. REGISTRY SECURED.</div>
          <div className="mt-4 md:mt-0 space-x-4">
            <span className="hover:text-amber-500/80 cursor-pointer">ENCRYPTED MEMORANDUM</span>
            <span>•</span>
            <span className="hover:text-amber-500/80 cursor-pointer">ARTISANS DIRECT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
