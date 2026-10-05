import { useState, useEffect, useRef } from "react";
import calendarIconSvg from "./imports/calendar-icon.svg?raw";
import cherriesFruitSvg from "./imports/cherries-fruit.svg?raw";
import citrusFruitSvg from "./imports/citrus-fruit.svg?raw";
import floralBranchSvg from "./imports/floral-branch.svg?raw";
import floralGarlandSvg from "./imports/floral-garland.svg?raw";
import locationIconSvg from "./imports/location-icon.svg?raw";
import navigationMonogramSvg from "./imports/navigation-monogram.svg?raw";
import pearFruitSvg from "./imports/pear-fruit.svg?raw";
import successCheckSvg from "./imports/success-check.svg?raw";
import venueIconSvg from "./imports/venue-icon.svg?raw";
import weddingMonogramSvg from "./imports/wedding-monogram.svg?raw";

import couplePhoto from "./imports/CS_16565_websize.jpg";
import benchPic from "./imports/benchpic.jpg";
import bridgePic from "./imports/bridgepic.jpg";
import grassPic from "./imports/grasspic.jpg";
import housePic from "./imports/housepic.jpg";
import ringPic from "./imports/ringpic.jpg";
import farTreePic from "./imports/far_tree_pic.jpg";
import blurPic from "./imports/blurpic.jpg";

import floralAndFruits1 from "./imports/photos/floral_and_fruits1.png";
import floralAndFruits2 from "./imports/photos/floral_and_fruits2.png";
import floralAndFruits3 from "./imports/photos/floral_and_fruits3.png";
import floralAndFruits4 from "./imports/photos/floral_and_fruits4.png";

const WEDDING_DATE = new Date("2027-05-01T13:00:00-05:00").getTime();

function getWeddingCountdown() {
  const remaining = Math.max(WEDDING_DATE - Date.now(), 0);

  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
  };
}

function useWeddingCountdown() {
  const [countdown, setCountdown] = useState(getWeddingCountdown);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getWeddingCountdown());
    updateCountdown();

    const interval = window.setInterval(updateCountdown, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return countdown;
}

type FruitVariant = "citrus" | "pear" | "cherries";

const fruitArtwork: Record<FruitVariant, string> = {
  citrus: citrusFruitSvg,
  pear: pearFruitSvg,
  cherries: cherriesFruitSvg,
};

function SvgArtwork({ source, className = "" }: { source: string; className?: string }) {
  return (
    <span
      className={`svg-artwork ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}

function ScrollFruit({
  side,
  variant,
  top = "24%",
}: {
  side: "left" | "right";
  variant: FruitVariant;
  top?: string;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "-24% 0px -18% 0px", threshold: 0 },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={anchorRef}
      className={`scroll-fruit-anchor scroll-fruit-anchor-${side}`}
      aria-hidden="true"
      style={{ top }}
    >
      <div
        className={`scroll-fruit scroll-fruit-${side} ${visible ? "is-visible" : ""}`}
      >
        <SvgArtwork source={fruitArtwork[variant]} className="size-full" />
      </div>
    </div>
  );
}

// ─── Floral SVG Elements ──────────────────────────────────────────────────────

function FloralBranchLeft() {
  return <SvgArtwork source={floralBranchSvg} className="size-full" />;
}

function FloralBranchRight() {
  return <SvgArtwork source={floralBranchSvg} className="size-full scale-x-[-1]" />;
}

function FloralGarlandTop() {
  return <SvgArtwork source={floralGarlandSvg} className="size-full" />;
}

// ─── Logomark ─────────────────────────────────────────────────────────────────

function Logomark({ size = 200, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <div
      className="flex flex-col items-center gap-4"
      style={{ width: size, color: onDark ? "var(--heading-light)" : "var(--background-dark)" }}
    >
      <SvgArtwork source={weddingMonogramSvg} className="aspect-square w-full" />
      <p className="text-[0.55rem] tracking-[0.4em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        Together Forever
      </p>
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
      style={{ backgroundColor: "var(--background-dark)" }}
    >
      {/* Background photo (revealed behind florals) */}
      {phase === "photo" && (
        <div className="absolute inset-0 animate-photo-reveal">
          <img
            src={couplePhoto}
            alt="The couple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--background-dark) 65%, transparent) 0%, color-mix(in srgb, var(--background-dark) 30%, transparent) 50%, color-mix(in srgb, var(--background-dark) 65%, transparent) 100%)" }}/>
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
            <Logomark size={180} onDark />
          </div>
        )}

        {phase === "photo" && (
          <div className="text-center animate-section">
            <p className="section-label mb-4" style={{ color: "var(--accent-muted)" }}>Est. 2025</p>
            <h1 className="text-[var(--heading-light)] mb-2" style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 400, letterSpacing: "0.1em" }}>
              Chi Tai & Christine
            </h1>
            <p className="text-[var(--floral-petal-light)] text-sm tracking-[0.25em] uppercase mt-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
              Saturday · May 1 · 2027 · Oklahoma City, Oklahoma
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <p className="text-[var(--accent-muted)] text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Scroll</p>
              <div className="animate-scroll-indicator w-px h-8 bg-gradient-to-b from-[var(--accent-muted)] to-transparent"/>
            </div>
          </div>
        )}
      </div>

      {/* Skip button */}
      {phase !== "done" && (
        <button
          onClick={() => { setSliding(true); setTimeout(onComplete, 900); }}
          className="absolute bottom-8 right-8 text-[var(--accent-muted)] text-xs tracking-widest uppercase hover:text-[var(--heading-light)] transition-colors duration-300"
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  const links = ["Our Story", "Details", "Gallery", "Play a Game"];

  const navBg = scrolled || menuOpen
    ? "color-mix(in srgb, var(--background-light) 97%, transparent)"
    : "color-mix(in srgb, var(--background-light) 38%, transparent)";
  const navBlur = scrolled || menuOpen ? "blur(12px)" : "blur(8px)";
  const navBorder = scrolled || menuOpen
    ? "1px solid color-mix(in srgb, var(--accent-muted) 20%, transparent)"
    : "1px solid color-mix(in srgb, var(--background-light) 24%, transparent)";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "py-4" : "py-5"}`}
      style={{ background: navBg, backdropFilter: navBlur, borderBottom: navBorder }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span style={{ color: scrolled || menuOpen ? "var(--heading-dark)" : "var(--heading-light)" }}>
            <SvgArtwork source={navigationMonogramSvg} className="size-8" />
          </span>
          <span className="section-label" style={{ color: "var(--heading-dark)" }}>Chi Tai and Christine</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="section-label transition-colors duration-200 hover:text-[var(--heading-dark)]"
              style={{ color: "var(--text-muted)" }}>
              {link}
            </a>
          ))}
          <a href="#rsvp"
            className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[var(--background-dark)] hover:text-[var(--heading-light)]"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.18em", border: "1px solid var(--heading-dark)", color: "var(--heading-dark)", fontSize: "0.62rem" }}>
            RSVP Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px transition-all duration-300 origin-center"
            style={{ background: "var(--background-dark)", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}/>
          <span className="block h-px transition-all duration-300"
            style={{ background: "var(--background-dark)", width: menuOpen ? "0px" : "20px", opacity: menuOpen ? 0 : 1 }}/>
          <span className="block w-5 h-px transition-all duration-300 origin-center"
            style={{ background: "var(--background-dark)", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}/>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{ maxHeight: menuOpen ? "320px" : "0px" }}
      >
        <div className="px-6 pb-6 pt-3 flex flex-col gap-1" style={{ borderTop: "1px solid color-mix(in srgb, var(--accent-muted) 20%, transparent)" }}>
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 transition-colors duration-200"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                color: "var(--heading-dark)",
                borderBottom: i < links.length - 1 ? "1px solid color-mix(in srgb, var(--accent-muted) 15%, transparent)" : "none",
              }}
            >
              {link}
              <span style={{ color: "var(--accent-muted)", fontSize: "0.7rem" }}>→</span>
            </a>
          ))}
          <a
            href="#rsvp"
            onClick={() => setMenuOpen(false)}
            className="mt-3 py-3 text-center text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[var(--background-dark)] hover:text-[var(--heading-light)]"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em", border: "1px solid var(--heading-dark)", color: "var(--heading-dark)" }}
          >
            RSVP Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const { days, hours, minutes } = useWeddingCountdown();
  const countdown = [
    [String(days), "Days"],
    [String(hours).padStart(2, "0"), "Hours"],
    [String(minutes).padStart(2, "0"), "Minutes"],
  ];

  return (
    <section className="relative h-screen flex items-end pb-24 overflow-hidden" style={{ background: "var(--background-dark)" }}>
      <img
        src={couplePhoto}
        alt="ChiTai and Christine"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--background-dark) 92%, transparent) 0%, color-mix(in srgb, var(--background-dark) 20%, transparent) 60%, color-mix(in srgb, var(--background-dark) 10%, transparent) 100%)" }}/>

      {/* Floral corner accents */}
      <div className="absolute top-0 left-0 w-40 md:w-56 h-64 md:h-80 pointer-events-none opacity-60">
        <FloralBranchLeft />
      </div>
      <div className="absolute top-0 right-0 w-40 md:w-56 h-64 md:h-80 pointer-events-none opacity-60">
        <FloralBranchRight />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 w-full">
        <div className="max-w-2xl">
          <p className="section-label mb-5" style={{ color: "var(--accent-muted)" }}>5 · 01 · 2027</p>
          <h1 className="text-[var(--heading-light)] mb-4 leading-none"
            style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 400, letterSpacing: "0.04em" }}>
            Chi Tai
            <br />
            <span style={{ fontStyle: "italic", color: "var(--accent-muted)" }}>&amp;</span>{" "}
            Christine
          </h1>
          <p className="text-[var(--floral-petal-light)] mt-6 max-w-sm leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.05rem", fontWeight: 300 }}>
            Filler Text
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-12 flex gap-8">
          {countdown.map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-[var(--heading-light)]" style={{ fontFamily: "'Cinzel', serif", fontSize: "2rem", fontWeight: 400, lineHeight: 1 }}>{val}</div>
              <div className="section-label mt-1" style={{ color: "var(--text-muted)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
        <div className="animate-scroll-indicator w-px h-10 bg-gradient-to-b from-[var(--accent-muted)] to-transparent"/>
      </div>
    </section>
  );
}

// ─── Our Story ────────────────────────────────────────────────────────────────

const storyMilestones = [
  {
    year: "2019",
    title: "First Meeting",
    body: "Something about something",
    img: bridgePic,
    alt: "The couple, early days",
  },
  {
    year: "2021",
    title: "First Trip Together",
    body: "Something about something",
    img: blurPic,
    alt: "Travel portrait",
  },
  {
    year: "2024",
    title: "The Proposal",
    body: "Something about something",
    img: ringPic,
    alt: "Engagement portrait",
  },
];

function OurStorySection() {
  return (
    <section id="our-story" className="relative py-32" style={{ background: "var(--background-light)" }}>
      <ScrollFruit side="right" variant="citrus" top="18%" />
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-16 flex items-start justify-between flex-wrap gap-8">
          <div>
            <p className="section-label mb-4">Our Story</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "var(--heading-dark)", letterSpacing: "0.05em" }}>
              How It Began
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "var(--text-muted)", fontWeight: 300, fontSize: "1rem" }}>
            "Love is patient, Love is kind, or some other quote or verse."
            <br/><span className="section-label not-italic" style={{ color: "var(--accent-muted)", fontFamily: "'DM Sans', sans-serif" }}>— 1 Corinthians 13: 4-7</span>
          </p>
        </div>

        <div className="space-y-0">
          {storyMilestones.map((m, i) => (
            <div key={m.year} className={`grid md:grid-cols-2 gap-0 border-t border-[var(--border-light)] ${i === storyMilestones.length - 1 ? "border-b" : ""}`}>
              {/* Text side */}
              <div className={`py-16 pr-16 flex flex-col justify-center ${i % 2 === 1 ? "md:order-2 md:pl-16 md:pr-0" : ""}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="section-label">{m.year}</span>
                  <span className="w-8 h-px bg-[var(--accent-muted)]"/>
                </div>
                <h3 className="mb-4" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--heading-dark)", letterSpacing: "0.05em" }}>
                  {m.title}
                </h3>
                <p className="leading-relaxed text-[0.95rem]" style={{ fontFamily: "'Fraunces', serif", color: "var(--text-dark)", fontWeight: 300, lineHeight: 1.8 }}>
                  {m.body}
                </p>
              </div>
              {/* Image side */}
              <div className={`relative overflow-hidden ${i % 2 === 1 ? "md:order-1" : ""}`} style={{ minHeight: 360 }}>
                <img src={m.img} alt={m.alt} className="absolute inset-0 w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-105"/>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--background-dark) 8%, transparent), transparent)" }}/>
                {/* Year overlay */}
                <div className="absolute bottom-6 left-6">
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: "4rem", fontWeight: 700, color: "color-mix(in srgb, var(--background-card) 12%, transparent)", lineHeight: 1 }}>
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
  const { days } = useWeddingCountdown();
  const details = [
    {
      label: "Tea Ceremony",
      time: "10:00 AM",
      title: "The Bride's House",
      sub: "11869 SW 2nd St, Yukon, OK 73099",
      note: "Filler TExt",
      icon: <SvgArtwork source={locationIconSvg} className="size-8" />,
    },
    {
      label: "Wedding Ceremony",
      time: "1:00 PM",
      title: "St. Andrew Dung Lac Catholic Church",
      sub: "3115 SW 59th St, Oklahoma City, OK 73159",
      note: "Filler Text",
      icon: <SvgArtwork source={calendarIconSvg} className="size-8" />,
    },
    {
      label: "Reception",
      time: "6:00-11:00 PM",
      title: "Civic Center Music Hall",
      sub: "201 N Walker Ave, Oklahoma City, OK 73102",
      note: "5:00-6:00 PM - Cocktail Hour @Civic Center Music Hall.",
      icon: <SvgArtwork source={venueIconSvg} className="size-8" />,
    },
  ];

  return (
    <section id="details" className="relative py-32" style={{ background: "var(--background-dark)" }}>
      <ScrollFruit side="left" variant="pear" top="24%" />
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-16 text-center">
          <p className="section-label mb-4" style={{ color: "var(--text-light)" }}>Wedding Details</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "var(--heading-light)", letterSpacing: "0.05em" }}>
            The Celebration
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px" style={{ background: "color-mix(in srgb, var(--accent-muted) 15%, transparent)" }}>
          {details.map(d => (
            <div key={d.label} className="p-10 flex flex-col gap-6" style={{ background: "var(--background-dark)" }}>
              {d.icon}
              <div>
                <p className="section-label mb-2" style={{ color: "var(--text-light)" }}>{d.label}</p>
                <p className="text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-light)", letterSpacing: "0.1em" }}>{d.time}</p>
                <h3 className="mb-2" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--heading-light)", letterSpacing: "0.04em" }}>{d.title}</h3>
                <p className="text-xs mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-light)", lineHeight: 1.6 }}>{d.sub}</p>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "var(--text-light)", fontWeight: 300, opacity: 0.82 }}>{d.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Date highlight bar */}
        <div className="mt-px p-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "color-mix(in srgb, var(--accent-muted) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-muted) 15%, transparent)" }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", color: "var(--text-light)", letterSpacing: "0.2em" }}>
            Saturday, May 1, 2027
          </p>
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-light)", fontWeight: 300 }}>
            {days} {days === 1 ? "day" : "days"} remaining
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

const galleryImages = [
  { src: farTreePic, alt: "The couple", span: "row-span-2" },
  { src: floralAndFruits4, alt: "White florals", span: "" },
  { src: benchPic, alt: "Floral arrangement", span: "" },
  { src: floralAndFruits1, alt: "Pink roses", span: "row-span-2" },
  { src: grassPic, alt: "Wedding dress portrait", span: "" },
  { src: floralAndFruits2, alt: "Wedding dress portrait", span: "" },
  { src: housePic, alt: "White flower", span: "" },
  { src: floralAndFruits3, alt: "Wedding dress portrait", span: "" },
];

function GallerySection() {
  return (
    <section id="gallery" className="relative py-32" style={{ background: "var(--background-light)" }}>
      <ScrollFruit side="right" variant="cherries" top="42%" />
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="section-label mb-4">Gallery</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "var(--heading-dark)", letterSpacing: "0.05em" }}>
              Our Moments
            </h2>
          </div>
          <p className="section-label" style={{ color: "var(--accent-muted)" }}>08 images</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <div key={i} className={`relative overflow-hidden group cursor-pointer ${img.span}`} style={{ background: "var(--border-light)" }}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--background-dark) 60%, transparent) 0%, transparent 60%)" }}>
                <span className="section-label text-[var(--heading-light)]">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Connections Game ────────────────────────────────────────────────────────

const connectionGroups = [
  {
    key: "C & C",
    title: "Things with C and C initialism",
    words: ["Chi Tai Pham and Christine Hoang", "Campus Corner", "Closed Captions", "Carbon Copy"],
    color: "var(--game-rose)",
  },
  {
    key: "Famous Couples",
    title: "Artist and Athlete Couples (Chi Tai wishes he was here)",
    words: ["Madison Beer and Justin Herbert", "Megan Thee Stallion and Klay Tompson", "Taylor Swift and Travis Kelce", "Hailey Steinfeld and Josh Allen"],
    color: "var(--game-sage)",
  },
  {
    key: "sports",
    title: "Different Sports",
    words: ["Cross Country", "Basketball", "Water Polo", "Football"],
    color: "var(--game-blush)",
  },
  {
    key: "intellectual property",
    title: "Types of Intellectual Property",
    words: ["Creative Commons", "Trademark", "Patent", "Copyright"],
    color: "var(--game-gold)",
  },
];

const shuffleConnectionWords = () =>
  connectionGroups
    .flatMap((group) => group.words)
    .sort(() => Math.random() - 0.5);

function ConnectionsGameSection() {
  const [words, setWords] = useState(shuffleConnectionWords);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<string[]>([]);
  const [mistakesLeft, setMistakesLeft] = useState(4);
  const [gameLost, setGameLost] = useState(false);
  const [message, setMessage] = useState("Select four words that share a connection.");

  const remainingWords = words.filter(
    (word) =>
      !connectionGroups.some(
        (group) => solved.includes(group.key) && group.words.includes(word),
      ),
  );
  const gameWon = solved.length === connectionGroups.length && !gameLost;

  const toggleWord = (word: string) => {
    if (gameWon || gameLost) return;
    setSelected((current) => {
      if (current.includes(word)) return current.filter((item) => item !== word);
      if (current.length === 4) return current;
      return [...current, word];
    });
    setMessage("Select four words that share a connection.");
  };

  const submitGuess = () => {
    if (selected.length !== 4) return;

    const match = connectionGroups.find(
      (group) =>
        !solved.includes(group.key) &&
        group.words.every((word) => selected.includes(word)),
    );

    if (match) {
      const nextSolved = [...solved, match.key];
      setSolved(nextSolved);
      setSelected([]);
      setMessage(
        nextSolved.length === connectionGroups.length
          ? "Perfect! You found every connection."
          : "Connection found.",
      );
      return;
    }

    const isOneAway = connectionGroups.some(
      (group) =>
        !solved.includes(group.key) &&
        group.words.filter((word) => selected.includes(word)).length === 3,
    );
    const nextMistakes = mistakesLeft - 1;
    setMistakesLeft(nextMistakes);
    setSelected([]);
    setMessage(
      nextMistakes === 0
        ? "So close. The remaining connections are revealed below."
        : isOneAway
          ? "One away..."
          : "Not quite. Try another combination.",
    );

    if (nextMistakes === 0) {
      setGameLost(true);
      setSolved(connectionGroups.map((group) => group.key));
    }
  };

  const resetGame = () => {
    setWords(shuffleConnectionWords());
    setSelected([]);
    setSolved([]);
    setMistakesLeft(4);
    setGameLost(false);
    setMessage("Select four words that share a connection.");
  };

  return (
    <section id="play-a-game" className="relative py-32" style={{ background: "var(--game-background)" }}>
      <ScrollFruit side="left" variant="citrus" top="58%" />
      <div className="relative max-w-4xl mx-auto px-5 md:px-8" style={{ zIndex: 6 }}>
        <div className="text-center mb-12">
          <p className="section-label mb-4">A Little Interlude</p>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "var(--heading-dark)",
              letterSpacing: "0.05em",
            }}
          >
            Make the Connection
          </h2>
          <p
            className="mt-5 mx-auto max-w-xl leading-relaxed"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              color: "var(--text-dark)",
              fontWeight: 300,
            }}
          >
            Find four groups of four words. Each group is linked by a common theme.
          </p>
        </div>

        <div
          className="p-4 md:p-8"
          style={{
            background: "color-mix(in srgb, var(--background-light) 82%, transparent)",
            border: "1px solid color-mix(in srgb, var(--accent-muted) 35%, transparent)",
          }}
        >
          <div className="space-y-2 mb-2">
            {connectionGroups
              .filter((group) => solved.includes(group.key))
              .map((group) => (
                <div
                  key={group.key}
                  className="relative h-32 md:h-28 overflow-hidden flex flex-col items-center justify-center px-4 text-center animate-photo-reveal"
                  style={{ background: gameLost ? group.color : "var(--background-dark)" }}
                >
                  {!gameLost && (
                    <>
                      <img
                        src={couplePhoto}
                        alt=""
                        aria-hidden="true"
                        className="absolute left-0 w-full h-[400%] max-w-none object-cover pointer-events-none"
                        style={{
                          top: `${-connectionGroups.indexOf(group) * 100}%`,
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, color-mix(in srgb, var(--background-dark) 78%, transparent), color-mix(in srgb, var(--background-dark) 38%, transparent), color-mix(in srgb, var(--background-dark) 70%, transparent))",
                        }}
                      />
                    </>
                  )}
                  <p
                    className="relative uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      letterSpacing: "0.16em",
                      color: gameLost ? "var(--heading-dark)" : "var(--heading-light)",
                    }}
                  >
                    {group.title}
                  </p>
                  <p
                    className="relative mt-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      color: gameLost ? "var(--heading-dark)" : "var(--text-light)",
                    }}
                  >
                    {group.words.join(", ")}
                  </p>
                </div>
              ))}
          </div>

          {!gameWon && !gameLost && (
            <div className="grid grid-cols-4 gap-2">
              {remainingWords.map((word) => {
                const isSelected = selected.includes(word);
                return (
                  <button
                    key={word}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleWord(word)}
                    className="aspect-[1.15/1] md:aspect-[1.8/1] px-1 flex items-center justify-center text-center transition-all duration-200"
                    style={{
                      background: isSelected ? "var(--heading-dark)" : "var(--background-card)",
                      color: isSelected ? "var(--heading-light)" : "var(--heading-dark)",
                      border: isSelected
                        ? "1px solid var(--heading-dark)"
                        : "1px solid color-mix(in srgb, var(--accent-muted) 25%, transparent)",
                      transform: isSelected ? "translateY(-2px)" : "none",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(0.55rem, 2vw, 0.78rem)",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          )}

          <div className="text-center pt-8">
            <p
              aria-live="polite"
              className="min-h-6"
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                color: "var(--text-dark)",
              }}
            >
              {message}
            </p>

            {!gameWon && !gameLost && (
              <>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="section-label mr-1" style={{ color: "var(--text-muted)" }}>
                    Mistakes remaining
                  </span>
                  {[0, 1, 2, 3].map((mistake) => (
                    <span
                      key={mistake}
                      className="size-2.5 rounded-full"
                      style={{
                        background:
                          mistake < mistakesLeft ? "var(--accent-muted)" : "color-mix(in srgb, var(--accent-muted) 20%, transparent)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="px-5 md:px-6 py-3 section-label transition-colors duration-200 hover:bg-[var(--background-soft)]"
                    style={{ color: "var(--heading-dark)", border: "1px solid color-mix(in srgb, var(--background-dark) 30%, transparent)" }}
                  >
                    Deselect All
                  </button>
                  <button
                    type="button"
                    onClick={submitGuess}
                    disabled={selected.length !== 4}
                    className="px-7 py-3 section-label transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ color: "var(--heading-light)", background: "var(--background-dark)" }}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}

            {(gameWon || gameLost) && (
              <button
                type="button"
                onClick={resetGame}
                className="mt-6 px-8 py-3 section-label transition-all duration-200 hover:bg-[var(--background-dark)] hover:text-[var(--heading-light)]"
                style={{ color: "var(--heading-dark)", border: "1px solid var(--heading-dark)" }}
              >
                Play Again
              </button>
            )}
          </div>
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

  const inputClass = "w-full bg-transparent border-b border-[var(--accent-muted)] border-opacity-40 py-3 text-sm text-[var(--heading-dark)] placeholder-[var(--placeholder-text)] focus:outline-none focus:border-[var(--heading-dark)] transition-colors duration-200";
  const labelClass = "section-label block mb-2";

  return (
    <section id="rsvp" className="relative py-32" style={{ background: "var(--background-soft)" }}>
      <ScrollFruit side="right" variant="pear" top="20%" />
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">Kindly Reply By</p>
            <h2 className="mb-6" style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, color: "var(--heading-dark)", letterSpacing: "0.05em" }}>
              May 1, 2027
            </h2>
            <p className="leading-relaxed mb-10" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "1.05rem", color: "var(--text-dark)", fontWeight: 300, lineHeight: 1.9 }}>
              We would be honored by your presence as we exchange vows and celebrate with those who mean the most to us. Please let us know if you can join us in Tuscany.
            </p>

            {/* Decorative Logomark */}
            <div className="opacity-80">
              <Logomark size={140} />
            </div>
          </div>

          {/* Right - Form */}
          <div>
            {submitted ? (
              <div className="text-center py-16">
                <div className="mb-6">
                  <SvgArtwork source={successCheckSvg} className="mx-auto size-[60px]" />
                </div>
                <h3 className="mb-3" style={{ fontFamily: "'Cinzel', serif", fontSize: "1.5rem", color: "var(--heading-dark)", letterSpacing: "0.05em" }}>
                  Thank You, {form.name.split(" ")[0]}
                </h3>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "var(--text-muted)", fontWeight: 300 }}>
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
                  <textarea name="message" value={form.message} onChange={handle} rows={3} placeholder="A note for Chi Tai and Christine…" className={inputClass + " resize-none"} style={{ fontFamily: "'DM Sans', sans-serif" }}/>
                </div>
                <button type="submit"
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[var(--background-dark)] hover:text-[var(--heading-light)]"
                  style={{ fontFamily: "'DM Sans', sans-serif", border: "1px solid var(--heading-dark)", color: "var(--heading-dark)", background: "transparent" }}>
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
    <footer className="py-16 text-center border-t" style={{ background: "var(--background-dark)", borderColor: "color-mix(in srgb, var(--accent-muted) 15%, transparent)" }}>
      <Logomark size={100} onDark />
      <p className="mt-8 section-label" style={{ color: "var(--text-light)" }}>
        Chi Tai and Christine · Saturday May 1, 2027 · Oklahoma City, Oklahoma
      </p>
      <p className="mt-3" style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: "0.85rem", color: "var(--text-light)", fontWeight: 300 }}>
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
        <ConnectionsGameSection />
        <RSVPSection />
        <Footer />
      </div>
    </div>
  );
}
