'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
  animate?: boolean;
}

export function CountUpNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className = '',
  animate = true,
}: CountUpNumberProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!animate || !isInView) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();
    const durationMs = duration * 1000;

    const animateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / durationMs, 1);

      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animateValue);
  }, [isInView, value, duration, animate]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <motion.span
      ref={ref}
      className={`metric-value ${className}`}
      initial={animate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </motion.span>
  );
}

// Simplified version without framer-motion dependency for static contexts
export function CountUpNumberSimple({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className = '',
}: Omit<CountUpNumberProps, 'animate'>) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);

          const startTime = Date.now();
          const durationMs = duration * 1000;

          const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setDisplayValue(eased * value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className={`metric-value ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
