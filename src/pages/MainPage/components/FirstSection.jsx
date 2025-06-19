import { motion } from 'motion/react';

const HEADER_HEIGHT = 112;

const FirstSection = () => {
  return (
    <section className="px-[40px] bg-linear-[to_bottom,var(--color-pink-300),var(--color-white)] h-[calc(100vh-var(--header-height))]">
      <motion.div
        className={`border content-max-width mx-auto text-4xl font-bold`}
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 3 }}
        viewport={{ once: false, amount: 0.9 }}
      >
        첫 번째 섹션
      </motion.div>
    </section>
  );
};

export default FirstSection;
