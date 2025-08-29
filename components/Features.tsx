"use client";

import { motion } from "framer-motion";
import { Eye, Zap, Radar } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Instant Clarity",
    description: "No more guessing what works.",
    subtitle: "Get actionable suggestions to keep viewers hooked.",
  },
  {
    icon: Zap,
    title: "Boost Engagement",
    description: "Get actionable suggestions to keep viewers hooked.",
    subtitle: "Optimize your content in real-time.",
  },
  {
    icon: Radar,
    title: "Audience Radar",
    description: "See who's tuning in, from where, and why.",
    subtitle: "Understand your global reach.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Introducing{" "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              StreamSift
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            StreamSift is your all-in-one, real-time audience intelligence tool
            for streamers and content creators.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            It breaks down the "what just happened?" moments during your streams
            – and turns them into "here's exactly why!"
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4">
            Whether you're on Twitch, YouTube, or Instagram Live, StreamSift
            pulls in data from all your platforms to give you instant,
            AI-powered insights on what your audience loves, skips, or drops off
            from – so you can stream smarter, not harder.
          </p>
        </motion.div>

        {/* Why StreamSift Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
            Why StreamSift?
          </h3>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-space-purple/50 to-dark-space/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-purple rounded-2xl flex items-center justify-center">
                      <feature.icon size={32} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 mb-2">{feature.description}</p>
                  <p className="text-sm text-gray-400">{feature.subtitle}</p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-purple rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-space-purple/30 to-dark-space/30 backdrop-blur-lg rounded-3xl p-12 border border-purple-500/20 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Get Started
            </h3>
            <div className="bg-dark-space/80 rounded-2xl p-8 mb-8">
              <div className="text-neon-cyan font-mono text-sm mb-4">
                &gt; Analyze My Stream
              </div>
              <div className="h-2 bg-gradient-purple rounded-full w-3/4 mx-auto"></div>
            </div>
            <motion.button
              className="bg-gradient-purple px-8 py-4 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Analyze My Stream
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
