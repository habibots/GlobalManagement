import { motion } from 'motion/react';

interface AnimatedHeroProps {
  title: string;
  titleAccent: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function AnimatedHero({
  title,
  titleAccent,
  tagline,
  description,
  ctaText,
  ctaHref,
  secondaryText,
  secondaryHref
}: AnimatedHeroProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1B3A5C]/10 border border-[#1B3A5C]/20 text-[#1B3A5C] rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-[#C17817] rounded-full"></span>
          Nevada Licensed Contractor #66668
        </span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
      >
        <span className="text-[#1a1a1a]">{title}</span>
        <br />
        <span className="text-[#C17817]">
          {titleAccent}
        </span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-xl sm:text-2xl text-[#1B3A5C] font-medium mb-6"
      >
        {tagline}
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="text-lg text-[#4B5563] mb-10 max-w-lg"
      >
        {description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        className="flex flex-wrap gap-4"
      >
        <a 
          href={ctaHref}
          className="group px-8 py-4 bg-[#C17817] hover:bg-[#A66614] text-white font-semibold rounded-xl transition-all duration-300 active:scale-95"
        >
          {ctaText}
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
        </a>
        {secondaryText && secondaryHref && (
          <a 
            href={secondaryHref}
            className="px-8 py-4 bg-[#1B3A5C]/5 hover:bg-[#1B3A5C]/10 text-[#1B3A5C] font-semibold rounded-xl transition-all duration-300 border border-[#1B3A5C]/20 hover:border-[#1B3A5C]/40 active:scale-95"
          >
            {secondaryText}
          </a>
        )}
      </motion.div>
    </div>
  );
}
