"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Check, Volume2, VolumeX, Zap, Trophy, TrendingUp, Users, MessageCircle, Smile, Meh, Frown, Info, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import { connectTwitchChannel, connectKickChannel, getTwitchMessages, getKickMessages, getTwitchAnalytics, getKickAnalytics, compareStreams } from "@/app/services/api";

declare global {
    interface Window { Twitch: any; }
}

const platforms = [
    { id: "twitch", name: "Twitch", color: "#9146FF" },
    { id: "kick", name: "Kick", color: "#53FC18" },
];

interface StreamState {
    platform: string;
    channel: string;
    connected: boolean;
    connecting: boolean;
    messages: any[];
    analytics: any;
    muted: boolean;
}

const initialStreamState: StreamState = {
    platform: "twitch",
    channel: "",
    connected: false,
    connecting: false,
    messages: [],
    analytics: null,
    muted: true,
};

export default function ComparePage() {
    const [streamA, setStreamA] = useState<StreamState>({ ...initialStreamState });
    const [streamB, setStreamB] = useState<StreamState>({ ...initialStreamState });
    const [verdict, setVerdict] = useState<any>(null);
    const [comparing, setComparing] = useState(false);
    const [showSentimentInfo, setShowSentimentInfo] = useState(false);
    const [dropdownA, setDropdownA] = useState(false);
    const [dropdownB, setDropdownB] = useState(false);

    const chatRefA = useRef<HTMLDivElement>(null);
    const chatRefB = useRef<HTMLDivElement>(null);

    // Extract channel name from URL or plain text
    const extractChannel = (input: string, platform: string): string => {
        const trimmed = input.trim().toLowerCase();
        // Plain channel name
        if (!trimmed.includes("/") && !trimmed.includes(".")) return trimmed;
        try {
            const urlObj = new URL(trimmed);
            if (platform === "twitch" && urlObj.hostname.includes("twitch.tv")) {
                return urlObj.pathname.replace(/^\//, "").split("/")[0];
            }
            if (platform === "kick" && urlObj.hostname.includes("kick.com")) {
                return urlObj.pathname.replace(/^\//, "").split("/")[0];
            }
        } catch {}
        return trimmed;
    };

    // Connect stream
    const connectStream = async (side: "a" | "b") => {
        const stream = side === "a" ? streamA : streamB;
        const setStream = side === "a" ? setStreamA : setStreamB;
        if (!stream.channel.trim()) return;

        setStream(prev => ({ ...prev, connecting: true }));
        try {
            const channel = extractChannel(stream.channel, stream.platform);
            if (!channel) { setStream(prev => ({ ...prev, connecting: false })); return; }
            if (stream.platform === "twitch") {
                await connectTwitchChannel(channel);
            } else {
                await connectKickChannel(channel);
            }
            setStream(prev => ({ ...prev, connected: true, connecting: false, channel }));
        } catch (e) {
            setStream(prev => ({ ...prev, connecting: false }));
            alert(`Failed to connect: ${e}`);
        }
    };

    // Poll messages
    const pollMessages = useCallback(async (side: "a" | "b") => {
        const stream = side === "a" ? streamA : streamB;
        const setStream = side === "a" ? setStreamA : setStreamB;
        if (!stream.connected || !stream.channel) return;

        try {
            const getMsgs = stream.platform === "twitch" ? getTwitchMessages : getKickMessages;
            const getAna = stream.platform === "twitch" ? getTwitchAnalytics : getKickAnalytics;
            const [msgData, anaData] = await Promise.all([getMsgs(stream.channel), getAna(stream.channel)]);

            const mapped = (msgData.messages || []).map((m: any, i: number) => ({
                id: i,
                user: m.user || m.author || "Viewer",
                message: m.message,
                sentiment: m.sentiment,
                color: m.sentiment === "good" ? "#22C55E" : m.sentiment === "bad" ? "#EF4444" : "#06B6D4",
            }));
            setStream(prev => ({ ...prev, messages: mapped, analytics: anaData }));
        } catch (e) { /* silent */ }
    }, [streamA.connected, streamA.channel, streamA.platform, streamB.connected, streamB.channel, streamB.platform]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (streamA.connected) pollMessages("a");
            if (streamB.connected) pollMessages("b");
        }, 3000);
        return () => clearInterval(interval);
    }, [streamA.connected, streamB.connected, pollMessages]);

    // Auto-scroll chat
    useEffect(() => {
        if (chatRefA.current) chatRefA.current.scrollTop = chatRefA.current.scrollHeight;
    }, [streamA.messages]);
    useEffect(() => {
        if (chatRefB.current) chatRefB.current.scrollTop = chatRefB.current.scrollHeight;
    }, [streamB.messages]);

    // Compare
    const runComparison = async () => {
        if (!streamA.connected || !streamB.connected) return;
        setComparing(true);
        try {
            const result = await compareStreams(
                { platform: streamA.platform, channel: streamA.channel },
                { platform: streamB.platform, channel: streamB.channel }
            );
            setVerdict(result);
        } catch (e) {
            alert("Comparison failed");
        }
        setComparing(false);
    };

    // Toggle mute
    const toggleMute = (side: "a" | "b") => {
        const setStream = side === "a" ? setStreamA : setStreamB;
        setStream(prev => ({ ...prev, muted: !prev.muted }));
    };

    // Render embedded player
    const renderPlayer = (stream: StreamState, side: "a" | "b") => {
        if (!stream.connected) return null;

        if (stream.platform === "twitch") {
            return (
                <iframe
                    src={`https://player.twitch.tv/?channel=${stream.channel}&parent=localhost&muted=${stream.muted}`}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="rounded-xl"
                    style={{ minHeight: "280px" }}
                />
            );
        } else {
            return (
                <iframe
                    src={`https://player.kick.com/${stream.channel}?autoplay=true&muted=${stream.muted}`}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="rounded-xl"
                    style={{ minHeight: "280px" }}
                    frameBorder="0"
                    scrolling="no"
                />
            );
        }
    };

    // Render stream panel
    const renderStreamPanel = (stream: StreamState, setStream: React.Dispatch<React.SetStateAction<StreamState>>, side: "a" | "b", dropdown: boolean, setDropdown: React.Dispatch<React.SetStateAction<boolean>>) => {
        const platColor = platforms.find(p => p.id === stream.platform)?.color || "#9146FF";

        return (
            <div className="flex-1 min-w-0">
                {/* Input Row */}
                <div className="flex gap-2 mb-4">
                    {/* Platform dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdown(!dropdown)}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/80 text-white text-sm font-medium hover:border-gray-500 transition-colors"
                            style={{ borderColor: platColor + "40" }}
                        >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: platColor }} />
                            {platforms.find(p => p.id === stream.platform)?.name}
                            <ChevronDown size={14} />
                        </button>
                        {dropdown && (
                            <div className="absolute z-50 mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 shadow-xl overflow-hidden">
                                {platforms.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => { setStream(prev => ({ ...prev, platform: p.id })); setDropdown(false); }}
                                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left text-gray-300 hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                                        {p.name}
                                        {stream.platform === p.id && <Check size={14} className="ml-auto text-green-400" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Channel input */}
                    <input
                        type="text"
                        placeholder="Channel name or URL..."
                        value={stream.channel}
                        onChange={e => {
                            const val = e.target.value;
                            let newPlatform = stream.platform;
                            if (val.toLowerCase().includes("twitch.tv")) newPlatform = "twitch";
                            else if (val.toLowerCase().includes("kick.com")) newPlatform = "kick";
                            setStream(prev => ({ ...prev, channel: val, platform: newPlatform }));
                        }}
                        onKeyDown={e => e.key === "Enter" && connectStream(side)}
                        className="flex-1 px-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        disabled={stream.connected}
                    />

                    {/* Connect button */}
                    <button
                        onClick={() => stream.connected ? setStream({ ...initialStreamState }) : connectStream(side)}
                        disabled={stream.connecting}
                        className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                            stream.connected
                                ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90"
                        }`}
                    >
                        {stream.connecting ? "..." : stream.connected ? "Disconnect" : "Connect"}
                    </button>
                </div>

                {/* Player with mute button */}
                {stream.connected && (
                    <div className="relative rounded-xl overflow-hidden border border-gray-800 mb-4">
                        {renderPlayer(stream, side)}
                        <button
                            onClick={() => toggleMute(side)}
                            className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/70 backdrop-blur-sm border border-gray-600 text-white hover:bg-black/90 transition-all z-10"
                            title={stream.muted ? "Unmute" : "Mute"}
                        >
                            {stream.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                    </div>
                )}

                {/* Chat */}
                <div className="rounded-xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm overflow-hidden" style={{ height: "300px" }}>
                    <div className="px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-300">
                            💬 {stream.connected ? `${stream.channel} Chat` : "Chat"}
                        </span>
                        <span className="text-xs text-gray-500">{stream.messages.length} msgs</span>
                    </div>
                    <div ref={side === "a" ? chatRefA : chatRefB} className="overflow-y-auto p-3 space-y-1" style={{ height: "calc(100% - 40px)" }}>
                        {!stream.connected ? (
                            <div className="flex items-center justify-center h-full text-gray-600 text-sm">Connect a stream to see chat</div>
                        ) : stream.messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-600 text-sm">Waiting for messages...</div>
                        ) : (
                            stream.messages.slice(-100).map((m, i) => (
                                <div key={i} className="text-sm leading-relaxed">
                                    <span className="font-semibold" style={{ color: m.color }}>{m.user}</span>
                                    <span className="text-gray-400">: {m.message}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Sentiment bar
    const SentimentBar = ({ label, valueA, valueB, colorA, colorB }: { label: string; valueA: number; valueB: number; colorA: string; colorB: string }) => {
        const total = Math.max(valueA + valueB, 1);
        return (
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-400">
                    <span>{valueA}%</span>
                    <span className="font-medium text-gray-300">{label}</span>
                    <span>{valueB}%</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-gray-800">
                    <div className="transition-all duration-700" style={{ width: `${(valueA / total) * 100}%`, backgroundColor: colorA }} />
                    <div className="transition-all duration-700" style={{ width: `${(valueB / total) * 100}%`, backgroundColor: colorB }} />
                </div>
            </div>
        );
    };

    return (
        <main className="relative bg-black min-h-screen">
            <Navigation />

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-8 pb-16">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="font-gilroy text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                        Compare{" "}
                        <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                            Streams
                        </span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
                        Analyze two streams side-by-side and get an intelligent comparison verdict
                    </p>
                </div>

                {/* Side-by-side streams */}
                <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    {renderStreamPanel(streamA, setStreamA, "a", dropdownA, setDropdownA)}

                    {/* VS divider */}
                    <div className="flex lg:flex-col items-center justify-center gap-2 py-4 lg:py-0">
                        <div className="w-12 h-[1px] lg:w-[1px] lg:h-12 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
                        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">VS</span>
                        <div className="w-12 h-[1px] lg:w-[1px] lg:h-12 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
                    </div>

                    {renderStreamPanel(streamB, setStreamB, "b", dropdownB, setDropdownB)}
                </div>

                {/* Compare Button */}
                <div className="text-center mb-10">
                    <button
                        onClick={runComparison}
                        disabled={!streamA.connected || !streamB.connected || comparing}
                        className={`px-8 py-4 rounded-2xl text-lg font-bold transition-all ${
                            streamA.connected && streamB.connected
                                ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                : "bg-gray-800 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {comparing ? (
                            <span className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                Analyzing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Zap size={20} />
                                Compare Now
                            </span>
                        )}
                    </button>
                    {(!streamA.connected || !streamB.connected) && (
                        <p className="text-gray-600 text-sm mt-2">Connect both streams to enable comparison</p>
                    )}
                </div>

                {/* Verdict Section */}
                {verdict && (
                    <div className="space-y-6 animate-in fade-in duration-700">
                        {/* Sentiment Comparison Bars */}
                        <div className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-6 relative z-50">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <TrendingUp size={20} className="text-purple-400" />
                                    Sentiment Breakdown
                                </h3>
                                <button
                                    onClick={() => setShowSentimentInfo(true)}
                                    className="p-1.5 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                                    title="What does this mean?"
                                >
                                    <Info size={18} />
                                </button>
                            </div>

                            {/* Sentiment Info Pop-up */}
                            {showSentimentInfo && (
                                <div className="absolute top-16 right-6 z-50 w-[300px] sm:w-[380px] bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-5 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-bold text-white flex items-center gap-2">
                                            <Info size={16} className="text-purple-400" />
                                            Sentiment & Mood Guide
                                        </h4>
                                        <button onClick={() => setShowSentimentInfo(false)} className="text-gray-400 hover:text-white transition-colors">
                                            <X size={16} />
                                        </button>
                                    </div>
                                    <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-6 text-sm">
                                        {/* Sentiments */}
                                        <div>
                                            <h5 className="font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1">Sentiment Rankings</h5>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="font-semibold text-green-400 mb-1">1. Positive 🟢 (Best)</div>
                                                    <p className="text-gray-300 text-xs">Chatters are expressing happiness, excitement, support, or agreement (e.g. "W", "Let's go!", "Love this").</p>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-cyan-400 mb-1">2. Neutral 🔵</div>
                                                    <p className="text-gray-300 text-xs">General questions, casual statements, or context-less interactions (e.g. "Hi", "What game is this?", "?").</p>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-red-400 mb-1">3. Negative 🔴 (Worst)</div>
                                                    <p className="text-gray-300 text-xs">Chatters are complaining, using toxic language, disagreeing, or trolling (e.g. "L", "Boring", "Cringe").</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Moods */}
                                        <div>
                                            <h5 className="font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1">Chat Moods</h5>
                                            <div className="space-y-3">
                                                <div>
                                                    <span className="font-semibold text-green-400">Happy / Positive 🔥🙂</span>
                                                    <p className="text-gray-300 text-xs mt-1">Strong support, high engagement, and overall great vibes.</p>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-cyan-400">Neutral / Questioning ⚪🧐</span>
                                                    <p className="text-gray-300 text-xs mt-1">Users are casually chatting or asking questions about the stream.</p>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-orange-400">Complaint / Tense 😤</span>
                                                    <p className="text-gray-300 text-xs mt-1">Chatters are frustrated, often due to technical issues like lag or audio problems.</p>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-red-500">Toxic / Criticism 🤬😡</span>
                                                    <p className="text-gray-300 text-xs mt-1">High negativity, aggressive behavior, arguments, or chat trolling.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between items-center text-sm font-semibold text-gray-300 mb-4">
                                <div className="flex items-center gap-2">
                                    {verdict.stream_a.avatar ? (
                                        <img src={verdict.stream_a.avatar} alt={verdict.stream_a.channel} className="w-8 h-8 rounded-full border border-gray-700 object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs">?</div>
                                    )}
                                    <span style={{ color: "#9146FF" }}>{verdict.stream_a.channel} ({verdict.stream_a.platform})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span style={{ color: "#53FC18" }}>{verdict.stream_b.channel} ({verdict.stream_b.platform})</span>
                                    {verdict.stream_b.avatar ? (
                                        <img src={verdict.stream_b.avatar} alt={verdict.stream_b.channel} className="w-8 h-8 rounded-full border border-gray-700 object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs">?</div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <SentimentBar
                                    label="Positive 🟢"
                                    valueA={verdict.stream_a.analytics.percentages.good}
                                    valueB={verdict.stream_b.analytics.percentages.good}
                                    colorA="#22C55E"
                                    colorB="#16A34A"
                                />
                                <SentimentBar
                                    label="Negative 🔴"
                                    valueA={verdict.stream_a.analytics.percentages.bad}
                                    valueB={verdict.stream_b.analytics.percentages.bad}
                                    colorA="#EF4444"
                                    colorB="#DC2626"
                                />
                                <SentimentBar
                                    label="Neutral ⚪"
                                    valueA={verdict.stream_a.analytics.percentages.neutral}
                                    valueB={verdict.stream_b.analytics.percentages.neutral}
                                    colorA="#06B6D4"
                                    colorB="#0891B2"
                                />
                            </div>
                        </div>

                        {/* Dimension Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {verdict.verdict.dimensions.map((dim: any, i: number) => (
                                <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-4 text-center">
                                    <div className="text-2xl mb-2">{dim.icon}</div>
                                    <div className="text-sm font-semibold text-gray-300 mb-2">{dim.name}</div>
                                    <div className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                                        dim.winner === "Tie"
                                            ? "bg-gray-700 text-gray-300"
                                            : dim.winner.includes(verdict.stream_a.channel)
                                                ? "bg-purple-500/20 text-purple-400"
                                                : "bg-green-500/20 text-green-400"
                                    }`}>
                                        {dim.winner === "Tie" ? "🤝 Tie" : `👑 ${dim.winner.split(" (")[0]}`}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats Comparison */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: "Stream Score", a: verdict.stream_a.analytics.stream_score, b: verdict.stream_b.analytics.stream_score, icon: "⚡" },
                                { label: "Messages", a: verdict.stream_a.analytics.total_messages, b: verdict.stream_b.analytics.total_messages, icon: "💬" },
                                { label: "Mood", a: verdict.stream_a.analytics.mood, b: verdict.stream_b.analytics.mood, icon: "🎭", isText: true },
                                { label: "Top User", a: verdict.stream_a.analytics.top_user, b: verdict.stream_b.analytics.top_user, icon: "👤", isText: true },
                            ].map((stat, i) => (
                                <div key={i} className="rounded-xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-4">
                                    <div className="text-xs text-gray-500 mb-2">{stat.icon} {stat.label}</div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <div className="text-xs text-purple-400 mb-0.5">{verdict.stream_a.channel}</div>
                                            <div className={`font-bold ${stat.isText ? "text-sm" : "text-xl"} text-white`}>
                                                {stat.isText ? String(stat.a).substring(0, 15) : stat.a}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-green-400 mb-0.5">{verdict.stream_b.channel}</div>
                                            <div className={`font-bold ${stat.isText ? "text-sm" : "text-xl"} text-white`}>
                                                {stat.isText ? String(stat.b).substring(0, 15) : stat.b}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Overall Verdict */}
                        <div className="rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/20 via-gray-900/60 to-cyan-900/20 backdrop-blur-sm p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy size={28} className="text-yellow-400" />
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Comparison Verdict</h3>
                            </div>
                            
                            {/* Winner banner */}
                            <div className="flex items-center justify-center gap-4 mb-6 py-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-purple-400">{verdict.verdict.a_wins}</div>
                                    <div className="text-sm text-gray-400">{verdict.stream_a.channel}</div>
                                </div>
                                <div className="text-gray-600 text-2xl font-bold">—</div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-400">{verdict.verdict.b_wins}</div>
                                    <div className="text-sm text-gray-400">{verdict.stream_b.channel}</div>
                                </div>
                            </div>

                            {/* Winner label */}
                            {verdict.verdict.overall_winner !== "Tie" ? (
                                <div className="text-center mb-4">
                                    <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm">
                                        👑 Overall Winner: {verdict.verdict.overall_winner}
                                    </span>
                                </div>
                            ) : (
                                <div className="text-center mb-4">
                                    <span className="px-4 py-2 rounded-full bg-gray-700 text-gray-300 font-bold text-sm">
                                        🤝 It&apos;s a Tie!
                                    </span>
                                </div>
                            )}

                            {/* Conclusion paragraph */}
                            <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mt-6 pb-2">
                                {verdict.verdict.conclusion}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
