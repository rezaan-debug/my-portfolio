import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { ZarneyAvatar } from "@/components/Zarney";

const STORAGE_KEY = "raf-welcome-seen";

type Position = { top: number; left: number; arrowLeft: number };

/** First-visit introduction: a centered welcome, followed by tips at their controls. */
export function WelcomeSequence() {
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState<Position | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setStep(1);
    } catch {
      /* Storage unavailable — never interrupt the site. */
    }
  }, []);

  useEffect(() => {
    if (step) actionRef.current?.focus();
  }, [step]);

  useLayoutEffect(() => {
    if (step < 2) return;
    const target = document.querySelector<HTMLElement>(
      `[data-tour-target="${step === 2 ? "theme" : "zarney"}"]`,
    );
    const tip = tipRef.current;
    if (!target || !tip) return;

    const update = () => {
      const rect = target.getBoundingClientRect();
      const width = tip.offsetWidth;
      const height = tip.offsetHeight;
      const left = Math.max(16, Math.min(rect.right - width, window.innerWidth - width - 16));
      const top = step === 2
        ? Math.min(rect.bottom + 16, window.innerHeight - height - 16)
        : Math.max(16, rect.top - height - 16);
      setPosition({ top, left, arrowLeft: Math.max(18, Math.min(rect.left + rect.width / 2 - left, width - 18)) });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(tip);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [step]);

  function finish() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Storage unavailable. */
    }
    setStep(0);
  }

  useEffect(() => {
    if (!step) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  const steps = [
    null,
    {
      title: "Welcome",
      icon: <Sparkles className="h-6 w-6 text-gold" aria-hidden="true" />,
      body: <><p>Hi, I'm <strong>Rezaan Achmat Fredericks</strong> — welcome to my portfolio.</p><p className="mt-2 text-muted-foreground">Explore my work at the intersection of design and development.</p></>,
      cta: "Explore My Portfolio",
    },
    {
      title: "Light & Dark Mode",
      icon: isDark ? <Moon className="h-6 w-6 text-teal" aria-hidden="true" /> : <Sun className="h-6 w-6 text-gold" aria-hidden="true" />,
      body: <><p>You're viewing the site in {isDark ? "dark" : "light"} mode.</p><p className="mt-2 text-muted-foreground">Use the toggle to switch between light and dark mode.</p></>,
      cta: "Continue",
    },
    {
      title: "Meet Zarney",
      icon: <ZarneyAvatar size={28} />,
      body: <><p>Zarney is my AI portfolio assistant.</p><p className="mt-2 text-muted-foreground">Ask about my skills, projects, experience, or how to reach me.</p></>,
      cta: "Got it",
    },
  ] as const;

  const current = steps[step] ?? null;
  if (!current) return null;

  const content = (
    <>
      <div className={`flex items-center ${step === 1 ? "flex-col" : "gap-3"}`}>
        <div className={`flex shrink-0 items-center justify-center rounded-full bg-primary/10 ${step === 1 ? "mb-4 h-14 w-14" : "h-11 w-11"}`}>
          {current.icon}
        </div>
        <h2 className={`font-display font-bold ${step === 1 ? "text-2xl" : "text-lg"}`}>{current.title}</h2>
      </div>
      <div className="mt-3 text-sm leading-relaxed">{current.body}</div>
      <div className={`mt-5 flex gap-1.5 ${step === 1 ? "justify-center" : ""}`} aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"}`} />
        ))}
      </div>
      <Button ref={actionRef} type="button" onClick={() => step === 3 ? finish() : setStep(step + 1)} className="mt-5 h-11 w-full rounded-full font-display font-semibold">
        {current.cta}
      </Button>
    </>
  );

  return (
    <AnimatePresence mode="wait">
      {step === 1 ? (
        <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-label="Welcome" className="glass w-full max-w-md p-7 text-center">
            {content}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={`tip-${step}`}
          ref={tipRef}
          role="dialog"
          aria-label={current.title}
          initial={{ opacity: 0, y: step === 2 ? -8 : 8 }}
          animate={{ opacity: position ? 1 : 0, y: 0 }}
          exit={{ opacity: 0 }}
          className="glass fixed z-[70] w-[min(320px,calc(100vw-2rem))] p-5 shadow-xl"
          style={{ top: position?.top ?? -9999, left: position?.left ?? 16 }}
        >
          <span aria-hidden="true" className={`absolute h-3 w-3 rotate-45 border-border bg-card ${step === 2 ? "-top-1.5 border-l border-t" : "-bottom-1.5 border-b border-r"}`} style={{ left: (position?.arrowLeft ?? 28) - 6 }} />
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}