import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Send, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import CreateMatchDialog from './CreateMatchDialog';

interface MatchesScreenProps {
  setFloatingWidget?: (match: any) => void;
}

const upcomingMatches = [
  {
    id: 1,
    team1: 'Prime XI',
    team2: 'Thunderbolts',
    date: 'Nov 6, 2025',
    time: '10:00 AM',
    venue: "Lord's Cricket Ground",
    location: 'London',
    format: 'T20',
    invites: 15,
    confirmed: 11,
  },
  {
    id: 2,
    team1: 'Weekend Warriors',
    team2: 'Storm Chasers',
    date: 'Nov 10, 2025',
    time: '2:00 PM',
    venue: 'Oval Stadium',
    location: 'London',
    format: 'ODI',
    invites: 18,
    confirmed: 14,
  },
  {
    id: 3,
    team1: 'Sunday Strikers',
    team2: 'Royal Challengers',
    date: 'Nov 15, 2025',
    time: '3:30 PM',
    venue: 'Eden Gardens',
    location: 'Kolkata',
    format: 'T10',
    invites: 12,
    confirmed: 10,
  },
];

const pastMatches = [
  {
    id: 1,
    team1: 'Prime XI',
    team2: 'Thunderbolts',
    score1: '185/6',
    score2: '178/9',
    result: 'Won',
    margin: '7 runs',
    date: 'Oct 28, 2025',
    venue: "Lord's Cricket Ground",
  },
  {
    id: 2,
    team1: 'Prime XI',
    team2: 'Storm Chasers',
    score1: '142/10',
    score2: '143/4',
    result: 'Lost',
    margin: '6 wickets',
    date: 'Oct 21, 2025',
    venue: 'Oval Stadium',
  },
  {
    id: 3,
    team1: 'Prime XI',
    team2: 'Royal Challengers',
    score1: '198/5',
    score2: '195/8',
    result: 'Won',
    margin: '3 runs',
    date: 'Oct 14, 2025',
    venue: 'Eden Gardens',
  },
];

export default function MatchesScreen({ setFloatingWidget }: MatchesScreenProps) {
  const [showCreateMatch, setShowCreateMatch] = useState(false);

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-1">Matches</h1>
            <p className="text-green-100 text-sm">Schedule and results</p>
          </div>
          <Button 
            size="sm" 
            className="bg-white text-green-600 hover:bg-green-50"
            onClick={() => setShowCreateMatch(true)}
          >
            <Plus size={16} className="mr-1" />
            Create
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/10 backdrop-blur border-white/20 text-white p-3 text-center">
            <p className="text-2xl mb-1">24</p>
            <p className="text-xs text-green-100">Total</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-white/20 text-white p-3 text-center">
            <p className="text-2xl mb-1">18</p>
            <p className="text-xs text-green-100">Won</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-white/20 text-white p-3 text-center">
            <p className="text-2xl mb-1">75%</p>
            <p className="text-xs text-green-100">Win Rate</p>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3">
            {upcomingMatches.map((match) => (
              <UpcomingMatchCard key={match.id} match={match} />
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-3">
            {pastMatches.map((match) => (
              <PastMatchCard key={match.id} match={match} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Match Dialog */}
      <CreateMatchDialog open={showCreateMatch} onOpenChange={setShowCreateMatch} />
    </div>
  );
}

function UpcomingMatchCard({ match }: any) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <Badge className="bg-blue-600">{match.format}</Badge>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Calendar size={12} />
          <span>{match.date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-md">
            <span className="text-xs">{match.team1.substring(0, 2)}</span>
          </div>
          <div>
            <p className="text-sm">{match.team1}</p>
          </div>
        </div>

        <div className="px-3 py-1 bg-gray-100 rounded-lg">
          <span className="text-xs text-gray-600">VS</span>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-right">{match.team2}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
            <span className="text-xs">{match.team2.substring(0, 2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock size={14} />
          <span>{match.time}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin size={14} />
          <span>{match.venue}, {match.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Users size={14} />
          <span>{match.confirmed}/{match.invites} players confirmed</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
          View Details
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Send size={14} className="mr-1" />
          Send Invites
        </Button>
      </div>
    </Card>
  );
}

function PastMatchCard({ match }: any) {
  const isWin = match.result === 'Won';

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <Badge variant={isWin ? 'default' : 'destructive'} className={isWin ? 'bg-green-600' : ''}>
          {match.result} by {match.margin}
        </Badge>
        <span className="text-xs text-gray-600">{match.date}</span>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs">
              {match.team1.substring(0, 2)}
            </div>
            <span className="text-sm">{match.team1}</span>
          </div>
          <span className="text-sm">{match.score1}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs">
              {match.team2.substring(0, 2)}
            </div>
            <span className="text-sm">{match.team2}</span>
          </div>
          <span className="text-sm">{match.score2}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
        <MapPin size={12} />
        <span>{match.venue}</span>
      </div>

      <Button size="sm" variant="outline" className="w-full">
        View Scorecard
      </Button>
    </Card>
  );
}
