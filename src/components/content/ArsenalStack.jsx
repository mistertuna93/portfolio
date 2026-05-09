import React from 'react'
import { ExternalLink, Terminal, Briefcase, Radio, Mail, FileText } from 'lucide-react'

const links = [
  { name: 'GitHub // Source', url: 'https://github.com/mistertuna93', icon: Terminal, color: 'hover:border-white hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]' },
  { name: 'LinkedIn // Professional', url: '#', icon: Briefcase, color: 'hover:border-blue-400 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]' },
  { name: 'Encrypted Comms (Discord)', url: '#', icon: Radio, color: 'hover:border-indigo-400 hover:text-indigo-400 hover:shadow-[0_0_15px_rgba(129,140,248,0.5)]' },
  { name: 'Architecture Logs (Blog)', url: '#', icon: FileText, color: 'hover:border-emerald-400 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]' },
  { name: 'Direct Email', url: 'mailto:your@email.com', icon: Mail, color: 'hover:border-red-400 hover:text-red-400 hover:shadow-[0_0_15px_rgba(248,113,113,0.5)]' },
]

export const NetworkLinks = () => {
  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto text-white justify-center">
      <div className="mb-10 text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter m-0 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          Network
        </h1>
        <p className="text-sm text-cyan-400 font-mono mt-2 tracking-widest uppercase">EXTERNAL_UPLINKS_AVAILABLE</p>
      </div>

      <div className="flex flex-col gap-4">
        {links.map((link, i) => {
          const Icon = link.icon
          return (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 ${link.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-transparent transition-colors">
                  <Icon size={24} />
                </div>
                <span className="font-mono text-lg font-bold tracking-wider uppercase">{link.name}</span>
              </div>
              <ExternalLink size={20} className="opacity-30 group-hover:opacity-100 transition-opacity" />
            </a>
          )
        })}
      </div>
    </div>
  )
}