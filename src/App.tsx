import { useEffect, useMemo, useRef, useState } from "react"
import calendarIconSvg from "./imports/calendar-icon.svg?raw"
import cherriesFruitSvg from "./imports/cherries-fruit.svg?raw"
import citrusFruitSvg from "./imports/citrus-fruit.svg?raw"
import couplePhoto from "./imports/ChixTine/grasspic.jpg"
import floralBranchSvg from "./imports/floral-branch.svg?raw"
import floralGarlandSvg from "./imports/floral-garland.svg?raw"
import locationIconSvg from "./imports/location-icon.svg?raw"
import pearFruitSvg from "./imports/pear-fruit.svg?raw"
import successCheckSvg from "./imports/success-check.svg?raw"
import venueIconSvg from "./imports/venue-icon.svg?raw"
import weddingLogo from "./imports/wedding-monogram.svg"

import orange_flowers from "./imports/orange_flowers.svg"
import lemons from "./imports/lemons.svg"
import oranges from "./imports/oranges.svg"
import yellow_flowers from "./imports/yellow_flowers.svg"
import strawberries from "./imports/strawberries.svg"
import orange_flowers from "./imports/orange_flowers.svg"

import grasspic from "./imports/ChixTine/grasspic.jpg"
import coveredkiss from "./imports/ChixTine/CS_16565_websize.jpg"
import benchpic from "./imports/ChixTine/benchpic.jpg"
import bridgepic from "./imports/ChixTine/bridgepic.jpg"
import housepic from "./imports/ChixTine/CS_17575_websize.jpg"
import blurpic from "./imports/ChixTine/blurpic.jpg"

import floral_and_fruits from "./imports/ChixTine/photos/floral_and_fruits.png"
import floral_and_fruits2 from "./imports/ChixTine/photos/floral_and_fruits2.png"
import floral_and_fruits3 from "./imports/ChixTine/photos/floral_and_fruits3.png"
import floral_and_fruits4 from "./imports/ChixTine/photos/floral_and_fruits4.png"

const WEDDING_DATE = new Date("2027-05-01T13:00:00-05:00").getTime()

function getCountdown() {
  const remaining = Math.max(WEDDING_DATE - Date.now(), 0)
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor((remaining / 3_600_000) % 24),
    minutes: Math.floor((remaining / 60_000) % 60),
  }
}

function useCountdown() {
  const [countdown, setCountdown] = useState(getCountdown)
  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  return countdown
}

function Artwork({
  source,
  className = "",
}: {
  source: string
  className?: string
}) {
  return (
    <span
      className={`artwork ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: source }}
    />
  )
}

function RollingFruit({
  source,
  side,
  className,
}: {
  source: string
  side: "left" | "right"
  className: string
}) {
  const fruitRef = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fruit = fruitRef.current
    if (!fruit) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "-5% 0px -8% 0px", threshold: 0 },
    )

    observer.observe(fruit)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={fruitRef}
      className={`${className} rolling-fruit-shell rolling-fruit-shell--${side} ${
        visible ? "is-visible" : ""
      }`}
      aria-hidden="true"
    >
      <Artwork source={source} className="rolling-fruit" />
    </span>
  )
}

function Monogram({ className = "" }: { className?: string }) {
  return (
    <img src={weddingLogo} className={className} alt="" aria-hidden="true" />
  )
}

function Intro({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leave = window.setTimeout(() => setLeaving(true), 2600)
    const done = window.setTimeout(onComplete, 3400)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
    }
  }, [onComplete])

  const skip = () => {
    setLeaving(true)
    window.setTimeout(onComplete, 700)
  }

  return (
    <div className={`intro ${leaving ? "intro--leaving" : ""}`}>
      <Artwork
        source={floralBranchSvg}
        className="intro__branch intro__branch--left"
      />
      <Artwork
        source={floralBranchSvg}
        className="intro__branch intro__branch--right"
      />
      <div className="intro__seal">
        <Monogram className="intro__logo" />
        <p>Chi Tai & Christine</p>
        <span>05 · 01 · 2027</span>
      </div>
      <button className="intro__skip" onClick={skip} type="button">
        Skip intro
      </button>
    </div>
  )
}

const navLinks = [
  ["Our Story", "our-story"],
  ["Details", "details"],
  ["Gallery", "gallery"],
  ["Play", "play-a-game"],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a
        href="#home"
        className="nav__brand"
        aria-label="Chi Tai and Christine, home"
      >
        <Monogram />
        <span>Chi Tai & Christine</span>
      </a>
      <div className={`nav__links ${open ? "nav__links--open" : ""}`}>
        {navLinks.map(([label, id]) => (
          <a href={`#${id}`} key={id} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          href="#rsvp"
          className="pill pill--small"
          onClick={() => setOpen(false)}
        >
          RSVP
        </a>
      </div>
      <button
        className={`menu-button ${open ? "menu-button--open" : ""}`}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  )
}

function Hero() {
  const { days, hours, minutes } = useCountdown()
  return (
    <header className="hero paper-grain" id="home">
      <Artwork source={floralGarlandSvg} className="hero__garland" />
      <RollingFruit
        source={citrusFruitSvg}
        side="left"
        className="hero__citrus hero__citrus--left"
      />
      <RollingFruit
        source={cherriesFruitSvg}
        side="right"
        className="hero__citrus hero__citrus--right"
      />
      <div className="hero__copy">
        <p className="eyebrow">Welcome to our wedding website</p>
        <h1>
          Chi Tai <em>&</em>
          <strong>Christine</strong>
        </h1>
        <p className="hero__tagline">Something you want to say</p>
        <div className="hero__date">
          <span>Saturday</span>
          <b>May 1, 2027</b>
          <span>Oklahoma City</span>
        </div>
      </div>
      <div className="polaroid hero__photo">
        <span className="tape" />
        <img src={grasspic} alt="Chi Tai and Christine together" />
        <p>what a nice picture ♡</p>
      </div>
      <div
        className="countdown"
        aria-label={`${days} days, ${hours} hours, ${minutes} minutes until the wedding`}
      >
        {[
          [days, "days"],
          [String(hours).padStart(2, "0"), "hours"],
          [String(minutes).padStart(2, "0"), "minutes"],
        ].map(([value, label], index) => (
          <div
            className={`countdown__item countdown__item--${index + 1}`}
            key={label}
          >
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </header>
  )
}

const milestones = [
  [
    "1987",
    "First Meeting",
    "In the time of dinosaurs.",
  ],
  [
    "2021",
    "First Date",
    "applebees",
  ],
  [
    "2025",
    "The Proposal",
    "Some more information",
  ],
]

function OurStory() {
  const [active, setActive] = useState(0)
  return (
    <section className="story section" id="our-story">
      <Artwork source={floralBranchSvg} className="story__flowers" />
      <div className="story__collage">
        <div className="blob" />
        <div className="polaroid story__photo">
          <span className="tape" />
          <img src={coveredkiss} alt="Chi Tai and Christine sharing a moment" />
        </div>
        <RollingFruit
          source={citrusFruitSvg}
          side="right"
          className="story__fruit"
        />
      </div>
      <div className="story__copy">
        <p className="eyebrow">Our story</p>
        <h2>Something corny</h2>
        <p className="story__intro">
          Idk a paragraph.
        </p>
        <div
          className="timeline-tabs"
          role="tablist"
          aria-label="Our story timeline"
        >
          {milestones.map(([year], index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              key={year}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="story-card" role="tabpanel">
          <span>{milestones[active][0]}</span>
          <h3>{milestones[active][1]}</h3>
          <p>{milestones[active][2]}</p>
        </div>
      </div>
    </section>
  )
}

const eventDetails = [
  {
    icon: locationIconSvg,
    label: "Tea Ceremony",
    time: "10:00 AM",
    title: "The Bride's House",
    address: "11869 SW 2nd St, Yukon, OK 73099",
  },
  {
    icon: calendarIconSvg,
    label: "Wedding Ceremony",
    time: "1:00 PM",
    title: "St. Andrew Dung Lac Catholic Church",
    address: "3115 SW 59th St, Oklahoma City, OK 73159",
  },
  {
    icon: venueIconSvg,
    label: "Reception",
    time: "6:00–11:00 PM",
    title: "Civic Center Music Hall",
    address: "201 N Walker Ave, Oklahoma City, OK 73102",
  },
]

function Details() {
  return (
    <section className="details section scallop" id="details">
      <RollingFruit
        source={pearFruitSvg}
        side="left"
        className="details__pear"
      />
      <div className="section-heading">
        <p className="eyebrow">Where & when</p>
        <h2>The wedding day</h2>
        <p>Saturday, May 1, 2027 · Oklahoma City, Oklahoma</p>
      </div>
      <div className="details__grid">
        {eventDetails.map((detail, index) => (
          <article
            className={`event-card event-card--${index + 1}`}
            key={detail.label}
          >
            <Artwork source={detail.icon} />
            <p className="eyebrow">{detail.label}</p>
            <b>{detail.time}</b>
            <h3>{detail.title}</h3>
            <p>{detail.address}</p>
            {index === 2 && <small>Cocktail hour begins at 5:00 PM</small>}
          </article>
        ))}
      </div>
    </section>
  )
}

const galleryItems = [
  { caption: "", image: bridgepic },
  { caption: "", image: floral_and_fruits3 },  
  { caption: "", image: housepic },
  { caption: "", image: floral_and_fruits },
  { caption: "", image: blurpic },
  { caption: "", image: floral_and_fruits2 },
];

function Gallery() {
  return (
    <section className="gallery section" id="gallery">
      <RollingFruit
        source={cherriesFruitSvg}
        side="right"
        className="gallery__cherries"
      />
      <div className="section-heading">
        <p className="eyebrow">A few favorites</p>
        <h2>Our moments</h2>
      </div>

      <div className="gallery__grid">
        {galleryItems.map((item, index) => (
          <figure
            className={`polaroid gallery__photo gallery__photo--${index + 1}`}
            key={item.caption}
          >
            <span className="tape" />
            <img src={item.image} alt={item.caption} />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const connectionGroups = [
  {
    key: "C & C",
    title: "Things with C and C initialism",
    words: [
      "Chi Tai Pham and Christine Hoang",
      "Campus Corner",
      "Closed Captions",
      "Carbon Copy",
    ],
    className: "coral",
  },
  {
    key: "Famous Couples",
    title: "Artist and Athlete Couples",
    words: [
      "Madison Beer and Justin Herbert",
      "Megan Thee Stallion and Klay Thompson",
      "Taylor Swift and Travis Kelce",
      "Hailee Steinfeld and Josh Allen",
    ],
    className: "green",
  },
  {
    key: "sports",
    title: "Different Sports",
    words: ["Cross Country", "Basketball", "Water Polo", "Football"],
    className: "orange",
  },
  {
    key: "intellectual property",
    title: "Types of Intellectual Property",
    words: ["Creative Commons", "Trademark", "Patent", "Copyright"],
    className: "yellow",
  },
]

const shuffledWords = () =>
  connectionGroups
    .flatMap((group) => group.words)
    .sort(() => Math.random() - 0.5)

function ConnectionsGame() {
  const [words, setWords] = useState(shuffledWords)
  const [selected, setSelected] = useState<string[]>([])
  const [solved, setSolved] = useState<string[]>([])
  const [mistakes, setMistakes] = useState(4)
  const [lost, setLost] = useState(false)
  const [message, setMessage] = useState(
    "Select four words that share a connection.",
  )
  const won = solved.length === connectionGroups.length && !lost
  const remaining = words.filter(
    (word) =>
      !connectionGroups.some(
        (group) => solved.includes(group.key) && group.words.includes(word),
      ),
  )

  const choose = (word: string) => {
    if (won || lost) return
    setSelected((current) =>
      current.includes(word)
        ? current.filter((item) => item !== word)
        : current.length < 4
          ? [...current, word]
          : current,
    )
    setMessage("Select four words that share a connection.")
  }

  const submit = () => {
    if (selected.length !== 4) return
    const match = connectionGroups.find(
      (group) =>
        !solved.includes(group.key) &&
        group.words.every((word) => selected.includes(word)),
    )
    if (match) {
      const next = [...solved, match.key]
      setSolved(next)
      setSelected([])
      setMessage(
        next.length === 4
          ? "Perfect! You found every connection."
          : "Connection found!",
      )
      return
    }
    const oneAway = connectionGroups.some(
      (group) =>
        !solved.includes(group.key) &&
        group.words.filter((word) => selected.includes(word)).length === 3,
    )
    const next = mistakes - 1
    setMistakes(next)
    setSelected([])
    setMessage(
      next === 0
        ? "So close! Here are the remaining groups."
        : oneAway
          ? "One away…"
          : "Not quite—try again.",
    )
    if (next === 0) {
      setLost(true)
      setSolved(connectionGroups.map((group) => group.key))
    }
  }

  const reset = () => {
    setWords(shuffledWords())
    setSelected([])
    setSolved([])
    setMistakes(4)
    setLost(false)
    setMessage("Select four words that share a connection.")
  }

  return (
    <section className="game section scallop" id="play-a-game">
      <RollingFruit
        source={citrusFruitSvg}
        side="left"
        className="game__fruit"
      />
      <div className="section-heading">
        <p className="eyebrow">A little interlude</p>
        <h2>Make the connection</h2>
        <p>Find four groups of four words. Each group shares a secret theme.</p>
      </div>
      <div className="game-board">
        <div className="solved-groups">
          {connectionGroups
            .filter((group) => solved.includes(group.key))
            .map((group) => (
              <div
                className={`solved-group ${group.className}`}
                key={group.key}
              >
                {!lost && <img src={couplePhoto} alt="" aria-hidden="true" />}
                <div>
                  <b>{group.title}</b>
                  <span>{group.words.join(" · ")}</span>
                </div>
              </div>
            ))}
        </div>
        {!won && !lost && (
          <div className="word-grid">
            {remaining.map((word) => (
              <button
                type="button"
                className={selected.includes(word) ? "selected" : ""}
                aria-pressed={selected.includes(word)}
                onClick={() => choose(word)}
                key={word}
              >
                {word}
              </button>
            ))}
          </div>
        )}
        <p className="game__message" aria-live="polite">
          {message}
        </p>
        {!won && !lost ? (
          <>
            <div className="mistakes">
              <span>Mistakes remaining</span>
              {[0, 1, 2, 3].map((index) => (
                <i className={index < mistakes ? "filled" : ""} key={index} />
              ))}
            </div>
            <div className="game__actions">
              <button
                type="button"
                className="pill pill--outline"
                onClick={() => setSelected([])}
              >
                Deselect all
              </button>
              <button
                type="button"
                className="pill"
                disabled={selected.length !== 4}
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <button type="button" className="pill" onClick={reset}>
            Play again
          </button>
        )}
      </div>
    </section>
  )
}

function RSVP() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "yes",
    dietary: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const firstName = useMemo(() => form.name.trim().split(" ")[0], [form.name])
  const update = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))

  return (
    <section className="rsvp section" id="rsvp">
      <Artwork
        source={floralBranchSvg}
        className="rsvp__flowers rsvp__flowers--left"
      />
      <Artwork
        source={floralBranchSvg}
        className="rsvp__flowers rsvp__flowers--right"
      />
      <div className="rsvp__card">
        <div className="rsvp__intro">
          <p className="eyebrow">Kindly reply</p>
          <h2>Will you join us?</h2>
          <p>
            We would be honored to celebrate with you. Please send your reply by
            March 1, 2027.
          </p>
          <Monogram />
        </div>
        {submitted ? (
          <div className="rsvp__thanks">
            <Artwork source={successCheckSvg} />
            <h3>Thank you, {firstName || "friend"}!</h3>
            <p>We can&apos;t wait to celebrate with you.</p>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            <label>
              Full name
              <input
                required
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Your name"
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                placeholder="you@email.com"
              />
            </label>
            <div className="form-row">
              <label>
                Attending?
                <select
                  name="attending"
                  value={form.attending}
                  onChange={update}
                >
                  <option value="yes">Joyfully accepts</option>
                  <option value="no">Regretfully declines</option>
                </select>
              </label>
              <label>
                Guests
                <select name="guests" value={form.guests} onChange={update}>
                  {["1", "2", "3", "4"].map((number) => (
                    <option key={number}>{number}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Dietary requirements
              <input
                name="dietary"
                value={form.dietary}
                onChange={update}
                placeholder="Allergies or preferences"
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={update}
                rows={3}
                placeholder="A note for the happy couple…"
              />
            </label>
            <button className="pill" type="submit">
              Send RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <Artwork source={floralGarlandSvg} />
      <Monogram />
      <h2>Chi Tai & Christine</h2>
      <p>May 1, 2027 · Oklahoma City, Oklahoma</p>
      <span>Made with love for our favorite people</span>
    </footer>
  )
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  return (
    <>
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}
      <Nav />
      <main>
        <Hero />
        <OurStory />
        <Details />
        <Gallery />
        <ConnectionsGame />
        <RSVP />
      </main>
      <Footer />
    </>
  )
}
