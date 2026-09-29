import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface DecryptionIntroProps {
  onComplete: () => void;
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%@";

export default function DecryptionIntro({
  onComplete,
}: DecryptionIntroProps) {
  const [text, setText] = useState("########################");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let completionTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      iteration += 1;

      const target = "DEVELOPED BY SUMIT PATEL";

      setText(
        target
          .split("")
          .map((char, index) => {
            if (index < iteration) return char;
            if (char === " ") return " ";
            return characters[
              Math.floor(Math.random() * characters.length)
            ];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(interval);

        setIsComplete(true);

        completionTimeout = setTimeout(() => {
          onComplete();
        }, 850);
      }
    }, 65);

    return () => {
      clearInterval(interval);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="decrypt-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="decrypt-content">
        <motion.div
          className="decrypt-small"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          SYSTEM DECRYPTION
        </motion.div>

        <motion.div
          className="decrypt-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 0 : 1 }}
          transition={{ duration: 0.7 }}
        >
          {text}
        </motion.div>
      </div>
    </motion.div>
  );
}