/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Shield, HelpCircle, Mail, Globe, MapPin, Send, Loader2, ArrowRight, UserPlus, FileUp } from 'lucide-react';
import { ChatMessage } from '../types';
import { OFFICES } from '../data';

interface ConciergeAtelierProps {
  chatHistory: ChatMessage[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function ConciergeAtelier({ chatHistory, setChatHistory }: ConciergeAtelierProps) {
  // Official form state
  const [identity, setIdentity] = useState('');
  const [encryptedEmail, setEncryptedEmail] = useState('');
  const [requestNature, setRequestNature] = useState('sanctuary_vetting');
  const [descriptionText, setDescriptionText] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // File drag-and-drop simulation
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Chat conversation state
  const [userInput, setUserInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, chatLoading]);

  // Handle Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Auto-create a custom greeting inside the chat indicating reservation board notice!
    const noticeMessage: ChatMessage = {
      id: `notice-${Date.now()}`,
      sender: 'concierge',
      content: `Greetings of absolute distinction, ${identity || 'esteemed member'}. I have observed your structural inquiry regarding our "${requestNature.replace('_', ' ').toUpperCase()}" protocols. A secure courier has forwarded this dossier to our local ${OFFICES[Math.floor(Math.random() * OFFICES.length)].name} registry board. How may I further coordinate your stay parameters in real-time?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTimeout(() => {
      setChatHistory(prev => [...prev, noticeMessage]);
    }, 1500);

    setTimeout(() => {
      // Clear forms
      setIdentity('');
      setEncryptedEmail('');
      setDescriptionText('');
      setUploadedFileName(null);
      setFormSubmitted(false);
    }, 5000);
  };

  // Handle Send Chat to Server-Proxy Gemini
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setUserInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...chatHistory, userMsg]
        })
      });

      if (!response.ok) {
        throw new Error('Failure contacting London Atelier routing node.');
      }

      const data = await response.json();
      
      const conciergeMsg: ChatMessage = {
        id: `concierge-${Date.now()}`,
        sender: 'concierge',
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, conciergeMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'concierge',
        content: `My apologies. Atmospheric or tectonic interference has momentarily blocked our secure telemetric arrays to the local high-altitude terminal vaults. Rest assured, our local artisans are continuing to safeguard your requests.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Prompt suggestions
  const suggestions = [
    { text: "Bespoke Aegean Caldera schedule proposal", action: "Draft a bespoke 4-day private itinerary for The Azure Monolith in Greece focusing on subaquatic diving and molecular cuisine." },
    { text: "Enquire on Vela Noir Yacht availability", action: "I wish to query the coordinates and open dates for chartering the Vela Noir carbon cruising yacht next season." },
    { text: "Formulate metabolic diet parameters", action: "Design a high-altitude recovery nutritional program utilizing local macro-nutrient extraction." }
  ];

  const handleSuggestionClick = (act: string) => {
    setUserInput(act);
  };

  // Drag and drop actions
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  return (
    <div id="noir-concierge-atelier" className="min-h-screen bg-stone-950 py-16 px-6 md:px-12 text-stone-100 pb-32">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Left Side: Membership Form Registry */}
        <div className="w-full lg:w-[450px] bg-stone-900/10 border border-stone-900 rounded-sm p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-mono text-stone-500 tracking-widest pb-4 border-b border-stone-850 mb-6">
              <Shield className="w-4 h-4 text-amber-500/80" />
              <span>THE CONCIERGE ATELIER FILE DECK</span>
            </div>

            <h3 className="text-xl font-sans font-light tracking-tight text-white mb-2">
              Registered Dossier Requests
            </h3>
            <p className="text-stone-400 font-light text-xs leading-relaxed mb-6">
              Establish a direct record file in our global vaults. All entries are encrypted at rest and processed directly by our physical board.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  FULL IDENTITY NOMINATIVE
                </label>
                <input
                  id="atelier-fullname"
                  type="text"
                  placeholder="e.g. Christian Sterling"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  required
                  className="w-full bg-stone-950/80 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3 shadow-inner focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  ENCRYPTED MEMBER EMAIL COORDINATES
                </label>
                <input
                  id="atelier-email"
                  type="email"
                  placeholder="encrypted@domain.net"
                  value={encryptedEmail}
                  onChange={(e) => setEncryptedEmail(e.target.value)}
                  required
                  className="w-full bg-stone-950/80 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3 shadow-inner focus:border-amber-500/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  NATURE OF INTERST REQUISITION
                </label>
                <div className="space-y-2 mt-1">
                  {[
                    { value: 'sanctuary_vetting', label: 'Sanctuary Vetting Audit' },
                    { value: 'yacht_expeditions', label: 'Marine Route Charter' },
                    { value: 'custom_operations', label: 'Custom Operations Protocol' },
                    { value: 'press_liaison', label: 'Strict Confidentiality Liaison' }
                  ].map((radOption) => (
                    <label 
                      key={radOption.value} 
                      className="flex items-center space-x-3 text-xs text-stone-400 font-mono hover:text-stone-300 cursor-pointer"
                    >
                      <input
                        id={`request-nature-${radOption.value}`}
                        type="radio"
                        name="nature_of_request"
                        value={radOption.value}
                        checked={requestNature === radOption.value}
                        onChange={(e) => setRequestNature(e.target.value)}
                        className="accent-amber-500"
                      />
                      <span>{radOption.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  PARTICULAR STRUCTURAL DESIRES
                </label>
                <textarea
                  id="atelier-instructions"
                  rows={4}
                  placeholder="Elucidate on custom security requests, nutritional allergies, or geographical boundaries..."
                  value={descriptionText}
                  onChange={(e) => setDescriptionText(e.target.value)}
                  className="w-full bg-stone-950/80 border border-stone-850 rounded-sm text-xs font-mono text-stone-200 p-3 shadow-inner focus:border-amber-500/40 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              {/* Drag and Drop Upload */}
              <div>
                <label className="text-[10px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">
                  SECURE CRYPTO-CREDENTIAL DECK (Vetting PDF/Verify)
                </label>
                <div
                  id="drag-drop-vault-uploader"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    border-2 border-dashed rounded-sm p-4 text-center cursor-pointer transition-all duration-300
                    ${isDraggingFile ? 'border-amber-500 bg-stone-900/40' : 'border-stone-850 bg-stone-950/40'}
                    ${uploadedFileName ? 'border-emerald-500/50' : ''}
                  `}
                >
                  <FileUp className={`w-8 h-8 mx-auto mb-2 opacity-40 ${uploadedFileName ? 'text-emerald-500 animate-pulse' : 'text-amber-500'}`} />
                  <p className="text-[10px] font-mono text-stone-400">
                    {uploadedFileName ? `Dossier: ${uploadedFileName}` : 'Drag & Drop Vetting Dossier or Tap to select'}
                  </p>
                  <span className="text-[8px] font-mono text-stone-600 block mt-1">MAX SIZE 50MB ENCRYPTED</span>
                </div>
              </div>

              <button
                id="atelier-form-submit"
                type="submit"
                className="w-full py-4 bg-stone-950 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-white font-mono tracking-widest text-xs font-bold rounded-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4 text-amber-500" />
                <span>INITIALIZE DOSSIER REGISTRATION</span>
              </button>
            </form>
          </div>

          <AnimatePresence>
            {formSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-stone-900 border border-amber-500/30 text-amber-500 font-mono text-[10px] font-bold text-center uppercase tracking-widest rounded-sm"
              >
                REQUEST COORDINATES SUBMITTED. VETTED TO THE LIFESTYLE VAULT.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Virtual AI Concierge Chat */}
        <div className="flex-1 flex flex-col bg-stone-900/20 border border-stone-900 rounded-sm overflow-hidden h-[95vh] lg:h-[80vh] min-h-[500px]">
          {/* Workspace header */}
          <div className="p-6 border-b border-stone-900 bg-stone-950/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 bg-amber-500 text-stone-950 rounded-full border border-stone-800 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-stone-950" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-stone-900" />
              </div>
              <div>
                <h4 className="text-sm font-sans font-normal text-stone-100 flex items-center space-x-2">
                  <span>Noir Personal Concierge</span>
                </h4>
                <p className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mt-0.5">Atmospheric Link Stabilized</p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[9px] font-mono text-stone-500 block">LIFESTYLE ARCHITECT</span>
              <span className="text-[10px] font-mono text-stone-300">VIRTUAL PORTAL NODE 3.5</span>
            </div>
          </div>

          {/* Suggested Prompts Grid */}
          {chatHistory.length <= 1 && (
            <div className="p-4 border-b border-stone-900 bg-stone-950/20">
              <span className="text-[9px] font-mono text-stone-500 block mb-2 uppercase tracking-widest">SUGGESTED DISPATCH PARAMETERS</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    id={`chat-suggestion-${i}`}
                    onClick={() => handleSuggestionClick(sug.action)}
                    className="text-left p-3 bg-stone-950 border border-stone-850 rounded-sm hover:border-amber-500/30 text-stone-400 hover:text-stone-200 text-[10px] font-mono transition-colors"
                  >
                    <span className="text-amber-500 block mb-1 uppercase font-bold">Suggested Spec</span>
                    {sug.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages list */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-stone-950/10 scrollbar-none">
            {chatHistory.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div 
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[75%] rounded-sm p-4 text-xs leading-relaxed ${
                    isUser 
                      ? 'bg-amber-500 text-stone-950 font-normal font-sans shadow-md' 
                      : 'bg-stone-900/60 text-stone-200 border border-stone-850 font-light font-sans'
                  }`}>
                    {msg.content}
                    <div className={`text-[8px] mt-2 text-right font-mono ${isUser ? 'text-stone-800' : 'text-stone-500'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-900/40 text-stone-400 border border-stone-900 rounded-sm p-4 text-xs font-mono flex items-center space-x-3">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  <span>Concierge is drafting custom stay metrics...</span>
                </div>
              </div>
            )}
            
            <div ref={chatBottomRef} />
          </div>

          {/* Conversation Input area */}
          <div className="p-4 border-t border-stone-900 bg-stone-950/40">
            <form onSubmit={handleSendChatMessage} className="flex items-center space-x-2">
              <input
                id="concierge-chat-input"
                type="text"
                placeholder="Orchestrate your retreat desires..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={chatLoading}
                className="flex-1 bg-stone-900 border border-stone-850 hover:border-stone-800 rounded-sm text-xs font-mono text-stone-200 p-3.5 focus:border-amber-500/40 focus:outline-none"
              />
              <button
                id="concierge-chat-send"
                type="submit"
                disabled={chatLoading}
                className="h-11 w-11 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-sm flex items-center justify-center transition-colors shadow-md shrink-0"
              >
                <Send className="w-4 h-4 text-stone-950" />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Offices list and physical coordination */}
      <div className="max-w-7xl mx-auto mt-16 border-t border-stone-900 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono">
          {OFFICES.map((off, idx) => (
            <div key={idx} className="p-6 bg-stone-900/10 border border-stone-900/60 rounded-sm flex items-start space-x-3">
              <MapPin className="w-4.5 h-4.5 text-amber-500/80 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-200 font-bold block pb-1 uppercase">{off.name}</span>
                <span className="text-stone-500 block uppercase italic">{off.area}</span>
                <span className="text-stone-400 block mt-2">{off.contact}</span>
                <span className="text-stone-500 block text-[10px] uppercase mt-1">Operational Hours: {off.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
