// src/components/content/ContactTerminal.jsx
import React, { useState } from 'react'
import gangstuna from '../../assets/gangstuna.png'

export const ContactTerminal = () => {
   const [status, setStatus] = useState('idle')
   const [formData, setFormData] = useState({
      name: '', email: '', message: '', isClient: false, projectType: 'Web App Development'
   })

   const handleChange = (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setFormData({ ...formData, [e.target.name]: value })
   }

   const handleSubmit = async (e) => {
      e.preventDefault(); // Prevents page reload/closing
      setStatus('loading');

      try {
         const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
         });

         if (response.ok) {
            setStatus('success');
            setFormData({ name: '', email: '', message: '', isClient: false, projectType: 'Web App Development' });
         } else {
            setStatus('error');
         }
      } catch (error) {
         setStatus('error');
      }
   }

   return (
      <div className="w-full h-full flex items-center justify-center p-4 font-mono">
         <div className="w-full max-w-[850px] flex flex-col md:flex-row gap-6 bg-black/80 border border-red-500/30 rounded-[2rem] p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

            {/* Left Side: Profile */}
            <div className="flex flex-col items-center w-full md:w-1/3">
               <img src={gangstuna} alt="Profile" className="w-24 h-24 rounded-full border-2 border-red-500/50 p-2 mb-4" />
               <h2 className="text-white font-black uppercase tracking-tighter">Mister<span className="text-red-500">Tuna</span></h2>
               <div className="w-full h-px bg-red-500/20 my-4" />
               <p className="text-red-400/70 text-[10px] uppercase text-center">System Architect</p>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1">
               {status === 'success' ? (
                  <div className="text-center py-10">
                     <h3 className="text-red-500 font-bold uppercase tracking-widest">Transmission Successful</h3>
                     <button onClick={() => setStatus('idle')} className="text-white text-[10px] mt-4 uppercase underline">New Message</button>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                     <div className="flex gap-4">
                        <input name="name" required placeholder="Name" value={formData.name} onChange={handleChange} className="w-1/2 bg-red-950/20 border border-red-900/50 rounded-xl p-3 text-white text-xs outline-none focus:border-red-500" />
                        <input name="email" type="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="w-1/2 bg-red-950/20 border border-red-900/50 rounded-xl p-3 text-white text-xs outline-none focus:border-red-500" />
                     </div>
                     <div className="flex items-center gap-3 bg-red-950/10 p-3 rounded-xl">
                        <input type="checkbox" name="isClient" checked={formData.isClient} onChange={handleChange} className="accent-red-500" />
                        <span className="text-[10px] text-white uppercase font-bold">Prospective Client?</span>
                        {formData.isClient && (
                           <select name="projectType" value={formData.projectType} onChange={handleChange} className="ml-auto bg-black text-white text-[10px] p-1 border border-red-900 rounded">
                              <option>Web App Development</option>
                              <option>Custom Software</option>
                              <option>Consulting</option>
                           </select>
                        )}
                     </div>
                     <textarea name="message" required placeholder="Message..." value={formData.message} onChange={handleChange} className="w-full h-32 bg-red-950/20 border border-red-900/50 rounded-xl p-3 text-white text-xs outline-none focus:border-red-500 resize-none" />
                     <button type="submit" disabled={status === 'loading'} className="bg-red-600 hover:bg-red-500 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest transition-all">
                        {status === 'loading' ? 'Transmitting...' : 'Transmit Message'}
                     </button>
                  </form>
               )}
            </div>
         </div>
      </div>
   )
}