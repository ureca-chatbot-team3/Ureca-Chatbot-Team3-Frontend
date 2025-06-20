import { motion } from 'framer-motion';

const baseTransition = {
  repeat: Infinity,
  repeatType: 'loop',
  ease: 'easeInOut',
};

const bubbleVariants = {
  initial: { y: 0, scale: 0.9 },
  float: {
    y: [0, -20, 0],
    scale: [0.9, 1.1, 0.9],
  },
};

const bubbles = [
  { size: 120, left: '-1%', top: '75%', color: '#AEE6F9', delay: 0 },
  { size: 80, left: '25%', top: '35%', color: '#C5A6CD67', delay: 0.8 },
  { size: 100, left: '70%', top: '65%', color: '#FFE4FA', delay: 1.2 },
  { size: 180, left: '90%', top: '25%', color: '#FFF1E6', delay: 0.4 },
];

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="px-[40px] bg-linear-[to_bottom,var(--color-white)_30%,var(--color-purple-200)_58%] bg-fixed bg-cover bg-center min-h-[calc(100vh-var(--header-height))]">
      <div className="fixed inset-0 pointer-events-none">
        {bubbles.map((bubble, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
              left: bubble.left,
              top: bubble.top,
            }}
            variants={bubbleVariants}
            initial="initial"
            animate="float"
            transition={{
              ...baseTransition,
              delay: bubble.delay,
              duration: 6 + i,
            }}
          />
        ))}
      </div>

      <div className="relative">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
