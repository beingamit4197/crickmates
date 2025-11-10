import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
} from './ui/bottom-sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Radio, TrendingUp, Users, Target, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';

interface ViewerModeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match?: any;
}

export default function ViewerModeSheet({ open, onOpenChange, match }: ViewerModeSheetProps) {
  if (!match) return null;

  const runRate = (match.team1.score / match.team1.overs).toFixed(2);

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
              <Radio size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <BottomSheetTitle>{match.team1.name} vs {match.team2.name}</BottomSheetTitle>
              <BottomSheetDescription>{match.format} • {match.venue}</BottomSheetDescription>
            </div>
          </div>
          <Badge className="bg-red-500 animate-pulse border-0">
            <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block"></span>
            LIVE
          </Badge>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent className="pb-4">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="live">Live</TabsTrigger>
            <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
            <TabsTrigger value="commentary">Commentary</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {/* Current Score */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    {match.team1.logo}
                  </div>
                  <div>
                    <p className="text-sm">{match.team1.name}</p>
                    <p className="text-xs text-gray-600">Batting</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl">
                    {match.team1.score}<span className="text-2xl text-gray-600">/{match.team1.wickets}</span>
                  </p>
                  <p className="text-xs text-gray-600">({match.team1.overs} ov)</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-gray-600">
                  <TrendingUp size={14} />
                  Run Rate: {runRate}
                </span>
                {match.target && (
                  <span className="text-gray-600">Target: {match.target}</span>
                )}
              </div>
            </div>

            {/* Current Partnership */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-xs text-gray-600 mb-2">Current Partnership</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">68 runs</p>
                  <p className="text-xs text-gray-600">52 balls</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{match.currentBatsmen[0]}</p>
                  <p className="text-sm">{match.currentBatsmen[1]}</p>
                </div>
              </div>
            </div>

            {/* Recent Overs */}
            <div>
              <p className="text-sm mb-3 flex items-center gap-2">
                <Target size={16} className="text-green-600" />
                Recent Overs
              </p>
              <div className="space-y-2">
                {[
                  { over: '15.3', balls: ['4', '1', 'W', '0', '6', '2'], runs: 13 },
                  { over: '15', balls: ['1', '2', '0', '1', '4', '0'], runs: 8 },
                  { over: '14', balls: ['6', '0', '1', '1', '2', '4'], runs: 14 },
                ].map((over, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm w-12">{over.over}</span>
                    <div className="flex gap-1 flex-1">
                      {over.balls.map((ball, ballIdx) => (
                        <div
                          key={ballIdx}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
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
                    <Badge variant="outline" className="text-xs">{over.runs}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scorecard" className="space-y-4">
            {/* Batting Scorecard */}
            <div>
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <Users size={16} className="text-green-600" />
                {match.team1.name} Innings
              </h4>
              <div className="space-y-2">
                {[
                  { name: 'John Smith', runs: 45, balls: 32, fours: 4, sixes: 2, sr: 140.6, out: false },
                  { name: 'Mike Johnson', runs: 23, balls: 18, fours: 2, sixes: 1, sr: 127.8, out: false },
                  { name: 'Tom Wilson', runs: 34, balls: 28, fours: 3, sixes: 1, sr: 121.4, out: true, dismissal: 'c Brown b Miller' },
                  { name: 'Chris Lee', runs: 18, balls: 15, fours: 2, sixes: 0, sr: 120.0, out: true, dismissal: 'b Taylor' },
                ].map((player, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-sm">{player.name}</p>
                        {player.out && <p className="text-xs text-gray-500">{player.dismissal}</p>}
                      </div>
                      <p className="text-sm">{player.runs}({player.balls})</p>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-600">
                      <span>4s: {player.fours}</span>
                      <span>6s: {player.sixes}</span>
                      <span>SR: {player.sr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Bowling Scorecard */}
            <div>
              <h4 className="text-sm mb-3">Bowling</h4>
              <div className="space-y-2">
                {[
                  { name: 'David Brown', overs: 3, maidens: 0, runs: 28, wickets: 1, economy: 9.33 },
                  { name: 'James Miller', overs: 4, maidens: 1, runs: 24, wickets: 2, economy: 6.0 },
                  { name: 'Tom Taylor', overs: 3.3, maidens: 0, runs: 32, wickets: 1, economy: 9.14 },
                ].map((bowler, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm">{bowler.name}</p>
                      <p className="text-sm">{bowler.overs}-{bowler.maidens}-{bowler.runs}-{bowler.wickets}</p>
                    </div>
                    <p className="text-xs text-gray-600">Economy: {bowler.economy}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commentary" className="space-y-3">
            {[
              { over: '15.3', text: 'FOUR! John Smith drives through covers for a boundary!', highlight: true },
              { over: '15.2', text: 'Short ball, pulled for TWO runs', highlight: false },
              { over: '15.1', text: 'WICKET! Tom Wilson caught at mid-wicket', highlight: true },
              { over: '15.0', text: 'Dot ball, defended back to the bowler', highlight: false },
              { over: '14.5', text: 'SIX! Massive hit over long-on!', highlight: true },
              { over: '14.4', text: 'No run, good length delivery', highlight: false },
            ].map((comment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-3 rounded-lg ${
                  comment.highlight ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex gap-3">
                  <span className="text-xs text-gray-600 w-12">{comment.over}</span>
                  <p className="text-sm flex-1">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Share Button */}
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full">
            <Share2 size={16} className="mr-2" />
            Share Match Score
          </Button>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}
