import { useState } from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from './ui/bottom-sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ChevronRight, ChevronLeft, Play, Coins, Users as UsersIcon, MapPin, Plus, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

interface CreateNewMatchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMatchCreated: (matchData: any) => void;
}

const availableTeams = [
  { id: 1, name: 'Prime XI', logo: 'PI', color: 'from-green-500 to-green-600' },
  { id: 2, name: 'Weekend Warriors', logo: 'WW', color: 'from-blue-500 to-blue-600' },
  { id: 3, name: 'Sunday Strikers', logo: 'SS', color: 'from-purple-500 to-purple-600' },
  { id: 4, name: 'Thunderbolts', logo: 'TB', color: 'from-orange-500 to-orange-600' },
  { id: 5, name: 'Storm Chasers', logo: 'SC', color: 'from-red-500 to-red-600' },
];

const players = [
  { id: 1, name: 'John Smith', role: 'Batsman' },
  { id: 2, name: 'Mike Johnson', role: 'All-Rounder' },
  { id: 3, name: 'David Brown', role: 'Bowler' },
  { id: 4, name: 'Chris Wilson', role: 'Wicket Keeper' },
  { id: 5, name: 'Tom Anderson', role: 'Batsman' },
  { id: 6, name: 'James Taylor', role: 'Bowler' },
  { id: 7, name: 'Robert Lee', role: 'All-Rounder' },
  { id: 8, name: 'Daniel Martin', role: 'Batsman' },
  { id: 9, name: 'Paul White', role: 'Bowler' },
  { id: 10, name: 'Mark Davis', role: 'Batsman' },
  { id: 11, name: 'Steve Thompson', role: 'All-Rounder' },
];

export default function CreateNewMatchSheet({ open, onOpenChange, onMatchCreated }: CreateNewMatchSheetProps) {
  const [step, setStep] = useState(1);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [venue, setVenue] = useState('');
  const [matchFormat, setMatchFormat] = useState('t20');
  const [customOvers, setCustomOvers] = useState('20');
  const [tossWinner, setTossWinner] = useState('');
  const [tossDecision, setTossDecision] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [matchTime, setMatchTime] = useState('10:00');

  const resetAndClose = () => {
    setStep(1);
    onOpenChange(false);
  };

  const getOversCount = () => {
    switch (matchFormat) {
      case 't20': return 20;
      case 'odi': return 50;
      case 't10': return 10;
      case 't5': return 5;
      case 'custom': return parseInt(customOvers) || 20;
      default: return 20;
    }
  };

  const createMatch = () => {
    const teamAData = availableTeams.find(t => t.id.toString() === teamA);
    const teamBData = availableTeams.find(t => t.id.toString() === teamB);
    
    const battingFirst = tossDecision === 'bat' && tossWinner === 'teamA';
    const selectedPlayersList = selectedPlayers.slice(0, 11).map(id => {
      const player = players.find(p => p.id === id);
      return {
        ...player,
        runs: 0,
        balls: 0,
        fours: 0,
        sixes: 0,
        strikeRate: 0,
        isOut: false,
        dismissal: '',
      };
    });

    const matchData = {
      id: Date.now(),
      team1: {
        ...teamAData,
        score: 0,
        wickets: 0,
        overs: 0,
        players: battingFirst ? selectedPlayersList : [],
        bowlingStats: [],
      },
      team2: {
        ...teamBData,
        score: 0,
        wickets: 0,
        overs: 0,
        players: !battingFirst ? selectedPlayersList : [],
        bowlingStats: [],
      },
      format: matchFormat.toUpperCase(),
      totalOvers: getOversCount(),
      venue,
      date: matchDate,
      time: matchTime,
      toss: {
        winner: tossWinner === 'teamA' ? teamAData?.name : teamBData?.name,
        decision: tossDecision,
      },
      currentInnings: 1,
      battingTeam: battingFirst ? 'team1' : 'team2',
      bowlingTeam: battingFirst ? 'team2' : 'team1',
      striker: 0,
      nonStriker: 1,
      currentBowler: 0,
      ballsThisOver: [],
      currentBatsmen: [selectedPlayersList[0]?.name || 'Player 1', selectedPlayersList[1]?.name || 'Player 2'],
      recentBalls: [],
      commentary: [
        {
          over: '0.0',
          text: `🏏 Match started! ${tossWinner === 'teamA' ? teamAData?.name : teamBData?.name} won the toss and chose to ${tossDecision}`,
          highlight: true,
          timestamp: new Date().toISOString(),
        }
      ],
      status: 'live',
    };

    onMatchCreated(matchData);
    toast.success('Match Created!', {
      description: 'Live scoring has started'
    });
    resetAndClose();
  };

  const togglePlayer = (id: number) => {
    setSelectedPlayers(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const teamAData = availableTeams.find(t => t.id.toString() === teamA);
  const teamBData = availableTeams.find(t => t.id.toString() === teamB);

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <BottomSheetTitle className="text-xl">Create New Match</BottomSheetTitle>
            <BottomSheetDescription>
              Step {step} of 5 - {['Teams', 'Details', 'Format', 'Toss', 'Squad'][step - 1]}
            </BottomSheetDescription>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <motion.div
              key={s}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: s <= step ? 1 : 0 }}
              className={`h-1.5 flex-1 rounded-full origin-left ${
                s <= step ? 'bg-gradient-to-r from-green-600 via-blue-600 to-purple-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <Label className="text-sm mb-3 block flex items-center gap-2">
                  <UsersIcon size={16} className="text-green-600" />
                  Select Teams
                </Label>
                
                <div>
                  <p className="text-xs text-gray-600 mb-2">Team A (Home Team)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTeams.slice(0, 3).map((team) => (
                      <motion.div
                        key={team.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTeamA(team.id.toString())}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          teamA === team.id.toString()
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${team.color} rounded-xl flex items-center justify-center text-white mb-2 shadow-md`}>
                          {team.logo}
                        </div>
                        <p className="text-sm">{team.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-600 mb-2">Team B (Opposition)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTeams.slice(3).map((team) => (
                      <motion.div
                        key={team.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTeamB(team.id.toString())}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          teamB === team.id.toString()
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${team.color} rounded-xl flex items-center justify-center text-white mb-2 shadow-md`}>
                          {team.logo}
                        </div>
                        <p className="text-sm">{team.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4" size="lg">
                  <Plus size={16} className="mr-2" />
                  Create New Team
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <Label htmlFor="venue" className="text-sm mb-2 block flex items-center gap-2">
                  <MapPin size={14} className="text-green-600" />
                  Match Venue
                </Label>
                <Input
                  id="venue"
                  placeholder="e.g., Lord's Cricket Ground"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="h-12 bg-gray-50 border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date" className="text-sm mb-2 block flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    className="h-12 bg-gray-50 border-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-sm mb-2 block flex items-center gap-2">
                    <Clock size={14} className="text-purple-600" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={matchTime}
                    onChange={(e) => setMatchTime(e.target.value)}
                    className="h-12 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-sm mb-2">Match Preview</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${teamAData?.color} rounded-lg flex items-center justify-center text-white text-xs`}>
                      {teamAData?.logo}
                    </div>
                    <span>{teamAData?.name}</span>
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div className="flex items-center gap-2">
                    <span>{teamBData?.name}</span>
                    <div className={`w-8 h-8 bg-gradient-to-br ${teamBData?.color} rounded-lg flex items-center justify-center text-white text-xs`}>
                      {teamBData?.logo}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <Label className="text-sm mb-3 block">Match Format</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 't20', label: 'T20', overs: '20 overs', icon: '🏏' },
                    { value: 'odi', label: 'ODI', overs: '50 overs', icon: '🏆' },
                    { value: 't10', label: 'T10', overs: '10 overs', icon: '⚡' },
                    { value: 't5', label: 'T5', overs: '5 overs', icon: '💨' },
                  ].map((format) => (
                    <motion.div
                      key={format.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMatchFormat(format.value)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        matchFormat === format.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{format.icon}</span>
                      <p className="text-sm mb-1">{format.label}</p>
                      <p className="text-xs text-gray-600">{format.overs}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div
                onClick={() => setMatchFormat('custom')}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  matchFormat === 'custom'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm mb-1">Custom Overs</p>
                    <p className="text-xs text-gray-600">Set your own format</p>
                  </div>
                  <span className="text-2xl">⚙️</span>
                </div>
                {matchFormat === 'custom' && (
                  <Input
                    type="number"
                    placeholder="Enter overs"
                    value={customOvers}
                    onChange={(e) => setCustomOvers(e.target.value)}
                    className="h-10 mt-2"
                    min="1"
                    max="100"
                  />
                )}
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm mb-2">Format Rules</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• Each innings: {getOversCount()} overs</p>
                  <p>• Max overs per bowler: {Math.ceil(getOversCount() / 5)}</p>
                  <p>• Powerplay: First {Math.ceil(getOversCount() / 4)} overs</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="p-6 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 rounded-2xl border-2 border-orange-200 shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                    <Coins size={28} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm">Toss Information</p>
                    <p className="text-xs text-gray-600">Who won the toss?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm mb-3 block">Toss Winner</Label>
                    <RadioGroup value={tossWinner} onValueChange={setTossWinner}>
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <div className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                          tossWinner === 'teamA' ? 'bg-green-100 border-2 border-green-500' : 'bg-white border-2 border-gray-200'
                        }`}>
                          <RadioGroupItem value="teamA" id="teamA" />
                          <Label htmlFor="teamA" className="flex-1 cursor-pointer flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${teamAData?.color} rounded-lg flex items-center justify-center text-white text-xs`}>
                              {teamAData?.logo}
                            </div>
                            {teamAData?.name}
                          </Label>
                        </div>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <div className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                          tossWinner === 'teamB' ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white border-2 border-gray-200'
                        }`}>
                          <RadioGroupItem value="teamB" id="teamB" />
                          <Label htmlFor="teamB" className="flex-1 cursor-pointer flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${teamBData?.color} rounded-lg flex items-center justify-center text-white text-xs`}>
                              {teamBData?.logo}
                            </div>
                            {teamBData?.name}
                          </Label>
                        </div>
                      </motion.div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm mb-3 block">Decision</Label>
                    <RadioGroup value={tossDecision} onValueChange={setTossDecision}>
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <div className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                          tossDecision === 'bat' ? 'bg-purple-100 border-2 border-purple-500' : 'bg-white border-2 border-gray-200'
                        }`}>
                          <RadioGroupItem value="bat" id="bat" />
                          <Label htmlFor="bat" className="flex-1 cursor-pointer">
                            🏏 Chose to Bat First
                          </Label>
                        </div>
                      </motion.div>
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <div className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
                          tossDecision === 'bowl' ? 'bg-orange-100 border-2 border-orange-500' : 'bg-white border-2 border-gray-200'
                        }`}>
                          <RadioGroupItem value="bowl" id="bowl" />
                          <Label htmlFor="bowl" className="flex-1 cursor-pointer">
                            ⚾ Chose to Bowl First
                          </Label>
                        </div>
                      </motion.div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm flex items-center gap-2">
                    <UsersIcon size={16} className="text-green-600" />
                    Select Playing XI for {teamAData?.name}
                  </Label>
                  <Badge variant="outline">{selectedPlayers.length}/11</Badge>
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {players.map((player) => (
                    <motion.label
                      key={player.id}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedPlayers.includes(player.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <Checkbox
                        checked={selectedPlayers.includes(player.id)}
                        onCheckedChange={() => togglePlayer(player.id)}
                        className="w-5 h-5"
                      />
                      <div className="flex-1">
                        <p className="text-sm">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.role}</p>
                      </div>
                      {selectedPlayers.indexOf(player.id) >= 0 && (
                        <Badge variant="outline" className="text-xs">
                          #{selectedPlayers.indexOf(player.id) + 1}
                        </Badge>
                      )}
                    </motion.label>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl border-2 border-green-200 shadow-lg">
                <p className="text-sm mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-green-600" />
                  Match Summary
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">{matchFormat.toUpperCase()} ({getOversCount()} overs)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span className="text-gray-600">Toss:</span>
                    <span className="font-medium">
                      {tossWinner === 'teamA' ? teamAData?.name : teamBData?.name} - {tossDecision}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span className="text-gray-600">Venue:</span>
                    <span className="font-medium">{venue || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded-lg">
                    <span className="text-gray-600">Squad:</span>
                    <span className="font-medium">{selectedPlayers.length}/11 players</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BottomSheetContent>

      <BottomSheetFooter>
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </Button>
          )}
          <Button
            className={`${step === 1 ? 'w-full' : 'flex-1'} h-12 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 shadow-lg`}
            onClick={() => {
              if (step < 5) {
                if (step === 1 && (!teamA || !teamB)) {
                  toast.error('Please select both teams');
                  return;
                }
                if (step === 4 && (!tossWinner || !tossDecision)) {
                  toast.error('Please complete toss information');
                  return;
                }
                setStep(step + 1);
              } else {
                if (selectedPlayers.length < 11) {
                  toast.error('Please select 11 players');
                  return;
                }
                createMatch();
              }
            }}
            disabled={step === 1 && (!teamA || !teamB)}
          >
            {step === 5 ? (
              <>
                <Play size={16} className="mr-2" />
                Start Match
              </>
            ) : (
              <>
                Next
                <ChevronRight size={16} className="ml-1" />
              </>
            )}
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
