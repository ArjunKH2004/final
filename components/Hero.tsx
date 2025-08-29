"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-blue-900"></div>

      {/* Earth at the bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0">
        <Image
          src="/images/hero/Earth.png"
          alt="Earth"
          width={1200}
          height={600}
          className="object-contain"
          priority
        />
      </div>

      {/* Floating Platform Icons */}
      <motion.div
        className="absolute top-32 left-20 z-20"
        animate={{
          y: [-20, 20, -20],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-4 border border-gray-700/50 shadow-2xl">
          <Image
            src="/images/hero/kick.png"
            alt="Kick"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 z-20"
        animate={{
          y: [20, -20, 20],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-4 border border-gray-700/50 shadow-2xl">
          <Image
            src="/images/hero/youtube.png"
            alt="YouTube"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 left-16 z-20"
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-4 border border-gray-700/50 shadow-2xl">
          <Image
            src="/images/hero/insta.png"
            alt="Instagram"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-24 z-20"
        animate={{
          y: [15, -15, 15],
          rotate: [-10, 10, -10],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-3xl p-4 border border-gray-700/50 shadow-2xl">
          <Image
            src="/images/hero/twitch.png"
            alt="Twitch"
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-gilroy text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white block">Understand Your Audience.</span>
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent block">
              Instantly.
            </span>
          </h1>

          <p className="font-gilroy text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
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
              width={280}
              height={70}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
