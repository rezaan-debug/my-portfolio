import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Shared page chrome: fixed elegant background imagery with a theme-aware
 * overlay (readability never drops), plus a soft entrance animation.
 */
export function PageShell({
  image,
  imagePosition = "center",
  imageHeight,
  children,
  className = "",
}: {
  image: string;
  imagePosition?: string;
  imageHeight?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-background/90 dark:bg-background/[0.82] transition-colors duration-[600ms]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-70" />
      </div>
      <motion.main
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
        style={imageHeight ? undefined : undefined}
      >
        {children}
      </motion.main>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pt-32 pb-10 md:pt-40 md:pb-14">
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {intro}
        </p>
      )}
      <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-teal to-primary" aria-hidden="true" />
    </header>
  );
}

export function SectionHeading({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-teal dark:text-teal">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
