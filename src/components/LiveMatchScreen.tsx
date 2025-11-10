import { useState } from 'react';
import { Plus, Radio, Clock, Users, Target, TrendingUp, Play, Pause, Minimize2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import EnhancedLiveScoringSheet from './EnhancedLiveScoringSheet';
import EnhancedViewerMode from './EnhancedViewerMode';
import CreateNewMatchSheet from './CreateNewMatchSheet';

const liveMatches = [
  {
    id: 1,
    team1: { 
      name: 'Prime XI', 
      score: 145, 
      wickets: 4, 
      overs: 15.3, 
      logo: 'PI',
      color: 'from-green-500 to-green-600',
      players: []
    },
    team2: { 
      name: 'Thunderbolts', 
      score: 0, 
      wickets: 0, 
      overs: 0, 
      logo: 'TB',
      color: 'from-orange-500 to-orange-600',
      players: []
    },
    status: 'live',
    format: 'T20',
    totalOvers: 20,
    currentBatsmen: ['John Smith (45*)', 'Mike Johnson (23*)'],
    currentBowlerName: 'David Brown',
    recentBalls: ['4', '1', 'W', '0', '6', '2'],
    ballsThisOver: ['4', '1', 'W', '0', '6', '2'],
    venue: "Lord's Cricket Ground",
    target: null,
    innings: 1,
    currentInnings: 1,
    battingTeam: 'team1',
    bowlingTeam: 'team2',
    striker: 0,
    nonStriker: 1,
    currentBowler: 0,
    commentary: [],
  },
  {
    id: 2,
    team1: { 
      name: 'Weekend Warriors', 
      score: 185, 
      wickets: 10, 
      overs: 20, 
      logo: 'WW',
      color: 'from-blue-500 to-blue-600',
      players: []
    },
    team2: { 
      name: 'Storm Chasers', 
      score: 142, 
      wickets: 7, 
      overs: 18.2, 
      logo: 'SC',
      color: 'from-red-500 to-red-600',
      players: []
    },
    status: 'live',
    format: 'T20',
    totalOvers: 20,
    currentBatsmen: ['Tom Wilson (34*)', 'Chris Lee (12*)'],
    currentBowlerName: 'James Miller',
    recentBalls: ['1', '2', '0', '1', '4', '0'],
    ballsThisOver: ['1', '2', '0', '1', '4', '0'],
    venue: 'Oval Stadium',
    target: 186,
    innings: 2,
    currentInnings: 2,
    battingTeam: 'team2',
    bowlingTeam: 'team1',
    striker: 0,
    nonStriker: 1,
    currentBowler: 0,
    commentary: [],
  },
];

const upcomingMatches = [
  {
    id: 3,
    team1: { name: 'Sunday Strikers', logo: 'SS' },
    team2: { name: 'Royal Challengers', logo: 'RC' },
    status: 'upcoming',
    format: 'ODI',
    startTime: '3:30 PM',
    date: 'Today',
    venue: 'Eden Gardens',
  },
];

interface LiveMatchScreenProps {
  setFloatingWidget?: (match: any) => void;
}

export default function LiveMatchScreen({ setFloatingWidget }: LiveMatchScreenProps) {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [scoringMode, setScoringMode] = useState<'scoring' | 'viewing'>('viewing');
  const [showScoring, setShowScoring] = useState(false);
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [activeMatches, setActiveMatches] = useState(liveMatches);

  const handleStartScoring = (match: any) => {
    setSelectedMatch(match);
    setScoringMode('scoring');
    setShowScoring(true);
  };

  const handleViewMatch = (match: any) => {
    setSelectedMatch(match);
    setScoringMode('viewing');
    setShowScoring(true);
  };

  const handleMatchCreated = (matchData: any) => {
    setActiveMatches([matchData, ...activeMatches]);
    setSelectedMatch(matchData);
    setScoringMode('scoring');
    setShowScoring(true);
  };

  const handleUpdateMatch = (updatedMatch: any) => {
    setActiveMatches(prev =>
      prev.map(m => m.id === updatedMatch.id ? updatedMatch : m)
    );
    setSelectedMatch(updatedMatch);
  };

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 via-orange-600 to-orange-500 text-white px-6 pt-8 pb-6 rounded-b-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-6"
          >
            <div>
              <h1 className="text-2xl mb-1 flex items-center gap-2">
                <Radio size={28} className="animate-pulse" />
                Live Matches
              </h1>
              <p className="text-orange-100 text-sm">{liveMatches.length} matches in progress</p>
            </div>
            <Badge className="bg-red-500 animate-pulse border-0 px-3 py-1">
              <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block"></span>
              LIVE
            </Badge>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <p className="text-xl">{liveMatches.length}</p>
              <p className="text-xs text-white/70">Live Now</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <p className="text-xl">{upcomingMatches.length}</p>
              <p className="text-xs text-white/70">Upcoming</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <p className="text-xl">24</p>
              <p className="text-xs text-white/70">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Matches */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            <Radio size={18} className="text-red-600" />
            Live Matches
          </h3>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 shadow-lg"
            onClick={() => setShowCreateMatch(true)}
          >
            <Plus size={16} className="mr-1" />
            New Match
          </Button>
        </div>

        <div className="space-y-4">
          {activeMatches.map((match) => (
            <LiveMatchCard
              key={match.id}
              match={match}
              onStartScoring={() => handleStartScoring(match)}
              onView={() => handleViewMatch(match)}
              onShowMini={() => setFloatingWidget?.(match)}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="px-6 mt-6">
        <h3 className="mb-4 flex items-center gap-2">
          <Clock size={18} className="text-gray-600" />
          Upcoming Matches
        </h3>

        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <UpcomingMatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      {/* Scoring/Viewing Sheets */}
      {scoringMode === 'scoring' ? (
        <EnhancedLiveScoringSheet 
          open={showScoring} 
          onOpenChange={setShowScoring} 
          matchData={selectedMatch}
          onUpdateMatch={handleUpdateMatch}
        />
      ) : (
        <EnhancedViewerMode open={showScoring} onOpenChange={setShowScoring} match={selectedMatch} />
      )}

      {/* Create Match Sheet */}
      <CreateNewMatchSheet 
        open={showCreateMatch} 
        onOpenChange={setShowCreateMatch}
        onMatchCreated={handleMatchCreated}
      />
    </div>
  );
}

function LiveMatchCard({ match, onStartScoring, onView, onShowMini }: any) {
  const runRate = (match.team1.score / match.team1.overs).toFixed(2);
  const target = match.target;
  const reqRunRate = target ? ((target - match.team2.score) / (20 - match.team2.overs)).toFixed(2) : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-4 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Live Indicator */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
        
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-red-500 animate-pulse border-0">
            <Radio size={12} className="mr-1" />
            LIVE
          </Badge>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>{match.format}</span>
            <span>•</span>
            <span>Innings {match.innings}</span>
          </div>
        </div>

        {/* Team Scores */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-md">
                {match.team1.logo}
              </div>
              <div>
                <p className="text-sm">{match.team1.name}</p>
                <p className="text-xs text-gray-500">Run Rate: {runRate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl">
                {match.team1.score}/{match.team1.wickets}
              </p>
              <p className="text-xs text-gray-600">({match.team1.overs} ov)</p>
            </div>
          </div>

          {match.innings === 2 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                  {match.team2.logo}
                </div>
                <div>
                  <p className="text-sm">{match.team2.name}</p>
                  {reqRunRate && <p className="text-xs text-gray-500">Req RR: {reqRunRate}</p>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl">
                  {match.team2.score}/{match.team2.wickets}
                </p>
                <p className="text-xs text-gray-600">({match.team2.overs} ov)</p>
              </div>
            </div>
          )}
        </div>

        {/* Current Status */}
        <div className="p-3 bg-blue-50 rounded-lg mb-3">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-600">Batsmen:</span>
            <span>{match.currentBatsmen?.join(', ') || 'Not set'}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Bowler:</span>
            <span>{match.currentBowlerName || 'Not set'}</span>
          </div>
        </div>

        {/* Recent Balls */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">This over:</p>
          <div className="flex gap-2">
            {(match.recentBalls || []).map((ball: string, idx: number) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-sm ${
                  ball === 'W'
                    ? 'bg-red-500 text-white'
                    : ball === '6'
                    ? 'bg-purple-500 text-white'
                    : ball === '4'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {ball}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" variant="outline" onClick={onView}>
            <Play size={14} className="mr-1" />
            Watch
          </Button>
          <Button size="sm" variant="outline" onClick={onShowMini}>
            <Minimize2 size={14} className="mr-1" />
            Mini
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-orange-600 to-red-600" onClick={onStartScoring}>
            <Target size={14} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function UpcomingMatchCard({ match }: any) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline">{match.format}</Badge>
        <div className="text-xs text-gray-600">
          {match.date} • {match.startTime}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs">
            {match.team1.logo}
          </div>
          <span className="text-sm">{match.team1.name}</span>
        </div>
        
        <span className="text-xs text-gray-500">vs</span>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">{match.team2.name}</span>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs">
            {match.team2.logo}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <Button size="sm" className="w-full bg-gradient-to-r from-green-600 to-blue-600">
          <Play size={14} className="mr-1" />
          Start Match
        </Button>
      </div>
    </Card>
  );
}
