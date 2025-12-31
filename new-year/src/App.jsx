import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, Heart, Share2, Copy, RotateCcw, Calendar, Clock, Gift, Star, Zap, Trophy, Moon, Download, Mail, ChevronDown, ChevronUp, TrendingUp, Award, Palette, RefreshCw, Users, Globe, MessageCircle, Send, Music, Volume2, VolumeX, Eye, EyeOff, Smile, Rocket, Target, Check, X } from "lucide-react";

/* ======================================================================
   SECTION 1 — GLOBAL CONSTANTS & CONFIGURATION
======================================================================== */

const NEW_YEAR_TARGET = new Date("Jan 1, 2026 00:00:00").getTime();

const THEMES = [
  {
    id: 0,
    name: "Midnight Purple",
    gradient: "from-[#1a0b2e] via-[#2d1b69] to-[#0f0520]",
    accent: "from-pink-500 to-purple-600",
    glow: "shadow-pink-600/50",
    particles: "#a855f7",
    emoji: "🌙",
    sound: "mystical",
  },
  {
    id: 1,
    name: "Deep Ocean",
    gradient: "from-[#001220] via-[#003d5c] to-[#000810]",
    accent: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-600/50",
    particles: "#06b6d4",
    emoji: "🌊",
    sound: "waves",
  },
  {
    id: 2,
    name: "Dark Gold",
    gradient: "from-[#1a0f00] via-[#3d2900] to-[#100800]",
    accent: "from-yellow-500 to-orange-600",
    glow: "shadow-yellow-600/50",
    particles: "#eab308",
    emoji: "✨",
    sound: "sparkle",
  },
  {
    id: 3,
    name: "Forest Night",
    gradient: "from-[#0a1f1a] via-[#1a4d3d] to-[#051510]",
    accent: "from-green-500 to-emerald-600",
    glow: "shadow-green-600/50",
    particles: "#10b981",
    emoji: "🌲",
    sound: "nature",
  },
  {
    id: 4,
    name: "Rose Noir",
    gradient: "from-[#200515] via-[#4d1a3d] to-[#100210]",
    accent: "from-rose-500 to-pink-600",
    glow: "shadow-rose-600/50",
    particles: "#f43f5e",
    emoji: "🌹",
    sound: "romantic",
  },
  {
    id: 5,
    name: "Arctic Ice",
    gradient: "from-[#001a2e] via-[#003d5c] to-[#001220]",
    accent: "from-blue-400 to-cyan-500",
    glow: "shadow-blue-500/50",
    particles: "#3b82f6",
    emoji: "❄️",
    sound: "winter",
  },
  {
    id: 6,
    name: "Crimson Fire",
    gradient: "from-[#2e0a0a] via-[#5c1a1a] to-[#1a0505]",
    accent: "from-red-500 to-orange-600",
    glow: "shadow-red-600/50",
    particles: "#ef4444",
    emoji: "🔥",
    sound: "fire",
  },
];

const PARTICLE_EMOJIS = ["✨", "🎆", "🎇", "🌟", "💫", "⭐", "🎊", "🎉", "🎈", "🎁", "🔥", "💝", "💖", "🌺", "🦋"];

const CELEBRATION_MESSAGES = [
  "🎉 Amazing Choice!",
  "✨ Beautiful!",
  "🌟 Perfect!",
  "💫 Wonderful!",
  "🎊 Fantastic!",
  "🔥 Awesome!",
  "💖 Lovely!",
  "🎆 Brilliant!",
];

const MOOD_OPTIONS = [
  { id: "motivational", name: "Motivational", emoji: "💪", color: "orange", desc: "Inspire & energize" },
  { id: "romantic", name: "Romantic", emoji: "❤️", color: "pink", desc: "Express love" },
  { id: "funny", name: "Funny", emoji: "😄", color: "yellow", desc: "Make them laugh" },
  { id: "professional", name: "Professional", emoji: "💼", color: "blue", desc: "Corporate & formal" },
  { id: "spiritual", name: "Spiritual", emoji: "🙏", color: "purple", desc: "Divine blessings" },
  { id: "casual", name: "Casual", emoji: "😊", color: "green", desc: "Friendly & chill" },
  { id: "poetic", name: "Poetic", emoji: "📜", color: "indigo", desc: "Artistic & beautiful" },
  { id: "adventurous", name: "Adventurous", emoji: "🚀", color: "red", desc: "Bold & daring" },
];

const ANIMATION_SPEEDS = [
  { id: "slow", name: "Slow", value: 35, emoji: "🐢" },
  { id: "medium", name: "Medium", value: 22, emoji: "🚶" },
  { id: "fast", name: "Fast", emoji: "⚡", value: 12 },
];

/* ======================================================================
   SECTION 2 — STRING & NAME UTILITIES
======================================================================== */

const sanitizeInput = (value) => {
  if (!value) return "";
  return value.replace(/[^a-zA-Z\s]/g, "");
};

const normalizeSpaces = (value) =>
  value.replace(/\s+/g, " ").trim();

const capitalizeWords = (value) =>
  value
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

const formatName = (value) => {
  if (!value) return "";
  const sanitized = sanitizeInput(value);
  const spaced = normalizeSpaces(sanitized);
  return capitalizeWords(spaced);
};

const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map(w => w.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/* ======================================================================
   SECTION 3 — WISH TEMPLATES BY MOOD
======================================================================== */

const WISH_TEMPLATES = {
  motivational: [
    (n) => `🔥 ${n}, Welcome to Your Best Year Yet! 🔥

2026 is YOUR year of transformation! Embrace discipline, unleash your hidden potential, and watch as your dedication turns dreams into reality. Success is calling your name! 💪

Every challenge is an opportunity in disguise. Every setback is a setup for an epic comeback. You've got what it takes to make this year legendary!

Remember: Winners are not people who never fail, but people who never quit. Keep pushing forward! 🚀`,

    (n) => `🚀 ${n}, Time to Level Up in 2026! 🚀

No excuses, only execution. No doubts, only determination. This year, you'll surprise yourself with what you're capable of achieving. Let's make it legendary! 🔥

Your future self will thank you for the actions you take today. Stay focused, stay hungry, and never stop believing in your power to create change.

The best project you'll ever work on is YOU. Invest in yourself! 💎`,

    (n) => `💪 ${n}, Unleash Your Potential in 2026! 💪

This is the year you break through your limits and discover who you're truly meant to be. Every sunrise brings a fresh opportunity to become stronger, wiser, and unstoppable! ⚡

Chase your dreams relentlessly. Build unshakable habits. Become the person you've always admired. The transformation starts NOW!

Your only competition is who you were yesterday. Keep evolving! 🌟`,
  ],
  romantic: [
    (n) => `💖 My Dearest ${n}, Happy New Year 2026! 💖

As we step into this magical new year together, my heart overflows with love and gratitude. May our bond grow stronger, our memories sweeter, and our love deeper with each passing moment. 💑

Here's to endless moments of joy, laughter, and pure togetherness! You make every single day feel like a celebration of love. With you, every year is a blessing! ✨

Forever yours, always and eternally. You're my dream come true! 🌹`,

    (n) => `❤️ To My Beloved ${n}, Welcome to 2026! ❤️

Every sunrise with you feels like a miracle, and every sunset reminds me how incredibly lucky I am to have you in my life. This year, let's create even more beautiful memories together! 🌹

You are my safe haven, my adventure partner, my best friend, and my forever love. No words can truly capture what you mean to me.

You are my yesterday, my today, and all of my tomorrows. Happy New Year, my love! 💕`,

    (n) => `💝 Darling ${n}, A Love Letter for 2026! 💝

In this vast universe, among billions of souls, I found you - my perfect match, my soulmate, my everything. As we welcome 2026, I want you to know that loving you is the best decision I've ever made. 💑

May this year bring us countless moments of joy, deeper understanding, and a love that keeps growing stronger. Together, we can conquer anything!

You're not just my partner, you're my home. Here's to forever with you! 🥰`,
  ],
  funny: [
    (n) => `😂 Hey ${n}, Happy New Year 2026! 😂

New year, new me... just kidding! Same old awesome person, just with a fresh calendar and probably the same questionable life choices! 🎉

May your troubles last as long as your New Year's resolutions (we both know that's about 3 days max 😜). Here's to making more hilariously bad decisions together!

Remember: Age is just a number, but in your case, it's a pretty big number! Just kidding, you're timeless! 🍾`,

    (n) => `🤣 ${n}, Let's Laugh Our Way Through 2026! 🤣

Congratulations! You've survived another year of my terrible jokes and you're STILL here! That deserves a trophy or possibly therapy! 🏆

Let's make this year even more ridiculous than the last. Warning: Side effects may include excessive laughter, questionable decisions, and memories we'll laugh about forever! 😄

They say laughter is the best medicine. Good thing we're both doctors of comedy! 💊`,

    (n) => `😆 ${n}, 2026: The Year We Get Our Act Together! 😆

Just kidding, we're going to wing it like we do every year! But hey, it's worked out so far, right? 🎭

May your coffee be strong, your Monday be short, and your year be full of "I probably shouldn't have done that" moments that make great stories later! ☕

Pro tip: If anyone asks if you're taking this year seriously, just say "maybe" and change the subject! 🤷`,
  ],
  professional: [
    (n) => `🌟 Dear ${n}, Happy New Year 2026! 🌟

As we embark on this promising new year, I extend my warmest wishes for your continued success in all professional endeavors. May 2026 bring you remarkable opportunities, strategic growth, and exceptional achievements. 📈

Your dedication, expertise, and leadership continue to inspire those fortunate enough to work alongside you. Here's to reaching new heights of excellence together!

Wishing you innovation, prosperity, and meaningful collaborations in the year ahead. 💼`,

    (n) => `🎯 ${n}, Strategic Success Awaits in 2026! 🎯

May this year bring you innovative solutions, successful projects, and meaningful partnerships. Your professional excellence and commitment to quality set a benchmark for the entire industry. 🏆

Looking forward to witnessing your continued growth, groundbreaking achievements, and the positive impact you'll undoubtedly make in 2026.

Here's to leveraging opportunities, maximizing potential, and delivering exceptional results! 💡`,

    (n) => `📊 Esteemed ${n}, Wishing You Excellence in 2026! 📊

As we commence this new fiscal year, I wish you unparalleled success, strategic victories, and professional fulfillment. Your track record speaks volumes about your capabilities and vision. 🌐

May 2026 be marked by groundbreaking innovations, successful ventures, and the achievement of your most ambitious goals.

Your contributions make a significant difference. Here's to another year of outstanding performance! 🎖️`,
  ],
  spiritual: [
    (n) => `🙏 Blessed ${n}, Divine New Year 2026! 🙏

May divine light illuminate your path, inner peace fill your heart, and spiritual wisdom guide your every step. This year, may you discover deeper meaning, true purpose, and sacred connection. ✨

The universe has beautiful plans for you. Trust the journey, embrace the lessons, and know that you are exactly where you need to be.

May abundance, grace, and blessings flow into your life effortlessly. You are divinely protected! 🕉️`,

    (n) => `🌟 Dear ${n}, Cosmic Blessings for 2026! 🌟

As the new year dawns, may you be surrounded by positive energy, divine protection, and abundant grace. Let gratitude be your compass and faith be your anchor. 🙏

The universe is conspiring in your favor, aligning circumstances to support your highest good. Embrace the journey with an open heart and trust in the divine plan.

May you experience profound spiritual growth, miraculous manifestations, and eternal peace! 💫`,

    (n) => `🕉️ Sacred Soul ${n}, Enlightened New Year! 🕉️

May the divine consciousness awaken within you, bringing clarity, purpose, and transcendental joy. This year, may you walk the path of righteousness with unwavering faith. 🙏

Every moment is a gift, every breath a blessing. May you find enlightenment in the ordinary and miracles in the mundane.

The light within you shines brightly. May 2026 amplify your spiritual radiance! ✨`,
  ],
  casual: [
    (n) => `🎉 Hey ${n}, Happy New Year 2026! 🎉

Here's to another year of good vibes, great times, and awesome memories together! May your days be filled with sunshine, your nights with starlight, and your heart with pure happiness! ☀️

Let's make this year unforgettable! No stress, just the best. More laughs, more adventures, more everything good!

Cheers to us and all the amazing moments coming our way! 🥂`,

    (n) => `😊 What's Up ${n}! 2026 is Here! 😊

Another trip around the sun completed! Hope this year brings you everything you've been wishing for and then some! 🌈

Stay awesome, stay happy, and let's definitely catch up soon! Can't wait to make more incredible memories together this year!

Sending you all the positive energy and good vibes! Keep being amazing! 🎊`,

    (n) => `🌟 Yo ${n}, Fresh Year Vibes! 🌟

2026 is looking pretty good already, and it's even better with awesome people like you in it! Here's to keeping things real and having a blast! 🎈

May this year be your vibe, your mood, your energy! More fun, more chill, more of everything that makes life worth living!

Let's make every day count and every moment memorable! You rock! 🤘`,
  ],
  poetic: [
    (n) => `📜 Dearest ${n}, A Poetic New Year 2026! 📜

As dawn breaks on this pristine year,
May your path be blessed, your vision clear.
Like stars that dance in midnight skies,
May your dreams take flight, may your spirit rise. ✨

Through seasons changing, moments fleeting,
May every day be worth repeating.
With grace and beauty, let your story unfold,
A tale of courage, a heart of gold. 🌹

Here's to poetry in motion, magic in the making,
A year of wonder, forever in the creating! 💫`,

    (n) => `🌙 Enchanting ${n}, Verses for Your New Year! 🌙

When stars align and dreams take wing,
When nature wakes and songbirds sing,
May you find beauty in each dawn,
A canvas fresh, a journey drawn. 🎨

Like rivers flowing to the sea,
May your purpose set you free.
With every breath, with every beat,
May life's symphony be sweet. 🎵

In whispers soft and colors bright,
May 2026 bring pure delight! ✨`,
  ],
  adventurous: [
    (n) => `🚀 ${n}, Adventure Awaits in 2026! 🚀

Buckle up, fearless soul! This year is your playground, your challenge, your ultimate quest! May you explore uncharted territories, conquer new peaks, and discover treasures beyond imagination! 🏔️

Take risks that make your heart race, embrace uncertainty that makes you stronger, and live stories that people will tell for generations!

Fortune favors the bold, and 2026 belongs to the brave! Let's go! 🌍`,

    (n) => `⛰️ Brave ${n}, Epic Year Ahead! ⛰️

2026 is calling you to step outside your comfort zone and into your greatness! May you embark on thrilling journeys, take bold leaps, and live life at full throttle! 🏃

Every adventure begins with a single step into the unknown. May this be your year of fearless exploration and extraordinary experiences!

The world is vast, life is short - make every moment an adventure! 🗺️`,
  ],
};

const generateWish = (name, mood = "motivational") => {
  const templates = WISH_TEMPLATES[mood] || WISH_TEMPLATES.motivational;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template(name) + `\n\n— Crafted with ❤️ by Mukesh Lilawat`;
};

/* ======================================================================
   SECTION 4 — CUSTOM HOOKS
======================================================================== */

const useCountdown = (target) => {
  const [time, setTime] = useState({
    display: "",
    isNewYear: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    percentage: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const diff = target - Date.now();
      const yearStart = new Date("Jan 1, 2025 00:00:00").getTime();
      const yearLength = target - yearStart;
      const elapsed = Date.now() - yearStart;
      const percentage = Math.min(100, Math.max(0, (elapsed / yearLength) * 100));

      if (diff <= 0) {
        setTime({
          display: "🎉 HAPPY NEW YEAR 2026 🎉",
          isNewYear: true,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          percentage: 100,
        });
        return true;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff / 3600000) % 24);
      const minutes = Math.floor((diff / 60000) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({
        display: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        isNewYear: false,
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: Math.floor(diff / 1000),
        percentage: Math.min(100, percentage),
      });
      return false;
    };

    const interval = setInterval(() => {
      if (updateCountdown()) {
        clearInterval(interval);
      }
    }, 1000);

    updateCountdown();
    return () => clearInterval(interval);
  }, [target]);

  return time;
};

const useTypewriter = (text, speed = 25, onDone) => {
  const [output, setOutput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    setOutput("");
    indexRef.current = 0;
    setIsTyping(false);

    if (!text) return;

    setIsTyping(true);
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setOutput((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        onDone && onDone();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onDone]);

  return { output, isTyping };
};

const useParticles = (active, count = 30) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3,
    }));

    setParticles(newParticles);
  }, [active, count]);

  return particles;
};

/* ======================================================================
   SECTION 5 — UI SUB-COMPONENTS
======================================================================== */

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all duration-1000"
      style={{ width: `${percentage}%` }}
    />
  </div>
);

const CountdownTimer = ({ time }) => {
  if (time.isNewYear) {
    return (
      <div className="mt-6 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
        {time.display}
      </div>
    );
  }

  const TimeUnit = ({ value, label, icon: Icon }) => (
    <div className="flex flex-col items-center bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-4 min-w-[70px] sm:min-w-[90px] transform hover:scale-110 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-2 text-yellow-400" />
      <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        <TimeUnit value={time.days} label="Days" icon={Calendar} />
        <TimeUnit value={time.hours} label="Hours" icon={Clock} />
        <TimeUnit value={time.minutes} label="Minutes" icon={Zap} />
        <TimeUnit value={time.seconds} label="Seconds" icon={Sparkles} />
      </div>
      <div className="space-y-2">
        <ProgressBar percentage={time.percentage} />
        <div className="text-center text-xs sm:text-sm text-gray-400">
          ⏰ {time.totalSeconds.toLocaleString()} seconds until 2026!
        </div>
      </div>
    </div>
  );
};

const Fireworks = ({ active }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="firework"
          style={{
            left: `${10 + i * 10}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
};

const FloatingParticles = ({ particles }) => {
  if (!particles.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-xl sm:text-2xl animate-float"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

const ThemeSelector = ({ themes, current, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <Palette className="w-4 h-4" />
        <span>Choose Theme ({themes.length} options)</span>
      </div>
      <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${theme.gradient} border-2 transform transition-all duration-300 ${current === theme.id
              ? "scale-125 border-white shadow-lg shadow-white/30"
              : "scale-100 hover:scale-110 opacity-60 hover:opacity-100 border-gray-600"
              }`}
            title={theme.name}
          >
            <span className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl">
              {theme.emoji}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const MoodSelector = ({ moods, selected, onSelect }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <Heart className="w-4 h-4" />
        <span>Select Wish Mood ({moods.length} styles)</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelect(mood.id)}
            className={`p-3 rounded-xl border-2 transition-all duration-300 ${selected === mood.id
              ? `border-purple-500 bg-purple-500/20 scale-105 shadow-lg shadow-purple-500/30`
              : "border-gray-700/50 bg-gray-900/40 hover:border-gray-600/50 hover:bg-gray-800/60"
              }`}
          >
            <div className="text-2xl mb-1">{mood.emoji}</div>
            <div className="text-xs text-gray-300 font-medium">{mood.name}</div>
            <div className="text-xs text-gray-500 mt-1">{mood.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color = "yellow" }) => (
  <div className="bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 transform hover:scale-105 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${color}-400`} />
    <div className="flex-1 min-w-0">
      <div className="text-xs sm:text-sm text-gray-400 truncate">{label}</div>
      <div className="text-sm sm:text-lg font-bold text-white flex items-center gap-1">
        <span className="truncate">{value}</span>
        {trend && <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />}
      </div>
    </div>
  </div>
);

const WishCard = ({ wish, typed, isTyping }) => (
  <div className="mt-8 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
        <span className="text-sm font-semibold text-gray-300">Your Personalized Wish</span>
        <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
      </div>
      <div className="whitespace-pre-line text-sm sm:text-base md:text-lg text-gray-100 font-medium leading-relaxed">
        {typed}
        {isTyping && <span className="inline-block w-1 h-5 bg-purple-400 ml-1 animate-pulse" />}
      </div>
    </div>
  </div>
);

const ActionButtons = ({ onShare, onCopy, onDownload, onEmail, disabled }) => (
  <div className="mt-8 space-y-4">
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onShare}
        disabled={disabled}
        className="py-3 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-600/30 hover:shadow-green-600/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-green-400/20"
      >
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">WhatsApp</span>
        <span className="sm:hidden">Share</span>
      </button>
      <button
        onClick={onCopy}
        disabled={disabled}
        className="py-3 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-semibold bg-gray-800/80 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 hover:border-gray-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-gray-800/30"
      >
        <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
        Copy
      </button>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onDownload}
        disabled={disabled}
        className="py-2 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-medium bg-blue-600/80 hover:bg-blue-500/80 backdrop-blur-sm border border-blue-500/50 hover:border-blue-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
      <button
        onClick={onEmail}
        disabled={disabled}
        className="py-2 sm:py-3 px-4 rounded-xl text-xs sm:text-sm font-medium bg-purple-600/80 hover:bg-purple-500/80 backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        <Mail className="w-4 h-4" />
        Email
      </button>
    </div>
  </div>
);

const AdvancedOptions = ({ expanded, onToggle, children }) => (
  <div className="mt-6">
    <button
      onClick={onToggle}
      className="w-full py-3 px-4 rounded-xl bg-gray-800/60 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 flex items-center justify-center gap-2 transition-all duration-300 text-gray-300 hover:text-white"
    >
      <Star className="w-4 h-4" />
      <span className="text-sm sm:text-base">Advanced Options</span>
      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>
    {expanded && (
      <div className="mt-4 space-y-4 animate-fade-in">
        {children}
      </div>
    )}
  </div>
);

const AnimationSpeedSelector = ({ speeds, selected, onSelect }) => (
  <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50">
    <div className="flex items-center gap-2 mb-3 text-gray-300">
      <Zap className="w-4 h-4" />
      <span className="text-sm font-medium">Animation Speed</span>
    </div>
    <div className="grid grid-cols-3 gap-2">
      {speeds.map((speed) => (
        <button
          key={speed.id}
          onClick={() => onSelect(speed.id)}
          className={`py-2 px-3 rounded-lg text-xs transition-all ${selected === speed.id
            ? "bg-purple-500/30 border-2 border-purple-500"
            : "bg-gray-800/60 border-2 border-transparent hover:bg-gray-700/60"
            }`}
        >
          <div className="text-lg mb-1">{speed.emoji}</div>
          <div className="text-gray-300">{speed.name}</div>
        </button>
      ))}
    </div>
  </div>
);

/* ======================================================================
   SECTION 6 — MAIN APP COMPONENT
======================================================================== */

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [rawName, setRawName] = useState("");
  const [finalName, setFinalName] = useState("");
  const [wish, setWish] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [wishCount, setWishCount] = useState(0);
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [selectedMood, setSelectedMood] = useState("motivational");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [celebrationMsg, setCelebrationMsg] = useState("");
  const [totalChars, setTotalChars] = useState(0);
  const [animSpeed, setAnimSpeed] = useState("medium");
  const [showPreview, setShowPreview] = useState(true);

  const countdown = useCountdown(NEW_YEAR_TARGET);
  const particles = useParticles(celebrate, 30);

  const currentSpeed = ANIMATION_SPEEDS.find(s => s.id === animSpeed)?.value || 22;
  const { output: typedWish, isTyping } = useTypewriter(
    wish,
    currentSpeed,
    useCallback(() => setCelebrate(true), [])
  );

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("name");
    const urlMood = params.get("mood");
    if (urlName) setRawName(decodeURIComponent(urlName));
    if (urlMood && MOOD_OPTIONS.find(m => m.id === urlMood)) {
      setSelectedMood(urlMood);
    }
  }, []);

  useEffect(() => {
    if (!rawName.trim()) {
      setFinalName("");
      setWish("");
      setCelebrate(false);
      setTotalChars(0);
      return;
    }

    const cleanName = formatName(rawName);
    if (cleanName.length < 2) {
      return;
    }

    setFinalName(cleanName);
    const newWish = generateWish(cleanName, selectedMood);
    setWish(newWish);
    setTotalChars(newWish.length);
    setWishCount((prev) => prev + 1);

    const msg = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
    setCelebrationMsg(msg);
  }, [rawName, selectedMood]);

  useEffect(() => {
    if (!celebrate) return;

    const interval = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % THEMES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [celebrate]);

  useEffect(() => {
    if (celebrate) {
      const timer = setTimeout(() => setShowStats(true), 2500);
      return () => clearTimeout(timer);
    } else {
      setShowStats(false);
    }
  }, [celebrate]);

  const handleShare = useCallback(() => {
    if (!wish) return;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(wish)}`;
    window.open(shareUrl, "_blank");
  }, [wish]);

  const handleCopy = useCallback(async () => {
    if (!wish) return;
    try {
      await navigator.clipboard.writeText(wish);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2500);
    } catch (err) {
      alert("Copied to clipboard! 🎉");
    }
  }, [wish]);

  const handleDownload = useCallback(() => {
    if (!wish) return;
    const blob = new Blob([wish], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `New-Year-2026-Wish-${finalName || "Special"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [wish, finalName]);

  const handleEmail = useCallback(() => {
    if (!wish) return;
    const subject = encodeURIComponent(`Happy New Year 2026${finalName ? ` - ${finalName}` : ""}!`);
    const body = encodeURIComponent(wish);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [wish, finalName]);

  const handleReset = useCallback(() => {
    setRawName("");
    setFinalName("");
    setWish("");
    setCelebrate(false);
    setShowStats(false);
    setShowAdvanced(false);
    setCelebrationMsg("");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const handleThemeChange = useCallback((newThemeIndex) => {
    setThemeIndex(newThemeIndex);
  }, []);

  const handleMoodChange = useCallback((newMood) => {
    setSelectedMood(newMood);
  }, []);

  const handleRegenerateWish = useCallback(() => {
    if (!finalName) return;
    const newWish = generateWish(finalName, selectedMood);
    setWish(newWish);
    setTotalChars(newWish.length);
    setCelebrate(false);
    setTimeout(() => setCelebrate(true), 100);
  }, [finalName, selectedMood]);

  const handleShareLink = useCallback(async () => {
    const url = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(finalName)}&mood=${selectedMood}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("Shareable link copied to clipboard! 🔗");
    } catch (err) {
      alert(`Share this link: ${url}`);
    }
  }, [finalName, selectedMood]);

  const currentTheme = THEMES[themeIndex];
  const currentMood = MOOD_OPTIONS.find(m => m.id === selectedMood);

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-center bg-gradient-to-br ${currentTheme.gradient} transition-all duration-1000 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <Fireworks active={celebrate} />
      <FloatingParticles particles={particles} />

      <div
        className={`dark-glass relative z-10 w-full max-w-xl sm:max-w-3xl lg:max-w-4xl p-4 sm:p-8 md:p-12 rounded-3xl text-center transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } ${celebrate ? "shadow-2xl shadow-purple-500/20" : "shadow-xl shadow-black/50"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-3 py-1.5 rounded-full">
            <Moon className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-medium text-gray-300">Dark Mode</span>
          </div>

          {finalName && (
            <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 px-3 py-1.5 rounded-full">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                {getInitials(finalName)}
              </div>
              <span className="text-xs font-medium text-gray-300 hidden sm:inline">{finalName}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <Sparkles className="absolute left-0 sm:left-4 top-0 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute right-0 sm:right-4 top-0 w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 px-8 sm:px-12">
            Happy New Year 2026
          </h1>
        </div>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-300 font-medium">
          ✨ Create personalized wishes for your loved ones ✨
        </p>

        {celebrationMsg && celebrate && (
          <div className="mt-4 text-xl sm:text-2xl font-bold text-yellow-400 animate-bounce">
            {celebrationMsg}
          </div>
        )}

        <CountdownTimer time={countdown} />

        <div className="mt-6 sm:mt-8">
          <ThemeSelector
            themes={THEMES}
            current={themeIndex}
            onChange={handleThemeChange}
          />
        </div>

        <div className="mt-6 sm:mt-8">
          <MoodSelector
            moods={MOOD_OPTIONS}
            selected={selectedMood}
            onSelect={handleMoodChange}
          />
        </div>

        <div className="mt-6 sm:mt-8 relative">
          <input
            value={rawName}
            onChange={(e) => setRawName(e.target.value)}
            placeholder="Enter your name or loved one's name..."
            maxLength={50}
            className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-base sm:text-lg md:text-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 font-medium"
          />
          {rawName && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500">
              {rawName.length}/50
            </div>
          )}
        </div>

        {showPreview && typedWish && (
          <WishCard wish={wish} typed={typedWish} isTyping={isTyping} />
        )}

        {showStats && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 animate-fade-in">
            <StatCard icon={Gift} label="Wishes" value={wishCount} trend color="yellow" />
            <StatCard icon={Users} label="Mood" value={currentMood?.emoji} color="pink" />
            <StatCard icon={Palette} label="Theme" value={currentTheme.emoji} color="purple" />
            <StatCard icon={Award} label="Chars" value={totalChars} color="green" />
          </div>
        )}

        {celebrate && (
          <>
            <ActionButtons
              onShare={handleShare}
              onCopy={handleCopy}
              onDownload={handleDownload}
              onEmail={handleEmail}
              disabled={!wish}
            />

            <AdvancedOptions
              expanded={showAdvanced}
              onToggle={() => setShowAdvanced(!showAdvanced)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-3 text-gray-300">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">Share URL</span>
                  </div>
                  <button
                    onClick={handleShareLink}
                    className="w-full py-2 px-3 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 text-xs sm:text-sm text-gray-300 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Copy Shareable Link
                  </button>
                </div>

                <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50">
                  <div className="flex items-center gap-2 mb-3 text-gray-300">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm font-medium">Regenerate</span>
                  </div>
                  <button
                    onClick={handleRegenerateWish}
                    className="w-full py-2 px-3 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 text-xs sm:text-sm text-gray-300 transition-all flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-4 h-4" />
                    Generate New Wish
                  </button>
                </div>
              </div>

              <AnimationSpeedSelector
                speeds={ANIMATION_SPEEDS}
                selected={animSpeed}
                onSelect={setAnimSpeed}
              />

              <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="w-full py-2 px-3 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 text-xs sm:text-sm text-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
              </div>
            </AdvancedOptions>

            <button
              onClick={handleReset}
              className="mt-5 w-full py-3 rounded-xl text-sm font-medium bg-gray-800/60 hover:bg-gray-700/60 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 flex items-center justify-center gap-2 transition-all duration-300 text-gray-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
              Create Another Wish
            </button>
          </>
        )}

        {copiedFeedback && (
          <div className="mt-4 text-green-400 font-semibold animate-bounce flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            <span>Copied to clipboard!</span>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <p className="flex items-center gap-1">
              Made with <Heart className="inline w-4 h-4 text-pink-500" /> by Mukesh Lilawat
            </p>
            <span className="hidden sm:inline">•</span>
            <p className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400" />
              {wishCount} wishes created
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}