import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
} from './ui/bottom-sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Trophy, TrendingUp, Target, Activity, Award, Users, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

interface StatsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StatsSheet({ open, onOpenChange }: StatsSheetProps) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <BottomSheetTitle>Statistics & Analytics</BottomSheetTitle>
            <BottomSheetDescription>Your cricket performance overview</BottomSheetDescription>
          </div>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="batting">Batting</TabsTrigger>
            <TabsTrigger value="bowling">Bowling</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-5">
            {/* Overall Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Matches', value: '44', icon: Calendar, color: 'blue' },
                { label: 'Total Wins', value: '31', icon: Trophy, color: 'green' },
                { label: 'Win Rate', value: '70%', icon: TrendingUp, color: 'purple' },
                { label: 'MVP Awards', value: '8', icon: Award, color: 'orange' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 bg-${stat.color}-50 rounded-xl border border-${stat.color}-100`}
                >
                  <div className={`flex items-center gap-2 mb-2 text-${stat.color}-600`}>
                    <stat.icon size={18} />
                  </div>
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <Separator />

            {/* Performance Trends */}
            <div>
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                Performance Trends
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Last 5 Matches</span>
                    <Badge className="bg-green-600">80% Win Rate</Badge>
                  </div>
                  <div className="flex gap-1">
                    {['W', 'W', 'L', 'W', 'W'].map((result, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-8 rounded flex items-center justify-center text-white text-xs ${
                          result === 'W' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Season Progress</span>
                    <span className="text-xs text-gray-600">15/20 matches</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Top Performers */}
            <div>
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <Users size={16} className="text-green-600" />
                Top Performers
              </h4>
              <div className="space-y-2">
                {[
                  { name: 'John Smith', stat: '542 runs', role: 'Top Scorer' },
                  { name: 'Mike Johnson', stat: '28 wickets', role: 'Top Bowler' },
                  { name: 'Tom Anderson', stat: '156.8 SR', role: 'Best Strike Rate' },
                ].map((player, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${
                        ['from-blue-500 to-blue-600', 'from-red-500 to-red-600', 'from-purple-500 to-purple-600'][idx]
                      } rounded-xl flex items-center justify-center text-white`}>
                        <span className="text-xs">{player.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{player.stat}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="batting" className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Runs', value: '2,450', color: 'blue' },
                { label: 'Average', value: '42.8', color: 'green' },
                { label: 'Strike Rate', value: '142.5', color: 'purple' },
                { label: 'Centuries', value: '3', color: 'orange' },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`p-4 bg-${stat.color}-50 rounded-xl border border-${stat.color}-100`}
                >
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm mb-3">Batting Breakdown</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Boundaries (4s)</span>
                    <span>240</span>
                  </div>
                  <Progress value={80} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Sixes</span>
                    <span>85</span>
                  </div>
                  <Progress value={60} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Dot Balls %</span>
                    <span>28%</span>
                  </div>
                  <Progress value={28} className="h-1.5 bg-red-100" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bowling" className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Wickets', value: '45', color: 'red' },
                { label: 'Economy', value: '6.8', color: 'green' },
                { label: 'Average', value: '22.4', color: 'purple' },
                { label: '5-Wicket', value: '2', color: 'orange' },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`p-4 bg-${stat.color}-50 rounded-xl border border-${stat.color}-100`}
                >
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm mb-3">Bowling Analysis</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Dot Ball %</span>
                    <span>42%</span>
                  </div>
                  <Progress value={42} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Maiden Overs</span>
                    <span>12</span>
                  </div>
                  <Progress value={35} className="h-1.5" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </BottomSheetContent>
    </BottomSheet>
  );
}
