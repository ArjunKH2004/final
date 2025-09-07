"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    image: "/images/why/clarity.png",
    title: "Instant Clarity",
    description: "No more guessing what works.",
  },
  {
    image: "/images/why/engagement.png",
    title: "Boost Engagement",
    description: "Get actionable suggestions to keep viewers hooked.",
  },
  {
    image: "/images/why/radar.png",
    title: "Audience Radar",
    description: "See who's tuning in, from where, and why.",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-gilroy text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Introducing{" "}
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              StreamSift
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            StreamSift is your all-in-one, real-time audience intelligence tool
            for streamers and content creators.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-6 font-medium">
            It breaks down the "what just happened?" moments during your streams
            – and turns them into "here's exactly why!"
          </p>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mt-6 font-medium">
            Whether you're on Twitch, YouTube, or Instagram Live, StreamSift
            pulls in data from all your platforms to give you instant,
            AI-powered insights on what your audience loves, skips, or drops off
            from – so you can stream smarter, not harder.
          </p>
        </motion.div>

        {/* Why StreamSift Section */}
        <motion.div
          className="relative text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/why/background.png"
              alt="Why StreamSift Background"
              fill
              className="object-cover opacity-80"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 py-20">
            <h3
              className="text-white mb-16"
              style={{
                fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '3rem',
                fontWeight: '700',
                lineHeight: 'normal',
                letterSpacing: '-0.05rem'
              }}
            >
              Why StreamSift?
            </h3>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto px-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Feature Image */}
                  <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h4
                    className="text-white mb-6"
                    style={{
                      fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      lineHeight: 'normal'
                    }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className="text-gray-300 max-w-xs mx-auto"
                    style={{
                      fontFamily: 'Gilroy, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontSize: '1rem',
                      fontWeight: '400',
                      lineHeight: '1.5'
                    }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}
