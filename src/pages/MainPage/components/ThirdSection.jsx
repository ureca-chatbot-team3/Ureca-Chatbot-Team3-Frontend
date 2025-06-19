import { motion } from 'motion/react';

const HEADER_HEIGHT = 112;

const ThirdSection = () => {
  return (
    <section className="content-max-width mx-auto h-[calc(100vh-var(--header-height))]">
      <motion.div
        className="text-4xl font-bold"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 3 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        세 번째 섹션
      </motion.div>
    </section>
  );
};

export default ThirdSection;
