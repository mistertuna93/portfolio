import React, { useState } from 'react'
import gangstunaImg from '../../assets/gangstuna.png'

const journeyLogs = [
  {
    id: "LOG_01",
    era: "The Spark",
    title: "2D Animation & Graphic Design",
    category: "CREATIVE_ROOTS",
    description: "My entry into technology began through motion and visual storytelling. Mastering the fundamentals of 2D animation established a creative foundation that still influences my approach to UI/UX and complex system visualization.",
    milestones: ["Middle School Animation Course", "Graphic Design Fundamentals", "Visual Composition"],
    tech: ["Vector Tools", "Motion Suites", "Design Theory"],
    color: "from-blue-500 to-indigo-500",
    cite: "ORIGIN_REF: MS_ARTS"
  },
  {
    id: "LOG_02",
    era: "The Intersection",
    title: "Hardware Repair & Community Graphics",
    category: "SYSTEMS_REPAIR",
    description: "As my interest in gaming deepened, I moved from consumption to understanding the machines. I began documenting repair and modification methods, eventually providing the visual identity for a growing community of enthusiasts.",
    milestones: ["Hardware Troubleshooting", "System Modification Guides", "Identity Design"],
    tech: ["Hardware Diagnostics", "Firmware Logic", "Web Graphics"],
    color: "from-indigo-400 to-cyan-500",
    cite: "SYSTEM_LOG: HW_MOD_01"
  },
  {
    id: "LOG_03",
    era: "The Expansion",
    title: "Forum Architecture & App Development",
    category: "COMMUNITY_ENGINEERING",
    description: "The project evolved into a massive ecosystem involving a forum and YouTube channel. I specialized in jailbreaking/rooting ecosystems, developing custom applications and technical guides to democratize mobile technology access.",
    milestones: ["Community Forum Management", "Jailbreak App Development", "Technical Education"],
    tech: ["Root/Jailbreak Logic", "C-Style Languages", "Technical Documentation"],
    color: "from-cyan-400 to-blue-500",
    cite: "ARCHIVE_REF: COMMUNITY_V3"
  },
  {
    id: "LOG_04",
    era: "Physical Manifestation",
    title: "CAD, CNC & Industrial Synthesis",
    category: "PHYSICAL_ENGINEERING",
    description: "I transitioned from digital bits to physical atoms, mastering CAD software for 3D printing and CNC processes. This expanded into PCB design and manufacture, allowing me to build totally custom hardware from the silicon up.",
    milestones: ["CAD/CAM Engineering", "Custom PCB Manufacture", "Industrial Process Design"],
    tech: ["SolidWorks/Fusion360", "KiCad", "CNC/3D-Printing"],
    color: "from-blue-500 to-purple-600",
    cite: "HARDWARE_LOG: FAB_UNIT"
  },
  {
    id: "LOG_05",
    era: "The Horizon",
    title: "Open Source Motion Systems",
    category: "EMERGING_TECH",
    description: "Synthesizing a lifetime of software, community, and hardware expertise, I am now focused on democratizing high-end engineering. Current aspirations include community-led 5-axis CNC systems and DIY 6DOF motion platforms.",
    milestones: ["Open Source Project Lead", "5-Axis CNC Architecture", "6DOF Motion Research"],
    tech: ["Motion Control Logic", "Kinematic Chains", "Community Collaboration"],
    color: "from-purple-400 to-indigo-500",
    cite: "FUTURE_REF: NEXUS_01"
  }
];

const categories = ["FULL_CHRONICLE", ...new Set(journeyLogs.map(log => log.category))];

export const BioCard = () => {
  const [activeCategory, setActiveCategory] = useState("FULL_CHRONICLE");

  const filteredLogs = activeCategory === "FULL_CHRONICLE"
    ? journeyLogs
    : journeyLogs.filter(log => log.category === activeCategory);

  return (
    // Parent wrapper handles responsive overflow. Scrolls on mobile, locked on desktop.
    <div className="flex flex-col lg:flex-row h-full w-full text-white gap-8 lg:gap-10 overflow-y-auto lg:overflow-hidden no-scrollbar pb-10 lg:pb-0">

      {/* LEFT COLUMN: Identity (Fixed full visibility, strictly centered vertically and horizontally) */}
      <div className="w-full lg:w-1/3 flex flex-col items-center shrink-0 lg:h-full lg:justify-center pt-2 lg:pt-0">

        {/* Title Block (Centered, tighter margins, scaled down) */}
        <div className="text-center w-full mb-4 lg:mb-5 shrink-0">
          <h1 className="text-4xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter m-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-200 drop-shadow-lg leading-none">
            Mistertuna
          </h1>
          <h2 className="text-xs lg:text-sm xl:text-base font-mono text-blue-300 tracking-widest uppercase mt-2">Operator Level 5</h2>
        </div>

        {/* Avatar Image (Centered, significantly reduced dimensions) */}
        <div className="relative group w-36 h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 shrink-0 mb-4 lg:mb-5 mx-auto">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-[25px] opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
          <div className="w-full h-full relative z-10 rounded-full border border-white/20 bg-gradient-to-br from-blue-900/40 to-black/80 backdrop-blur-xl flex items-center justify-center overflow-hidden shadow-[inset_0_0_30px_rgba(59,130,246,0.3)]">
            <img
              src={gangstunaImg}
              alt="Mistertuna Avatar"
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

        {/* Text Block & Buttons (Centered, tighter spacing) */}
        <div className="space-y-3 lg:space-y-4 text-center w-full flex-1 flex flex-col justify-start">
          <p className="text-xs xl:text-sm text-gray-300 leading-relaxed font-light bg-black/20 p-3 lg:p-4 rounded-2xl border border-white/5 backdrop-blur-sm mx-auto max-w-sm">
            Specializing in high-performance spatial interfaces, distributed systems, and next-generation web architecture. Deploying robust physical simulations directly within the browser matrix.
          </p>
          <div className="flex flex-wrap gap-2 pt-1 justify-center">
            <button className="px-4 py-2 xl:px-5 xl:py-2.5 rounded-full bg-blue-500/20 border border-blue-400/50 hover:bg-blue-500 hover:text-white transition-all duration-300 font-bold tracking-wide shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] cursor-pointer text-[10px] xl:text-xs">
              ACCESS LOGS
            </button>
            <button className="px-4 py-2 xl:px-5 xl:py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-all font-bold tracking-wide cursor-pointer text-[10px] xl:text-xs">
              TRANSMIT PING
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The Chronicle Timeline (Scrollable) */}
      <div className="w-full lg:w-2/3 flex flex-col lg:h-full mt-6 lg:mt-0 overflow-hidden">
        <div className="mb-4 lg:mb-5 border-b border-white/10 pb-4 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter m-0 text-white/90">
                Evolution Logs
              </h2>
              <p className="text-[10px] lg:text-xs text-blue-400 font-mono mt-1 opacity-80 tracking-widest uppercase italic">
                {activeCategory === "FULL_CHRONICLE" ? "STORY_SEQUENCE_INITIALIZED" : `FILTERING_BY_${activeCategory}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat
                    ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                    : 'bg-white/5 text-blue-400/60 border-white/10 hover:border-blue-500/50 hover:text-blue-400'
                    }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated scroll area for the timeline */}
        <div className="flex-grow overflow-y-auto no-scrollbar pb-20 pr-2 lg:pr-4 space-y-5 lg:space-y-6">
          {filteredLogs.map((log) => (
            <div key={log.id} className="relative flex flex-col md:flex-row gap-4 lg:gap-5 group animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative z-10 flex-shrink-0 hidden md:block">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors duration-500">
                  <span className="text-[9px] lg:text-[10px] font-mono text-blue-400 font-bold">{log.id.split('_')[1]}</span>
                </div>
              </div>

              <div className="flex-grow p-4 lg:p-5 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${log.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] lg:text-[9px] font-mono text-blue-400/60 uppercase tracking-widest">{log.era}</span>
                    <span className="text-[7px] lg:text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">[{log.cite}]</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black mb-2 uppercase tracking-tighter text-white group-hover:text-blue-400 transition-colors">
                    {log.title}
                  </h3>
                  <p className="text-slate-400 font-mono text-[11px] lg:text-xs leading-relaxed mb-4 italic">
                    "{log.description}"
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-3">
                    <div>
                      <h4 className="text-[8px] lg:text-[9px] font-mono text-blue-500/50 uppercase tracking-widest mb-1">Evolution_Path</h4>
                      <ul className="space-y-1">
                        {log.milestones.map(m => (
                          <li key={m} className="text-[9px] lg:text-[10px] text-white/70 flex items-center gap-2">
                            <span className="w-1 h-1 bg-blue-500 rounded-full"></span> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[8px] lg:text-[9px] font-mono text-blue-500/50 uppercase tracking-widest mb-1">Arsenal_Used</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {log.tech.map(t => (
                          <span key={t} className="text-[8px] lg:text-[9px] font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-blue-200/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}