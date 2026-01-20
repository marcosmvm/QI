"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/marketing/layout/Container";

const stats = [
  { value: "50M+", label: "Emails Delivered", suffix: "" },
  { value: "95", label: "Avg Deliverability", suffix: "%" },
  { value: "3.5", label: "Avg Reply Rate", suffix: "%" },
  { value: "200", label: "Happy Clients", suffix: "+" },
];

export function StatsBar() {
  return (
    <section className="py-20 bg-gradient-to-r from-deep-space via-midnight-blue to-deep-space">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative">
                <span className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-quantum-violet">
                  {stat.value}
                </span>
                <span className="text-2xl md:text-3xl font-sora font-bold text-electric-cyan">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-steel mt-2 text-sm md:text-base font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
