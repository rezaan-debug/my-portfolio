import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { ZarneyAvatar } from "@/components/Zarney";

const STORAGE_KEY = "raf-welcome-seen";

/**
 * First-visit welcome experience, tracked per browser session:
 * 1) Welcome popup  2) Theme toggle introduction  3) Zarney introduction.
 */
export function WelcomeSequence() {
  const [step, setStep] = useState(0); // 0 hidden, 1 welcome, 2 theme, 3 zarney
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        setStep(1);
      }
    } catch {
      /* storage unavailable — never interrupt */
    }
  }, []);

  function finish() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setStep(0);
  }

  function next() {
    setStep((s) => (s >= 3 ? 0 : s + 1));
    if (step === 3) finish();
  }

  const steps = [
    null,
    {
      title: "Welcome",
      icon: <Sparkles className="h-6 w-6 text-gold" aria-hidden="true" />,
      body: (
        <>
          <p>
            Hi, I'm <strong>Rezaan Achmat Fredericks</strong> — welcome to my
            portfolio.
          </p>
          <p className="mt-2 text-muted-foreground">
            Explore my work at the intersection of design and development.
          </p>
        </>
      ),
      cta: "Explore My Portfolio",
      ariaLabel: "Welcome",
    },
    {
      title: "Light & Dark Mode",
      icon: isDark ? (
        <Moon className="h-6 w-6 text-teal dark:text-teal" aria-hidden="true" />
      ) : (
        <Sun className="h-6 w-6 text-gold" aria-hidden="true" />
      ),
      body: (
        <>
          <p>You're viewing the site in {isDark ? "dark" : "light"} mode.</p>
          <p className="mt-2 text-muted-foreground">
            Use the toggle in the navigation at any time to switch — every page
            adapts beautifully to both themes.
          </p>
        </>
      ),
      cta: "Continue",
      ariaLabel: "Theme toggle introduction",
    },
    {
      title: "Meet Zarney",
      icon: <ZarneyAvatar size={28} dark={isDark} />,
      body: (
        <>
          <p>
            Zarney is my AI portfolio assistant, floating at the bottom-right
            corner.
          </p>
          <p className="mt-2 text-muted-foreground">
            Drag Zarney anywhere you like and ask about my skills, projects,
            experience, or how to reach me.
          </p>
        </>
      ),
      cta: "Got it",
      ariaLabel: "Zarney introduction",
    },
  ] as const;

  const current = steps[step] ?? null;
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="welcome-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
        role="presentation"
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={current.ariaLabel}
          className="glass w-full max-w-md rounded-3xl p-7 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            {current.icon}
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            {current.title}
          </h2>
          <div className="mt-3 text-sm leading-relaxed">{current.body}</div>
          <div className="mt-6 flex justify-center gap-1.5" aria-hidden="true">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="theme-transition mt-6 w-full rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {current.cta}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
