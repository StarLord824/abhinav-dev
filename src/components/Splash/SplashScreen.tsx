'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { tips } from './tips';
import Progress from '@/components/Splash/Progress';
import Image from 'next/image';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [tip, setTip] = useState('');
  // const imagePath='/Adobe.png'
  useEffect(() => {
    // Set a random tip
    setTip(tips[Math.floor(Math.random() * tips.length)]);

    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {/* Fantasy Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
        style={{ backgroundImage: '/public/auroraUiUx.jpeg' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.5 }}
      />

      {/* Centered Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Avatar / Initials */}
        <motion.div
          className="text-6xl font-bold tracking-wide drop-shadow-lg text-yellow-400"
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1.2, rotate: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src={'/Adobe.png'}
            alt="Aurora UI/UX Banner"
            // style={{ height: 300, width: 300 }}
            // maintain original dimensions of image
            height={70}
            width={70}
            />
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mt-8">
          <Progress value={progress} />
          <p className="text-sm text-center mt-2 font-light">{`Summoning Projects... ${progress}%`}</p>
        </div>

        {/* Tip Line */}
        <p className="absolute bottom-10 text-xs italic text-slate-300 px-6 text-center max-w-xs">
          {tip}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
