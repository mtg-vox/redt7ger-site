import { useState, type ReactNode, type SyntheticEvent } from 'react'
import {
  ArrowUpRight,
  ExternalLink,
  Flame,
  Mic2,
  ShoppingBag,
  Zap,
} from 'lucide-react'
import {
  SiSpotify,
  SiApplemusic,
  SiYoutube,
  SiYoutubemusic,
  SiInstagram,
  SiTiktok,
  SiSoundcloud,
  SiX,
  SiReverbnation,
} from 'react-icons/si'
import './App.css'
import merchData from './merch.generated.json'

const links = {
  spotify: 'https://open.spotify.com/artist/7hrPBz3dtDMzxZSujLTDSD',
  magicTrick: 'https://open.spotify.com/album/5I6BmI2oFpy1MnnuAWmXDt',
  apple: 'https://music.apple.com/us/artist/red-t7ger/1894961385',
  youtube: 'https://www.youtube.com/@Red_T7ger',
  youtubeMusic: 'https://music.youtube.com/channel/UC6fJRbXuBTF19kEia7L_L_A',
  instagram: 'https://www.instagram.com/red_t7ger/',
  tiktok: 'https://www.tiktok.com/@red_t7ger',
  x: 'https://x.com/red_t7ger',
  soundcloud: 'https://soundcloud.com/red_t7ger',
  reverbnation: 'https://www.reverbnation.com/RED_T7GER',
  etsy: 'https://www.etsy.com/shop/RedTigerUnlimited',
}

const brand = {
  logo: '/brand/logo.png',
  tigerIcon: '/brand/tiger-icon.png',
  tigerMark: '/brand/tiger-mark.png',
  portraitWide: '/brand/portrait-wide.jpg',
  portraitSquare: '/brand/portrait-square.jpg',
  dirtyF7ck: '/brand/dirty-f7ck.jpg',
  magicTrick: '/brand/magic-trick.jpg',
}

const platformLinks = [
  { label: 'Spotify',     href: links.spotify,    icon: SiSpotify,     brand: '#1DB954' },
  { label: 'Apple Music', href: links.apple,      icon: SiApplemusic,  brand: '#FA243C' },
  { label: 'YouTube',     href: links.youtube,    icon: SiYoutube,     brand: '#FF0000' },
  { label: 'Instagram',   href: links.instagram,  icon: SiInstagram,   brand: '#E1306C' },
  { label: 'TikTok',      href: links.tiktok,     icon: SiTiktok,      brand: '#ffffff' },
  { label: 'SoundCloud',  href: links.soundcloud, icon: SiSoundcloud,  brand: '#FF5500' },
  { label: 'ReverbNation', href: links.reverbnation, icon: SiReverbnation, brand: '#E43526' },
]

const soundPillars = [
  {
    icon: Mic2,
    title: 'Technical Rap Core',
    body: 'Precision verses, confrontational hooks, and a delivery built for tension instead of background noise.',
  },
  {
    icon: Flame,
    title: 'Rock Impact',
    body: 'Distorted edges, heavy movement, and a dark stage presence aimed at rap-rock and trap-metal listeners.',
  },
  {
    icon: Zap,
    title: 'EDM Pressure',
    body: 'Club-weight low end and Miami-night energy pushed through an underground artist lens.',
  },
]

const upcomingRelease = {
  title: 'Dirty F7ck',
  type: 'New Single',
  year: 'May 1, 2026',
  copy: 'The next RED T7GER single. Heavier hook, sharper teeth, and the brand at full strength.',
  cover: brand.dirtyF7ck,
  href: links.spotify,
}

const catalog = [
  {
    title: 'Magic Trick',
    type: 'Single',
    year: '2026',
    copy: 'The first RED T7GER single: technical rap, rock aggression, and a hook built to hit fast.',
    cover: brand.magicTrick,
    href: links.magicTrick,
  },
]

type MerchItem = {
  id: string
  title: string
  href: string
  image: string
  localImage?: string
  price?: string | null
}

const merch: MerchItem[] = (merchData.items as MerchItem[]).map((m) => ({
  ...m,
  image: m.localImage ?? m.image,
}))

const pressLinks = [
  {
    title: 'Lyrical Rapper B. Totty Working With Infamous Producer LX Xander',
    source: 'The Hype Magazine',
    href: 'https://www.thehypemagazine.com/2023/07/lyrical-rapper-b-totty-working-with-infamous-producer-lx-xander/',
  },
  {
    title: 'Red Hat employee makes viral rap video about Raleigh',
    source: 'ABC11',
    href: 'https://abc11.com/entertainment/red-hat-employee-makes-viral-rap-video-about-raleigh/1185323/',
  },
  {
    title: "Red Hatter raps: 'We love Raleigh'",
    source: 'The News & Observer',
    href: 'https://www.newsobserver.com/news/business/article57970488.html',
  },
]

function ExternalButton({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
}) {
  return (
    <a className={`button button-${variant}`} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  )
}

function ContactForm() {
  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  function validate(data: FormData): string | null {
    const name = (data.get('name') as string)?.trim() ?? ''
    const email = (data.get('email') as string)?.trim() ?? ''
    const message = (data.get('message') as string)?.trim() ?? ''
    if (!name) return 'Please add your name.'
    if (!email) return 'Please add an email address so I can reply.'
    // Pragmatic email check: requires "x@y.z" pattern, no spaces.
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRe.test(email)) {
      if (!email.includes('@')) return "That email is missing the @ symbol."
      if (!email.includes('.')) return "That email is missing the domain (looks like .com is missing)."
      return "That email doesn't look right. Double-check the spelling."
    }
    if (message.length < 10) return 'Add a few more details so I know what you have in mind.'
    if (message.length > 5000) return 'Message is too long. Trim it under ~5000 characters.'
    return null
  }

  function friendlyError(status: number, body: unknown): string {
    // Formspree returns { errors: [{ field, message, code }, ...] } on 4xx.
    const errs =
      body && typeof body === 'object' && 'errors' in body && Array.isArray((body as { errors: unknown }).errors)
        ? ((body as { errors: { field?: string; message?: string; code?: string }[] }).errors)
        : []
    if (errs.length) {
      const first = errs[0]
      const field = first.field ? first.field.charAt(0).toUpperCase() + first.field.slice(1) + ': ' : ''
      return `${field}${first.message ?? 'invalid value'}`
    }
    if (status === 422) return 'Some fields look invalid. Check your email and message and try again.'
    if (status === 429) return 'Too many submissions in a row. Wait a minute and try again.'
    if (status === 403) return 'Submission was blocked (the form may need to be activated by the site owner).'
    if (status === 404) return 'Form endpoint not found. The site owner needs to update it.'
    if (status >= 500) return 'The form service is having a moment. Try again in a few minutes.'
    return `Something went wrong (HTTP ${status}).`
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!endpoint) {
      setStatus('error')
      setErrorMsg('Form endpoint not configured. Set VITE_FORMSPREE_ENDPOINT.')
      return
    }
    const form = e.currentTarget
    const data = new FormData(form)
    if ((data.get('_gotcha') as string)?.length) return // honeypot

    const validationError = validate(data)
    if (validationError) {
      setStatus('error')
      setErrorMsg(validationError)
      return
    }

    setStatus('sending')
    setErrorMsg(null)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        form.reset()
        setStatus('sent')
        return
      }
      let body: unknown = null
      try {
        body = await res.json()
      } catch {
        // body wasn't JSON — fall through to status-based message
      }
      setStatus('error')
      setErrorMsg(friendlyError(res.status, body))
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof TypeError
          ? "Couldn't reach the form service. Check your connection and try again."
          : err instanceof Error
            ? err.message
            : 'Unknown error',
      )
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
        aria-hidden="true"
      />
      <label className="field">
        <span>Name</span>
        <input type="text" name="name" required autoComplete="name" placeholder="Your name" />
      </label>
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" required autoComplete="email" placeholder="you@email.com" />
      </label>
      <label className="field">
        <span>Subject</span>
        <select name="subject" defaultValue="Booking">
          <option>Booking</option>
          <option>Press / Interview</option>
          <option>Sync / Licensing</option>
          <option>Collaboration</option>
          <option>Merch wholesale</option>
          <option>Other</option>
        </select>
      </label>
      <label className="field">
        <span>Message</span>
        <textarea name="message" rows={5} required placeholder="Tell me what you have in mind." />
      </label>
      <button
        type="submit"
        className="button button-primary contact-submit"
        disabled={status === 'sending' || status === 'sent'}
      >
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent ✓' : 'Send message'}
      </button>
      {status === 'sent' && (
        <p className="form-msg form-msg-ok" role="status">
          Got it. I'll reply from the RED T7GER inbox shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="form-msg form-msg-err" role="alert">
          {errorMsg ?? 'Something went wrong. Try again or DM @red_t7ger on Instagram.'}
        </p>
      )}
    </form>
  )
}

function BrandImage({
  src,
  alt,
  className,
  fallbackLabel,
}: {
  src: string
  alt: string
  className?: string
  fallbackLabel?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`img-fallback ${className ?? ''}`} aria-label={alt}>
        <span>{fallbackLabel ?? 'RED T7GER'}</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none'
        setFailed(true)
      }}
    />
  )
}

function App() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand-mark" href="#home" aria-label="RED T7GER home">
          <BrandImage src={brand.tigerIcon} alt="RED T7GER tiger logo" className="brand-logo" fallbackLabel="RT" />
          <span className="brand-wordmark">
            <span>RED</span>
            <span>T7GER</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#music">Music</a>
          <a href="#signal">Signal</a>
          <a href="#merch">Merch</a>
          <a href="#press">Press</a>
          <a href="#contact">Booking</a>
        </nav>
        <a className="listen-link" href={links.spotify} target="_blank" rel="noopener noreferrer">
          <SiSpotify size={18} aria-hidden="true" style={{ color: '#1DB954' }} />
          <span>Listen</span>
        </a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-backdrop" aria-hidden="true">
            <BrandImage src={brand.portraitWide} alt="" className="hero-portrait" />
            <div className="hero-overlay" />
            <div className="stage-lines" />
          </div>

          <div className="hero-content">
            <p className="eyebrow">Formerly B. Totty</p>
            <h1>RED T7GER</h1>
            <p className="hero-copy">
              Dark, technical, high-energy rap built where lyrical hip-hop collides with rock aggression and club pressure.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <ExternalButton href={links.spotify}>
                <SiSpotify size={18} aria-hidden="true" />
                Listen on Spotify
              </ExternalButton>
              <ExternalButton href={links.instagram} variant="secondary">
                <SiInstagram size={18} aria-hidden="true" />
                Follow on Instagram
              </ExternalButton>
            </div>
          </div>

          <div className="hero-release" aria-label="Upcoming release">
            <BrandImage
              src={brand.dirtyF7ck}
              alt="Dirty F7ck cover art"
              className="hero-release-art"
              fallbackLabel="DIRTY F7CK"
            />
            <div>
              <span>{upcomingRelease.type} · {upcomingRelease.year}</span>
              <strong>{upcomingRelease.title}</strong>
              <a href={upcomingRelease.href} target="_blank" rel="noopener noreferrer">
                Pre-save / follow <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <div className="ticker-strip" aria-hidden="true">
          <div className="ticker-track">
            <div className="ticker-group">
              <span>Rap Rock</span>
              <span>Trap Metal</span>
              <span>Dark Hip-Hop</span>
              <span>EDM Crossover</span>
              <span>RED T7GER</span>
              <span>Rap Rock</span>
              <span>Trap Metal</span>
              <span>Dark Hip-Hop</span>
              <span>EDM Crossover</span>
              <span>RED T7GER</span>
            </div>
            <div className="ticker-group" aria-hidden="true">
              <span>Rap Rock</span>
              <span>Trap Metal</span>
              <span>Dark Hip-Hop</span>
              <span>EDM Crossover</span>
              <span>RED T7GER</span>
              <span>Rap Rock</span>
              <span>Trap Metal</span>
              <span>Dark Hip-Hop</span>
              <span>EDM Crossover</span>
              <span>RED T7GER</span>
            </div>
          </div>
        </div>

        <section className="section music-section" id="music">
          <div className="section-heading">
            <p className="eyebrow">Music</p>
            <h2>The hard edge is the point.</h2>
            <p>
              RED T7GER sits in the pressure zone between technical rap, rap-rock, trap-metal, and dark electronic energy.
            </p>
          </div>

          <article className="release-feature">
            <BrandImage
              src={upcomingRelease.cover}
              alt={`${upcomingRelease.title} cover art`}
              className="release-feature-art"
              fallbackLabel={upcomingRelease.title.toUpperCase()}
            />
            <div className="release-feature-copy">
              <span className="badge">{upcomingRelease.type} · {upcomingRelease.year}</span>
              <h3>{upcomingRelease.title}</h3>
              <p>{upcomingRelease.copy}</p>
              <div className="release-feature-actions">
                <ExternalButton href={upcomingRelease.href}>
                  <SiSpotify size={18} aria-hidden="true" />
                  Save on Spotify
                </ExternalButton>
                <ExternalButton href={links.apple} variant="secondary">
                  <SiApplemusic size={18} aria-hidden="true" />
                  Apple Music
                </ExternalButton>
                <ExternalButton href={links.youtubeMusic} variant="secondary">
                  <SiYoutubemusic size={18} aria-hidden="true" />
                  YouTube Music
                </ExternalButton>
              </div>
            </div>
          </article>

          <div className="release-grid">
            {catalog.map((release) => (
              <article className="release-card" key={release.title}>
                <BrandImage
                  src={release.cover}
                  alt={`${release.title} cover art`}
                  className="release-card-art"
                  fallbackLabel={release.title.toUpperCase()}
                />
                <div className="release-copy">
                  <span>{release.type} · {release.year}</span>
                  <h3>{release.title}</h3>
                  <p>{release.copy}</p>
                  <a href={release.href} target="_blank" rel="noopener noreferrer">
                    Listen <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="platform-grid" aria-label="Streaming and social links">
            {platformLinks.map(({ label, href, icon: Icon, brand: brandColor }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                key={label}
                style={{ ['--brand-color' as string]: brandColor }}
              >
                <Icon size={22} aria-hidden="true" style={{ color: brandColor }} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="section signal-section" id="signal">
          <div className="section-heading compact">
            <p className="eyebrow">Signal</p>
            <h2>Built for impact, not background.</h2>
          </div>
          <div className="pillar-grid">
            {soundPillars.map(({ icon: Icon, title, body }) => (
              <article className="pillar-card" key={title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="visual-section" aria-label="Visual world">
          <div className="visual-copy">
            <p className="eyebrow">Visual World</p>
            <h2>Black glass. Red light. No soft center.</h2>
            <p>
              Hard-shadow cinematic, painted-face theatrical, tiger-mark unmistakable. Every visual is built to carry the same energy as the music.
            </p>
          </div>
          <div className="visual-stack">
            <BrandImage
              src={brand.portraitSquare}
              alt="RED T7GER portrait"
              className="visual-portrait"
              fallbackLabel="RED T7GER"
            />
            <BrandImage
              src={brand.tigerMark}
              alt="RED T7GER tiger mark"
              className="visual-tiger"
              fallbackLabel="TIGER MARK"
            />
          </div>
        </section>

        <section className="section merch-section" id="merch">
          <div className="section-heading">
            <p className="eyebrow">Merch</p>
            <h2>Wear the brand. Carry the mark.</h2>
            <p>
              Apparel, prints, and limited drops from the official RED T7GER shop on Etsy.
            </p>
          </div>
          <div className="merch-grid">
            {merch.map((item) => (
              <a className="merch-card" href={item.href} target="_blank" rel="noopener noreferrer" key={item.id}>
                <div className="merch-art">
                  <BrandImage
                    src={item.image}
                    alt={item.title}
                    className="merch-img"
                    fallbackLabel={item.title}
                  />
                </div>
                <div className="merch-meta">
                  {item.price && <span>{item.price}</span>}
                  <strong>{item.title}</strong>
                  <em>
                    Shop on Etsy <ArrowUpRight size={15} aria-hidden="true" />
                  </em>
                </div>
              </a>
            ))}
          </div>
          <div className="merch-cta">
            <ExternalButton href={links.etsy}>
              <ShoppingBag size={18} aria-hidden="true" />
              Shop full Etsy store
            </ExternalButton>
          </div>
        </section>

        <section className="section press-section" id="press">
          <div className="section-heading">
            <p className="eyebrow">Press And Legacy</p>
            <h2>Same artist. Darker chapter.</h2>
            <p>
              RED T7GER is the current artist identity of the rapper formerly known as B. Totty, carrying forward the live-performance and lyrical history into a heavier lane.
            </p>
          </div>
          <div className="press-list">
            {pressLinks.map((item) => (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="press-item" key={item.title}>
                <span>{item.source}</span>
                <strong>{item.title}</strong>
                <ExternalLink size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="booking-section" id="contact">
          <div className="booking-copy">
            <p className="eyebrow">Booking / Press / Sync</p>
            <h2>Bring the dark energy into the room.</h2>
            <p>
              Shows, interviews, collaborations, licensing, and merch wholesale — drop a message and it lands in the RED T7GER inbox directly.
            </p>
            <div className="booking-actions">
              <ExternalButton href={links.instagram} variant="secondary">
                <SiInstagram size={18} aria-hidden="true" />
                DM on Instagram
              </ExternalButton>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>RED T7GER</strong>
          <span>Dark rap-rock and EDM crossover.</span>
          <span className="footer-fineprint">
            © 2026 RED T7GER. All rights reserved. <a href="/privacy.html">Privacy & Terms</a>
          </span>
        </div>
          <div className="footer-links">
            <a href={links.spotify} target="_blank" rel="noopener noreferrer"><SiSpotify size={16} aria-hidden="true" /> Spotify</a>
            <a href={links.apple} target="_blank" rel="noopener noreferrer"><SiApplemusic size={16} aria-hidden="true" /> Apple Music</a>
            <a href={links.youtube} target="_blank" rel="noopener noreferrer"><SiYoutube size={16} aria-hidden="true" /> YouTube</a>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer"><SiInstagram size={16} aria-hidden="true" /> Instagram</a>
            <a href={links.tiktok} target="_blank" rel="noopener noreferrer"><SiTiktok size={16} aria-hidden="true" /> TikTok</a>
            <a href={links.x} target="_blank" rel="noopener noreferrer"><SiX size={16} aria-hidden="true" /> X</a>
            <a href={links.etsy} target="_blank" rel="noopener noreferrer"><ShoppingBag size={16} aria-hidden="true" /> Etsy</a>
          </div>
      </footer>
    </div>
  )
}

export default App
