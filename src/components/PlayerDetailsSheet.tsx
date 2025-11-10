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
import { User, Mail, Phone, TrendingUp, TrendingDown, Trophy, Target, Activity, Edit, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PlayerDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player?: any;
}

export default function PlayerDetailsSheet({ open, onOpenChange, player }: PlayerDetailsSheetProps) {
  if (!player) return null;

  const roleColors: any = {
    'Batsman': 'from-blue-500 to-blue-600',
    'Bowler': 'from-red-500 to-red-600',
    'All-Rounder': 'from-purple-500 to-purple-600',
    'Wicket Keeper': 'from-green-500 to-green-600',
  };

  const stats = [
    { label: 'Matches', value: player.matches || 45, icon: Activity, color: 'blue' },
    { label: 'Average', value: player.average || 42.5, icon: Target, color: 'green' },
    { label: 'Strike Rate', value: player.strike_rate || 135, icon: TrendingUp, color: 'purple' },
    { label: 'High Score', value: '94', icon: Trophy, color: 'orange' },
  ];

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 bg-gradient-to-br ${roleColors[player.role]} rounded-2xl flex items-center justify-center shadow-lg`}>
              <span className="text-white text-xl">
                {player.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <BottomSheetTitle>{player.name}</BottomSheetTitle>
              <BottomSheetDescription>Player Profile</BottomSheetDescription>
            </div>
          </div>
          {player.trend === 'up' ? (
            <TrendingUp size={24} className="text-green-600" />
          ) : (
            <TrendingDown size={24} className="text-red-600" />
          )}
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Role Badge */}
          <div className="flex gap-2">
            <Badge className={`bg-gradient-to-r ${roleColors[player.role]} border-0`}>
              {player.role}
            </Badge>
            <Badge variant="outline">Jersey #7</Badge>
            <Badge variant="outline">Right-Hand Bat</Badge>
          </div>

          <Separator />

          {/* Stats Grid */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <Activity size={16} className="text-green-600" />
              Career Statistics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 bg-${stat.color}-50 rounded-xl border border-${stat.color}-100`}
                >
                  <div className={`flex items-center gap-2 mb-2 text-${stat.color}-600`}>
                    <stat.icon size={16} />
                  </div>
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Recent Performance */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-green-600" />
              Recent Performance
            </h4>
            <div className="space-y-2">
              {[
                { match: 'vs Thunderbolts', runs: '45', balls: '32', sr: '140.6' },
                { match: 'vs Storm Chasers', runs: '67', balls: '45', sr: '148.9' },
                { match: 'vs Royal Challengers', runs: '23', balls: '18', sr: '127.8' },
              ].map((perf, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm">{perf.match}</p>
                    <Badge variant="outline" className="text-xs">
                      SR: {perf.sr}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    {perf.runs} runs off {perf.balls} balls
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Contact Info */}
          <div>
            <h4 className="text-sm mb-3 flex items-center gap-2">
              <User size={16} className="text-green-600" />
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm">{player.name.toLowerCase().replace(' ', '.')}@cricket.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm">+44 1234 567890</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </BottomSheetContent>

      <BottomSheetFooter>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <Edit size={16} className="mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" className="h-12 text-red-600 border-red-200 hover:bg-red-50">
            <Trash2 size={16} className="mr-2" />
            Remove
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
