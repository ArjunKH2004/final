"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Earth positioned much lower like in reference */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-0" style={{ bottom: '-1150px', width: '2500px' }}>
        <Image
          src="/images/hero/Earth.png"
          alt="Earth"
          width={2500}
          height={1250}
          className="w-full object-contain"
          priority
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center pt-20 pb-16 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-5">
              <span
                className="text-white text-center block"
                style={{
                  width: '699px',
                  fontSize: '55px',
                  fontWeight: '700',
                  lineHeight: 'normal',
                  letterSpacing: '-2.2px',
                  textEdge: 'cap',
                  leadingTrim: 'both',
                  fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  margin: '0 auto'
                }}
              >
                Understand Your Audience.
              </span>
              <br />
              <span
                className="text-center block"
                style={{
                  width: '699px',
                  textAlign: 'center',
                  leadingTrim: 'both',
                  textEdge: 'cap',
                  fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '10.4375rem',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  lineHeight: 'normal',
                  letterSpacing: '-0.4175rem',
                  background: 'linear-gradient(225deg, #1ACFFE 16.93%, #7629FE 57.3%, #5F28FF 86.7%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: '0 auto'
                }}
              >
                Instantly.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 font-medium">
              Live Analytics in Real Time
            </p>

            {/* Keep the existing button design */}
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
                className="cursor-pointer hover:opacity-90 transition-opacity"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Icons - positioned exactly like reference */}
      <div className="absolute inset-0 z-0">
        {/* Kick icon - top left */}
        <motion.div
          className="absolute"
          style={{ top: '15%', left: '10%' }}
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
            width={80}
            height={80}
            className="object-contain"
          />
        </motion.div>

        {/* YouTube icon - top right */}
        <motion.div
          className="absolute"
          style={{ top: '25%', right: '12%' }}
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
            width={90}
            height={90}
            className="object-contain"
          />
        </motion.div>

        {/* Instagram icon - bottom left */}
        <motion.div
          className="absolute"
          style={{ bottom: '35%', left: '15%' }}
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
            width={100}
            height={100}
            className="object-contain"
          />
        </motion.div>

        {/* Twitch icon - bottom right */}
        <motion.div
          className="absolute"
          style={{ bottom: '25%', right: '15%' }}
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
            width={110}
            height={110}
            className="object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
