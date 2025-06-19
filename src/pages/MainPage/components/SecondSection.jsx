import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HEADER_HEIGHT = 112;

const SecondSection = () => {
  const ref = useRef(null);

  // 스크롤 진행도 가져오기
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // 스크롤에 따라 점점 투명해짐
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="content-max-width mx-auto h-[calc(100vh-var(--header-height))]">
      <motion.div
        className="sticky top-(--header-height)"
        style={{ opacity }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring' }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <div className="text-4xl font-bold">두 번째 섹션</div>
      </motion.div>
    </section>
  );
};

export default SecondSection;
