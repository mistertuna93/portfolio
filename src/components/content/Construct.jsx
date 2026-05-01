import React, { useState, useEffect } from 'react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import constructionImg from '../../assets/constuna.png'

const injectFonts = () => {
    if (document.getElementById('mt-fonts')) return
    const link = document.createElement('link')
    link.id = 'mt-fonts'
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=DM+Mono:wght@300;400;500&display=swap'
    document.head.appendChild(link)
}

export const Construct = () => {
    useEffect(() => { injectFonts() }, [])

    const triggerZoom = usePortfolioStore(state => state.triggerZoom)
    const [bottomHovered, setBottomHovered] = useState(false)
    const [textHovered, setTextHovered] = useState(false)

    // Baseline width constraint applied to all three architectural wrappers
    const constraintStyles = { maxWidth: 'calc(100vh - 200px + 320px)' }

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full h-full items-center justify-center animate-in fade-in duration-1000 p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* Inject Custom Animation for the Marquee */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>

            {/* TOP TITLE BAR WRAPPER */}
            <div style={constraintStyles} className="w-full flex items-center justify-center shrink-0 z-20">
                <div className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-2 md:py-3 backdrop-blur-sm shadow-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.012)_2px,rgba(255,255,255,0.012)_4px)] pointer-events-none" />
                    <div className="flex flex-col items-center relative z-10">
                        <h1 style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em' }} className="text-xl md:text-2xl font-extrabold text-white leading-none">
                            mister<span className="text-blue-400">tuna</span><span className="font-light text-white/25" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7em' }}>.dev</span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* MIDDLE SECTION WRAPPER */}
            <div
                style={constraintStyles}
                className={`flex-1 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center w-full min-h-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-10 ${bottomHovered ? 'scale-95 opacity-50 blur-[1px]' : 'scale-100 opacity-100 blur-0'
                    }`}
            >
                {/* 1. Image Responsive Container */}
                <div
                    className={`flex justify-center md:justify-end w-full h-full max-h-[450px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${textHovered ? 'md:w-2/5' : 'md:w-3/5'
                        }`}
                >
                    <div className="w-full h-full bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shrink-0 relative flex items-center justify-center p-4">
                        <img
                            src={constructionImg}
                            alt="Construction"
                            className="w-full h-full object-contain opacity-90 transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </div>

                {/* 2. Text Responsive Container */}
                <div
                    onMouseEnter={() => setTextHovered(true)}
                    onMouseLeave={() => setTextHovered(false)}
                    className={`flex flex-col justify-center w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default ${textHovered ? 'md:w-3/5' : 'md:w-2/5'
                        }`}
                >
                    <div className="flex flex-col items-center text-center w-full max-w-lg transition-all duration-700 mx-auto">

                        {/* Subsection A: Title & Status - Horizontal Line */}
                        <div className="flex flex-row items-end justify-between border-b border-white/5 pb-2 w-full">
                            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className={`font-black text-white uppercase leading-none mb-[2px] transition-all duration-700 ${textHovered ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                                }`}>
                                Under
                            </h2>

                            <div className="flex flex-col items-center justify-center flex-1 transition-all duration-700 px-2">
                                <div className={`text-blue-400 font-mono uppercase whitespace-nowrap transition-all duration-700 ${textHovered ? 'text-[7px] md:text-[8px] tracking-[0.1em]' : 'text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em]'
                                    }`}>
                                    Status: System Optimization
                                </div>
                                <div className={`text-red-500 font-mono uppercase animate-pulse whitespace-nowrap transition-all duration-700 mt-1 ${textHovered ? 'text-[7px] md:text-[8px] tracking-[0.1em]' : 'text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em]'
                                    }`}>
                                    deploy_init_v0.1.0
                                </div>
                            </div>
                        </div>

                        {/* Subsection B: Primary Header */}
                        <h2 style={{ fontFamily: "'Syne', sans-serif" }} className={`font-black uppercase leading-none text-blue-400 w-full text-left transition-all duration-700 ${textHovered ? 'text-xl md:text-2xl mb-2 mt-1' : 'text-2xl md:text-3xl mb-4 mt-2'
                            }`}>
                            Construction
                        </h2>

                        {/* Subsection C: Actual Content - Centered */}
                        <div className="relative w-full flex flex-col items-center text-center">

                            <p className={`text-gray-300 font-light leading-relaxed transition-all duration-700 w-full ${textHovered ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'
                                }`}>
                                The hexagonal grid is currently being recalibrated.
                            </p>

                            {/* Hidden detail string and secondary paragraph */}
                            <div
                                className={`overflow-hidden transition-all w-full duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center ${textHovered ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                                    }`}
                            >
                                <p className="text-[10px] md:text-xs text-gray-300 font-light leading-relaxed mb-2 transition-all duration-700 w-full">
                                    High-performance digital environments and portfolio content will be accessible here shortly.
                                </p>

                                {/* Scrolling Marquee Row */}
                                <div className="w-full overflow-hidden border-t border-b border-red-500/30 py-1.5 relative flex">
                                    <div className="flex w-max animate-marquee">
                                        <span className="text-[9px] md:text-[10px] text-red-500 font-mono tracking-wide px-4 whitespace-nowrap">
                                            Establishing direct connection to primary datastores... Compiling local React components... Awaiting final DNS propagation protocols...
                                        </span>
                                        <span className="text-[9px] md:text-[10px] text-red-500 font-mono tracking-wide px-4 whitespace-nowrap">
                                            Establishing direct connection to primary datastores... Compiling local React components... Awaiting final DNS propagation protocols...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-all duration-700 ${textHovered ? 'mt-3' : 'mt-4'
                            }`} />
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR WRAPPER */}
            <div className="h-[80px] w-full flex items-end justify-center shrink-0 z-20" style={constraintStyles}>
                <div
                    onMouseEnter={() => setBottomHovered(true)}
                    onMouseLeave={() => setBottomHovered(false)}
                    style={{
                        height: bottomHovered ? '80px' : '32px',
                        transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)'
                    }}
                    className="w-full bg-gradient-to-br from-blue-600/20 via-purple-900/20 to-black/40 border border-white/15 rounded-[1.5rem] px-8 shadow-2xl relative overflow-hidden flex items-center cursor-pointer"
                >
                    <div style={{ opacity: bottomHovered ? 0 : 1, transition: 'opacity 0.2s ease' }} className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[9px] uppercase text-white/30 tracking-[0.25em] font-black">Looking to work with us?</span>
                    </div>
                    <div style={{ opacity: bottomHovered ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }} className="flex flex-row items-center justify-between w-full relative z-10">
                        <div className="text-left">
                            <h2 className="text-sm font-black text-white leading-none">Ready to start?</h2>
                            <p className="text-[9px] text-blue-300/70 mt-1 uppercase tracking-tight">Inquire about architecture or engineering</p>
                        </div>
                        <button
                            onClick={() => triggerZoom('contact')}
                            className="px-5 py-1.5 bg-white text-black font-black rounded-lg uppercase text-[9px] shadow-lg hover:bg-blue-500 hover:text-white transition-all"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}