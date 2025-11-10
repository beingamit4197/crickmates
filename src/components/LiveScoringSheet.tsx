import { useState } from 'react';
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
import { Radio, RotateCcw, Check, X, Target, TrendingUp, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface LiveScoringSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match?: any;
}

export default function LiveScoringSheet({ open, onOpenChange, match }: LiveScoringSheetProps) {
  const [runs, setRuns] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState(match?.team1?.score || 145);
  const [currentWickets, setCurrentWickets] = useState(match?.team1?.wickets || 4);
  const [currentBalls, setCurrentBalls] = useState(92); // 15.3 overs = 92 balls
  const [ballsThisOver, setBallsThisOver] = useState<string[]>([]);
  const [striker, setStriker] = useState('John Smith');
  const [nonStriker, setNonStriker] = useState('Mike Johnson');
  const [currentBowler, setCurrentBowler] = useState('David Brown');
  const [showExtras, setShowExtras] = useState(false);
  const [showWicket, setShowWicket] = useState(false);

  if (!match) return null;

  const overs = Math.floor(currentBalls / 6);
  const ballsInOver = currentBalls % 6;
  const currentOver = `${overs}.${ballsInOver}`;
  const runRate = (currentScore / (currentBalls / 6)).toFixed(2);

  const addRuns = (run: number) => {
    setCurrentScore(prev => prev + run);
    setCurrentBalls(prev => prev + 1);
    setBallsThisOver(prev => [...prev, run.toString()]);
    
    // Rotate strike on odd runs
    if (run % 2 !== 0) {
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }

    // Check if over is complete
    if ((currentBalls + 1) % 6 === 0) {
      toast.success('Over Complete!', {
        description: `${currentBowler} - ${ballsThisOver.join(' ')}`
      });
      setBallsThisOver([]);
      // Rotate strike at end of over
      const temp = striker;
      setStriker(nonStriker);
      setNonStriker(temp);
    }
  };

  const addWicket = () => {
    setCurrentWickets(prev => prev + 1);
    setCurrentBalls(prev => prev + 1);
    setBallsThisOver(prev => [...prev, 'W']);
    setShowWicket(false);
    toast.error('Wicket!', {
      description: `${striker} is out`
    });

    // Check if innings is over
    if (currentWickets + 1 >= 10) {
      toast.info('Innings Complete', {
        description: 'All out!'
      });
    }
  };

  const addExtra = (type: string, runs: number) => {
    setCurrentScore(prev => prev + runs);
    
    // Wide and No ball add an extra ball to bowl
    if (type !== 'bye' && type !== 'legbye') {
      // Don't increment ball count for wide/noball
    } else {
      setCurrentBalls(prev => prev + 1);
    }
    
    setBallsThisOver(prev => [...prev, `${runs}${type.charAt(0).toUpperCase()}`]);
    setShowExtras(false);
    toast.info(`${type} - ${runs} run(s)`);
  };

  const rotateStrike = () => {
    const temp = striker;
    setStriker(nonStriker);
    setNonStriker(temp);
    toast.success('Strike rotated');
  };

  const undoLastBall = () => {
    if (ballsThisOver.length > 0) {
      const lastBall = ballsThisOver[ballsThisOver.length - 1];
      // Implement undo logic
      setBallsThisOver(prev => prev.slice(0, -1));
      toast.info('Last ball undone');
    }
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
              <Radio size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <BottomSheetTitle>Live Scoring</BottomSheetTitle>
              <BottomSheetDescription>
                {match.team1.name} vs {match.team2.name}
              </BottomSheetDescription>
            </div>
          </div>
          <Badge className="bg-red-500 animate-pulse border-0">
            <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block"></span>
            LIVE
          </Badge>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent className="pb-4">
        {/* Current Score Display */}
        <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{match.team1.name}</p>
                <p className="text-5xl">
                  {currentScore}<span className="text-3xl text-gray-600">/{currentWickets}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">({currentOver} overs)</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <TrendingUp size={14} />
                RR: {runRate}
              </span>
              {match.target && (
                <span>Need {match.target - currentScore} runs from {(120 - currentBalls)} balls</span>
              )}
            </div>
          </div>

          {/* Current Batsmen */}
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-lg ${striker === 'John Smith' ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}>
              <div className="flex items-center gap-2">
                {striker === 'John Smith' && <Target size={12} className="text-green-600" />}
                <p className="text-xs">{striker}</p>
              </div>
              <p className="text-sm">45* (32)</p>
            </div>
            <div className={`p-3 rounded-lg ${nonStriker === 'Mike Johnson' ? 'bg-green-100 border-2 border-green-500' : 'bg-white'}`}>
              <div className="flex items-center gap-2">
                {nonStriker === 'Mike Johnson' && <Target size={12} className="text-green-600" />}
                <p className="text-xs">{nonStriker}</p>
              </div>
              <p className="text-sm">23* (18)</p>
            </div>
          </div>

          {/* Current Bowler */}
          <div className="mt-2 p-3 bg-white rounded-lg">
            <p className="text-xs text-gray-600">Bowler</p>
            <p className="text-sm">{currentBowler} - 3-0-28-1</p>
          </div>
        </div>

        {/* This Over */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">This over:</p>
          <div className="flex gap-2 flex-wrap">
            {ballsThisOver.map((ball, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs shadow-md ${
                  ball === 'W'
                    ? 'bg-red-500 text-white'
                    : ball === '6'
                    ? 'bg-purple-500 text-white'
                    : ball === '4'
                    ? 'bg-green-500 text-white'
                    : ball.includes('W') || ball.includes('N')
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {ball}
              </motion.div>
            ))}
            {[...Array(6 - ballsThisOver.length)].map((_, idx) => (
              <div key={`empty-${idx}`} className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300"></div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Scoring Tabs */}
        <Tabs defaultValue="runs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="runs">Runs</TabsTrigger>
            <TabsTrigger value="extras">Extras</TabsTrigger>
            <TabsTrigger value="wicket">Wicket</TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="space-y-4">
            {/* Run Buttons */}
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3, 4, 6].map((run) => (
                <motion.div key={run} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="lg"
                    className={`w-full h-16 text-xl ${
                      run === 6
                        ? 'bg-gradient-to-br from-purple-600 to-purple-700'
                        : run === 4
                        ? 'bg-gradient-to-br from-green-600 to-green-700'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700'
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
              <Button variant="outline" size="sm" onClick={rotateStrike}>
                <RotateCcw size={16} className="mr-2" />
                Rotate Strike
              </Button>
              <Button variant="outline" size="sm" onClick={undoLastBall}>
                <RotateCcw size={16} className="mr-2" />
                Undo
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="extras" className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-16"
                onClick={() => addExtra('wide', 1)}
              >
                Wide
              </Button>
              <Button
                variant="outline"
                className="h-16"
                onClick={() => addExtra('noball', 1)}
              >
                No Ball
              </Button>
              <Button
                variant="outline"
                className="h-16"
                onClick={() => addExtra('bye', 1)}
              >
                Bye
              </Button>
              <Button
                variant="outline"
                className="h-16"
                onClick={() => addExtra('legbye', 1)}
              >
                Leg Bye
              </Button>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Quick Info:</p>
              <ul className="text-xs space-y-1 text-gray-700">
                <li>• Wide/No Ball: Extra run + rebowl</li>
                <li>• Bye/Leg Bye: Runs to team, ball counts</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="wicket" className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {['Bowled', 'Caught', 'LBW', 'Run Out', 'Stumped', 'Hit Wicket'].map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  className="h-14 text-sm"
                  onClick={addWicket}
                >
                  {type}
                </Button>
              ))}
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm mb-2">Out: {striker}</p>
              <p className="text-xs text-gray-600">Select dismissal type above</p>
            </div>
          </TabsContent>
        </Tabs>
      </BottomSheetContent>
    </BottomSheet>
  );
}
