'use client';

import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'marketing' | 'dashboard' | 'auth';
  children: React.ReactNode;
  className?: string;
  showGrid?: boolean;
}

interface OrbConfig {
  color: 'cyan' | 'violet' | 'mint';
  size: number;
  position: string;
  delay: number;
}

const orbConfigs: Record<string, OrbConfig[]> = {
  marketing: [
    { color: 'cyan', size: 600, position: '-top-40 -left-40', delay: 0 },
    { color: 'violet', size: 500, position: '-bottom-40 -right-40', delay: 2 },
    { color: 'mint', size: 300, position: 'top-1/2 left-1/3', delay: 4 },
  ],
  dashboard: [
    { color: 'cyan', size: 500, position: '-top-60 -left-60', delay: 0 },
    { color: 'violet', size: 400, position: 'bottom-0 -right-40', delay: 3 },
  ],
  auth: [
    { color: 'cyan', size: 500, position: 'top-1/4 -left-1/4', delay: 0 },
    { color: 'violet', size: 400, position: '-bottom-1/4 right-0', delay: 2 },
  ],
};

const orbColors = {
  cyan: 'bg-gradient-radial from-emerald-pro-600/20 to-transparent',
  violet: 'bg-gradient-radial from-emerald-pro-500/15 to-transparent',
  mint: 'bg-gradient-radial from-emerald-pro-400/12 to-transparent',
};

export function AnimatedBackground({
  variant = 'dashboard',
  children,
  className = '',
  showGrid = true,
}: AnimatedBackgroundProps) {
  const orbs = orbConfigs[variant];

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Subtle grid pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(5, 150, 105, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(5, 150, 105, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      )}

      {/* Animated gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.position} rounded-full blur-[100px] pointer-events-none`}
          style={{
            width: orb.size,
            height: orb.size,
            background:
              orb.color === 'cyan'
                ? 'radial-gradient(circle, rgba(5, 150, 105, 0.20) 0%, rgba(5, 150, 105, 0) 70%)'
                : orb.color === 'violet'
                  ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)'
                  : 'radial-gradient(circle, rgba(52, 211, 153, 0.12) 0%, rgba(52, 211, 153, 0) 70%)',
          }}
          animate={{
            scale: [1, 1.1, 0.95, 1.02, 1],
            opacity: [0.6, 1, 0.7, 0.9, 0.6],
            x: [0, 30, 15, -20, 0],
            y: [0, 30, -20, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Static orbs component for simpler use cases
export function AmbientOrbs({ variant = 'dashboard' }: { variant?: 'marketing' | 'dashboard' | 'auth' }) {
  const orbs = orbConfigs[variant];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.position} gradient-orb-${orb.color}-lg`}
          style={{
            width: orb.size,
            height: orb.size,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
