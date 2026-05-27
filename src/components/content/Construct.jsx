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
    const [textHovered, setTextHovered] = useState(false)
    const [isCensoredHovered, setIsCensoredHovered] = useState(false)

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full h-full items-center justify-center animate-in fade-in duration-1000 p-6 relative overflow-y-auto no-scrollbar" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            <style>{`
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                @keyframes float-slight { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
                .animate-float-slight { animation: float-slight 5s ease-in-out infinite; }
                @keyframes arrow-jab { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(0px, 6px); } }
                .animate-arrow { animation: arrow-jab 1.5s ease-in-out infinite; }
                
                @keyframes censor-flicker {
                    0% { background-position: 0 0, 23px 23px, -47px -47px, 31px 83px, -13px 113px, 53px -29px, 11px 41px, -17px 7px; }
                    20% { background-position: -47px 23px, 0 83px, 23px -31px, -31px -47px, 113px 13px, -29px 53px, -41px -11px, 7px -17px; }
                    40% { background-position: 83px -47px, -23px 23px, 0 47px, 47px 31px, -113px -13px, 29px -53px, 11px -41px, 17px 7px; }
                    60% { background-position: -23px -83px, 47px 47px, -23px 23px, -47px -31px, 13px 113px, -53px 29px, 41px 11px, -7px 17px; }
                    80% { background-position: 113px 31px, -83px 47px, 47px -23px, 23px 47px, -23px 0, 53px 53px, -11px 41px, 17px -7px; }
                    100% { background-position: 0 0, 23px 23px, -47px -47px, 31px 83px, -13px 113px, 53px -29px, 11px 41px, -17px 7px; }
                }
                .bg-censor-blocks {
                    background-color: #808080; 
                    background-image:
                        conic-gradient(from 0deg at 20% 20%, rgba(255, 255, 255, 0.65) 90deg, transparent 0),
                        conic-gradient(from 0deg at 60% 60%, rgba(229, 229, 229, 0.4) 90deg, transparent 0),
                        conic-gradient(from 0deg at 75% 75%, rgba(0, 0, 0, 0.85) 90deg, transparent 0),
                        conic-gradient(from 0deg at 50% 50%, rgba(51, 51, 51, 0.5) 90deg, transparent 0),
                        conic-gradient(from 0deg at 15% 85%, rgba(204, 204, 204, 0.35) 90deg, transparent 0),
                        conic-gradient(from 0deg at 85% 15%, rgba(17, 17, 17, 0.7) 90deg, transparent 0),
                        conic-gradient(from 0deg at 35% 45%, rgba(255, 255, 255, 0.2) 90deg, transparent 0),
                        conic-gradient(from 0deg at 10% 40%, rgba(0, 0, 0, 0.3) 90deg, transparent 0);
                    background-size: 89px 89px, 43px 43px, 61px 61px, 47px 47px, 73px 73px, 107px 107px, 137px 137px, 19px 19px;
                    image-rendering: pixelated;
                    animation: censor-flicker 1.2s steps(1) infinite;
                    -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0) 70%);
                    mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0) 70%);
                }
            `}</style>

            {/* MAIN CONTENT SECTION */}
            <div
                className={`flex-1 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center w-full max-w-5xl mx-auto min-h-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-10 scale-100 opacity-100 blur-0`}
            >
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

                <div
                    onMouseEnter={() => setTextHovered(true)}
                    onMouseLeave={() => setTextHovered(false)}
                    className={`flex flex-col justify-center w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default ${textHovered ? 'md:w-3/5' : 'md:w-2/5'
                        }`}
                >
                    <div className="flex flex-col items-center text-center w-full max-w-lg transition-all duration-700 mx-auto">
                        <div className="flex flex-row items-end justify-between border-b border-white/5 pb-2 w-full">
                            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className={`font-black text-white uppercase leading-none mb-[2px] transition-all duration-700 ${textHovered ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                                }`}>Under</h2>
                            <div className="flex flex-col items-center justify-center flex-1 transition-all duration-700 px-2">
                                <div className={`text-blue-400 font-mono uppercase whitespace-nowrap transition-all duration-700 ${textHovered ? 'text-[7px] md:text-[8px] tracking-[0.1em]' : 'text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em]'
                                    }`}>Status: System Optimization</div>
                                <div className={`text-red-500 font-mono uppercase animate-pulse whitespace-nowrap transition-all duration-700 mt-1 ${textHovered ? 'text-[7px] md:text-[8px] tracking-[0.1em]' : 'text-[8px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em]'
                                    }`}>deploy_init_v0.1.0</div>
                            </div>
                        </div>
                        <h2 style={{ fontFamily: "'Syne', sans-serif" }} className={`font-black uppercase leading-none text-blue-400 w-full text-left transition-all duration-700 ${textHovered ? 'text-xl md:text-2xl mb-2 mt-1' : 'text-2xl md:text-3xl mb-4 mt-2'
                            }`}>Construction</h2>
                        <div className="relative w-full flex flex-col items-center text-center">
                            <p className={`text-gray-300 font-light leading-relaxed transition-all duration-700 w-full ${textHovered ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'
                                }`}>The hexagonal grid is currently being recalibrated.</p>
                            <div className={`overflow-hidden transition-all w-full duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col items-center ${textHovered ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                                }`}>
                                <p className="text-[10px] md:text-xs text-gray-300 font-light leading-relaxed mb-2 transition-all duration-700 w-full">High-performance digital environments and portfolio content will be accessible here shortly.</p>
                                <div className="w-full overflow-hidden border-t border-b border-red-500/30 py-1.5 relative flex">
                                    <div className="flex w-max animate-marquee">
                                        <span className="text-[9px] md:text-[10px] text-red-500 font-mono tracking-wide px-4 whitespace-nowrap">Establishing direct connection to primary datastores... Compiling local React components... Awaiting final DNS propagation protocols...</span>
                                        <span className="text-[9px] md:text-[10px] text-red-500 font-mono tracking-wide px-4 whitespace-nowrap">Establishing direct connection to primary datastores... Compiling local React components... Awaiting final DNS propagation protocols...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-all duration-700 ${textHovered ? 'mt-3' : 'mt-4'
                            }`} />
                    </div>
                </div>
            </div>

            {/* FIXED WRAPPER FOR CENSOR & ARROW - This centers the group globally */}
            <div className="fixed -right-16 bottom-16 md:-right-64 md:bottom-32 z-50 pointer-events-none flex items-center justify-center w-64 h-64 scale-75 md:scale-90 lg:scale-100">
                {/* RELATIVE INNER CONTAINER - Preserves the original offset relationship */}
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* The Tilted Censorship Element */}
                    <div
                        className="relative rotate-[45deg] animate-float-slight pointer-events-auto z-20"
                        onMouseEnter={() => setIsCensoredHovered(true)}
                        onMouseLeave={() => setIsCensoredHovered(false)}
                    >
                        <div className="relative w-48 md:w-56 h-12 bg-black rounded-sm flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] cursor-help overflow-hidden">
                            <span className="text-white font-mono text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] z-10 whitespace-nowrap">Censored Preview!</span>
                        </div>
                        <div className={`absolute -inset-16 md:-inset-20 z-30 pointer-events-none transition-opacity duration-300 ${isCensoredHovered ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="w-full h-full bg-censor-blocks" />
                        </div>
                    </div>

                    {/* Bold Red Graffiti Arrow - Preserving original negative offsets relative to the center */}
                    <div className="absolute top-[40px] right-[-60px] md:top-[20px] md:right-[-110px] w-[200px] h-[300px] md:w-[280px] md:h-[360px] animate-arrow opacity-100 z-10 pointer-events-none">
                        <svg viewBox="0 0 300 350" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] w-full h-full overflow-visible">
                            <path d="M 30,50 C 150,50 250,150 270,280" strokeWidth="9" />
                            <path d="M 240,240 L 270,280 L 295,235" strokeWidth="9" />
                            <path d="M 26,46 C 146,46 246,146 266,276" strokeWidth="4" strokeOpacity="0.7" />
                            <path d="M 34,54 C 154,54 254,154 274,284" strokeWidth="4" strokeOpacity="0.7" />
                            <path d="M 236,236 L 266,276 L 291,231" strokeWidth="3" strokeOpacity="0.6" />
                        </svg>
                    </div>
                </div>
            </div>

        </div>
    )
