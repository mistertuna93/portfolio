// src/components/content/HomePage.jsx

import React, { useState, useEffect } from 'react'
import { usePortfolioStore } from '../../store/usePortfolioStore'
import gangstuna from '../../assets/gangstuna.png'

const injectFonts = () => {
    if (document.getElementById('mt-fonts')) return
    const link = document.createElement('link')
    link.id = 'mt-fonts'
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=DM+Mono:wght@300;400;500&display=swap'
    document.head.appendChild(link)
}

const skillsData = {
    'Web Dev': { items: ['React / Next.js', 'Three.js / WebGL', 'Tailwind CSS', 'TypeScript', 'REST & GraphQL APIs', 'Responsive & Mobile-first'] },
    'Software Dev': { items: ['Node.js / Express', 'Python', 'PostgreSQL / MongoDB', 'Docker & CI/CD', 'System Architecture', 'Performance Optimization'] },
    'Graphic Design': { items: ['Brand Identity', 'UI / Visual Systems', 'Motion & Animation', 'Figma & Adobe Suite', 'Typography', '3D & Spatial Design'] },
    'Product Design': { items: ['UX Research', 'Wireframing & Prototyping', 'User Journey Mapping', 'Design Systems', 'Accessibility (WCAG)', 'Interaction Design'] },
}

const servicesData = [
    { title: 'Web App Development', tag: 'Core', desc: 'End-to-end builds — from marketing sites to complex data-driven web apps.' },
    { title: 'Custom Software', tag: 'Core', desc: 'Bespoke tools built around your exact workflow — APIs and dashboards.' },
    { title: 'Technical Consulting', tag: 'Advisory', desc: 'Strategic guidance on architecture decisions and tech stack selection.' },
]

// Responsive label: Horizontal on mobile, Vertical on desktop
const PanelLabel = ({ children }) => (
    <div className="flex-1 flex items-center justify-center overflow-hidden py-2 md:py-0">
        <span
            style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.22em' }}
            className="text-[10px] md:text-sm font-extrabold uppercase text-white/50 md:text-white/20 tracking-widest select-none whitespace-nowrap transform md:-rotate-180 md:[writing-mode:vertical-rl]"
        >
            {children}
        </span>
    </div>
)

export const HomePage = () => {
    useEffect(() => { injectFonts() }, [])

    const triggerZoom = usePortfolioStore(state => state.triggerZoom)
    const [featureTab, setFeatureTab] = useState('nav')
    const [infoTab, setInfoTab] = useState('bio')
    const [activeSkillCat, setActiveSkillCat] = useState('Web Dev')

    const [hoveredPanel, setHoveredPanel] = useState('image')
    const [bottomHovered, setBottomHovered] = useState(false)

    const isAbout = hoveredPanel === 'about'
    const isHelp = hoveredPanel === 'help'

    return (
        <div className="flex flex-col gap-3 md:gap-2 w-full h-full items-center md:justify-center animate-in fade-in duration-1000 p-2 md:p-4 overflow-y-auto md:overflow-hidden no-scrollbar" style={{ fontFamily: "'DM Sans', sans-serif" }}>

            {/* TOP TITLE BAR */}
            <div style={{ '--max-w': 'calc(100vh - 200px + 320px)' }} className="w-full md:max-w-[var(--max-w)] bg-white/5 border border-white/10 rounded-[1.5rem] px-6 py-2 md:py-3 backdrop-blur-sm shadow-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.012)_2px,rgba(255,255,255,0.012)_4px)] pointer-events-none" />
                <div className="flex flex-col items-center relative z-10">
                    <h1 style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.04em' }} className="text-xl md:text-2xl font-extrabold text-white leading-none">
                        mister<span className="text-blue-400">tuna</span><span className="font-light text-white/25" style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7em' }}>.dev</span>
                    </h1>
                </div>
            </div>

            {/* MAIN CONTENT ROW (Column on Mobile) */}
            <div style={{ '--max-w': 'calc(100vh - 200px + 320px)' }} className="flex flex-col md:flex-row gap-3 min-h-0 md:flex-1 items-center justify-center w-full md:max-w-[var(--max-w)]">

                {/* ABOUT ME PANEL */}
                <div
                    onMouseEnter={() => setHoveredPanel('about')}
                    onMouseLeave={() => setHoveredPanel('image')}
                    onClick={() => setHoveredPanel(isAbout ? 'image' : 'about')}
                    style={{
                        '--w-desktop': isAbout ? '320px' : '52px',
                        '--h-mobile': isAbout ? '420px' : '40px',
                    }}
                    className="w-full md:w-[var(--w-desktop)] h-[var(--h-mobile)] md:h-full bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col overflow-hidden backdrop-blur-sm shadow-2xl shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer md:cursor-default"
                >
                    {!isAbout && <PanelLabel>About Me</PanelLabel>}
                    {isAbout && (
                        <div className="flex flex-col h-full p-4 w-full md:w-80 cursor-default" onClick={(e) => e.stopPropagation()}>
                            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-sm font-extrabold text-white uppercase mb-3 text-center shrink-0">About <span className="text-blue-400">Me</span></h2>
                            <div className="flex gap-1 mb-3 justify-center shrink-0">
                                {['bio', 'skills', 'services'].map((key) => (
                                    <button key={key} onClick={() => setInfoTab(key)}
                                        className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all ${infoTab === key ? 'text-white bg-blue-600 font-bold' : 'text-gray-500 hover:text-white bg-white/5'}`}
                                    >{key}</button>
                                ))}
                            </div>
                            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
                                {infoTab === 'bio' && (
                                    <div className="bg-black/40 rounded-xl border border-white/10 p-4 text-center h-full flex items-center justify-center">
                                        <p className="text-[11px] md:text-xs text-gray-200 font-light leading-relaxed">Full-stack developer crafting high-performance digital environments where bold aesthetics meet functional engineering.</p>
                                    </div>
                                )}
                                {infoTab === 'skills' && (
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap md:flex-row justify-center md:justify-between gap-1 w-full">
                                            {Object.keys(skillsData).map((cat) => (
                                                <button key={cat} onClick={() => setActiveSkillCat(cat)}
                                                    className={`flex-1 text-[7px] md:text-[7px] uppercase font-black py-2 rounded-md transition-all border whitespace-nowrap px-1 md:px-1 ${activeSkillCat === cat ? 'bg-blue-500 text-white border-blue-400' : 'bg-black/40 text-blue-400/60 border-white/5'}`}
                                                >{cat}</button>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 justify-center">
                                            {skillsData[activeSkillCat].items.map((skill) => (
                                                <span key={skill} className="text-[9px] md:text-[10px] font-bold text-white bg-blue-900/90 border border-blue-400/50 px-2 py-1 rounded-md">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {infoTab === 'services' && (
                                    <div className="space-y-2">
                                        {servicesData.map((s) => (
                                            <div key={s.title} className="bg-black/40 rounded-lg border border-white/10 p-3 md:p-2">
                                                <div className="flex items-center justify-between mb-1.5 md:mb-1">
                                                    <span className="text-[9px] md:text-[8px] font-black text-white uppercase">{s.title}</span>
                                                    <span className="text-[8px] md:text-[7px] bg-blue-500/20 text-blue-300 px-1.5 rounded-full border border-blue-500/30">{s.tag}</span>
                                                </div>
                                                <p className="text-[10px] md:text-[8px] text-gray-400 leading-tight mb-1">{s.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* CENTRAL IMAGE PANEL */}
                <div
                    onMouseEnter={() => setHoveredPanel('image')}
                    onClick={() => setHoveredPanel('image')}
                    className="w-full md:w-auto h-[220px] md:h-full md:aspect-square bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center overflow-hidden backdrop-blur-sm shadow-2xl relative group shrink-0 transition-all duration-500 cursor-pointer md:cursor-default"
                >
                    <img src={gangstuna} alt="Mascot" className="relative z-10 w-full h-full object-contain p-6 md:p-10 transform group-hover:scale-105 transition-transform duration-1000" />
                </div>

                {/* FEATURES PANEL */}
                <div
                    onMouseEnter={() => setHoveredPanel('help')}
                    onMouseLeave={() => setHoveredPanel('image')}
                    onClick={() => setHoveredPanel(isHelp ? 'image' : 'help')}
                    style={{
                        '--w-desktop': isHelp ? '320px' : '52px',
                        '--h-mobile': isHelp ? '420px' : '40px',
                    }}
                    className="w-full md:w-[var(--w-desktop)] h-[var(--h-mobile)] md:h-full bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col overflow-hidden backdrop-blur-sm shadow-2xl shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer md:cursor-default"
                >
                    {!isHelp && <PanelLabel>Site Features</PanelLabel>}
                    {isHelp && (
                        <div className="flex flex-col h-full p-4 w-full md:w-80 cursor-default" onClick={(e) => e.stopPropagation()}>
                            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-sm font-extrabold text-white uppercase mb-3 text-center shrink-0">Site <span className="text-blue-400">Features</span></h2>
                            <div className="flex gap-1 mb-3 justify-center shrink-0">
                                {['nav', 'interact', 'tools'].map((key) => (
                                    <button key={key} onClick={() => setFeatureTab(key)}
                                        className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all ${featureTab === key ? 'text-white bg-blue-600 font-bold' : 'text-gray-500 hover:text-white bg-white/5'}`}
                                    >{key}</button>
                                ))}
                            </div>
                            <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
                                {featureTab === 'nav' && (
                                    <div className="space-y-2">
                                        <div className="bg-black/40 rounded-lg border border-white/10 p-3 md:p-2">
                                            <div className="text-[9px] md:text-[8px] font-black text-blue-400 uppercase mb-1">Architecture Overview</div>
                                            <p className="text-[10px] md:text-[9px] text-gray-200 leading-tight">The site is a spatial data environment built on an infinite hexagonal coordinate system. Content is distributed across physical "Parent Hexes" within the grid matrix.</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg border border-white/10 p-3 md:p-2">
                                            <div className="text-[9px] md:text-[8px] font-black text-blue-400 uppercase mb-1">Traversal Methods</div>
                                            <p className="text-[10px] md:text-[9px] text-gray-200 leading-tight">• Edge-Hovering: Move the cursor to screen boundaries to auto-pan.</p>
                                            <p className="text-[10px] md:text-[9px] text-gray-200 leading-tight mt-1">• Manual Drag: Click and drag anywhere on the grid to slide the view.</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg border border-white/10 p-3 md:p-2">
                                            <div className="text-[9px] md:text-[8px] font-black text-blue-400 uppercase mb-1">Accessing Data</div>
                                            <p className="text-[10px] md:text-[9px] text-gray-200 leading-tight">• Warp Link: Click floating text indicators at any time to transition directly to a specific page's position.</p>
                                        </div>
                                    </div>
                                )}
                                {featureTab === 'interact' && (
                                    <div className="space-y-2">
                                        <div className="bg-black/40 rounded-lg border border-white/10 p-4 md:p-3">
                                            <div className="text-[10px] md:text-[8px] font-black text-blue-400 uppercase mb-2 md:mb-1">Settings Dashboard</div>
                                            <p className="text-[11px] md:text-[10px] text-gray-200 leading-relaxed">Modify the environment's fundamental laws via the Settings panel:</p>
                                            <ul className="text-[10px] md:text-[9px] text-gray-400 mt-2 space-y-2 md:space-y-1">
                                                <li>• <span className="text-white font-bold">Wave Physics:</span> Adjust speed, frequency, and magnitude to change the grid's animation flow.</li>
                                                <li>• <span className="text-white font-bold">Theming:</span> Toggle between interface color modes to shift the visual mood.</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                {featureTab === 'tools' && (
                                    <div className="space-y-2">
                                        <div className="bg-black/40 rounded-lg border border-white/10 p-3 md:p-2">
                                            <div className="text-[10px] md:text-[8px] font-black text-blue-400 uppercase mb-1">Minimap Projection</div>
                                            <p className="text-[11px] md:text-[9px] text-gray-200 leading-tight">Located in the top-left, this tool provides a live coordinate-relative overview of the infinite hex grid.</p>
                                        </div>
                                        <div className="bg-black/40 rounded-lg border border-white/10 p-3 md:p-2">
                                            <div className="text-[10px] md:text-[8px] font-black text-blue-400 uppercase mb-1">Zoom Engine</div>
                                            <p className="text-[11px] md:text-[9px] text-gray-200 leading-tight">The vertical navigation stack (bottom-left) allows for instant shifts in focal depth, alternating between high-altitude "Grid Mode" and immersive "Page Mode".</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div
                onMouseEnter={() => setBottomHovered(true)}
                onMouseLeave={() => setBottomHovered(false)}
                onClick={() => setBottomHovered(!bottomHovered)}
                style={{
                    '--max-w': 'calc(100vh - 200px + 320px)',
                    '--h-desktop': bottomHovered ? '80px' : '28px',
                    '--h-mobile': bottomHovered ? '100px' : '40px',
                }}
                className="w-full md:max-w-[var(--max-w)] h-[var(--h-mobile)] md:h-[var(--h-desktop)] bg-gradient-to-br from-blue-600/20 via-purple-900/20 to-black/40 border border-white/15 rounded-[1.2rem] md:rounded-[1.5rem] px-4 md:px-8 shadow-2xl relative overflow-hidden flex items-center shrink-0 cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
                <div style={{ opacity: bottomHovered ? 0 : 1, transition: 'opacity 0.2s ease' }} className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] md:text-[9px] uppercase text-white/50 md:text-white/30 tracking-[0.25em] font-black">Looking to work with us?</span>
                </div>

                {/* Active Content when opened */}
                <div style={{ opacity: bottomHovered ? 1 : 0, transition: 'opacity 0.3s ease 0.1s' }} className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full relative z-10 gap-2 md:gap-0 mt-1 md:mt-0" onClick={(e) => e.stopPropagation()}>
                    <div className="text-center md:text-left">
                        <h2 className="text-xs md:text-sm font-black text-white leading-none">Ready to start?</h2>
                        <p className="text-[8px] md:text-[9px] text-blue-300/70 mt-1 uppercase tracking-tight hidden md:block">Inquire about architecture or engineering</p>
                    </div>
                    <button onClick={() => triggerZoom('contact')} className="px-5 py-1.5 bg-white text-black font-black rounded-lg uppercase text-[9px] shadow-lg hover:bg-blue-500 hover:text-white transition-all">Contact</button>
                </div>
            </div>
        </div>
    )
}