import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const imageX = useSpring(
    useTransform(mouseX, [-700, 700], [-5, 5]),
    {
      stiffness: 60,
      damping: 25,
    }
  );

  const imageY = useSpring(
    useTransform(mouseY, [-500, 500], [-3, 3]),
    {
      stiffness: 60,
      damping: 25,
    }
  );

  const orbitX = useSpring(
    useTransform(mouseX, [-700, 700], [4, -4]),
    {
      stiffness: 50,
      damping: 25,
    }
  );

  const gridX = useSpring(
    useTransform(mouseX, [-700, 700], [-14, 14]),
    {
      stiffness: 45,
      damping: 24,
    }
  );

  const gridY = useSpring(
    useTransform(mouseY, [-500, 500], [-10, 10]),
    {
      stiffness: 45,
      damping: 24,
    }
  );

  const imageRotate = useSpring(
    useTransform(mouseX, [-700, 700], [-1.5, 1.5]),
    {
      stiffness: 50,
      damping: 24,
    }
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(event.clientX - (rect.left + rect.width / 2));
    mouseY.set(event.clientY - (rect.top + rect.height / 2));
  };

  return (
    <main className="hero" onMouseMove={handleMouseMove}>
      {/* ==========================================
          ORBIT — now has an entrance
      ========================================== */}

      <motion.div
        className="hero-orbit"
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.8,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          x: orbitX,
        }}
      />

      <motion.div
        className="hero-grid-orbit"
        style={{
          x: gridX,
          y: gridY,
        }}
        aria-hidden="true"
      />

      {/* ==========================================
          LEFT DESCRIPTION — enhanced with blur
      ========================================== */}

      <motion.div
        className="hero-description"
        initial={{
          opacity: 0,
          x: -18,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
        }}
        transition={{
          duration: 1,
          delay: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="eyebrow">Creative Developer</div>

        <div className="role">
          Web Developer
          <br />
          &amp; Backend Engineer
        </div>
        <div className="hero-value-line">
          I build creative, AI-powered web experiences, powered by Python.
        </div>
      </motion.div>

      {/* ==========================================
          MOVING SUMIT PATEL — fade + blur
      ========================================== */}

      <motion.div
        className="hero-marquee"
        initial={{ opacity: 0, filter: "blur(18px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 1.4,
          delay: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="hero-marquee-track">
          <div className="hero-name">SUMIT PATEL</div>

          <div className="hero-name">SUMIT PATEL</div>

          <div className="hero-name">SUMIT PATEL</div>

          <div className="hero-name">SUMIT PATEL</div>
        </div>
      </motion.div>

      {/* ==========================================
          CENTERED PORTRAIT — fade + scale + blur
      ========================================== */}

      <div className="hero-person-wrapper">
        <motion.img
          src="/assets/sumit.png"
          alt="Sumit Patel"
          className="hero-person"
          initial={{
            opacity: 0,
            scale: 0.94,
            filter: "blur(16px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.3,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            x: imageX,
            y: imageY,
            rotate: imageRotate,
          }}
          draggable={false}
        />
      </div>

      {/* ==========================================
          SCROLL DOWN — enhanced with blur
      ========================================== */}

      <motion.div
        className="scroll-indicator"
        initial={{
          opacity: 0,
          y: 10,
          filter: "blur(8px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        transition={{
          delay: 1.1,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span className="scroll-label">Scroll down</span>

        <span className="scroll-arrow" aria-hidden="true">
          ↓
        </span>
      </motion.div>
    </main>
  );
}