import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, TrendingDown, Minus, Zap, Target, Award, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';

interface MatchAnalyticsProps {
  matchData: any;
}

// Generate run rate data for worm chart
const generateRunRateData = (score: number, overs: number) => {
  const data = [];
  const totalBalls = Math.floor(overs) * 6 + Math.floor((overs % 1) * 10);
  
  for (let i = 0; i <= totalBalls; i++) {
    const over = Math.floor(i / 6);
    const runRate = Math.random() * 2 + (score / overs) - 1;
    const cumulativeRuns = Math.floor((i / totalBalls) * score);
    
    data.push({
      over: `${over}`,
      runs: cumulativeRuns,
      runRate: runRate.toFixed(2),
    });
  }
  
  return data;
};

// Generate Manhattan (over-by-over runs)
const generateManhattanData = (overs: number) => {
  const data = [];
  for (let i = 1; i <= Math.floor(overs); i++) {
    data.push({
      over: i,
      runs: Math.floor(Math.random() * 15) + 3,
    });
  }
  return data;
};

// Calculate win probability using simple algorithm
const calculateWinProbability = (match: any) => {
  if (match.currentInnings === 1) {
    // First innings - based on wickets and run rate
    const wicketsLeft = 10 - match.team1.wickets;
    const runRate = match.team1.score / match.team1.overs;
    const probability = Math.min(95, (wicketsLeft / 10) * 100 * (runRate / 8));
    return Math.round(probability);
  } else {
    // Second innings - based on target, wickets, and balls left
    const target = match.team1.score + 1;
    const runsNeeded = target - match.team2.score;
    const ballsLeft = (match.totalOvers - match.team2.overs) * 6;
    const wicketsLeft = 10 - match.team2.wickets;
    
    if (runsNeeded <= 0) return 95;
    if (wicketsLeft === 0) return 5;
    
    const requiredRate = (runsNeeded / ballsLeft) * 6;
    const currentRate = match.team2.score / match.team2.overs;
    
    const rateDiff = currentRate - requiredRate;
    const probability = 50 + (rateDiff * 10) + (wicketsLeft * 3);
    
    return Math.max(5, Math.min(95, Math.round(probability)));
  }
};

// Calculate momentum
const calculateMomentum = (match: any) => {
  const recentBalls = match.ballsThisOver || [];
  const lastSixBalls = recentBalls.slice(-6);
  
  let momentum = 0;
  lastSixBalls.forEach((ball: string) => {
    if (ball === '6') momentum += 3;
    else if (ball === '4') momentum += 2;
    else if (ball === 'W') momentum -= 2;
    else if (ball.includes('W') || ball.includes('N')) momentum += 1;
  });
  
  if (momentum > 3) return { status: 'high', team: 'batting', color: 'text-green-600', icon: TrendingUp };
  if (momentum < -3) return { status: 'high', team: 'bowling', color: 'text-red-600', icon: TrendingDown };
  return { status: 'neutral', team: 'neutral', color: 'text-gray-600', icon: Minus };
};

export default function MatchAnalytics({ matchData }: MatchAnalyticsProps) {
  if (!matchData) return null;

  const battingTeam = matchData.battingTeam === 'team1' ? matchData.team1 : matchData.team2;
  const bowlingTeam = matchData.battingTeam === 'team1' ? matchData.team2 : matchData.team1;
  
  const runRateData = generateRunRateData(battingTeam.score, battingTeam.overs);
  const manhattanData = generateManhattanData(battingTeam.overs);
  const winProb = calculateWinProbability(matchData);
  const momentum = calculateMomentum(matchData);
  
  const currentRunRate = battingTeam.overs > 0 ? (battingTeam.score / battingTeam.overs).toFixed(2) : '0.00';
  const projectedScore = Math.round(parseFloat(currentRunRate) * matchData.totalOvers);

  return (
    <div className="space-y-4">
      {/* Win Probability Meter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-2xl border-2 border-purple-200 shadow-lg"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm flex items-center gap-2">
            <Activity size={18} className="text-purple-600" />
            Win Probability
          </h3>
          <Badge className="bg-purple-600">{winProb}%</Badge>
        </div>
        
        <div className="relative">
          <Progress value={winProb} className="h-4 bg-gray-200" />
          <div className="flex justify-between mt-2 text-xs">
            <span className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${battingTeam.color}`}></div>
              {battingTeam.name}
            </span>
            <span className="flex items-center gap-1">
              {bowlingTeam.name}
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${bowlingTeam.color}`}></div>
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-white rounded-xl">
            <p className="text-xs text-gray-600 mb-1">Current Run Rate</p>
            <p className="text-xl flex items-center gap-1">
              <TrendingUp size={16} className="text-green-600" />
              {currentRunRate}
            </p>
          </div>
          <div className="p-3 bg-white rounded-xl">
            <p className="text-xs text-gray-600 mb-1">Projected Score</p>
            <p className="text-xl flex items-center gap-1">
              <Target size={16} className="text-blue-600" />
              {projectedScore}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Momentum Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-4 rounded-2xl border-2 ${
          momentum.status === 'high' && momentum.team === 'batting'
            ? 'bg-green-50 border-green-300'
            : momentum.status === 'high' && momentum.team === 'bowling'
            ? 'bg-red-50 border-red-300'
            : 'bg-gray-50 border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-600">Match Momentum</p>
              <p className={`text-sm ${momentum.color} flex items-center gap-1`}>
                <momentum.icon size={16} />
                {momentum.status === 'high'
                  ? `With ${momentum.team === 'batting' ? battingTeam.name : bowlingTeam.name}`
                  : 'Balanced'}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="capitalize">{momentum.status}</Badge>
        </div>
      </motion.div>

      {/* Charts */}
      <Tabs defaultValue="worm" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="worm">Run Rate</TabsTrigger>
          <TabsTrigger value="manhattan">Manhattan</TabsTrigger>
        </TabsList>

        <TabsContent value="worm">
          <Card className="p-4">
            <h4 className="text-sm mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-600" />
              Worm Chart - Cumulative Runs
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={runRateData}>
                <defs>
                  <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="over" 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Overs', position: 'insideBottom', offset: -5, fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Runs', angle: -90, position: 'insideLeft', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="runs" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRuns)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="manhattan">
          <Card className="p-4">
            <h4 className="text-sm mb-4 flex items-center gap-2">
              <Target size={16} className="text-blue-600" />
              Manhattan - Runs per Over
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={manhattanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="over" 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Over', position: 'insideBottom', offset: -5, fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: 'Runs', angle: -90, position: 'insideLeft', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="runs" 
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Player Performance Highlights */}
      <Card className="p-4">
        <h4 className="text-sm mb-3 flex items-center gap-2">
          <Award size={16} className="text-yellow-600" />
          Performance Highlights
        </h4>
        
        <div className="space-y-2">
          {battingTeam.players?.slice(0, 3).map((player: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs">
                  {player.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <p className="text-sm">{player.name || 'Player'}</p>
                  <p className="text-xs text-gray-600">
                    {player.runs || 0}({player.balls || 0}) • SR: {player.strikeRate || 0}
                  </p>
                </div>
              </div>
              
              {/* Form Indicator */}
              {player.strikeRate > 150 && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-xs">
                  🔥 On Fire
                </Badge>
              )}
              {player.strikeRate > 100 && player.strikeRate <= 150 && (
                <Badge variant="outline" className="text-xs">
                  ✨ In Form
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
