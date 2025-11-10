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
import { Calendar, Clock, MapPin, Users, Trophy, Target, Activity, Share2, Edit } from 'lucide-react';
import { motion } from 'motion/react';
import { Separator } from './ui/separator';
import MapPreview from './MapPreview';

interface MatchDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match?: any;
}

export default function MatchDetailsSheet({ open, onOpenChange, match }: MatchDetailsSheetProps) {
  if (!match) return null;

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Trophy size={20} className="text-white" />
            </div>
            <div>
              <BottomSheetTitle>Match Details</BottomSheetTitle>
              <BottomSheetDescription>{match.format || 'T20'} Match</BottomSheetDescription>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
            <Clock size={12} className="mr-1" />
            {match.daysLeft || '2'} Days
          </Badge>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Teams VS Section */}
          <div className="p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between py-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">{match.team1?.substring(0, 2) || 'PI'}</span>
                </div>
                <div className="text-center">
                  <p className="text-sm">{match.team1 || 'Prime XI'}</p>
                  <Badge variant="outline" className="text-xs mt-1 border-green-500 text-green-700">Your Team</Badge>
                </div>
              </motion.div>

              <div className="px-6 py-3 bg-white rounded-xl shadow-md">
                <span className="text-lg">VS</span>
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">{match.team2?.substring(0, 2) || 'TB'}</span>
                </div>
                <div className="text-center">
                  <p className="text-sm">{match.team2 || 'Thunderbolts'}</p>
                  <Badge variant="outline" className="text-xs mt-1 border-blue-500 text-blue-700">Opponent</Badge>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Match Info */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-sm">
              <Activity size={16} className="text-green-600" />
              Match Information
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-blue-600">
                  <Calendar size={16} />
                </div>
                <p className="text-xs text-gray-600 mb-1">Date</p>
                <p className="text-sm">{match.date || 'Nov 6, 2025'}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-2 text-purple-600">
                  <Clock size={16} />
                </div>
                <p className="text-xs text-gray-600 mb-1">Time</p>
                <p className="text-sm">{match.time || '10:00 AM'}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center gap-2 mb-2 text-green-600">
                  <Target size={16} />
                </div>
                <p className="text-xs text-gray-600 mb-1">Format</p>
                <p className="text-sm">{match.format || 'T20 Match'}</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <div className="flex items-center gap-2 mb-2 text-orange-600">
                  <Users size={16} />
                </div>
                <p className="text-xs text-gray-600 mb-1">Players</p>
                <p className="text-sm">{match.confirmed || '11'}/{match.invites || '15'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Venue Section */}
          <div>
            <h4 className="flex items-center gap-2 text-sm mb-3">
              <MapPin size={16} className="text-green-600" />
              Venue Details
            </h4>
            <div className="space-y-3">
              <MapPreview />
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm mb-1">{match.venue || "Lord's Cricket Ground"}</p>
                <p className="text-xs text-gray-600">{match.location || 'London, United Kingdom'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Squad Preview */}
          <div>
            <h4 className="flex items-center gap-2 text-sm mb-3">
              <Users size={16} className="text-green-600" />
              Your Squad ({match.confirmed || '11'} confirmed)
            </h4>
            <div className="flex -space-x-2">
              {['JS', 'MJ', 'DB', 'CW', 'TA', 'JT', 'RL', 'DM', '+3'].map((initials, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs border-2 border-white shadow-md"
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </BottomSheetContent>

      <BottomSheetFooter>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="h-11">
            <Share2 size={16} className="mr-1" />
            Share
          </Button>
          <Button variant="outline" className="h-11">
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
          <Button className="h-11 bg-gradient-to-r from-green-600 to-blue-600">
            <Users size={16} className="mr-1" />
            Invites
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
