// src/components/ui/ActivePageOverlay.jsx

import React, { useEffect } from 'react'
import { usePortfolioStore } from '../../store/usePortfolioStore'

// Import all content views
import { HomePage } from '../content/HomePage'
import { BioCard } from '../content/BioCard'
import { ProjectsVault } from '../content/ProjectsVault'
import { RoadmapTracker } from '../content/RoadmapTracker'
import { NetworkLinks } from '../content/ArsenalStack'
import { ContactTerminal } from '../content/ContactTerminal'
import { Construct } from '../content/Construct'

// Map activePageId to the corresponding component
const contentMap = {
  home: <HomePage />,
  bio: <BioCard />,
  projects: <ProjectsVault />,
  roadmap: <RoadmapTracker />,
  network: <NetworkLinks />,
  contact: <ContactTerminal />,
  construction: <Construct />
}

const CONTACT_MESSAGES = [
  "Looking to work with us?",
  "Initiate transmission?",
  "Need a system built?",
  "Ready to upgrade?",
  "Seeking engineering expertise?",
  "Deploy new architecture?",
]

export const ActivePageOverlay = () => {
  const [bottomHovered, setBottomHovered] = React.useState(false)
  const [contactMessage, setContactMessage] = React.useState(CONTACT_MESSAGES[0])

  const view = usePortfolioStore((state) => state.view)
  const activePageId = usePortfolioStore((state) => state.activePageId)
  const resetView = usePortfolioStore((state) => state.resetView)
  const triggerZoom = usePortfolioStore((state) => state.triggerZoom)

  // Bring in our newly added global setting state
  const isSettingsOpen = usePortfolioStore((state) => state.isSettingsOpen)

  // Feature flag to lock the app in Construction mode
  const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true'

  // Determine which page to show
  const effectivePageId = isUnderConstruction ? 'construction' : activePageId

  // Determine if the full overlay container (blur included) is active
  const isActive = isUnderConstruction || (view === 'ZOOMED' && activePageId !== null)

  // Determine if the interior UI content should be visible
  const showContent = !(isUnderConstruction && isSettingsOpen)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isUnderConstruction && isActive) {
        resetView()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isUnderConstruction, isActive, resetView])

  useEffect(() => {
    if (isActive) {
      setContactMessage(CONTACT_MESSAGES[Math.floor(Math.random() * CONTACT_MESSAGES.length)])
    }
  }, [isActive])

  return (
    <div
      className={`fixed inset-0 z-[100] flex justify-center items-center transition-all duration-[1200ms] ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      {/* Background Blur Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={!isUnderConstruction ? resetView : undefined}
        style={{ cursor: !isUnderConstruction ? 'pointer' : 'default' }}
      />

      {/* Close Button - Responsive Positioning */}
      {!isUnderConstruction && (
        <button
          onClick={resetView}
          className="fixed top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-black/40 hover:bg-blue-600 border border-white/10 hover:border-blue-400 backdrop-blur-md rounded-lg text-gray-300 hover:text-white transition-all duration-300 shadow-2xl z-[102] cursor-pointer group"
        >
          <span className="text-[9px] uppercase tracking-widest font-black mt-[1px]">
            Close
          </span>
          <span className="hidden md:inline-block text-[8px] bg-white/10 group-hover:bg-black/20 border border-white/5 px-1.5 py-0.5 rounded text-white/50 group-hover:text-white transition-colors font-bold tracking-wider">
            ESC
          </span>
        </button>
      )}

      {/* Responsive Overlay Canvas */}
      <div className={`w-[95vw] h-[92vh] max-w-7xl relative transition-all duration-700 flex flex-col gap-3 md:gap-4 p-2 md:p-4 ${showContent ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}>
        
        {/* GLOBAL TOP TITLE BAR */}
        <div className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-2 md:py-3 backdrop-blur-sm shadow-xl flex items-center justify-center shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.012)_2px,rgba(255,255,255,0.012)_4px)] pointer-events-none" />
          <div className="flex flex-col items-center relative z-10">
            <h1 style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em' }} className="text-xl md:text-2xl font-extrabold text-white leading-none">
              mister<span className="text-blue-400">tuna</span><span className="font-light text-white/25" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7em' }}>.dev</span>
            </h1>
          </div>
        </div>

        {/* INNER CONTENT AREA */}
        <div className="w-full flex-1 min-h-0 overflow-hidden relative rounded-[1.5rem] md:rounded-[2.5rem]">
          {contentMap[effectivePageId] || <HomePage />}
        </div>

        {/* GLOBAL BOTTOM CONTACT BAR */}
        <div
          onMouseEnter={() => setBottomHovered(true)}
          onMouseLeave={() => setBottomHovered(false)}
          onClick={() => setBottomHovered(!bottomHovered)}
          style={{
            '--h-desktop': bottomHovered ? '80px' : '28px',
            '--h-mobile': bottomHovered ? '100px' : '40px',
          }}
          className="w-full h-[var(--h-mobile)] md:h-[var(--h-desktop)] bg-gradient-to-br from-blue-600/20 via-purple-900/20 to-black/40 border border-white/15 rounded-[1.2rem] md:rounded-[1.5rem] px-4 md:px-8 shadow-2xl relative overflow-hidden flex items-center shrink-0 cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        >
          <div style={{ opacity: bottomHovered ? 0 : 1, transition: 'opacity 0.2s ease' }} className="absolute inset-0 flex items-center justify-center">
            <span className="text-[8px] md:text-[9px] uppercase text-white/50 md:text-white/30 tracking-[0.25em] font-black">{contactMessage}</span>
          </div>

          <div style={{ opacity: bottomHovered ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }} className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full relative z-10 gap-2 md:gap-0 mt-1 md:mt-0" onClick={(e) => e.stopPropagation()}>
            <div className="text-center md:text-left">
              <h2 className="text-xs md:text-sm font-black text-white leading-none">Ready to start?</h2>
              <p className="text-[8px] md:text-[9px] text-blue-300/70 mt-1 uppercase tracking-tight hidden md:block">Inquire about architecture or engineering</p>
            </div>
            <button onClick={() => triggerZoom('contact')} className="px-5 py-1.5 bg-white text-black font-black rounded-lg uppercase text-[9px] shadow-lg hover:bg-blue-500 hover:text-white transition-all">Contact</button>
          </div>
        </div>
      </div>
    </div>
  )
}