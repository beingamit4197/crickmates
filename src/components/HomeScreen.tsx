import { Plus, MapPin, Users, Calendar, Bell, Clock, TrendingUp, Target, Zap, ChevronRight, Trophy, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import MapPreview from './MapPreview';
import { useState } from 'react';
import CreateMatchDialog from './CreateMatchDialog';
import MatchDetailsSheet from './MatchDetailsSheet';
import SendInviteSheet from './SendInviteSheet';
import TeamDetailsSheet from './TeamDetailsSheet';
import StatsSheet from './StatsSheet';
import ScheduleSheet from './ScheduleSheet';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface HomeScreenProps {
  setFloatingWidget?: (match: any) => void;
}

export default function HomeScreen({ setFloatingWidget }: HomeScreenProps) {
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [showSendInvite, setShowSendInvite] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-green-600 to-blue-600 text-white px-6 pt-8 pb-8 rounded-b-3xl shadow-xl relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center mb-6"
          >
            <div>
              <h1 className="text-2xl mb-1">Welcome Back! 👋</h1>
              <p className="text-green-100 text-sm">Ready for your next match?</p>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="relative p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <Bell size={24} />
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              ></motion.span>
            </motion.button>
          </motion.div>

          {/* Quick Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            <QuickStatCard icon={<Trophy size={16} />} value="18" label="Wins" />
            <QuickStatCard icon={<Target size={16} />} value="24" label="Matches" />
            <QuickStatCard icon={<TrendingUp size={16} />} value="75%" label="Win Rate" />
          </motion.div>
        </div>

        {/* Upcoming Match Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white text-gray-900 p-5 shadow-2xl border-0 overflow-hidden relative">
            {/* Decorative gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Next Match</p>
                  <p className="text-sm">Nov 6, 2025</p>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
                <Clock size={12} className="mr-1" />
                2 Days
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mb-5 py-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 flex-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white">PI</span>
                </div>
                <div>
                  <p className="text-sm mb-1">Prime XI</p>
                  <Badge variant="outline" className="text-xs border-green-500 text-green-700">Your Team</Badge>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="px-4 py-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-sm"
              >
                <span className="text-sm">VS</span>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 flex-1 justify-end"
              >
                <div className="text-right">
                  <p className="text-sm mb-1">Thunderbolts</p>
                  <Badge variant="outline" className="text-xs border-blue-500 text-blue-700">Opponent</Badge>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white">TB</span>
                </div>
              </motion.div>
            </div>

            {/* Match Details */}
            <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-xs">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Format</p>
                  <p className="text-xs">T20 Match</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <MapPreview />
              <div className="flex items-center gap-2 mt-3 p-2 bg-gray-50 rounded-lg">
                <MapPin size={14} className="text-gray-500" />
                <span className="text-xs text-gray-700">Lord's Cricket Ground, London</span>
                <ChevronRight size={14} className="text-gray-400 ml-auto" />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md" 
                  size="sm"
                  onClick={() => {
                    setSelectedMatch({
                      team1: 'Prime XI',
                      team2: 'Thunderbolts',
                      date: 'Nov 6, 2025',
                      time: '10:00 AM',
                      venue: "Lord's Cricket Ground",
                      location: 'London',
                      format: 'T20',
                      daysLeft: '2',
                      confirmed: 11,
                      invites: 15
                    });
                    setShowMatchDetails(true);
                  }}
                >
                  View Details
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-green-200 hover:bg-green-50"
                  onClick={() => setShowSendInvite(true)}
                >
                  Send Invites
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="px-6 mt-6"
      >
        <div className="grid grid-cols-4 gap-3 mb-6">
          <QuickActionButton 
            icon={<Plus size={20} />} 
            label="Create" 
            onClick={() => setShowCreateMatch(true)}
            color="from-green-500 to-green-600"
          />
          <QuickActionButton 
            icon={<Users size={20} />} 
            label="Players" 
            onClick={() => toast.info('Navigate to Players tab')}
            color="from-blue-500 to-blue-600"
          />
          <QuickActionButton 
            icon={<Calendar size={20} />} 
            label="Schedule" 
            onClick={() => setShowSchedule(true)}
            color="from-purple-500 to-purple-600"
          />
          <QuickActionButton 
            icon={<Trophy size={20} />} 
            label="Stats" 
            onClick={() => setShowStats(true)}
            color="from-orange-500 to-orange-600"
          />
        </div>
      </motion.div>

      {/* Tabs Section */}
      <div className="px-6 mb-6">
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="teams" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Your Teams</TabsTrigger>
            <TabsTrigger value="recent" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Recent</TabsTrigger>
            <TabsTrigger value="invites" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Invites
              <Badge className="ml-2 bg-red-500 text-white h-5 w-5 p-0 flex items-center justify-center text-xs">2</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TeamCard
                name="Prime XI"
                players={11}
                matches={24}
                wins={18}
                color="from-green-500 to-green-600"
                onClick={() => {
                  setSelectedTeam({ name: 'Prime XI', players: 11, matches: 24, wins: 18, color: 'from-green-500 to-green-600' });
                  setShowTeamDetails(true);
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TeamCard
                name="Weekend Warriors"
                players={15}
                matches={12}
                wins={8}
                color="from-blue-500 to-blue-600"
                onClick={() => {
                  setSelectedTeam({ name: 'Weekend Warriors', players: 15, matches: 12, wins: 8, color: 'from-blue-500 to-blue-600' });
                  setShowTeamDetails(true);
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TeamCard
                name="Sunday Strikers"
                players={13}
                matches={8}
                wins={5}
                color="from-purple-500 to-purple-600"
                onClick={() => {
                  setSelectedTeam({ name: 'Sunday Strikers', players: 13, matches: 8, wins: 5, color: 'from-purple-500 to-purple-600' });
                  setShowTeamDetails(true);
                }}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-3">
            {[
              { team1: "Prime XI", team2: "Thunderbolts", score1: "185/6", score2: "178/9", result: "Won by 7 runs", date: "Oct 28, 2025" },
              { team1: "Prime XI", team2: "Storm Chasers", score1: "142/10", score2: "143/4", result: "Lost by 6 wickets", date: "Oct 21, 2025" },
              { team1: "Prime XI", team2: "Royal Challengers", score1: "198/5", score2: "195/8", result: "Won by 3 runs", date: "Oct 14, 2025" }
            ].map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MatchResultCard {...match} />
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="invites" className="space-y-3">
            {[
              { from: "John Smith", team: "Thunderbolts", match: "Nov 10, 2025", role: "All-Rounder" },
              { from: "Mike Johnson", team: "Storm Chasers", match: "Nov 15, 2025", role: "Batsman" }
            ].map((invite, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <InviteCard {...invite} />
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowCreateMatch(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center group"
      >
        <motion.div
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Plus size={28} />
        </motion.div>
        
        {/* Pulse animation ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-green-400 -z-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>

      {/* Dialogs and Sheets */}
      <CreateMatchDialog open={showCreateMatch} onOpenChange={setShowCreateMatch} />
      <MatchDetailsSheet open={showMatchDetails} onOpenChange={setShowMatchDetails} match={selectedMatch} />
      <SendInviteSheet open={showSendInvite} onOpenChange={setShowSendInvite} />
      <TeamDetailsSheet open={showTeamDetails} onOpenChange={setShowTeamDetails} team={selectedTeam} />
      <StatsSheet open={showStats} onOpenChange={setShowStats} />
      <ScheduleSheet open={showSchedule} onOpenChange={setShowSchedule} />
    </div>
  );
}

function QuickStatCard({ icon, value, label }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
      <div className="flex items-center gap-2 mb-1 text-white/90">
        {icon}
      </div>
      <p className="text-xl">{value}</p>
      <p className="text-xs text-white/70">{label}</p>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick, color }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white shadow-md`}>
        {icon}
      </div>
      <span className="text-xs text-gray-700">{label}</span>
    </motion.button>
  );
}

function TeamCard({ name, players, matches, wins, color, onClick }: any) {
  const winRate = Math.round((wins / matches) * 100);
  
  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
      <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-0 shadow-md group" onClick={onClick}>
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 5 }}
            className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg`}
          >
            <span className="text-white text-xl">{name.substring(0, 2)}</span>
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="group-hover:text-green-600 transition-colors">{name}</h3>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-green-600 transition-colors" />
            </div>
            <div className="flex gap-4 text-xs text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Users size={12} /> {players}
              </span>
              <span className="flex items-center gap-1">
                <Activity size={12} /> {matches}
              </span>
              <span className="flex items-center gap-1 text-green-600">
                <Trophy size={12} /> {wins}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${winRate}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full bg-gradient-to-r ${color} rounded-full`}
                />
              </div>
              <span className="text-xs text-gray-600">{winRate}%</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function MatchResultCard({ team1, team2, score1, score2, result, date }: any) {
  const isWin = result.includes('Won');
  
  return (
    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
      <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-0 shadow-md group">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={12} className="text-gray-400" />
            <span className="text-xs text-gray-600">{date}</span>
          </div>
          <Badge 
            variant={isWin ? 'default' : 'destructive'} 
            className={`${isWin ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'} border-0 shadow-sm`}
          >
            {result}
          </Badge>
        </div>
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">{team1.substring(0, 1)}</span>
              </div>
              <span className="text-sm">{team1}</span>
            </div>
            <span className="text-sm px-3 py-1 bg-white rounded-md shadow-sm">{score1}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">{team2.substring(0, 1)}</span>
              </div>
              <span className="text-sm">{team2}</span>
            </div>
            <span className="text-sm px-3 py-1 bg-white rounded-md shadow-sm">{score2}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-end text-xs text-gray-500 group-hover:text-green-600 transition-colors">
          <span>View Details</span>
          <ChevronRight size={14} className="ml-1" />
        </div>
      </Card>
    </motion.div>
  );
}

function InviteCard({ from, team, match, role }: any) {
  const handleAccept = () => {
    toast.success('Invitation accepted!', {
      description: `You've joined ${team} for the match on ${match}.`
    });
  };

  const handleDecline = () => {
    toast.info('Invitation declined', {
      description: `You've declined the invitation from ${from}.`
    });
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-all relative overflow-hidden">
        {/* Accent border */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        
        <div className="flex justify-between items-start mb-4 ml-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                {from.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm">{from}</p>
                <p className="text-xs text-gray-500">invited you</p>
              </div>
            </div>
            <div className="pl-12 space-y-1">
              <p className="text-sm flex items-center gap-2">
                <span className="text-gray-500 text-xs">Team:</span> {team}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <Calendar size={12} /> {match}
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-sm">{role}</Badge>
        </div>
        <div className="flex gap-2 ml-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-sm"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full hover:bg-gray-50"
              onClick={handleDecline}
            >
              Decline
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
