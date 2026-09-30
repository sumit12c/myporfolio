import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { useState, type FormEvent } from "react";

import BootTerminal from "./components/BootTerminal";
import DecryptionIntro from "./components/DecryptionIntro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PlaygroundAI from "./components/PlaygroundAI";

type IntroStage = "boot" | "decrypt" | "portfolio";

function App() {
  const [stage, setStage] = useState<IntroStage>("boot");

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === "boot" && (
          <BootTerminal key="boot" onComplete={() => setStage("decrypt")} />
        )}

        {stage === "decrypt" && (
          <DecryptionIntro
            key="decrypt"
            onComplete={() => setStage("portfolio")}
          />
        )}
      </AnimatePresence>

      {stage === "portfolio" && (
        <div id="top">
          <Navbar />
          <Hero />
          <section className="about-section" id="about">
            <div className="about-light-panel">
              <svg
                className="about-tape"
                viewBox="0 0 180 900"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="creativity-road-path"
                    d="M 24 -30 C 126 100 0 180 62 320 S 152 520 56 690 S 0 820 82 930"
                  />
                </defs>
                <use className="tape-road-edge" href="#creativity-road-path" />
                <use className="tape-road" href="#creativity-road-path" />
                <use
                  className="tape-road-marking"
                  href="#creativity-road-path"
                />
                <text className="tape-message">
                  <textPath
                    href="#creativity-road-path"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    CREATIVITY IS EVERYTHING
                  </textPath>
                </text>
              </svg>
              <div className="about-section-inner">
                <motion.div
                  className="about-heading"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="about-kicker">02 / About me</p>
                  <h2 className="about-title">
                    Where creativity
                    <br />
                    meets technology.
                  </h2>
                </motion.div>

                <div
                  className="about-collage"
                  aria-label="Creative development principles"
                >
                  <motion.div
                    className="collage-piece collage-piece-dark"
                    initial={{ opacity: 0, x: -24, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <span>01</span>
                    <strong>DESIGN</strong>
                    <small>Make it feel.</small>
                  </motion.div>
                  <motion.div
                    className="collage-piece collage-piece-outline"
                    initial={{ opacity: 0, y: 24, rotate: 4 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    <span>02</span>
                    <strong>BUILD</strong>
                    <small>Make it work.</small>
                  </motion.div>
                  <motion.div
                    className="collage-piece collage-piece-mark"
                    initial={{ opacity: 0, x: 24, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    <span>03</span>
                    <strong>AI / FLOW</strong>
                    <small>Work smarter. Create more.</small>
                  </motion.div>
                </div>

                <motion.div
                  className="about-arrow"
                  aria-hidden="true"
                  initial={{ opacity: 0, x: 24, y: -12, rotate: -8 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                >
                  ↘
                </motion.div>

                <motion.div
                  className="about-left-mark"
                  aria-hidden="true"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                >
                  <span />
                  <small>BUILD / THINK / REPEAT</small>
                </motion.div>
              </div>
            </div>

            <div className="about-dark-panel">
              <div className="about-grid" aria-hidden="true" />
              <svg
                className="about-road-continuation"
                viewBox="0 0 180 760"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="about-road-continuation-path"
                    d="M 42 -32 C 8 92 76 150 30 266 S 76 418 34 544 S 80 686 40 800"
                  />
                </defs>
                <use
                  className="about-road-continuation-edge"
                  href="#about-road-continuation-path"
                />
                <use
                  className="about-road-continuation-surface"
                  href="#about-road-continuation-path"
                />
                <use
                  className="about-road-continuation-marking"
                  href="#about-road-continuation-path"
                />
                <text className="about-road-continuation-text">
                  <textPath
                    href="#about-road-continuation-path"
                    startOffset="52%"
                    textAnchor="middle"
                  >
                    KEEP MOVING FORWARD
                  </textPath>
                </text>
              </svg>
              <div className="about-section-inner">
                <div className="about-content">
                  <motion.div
                    className="about-copy"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.12,
                          delayChildren: 0.12,
                        },
                      },
                    }}
                  >
                    <motion.p variants={aboutReveal}>
                      Hi, I’m <strong>Sumit Patel</strong>, a Computer Science
                      and Engineering student and a{" "}
                      <strong>creative developer</strong>
                      who enjoys turning ideas into interactive, visually
                      engaging, and intelligent digital experiences.
                    </motion.p>
                    <motion.p variants={aboutReveal}>
                      I see development as more than just writing code. I care
                      about how technology looks, feels, and works. I enjoy
                      exploring UI design, animations, 3D interfaces,
                      interactive experiences, and creative web development,
                      along with AI, local LLMs, and Retrieval-Augmented
                      Generation (RAG). I also use AI to improve my productivity
                      and create more room for creative thinking.
                    </motion.p>
                    <motion.p variants={aboutReveal}>
                      I like taking a project from a simple idea to design,
                      code, and a working product, constantly experimenting with
                      new technologies along the way.
                    </motion.p>
                  </motion.div>

                  <motion.aside
                    className="about-side-note"
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                  >
                    <span>Currently exploring</span>
                    <strong>
                      Interfaces, intelligence
                      <br />
                      &amp; imagination.
                    </strong>
                  </motion.aside>
                </div>

                <motion.div
                  className="about-tool-line"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <span>
                    HTML / CSS / JavaScript / Node.js / Express.js / MongoDB /
                    MySQL / Python / C++ / Three.js / Figma / Tailwind CSS
                  </span>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="skills-section" id="skills">
            <div className="skills-section-inner">
              <motion.div
                className="skills-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8 }}
              >
                <p className="skills-kicker">03 / Skills &amp; services</p>
                <h2>Ideas into interfaces.</h2>
              </motion.div>

              <div className="skills-grid">
                <SkillCard
                  number="01"
                  title="Creative Development"
                  copy="Designing modern UI/UX, interactive interfaces, animations, and immersive 3D experiences with Three.js, Figma, and modern CSS."
                />
                <SkillCard
                  number="02"
                  title="Web & Backend"
                  copy="Building responsive applications with JavaScript, Node.js, Express.js, EJS, MongoDB, and MySQL, connecting clean interfaces to reliable systems."
                />
                <SkillCard
                  number="03"
                  title="AI & Intelligent Systems"
                  copy="Exploring local LLMs, RAG, Ollama, and AI APIs to create applications that understand context and retrieve useful knowledge."
                />
                <SkillCard
                  number="04"
                  title="Problem Solving"
                  copy="Turning ideas into practical products through creative thinking, experimentation, and efficient engineering."
                />
              </div>
            </div>
          </section>

          <section className="projects-section" id="projects">
            <div className="projects-grid-field" aria-hidden="true" />
            <div className="projects-section-inner">
              <motion.div
                className="projects-heading"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="projects-kicker">04 / Selected work</p>
                <div>
                  <h2>
                    Built to be
                    <br />
                    remembered.
                  </h2>
                  <p>
                    Ideas shaped into useful, expressive digital experiences.
                  </p>
                </div>
              </motion.div>

              <div className="projects-list">
                <ProjectCard
                  number="01"
                  title="Kracit"
                  type="AI career guidance"
                  image="kracit.png"
                  description="An AI-powered career companion that helps people prepare, grow, and move toward their next opportunity."
                  tags={["AI", "Web platform", "Career"]}
                  href="https://github.com/sumit12c/KRACIT"
                />
                <ProjectCard
                  number="02"
                  title="ResQVerse"
                  type="Disaster readiness"
                  image="resqverse.png"
                  description="A safety-focused platform designed to help educational institutions build preparedness, awareness, and resilience."
                  tags={["Safety", "Platform", "Impact"]}
                  href="https://github.com/sumit12c/ResQverse"
                />
                <ProjectCard
                  number="03"
                  title="FileFlick"
                  type="Cloud file sharing"
                  image="fileflick.png"
                  description="A connected file-sharing workspace that makes moving files from mobile to PC feel fast, simple, and reliable."
                  tags={["Cloud", "Connectivity", "Utility"]}
                  href="https://github.com/sumit12c/fileflick"
                />
                <ProjectCard
                  number="04"
                  title="Dragon Music Player"
                  type="Terminal experience"
                  image="cmdmusicplayer.png"
                  description="A keyboard-first music player that turns command-line interaction into a focused, retro listening experience."
                  tags={["C++", "Terminal", "Interaction"]}
                  href="https://github.com/sumit12c/Terminal_Music_Player"
                />
                <ProjectCard
                  number="05"
                  title="NoteSnap"
                  type="Live session notes"
                  image="notesnap.png"
                  description="A live screen-sharing notes app that captures key moments during a session and generates a document when it ends."
                  tags={["Screen share", "Notes", "Automation"]}
                  href="https://github.com/sumit12c/notesnap"
                />
              </div>

              <div className="projects-cta-row">
                <motion.a
                  className="projects-contact-link"
                  href="#contact"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="projects-contact-link__label">
                    Get in touch
                  </span>
                  <span
                    className="projects-contact-link__circle"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </motion.a>

                <motion.a
                  className="projects-github-link"
                  href="https://github.com/sumit12c"
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>To see more projects, visit GitHub</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.46-1.21-1.11-1.53-1.11-1.53-.91-.64.07-.63.07-.63 1 .07 1.54 1.06 1.54 1.06.9 1.58 2.35 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.59 5.05.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.6.69.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
                  </svg>
                  <span className="projects-github-arrow" aria-hidden="true">
                    &#8599;
                  </span>
                </motion.a>
              </div>
            </div>
          </section>

          <section className="tech-stack-section" id="tech-stack">
            <div className="tech-stack-inner">
              <motion.div
                className="tech-stack-heading"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75 }}
              >
                <p className="tech-stack-kicker">04 / Tools of the trade</p>
                <h2>Built with curiosity.</h2>
              </motion.div>

              <div className="tech-masonry-grid">
                <TechCard
                  name="Python"
                  image="python.png"
                  size="large"
                  delay={0}
                  description="Primary language for automation, scripting, AI, and backend work."
                />
                <TechCard
                  name="HTML"
                  image="html.png"
                  size="large"
                  delay={0.08}
                  description="Semantic, accessible markup that structures every interface I build."
                />
                <TechCard
                  name="JavaScript"
                  image="js.png"
                  size="large"
                  delay={0.16}
                  description="Core language for interactive, dynamic web experiences."
                />
                <TechCard
                  name="CSS"
                  image="css.png"
                  size="medium"
                  delay={0.2}
                  description="Modern layouts, animations, and design systems with precision."
                />
                <TechCard
                  name="React"
                  image="React.png"
                  size="medium"
                  delay={0.24}
                  description="Component-driven UI library powering my portfolio and web apps."
                />
                <TechCard
                  name="Figma"
                  image="figma.png"
                  size="medium"
                  delay={0.28}
                  description="Designing interfaces, prototypes, and visual systems before code."
                />
                <TechCard
                  name="Spline"
                  image="spline.png"
                  size="medium"
                  delay={0.36}
                  description="Creating interactive 3D scenes and objects for the web."
                />
                <TechCard
                  name="TypeScript"
                  image="ts.png"
                  size="small"
                  delay={0.44}
                  description="Typed JavaScript for safer, more maintainable codebases."
                />
                <TechCard
                  name="ExpressJS"
                  image="expressjs.png"
                  size="medium"
                  delay={0.48}
                  description="Minimal Node.js framework for building fast, flexible APIs."
                />
                <TechCard
                  name="AI"
                  image="AI.png"
                  size="small"
                  delay={0.56}
                  description="Gemini API, RAGs, and local LLMs for context-aware, intelligent apps."
                />
                <TechCard
                  name="SQL"
                  image="sql.png"
                  size="small"
                  delay={0.64}
                  description="Designing and querying relational databases with confidence."
                />
                <TechCard
                  name="NodeJS"
                  image="nodejs.png"
                  size="small"
                  delay={0.68}
                  description="Server-side JavaScript runtime for scalable backends and tools."
                />
              </div>
            </div>
          </section>

          <Timeline />

          <section
            className="playground-section"
            id="playground"
            aria-label="Playground"
          >
            <div className="playground-grid" aria-hidden="true" />

            <div
              className="playground-orbit playground-orbit-one"
              aria-hidden="true"
            />

            <div
              className="playground-orbit playground-orbit-two"
              aria-hidden="true"
            />

            <PlaygroundAI />
          </section>

          <ContactSection />
        </div>
      )}
    </>
  );
}

function Timeline() {
  const [activeTrack, setActiveTrack] = useState<"education" | "career">(
    "education",
  );

  const entries =
    activeTrack === "education"
      ? [
          {
            date: "2021",
            title: "Secondary Education",
            place: "CBSE · Little Kingdom Sr. Sec. School",
            detail: "Schooling completed.",
          },
          {
            date: "2023",
            title: "Senior Secondary Education",
            place: "CBSE · Little Kingdom Sr. Sec. School",
            detail: "Schooling completed.",
          },
          {
            date: "2023 — 2027",
            title: "B.Tech, Computer Science & Engineering",
            place: "Gyan Ganga Institute of Technology and Sciences",
            detail: "Graduation 2027.",
          },
        ]
      : [
          {
            date: "AUG 2025",
            title: "Smart India Hackathon",
            place: "Participant",
            detail:
              "Participated in SIH, collaborating to turn an idea into a practical solution.",
          },
          {
            date: "ONGOING",
            title: "Self-directed projects",
            place: "Creative development",
            detail:
              "Built a range of self projects to learn, experiment, and sharpen practical skills.",
          },
          {
            date: "6TH SEM",
            title: "Placement",
            place: "Higher opportunities",
            detail:
              "Placed in sixth semester and looking for further higher opportunities.",
          },
        ];

  return (
    <section className="timeline-section" id="timeline">
      <div className="timeline-orbit timeline-orbit-one" aria-hidden="true" />
      <div className="timeline-orbit timeline-orbit-two" aria-hidden="true" />
      <div className="timeline-section-inner">
        <motion.div
          className="timeline-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>05 / The journey</p>
          <h2>
            Learning.
            <br />
            Building. Growing.
          </h2>
        </motion.div>

        <div
          className="timeline-switch"
          role="tablist"
          aria-label="Timeline category"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === "education"}
            className={activeTrack === "education" ? "is-active" : ""}
            onClick={() => setActiveTrack("education")}
          >
            Education
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === "career"}
            className={activeTrack === "career" ? "is-active" : ""}
            onClick={() => setActiveTrack("career")}
          >
            Career
          </button>
        </div>

        <motion.div
  className="timeline-book"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1, margin: "0px 0px -80px 0px" }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
          <div className="timeline-book-spine" aria-hidden="true" />
          <div className="timeline-book-page-number" aria-hidden="true">
            {activeTrack === "education" ? "EDU / 01" : "CAREER / 02"}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack}
              className="timeline-track"
              role="tabpanel"
              initial={{ opacity: 0, rotateY: -76, x: -24 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: 70, x: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="timeline-track-axis" aria-hidden="true" />

              {entries.map((entry, index) => (
                <motion.article
                  className="timeline-entry"
                  key={entry.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
                >
                  <span className="timeline-number">0{index + 1}</span>
                  <time>{entry.date}</time>
                  <div className="timeline-entry-main">
                    <h3>{entry.title}</h3>
                    <strong>{entry.place}</strong>
                  </div>
                  <p>{entry.detail}</p>
                  <span className="timeline-dot" aria-hidden="true" />
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    content: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.content}`;
    const subject = encodeURIComponent(form.subject);
    const encodedBody = encodeURIComponent(body);
    const recipient = "patelsumit86112@gmail.com";

    if (window.matchMedia("(max-width: 700px)").matches) {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${encodedBody}`;
      return;
    }

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${encodedBody}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section-inner">
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>06 / Contact</p>
          <h2>
            Let&apos;s build
            <br />
            something real.
          </h2>
          <button
            type="button"
            className="contact-back-to-top"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span aria-hidden="true">&#8593;</span>
          </button>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <label>
            <span>Name</span>
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              placeholder="Your Name"
            />
          </label>
          <label>
            <span>Subject</span>
            <input
              required
              value={form.subject}
              onChange={(event) =>
                setForm({ ...form, subject: event.target.value })
              }
              placeholder="What is the subject?"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              placeholder="you@email.com"
            />
          </label>
          <label className="contact-form-message">
            <span>Message</span>
            <textarea
              required
              value={form.content}
              onChange={(event) =>
                setForm({ ...form, content: event.target.value })
              }
              placeholder="The message you want to tell..."
              rows={5}
            />
          </label>

          <div className="contact-actions">
            <button type="submit">
              <span>Send message</span>
              <span aria-hidden="true">&#8599;</span>
            </button>
          </div>
        </motion.form>
      </div>

      <footer className="portfolio-footer">
        <span>SUMIT PATEL / CREATIVE DEVELOPER</span>
        <div className="footer-links">
          <a
            href="https://github.com/sumit12c"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="http://linkedin.com/in/sumit-patel-5a8407290/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:patelsumit86112@gmail.com">
            patelsumit86112@gmail.com
          </a>
        </div>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

function ProjectCard({
  number,
  title,
  type,
  image,
  description,
  tags,
  href,
}: {
  number: string;
  title: string;
  type: string;
  image: string;
  description: string;
  tags: string[];
  href: string;
}) {
  return (
    <motion.a
      className="project-card"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${title} repository on GitHub`}
      initial={{ opacity: 0, y: 54 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-meta">
        <span>{number}</span>
        <span>{type}</span>
      </div>
      <div className="project-image-wrap">
        <img
          src={`/assets/${image}`}
          alt={`${title} project interface`}
          loading="lazy"
        />
        <span className="project-image-marker" aria-hidden="true">
          +
        </span>
      </div>
      <div className="project-copy">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="project-footer">
          <ul aria-label={`${title} categories`}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span className="project-arrow" aria-hidden="true">
            &#8599;
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function SkillCard({
  number,
  title,
  copy,
}: {
  number: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.article
      className="skill-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <span className="skill-card-number">{number}</span>
      <h3>{title}</h3>
      <p>{copy}</p>
      <span className="skill-card-arrow" aria-hidden="true">
        ↗
      </span>
    </motion.article>
  );
}

function TechCard({
  name,
  image,
  size,
  delay,
  description,
}: {
  name: string;
  image: string;
  size: "large" | "medium" | "small";
  delay: number;
  description: string;
}) {
  return (
    <motion.article
      className={`tech-card tech-card-${size}`}
      initial={{ opacity: 0, y: -70, rotate: size === "small" ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={`/assets/${image}`}
        alt={`${name} official logo`}
        loading="lazy"
      />
      <span className="tech-card-name">{name}</span>
      <b aria-hidden="true">↗</b>
      <div className="tech-card-desc">
        <strong>{name}</strong>
        <p>{description}</p>
      </div>
    </motion.article>
  );
}

const aboutReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default App;
