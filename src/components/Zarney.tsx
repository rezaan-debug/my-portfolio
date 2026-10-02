import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { askZarney } from "@/lib/zarney.functions";
import { useTheme } from "@/lib/theme";

/** Zarney's avatar — theme-aware light/dark variants. */
function ZarneyAvatar({ size = 28, dark }: { size?: number; dark: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`zarney-g-${dark ? "d" : "l"}`} x1="6" y1="6" x2="42" y2="42">
          <stop offset="0%" stopColor={dark ? "#2DD4BF" : "#0F766E"} />
          <stop offset="100%" stopColor={dark ? "#E24BA6" : "#A02B93"} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill={`url(#zarney-g-${dark ? "d" : "l"})`} />
      {/* Face */}
      <circle cx="17" cy="20" r="2.2" fill={dark ? "#0c1116" : "#ffffff"} />
      <circle cx="31" cy="20" r="2.2" fill={dark ? "#0c1116" : "#ffffff"} />
      <path
        d="M16 29c2.4 2.6 5.2 3.9 8 3.9s5.6-1.3 8-3.9"
        stroke={dark ? "#0c1116" : "#ffffff"}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Antenna spark */}
      <circle cx="24" cy="6.5" r="2" fill="#C9A84C" />
ge    </svg>
  );
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Zarney, Rezaan's portfolio assistant. Ask me about her background, skills, projects, experience, education, or how to get in touch.",
};

export function Zarney() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const ask = useServerFn(askZarney);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading, open]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const history = messages
      .filter((m) => m !== GREETING)
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await ask({ data: { message: text, history } });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry — something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating, draggable launcher */}
      <motion.button
        type="button"
        drag={!reduceMotion}
        dragMomentum={false}
        dragElastic={0.12}
        whileDrag={{ scale: 1.06, cursor: "grabbing" }}
        onClick={() => setOpen((v) => !v)}
        className="glass fixed bottom-5 right-5 z-50 flex cursor-grab items-center gap-2.5 rounded-full py-2.5 pl-3 pr-4 shadow-xl"
        aria-expanded={open}
        aria-label={open ? "Close Zarney assistant" : "Open Zarney assistant"}
      >
        <ZarneyAvatar dark={theme === "dark"} />
        <span className="font-display text-sm font-semibold">Zarney</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-label="Zarney portfolio assistant"
            className="glass fixed bottom-20 right-5 z-50 flex h-[min(520px,calc(100dvh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <ZarneyAvatar size={26} dark={theme === "dark"} />
                <div>
                  <p className="font-display text-sm font-semibold leading-tight">Zarney</p>
                  <p className="text-[11px] leading-tight text-muted-foreground">
                    Portfolio assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="theme-transition inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "mr-auto bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3" aria-label="Zarney is typing">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/70"
                      style={{ animationDelay: `${d * 150}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={send} className="border-t border-border/50 p-3">
              <div className="flex items-center gap-2">
                <label htmlFor="zarney-input" className="sr-only">
                  Ask Zarney a question
                </label>
                <input
                  id="zarney-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Rezaan's portfolio…"
                  maxLength={1000}
                  className="min-w-0 flex-1 rounded-full border border-input bg-background/60 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-primary/60"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="theme-transition inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen-reader affordance when launcher icon only */}
      <span className="sr-only" aria-hidden="true">
        <MessageCircle />
      </span>
    </>
  );
}
