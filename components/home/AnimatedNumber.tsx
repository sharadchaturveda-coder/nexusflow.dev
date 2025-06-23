import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
}

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  const spring = useSpring(0, { mass: 0.1, stiffness: 250, damping: 35 }); // Even more aggressive spring
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}
