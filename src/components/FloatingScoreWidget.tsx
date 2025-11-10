import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface FloatingScoreWidgetProps {
  match: any;
  onClose: () => void;
}

export default function FloatingScoreWidget({ match, onClose }: FloatingScoreWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!match) return null;

  const battingTeam = match.battingTeam === 'team1' ? match.team1 : match.team2;
  const currentOver = `${Math.floor(battingTeam.overs)}.${Math.floor((battingTeam.overs % 1) * 10)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: -500, bottom: 0 }}
        className="fixed bottom-20 right-4 z-40"
      >
        <div className={`bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl text-white overflow-hidden ${
          isExpanded ? 'w-72' : 'w-56'
        }`}>
          {/* Header */}
          <div className="p-3 bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 animate-pulse border-0 text-xs px-2">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 inline-block"></span>
                LIVE
              </Badge>
              <span className="text-xs">{match.format}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Score */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm opacity-90">{battingTeam.name}</span>
              <div className="text-right">
                <span className="text-3xl">
                  {battingTeam.score}<span className="text-xl opacity-70">/{battingTeam.wickets}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs opacity-80">
              <span>({currentOver} ov)</span>
              <span>RR: {battingTeam.overs > 0 ? (battingTeam.score / battingTeam.overs).toFixed(2) : '0.00'}</span>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pt-3 border-t border-white/20"
                >
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="opacity-80">Batsmen:</span>
                      <span>{match.currentBatsmen?.[0]?.split('(')[0] || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80"></span>
                      <span>{match.currentBatsmen?.[1]?.split('(')[0] || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">Bowler:</span>
                      <span>{match.currentBowlerName || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Recent Balls */}
                  {match.recentBalls && match.recentBalls.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <p className="text-xs opacity-80 mb-2">This over:</p>
                      <div className="flex gap-1">
                        {match.recentBalls.slice(-6).map((ball: string, idx: number) => (
                          <div
                            key={idx}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              ball === 'W'
                                ? 'bg-red-500'
                                : ball === '6'
                                ? 'bg-purple-500'
                                : ball === '4'
                                ? 'bg-green-500'
                                : 'bg-white/30'
                            }`}
                          >
                            {ball}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
