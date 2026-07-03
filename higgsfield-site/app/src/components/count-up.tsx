import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Animated counter that writes to the DOM node directly (no React state per
 * frame). Renders the final value on the server and under reduced motion.
 */
export function CountUp({
  to,
  format = (v) => Math.round(v).toString(),
  duration = 1.6,
}: {
  to: number;
  format?: (value: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, format]);

  return <span ref={ref}>{format(to)}</span>;
}
