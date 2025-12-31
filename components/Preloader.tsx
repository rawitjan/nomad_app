import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading time
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-neo-dark flex flex-col justify-between p-6 md:p-12 cursor-wait"
    >
      {/* Top Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 text-neo-sand/50 font-display tracking-widest uppercase text-sm"
      >
        <Compass className="w-4 h-4 animate-spin-slow" />
        <span>Loading Experience</span>
      </motion.div>

      {/* Center Brand */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center overflow-hidden">
        <motion.h1 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="text-[12vw] md:text-[15vw] leading-none font-black font-display text-transparent stroke-text select-none opacity-20 whitespace-nowrap"
          style={{ WebkitTextStroke: '1px #F5E6CA' }}
        >
          NOMAD
        </motion.h1>
      </div>

      {/* Bottom Section */}
      <div className="flex items-end justify-between relative z-10">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block text-neo-sand/50 text-xs max-w-[200px]"
        >
            Preparing route data... <br />
            Calibrating map interface...
        </motion.div>

        {/* Big Counter */}
        <div className="flex flex-col items-end">
             <motion.div 
                className="text-8xl md:text-9xl font-black font-display text-neo-lime leading-none"
             >
                {count}%
             </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;