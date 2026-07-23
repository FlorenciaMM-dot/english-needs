import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Lock, LogOut, Menu, X, Trophy, Zap, Target, Users } from 'lucide-react';
const STAMP_CODES = {
  'DEMO': ['mindset', 'cv'],
  'MINDSET001': ['mindset'],
  'CV001': ['cv'],
  'VISIBILITY001': ['visibility'],
  'ENGLISH001': ['english'],
  'STRATEGY001': ['strategy'],
  'INTERVIEW001': ['interview'],
};

const STAMPS = {
  mindset: { emoji: '🧠', title: 'Mindset', color: 'from-purple-600 to-purple-400', description: 'Foundational mindset for success' },
  cv: { emoji: '📄', title: 'CV', color: 'from-blue-600 to-blue-400', description: 'CV optimization & storytelling' },
  visibility: { emoji: '✨', title: 'Visibility', color: 'from-yellow-600 to-yellow-400', description: 'LinkedIn & online presence' },
  english: { emoji: '🌐', title: 'English', color: 'from-green-600 to-green-400', description: 'Language skills mastery' },
  strategy: { emoji: '🎯', title: 'Strategy', color: 'from-pink-600 to-pink-400', description: 'Interview strategy & prep' },
  interview: { emoji: '🏆', title: 'Interview', color: 'from-red-600 to-red-400', description: 'Live interview excellence' },
};

const ROADMAP = [
  {
    week: 1,
    title: 'Mindset',
    module: 'Module 1',
    days: [
      { day: 1, task: 'Understand your why' },
      { day: 2, task: 'Set clear goals' },
      { day: 3, task: 'Build confidence' },
      { day: 4, task: 'Create accountability' },
      { day: 5, task: 'Reflect & adjust' },
      { day: 6, task: 'Plan week 2' },
      { day: 7, task: 'Check-in with community' },
    ]
  },
  {
    week: 2,
    title: 'CV & Visibility',
    module: 'Module 2',
    days: [
      { day: 8, task: 'Optimize CV structure' },
      { day: 9, task: 'Write powerful bullets' },
      { day: 10, task: 'Polish LinkedIn' },
      { day: 11, task: 'Create cover letter' },
      { day: 12, task: 'Build online presence' },
      { day: 13, task: 'Network effectively' },
      { day: 14, task: 'Check-in & reflection' },
    ]
  },
  {
    week: 3,
    title: 'English & Communication',
    module: 'Module 3',
    days: [
      { day: 15, task: 'Master key vocabulary' },
      { day: 16, task: 'Practice storytelling' },
      { day: 17, task: 'Improve fluency' },
      { day: 18, task: 'Work on pronunciation' },
      { day: 19, task: 'Practice elevator pitch' },
      { day: 20, task: 'Mock conversation' },
      { day: 21, task: 'Progress review' },
    ]
  },
  {
    week: 4,
    title: 'Interview Mastery',
    module: 'Module 4',
    days: [
      { day: 22, task: 'Learn common questions' },
      { day: 23, task: 'Prepare your stories' },
      { day: 24, task: 'Practice Q&A' },
      { day: 25, task: 'Mock interview 1' },
      { day: 26, task: 'Mock interview 2' },
      { day: 27, task: 'Final polish' },
      { day: 28, task: 'Celebrate & share' },
    ]
  },
];

export default function EnglishNeeds() {
  const [profile, setProfile] = useState(null);
  const [stamps, setStamps] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedProfile = localStorage.getItem('englishneeds:profile');
    const savedStamps = localStorage.getItem('englishneeds:stamps');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedStamps) setStamps(JSON.parse(savedStamps));
  }, []);

  useEffect(() => {
    if (profile) localStorage.setItem('englishneeds:profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('englishneeds:stamps', JSON.stringify(stamps));
  }, [stamps]);

  const handleOnboarding = (data) => {
    setProfile(data);
    // setCurrentStep(5);
  };

  const handleUnlockStamp = () => {
    const code = codeInput.toUpperCase();
    if (STAMP_CODES[code]) {
      const newStamps = { ...stamps };
      STAMP_CODES[code].forEach(stamp => {
        newStamps[stamp] = true;
      });
      setStamps(newStamps);
      setMessage(`✨ ${STAMP_CODES[code].length} stamp(s) unlocked!`);
      setCodeInput('');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('❌ Invalid code. Try again!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('englishneeds:profile');
    localStorage.removeItem('englishneeds:stamps');
    setProfile(null);
    setStamps({});
    // setCurrentStep(0);
  };

  if (!profile) {
    return <OnboardingFlow onComplete={handleOnboarding} />;
  }

  const daysCompleted = Math.floor(Math.random() * 28) + 1;
  const streakDays = Math.floor(Math.random() * 15) + 1;
  const stampsUnlocked = Object.values(stamps).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-matrix-darker text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-green-900/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-matrix-green" />
            <h1 className="text-2xl font-bold">English Needs</h1>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          <button onClick={handleLogout} className="hidden md:flex items-center gap-2 px-4 py-2 rounded bg-red-600/20 hover:bg-red-600/40 transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <aside className={`w-full md:w-64 bg-black/30 border-r border-green-900/30 p-6 space-y-4 ${mobileMenuOpen ? 'block' : 'hidden'} md:block overflow-y-auto`}>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Welcome back</p>
            <h2 className="text-xl font-bold text-matrix-green">{profile.name}</h2>
            <p className="text-xs text-gray-500">{profile.email}</p>
          </div>

          <div className="pt-4 space-y-3">
            <div className="bg-gradient-to-r from-matrix-green/10 to-blue-600/10 rounded-lg p-3">
              <p className="text-xs text-gray-400">Goal</p>
              <p className="text-sm font-semibold">{profile.goal}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-3">
              <p className="text-xs text-gray-400">English Level</p>
              <p className="text-sm font-semibold capitalize">{profile.level}</p>
            </div>
          </div>

          <div className="pt-6 space-y-2">
            <p className="text-sm font-bold text-matrix-green">📊 Progress</p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Days: {daysCompleted}/28</span>
                <span>{Math.round(daysCompleted/28*100)}%</span>
              </div>
              <div className="w-full bg-gray-700/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-matrix-green to-blue-600 h-2 rounded-full" style={{width: `${daysCompleted/28*100}%`}}></div>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <p className="text-sm font-bold">🔥 Streak: {streakDays} days</p>
            <p className="text-sm font-bold">🏆 Stamps: {stampsUnlocked}/6</p>
          </div>

          <button onClick={handleLogout} className="w-full md:hidden mt-6 px-4 py-2 rounded bg-red-600/20 hover:bg-red-600/40 transition flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/5 rounded-lg p-4 border border-blue-600/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Progress</p>
                    <p className="text-2xl font-bold">{daysCompleted}/28</p>
                  </div>
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-green-400/5 rounded-lg p-4 border border-green-600/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Streak</p>
                    <p className="text-2xl font-bold">{streakDays}🔥</p>
                  </div>
                  <Trophy className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-purple-400/5 rounded-lg p-4 border border-purple-600/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Stamps</p>
                    <p className="text-2xl font-bold">{stampsUnlocked}/6</p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Stamps */}
            <section>
              <h2 className="text-2xl font-bold mb-4">🎖️ Collectible Stamps</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(STAMPS).map(([key, stamp]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedStamp(key)}
                    className={`p-4 rounded-lg border transition ${
                      stamps[key]
                        ? `bg-gradient-to-br ${stamp.color} border-yellow-500/50 shadow-lg shadow-yellow-500/20`
                        : 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50'
                    } group`}
                  >
                    <div className="text-4xl mb-2">{stamps[key] ? stamp.emoji : '🔒'}</div>
                    <p className="font-bold text-sm">{stamp.title}</p>
                    {!stamps[key] && <Lock className="w-4 h-4 opacity-50 mt-2" />}
                  </button>
                ))}
              </div>
            </section>

            {/* Unlock Code */}
            <section className="bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg p-6 border border-green-600/30">
              <h3 className="font-bold mb-3">🔓 Unlock Stamps with Code</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Enter unlock code..."
                  className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-matrix-green"
                />
                <button
                  onClick={handleUnlockStamp}
                  className="px-6 py-2 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition"
                >
                  Unlock
                </button>
              </div>
              {message && <p className="mt-2 text-sm text-matrix-green">{message}</p>}
            </section>

            {/* Roadmap */}
            <section>
              <h2 className="text-2xl font-bold mb-4">📋 4-Week Roadmap</h2>
              <div className="space-y-6">
                {ROADMAP.map((week) => (
                  <div key={week.week} className="bg-black/30 rounded-lg border border-gray-700/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{week.module} - {week.title}</h3>
                          <p className="text-sm text-gray-400">Week {week.week}</p>
                        </div>
                        <Target className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {week.days.map((item) => (
                        <div key={item.day} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-matrix-green flex-shrink-0" />
                          <span>Day {item.day}: {item.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Extra Practice */}
            <section className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg p-6 border border-purple-600/30">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                📝 Extra Practice
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Every Monday, Flor posts a check-in prompt in the community. Comment your reflections to get personalized feedback!
              </p>
              <a href="https://skool.com" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-600/50 rounded transition">
                → Join Community
              </a>
            </section>
          </div>
        </main>
      </div>

      {/* Stamp Detail Modal */}
      {selectedStamp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStamp(null)}>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 max-w-sm border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="text-6xl mb-4">{STAMPS[selectedStamp].emoji}</div>
            <h3 className="text-2xl font-bold mb-2">{STAMPS[selectedStamp].title}</h3>
            <p className="text-gray-400 mb-4">{STAMPS[selectedStamp].description}</p>
            {stamps[selectedStamp] ? (
              <p className="text-matrix-green font-bold">✓ Unlocked</p>
            ) : (
              <p className="text-gray-400">🔒 Locked - Use code to unlock</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name: '', email: '', level: 'intermediate', goal: '' });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-darker via-blue-900/20 to-purple-900/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 text-matrix-green mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">English Needs</h1>
          <p className="text-gray-400">4-week interview preparation roadmap</p>
        </div>

        <div className="bg-black/50 rounded-lg p-8 border border-green-900/30 backdrop-blur-sm">
          {step === 0 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Welcome! 👋</h2>
              <p className="text-gray-400">Let's get you ready for your English interview in 4 weeks.</p>
              <button onClick={handleNext} className="w-full py-3 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition">
                Get Started
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <label className="block">
                <span className="text-sm font-bold text-gray-400">What's your name?</span>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({...data, name: e.target.value})}
                  className="w-full mt-2 bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-matrix-green"
                  placeholder="Your name"
                />
              </label>
              <button onClick={handleNext} className="w-full py-3 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition">
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <label className="block">
                <span className="text-sm font-bold text-gray-400">Your email</span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                  className="w-full mt-2 bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-matrix-green"
                  placeholder="your@email.com"
                />
              </label>
              <button onClick={handleNext} className="w-full py-3 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition">
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <label className="block">
                <span className="text-sm font-bold text-gray-400">English level</span>
                <select
                  value={data.level}
                  onChange={(e) => setData({...data, level: e.target.value})}
                  className="w-full mt-2 bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-matrix-green"
                >
                  <option>beginner</option>
                  <option>intermediate</option>
                  <option>advanced</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold text-gray-400">Career goal</span>
                <input
                  type="text"
                  value={data.goal}
                  onChange={(e) => setData({...data, goal: e.target.value})}
                  className="w-full mt-2 bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-matrix-green"
                  placeholder="e.g. Land a tech job abroad"
                />
              </label>
              <button onClick={handleNext} className="w-full py-3 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition">
                Complete Setup
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center animate-fadeIn">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold">You're all set!</h2>
              <p className="text-gray-400">Let's build your interview confidence together.</p>
            </div>
          )}

          <div className="mt-6 flex gap-2 justify-center">
            {[0,1,2,3].map(i => (
              <div key={i} className={`h-2 rounded-full transition ${i <= step ? 'bg-matrix-green w-8' : 'bg-gray-700 w-2'}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
