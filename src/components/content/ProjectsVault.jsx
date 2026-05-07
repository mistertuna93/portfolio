import React, { useState } from 'react'

const journeyLogs = [
   {
      id: "LOG_01",
      era: "The Spark",
      title: "2D Animation & Graphic Design",
      category: "CREATIVE_ROOTS",
      description: "My entry into technology began through motion and visual storytelling. Mastering the fundamentals of 2D animation established a creative foundation that still influences my approach to UI/UX and complex system visualization.",
      milestones: ["Middle School Animation Course", "Graphic Design Fundamentals", "Visual Composition"],
      tech: ["Vector Tools", "Motion Suites", "Design Theory"],
      color: "from-purple-500 to-pink-500",
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
      color: "from-blue-500 to-cyan-500",
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
      color: "from-amber-400 to-orange-500",
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
      color: "from-red-500 to-orange-600",
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
      color: "from-emerald-400 to-teal-500",
      cite: "FUTURE_REF: NEXUS_01"
   }
];

const categories = ["FULL_CHRONICLE", ...new Set(journeyLogs.map(log => log.category))];

export const ProjectsVault = () => {
   const [activeCategory, setActiveCategory] = useState("FULL_CHRONICLE");

   const filteredLogs = activeCategory === "FULL_CHRONICLE"
      ? journeyLogs
      : journeyLogs.filter(log => log.category === activeCategory);

   return (
      <div className="flex flex-col h-full text-white">
         {/* Header Section */}
         <div className="mb-10 border-b border-white/10 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
               <div>
                  <h1 className="text-7xl font-black uppercase tracking-tighter m-0 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
                     Chronicle
                  </h1>
                  <p className="text-lg text-emerald-400 font-mono mt-2 opacity-80 tracking-widest uppercase italic">
                     {activeCategory === "FULL_CHRONICLE" ? "STORY_SEQUENCE_INITIALIZED" : `FILTERING_BY_${activeCategory}`}
                  </p>
               </div>

               <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                     <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat
                              ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                              : 'bg-white/5 text-emerald-400/60 border-white/10 hover:border-emerald-500/50 hover:text-emerald-400'
                           }`}
                     >
                        {cat.replace('_', ' ')}
                     </button>
                  ))}
               </div>
            </div>
         </div>

         {/* Story Timeline Grid */}
         <div className="grid grid-cols-1 gap-12 h-full content-start overflow-y-auto no-scrollbar pb-20 pr-4">
            {filteredLogs.map((log, index) => (
               <div key={log.id} className="relative flex flex-col md:flex-row gap-8 group animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {/* Timeline Connector */}
                  {index !== filteredLogs.length - 1 && activeCategory === "FULL_CHRONICLE" && (
                     <div className="hidden md:block absolute left-[1.65rem] top-12 bottom-[-3rem] w-[1px] bg-gradient-to-b from-emerald-500/50 to-transparent"></div>
                  )}

                  {/* Marker */}
                  <div className="relative z-10 flex-shrink-0">
                     <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors duration-500">
                        <span className="text-xs font-mono text-emerald-400 font-bold">{log.id.split('_')[1]}</span>
                     </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-grow p-8 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden group-hover:border-white/20 transition-all duration-500">
                     <div className={`absolute inset-0 bg-gradient-to-br ${log.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                     <div className="relative z-10">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest">{log.era}</span>
                           <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">[{log.cite}]</span>
                        </div>

                        <h3 className="text-4xl font-black mb-4 uppercase tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
                           {log.title}
                        </h3>

                        <p className="text-slate-400 font-mono text-sm leading-relaxed max-w-3xl mb-8 italic">
                           "{log.description}"
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                           <div>
                              <h4 className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest mb-3">Evolution_Path</h4>
                              <ul className="space-y-2">
                                 {log.milestones.map(m => (
                                    <li key={m} className="text-xs text-white/70 flex items-center gap-2">
                                       <span className="w-1 h-1 bg-emerald-500 rounded-full"></span> {m}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div>
                              <h4 className="text-[10px] font-mono text-emerald-500/50 uppercase tracking-widest mb-3">Arsenal_Used</h4>
                              <div className="flex flex-wrap gap-2">
                                 {log.tech.map(t => (
                                    <span key={t} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded border border-white/5 text-emerald-200/60">
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
   )
}