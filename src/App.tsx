import { useState } from 'react';
import { Home, Calendar, Users, Shield, User, Radio } from 'lucide-react';
import HomeScreen from './components/HomeScreen';
import MatchesScreen from './components/MatchesScreen';
import PlayersScreen from './components/PlayersScreen';
import TeamsScreen from './components/TeamsScreen';
import ProfileScreen from './components/ProfileScreen';
import LiveMatchScreen from './components/LiveMatchScreen';
import FloatingScoreWidget from './components/FloatingScoreWidget';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [floatingWidget, setFloatingWidget] = useState<any>(null);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen setFloatingWidget={setFloatingWidget} />;
      case 'live':
        return <LiveMatchScreen setFloatingWidget={setFloatingWidget} />;
      case 'matches':
        return <MatchesScreen setFloatingWidget={setFloatingWidget} />;
      case 'players':
        return <PlayersScreen />;
      case 'teams':
        return <TeamsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen setFloatingWidget={setFloatingWidget} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <div className="max-w-md mx-auto">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto grid grid-cols-5 h-16">
          <NavItem
            icon={<Home size={22} />}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <NavItem
            icon={<Radio size={22} />}
            label="Live"
            active={activeTab === 'live'}
            onClick={() => setActiveTab('live')}
            hasNotification={true}
          />
          <NavItem
            icon={<Calendar size={22} />}
            label="Matches"
            active={activeTab === 'matches'}
            onClick={() => setActiveTab('matches')}
          />
          <NavItem
            icon={<Users size={22} />}
            label="Players"
            active={activeTab === 'players'}
            onClick={() => setActiveTab('players')}
          />
          <NavItem
            icon={<User size={22} />}
            label="Profile"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>

      {/* Floating Score Widget - Persists across all screens */}
      {floatingWidget && (
        <FloatingScoreWidget
          match={floatingWidget}
          onClose={() => setFloatingWidget(null)}
        />
      )}

      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </div>
  );
}

function NavItem({ icon, label, active, onClick, hasNotification }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1 px-2 py-2 transition-colors ${
        active ? 'text-green-600' : 'text-gray-500'
      }`}
    >
      <div className="relative">
        {icon}
        {hasNotification && !active && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}
