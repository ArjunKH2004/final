"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Earth positioned as curved horizon at bottom like in reference */}
      {/* Mobile version */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-0 sm:hidden"
        style={{ bottom: "5%", width: "200%" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <Image
            src="/images/hero/Earth.png"
            alt="Earth"
            width={2500}
            height={1250}
            className="w-full object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Desktop version */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-0 hidden sm:block"
        style={{ bottom: "-20%", width: "150%" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <Image
            src="/images/hero/Earth.png"
            alt="Earth"
            width={2500}
            height={1250}
            className="w-full object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-5">
              <span className="text-white text-center block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight font-gilroy mb-2">
                Understand Your Audience.
              </span>
              <span className="text-center block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight font-gilroy bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                Instantly.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 font-medium px-4">
              Live Analytics in Real Time
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Image
                src="/images/hero/Analyze-btn.png"
                alt="Analyze My Stream"
                width={320}
                height={85}
                className="cursor-pointer hover:opacity-90 transition-opacity w-64 sm:w-72 md:w-80 h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Icons - positioned exactly like reference */}
      <div className="absolute inset-0 z-0">
        {/* Kick icon - top left */}
        <motion.div
          className="absolute hidden sm:block"
          style={{ top: "15%", left: "5%" }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/hero/kick.png"
            alt="Kick"
            width={60}
            height={60}
            className="object-contain sm:w-16 sm:h-16 lg:w-20 lg:h-20"
          />
        </motion.div>

        {/* YouTube icon - top right */}
        <motion.div
          className="absolute hidden sm:block"
          style={{ top: "25%", right: "5%" }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image
            src="/images/hero/youtube.png"
            alt="YouTube"
            width={70}
            height={70}
            className="object-contain sm:w-18 sm:h-18 lg:w-22 lg:h-22"
          />
        </motion.div>

        {/* Instagram icon - bottom left */}
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: "35%", left: "8%" }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Image
            src="/images/hero/insta.png"
            alt="Instagram"
            width={80}
            height={80}
            className="object-contain md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
        </motion.div>

        {/* Twitch icon - bottom right */}
        <motion.div
          className="absolute hidden md:block"
          style={{ bottom: "25%", right: "8%" }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <Image
            src="/images/hero/twitch.png"
            alt="Twitch"
            width={90}
            height={90}
            className="object-contain md:w-22 md:h-22 lg:w-28 lg:h-28"
          />
        </motion.div>
      </div>
    </section>
  );
}
