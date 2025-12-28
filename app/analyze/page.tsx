"use client";

import { useState } from "react";
import { ChevronDown, Check, Users, Eye, MessageCircle, Heart, Play, UserPlus, TrendingUp, Smile, Meh, Frown, ArrowUp, ArrowDown, Minus } from "lucide-react";
import Navigation from "@/components/Navigation";
import Image from "next/image";

const platforms = [
    { id: "twitch", name: "Twitch" },
    { id: "youtube", name: "YouTube" },
    { id: "kick", name: "Kick" },
    { id: "facebook", name: "Facebook Gaming" },
];

const chatComments = [
    { id: 1, username: "Kowdiar I'm Back", message: "What is happening here?", color: "#8B5CF6" },
    { id: 2, username: "Hunter Sportacus", message: "This video is so exhausting...", color: "#EF4444" },
    { id: 3, username: "Galaxy CoolBoy", message: "Informative Content", color: "#22C55E" },
    { id: 4, username: "Kowdiar I'm Back", message: "What is happening here?", color: "#8B5CF6" },
    { id: 5, username: "Hunter Sportacus", message: "This video is so exhausting...", color: "#EF4444" },
];

const streamStats = [
    { icon: Users, value: "1247", label: "Current Viewers", color: "text-purple-400" },
    { icon: Eye, value: "1895", label: "Peak Viewers", color: "text-blue-400" },
    { icon: MessageCircle, value: "324", label: "Total Comments", color: "text-cyan-400" },
    { icon: Heart, value: "8.7%", label: "Engagement", color: "text-pink-400" },
    { icon: Play, value: "4:32", label: "Avg. Watch Time", color: "text-green-400" },
    { icon: UserPlus, value: "+23", label: "New Followers", color: "text-orange-400" },
];

export default function AnalyzePage() {
    const [streamUrl, setStreamUrl] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAnalyze = () => {
        if (streamUrl && selectedPlatform) {
            console.log("Analyzing:", streamUrl, "on", selectedPlatform);
        }
    };

    const selectedPlatformName =
        platforms.find((p) => p.id === selectedPlatform)?.name || "Select Platform";

    return (
        <main className="relative bg-black min-h-screen">
            <Navigation />

            {/* Get Started Section */}
            <section className="flex items-center justify-center pt-8 pb-12 px-4">
                <div className="w-full max-w-4xl">
                    {/* Gradient Border Container */}
                    <div className="relative p-[2px] rounded-2xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400">
                        <div className="bg-[#0a0a0a] rounded-2xl px-6 sm:px-12 py-10 sm:py-14">
                            {/* Title */}
                            <h2 className="text-white text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">
                                Get Started
                            </h2>

                            {/* Input Container */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                {/* Stream URL Input */}
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={streamUrl}
                                        onChange={(e) => setStreamUrl(e.target.value)}
                                        placeholder="Enter Stream URL"
                                        className="w-full px-5 py-4 bg-[#2a2a2a] text-gray-300 placeholder-gray-500 rounded-lg border-none outline-none focus:ring-2 focus:ring-purple-500 transition-all text-base"
                                    />
                                </div>

                                {/* Platform Dropdown */}
                                <div className="relative md:w-48">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full px-5 py-4 bg-[#2a2a2a] text-gray-300 rounded-lg border-none outline-none flex items-center justify-between gap-2 hover:bg-[#333] transition-colors text-base"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-purple-400" />
                                            {selectedPlatformName}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#2a2a2a] rounded-lg shadow-xl overflow-hidden z-20 border border-gray-700">
                                            {platforms.map((platform) => (
                                                <button
                                                    key={platform.id}
                                                    onClick={() => {
                                                        setSelectedPlatform(platform.id);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`w-full px-5 py-3 text-left text-gray-300 hover:bg-[#3a3a3a] transition-colors flex items-center gap-2 ${selectedPlatform === platform.id
                                                        ? "bg-purple-600/20 text-purple-400"
                                                        : ""
                                                        }`}
                                                >
                                                    {selectedPlatform === platform.id && (
                                                        <Check className="w-4 h-4" />
                                                    )}
                                                    {platform.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Analyze Button */}
                            <button
                                onClick={handleAnalyze}
                                className="w-full py-4 rounded-lg font-semibold text-white text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/30"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #8B5CF6 0%, #6366F1 35%, #3B82F6 65%, #06B6D4 100%)",
                                }}
                            >
                                Analyze my Stream
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stream Analytics Section */}
            <section className="px-4 pb-16">
                <div className="w-full max-w-5xl mx-auto space-y-6">

                    {/* Video Preview with Chat */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Video Preview */}
                        <div className="flex-1 rounded-xl overflow-hidden bg-[#1a1a1a]">
                            <Image
                                src="/images/analyze/analyze.png"
                                alt="Stream Preview"
                                width={800}
                                height={450}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Live Chat */}
                        <div className="lg:w-64 bg-[#1a1a1a] rounded-xl p-4 max-h-[320px] overflow-y-auto">
                            <div className="space-y-3">
                                {chatComments.map((comment) => (
                                    <div key={comment.id} className="flex gap-2">
                                        <div
                                            className="w-1 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: comment.color }}
                                        />
                                        <div>
                                            <p className="text-sm font-semibold" style={{ color: comment.color }}>
                                                {comment.username}
                                            </p>
                                            <p className="text-gray-400 text-xs">{comment.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stream Insights */}
                    <div className="bg-[#1a1a1a] rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                            <h3 className="text-white text-lg font-bold">Stream Insights</h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {streamStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                        <span className="text-white text-2xl font-bold">{stat.value}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Audience Sentiment Analysis */}
                    <div className="bg-[#1a1a1a] rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                                <Smile className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="text-white text-lg font-bold">Audience Sentiment Analysis</h3>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Current Stream Sentiment */}
                            <div className="lg:w-1/3">
                                <p className="text-gray-400 text-sm mb-4">Current Stream Sentiment</p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Smile className="w-5 h-5 text-green-400" />
                                            <span className="text-white">Positive</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-400 font-bold">62%</span>
                                            <ArrowUp className="w-4 h-4 text-green-400" />
                                            <span className="text-gray-500 text-sm">7%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Meh className="w-5 h-5 text-blue-400" />
                                            <span className="text-white">Neutral</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-400 font-bold">20%</span>
                                            <Minus className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-500 text-sm">0%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Frown className="w-5 h-5 text-red-400" />
                                            <span className="text-white">Negative</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-400 font-bold">18%</span>
                                            <ArrowDown className="w-4 h-4 text-red-400" />
                                            <span className="text-gray-500 text-sm">7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sentiment Distribution */}
                            <div className="lg:flex-1">
                                <p className="text-gray-400 text-sm mb-4">Sentiment Distribution</p>
                                {/* Sentiment Bar */}
                                <div className="flex h-8 rounded-lg overflow-hidden mb-4">
                                    <div className="bg-gradient-to-r from-green-500 to-green-400" style={{ width: "62%" }}></div>
                                    <div className="bg-gradient-to-r from-red-400 to-red-500" style={{ width: "18%" }}></div>
                                    <div className="bg-gradient-to-r from-cyan-400 to-cyan-500" style={{ width: "20%" }}></div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-gray-400 text-sm">
                                        Overall Stream Tone: <span className="text-green-400 font-semibold">Positive</span>
                                    </p>
                                    <p className="text-gray-500 text-xs">More positive than last stream</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

