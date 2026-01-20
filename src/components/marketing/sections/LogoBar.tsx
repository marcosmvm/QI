"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/marketing/layout/Container";

const clients = [
  { name: "TechCorp", logo: "/logos/placeholder.svg" },
  { name: "SaaS Pro", logo: "/logos/placeholder.svg" },
  { name: "DataFlow", logo: "/logos/placeholder.svg" },
  { name: "CloudNine", logo: "/logos/placeholder.svg" },
  { name: "ScaleUp", logo: "/logos/placeholder.svg" },
  { name: "GrowthCo", logo: "/logos/placeholder.svg" },
];

export function LogoBar() {
  return (
    <section className="py-16 border-y border-slate-200 bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">
            Trusted by 200+ B2B Companies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              {/* Placeholder logo - replace with actual logos */}
              <div className="h-10 w-32 bg-white border border-slate-200 rounded-lg flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-slate-600 text-sm font-medium">{client.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
