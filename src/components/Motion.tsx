import React from 'react';
import { motion, type Variants } from 'motion/react';

/** Hiệu ứng xuất hiện nhẹ nhàng (fade-in + slide-up) khi phần tử vào viewport. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Container dàn đều các phần tử con lần lượt bay lên (stagger). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}

/** Bọc nội dung để tự động fade-in + slide-up khi cuộn tới. */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  as = 'div',
}) => {
  const Comp = as;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Bọc lưới thẻ để các thẻ con xuất hiện lần lượt theo stagger. */
export const Stagger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={staggerContainer}
    className={className}
  >
    {children}
  </motion.div>
);

/** Một thẻ (card) con dùng chung motion cho hiệu ứng stagger. */
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.div variants={fadeUp} className={className}>
    {children}
  </motion.div>
);

/** Skeleton loading mượt cho các khối nội dung đang tải. */
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`} />
);

/** Skeleton riêng cho thẻ bài học (tựa như khi đang tải danh sách). */
export const LessonCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 space-y-3">
    <div className="flex items-start gap-3">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-5/6" />
    <div className="flex gap-2 pt-1">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
  </div>
);