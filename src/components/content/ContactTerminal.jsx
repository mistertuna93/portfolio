// src/components/content/ContactTerminal.jsx

import React, { useState } from 'react'
import gangstuna from '../../assets/gangstuna.png'

export const ContactTerminal = () => {
   const [status, setStatus] = useState('idle') // idle, loading, success, error
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      isClient: false,
      projectType: 'Web App Development'
   })

   const links = [
      { name: 'GitHub Repositories', url: 'https://github.com/mistertuna93' },
      { name: 'LinkedIn Network', url: 'https://linkedin.com/' },
      { name: 'Download Resume', url: '/resume.pdf' }
   ]

   const handleChange = (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setFormData({ ...formData, [e.target.name]: value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setStatus('loading')

      try {
         // Point this to your Oracle Server IP / Domain
         // e.g., 'https://api.yourdomain.com/contact' or 'http://YOUR_ORACLE_IP:3001/api/contact'
         const response = await fetch('http://localhost:3001/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
         })

         if (response.ok) {
            setStatus('success')
            setFormData({ name: '', email: '', message: '', isClient: false, projectType: 'Web App Development' })
         } else {
            setStatus('error')
         }
      } catch (error) {
         console.error(error)
         setStatus('error')
      }
   }

   return (
      <div className="w-full h-full flex items-center justify-center p-4 animate-in fade-in duration-1000 font-mono">
         <div className="w-full max-w-[850px] flex flex-col md:flex-row gap-4 md:gap-6">

            {/* --- LEFT PANE: Profile & Links --- */}
            <div className="w-full md:w-[40%] bg-black/80 border border-red-500/30 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center relative overflow-hidden shrink-0">
               <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

               <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="w-24 h-24 rounded-full border-2 border-red-500/50 overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.3)] bg-black/50 mb-4 p-2">
                     <img src={gangstuna} alt="Profile" className="w-full h-full object-contain drop-shadow-md" />
                  </div>

                  <h1 className="text-xl font-black text-white tracking-widest uppercase m-0 text-center">Mister<span className="text-red-500">Tuna</span></h1>
                  <p className="text-red-400/70 text-[10px] tracking-[0.2em] uppercase mt-1 text-center">System Architect</p>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent my-6"></div>

                  <div className="flex flex-col gap-3 w-full">
                     {links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="w-full bg-red-950/40 hover:bg-red-600/80 border border-red-900/50 hover:border-red-500 text-white font-bold py-3 rounded-xl text-center text-[10px] md:text-[11px] uppercase tracking-widest transition-all shadow-lg hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer">
                           {link.name}
                        </a>
                     ))}
                  </div>
               </div>
            </div>

            {/* --- RIGHT PANE: Contact Form --- */}
            <div className="w-full md:w-[60%] bg-black/80 border border-red-500/30 rounded-[2rem] p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

               <div className="relative z-10 flex flex-col h-full">
                  <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wider mb-6">
                     Initialize <span className="text-red-500">Contact</span>
                  </h2>

                  {status === 'success' ? (
                     <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center text-red-500 mb-4 shadow-[0_0_30px_rgba(239,68,68,0.4)]">✓</div>
                        <h3 className="text-white font-bold uppercase tracking-widest mb-2">Transmission Sent</h3>
                        <p className="text-red-400/70 text-xs">I have received your data payload and will respond shortly.</p>
                        <button onClick={() => setStatus('idle')} className="mt-6 text-[10px] text-red-400 uppercase tracking-widest hover:text-white transition-colors cursor-pointer">[ Send Another ]</button>
                     </div>
                  ) : (
                     <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">

                        <div className="flex flex-col sm:flex-row gap-4">
                           <div className="flex flex-col gap-1.5 flex-1">
                              <label className="text-[9px] uppercase font-black tracking-widest text-red-400/80 ml-1">Your Name</label>
                              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Jane Doe" className="w-full bg-red-950/20 border border-red-900/50 rounded-xl px-4 py-3 text-sm text-white placeholder-red-900/50 focus:outline-none focus:border-red-500 focus:bg-red-900/20 transition-all font-bold" />
                           </div>
                           <div className="flex flex-col gap-1.5 flex-1">
                              <label className="text-[9px] uppercase font-black tracking-widest text-red-400/80 ml-1">Email Address</label>
                              <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jane@example.com" className="w-full bg-red-950/20 border border-red-900/50 rounded-xl px-4 py-3 text-sm text-white placeholder-red-900/50 focus:outline-none focus:border-red-500 focus:bg-red-900/20 transition-all font-bold" />
                           </div>
                        </div>

                        {/* Dynamic Client / Project Selection */}
                        <div className="flex flex-col sm:flex-row gap-4 bg-red-950/10 border border-red-900/30 p-3 rounded-xl items-center">
                           <div className="flex items-center gap-3 w-full sm:w-auto">
                              <label className="relative inline-flex items-center cursor-pointer">
                                 <input type="checkbox" name="isClient" checked={formData.isClient} onChange={handleChange} className="sr-only peer" />
                                 <div className="w-9 h-5 bg-black/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600 border border-red-900/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"></div>
                              </label>
                              <span className="text-[10px] uppercase font-bold tracking-widest text-white">Prospective Client?</span>
                           </div>

                           {formData.isClient && (
                              <div className="w-full sm:flex-1 animate-in slide-in-from-left-2 fade-in duration-300">
                                 <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-black/40 border border-red-900/50 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500 transition-all font-bold cursor-pointer appearance-none">
                                    <option value="Web App Development">Web App Development</option>
                                    <option value="Custom Software">Custom Software Build</option>
                                    <option value="Technical Consulting">Technical Consulting</option>
                                    <option value="Other">Other / Not Sure</option>
                                 </select>
                              </div>
                           )}
                        </div>

                        <div className="flex flex-col gap-1.5 flex-1 min-h-[100px]">
                           <label className="text-[9px] uppercase font-black tracking-widest text-red-400/80 ml-1">Transmission Data</label>
                           <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="How can we collaborate?" className="w-full h-full bg-red-950/20 border border-red-900/50 rounded-xl px-4 py-3 text-sm text-white placeholder-red-900/50 focus:outline-none focus:border-red-500 focus:bg-red-900/20 transition-all resize-none custom-scrollbar font-bold"></textarea>
                        </div>

                        <button type="submit" disabled={status === 'loading'} className={`w-full mt-2 bg-red-600/80 hover:bg-red-500 border border-red-500 text-white font-black py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] cursor-pointer active:scale-[0.98] ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                           {status === 'loading' ? 'Transmitting...' : 'Transmit Message'}
                        </button>
                     </form>
                  )}
               </div>
            </div>

         </div>
      </div>
   )
}