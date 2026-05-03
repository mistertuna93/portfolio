// src/components/ui/ActivePageOverlay.jsx

import React, { useEffect } from 'react'
import { usePortfolioStore } from '../../store/usePortfolioStore'

// Import all content views
import { HomePage } from '../content/HomePage'
import { BioCard } from '../content/BioCard'
import { ProjectsVault } from '../content/ProjectsVault'
import { RoadmapTracker } from '../content/RoadmapTracker'
import { ArsenalStack } from '../content/ArsenalStack'
import { ContactTerminal } from '../content/ContactTerminal'
import { Construct } from '../content/Construct'

// Map activePageId to the corresponding component
const contentMap = {
  home: <HomePage />,
  bio: <BioCard />,
  projects: <ProjectsVault />,
  roadmap: <RoadmapTracker />,
  arsenal: <ArsenalStack />,
  contact: <ContactTerminal />,
  construction: <Construct />
}

export const ActivePageOverlay = () => {
  const view = usePortfolioStore((state) => state.view)
  const activePageId = usePortfolioStore((state) => state.activePageId)
  const resetView = usePortfolioStore((state) => state.resetView)

  // Feature flag to lock the app in Construction mode
  const isUnderConstruction = import.meta.env.VITE_UNDER_CONSTRUCTION === 'true'

  // Determine which page to show
  const effectivePageId = isUnderConstruction ? 'construction' : activePageId

  // The overlay is active permanently if under construction, 
  // otherwise it is active when a page is focused and zoomed.
  const isActive = isUnderConstruction || (view === 'ZOOMED' && activePageId !== null)

  // Allow closing the overlay via the ESC key when normal site is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isUnderConstruction && isActive) {
        resetView()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isUnderConstruction, isActive, resetView])

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

      {/* Close Button - Now FIXED and visually styled to match the site's UI */}
      {!isUnderConstruction && (
        <button
          onClick={resetView}
          className="fixed top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-blue-600 border border-white/10 hover:border-blue-400 backdrop-blur-md rounded-lg text-gray-300 hover:text-white transition-all duration-300 shadow-2xl z-[102] cursor-pointer group"
        >
          <span className="text-[9px] uppercase tracking-widest font-black mt-[1px]">
            Close
          </span>
          <span className="text-[8px] bg-white/10 group-hover:bg-black/20 border border-white/5 px-1.5 py-0.5 rounded text-white/50 group-hover:text-white transition-colors font-bold tracking-wider">
            ESC
          </span>
        </button>
      )}
      <div className="w-[90vw] h-[85vh] max-w-[1800px] relative pointer-events-auto scale-100">
        {/* Dynamic Content Renderer */}
        <div className="w-full h-full overflow-hidden relative">
          {contentMap[effectivePageId] || <HomePage />}
        </div>
      </div>
    </div>
  )
}