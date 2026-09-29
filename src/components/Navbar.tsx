import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "motion/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const sections = ["about", "skills", "projects", "tech-stack", "timeline", "playground", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-18% 0px -55%", threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMenu();

    const section = document.getElementById(sectionId);

    if (!section) return;

    const startPosition = window.scrollY;
    const targetPosition = section.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 1400;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const navLinkClass = (sectionId: string) =>
    `navbar-link ${activeSection === sectionId ? "is-active" : ""}`;

  return (
    <motion.header className="portfolio-navbar">
      <nav
        className="
          flex
          items-center
          justify-between
          px-7
          md:px-12
          py-7
        "
      >
        {/* ========================================
            BRAND
        ======================================== */}

        <motion.a
          href="#top"
          className="
            navbar-item
            flex
            items-center
            gap-3
          "
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div
            className="
              w-9
              h-9
              navbar-logo
              text-white
              flex
              items-center
              justify-center
              text-[14px]
              font-bold
              tracking-tight
            "
          >
            SP
          </div>

          <span
            className="
              navbar-brand-name
              text-[10px]
              font-semibold
              tracking-[0.04em]
              uppercase
            "
          >
            SUMIT PATEL
          </span>
        </motion.a>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* ========================================
            NAVIGATION
        ======================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-10
            text-[11px]
            font-medium
            uppercase
            tracking-[0.08em]
          "
        >
          <motion.a
            href="#about"
            className={navLinkClass("about")}
            onClick={handleNavClick("about")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            About
          </motion.a>

          <motion.a
            href="#skills"
            className={navLinkClass("skills")}
            onClick={handleNavClick("skills")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
          >
            Skills
          </motion.a>

          <motion.a
            href="#projects"
            className={navLinkClass("projects")}
            onClick={handleNavClick("projects")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.38 }}
          >
            Projects
          </motion.a>

          <motion.a
            href="#tech-stack"
            className={navLinkClass("tech-stack")}
            onClick={handleNavClick("tech-stack")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.44 }}
          >
            Tech Stack
          </motion.a>

          <motion.a
            href="#timeline"
            className={navLinkClass("timeline")}
            onClick={handleNavClick("timeline")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
          >
            Timeline
          </motion.a>

          <motion.a
            href="#playground"
            className={navLinkClass("playground")}
            onClick={handleNavClick("playground")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.56 }}
          >
            Playground
          </motion.a>

          <motion.a
            href="#contact"
            className={navLinkClass("contact")}
            onClick={handleNavClick("contact")}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.62 }}
          >
            Contact Me
          </motion.a>
        </div>

        <div
          id="mobile-navigation"
          className={`mobile-navigation ${isMenuOpen ? "is-open" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <a
            href="#about"
            className={navLinkClass("about")}
            onClick={handleNavClick("about")}
          >
            About
          </a>
          <a
            href="#skills"
            className={navLinkClass("skills")}
            onClick={handleNavClick("skills")}
          >
            Skills
          </a>
          <a
            href="#projects"
            className={navLinkClass("projects")}
            onClick={handleNavClick("projects")}
          >
            Projects
          </a>
          <a
            href="#tech-stack"
            className={navLinkClass("tech-stack")}
            onClick={handleNavClick("tech-stack")}
          >
            Tech Stack
          </a>
          <a
            href="#timeline"
            className={navLinkClass("timeline")}
            onClick={handleNavClick("timeline")}
          >
            Timeline
          </a>
          <a
            href="#playground"
            className={navLinkClass("playground")}
            onClick={handleNavClick("playground")}
          >
            Playground
          </a>
          <a
            href="#contact"
            className={navLinkClass("contact")}
            onClick={handleNavClick("contact")}
          >
            Contact Me
          </a>
        </div>

        {/* ========================================
            RESUME
        ======================================== */}

        <motion.a
          href="/resume.pdf"
          download="Sumit_Patel_Resume.pdf"
          className="
    navbar-resume
    border
    border-black
    rounded-md
    px-5
    py-3
    text-[11px]
    font-semibold
    uppercase
    tracking-[0.08em]
    inline-flex
    items-center
    gap-2
  "
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.7 }}
        >
          Resume
          <svg
            className="navbar-resume-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 11 5 5 5-5" />
            <path d="M4 21h16" />
          </svg>
        </motion.a>
      </nav>
    </motion.header>
  );
}
