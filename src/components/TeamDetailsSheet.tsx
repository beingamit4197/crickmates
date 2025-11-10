import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetFooter,
} from './ui/bottom-sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Users, Trophy, TrendingUp, Activity, Edit, UserPlus, MoreVertical, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Progress } from './ui/progress';

interface TeamDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team?: any;
}

export default function TeamDetailsSheet({ open, onOpenChange, team }: TeamDetailsSheetProps) {
  if (!team) return null;

  const winRate = Math.round((team.wins / team.matches) * 100);

  const squad = [
    { name: 'John Smith', role: 'Captain, Batsman' },
    { name: 'Mike Johnson', role: 'All-Rounder' },
    { name: 'David Brown', role: 'Bowler' },
    { name: 'Chris Wilson', role: 'Wicket Keeper' },
    { name: 'Tom Anderson', role: 'Batsman' },
  ];

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 bg-gradient-to-br ${team.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <span className="text-white text-xl">{team.name.substring(0, 2)}</span>
            </div>
            <div>
              <BottomSheetTitle>{team.name}</BottomSheetTitle>
              <BottomSheetDescription>Team Details</BottomSheetDescription>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-600 to-blue-600 border-0">
            Active
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="p-3 bg-blue-50 rounded-lg text-center">
            <p className="text-xl">{team.players}</p>
            <p className="text-xs text-gray-600">Players</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <p className="text-xl">{team.wins}</p>
            <p className="text-xs text-gray-600">Wins</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <p className="text-xl">{winRate}%</p>
            <p className="text-xs text-gray-600">Win Rate</p>
          </div>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Team Performance */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-green-600" />
              Team Performance
            </h4>
            <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Win Rate</span>
                    <span className="text-sm">{winRate}%</span>
                  </div>
                  <Progress value={winRate} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="text-center">
                    <p className="text-lg">{team.matches}</p>
                    <p className="text-xs text-gray-600">Played</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-green-600">{team.wins}</p>
                    <p className="text-xs text-gray-600">Won</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg text-red-600">{team.matches - team.wins}</p>
                    <p className="text-xs text-gray-600">Lost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recent Form */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <Activity size={16} className="text-green-600" />
              Recent Form
            </h4>
            <div className="flex gap-2">
              {['W', 'W', 'L', 'W', 'W', 'W', 'L', 'W'].map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${
                    result === 'W' 
                      ? 'bg-gradient-to-br from-green-500 to-green-600' 
                      : 'bg-gradient-to-br from-red-500 to-red-600'
                  }`}
                >
                  {result}
                </motion.div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Squad List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm flex items-center gap-2">
                <Users size={16} className="text-green-600" />
                Squad Players ({team.players})
              </h4>
              <Button size="sm" variant="outline">
                <UserPlus size={14} className="mr-1" />
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {squad.map((player, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${team.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                      <span className="text-xs">{player.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.role}</p>
                    </div>
                  </div>
                  {idx === 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Shield size={10} className="mr-1" />
                      Captain
                    </Badge>
                  )}
                </motion.div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Players ({team.players})
              </Button>
            </div>
          </div>

          <Separator />

          {/* Team Info */}
          <div>
            <h4 className="text-sm mb-3">Team Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Created</span>
                <span>January 2024</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Captain</span>
                <span>John Smith</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span className="text-gray-600">Home Ground</span>
                <span>Lord's Cricket Ground</span>
              </div>
            </div>
          </div>
        </motion.div>
      </BottomSheetContent>

      <BottomSheetFooter>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Edit size={16} className="mr-2" />
            Edit Team
          </Button>
          <Button className="h-12 bg-gradient-to-r from-green-600 to-blue-600">
            <Users size={16} className="mr-2" />
            Manage Squad
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
