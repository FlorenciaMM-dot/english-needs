import React, { useState, useEffect } from 'react';
import { LogOut, Menu, X, Trophy } from 'lucide-react';

// ============================================================================
// PHASE 1: DATA STRUCTURE - 8 Missions with objectives and tasks
// ============================================================================

const MISSIONS = {
  mission_1: {
    id: 'mission_1',
    order: 1,
    title: 'Define Your Destination',
    emoji: '🎯',
    stampId: 'destination',
    description: 'Tener absoluta claridad sobre el trabajo que querés conseguir.',
    objectives: [
      'Claridad absoluta sobre el trabajo que querés conseguir',
      'No importa cuánto inglés ni experiencia tengas',
      'Si no sabés hacia dónde vas, toda tu preparación pierde dirección'
    ],
    tasks: [
      { id: 'task_1_1', label: 'Presentarte en la comunidad' },
      { id: 'task_1_2', label: 'Completar Interview Readiness Check' },
      { id: 'task_1_3', label: 'Completar Dream Job Wall' },
      { id: 'task_1_4', label: 'Configurar tus AI Coaches' }
    ],
    requiredStamps: [],
    unlockMessage: '🏆 Destination Stamp Unlocked!'
  },
  mission_2: {
    id: 'mission_2',
    order: 2,
    title: 'Build a Recruiter-Ready Profile',
    emoji: '📄',
    stampId: 'recruiter',
    description: 'Construir un perfil profesional que comunique claramente tu valor.',
    objectives: [
      'Crear un perfil profesional que comunique tu valor',
      'Optimizar tu CV para ATS',
      'Destacar tus logros cuantificables'
    ],
    tasks: [
      { id: 'task_2_1', label: 'CV Audit' },
      { id: 'task_2_2', label: 'Professional Summary' },
      { id: 'task_2_3', label: 'ATS Checklist' },
      { id: 'task_2_4', label: 'Action Verbs' },
      { id: 'task_2_5', label: 'Keywords' }
    ],
    requiredStamps: ['destination'],
    unlockMessage: '🏆 Recruiter Ready Stamp Unlocked!'
  },
  mission_3: {
    id: 'mission_3',
    order: 3,
    title: 'Become Discoverable',
    emoji: '✨',
    stampId: 'visibility',
    description: 'Que los recruiters puedan encontrarte.',
    objectives: [
      'Que los recruiters puedan encontrarte',
      'Optimizar LinkedIn para máxima visibilidad',
      'Construir presencia profesional en línea'
    ],
    tasks: [
      { id: 'task_3_1', label: 'LinkedIn Audit' },
      { id: 'task_3_2', label: 'Headline' },
      { id: 'task_3_3', label: 'About' },
      { id: 'task_3_4', label: 'Skills' },
      { id: 'task_3_5', label: 'Profile Optimization' }
    ],
    requiredStamps: ['recruiter'],
    unlockMessage: '🏆 Visibility Stamp Unlocked!'
  },
  mission_4: {
    id: 'mission_4',
    order: 4,
    title: 'Find Better Opportunities',
    emoji: '🔍',
    stampId: 'hunter',
    description: 'Dejar de buscar trabajo al azar.',
    objectives: [
      'Dejar de buscar trabajo al azar',
      'Desarrollar estrategia de búsqueda efectiva',
      'Construir red de contactos estratégicos'
    ],
    tasks: [
      { id: 'task_4_1', label: 'Keywords' },
      { id: 'task_4_2', label: 'Job Search' },
      { id: 'task_4_3', label: 'Filters' },
      { id: 'task_4_4', label: 'Alerts' },
      { id: 'task_4_5', label: 'Networking' }
    ],
    requiredStamps: ['visibility'],
    unlockMessage: '🏆 Job Hunter Stamp Unlocked!'
  },
  mission_5: {
    id: 'mission_5',
    order: 5,
    title: 'Build Your Interview English',
    emoji: '🌐',
    stampId: 'english',
    description: 'Aprender el inglés que realmente necesitás para entrevistas.',
    objectives: [
      'Aprender el inglés que realmente necesitás',
      'Dominar vocabulario técnico y profesional',
      'Mejorar fluency y pronunciación'
    ],
    tasks: [
      { id: 'task_5_1', label: 'Tell me about yourself' },
      { id: 'task_5_2', label: 'Present Simple' },
      { id: 'task_5_3', label: 'Past Simple' },
      { id: 'task_5_4', label: 'Present Perfect' }
    ],
    requiredStamps: ['destination'],
    unlockMessage: '🏆 English Foundations Stamp Unlocked!'
  },
  mission_6: {
    id: 'mission_6',
    order: 6,
    title: 'Speak Like a Professional',
    emoji: '💬',
    stampId: 'communication',
    description: 'Responder de forma clara y organizada.',
    objectives: [
      'Responder de forma clara y organizada',
      'Dominar estructuras gramaticales avanzadas',
      'Mejorar fluidez en conversaciones profesionales'
    ],
    tasks: [
      { id: 'task_6_1', label: 'Linking Phrases' },
      { id: 'task_6_2', label: 'Future Forms' },
      { id: 'task_6_3', label: 'Modal Verbs' },
      { id: 'task_6_4', label: 'English Feedback Coach' }
    ],
    requiredStamps: ['english'],
    unlockMessage: '🏆 Communication Stamp Unlocked!'
  },
  mission_7: {
    id: 'mission_7',
    order: 7,
    title: 'Tell Better Stories',
    emoji: '📖',
    stampId: 'storytelling',
    description: 'Aprender a responder utilizando ejemplos reales.',
    objectives: [
      'Aprender a responder utilizando ejemplos reales',
      'Dominar el método STAR para preguntas conductuales',
      'Crear historias convincentes sobre tu experiencia'
    ],
    tasks: [
      { id: 'task_7_1', label: 'Past–Present–Future' },
      { id: 'task_7_2', label: 'STAR' },
      { id: 'task_7_3', label: 'Story Builder' }
    ],
    requiredStamps: ['communication'],
    unlockMessage: '🏆 Storytelling Stamp Unlocked!'
  },
  mission_8: {
    id: 'mission_8',
    order: 8,
    title: 'Interview Ready',
    emoji: '🏆',
    stampId: 'interview',
    description: 'Integrar todo lo aprendido.',
    objectives: [
      'Integrar todo lo aprendido',
      'Demostrar dominio en entrevistas simuladas',
      'Estar 100% listo para entrevistas reales'
    ],
    tasks: [
      { id: 'task_8_1', label: 'Tell me about yourself Final' },
      { id: 'task_8_2', label: 'STAR Final' },
      { id: 'task_8_3', label: 'Interview Readiness Check Final' },
      { id: 'task_8_4', label: 'Reflection' }
    ],
    requiredStamps: ['storytelling', 'hunter'],
    unlockMessage: '🏆 Interview Ready Stamp Unlocked!'
  }
};

const STAMP_CODES = {
  'DEMO': ['destination', 'recruiter', 'visibility', 'hunter'],
  'MISSION1': ['destination'],
  'MISSION2': ['recruiter'],
  'MISSION3': ['visibility'],
  'MISSION4': ['hunter'],
  'MISSION5': ['english'],
  'MISSION6': ['communication'],
  'MISSION7': ['storytelling'],
  'MISSION8': ['interview'],
  'ALLACCESS': ['destination', 'recruiter', 'visibility', 'hunter', 'english', 'communication', 'storytelling', 'interview'],
};

const STAMPS = {
  destination: { emoji: '🎯', title: 'Destination Master', color: 'from-blue-600 to-blue-400', description: 'Clarity & direction established' },
  recruiter: { emoji: '📄', title: 'Recruiter Ready', color: 'from-green-600 to-green-400', description: 'CV mastery & storytelling' },
  visibility: { emoji: '✨', title: 'Visibility Leader', color: 'from-yellow-600 to-yellow-400', description: 'LinkedIn authority & online presence' },
  hunter: { emoji: '🔍', title: 'Job Hunter', color: 'from-orange-600 to-orange-400', description: 'Strategic job search excellence' },
  english: { emoji: '🌐', title: 'Fluent Speaker', color: 'from-teal-600 to-teal-400', description: 'English communication excellence' },
  communication: { emoji: '💬', title: 'Communication Expert', color: 'from-pink-600 to-pink-400', description: 'Professional speaking mastery' },
  storytelling: { emoji: '📖', title: 'Story Master', color: 'from-purple-600 to-purple-400', description: 'STAR & storytelling excellence' },
  interview: { emoji: '🏆', title: 'Interview Champion', color: 'from-red-600 to-red-400', description: 'Complete interview mastery' },
};

// ============================================================================
// PHASE 2: STATE MANAGEMENT - Mission tracking, progress, and UI states
// ============================================================================

export default function EnglishNeeds() {
  const [profile, setProfile] = useState(null);
  const [missionProgress, setMissionProgress] = useState({});
  const [completedMissions, setCompletedMissions] = useState([]);
  const [unlockedStamps, setUnlockedStamps] = useState({});
  const [selectedMission, setSelectedMission] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebratingStampId, setCelebratingStampId] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [adminCodes, setAdminCodes] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('englishneeds:profile');
    const savedMissionProgress = localStorage.getItem('englishneeds:missionProgress');
    const savedCompletedMissions = localStorage.getItem('englishneeds:completedMissions');
    const savedStamps = localStorage.getItem('englishneeds:stamps');

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedMissionProgress) setMissionProgress(JSON.parse(savedMissionProgress));
    if (savedCompletedMissions) setCompletedMissions(JSON.parse(savedCompletedMissions));
    if (savedStamps) setUnlockedStamps(JSON.parse(savedStamps));
  }, []);

  useEffect(() => {
    if (profile) localStorage.setItem('englishneeds:profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('englishneeds:missionProgress', JSON.stringify(missionProgress));
  }, [missionProgress]);

  useEffect(() => {
    localStorage.setItem('englishneeds:completedMissions', JSON.stringify(completedMissions));
  }, [completedMissions]);

  useEffect(() => {
    localStorage.setItem('englishneeds:stamps', JSON.stringify(unlockedStamps));
  }, [unlockedStamps]);

  // ============================================================================
  // PHASE 4: HELPER FUNCTIONS
  // ============================================================================

  const getAllMissions = () => Object.values(MISSIONS).sort((a, b) => a.order - b.order);

  const getMissionProgress = (missionId) => {
    const tasks = MISSIONS[missionId].tasks;
    const completed = tasks.filter(t => missionProgress[missionId]?.[t.id]).length;
    return { completed, total: tasks.length, percentage: Math.round((completed / tasks.length) * 100) };
  };

  const isMissionUnlocked = (missionId) => {
    const mission = MISSIONS[missionId];
    return mission.requiredStamps.every(stampId => unlockedStamps[stampId]);
  };

  const getNextMission = () => {
    const all = getAllMissions();
    return all.find(m => !completedMissions.includes(m.id) && isMissionUnlocked(m.id));
  };

  const getTotalStamps = () => Object.keys(unlockedStamps).filter(k => unlockedStamps[k]).length;

  const toggleMissionTask = (missionId, taskId) => {
    const current = missionProgress[missionId]?.[taskId] ?? false;
    const updated = {
      ...missionProgress,
      [missionId]: {
        ...(missionProgress[missionId] ?? {}),
        [taskId]: !current
      }
    };
    setMissionProgress(updated);
  };

  const handleMissionUnlock = (missionId, code) => {
    const validCode = adminCodes.find(c => c.code.toUpperCase() === code.toUpperCase() && c.missionId === missionId);

    if (!validCode) {
      setMessage('❌ Invalid code for this mission');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const mission = MISSIONS[missionId];
    setCompletedMissions([...completedMissions, missionId]);
    setUnlockedStamps({ ...unlockedStamps, [mission.stampId]: true });

    setCelebratingStampId(mission.stampId);
    setShowCelebration(true);

    setTimeout(() => setShowCelebration(false), 5000);

    if (completedMissions.length === 7) {
      setTimeout(() => setShowRewardModal(true), 5500);
    }
  };

  const handleUnlockStamp = (code) => {
    const codeUpper = code.toUpperCase();
    if (!STAMP_CODES[codeUpper]) {
      setMessage('❌ Código inválido. Intenta de nuevo.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const stampIds = STAMP_CODES[codeUpper];
    const newStamps = { ...unlockedStamps };
    stampIds.forEach(stampId => newStamps[stampId] = true);
    setUnlockedStamps(newStamps);
    setMessage(`✨ ${stampIds.length} sello(s) desbloqueado(s)!`);
    setCodeInput('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleOnboarding = (data) => {
    setProfile({ name: data.name, email: data.email, level: data.level, goal: data.goal });
  };

  const handleLogout = () => {
    localStorage.removeItem('englishneeds:profile');
    localStorage.removeItem('englishneeds:missionProgress');
    localStorage.removeItem('englishneeds:completedMissions');
    localStorage.removeItem('englishneeds:stamps');
    setProfile(null);
    setMissionProgress({});
    setCompletedMissions([]);
    setUnlockedStamps({});
  };

  const generateCode = (prefix, missionId) => {
    const newCode = `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newCodes = [...adminCodes, { code: newCode, missionId: missionId, createdAt: new Date().toLocaleString() }];
    setAdminCodes(newCodes);
    localStorage.setItem('englishneeds:adminCodes', JSON.stringify(newCodes));
    setMessage(`✨ Code created: ${newCode}`);
    setTimeout(() => setMessage(''), 3000);
    return newCode;
  };

  if (adminMode) {
    return <AdminPanel onLogout={() => setAdminMode(false)} onGenerateCode={generateCode} adminCodes={adminCodes} />;
  }

  if (!profile) {
    return <OnboardingFlow onComplete={handleOnboarding} />;
  }

  const nextMission = getNextMission();
  const totalStamps = getTotalStamps();

  return (
    <div className="min-h-screen bg-matrix-darker text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-green-900/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setAdminMode(true)} title="Admin access">
            <Trophy className="w-8 h-8 text-matrix-green" />
            <h1 className="text-2xl font-bold">English Needs</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
            <button onClick={handleLogout} className="hidden md:flex items-center gap-2 px-4 py-2 rounded bg-red-600/20 hover:bg-red-600/40 transition">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row h-[calc(100vh-70px)]">
        {/* Sidebar */}
        <aside className={`w-full md:w-64 bg-black/30 border-r border-green-900/30 p-6 space-y-6 ${mobileMenuOpen ? 'block' : 'hidden'} md:block overflow-y-auto`}>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Welcome</p>
            <h2 className="text-xl font-bold text-matrix-green">{profile.name}</h2>
            <p className="text-xs text-gray-500">{profile.email}</p>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-r from-matrix-green/10 to-blue-600/10 rounded-lg p-3">
              <p className="text-xs text-gray-400">Goal</p>
              <p className="text-sm font-semibold">{profile.goal}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-3">
              <p className="text-xs text-gray-400">English Level</p>
              <p className="text-sm font-semibold capitalize">{profile.level}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700/30">
            <p className="text-sm font-bold text-matrix-green mb-3">📊 Progress</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Stamps: {totalStamps}/8</span>
                <span>{Math.round(totalStamps / 8 * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700/30 rounded-full h-2">
                <div className="bg-gradient-to-r from-matrix-green to-blue-600 h-2 rounded-full" style={{width: `${totalStamps / 8 * 100}%`}}></div>
              </div>
            </div>
          </div>

          {nextMission && (
            <div className="p-3 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-600/30">
              <p className="text-xs text-gray-400 mb-1">Next Mission</p>
              <p className="text-sm font-bold text-matrix-green">{nextMission.emoji} {nextMission.title}</p>
            </div>
          )}

          <button onClick={handleLogout} className="w-full md:hidden mt-6 px-4 py-2 rounded bg-red-600/20 hover:bg-red-600/40 transition flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Mission Status Header */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-600/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">MISSION STATUS</h2>
                <span className="text-2xl font-bold text-matrix-green">{totalStamps} / 8 Stamps</span>
              </div>
              <div className="w-full bg-gray-700/30 rounded-full h-3">
                <div className="bg-gradient-to-r from-matrix-green to-blue-600 h-3 rounded-full transition-all" style={{width: `${totalStamps / 8 * 100}%`}}></div>
              </div>
              {nextMission && (
                <div className="mt-3 text-sm">
                  <span className="text-gray-400">Next Reward: </span>
                  <span className="text-matrix-green font-bold">{totalStamps === 8 ? '🎁 Private 1:1 Coaching Session' : `${nextMission.emoji} ${nextMission.title}`}</span>
                </div>
              )}
            </div>

            {/* Mission Passport Grid */}
            <section>
              <h2 className="text-2xl font-bold mb-6">🎖️ Mission Passport</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getAllMissions().map((mission) => {
                  const isUnlocked = isMissionUnlocked(mission.id);
                  const isComplete = completedMissions.includes(mission.id);
                  const progress = getMissionProgress(mission.id);
                  const stamp = STAMPS[mission.stampId];

                  return (
                    <button
                      key={mission.id}
                      onClick={() => isUnlocked && setSelectedMission(mission.id)}
                      disabled={!isUnlocked}
                      className={`relative p-4 rounded-lg border transition transform hover:scale-105 ${
                        isComplete
                          ? `bg-gradient-to-br ${stamp.color} border-yellow-500/50 shadow-lg shadow-yellow-500/20`
                          : isUnlocked
                          ? 'bg-gray-900/50 border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-800/30'
                          : 'bg-gray-900/20 border-gray-700/30 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{isComplete ? stamp.emoji : isUnlocked ? mission.emoji : '🔒'}</div>
                      <p className="font-bold text-sm">{mission.title}</p>
                      {isUnlocked && !isComplete && (
                        <div className="mt-2 text-xs">
                          <p className="text-gray-400">{progress.completed}/{progress.total}</p>
                          <div className="w-full bg-gray-700/30 rounded-full h-1 mt-1">
                            <div className="bg-matrix-green h-1 rounded-full" style={{width: `${progress.percentage}%`}}></div>
                          </div>
                        </div>
                      )}
                      {isComplete && (
                        <div className="mt-2 text-xs">
                          <span className="text-yellow-400">✓ Unlocked</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Unlock Code Section */}
            <section className="bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-lg p-6 border border-green-600/30">
              <h3 className="font-bold mb-3">🔓 Unlock Missions with Code</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Enter unlock code..."
                  className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-matrix-green"
                />
                <button
                  onClick={() => handleUnlockStamp(codeInput)}
                  className="px-6 py-2 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition"
                >
                  Unlock
                </button>
              </div>
              {message && <p className="mt-2 text-sm text-matrix-green">{message}</p>}
            </section>

            {/* Live Sessions */}
            <section className="bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-lg p-6 border border-red-600/30">
              <h3 className="font-bold mb-3">🎙️ Live Sessions & Interview Simulations</h3>
              <div className="space-y-3 text-sm text-gray-300 mb-4">
                <p>Join interactive live sessions 3x per week featuring:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><span className="text-matrix-green font-semibold">Real Interview Practice</span> - Mock interviews with professionals</li>
                  <li><span className="text-matrix-green font-semibold">Live Feedback</span> - Get constructive criticism on your responses</li>
                  <li><span className="text-matrix-green font-semibold">Q&A Sessions</span> - Ask experts about interview strategies</li>
                </ul>
              </div>
              <a href="https://skool.com" target="_blank" rel="noopener noreferrer" className="w-full px-4 py-2 bg-red-600/30 hover:bg-red-600/50 border border-red-600/50 rounded transition text-center">
                → Schedule Session
              </a>
            </section>
          </div>
        </main>
      </div>

      {/* Mission Detail Modal */}
      {selectedMission && (
        <MissionDetailModal
          mission={MISSIONS[selectedMission]}
          progress={getMissionProgress(selectedMission)}
          onClose={() => setSelectedMission(null)}
          onTaskToggle={(taskId) => toggleMissionTask(selectedMission, taskId)}
          onUnlock={(missionId, code) => handleMissionUnlock(missionId, code)}
          missionProgress={missionProgress[selectedMission] || {}}
        />
      )}

      {/* Celebration Modal */}
      {showCelebration && celebratingStampId && (
        <CelebrationModal
          stamp={STAMPS[celebratingStampId]}
          nextMission={getAllMissions().find(m => !completedMissions.includes(m.id) && isMissionUnlocked(m.id))}
        />
      )}

      {/* Reward Modal */}
      {showRewardModal && (
        <RewardModal onClose={() => setShowRewardModal(false)} />
      )}
    </div>
  );
}

// ============================================================================
// MISSION DETAIL MODAL COMPONENT
// ============================================================================

function MissionDetailModal({ mission, progress, onClose, onTaskToggle, missionProgress, onUnlock }) {
  const [unlockCode, setUnlockCode] = useState('');
  const isComplete = progress.completed === progress.total && progress.total > 0;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg max-w-2xl w-full border border-gray-700 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-gray-700 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{mission.emoji}</span>
              <div>
                <p className="text-xs text-gray-400">MISSION {mission.order}</p>
                <h2 className="text-2xl font-bold">{mission.title}</h2>
              </div>
            </div>
            <p className="text-sm text-gray-300">{mission.description}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-800 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Objetivo */}
          <div>
            <h3 className="font-bold text-matrix-green mb-3">🎯 Objetivo</h3>
            <ul className="space-y-2">
              {mission.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-matrix-green mt-1">▸</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Progress</h3>
              <span className="text-sm text-matrix-green font-bold">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-700/30 rounded-full h-3">
              <div className="bg-gradient-to-r from-matrix-green to-blue-600 h-3 rounded-full transition-all" style={{width: `${progress.percentage}%`}}></div>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="font-bold mb-3">✅ Tasks ({progress.completed}/{progress.total})</h3>
            <div className="space-y-2">
              {mission.tasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => onTaskToggle(task.id)}
                  className={`w-full flex items-center gap-3 text-sm p-3 rounded transition ${
                    missionProgress[task.id]
                      ? 'bg-matrix-green/20 text-gray-300 line-through'
                      : 'bg-gray-900/50 hover:bg-gray-800/50 text-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={missionProgress[task.id] || false}
                    onChange={() => {}}
                    className="w-5 h-5 cursor-pointer accent-matrix-green"
                  />
                  <span>{task.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Unlock Code (only if 100% complete) */}
          {isComplete && (
            <div className="bg-green-600/10 rounded-lg p-4 border border-green-600/30">
              <p className="text-sm text-matrix-green font-bold mb-3">✅ All tasks complete! Enter your code to unlock:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={unlockCode}
                  onChange={(e) => setUnlockCode(e.target.value)}
                  placeholder="Enter unlock code..."
                  className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-matrix-green"
                />
                <button
                  onClick={() => onUnlock(mission.id, unlockCode)}
                  className="px-6 py-2 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition"
                >
                  Unlock
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-black/30 p-6 border-t border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{mission.emoji}</span>
            <div className="text-sm">
              <p className="text-gray-400">Reward</p>
              <p className="font-bold text-matrix-green">Mission Stamp</p>
            </div>
          </div>
          <button onClick={onClose} className="px-6 py-2 bg-matrix-green/20 hover:bg-matrix-green/40 border border-matrix-green/50 rounded transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CELEBRATION MODAL COMPONENT
// ============================================================================

function CelebrationModal({ stamp, nextMission }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-7xl animate-bounce">{stamp.emoji}</div>
        <div>
          <h2 className="text-3xl font-bold mb-2">🎉 MISSION ACCOMPLISHED!</h2>
          <p className="text-xl text-matrix-green font-bold">{stamp.title} Stamp Unlocked</p>
        </div>
        {nextMission && (
          <div className="bg-black/50 rounded-lg p-4 border border-green-600/30 mt-6">
            <p className="text-sm text-gray-400 mb-2">Next Mission</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">{nextMission.emoji}</span>
              <p className="font-bold text-matrix-green">{nextMission.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// REWARD MODAL COMPONENT
// ============================================================================

function RewardModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg max-w-md w-full border border-yellow-500/30 my-8">
        <div className="text-center p-8 space-y-6">
          <div className="text-6xl animate-pulse">🎉</div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-gray-300">You completed every mission inside Interview Performance Lab.</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-6 rounded-lg border border-yellow-600/30">
            <p className="text-sm text-gray-400 mb-2">You unlocked your exclusive reward</p>
            <p className="text-2xl font-bold text-yellow-400">🎁 Private 1:1 Coaching Session with Flor</p>
          </div>
          <button onClick={onClose} className="w-full px-6 py-3 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition">
            Claim My Session
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ADMIN PANEL COMPONENT
// ============================================================================

function AdminPanel({ onLogout, onGenerateCode, adminCodes }) {
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [codePrefix, setCodePrefix] = useState('FLOR');
  const [selectedMissionId, setSelectedMissionId] = useState('mission_1');

  const handleLogin = () => {
    if (adminPassword === 'Flor2025!Skool') {
      setIsLoggedIn(true);
      setAdminPassword('');
    } else {
      alert('❌ Wrong password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-matrix-darker text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-gray-400">Enter admin password</p>
          </div>
          <div className="bg-black/50 rounded-lg p-8 border border-green-900/30 space-y-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-matrix-green"
            />
            <button onClick={handleLogin} className="w-full py-3 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition">
              Login
            </button>
            <button onClick={onLogout} className="w-full py-2 bg-gray-700/30 hover:bg-gray-700/50 rounded transition">
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-matrix-darker text-white">
      <header className="bg-black/50 backdrop-blur-sm border-b border-green-900/30 p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-matrix-green">⚙️ Admin Panel</h1>
          <button onClick={onLogout} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 rounded transition">
            Exit
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Generate Codes */}
        <section className="bg-black/30 border border-green-900/30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Generate Student Codes</h2>
          <div className="space-y-3 mb-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Select Mission to Unlock:</label>
              <select
                value={selectedMissionId}
                onChange={(e) => setSelectedMissionId(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-matrix-green"
              >
                {Object.values(MISSIONS).map(mission => (
                  <option key={mission.id} value={mission.id}>
                    {mission.emoji} {mission.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={codePrefix}
                onChange={(e) => setCodePrefix(e.target.value.toUpperCase())}
                placeholder="Code prefix (e.g., FLOR)"
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-matrix-green"
              />
              <button
                onClick={() => onGenerateCode(codePrefix, selectedMissionId)}
                className="px-6 py-2 bg-matrix-green text-black font-bold rounded hover:bg-green-300 transition"
              >
                Generate
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-400">Each code unlocks one specific mission</p>
        </section>

        {/* Created Codes */}
        <section className="bg-black/30 border border-green-900/30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Created Codes ({adminCodes.length})</h2>
          {adminCodes.length === 0 ? (
            <p className="text-gray-400">No codes created yet</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {adminCodes.map((item, i) => {
                const mission = MISSIONS[item.missionId];
                return (
                  <div key={i} className="flex items-center justify-between bg-gray-900/50 p-3 rounded border border-gray-700/50">
                    <div>
                      <p className="font-mono font-bold text-matrix-green">{item.code}</p>
                      <p className="text-xs text-gray-500">{mission?.emoji} {mission?.title}</p>
                      <p className="text-xs text-gray-600">{item.createdAt}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.code);
                        alert('✅ Copied!');
                      }}
                      className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded text-sm transition"
                    >
                      Copy
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="bg-black/30 border border-green-900/30 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onGenerateCode('DEMO')}
              className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded transition text-sm"
            >
              Generate DEMO Code
            </button>
            <button
              onClick={() => {
                if (window.confirm('Clear all codes?')) {
                  localStorage.removeItem('englishneeds:adminCodes');
                  alert('✅ All codes cleared');
                }
              }}
              className="px-4 py-2 bg-red-600/30 hover:bg-red-600/50 rounded transition text-sm"
            >
              Clear All Codes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

// ============================================================================
// ONBOARDING FLOW COMPONENT
// ============================================================================

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
          <Trophy className="w-16 h-16 text-matrix-green mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">English Needs</h1>
          <p className="text-gray-400">8-mission interview mastery program</p>
        </div>

        <div className="bg-black/50 rounded-lg p-8 border border-green-900/30 backdrop-blur-sm">
          {step === 0 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-bold">Welcome! 👋</h2>
              <p className="text-gray-400">Get ready to master interviews in 8 powerful missions.</p>
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
