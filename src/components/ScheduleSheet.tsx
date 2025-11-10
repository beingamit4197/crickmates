import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
} from './ui/bottom-sheet';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ScheduleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const upcomingMatches = [
  {
    id: 1,
    team1: 'Prime XI',
    team2: 'Thunderbolts',
    date: 'Nov 6',
    time: '10:00 AM',
    venue: "Lord's Cricket Ground",
    format: 'T20',
    status: 'upcoming',
  },
  {
    id: 2,
    team1: 'Weekend Warriors',
    team2: 'Storm Chasers',
    date: 'Nov 10',
    time: '2:00 PM',
    venue: 'Oval Stadium',
    format: 'ODI',
    status: 'upcoming',
  },
  {
    id: 3,
    team1: 'Sunday Strikers',
    team2: 'Royal Challengers',
    date: 'Nov 15',
    time: '3:30 PM',
    venue: 'Eden Gardens',
    format: 'T10',
    status: 'scheduled',
  },
];

const recentMatches = [
  {
    id: 1,
    team1: 'Prime XI',
    team2: 'Thunderbolts',
    date: 'Oct 28',
    result: 'Won',
    score: '185/6 vs 178/9',
  },
  {
    id: 2,
    team1: 'Prime XI',
    team2: 'Storm Chasers',
    date: 'Oct 21',
    result: 'Lost',
    score: '142/10 vs 143/4',
  },
];

export default function ScheduleSheet({ open, onOpenChange }: ScheduleSheetProps) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
            <Calendar size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <BottomSheetTitle>Match Schedule</BottomSheetTitle>
            <BottomSheetDescription>View your upcoming and past matches</BottomSheetDescription>
          </div>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">
              Upcoming
              <Badge className="ml-2 bg-orange-500 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {upcomingMatches.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="past">Past Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3">
            {upcomingMatches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className={`${
                    match.status === 'upcoming' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  } border-0`}>
                    {match.format}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar size={12} />
                    <span>{match.date}, 2025</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs">
                      {match.team1.substring(0, 2)}
                    </div>
                    <span className="text-sm">{match.team1}</span>
                  </div>
                  
                  <span className="text-xs text-gray-500">vs</span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{match.team2}</span>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs">
                      {match.team2.substring(0, 2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{match.venue}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-3">
            {recentMatches.map((match, idx) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={match.result === 'Won' ? 'default' : 'destructive'} className={match.result === 'Won' ? 'bg-green-600' : ''}>
                    {match.result}
                  </Badge>
                  <span className="text-xs text-gray-600">{match.date}, 2025</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-xs">
                      {match.team1.substring(0, 2)}
                    </div>
                    <span className="text-sm">{match.team1}</span>
                  </div>
                  
                  <span className="text-xs text-gray-500">vs</span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{match.team2}</span>
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs">
                      {match.team2.substring(0, 2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600">{match.score}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-green-600 transition-colors">
                    <span>View Scorecard</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </BottomSheetContent>
    </BottomSheet>
  );
}
