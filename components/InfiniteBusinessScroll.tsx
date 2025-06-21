"use client";
import { motion, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const businessTypes = [
  { title: "Dental Clinics", emoji: "🦷" },
  { title: "Boutique Stores", emoji: "👜" },
  { title: "Restaurants", emoji: "🍲" },
  { title: "Coaching Businesses", emoji: "🎤" },
  { title: "Real Estate", emoji: "🏡" },
  { title: "Freelancers", emoji: "💻" },
  { title: "Pet Services", emoji: "🐾" },
  { title: "Fitness Studios", emoji: "🏋️" },
  { title: "Wedding Planners", emoji: "💍" },
  { title: "Repair Shops", emoji: "🔧" },
  { title: "Music Teachers", emoji: "🎸" },
  { title: "Bakers", emoji: "🧁" },
];

export default function InfiniteBusinessScroll() {
  const x = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((t, delta) => {
    if (containerRef.current) {
      x.current -= delta * 0.1; // speed multiplier
      if (x.current < -2000) x.current = 0;
      containerRef.current.style.transform = `translateX(${x.current}px)`;
    }
  });

  const repeated = [...businessTypes, ...businessTypes, ...businessTypes, ...businessTypes];

  return (
    <div className="relative overflow-hidden py-16 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
        Perfect for Any Business
      </h2>
      <p className="text-center text-gray-600 mb-10">
        From solopreneurs to enterprise teams—Nexus flows for all.
      </p>

      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-6 will-change-transform"
        >
          {repeated.map((biz, idx) => (
            <motion.div
              key={idx}
              className="min-w-[200px] bg-white/80 rounded-2xl shadow-lg p-6 border border-white/40 backdrop-blur-lg flex-shrink-0 hover:border-[1.5px] hover:border-amber-300"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl mb-3">{biz.emoji}</div>
              <div className="text-lg font-semibold text-gray-800">
                {biz.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
