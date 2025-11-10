import { useState, useEffect } from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
} from './ui/bottom-sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Radio, RotateCcw, Target, TrendingUp, Zap, Award, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import MatchControlsPanel from './MatchControlsPanel';

interface EnhancedLiveScoringSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchData: any;
  onUpdateMatch: (data: any) => void;
}

const commentaryTemplates = {
  0: ["Dot ball! Good defense", "No run there", "Solid defensive shot", "Blocked back to the bowler"],
  1: ["Single taken", "Quick single", "One run", "Rotates the strike"],
  2: ["Two runs", "Good running between the wickets", "They come back for two", "Couple of runs"],
  3: ["Three runs! Great running", "Excellent running, three runs", "They push for three"],
  4: [
    "FOUR! Brilliant shot 🔥",
    "Boundary! Sweetly timed 💥",
    "FOUR runs! What a shot 🏏",
    "To the boundary! Four runs 🎯",
    "Creamed through the covers for FOUR! 🌟"
  ],
  6: [
    "SIX! Massive hit! 🚀",
    "MAXIMUM! Out of the park! 💫",
    "SIX runs! Incredible shot! 🎆",
    "Goes all the way! SIX! ⚡",
    "BOOM! That's huge! SIX! 💥"
  ],
  wide: ["Wide called", "That's a wide", "Extra run - wide"],
  noball: ["No ball! Free hit coming up", "No ball called", "Overstepping - no ball"],
  wicket: [
    "WICKET! 🎯",
    "OUT! Big breakthrough! 🔴",
    "GONE! Wicket falls! ⚠️",
    "That's out! Huge wicket! 💥"
  ]
};

const milestones = {
  50: "🎉 FIFTY! Outstanding knock!",
  100: "💯 CENTURY! What an innings!",
  150: "⭐ 150 runs! Incredible!",
  200: "🏆 DOUBLE CENTURY! Historic!",
};

export default function EnhancedLiveScoringSheet({
  open,
  onOpenChange,
  matchData,
  onUpdateMatch,
}: EnhancedLiveScoringSheetProps) {
  const [match, setMatch] = useState(matchData);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setMatch(matchData);
  }, [matchData]);

  if (!match) return null;

  const battingTeam = match.battingTeam === 'team1' ? match.team1 : match.team2;
  const bowlingTeam = match.battingTeam === 'team1' ? match.team2 : match.team1;
  
  const striker = battingTeam.players?.[match.striker] || { 
    name: 'Batsman 1', 
    runs: 0, 
    balls: 0, 
    fours: 0, 
    sixes: 0, 
    strikeRate: 0 
  };
  const nonStriker = battingTeam.players?.[match.nonStriker] || { 
    name: 'Batsman 2', 
    runs: 0, 
    balls: 0, 
    fours: 0, 
    sixes: 0, 
    strikeRate: 0 
  };
  const bowler = bowlingTeam.players?.[match.currentBowler] || { name: 'Select Bowler' };

  const totalBalls = Math.floor(battingTeam.overs) * 6 + (battingTeam.overs % 1) * 10;
  const currentOver = `${Math.floor(battingTeam.overs)}.${Math.floor((battingTeam.overs % 1) * 10)}`;
  const runRate = battingTeam.overs > 0 ? (battingTeam.score / battingTeam.overs).toFixed(2) : '0.00';

  const getRandomComment = (type: string | number) => {
    const templates = commentaryTemplates[type as keyof typeof commentaryTemplates] || ["Ball bowled"];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const triggerCelebration = (type: 'four' | 'six' | 'wicket' | 'fifty' | 'hundred') => {
    // Visual celebration feedback without external dependency
    const celebrationMessages = {
      four: '🔥 FOUR!',
      six: '🚀 SIX!',
      wicket: '🎯 WICKET!',
      fifty: '🎉 FIFTY!',
      hundred: '💯 CENTURY!',
    };
    
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const addCommentary = (text: string, highlight = false) => {
    const newCommentary = {
      over: currentOver,
      text,
      highlight,
      timestamp: new Date().toISOString(),
    };

    setMatch((prev: any) => ({
      ...prev,
      commentary: [newCommentary, ...prev.commentary],
    }));
  };

  const checkMilestone = (runs: number) => {
    if (runs === 50 || runs === 100 || runs === 150) {
      const message = milestones[runs as keyof typeof milestones];
      toast.success(message, {
        description: `${striker.name} reaches ${runs}!`,
      });
      addCommentary(`${message} ${striker.name} reaches ${runs}!`, true);
      triggerCelebration(runs === 100 ? 'hundred' : 'fifty');
    }
  };

  const updatePlayerStats = (playerIndex: number, runs: number, isBall: boolean = true) => {
    setMatch((prev: any) => {
      const team = prev.battingTeam === 'team1' ? 'team1' : 'team2';
      const updatedPlayers = [...prev[team].players];
      const player = updatedPlayers[playerIndex];
      
      player.runs += runs;
      if (isBall) player.balls += 1;
      if (runs === 4) player.fours += 1;
      if (runs === 6) player.sixes += 1;
      player.strikeRate = player.balls > 0 ? ((player.runs / player.balls) * 100).toFixed(2) : 0;

      checkMilestone(player.runs);

      return {
        ...prev,
        [team]: {
          ...prev[team],
          players: updatedPlayers,
        },
      };
    });
  };

  const addRuns = (run: number) => {
    const commentary = getRandomComment(run);
    
    setMatch((prev: any) => {
      const team = prev.battingTeam === 'team1' ? 'team1' : 'team2';
      const newScore = prev[team].score + run;
      const newBalls = totalBalls + 1;
      const newOvers = Math.floor(newBalls / 6) + (newBalls % 6) / 10;
      const ballsInOver = newBalls % 6;

      return {
        ...prev,
        [team]: {
          ...prev[team],
          score: newScore,
          overs: parseFloat(newOvers.toFixed(1)),
        },
        ballsThisOver: [...prev.ballsThisOver, run.toString()],
        striker: ballsInOver === 0 || run % 2 !== 0 ? prev.nonStriker : prev.striker,
        nonStriker: ballsInOver === 0 || run % 2 !== 0 ? prev.striker : prev.nonStriker,
      };
    });

    updatePlayerStats(match.striker, run, true);
    addCommentary(`${currentOver} - ${commentary} - ${striker.name}`);

    if (run === 4) {
      triggerCelebration('four');
      toast.success('FOUR! 🔥', { description: striker.name });
    } else if (run === 6) {
      triggerCelebration('six');
      toast.success('SIX! 🚀', { description: striker.name });
    }

    // Check for over completion
    if ((totalBalls + 1) % 6 === 0) {
      toast.info('Over Complete!', {
        description: `End of over ${Math.floor((totalBalls + 1) / 6)}`
      });
      setMatch((prev: any) => ({ ...prev, ballsThisOver: [] }));
    }

    onUpdateMatch(match);
  };

  const addWicket = (dismissalType: string) => {
    const commentary = `${getRandomComment('wicket')} ${striker.name} ${dismissalType}`;
    
    setMatch((prev: any) => {
      const team = prev.battingTeam === 'team1' ? 'team1' : 'team2';
      const updatedPlayers = [...prev[team].players];
      updatedPlayers[prev.striker].isOut = true;
      updatedPlayers[prev.striker].dismissal = dismissalType;

      const newBalls = totalBalls + 1;
      const newOvers = Math.floor(newBalls / 6) + (newBalls % 6) / 10;

      return {
        ...prev,
        [team]: {
          ...prev[team],
          wickets: prev[team].wickets + 1,
          overs: parseFloat(newOvers.toFixed(1)),
          players: updatedPlayers,
        },
        ballsThisOver: [...prev.ballsThisOver, 'W'],
      };
    });

    updatePlayerStats(match.striker, 0, true);
    addCommentary(commentary, true);
    triggerCelebration('wicket');
    toast.error('WICKET! 🎯', {
      description: `${striker.name} is out!`
    });

    // Check for innings end
    if (battingTeam.wickets + 1 >= 10) {
      toast.info('Innings Complete!', {
        description: 'All out!'
      });
    }

    onUpdateMatch(match);
  };

  const addExtra = (type: string, runs: number) => {
    const commentary = getRandomComment(type);
    
    setMatch((prev: any) => {
      const team = prev.battingTeam === 'team1' ? 'team1' : 'team2';
      const shouldAddBall = type === 'bye' || type === 'legbye';
      const newBalls = shouldAddBall ? totalBalls + 1 : totalBalls;
      const newOvers = Math.floor(newBalls / 6) + (newBalls % 6) / 10;

      return {
        ...prev,
        [team]: {
          ...prev[team],
          score: prev[team].score + runs,
          overs: shouldAddBall ? parseFloat(newOvers.toFixed(1)) : prev[team].overs,
        },
        ballsThisOver: [...prev.ballsThisOver, `${runs}${type.charAt(0).toUpperCase()}`],
      };
    });

    addCommentary(`${currentOver} - ${commentary}`);
    toast.info(`${type.toUpperCase()} - ${runs} run(s)`);
    onUpdateMatch(match);
  };

  const rotateStrike = () => {
    setMatch((prev: any) => ({
      ...prev,
      striker: prev.nonStriker,
      nonStriker: prev.striker,
    }));
    toast.success('Strike rotated');
  };

  const undoLastBall = () => {
    if (match.ballsThisOver.length > 0) {
      setMatch((prev: any) => ({
        ...prev,
        ballsThisOver: prev.ballsThisOver.slice(0, -1),
      }));
      toast.info('Last ball undone');
    }
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 bg-gradient-to-br from-red-600 via-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Radio size={24} className="text-white" />
            </motion.div>
            <div>
              <BottomSheetTitle className="text-lg">Live Scoring</BottomSheetTitle>
              <BottomSheetDescription className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                {match.team1.name} vs {match.team2.name}
              </BottomSheetDescription>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 animate-pulse border-0 shadow-md px-3 py-1">
            <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block"></span>
            LIVE
          </Badge>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent className="pb-4">
        {/* Celebration Overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl"
              >
                🎉
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current Score Display */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="mb-5 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl border-2 border-blue-300 shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 bg-gradient-to-br ${battingTeam.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                {battingTeam.logo}
              </div>
              <div>
                <p className="text-sm text-gray-600">{battingTeam.name}</p>
                <p className="text-xs text-gray-500">Innings {match.currentInnings}</p>
              </div>
            </div>
            <div className="text-right">
              <motion.p 
                key={battingTeam.score}
                initial={{ scale: 1.2, color: '#10b981' }}
                animate={{ scale: 1, color: '#000' }}
                className="text-5xl"
              >
                {battingTeam.score}<span className="text-3xl text-gray-600">/{battingTeam.wickets}</span>
              </motion.p>
              <p className="text-sm text-gray-600">({currentOver} ov)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 bg-white/50 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(battingTeam.overs / match.totalOvers) * 100}%` }}
                className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
              />
            </div>
            <span className="text-xs text-gray-600">{match.totalOvers} ov</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-gray-600">
                <TrendingUp size={14} className="text-green-600" />
                RR: {runRate}
              </span>
              <span className="text-gray-600">
                Proj: {Math.round(parseFloat(runRate) * match.totalOvers)}
              </span>
            </div>
            {match.currentInnings === 2 && (
              <span className="text-purple-600">
                Need {match.team1.score + 1 - battingTeam.score} in {(match.totalOvers - battingTeam.overs) * 6} balls
              </span>
            )}
          </div>
        </motion.div>

        {/* Batsmen Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-2xl transition-all ${
              match.striker === 0
                ? 'bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-500 shadow-lg'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {match.striker === 0 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Target size={14} className="text-green-600" />
                </motion.div>
              )}
              <p className="text-xs text-gray-600">Striker</p>
            </div>
            <p className="text-sm mb-1">{striker?.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-xl">{striker?.runs}*</p>
              <p className="text-xs text-gray-600">({striker?.balls})</p>
            </div>
            <div className="flex gap-2 mt-2 text-xs">
              <Badge variant="outline" className="text-xs">4s: {striker?.fours}</Badge>
              <Badge variant="outline" className="text-xs">6s: {striker?.sixes}</Badge>
            </div>
            <p className="text-xs text-gray-600 mt-1">SR: {striker?.strikeRate}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-2xl transition-all ${
              match.nonStriker === 1
                ? 'bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-500 shadow-lg'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs text-gray-600">Non-Striker</p>
            </div>
            <p className="text-sm mb-1">{nonStriker?.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-xl">{nonStriker?.runs}*</p>
              <p className="text-xs text-gray-600">({nonStriker?.balls})</p>
            </div>
            <div className="flex gap-2 mt-2 text-xs">
              <Badge variant="outline" className="text-xs">4s: {nonStriker?.fours}</Badge>
              <Badge variant="outline" className="text-xs">6s: {nonStriker?.sixes}</Badge>
            </div>
            <p className="text-xs text-gray-600 mt-1">SR: {nonStriker?.strikeRate}</p>
          </motion.div>
        </div>

        {/* Current Bowler */}
        <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Current Bowler</p>
              <p className="text-sm">{bowler.name}</p>
            </div>
            <div className="text-right text-sm">
              <p>3-0-28-1</p>
              <p className="text-xs text-gray-600">Econ: 9.33</p>
            </div>
          </div>
        </div>

        {/* This Over */}
        <div className="mb-5">
          <p className="text-xs text-gray-600 mb-2 flex items-center gap-2">
            <Zap size={14} className="text-orange-500" />
            This over:
          </p>
          <div className="flex gap-2 flex-wrap">
            <AnimatePresence>
              {match.ballsThisOver.map((ball: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm shadow-lg ${
                    ball === 'W'
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                      : ball === '6'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : ball === '4'
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                      : ball.includes('W') || ball.includes('N')
                      ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700'
                  }`}
                >
                  {ball}
                </motion.div>
              ))}
            </AnimatePresence>
            {[...Array(6 - match.ballsThisOver.length)].map((_, idx) => (
              <div key={`empty-${idx}`} className="w-11 h-11 rounded-full border-2 border-dashed border-gray-300"></div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Match Controls */}
        <MatchControlsPanel
          matchData={match}
          onUndo={undoLastBall}
          onPause={() => toast.info('Match paused')}
          onResume={() => toast.success('Match resumed')}
          onSwitchInnings={() => toast.success('Innings switched')}
          onEndMatch={() => {
            toast.success('Match ended');
            onOpenChange(false);
          }}
          onEditScore={() => toast.info('Edit score feature')}
        />

        <Separator className="my-4" />

        {/* Scoring Tabs */}
        <Tabs defaultValue="runs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="runs" className="rounded-lg">Runs</TabsTrigger>
            <TabsTrigger value="extras" className="rounded-lg">Extras</TabsTrigger>
            <TabsTrigger value="wicket" className="rounded-lg">Wicket</TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="space-y-4">
            {/* Run Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2, 3, 4, 6].map((run) => (
                <motion.div key={run} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
                  <Button
                    size="lg"
                    className={`w-full h-20 text-2xl shadow-lg ${
                      run === 6
                        ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700'
                        : run === 4
                        ? 'bg-gradient-to-br from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700'
                        : 'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700'
                    }`}
                    onClick={() => addRuns(run)}
                  >
                    {run}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" onClick={rotateStrike} className="h-11">
                <RotateCcw size={16} className="mr-2" />
                Rotate Strike
              </Button>
              <Button variant="outline" size="sm" onClick={undoLastBall} className="h-11">
                <RotateCcw size={16} className="mr-2" />
                Undo
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="extras" className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'wide', label: 'Wide', icon: '↔️' },
                { type: 'noball', label: 'No Ball', icon: '🚫' },
                { type: 'bye', label: 'Bye', icon: '👋' },
                { type: 'legbye', label: 'Leg Bye', icon: '🦵' },
              ].map((extra) => (
                <motion.div key={extra.type} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="h-16 w-full flex-col"
                    onClick={() => addExtra(extra.type, 1)}
                  >
                    <span className="text-xl mb-1">{extra.icon}</span>
                    <span className="text-sm">{extra.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">ℹ️ Quick Info:</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• Wide/No Ball: Extra run + rebowl</li>
                <li>• Bye/Leg Bye: Runs to team, ball counts</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="wicket" className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'Bowled', icon: '🎯' },
                { type: 'Caught', icon: '🤲' },
                { type: 'LBW', icon: '🦿' },
                { type: 'Run Out', icon: '🏃' },
                { type: 'Stumped', icon: '⚡' },
                { type: 'Hit Wicket', icon: '💥' },
              ].map((dismissal) => (
                <motion.div key={dismissal.type} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="h-16 w-full flex-col border-red-200 hover:bg-red-50"
                    onClick={() => addWicket(dismissal.type)}
                  >
                    <span className="text-xl mb-1">{dismissal.icon}</span>
                    <span className="text-sm">{dismissal.type}</span>
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm mb-1 flex items-center gap-2">
                <Award size={16} className="text-red-600" />
                Out: {striker?.name}
              </p>
              <p className="text-xs text-gray-600">Select dismissal type above</p>
            </div>
          </TabsContent>
        </Tabs>
      </BottomSheetContent>
    </BottomSheet>
  );
}
