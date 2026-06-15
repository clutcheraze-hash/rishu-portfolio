import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

/* ─── Data ─────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    title: 'Founder & CEO',
    company: 'Namor Esports Organization',
    year: '2021 — Present',
    desc: 'Built and scaled a competitive esports organization from the ground up. Negotiated brand partnerships, assembled rosters across multiple titles, and established the organization as a recognized name in the regional competitive circuit.',
    tags: ['Esports', 'Leadership', 'Brand Strategy', 'Roster Management'],
  },
  {
    title: 'Talent Management Director',
    company: 'Namor Creatives',
    year: '2022 — Present',
    desc: 'Managing a portfolio of digital creators and content professionals. Architecting deal flow, brand collaborations, and monetization strategies in the creator economy space.',
    tags: ['Creator Economy', 'Talent Management', 'Negotiations', 'Brand Deals'],
  },
  {
    title: 'Co-Founder',
    company: 'RANKYN',
    year: '2023 — Present',
    desc: 'Co-founded a technology startup exploring innovative tools at the intersection of gaming, AI, and community engagement. Leading product vision and go-to-market strategy.',
    tags: ['Startup', 'Product Strategy', 'AI', 'Community Tech'],
  },
  {
    title: 'Entrepreneur in Residence',
    company: 'Digital Ventures Collective',
    year: '2020 — 2022',
    desc: 'Supported early-stage ventures in gaming, digital media, and consumer technology. Provided strategic guidance, assisted with fundraising narratives, and advised on operational execution.',
    tags: ['Venture', 'Advisory', 'Digital Media', 'Fundraising'],
  },
]

const SKILLS = [
  { name: 'Business Strategy',   jp: '戦略',  level: 'Expert',     pct: 0.92 },
  { name: 'Brand Development',   jp: 'ブランド', level: 'Expert',   pct: 0.88 },
  { name: 'Esports Operations',  jp: 'スポーツ', level: 'Expert',   pct: 0.95 },
  { name: 'Talent Management',   jp: '才能',  level: 'Advanced',   pct: 0.85 },
  { name: 'Product Thinking',    jp: '製品',  level: 'Advanced',   pct: 0.80 },
  { name: 'Creator Economy',     jp: '経済',  level: 'Expert',     pct: 0.90 },
  { name: 'Team Leadership',     jp: 'リーダー', level: 'Expert',  pct: 0.93 },
  { name: 'Digital Marketing',   jp: '市場',  level: 'Advanced',   pct: 0.82 },
]

const PROJECTS = [
  {
    tag: 'Esports',
    title: 'Namor Championship Circuit',
    desc: 'A league structure elevating regional talent through structured seasonal competition, developed partnerships with hardware sponsors, and produced broadcast-quality live events.',
    num: '01',
  },
  {
    tag: 'Technology',
    title: 'Scout AI — Talent Discovery Platform',
    desc: 'A data-driven platform that identifies emerging gaming talent by analyzing competitive performance metrics across multiple titles and streaming platforms.',
    num: '02',
  },
  {
    tag: 'Creator Economy',
    title: 'Creator Bridge',
    desc: 'A managed marketplace connecting digital creators with authentic brand partnerships, cutting negotiation time through structured deal templates and transparent rate cards.',
    num: '03',
  },
  {
    tag: 'Community',
    title: 'Epoch Gaming Network',
    desc: 'A membership community for competitive players featuring mentorship pipelines, exclusive scrimmage scheduling tools, and career development resources.',
    num: '04',
  },
]

const ACHIEVEMENTS = [
  { number: '4',   suffix: '+',  label: 'Companies Founded' },
  { number: '50',  suffix: 'k+', label: 'Community Members' },
  { number: '55',  suffix: '+',  label: 'Brand Partnerships' },
  { number: '13',  suffix: 'x',  label: 'Tournament Champions' },
  { number: '67',  suffix: '+',  label: 'Creators Managed' },
  { number: '3',   suffix: '+',  label: 'Years Building' },
]

/* ─── Hooks ────────────────────────────────────────────────── */
function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

/* ─── Custom Cursor ────────────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf     = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }
    const onDown = () => { dotRef.current?.classList.add('clicking') }
    const onUp   = () => { dotRef.current?.classList.remove('clicking') }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,input,textarea,[data-cursor]')) {
        dotRef.current?.classList.add('hovering')
        ringRef.current?.classList.add('hovering')
      }
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,input,textarea,[data-cursor]')) {
        dotRef.current?.classList.remove('hovering')
        ringRef.current?.classList.remove('hovering')
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top  = ringPos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

/* ─── Particle Canvas ──────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const mouse = { x: W / 2, y: H / 2 }

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
    }
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; life: number; maxLife: number;
      color: string;
    }

    const COLORS = ['rgba(200,16,46,', 'rgba(184,184,184,', 'rgba(232,228,220,']

    const particles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      const life = Math.random() * 300
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        life,
        maxLife: life + 200 + Math.random() * 200,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    let raf: number
    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.life++
        if (p.life > p.maxLife) {
          p.x = Math.random() * W
          p.y = H + 10
          p.life = 0
          p.maxLife = 200 + Math.random() * 300
          p.vx = (Math.random() - 0.5) * 0.3
          p.vy = -Math.random() * 0.4 - 0.1
        }

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.0008
          p.vx += dx * force
          p.vy += dy * force
        }

        p.vx *= 0.99
        p.vy *= 0.99
        p.x += p.vx
        p.y += p.vy

        const progress = p.life / p.maxLife
        const fadeAlpha = progress < 0.2
          ? (progress / 0.2) * p.alpha
          : progress > 0.8
            ? ((1 - progress) / 0.2) * p.alpha
            : p.alpha

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color + fadeAlpha + ')'
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} id="particles-canvas" aria-hidden="true" />
}

/* ─── Loading Screen ───────────────────────────────────────── */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    let n = 0
    const iv = setInterval(() => {
      n += Math.floor(Math.random() * 7) + 3
      if (n >= 100) { n = 100; clearInterval(iv) }
      setCount(n)
    }, 30)
    const t = setTimeout(() => {
      setHiding(true)
      setTimeout(onDone, 700)
    }, 2200)
    return () => { clearInterval(iv); clearTimeout(t) }
  }, [onDone])

  return (
    <div
      className="loading-screen"
      style={{
        opacity: hiding ? 0 : 1,
        pointerEvents: hiding ? 'none' : 'all',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div className="loading-kanji">未来</div>
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
      <div className="loading-counter">{String(count).padStart(3, '0')}</div>
    </div>
  )
}

/* ─── Navigation ───────────────────────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav-bar${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
      <button
        className="nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        style={{ background: 'none', border: 'none' }}
      >
        RISHU
      </button>
      <ul className="nav-links" role="list">
        {[
          ['about',        'About',        '01'],
          ['experience',   'Experience',   '02'],
          ['skills',       'Skills',       '03'],
          ['projects',     'Projects',     '04'],
          ['achievements', 'Achievements', '05'],
          ['contact',      'Contact',      '06'],
        ].map(([id, label, num]) => (
          <li key={id}>
            <button
              className="nav-link"
              data-num={num}
              onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none' }}
              aria-label={`Navigate to ${label} section`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-jp-watermark" aria-hidden="true">創造革新</div>

      <div className="hero-status" aria-label="Status: Available for ventures">
        Available for Ventures
      </div>

      <h1 className="hero-name">
        <span className={`hero-name-line${visible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}>
          R I S H U
        </span>
        <span className={`hero-name-line${visible ? ' visible' : ''}`}
          style={{ transitionDelay: '0.25s' }}>
          S I N G H
        </span>
        <span className={`hero-name-jp${visible ? ' visible' : ''}`}
          aria-label="Rishu Singh in Japanese">
          田中 開
        </span>
      </h1>

      <p className={`hero-tagline${visible ? ' visible' : ''}`}>
        Architecting the gaming ecosystem from the ground up — infrastructure, communities, and companies that outlast the hype.
      </p>

      <div className={`hero-roles${visible ? ' visible' : ''}`} role="list">
        {['Founder', 'Entrepreneur', 'Esports Athlete', 'Community Builder'].map(role => (
          <span key={role} className="hero-role-item" role="listitem">{role}</span>
        ))}
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}

/* ─── About ────────────────────────────────────────────────── */
function About() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <section className="section" id="about" ref={ref} aria-labelledby="about-title">
      <div className={`section-label sr${vis ? ' visible' : ''}`}>
        <span>01</span>About
      </div>

      <div className="about-grid">
        <div className={`sr sr-left${vis ? ' visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div className="about-portrait" data-cursor>
            <img
              src="/headshot-on-white.jpg"
              alt="Rishu Singh portrait"
              className="about-portrait-img"
              loading="lazy"
            />
            <div className="about-portrait-frame" aria-hidden="true" />
            <div className="about-accent-line" aria-hidden="true" />
            <div className="about-portrait-label">R I S H U — S I N G H</div>
          </div>
        </div>

        <div className={`about-content sr sr-right${vis ? ' visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="reveal-text">
            <h2 id="about-title" className="section-title">
              Built<br />Different
            </h2>
          </div>
          <p className="section-title-jp" aria-label="About section in Japanese">
            自己紹介
          </p>

          <p>
            I started my journey as a competitive esports athlete grinding matches, learning the game, and figuring out how the industry works from the inside. That experience gave me a perspective most founders don't have, and it became the foundation for everything I built after. In 2024, I founded Namor Global but not just as an esports org, but as a brand with a bigger vision. What started as a passion project has grown into something I'm genuinely proud of. We've connected with players, teams, brands and communities across multiple countries, and we're still expanding.
          </p>
          <p>
            Beyond Namor, I've partnered with gaming companies to support game development through a community of 1,500+ professional playtesters, and launched a marketing agency that signed 50+ creators across the world in just two months. The journey is still early but the momentum is real, the team is hungry, and the vision is bigger than ever. The goal was never just to compete. It was to build something that lasts, an organization that opens doors for talented persons worldwide and puts a spotlight on the global esports scene.
          </p>

          <div className="about-stats" role="list">
            {[
              { n: '3+',  l: 'Years Operating' },
              { n: '4',   l: 'Active Ventures' },
              { n: '∞',   l: 'Ambition Level' },
            ].map(({ n, l }) => (
              <div key={l} className="stat-item" role="listitem">
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Experience ────────────────────────────────────────────── */
function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <section className="section experience-bg" id="experience" ref={ref} aria-labelledby="exp-title">
      <div className={`section-label sr${vis ? ' visible' : ''}`}>
        <span>02</span>Experience
      </div>
      <div className="reveal-text">
        <h2 id="exp-title" className="section-title">The Journey</h2>
      </div>
      <p className="section-title-jp" aria-label="Experience section in Japanese">
        経験
      </p>

      <div className="experience-grid" role="list">
        {EXPERIENCES.map((exp, i) => (
          <article
            key={exp.title}
            className={`exp-card sr${vis ? ' visible' : ''} sr-delay-${i + 1}`}
            role="listitem"
          >
            <div className="exp-card-header">
              <div>
                <h3 className="exp-title">{exp.title}</h3>
                <div className="exp-company">{exp.company}</div>
              </div>
            </div>
            <p className="exp-desc">{exp.desc}</p>
            <div className="exp-tags" role="list" aria-label="Technologies and skills">
              {exp.tags.map(tag => (
                <span key={tag} className="exp-tag" role="listitem">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── Skills ───────────────────────────────────────────────── */
function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <section className="section" id="skills" ref={ref} aria-labelledby="skills-title">
      <div className={`section-label sr${vis ? ' visible' : ''}`}>
        <span>03</span>Skills
      </div>
      <div className="reveal-text">
        <h2 id="skills-title" className="section-title">Capabilities</h2>
      </div>
      <p className="section-title-jp" aria-label="Skills section in Japanese">
        技術と能力
      </p>

      <div className="skills-grid" role="list">
        {SKILLS.map((skill, i) => (
          <div
            key={skill.name}
            className={`skill-card sr${vis ? ' visible' : ''} sr-delay-${Math.min(i + 1, 6)}`}
            role="listitem"
          >
            <div className="skill-card-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-jp" aria-hidden="true">{skill.jp}</span>
            </div>
            <div className="skill-bar-bg" role="progressbar" aria-valuenow={Math.round(skill.pct * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={`${skill.name} proficiency: ${Math.round(skill.pct * 100)}%`}>
              <div
                className={`skill-bar-fill${vis ? ' animated' : ''}`}
                style={{
                  transitionDelay: vis ? `${0.2 + i * 0.08}s` : '0s',
                  transform: vis ? `scaleX(${skill.pct})` : 'scaleX(0)',
                }}
              />
            </div>
            <div className="skill-level">{skill.level} — {Math.round(skill.pct * 100)}%</div>
            <div className="skill-icon-bg" aria-hidden="true">{skill.jp}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Projects ─────────────────────────────────────────────── */
function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <section className="section experience-bg" id="projects" ref={ref} aria-labelledby="projects-title">
      <div className={`section-label sr${vis ? ' visible' : ''}`}>
        <span>04</span>Projects
      </div>
      <div className="reveal-text">
        <h2 id="projects-title" className="section-title">Ventures</h2>
      </div>
      <p className="section-title-jp" aria-label="Projects section in Japanese">
        プロジェクト
      </p>

      <div className="projects-scroll" role="list">
        {PROJECTS.map((proj, i) => (
          <article
            key={proj.num}
            className={`project-card sr${vis ? ' visible' : ''} sr-delay-${Math.min(i + 1, 6)}`}
            role="listitem"
            tabIndex={0}
            aria-label={`Project: ${proj.title}`}
          >
            <div className="project-card-visual" aria-hidden="true" />
            <span className="project-card-num" aria-hidden="true">{proj.num}</span>
            <div className="project-card-content">
              <div className="project-tag">{proj.tag}</div>
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ─── Achievements ──────────────────────────────────────────── */
function Achievements() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <section className="section achievements-bg" id="achievements" ref={ref} aria-labelledby="ach-title">
      <div className={`section-label sr${vis ? ' visible' : ''}`}>
        <span>05</span>Achievements
      </div>
      <div className="reveal-text">
        <h2 id="ach-title" className="section-title">Milestones</h2>
      </div>
      <p className="section-title-jp" aria-label="Achievements section in Japanese">
        実績
      </p>

      <div className="achievements-grid" role="list">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={a.label}
            className={`achievement-item sr${vis ? ' visible' : ''} sr-delay-${Math.min(i + 1, 6)}`}
            role="listitem"
          >
            <div className="achievement-number">
              <CountUp target={a.number} active={vis} delay={i * 0.1} />
              <span className="achievement-suffix">{a.suffix}</span>
            </div>
            <div className="achievement-label">{a.label}</div>
          </div>
        ))}
      </div>

      <div className={`worked-with sr${vis ? ' visible' : ''} sr-delay-6`} style={{ marginTop: '6rem' }}>
        <h3 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '3rem', color: 'var(--off-white)' }}>
          Trusted By
        </h3>
        <div className="worked-with-grid" role="list" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1rem', 
        }}>
          {['SUPER GAMING', 'TMG ESPORTS', 'LILA GAMES', 'UNDERWORLD GANG WARS', 'MUKTI', 'RIO BOOM', 'BLOCK BLAST', 'ZEDI ESPORTS', 'DELTA FORCE', 'WEX', 'KREO', 'HP', 'INTEL'].map(brand => (
            <div key={brand} className="brand-tag" role="listitem" style={{
              padding: '1.2rem 2rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '0.25rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'var(--silver)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              transition: 'all 400ms var(--ease-expo)',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(200, 16, 46, 0.1)';
              e.currentTarget.style.borderColor = 'var(--crimson)';
              e.currentTarget.style.color = 'var(--off-white)';
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--silver)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ target, active, delay }: { target: string; active: boolean; delay: number }) {
  const [display, setDisplay] = useState('0')
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    const num = parseInt(target)
    if (isNaN(num)) { setDisplay(target); return }
    started.current = true
    const t = setTimeout(() => {
      const duration = 1200
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(eased * num).toString())
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [active, target, delay])

  return <>{display}</>
}

/* ─── Contact ──────────────────────────────────────────────── */
function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const vis = useIntersection(ref)

  return (
    <section className="section" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className={`section-label sr${vis ? ' visible' : ''}`}>
        <span>06</span>Contact
      </div>

      <div className="contact-wrap">
        <div className="reveal-text">
          <h2 id="contact-title" className="section-title">
            Let&apos;s Build<br />Something
          </h2>
        </div>
        <p className="section-title-jp" aria-label="Contact section in Japanese">
          連絡先
        </p>

        <div className={`contact-socials sr${vis ? ' visible' : ''}`} style={{ transitionDelay: '0.1s', marginTop: '3rem' }}>
          {[
            { label: 'Twitter',   href: 'https://x.com/ri8huuu' },
            { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/rishu-singh24?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
            { label: 'Instagram', href: 'https://www.instagram.com/ri8huuu?igsh=MWVjeW5pM2gxbXUwdw==' },
            { label: 'Discord',   href: 'https://discord.gg/n8MpEWGck2' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${label} profile`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-jp" aria-hidden="true">R I S H U — S I N G H</div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Rishu Singh. All rights reserved.
      </div>
    </footer>
  )
}

/* ─── Main Component ───────────────────────────────────────── */
function Portfolio() {
  const [loaded, setLoaded] = useState(false)
  const onLoadDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (!loaded) return

    // Lenis smooth scroll
    let lenis: any = null
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })

    // Scroll reveal
    const els = document.querySelectorAll('.sr')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => obs.observe(el))

    return () => {
      obs.disconnect()
      lenis?.destroy()
    }
  }, [loaded])

  return (
    <>
      <LoadingScreen onDone={onLoadDone} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
          minHeight: '100vh',
        }}
      >
        <CustomCursor />
        <ParticleCanvas />
        <Navigation />
        <main id="main-content">
          <Hero />
          <div className="divider" />
          <About />
          <div className="divider" />
          <Experience />
          <div className="divider" />
          <Skills />
          <div className="divider" />
          <Projects />
          <div className="divider" />
          <Achievements />
          <div className="divider" />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
