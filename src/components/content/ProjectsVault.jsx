import React from 'react'
import { Terminal, Database, Cpu, Activity, ExternalLink, GitBranch } from 'lucide-react'

const engineeringProjects = [
   {
      id: "PRJ_01",
      title: "Menagerie",
      type: "Federated Orchestrator",
      status: "IN_DEVELOPMENT",
      description: "A federated Kubernetes orchestrator featuring blockchain integration. Built with a custom pure-Rust TUI for cluster management and tokenomics visualization.",
      stack: ["Rust", "Kubernetes", "SurrealDB", "TUI"],
      icon: Terminal,
      color: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      headerColor: "text-emerald-400",
      link: "https://github.com/mistertuna93"
   },
   {
      id: "PRJ_02",
      title: "tarkOver",
      type: "Game Telemetry Overlay",
      status: "DEPLOYED",
      description: "A highly optimized Rust-based overlay utility for tactical extraction shooters. Parses local logs in real-time to project coordinates and tracking data directly onto a mapped UI.",
      stack: ["Rust", "Memory Mapping", "React", "Overlay UI"],
      icon: Activity,
      color: "group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
      headerColor: "text-red-400",
      link: "https://github.com/mistertuna93"
   },
   {
      id: "PRJ_03",
      title: "Ergo Architect",
      type: "Hardware & Firmware",
      status: "PROTOTYPING",
      description: "Reverse-engineering and designing custom split and Alice-style mechanical keyboards. Utilizing Ergogen for physical PCB mapping and custom QMK/Vial firmware for layered macro configurations.",
      stack: ["Ergogen", "QMK/Vial", "PCB Design", "Hardware"],
      icon: Cpu,
      color: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      headerColor: "text-blue-400",
      link: "https://github.com/mistertuna93"
   },
   {
      id: "PRJ_04",
      title: "6DoF Platform",
      type: "Physical Simulation",
      status: "R&D",
      description: "Designing a 6-Degree-of-Freedom motion platform for immersive flight and racing simulation. Modeling complex kinematic chains and belt-driven linear actuators using T-slot extrusions via Onshape.",
      stack: ["Kinematics", "Onshape", "Actuators", "ESP32"],
      icon: Database,
      color: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      headerColor: "text-purple-400",
      link: "https://github.com/mistertuna93"
   }
];

export const ProjectsVault = () => {
   return (
      <div className="flex flex-col h-full text-white">
         {/* Header Section */}
         <div className="mb-10 border-b border-white/10 pb-6 shrink-0">
            <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter m-0 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
               Architecture
            </h1>
            <p className="text-lg text-emerald-400 font-mono mt-2 opacity-80 tracking-widest uppercase flex items-center gap-3">
               <GitBranch size={18} />
               ACTIVE_DEPLOYMENTS_AND_SYSTEMS
            </p>
         </div>

         {/* Projects Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full content-start overflow-y-auto no-scrollbar pb-20 pr-4">
            {engineeringProjects.map((project) => {
               const Icon = project.icon;
               return (
                  <div
                     key={project.id}
                     className={`group flex flex-col justify-between p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md relative overflow-hidden transition-all duration-500 ${project.color}`}
                  >
                     {/* Top Section */}
                     <div className="relative z-10 mb-6">
                        <div className="flex justify-between items-start mb-4">
                           <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-black/50 transition-colors">
                              <Icon size={24} className={project.headerColor} />
                           </div>
                           <div className="flex flex-col items-end">
                              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{project.id}</span>
                              <span className="text-[9px] font-mono px-2 py-0.5 mt-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                                 {project.status}
                              </span>
                           </div>
                        </div>

                        <h3 className={`text-3xl font-black mb-1 uppercase tracking-tight ${project.headerColor}`}>
                           {project.title}
                        </h3>
                        <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4">
                           {project.type}
                        </p>

                        <p className="text-slate-300 font-light text-sm leading-relaxed h-20 overflow-hidden">
                           {project.description}
                        </p>
                     </div>

                     {/* Bottom Section */}
                     <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                           {project.stack.map(tech => (
                              <span key={tech} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded-md border border-white/5 text-white/70">
                                 {tech}
                              </span>
                           ))}
                        </div>

                        <a
                           href={project.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors shrink-0"
                        >
                           <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Inspect</span>
                           <ExternalLink size={14} />
                        </a>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}