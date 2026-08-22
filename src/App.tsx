import { useState, useEffect, useRef } from "react";

// ─── Floral SVG Elements ──────────────────────────────────────────────────────

function FloralBranchLeft() {
  return (
    <svg viewBox="0 0 320 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main stem */}
      <path d="M 40 480 C 60 380 80 320 100 240 C 120 160 130 100 160 40" stroke="#c9a89b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      {/* Branch 1 */}
      <path d="M 85 300 C 60 280 30 270 10 240" stroke="#c9a89b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
      {/* Branch 2 */}
      <path d="M 110 220 C 90 200 70 180 40 160" stroke="#c9a89b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
      {/* Branch 3 */}
      <path d="M 130 160 C 110 140 90 120 70 100" stroke="#c9a89b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>

      {/* Rose 1 - main */}
      <g transform="translate(145, 30)">
        <circle cx="0" cy="0" r="18" fill="#c9a89b" opacity="0.15"/>
        <path d="M 0 -14 C 6 -10 10 -4 10 2 C 10 9 6 14 0 14 C -6 14 -10 9 -10 2 C -10 -4 -6 -10 0 -14 Z" fill="#e8c4b8" opacity="0.7"/>
        <path d="M -8 -10 C -2 -8 4 -4 6 2 C 8 8 4 12 -2 12 C -8 12 -12 8 -12 2 C -12 -4 -10 -8 -8 -10 Z" fill="#d9b0a4" opacity="0.6"/>
        <path d="M 8 -10 C 4 -6 6 0 4 6 C 2 10 -2 12 -6 10 C -2 6 2 0 2 -6 C 2 -10 6 -12 8 -10 Z" fill="#d9b0a4" opacity="0.6"/>
        <circle cx="0" cy="2" r="5" fill="#c9a89b" opacity="0.8"/>
        <circle cx="0" cy="2" r="2" fill="#b8965a" opacity="0.9"/>
      </g>

      {/* Bud 1 */}
      <g transform="translate(5, 234)">
        <ellipse cx="0" cy="0" rx="7" ry="10" fill="#e8c4b8" opacity="0.6" transform="rotate(-20)"/>
        <path d="M 0 10 C 2 6 2 0 0 -10" stroke="#c9a89b" strokeWidth="0.8" fill="none" opacity="0.5"/>
      </g>

      {/* Bud 2 */}
      <g transform="translate(38, 152)">
        <ellipse cx="0" cy="0" rx="6" ry="9" fill="#e8c4b8" opacity="0.5" transform="rotate(15)"/>
      </g>

      {/* Rose 2 - smaller */}
      <g transform="translate(62, 92)">
        <path d="M 0 -10 C 4 -7 7 -2 7 3 C 7 7 4 10 0 10 C -4 10 -7 7 -7 3 C -7 -2 -4 -7 0 -10 Z" fill="#e8c4b8" opacity="0.65"/>
        <path d="M -6 -7 C -2 -5 2 0 3 5 C 4 8 2 10 -2 9" fill="#d9b0a4" opacity="0.5"/>
        <circle cx="0" cy="2" r="3.5" fill="#c9a89b" opacity="0.7"/>
      </g>

      {/* Leaves */}
      <path d="M 95 265 C 70 255 55 270 50 285 C 65 280 80 268 95 265 Z" fill="#8a9e8d" opacity="0.4"/>
      <path d="M 115 190 C 92 182 78 195 74 208 C 88 203 102 192 115 190 Z" fill="#8a9e8d" opacity="0.35"/>
      <path d="M 135 130 C 112 124 100 138 97 150 C 110 144 124 132 135 130 Z" fill="#8a9e8d" opacity="0.3"/>

      {/* Small floating petals */}
      <ellipse cx="20" cy="350" rx="4" ry="7" fill="#e8c4b8" opacity="0.3" transform="rotate(30 20 350)"/>
      <ellipse cx="55" cy="420" rx="3" ry="5" fill="#e8c4b8" opacity="0.25" transform="rotate(-15 55 420)"/>
      <ellipse cx="140" cy="200" rx="3" ry="6" fill="#e8c4b8" opacity="0.3" transform="rotate(45 140 200)"/>
    </svg>
  );
}

function FloralBranchRight() {
  return (
    <svg viewBox="0 0 320 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ transform: "scaleX(-1)" }}>
      <path d="M 40 480 C 60 380 80 320 100 240 C 120 160 130 100 160 40" stroke="#c9a89b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8"/>
      <path d="M 85 300 C 60 280 30 270 10 240" stroke="#c9a89b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M 110 220 C 90 200 70 180 40 160" stroke="#c9a89b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M 130 160 C 110 140 90 120 70 100" stroke="#c9a89b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
      <g transform="translate(145, 30)">
        <circle cx="0" cy="0" r="18" fill="#c9a89b" opacity="0.15"/>
        <path d="M 0 -14 C 6 -10 10 -4 10 2 C 10 9 6 14 0 14 C -6 14 -10 9 -10 2 C -10 -4 -6 -10 0 -14 Z" fill="#e8c4b8" opacity="0.7"/>
        <path d="M -8 -10 C -2 -8 4 -4 6 2 C 8 8 4 12 -2 12 C -8 12 -12 8 -12 2 C -12 -4 -10 -8 -8 -10 Z" fill="#d9b0a4" opacity="0.6"/>
        <path d="M 8 -10 C 4 -6 6 0 4 6 C 2 10 -2 12 -6 10 C -2 6 2 0 2 -6 C 2 -10 6 -12 8 -10 Z" fill="#d9b0a4" opacity="0.6"/>
        <circle cx="0" cy="2" r="5" fill="#c9a89b" opacity="0.8"/>
        <circle cx="0" cy="2" r="2" fill="#b8965a" opacity="0.9"/>
      </g>
      <g transform="translate(5, 234)">
        <ellipse cx="0" cy="0" rx="7" ry="10" fill="#e8c4b8" opacity="0.6" transform="rotate(-20)"/>
      </g>
      <g transform="translate(38, 152)">
        <ellipse cx="0" cy="0" rx="6" ry="9" fill="#e8c4b8" opacity="0.5" transform="rotate(15)"/>
      </g>
      <g transform="translate(62, 92)">
        <path d="M 0 -10 C 4 -7 7 -2 7 3 C 7 7 4 10 0 10 C -4 10 -7 7 -7 3 C -7 -2 -4 -7 0 -10 Z" fill="#e8c4b8" opacity="0.65"/>
        <path d="M -6 -7 C -2 -5 2 0 3 5 C 4 8 2 10 -2 9" fill="#d9b0a4" opacity="0.5"/>
        <circle cx="0" cy="2" r="3.5" fill="#c9a89b" opacity="0.7"/>
      </g>
      <path d="M 95 265 C 70 255 55 270 50 285 C 65 280 80 268 95 265 Z" fill="#8a9e8d" opacity="0.4"/>
      <path d="M 115 190 C 92 182 78 195 74 208 C 88 203 102 192 115 190 Z" fill="#8a9e8d" opacity="0.35"/>
      <path d="M 135 130 C 112 124 100 138 97 150 C 110 144 124 132 135 130 Z" fill="#8a9e8d" opacity="0.3"/>
      <ellipse cx="20" cy="350" rx="4" ry="7" fill="#e8c4b8" opacity="0.3" transform="rotate(30 20 350)"/>
      <ellipse cx="140" cy="200" rx="3" ry="6" fill="#e8c4b8" opacity="0.3" transform="rotate(45 140 200)"/>
    </svg>
  );
}

function FloralGarlandTop() {
  return (
    <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M 0 80 C 100 60 200 40 400 30 C 600 20 700 50 800 70" stroke="#c9a89b" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      {/* Roses along top */}
      {[80, 200, 320, 400, 480, 600, 720].map((x, i) => (
        <g key={i} transform={`translate(${x}, ${25 + Math.sin(i) * 15})`}>
          <path d="M 0 -9 C 4 -6 7 -2 7 3 C 7 7 4 9 0 9 C -4 9 -7 7 -7 3 C -7 -2 -4 -6 0 -9 Z" fill="#e8c4b8" opacity="0.6"/>
          <circle cx="0" cy="1" r="3" fill="#c9a89b" opacity="0.7"/>
        </g>
      ))}
      {/* Leaves */}
      {[140, 260, 360, 440, 540, 660].map((x, i) => (
        <path key={i} d={`M ${x} ${35 + Math.sin(i * 0.7) * 10} C ${x - 12} ${30 + Math.sin(i * 0.7) * 10} ${x - 18} ${42 + Math.sin(i * 0.7) * 10} ${x - 10} ${48 + Math.sin(i * 0.7) * 10} C ${x} ${42 + Math.sin(i * 0.7) * 10} ${x + 4} ${35 + Math.sin(i * 0.7) * 10} ${x} ${35 + Math.sin(i * 0.7) * 10} Z`} fill="#8a9e8d" opacity="0.35"/>
      ))}
    </svg>
  );
}

// ─── Logomark ─────────────────────────────────────────────────────────────────

function Logomark({ size = 200 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-4" style={{ width: size }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        {/* Outer decorative ring */}
        <circle cx="100" cy="100" r="94" stroke="#c9a89b" strokeWidth="0.5" opacity="0.4"/>
        <circle cx="100" cy="100" r="88" stroke="#c9a89b" strokeWidth="0.3" opacity="0.3"/>

        {/* Corner flourishes */}
        <path d="M 100 12 C 104 20 104 28 100 32 C 96 28 96 20 100 12 Z" fill="#c9a89b" opacity="0.5"/>
        <path d="M 100 168 C 104 176 104 184 100 188 C 96 184 96 176 100 168 Z" fill="#c9a89b" opacity="0.5"/>
        <path d="M 12 100 C 20 96 28 96 32 100 C 28 104 20 104 12 100 Z" fill="#c9a89b" opacity="0.5"/>
        <path d="M 168 100 C 176 96 184 96 188 100 C 184 104 176 104 168 100 Z" fill="#c9a89b" opacity="0.5"/>

        {/* Small roses at cardinal points */}
        {[[100, 22], [100, 178], [22, 100], [178, 100]].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx}, ${cy})`}>
            <circle r="5" fill="#c9a89b" opacity="0.2"/>
            <circle r="2.5" fill="#c9a89b" opacity="0.5"/>
            <circle r="1" fill="#b8965a" opacity="0.8"/>
          </g>
        ))}

        {/* Monogram letters */}
        <text
          x="67"
          y="116"
          fontFamily="'Cinzel', serif"
          fontSize="44"
          fontWeight="400"
          fill="#e8c4b8"
          opacity="0.95"
          letterSpacing="2"
        >
          E
        </text>
        <text
          x="95"
          y="116"
          fontFamily="'Cinzel', serif"
          fontSize="44"
          fontWeight="400"
          fill="#c9a89b"
          opacity="0.9"
          letterSpacing="2"
        >
          &
        </text>
        <text
          x="126"
          y="116"
          fontFamily="'Cinzel', serif"
          fontSize="44"
          fontWeight="400"
          fill="#e8c4b8"
          opacity="0.95"
          letterSpacing="2"
        >
          J
        </text>

        {/* Decorative horizontal lines */}
        <line x1="36" y1="72" x2="164" y2="72" stroke="#c9a89b" strokeWidth="0.5" opacity="0.4"/>
        <line x1="36" y1="128" x2="164" y2="128" stroke="#c9a89b" strokeWidth="0.5" opacity="0.4"/>

        {/* Small diamond accents */}
        <polygon points="100,65 103,68 100,71 97,68" fill="#b8965a" opacity="0.6"/>
        <polygon points="100,129 103,132 100,135 97,132" fill="#b8965a" opacity="0.6"/>
      </svg>

      <div className="text-center">
        <p className="text-[#c9a89b] text-[0.55rem] tracking-[0.4em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Together Forever
        </p>
      </div>
    </div>
  );
}

// ─── Intro Overlay ─────────────────────────────────────────────────────────────

type IntroPhase = "logo" | "floral" | "photo" | "done";

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("logo");
  const [logoVisible, setLogoVisible] = useState(true);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("floral"), 2200);
    const t2 = setTimeout(() => {
      setLogoVisible(false);
      setPhase("photo");
    }, 3600);
    const t3 = setTimeout(() => setSliding(true), 5200);
    const t4 = setTimeout(() => onComplete(), 6100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${sliding ? "animate-slide-out" : ""}`}
      style={{ backgroundColor: "#1a1614" }}
    >
      {/* Background photo (revealed behind florals) */}
      {phase === "photo" && (
        <div className="absolute inset-0 animate-photo-reveal">
          <img
            src="https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=1800&h=1200&fit=crop&auto=format"
            alt="The couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,22,20,0.65) 0%, rgba(26,22,20,0.3) 50%, rgba(26,22,20,0.65) 100%)" }}/>
        </div>
      )}

      {/* Floral left branch */}
      {(phase === "floral" || phase === "photo") && (
        <div className="absolute left-0 bottom-0 w-48 md:w-64 h-[70vh] animate-floral-left origin-bottom-left pointer-events-none">
          <FloralBranchLeft />
        </div>
      )}
      {/* Floral right branch */}
      {(phase === "floral" || phase === "photo") && (
        <div className="absolute right-0 bottom-0 w-48 md:w-64 h-[70vh] animate-floral-right origin-bottom-right pointer-events-none">
          <FloralBranchRight />
        </div>
      )}
      {/* Floral top garland */}
      {(phase === "floral" || phase === "photo") && (
        <div className="absolute top-0 left-0 right-0 h-32 md:h-48 animate-floral-top pointer-events-none">
          <FloralGarlandTop />
        </div>
      )}

      {/* Logo / center content */}
      <div className="relative z-10 flex flex-col items-center">
        {logoVisible && (
          <div className={phase === "floral" ? "animate-logo-out" : "animate-logo-in"}>
            <Logomark size={180} />
          </div>
        )}

        {phase === "photo" && (
          <div className="text-center animate-section">
            <p className="section-label mb-4" style={{ color: "#c9a89b" }}>Est. 2025</p>
            <h1 className="text-white mb-2" style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 400, letterSpacing: "0.1em" }}>
              Eleanor & James
            </h1>
            <p className="text-[#e8c4b8] text-sm tracking-[0.25em] uppercase mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              September 12, 2026 · Villa Rosetta, Tuscany
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-[#c9a89b] text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Scroll</p>
              <div className="animate-scroll-indicator w-px h-8 bg-gradient-to-b from-[#c9a89b] to-transparent"/>
            </div>
          </div>
        )}
      </div>

      {/* Skip button */}
      {phase !== "done" && (
        <button
          onClick={() => { setSliding(true); setTimeout(onComplete, 900); }}
          className="absolute bottom-8 right-8 text-[#c9a89b] text-xs tracking-widest uppercase hover:text-white transition-colors duration-300"
          style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }}
        >
          Skip →
        </button>
      )}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Our Story", "Details", "Gallery", "RSVP"];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "py-4" : "py-6"}`}
      style={{ background: scrolled ? "rgba(248,244,239,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(201,168,155,0.2)" : "none" }}>
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 60 60" width={32} height={32} fill="none">
            <circle cx="30" cy="30" r="28" stroke="#c9a89b" strokeWidth="0.8" opacity="0.5"/>
            <text x="8" y="40" fontFamily="'Cinzel', serif" fontSize="18" fontWeight="400" fill="#1a1614">E&J</text>
          </svg>
          <span className="hidden md:block section-label" style={{ color: "#1a1614" }}>Eleanor & James</span>
        </div>
        <div className="flex items-center gap-8">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="section-label transition-colors duration-200 hover:text-[#1a1614]"
              style={{ color: "#8a7a72" }}>
              {link}
            </a>
          ))}
          <a href="#rsvp"
            className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#1a1614] hover:text-white"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.18em", border: "1px solid #1a1614", color: "#1a1614", fontSize: "0.62rem" }}>
            RSVP Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative h-screen flex items-end pb-24 overflow-hidden" style={{ background: "#1a1614" }}>
      <img
        src="https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=1800&h=1200&fit=crop&auto=format"
        alt="Eleanor and James"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,22,20,0.92) 0%, rgba(26,22,20,0.2) 60%, rgba(26,22,20,0.1) 100%)" }}/>

      {/* Floral corner accents */}
      <div className="absolute top-0 left-0 w-40 md:w-56 h-64 md:h-80 pointer-events-none opacity-60">
        <FloralBranchLeft />
      </div>
      <div className="absolute top-0 right-0 w-40 md:w-56 h-64 md:h-80 pointer-events-none opacity-60">
        <FloralBranchRight />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <p className="section-label mb-5" style={{ color: "#c9a89b" }}>12 · 09 · 2026</p>
          <h1 className="text-white mb-4 leading-none"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 400, letterSpacing: "0.04em" }}>
            Eleanor
            <br />
            <span style={{ fontStyle: "italic", color: "#c9a89b" }}>&amp;</span>{" "}
            James
          </h1>
          <p className="text-[#e8c4b8] mt-6 max-w-sm leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.05rem", fontWeight: 300 }}>
            Two souls, one journey — celebrating love in the hills of Tuscany.
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-12 flex gap-8">
          {[["142", "Days"], ["08", "Hours"], ["34", "Minutes"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-white" style={{ fontFamily: "'Cinzel', serif", fontSize: "2rem", fontWeight: 400, lineHeight: 1 }}>{val}</div>
              <div className="section-label mt-1" style={{ color: "#8a7a72" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
        <div className="animate-scroll-indicator w-px h-10 bg-gradient-to-b from-[#c9a89b] to-transparent"/>
      </div>
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

const storyMilestones = [
  {
    year: "2019",
    title: "First Meeting",
    body: "A rainy Tuesday in Florence changed everything. Two strangers reached for the last umbrella at a market stall — and neither would let go.",
    img: "https://images.unsplash.com/photo-1519741196428-6a2175fa2557?w=600&h=800&fit=crop&auto=format",
    alt: "The couple, early days",
  },
  {
    year: "2021",
    title: "First Trip Together",
    body: "Seventeen countries, one broken-down rental car, and a sunset over Santorini that made it all perfect. This was when we knew.",
    img: "https://images.unsplash.com/photo-1591604442449-ecc9943efabf?w=600&h=800&fit=crop&auto=format",
    alt: "Travel portrait",
  },
  {
    year: "2024",
    title: "The Proposal",
    body: "On a quiet morning at Villa Borghese, among the roses, James asked a question he'd been rehearsing for a year. Eleanor said yes before he finished.",
    img: "https://images.unsplash.com/photo-1621621668101-d5c8329b3784?w=600&h=800&fit=crop&auto=format",
    alt: "Engagement portrait",
  },
];

function OurStorySection() {
  return (
    <section id="our-story" className="py-32" style={{ background: "#f8f4ef" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-16 flex items-start justify-between flex-wrap gap-8">
          <div>
            <p className="section-label mb-4">Our Story</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "#1a1614", letterSpacing: "0.05em" }}>
              How It Began
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#8a7a72", fontWeight: 300, fontSize: "1rem" }}>
            "Love is composed of a single soul inhabiting two bodies."
            <br/><span className="section-label not-italic" style={{ color: "#c9a89b", fontFamily: "'DM Sans', sans-serif" }}>— Aristotle</span>
          </p>
        </div>

        <div className="space-y-0">
          {storyMilestones.map((m, i) => (
            <div key={m.year} className={`grid md:grid-cols-2 gap-0 border-t border-[#e8ddd6] ${i === storyMilestones.length - 1 ? "border-b" : ""}`}>
              {/* Text side */}
              <div className={`py-16 pr-16 flex flex-col justify-center ${i % 2 === 1 ? "md:order-2 md:pl-16 md:pr-0" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="section-label">{m.year}</span>
                  <span className="w-8 h-px bg-[#c9a89b]"/>
                </div>
                <h3 className="mb-4" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", fontWeight: 400, color: "#1a1614", letterSpacing: "0.05em" }}>
                  {m.title}
                </h3>
                <p className="leading-relaxed text-[0.95rem]" style={{ fontFamily: "'Fraunces', serif", color: "#5a4f4a", fontWeight: 300, lineHeight: 1.8 }}>
                  {m.body}
                </p>
              </div>
              {/* Image side */}
              <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-1" : ""}`} style={{ minHeight: 360 }}>
                <img src={m.img} alt={m.alt} className="absolute inset-0 w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-105"/>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(26,22,20,0.08), transparent)" }}/>
                {/* Year overlay */}
                <div className="absolute bottom-6 left-6">
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "4rem", fontWeight: 700, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
                    {m.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Details Section ──────────────────────────────────────────────────────────

function DetailsSection() {
  const details = [
    {
      label: "Ceremony",
      time: "4:00 PM",
      title: "Villa Rosetta",
      sub: "Via delle Rose 12, Montepulciano, Tuscany",
      note: "Outdoor ceremony in the rose garden. Please arrive 30 minutes early.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-[#c9a89b]">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
    },
    {
      label: "Reception",
      time: "7:00 PM",
      title: "Cantinetta Antinori",
      sub: "Piazza Antinori, Florence",
      note: "Dinner, dancing, and toasts until midnight. Black tie optional.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-[#c9a89b]">
          <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
        </svg>
      ),
    },
    {
      label: "Accommodation",
      time: "Check-in: Sep 11",
      title: "Hotel Il Pellicano",
      sub: "Via Panoramica, Porto Ercole, Tuscany",
      note: "Room block reserved under 'Whitmore–Chen.' Book by July 15.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-[#c9a89b]">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="details" className="py-32" style={{ background: "#1a1614" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-16 text-center">
          <p className="section-label mb-4" style={{ color: "#c9a89b" }}>Wedding Details</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "#f8f4ef", letterSpacing: "0.05em" }}>
            The Celebration
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(201,168,155,0.15)" }}>
          {details.map(d => (
            <div key={d.label} className="p-10 flex flex-col gap-6" style={{ background: "#1a1614" }}>
              {d.icon}
              <div>
                <p className="section-label mb-2" style={{ color: "#8a7a72" }}>{d.label}</p>
                <p className="text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "#b8965a", letterSpacing: "0.1em" }}>{d.time}</p>
                <h3 className="mb-2" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.25rem", fontWeight: 400, color: "#f8f4ef", letterSpacing: "0.04em" }}>{d.title}</h3>
                <p className="text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8a7a72", lineHeight: 1.6 }}>{d.sub}</p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#b0a09a", fontWeight: 300 }}>{d.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Date highlight bar */}
        <div className="mt-px p-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "rgba(201,168,155,0.06)", border: "1px solid rgba(201,168,155,0.15)" }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", color: "#c9a89b", letterSpacing: "0.2em" }}>
            SEPTEMBER 12 · 2026 · TUSCANY, ITALY
          </p>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "0.9rem", color: "#8a7a72", fontWeight: 300 }}>
            142 days remaining
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=600&h=800&fit=crop&auto=format", alt: "The couple", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1553379762-ff913d5513b5?w=600&h=400&fit=crop&auto=format", alt: "White florals", span: "" },
  { src: "https://images.unsplash.com/photo-1560624306-adcb77219838?w=600&h=400&fit=crop&auto=format", alt: "Floral arrangement", span: "" },
  { src: "https://images.unsplash.com/photo-1611605469961-50d1e409622a?w=600&h=800&fit=crop&auto=format", alt: "Pink roses", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?w=600&h=400&fit=crop&auto=format", alt: "Wedding dress portrait", span: "" },
  { src: "https://images.unsplash.com/photo-1692521726977-f5c42456e716?w=600&h=400&fit=crop&auto=format", alt: "White flower", span: "" },
];

function GallerySection() {
  return (
    <section id="gallery" className="py-32" style={{ background: "#f8f4ef" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="section-label mb-4">Portfolio</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "#1a1614", letterSpacing: "0.05em" }}>
              Our Moments
            </h2>
          </div>
          <p className="section-label" style={{ color: "#c9a89b" }}>06 images</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <div key={i} className={`relative overflow-hidden group cursor-pointer ${img.span}`} style={{ background: "#e8ddd6" }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: "linear-gradient(to top, rgba(26,22,20,0.6) 0%, transparent 60%)" }}>
                <span className="section-label text-white">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RSVP Section ─────────────────────────────────────────────────────────────

function RSVPSection() {
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes", dietary: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-transparent border-b border-[#c9a89b] border-opacity-40 py-3 text-sm text-[#1a1614] placeholder-[#b0a09a] focus:outline-none focus:border-[#1a1614] transition-colors duration-200";
  const labelClass = "section-label block mb-2";

  return (
    <section id="rsvp" className="py-32" style={{ background: "#f0ebe4" }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">Kindly Reply By</p>
            <h2 className="mb-6" style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "#1a1614", letterSpacing: "0.05em" }}>
              August 1, 2026
            </h2>
            <p className="leading-relaxed mb-10" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.05rem", color: "#5a4f4a", fontWeight: 300, lineHeight: 1.9 }}>
              We would be honored by your presence as we exchange vows and celebrate with those who mean the most to us. Please let us know if you can join us in Tuscany.
            </p>

            {/* Decorative Logomark */}
            <div className="opacity-30">
              <Logomark size={140} />
            </div>
          </div>

          {/* Right - Form */}
          <div>
            {submitted ? (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg viewBox="0 0 60 60" width={60} height={60} fill="none" className="mx-auto">
                    <circle cx="30" cy="30" r="28" stroke="#c9a89b" strokeWidth="1"/>
                    <path d="M 18 30 L 26 38 L 42 22" stroke="#c9a89b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="mb-3" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", color: "#1a1614", letterSpacing: "0.05em" }}>
                  Thank You, {form.name.split(" ")[0]}
                </h3>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#8a7a72", fontWeight: 300 }}>
                  We can&apos;t wait to celebrate with you.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input name="name" required value={form.name} onChange={handle} placeholder="Your name" className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }}/>
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input name="email" type="email" required value={form.email} onChange={handle} placeholder="your@email.com" className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }}/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>Attending?</label>
                    <select name="attending" value={form.attending} onChange={handle} className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <option value="yes">Joyfully accepts</option>
                      <option value="no">Regretfully declines</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Guests</label>
                    <select name="guests" value={form.guests} onChange={handle} className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {["1", "2", "3", "4"].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Dietary Requirements</label>
                  <input name="dietary" value={form.dietary} onChange={handle} placeholder="Vegetarian, vegan, allergies…" className={inputClass} style={{ fontFamily: "'DM Sans', sans-serif" }}/>
                </div>
                <div>
                  <label className={labelClass}>Message to the Couple</label>
                  <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="A note for Eleanor & James…" className={inputClass + " resize-none"} style={{ fontFamily: "'DM Sans', sans-serif" }}/>
                </div>
                <button type="submit"
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#1a1614] hover:text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif", border: "1px solid #1a1614", color: "#1a1614", background: "transparent" }}>
                  Send RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-16 text-center border-t" style={{ background: "#1a1614", borderColor: "rgba(201,168,155,0.15)" }}>
      <Logomark size={100} />
      <p className="mt-8 section-label" style={{ color: "#5a4f4a" }}>
        Eleanor & James · September 12, 2026 · Tuscany, Italy
      </p>
      <p className="mt-3" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#4a3f3a", fontWeight: 300 }}>
        Made with love ♡
      </p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div className="size-full">
      {!introComplete && <IntroOverlay onComplete={() => setIntroComplete(true)} />}
      <div ref={mainRef} style={{ opacity: introComplete ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
        <Nav />
        <HeroSection />
        <OurStorySection />
        <DetailsSection />
        <GallerySection />
        <RSVPSection />
        <Footer />
      </div>
    </div>
  );
}
