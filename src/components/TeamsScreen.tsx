import { useState } from 'react';
import { Plus, Users, Trophy, TrendingUp, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const teams = [
  {
    id: 1,
    name: 'Prime XI',
    players: 11,
    matches: 24,
    wins: 18,
    losses: 6,
    winRate: 75,
    captain: 'John Smith',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 2,
    name: 'Weekend Warriors',
    players: 15,
    matches: 12,
    wins: 8,
    losses: 4,
    winRate: 67,
    captain: 'Mike Johnson',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 3,
    name: 'Sunday Strikers',
    players: 13,
    matches: 8,
    wins: 5,
    losses: 3,
    winRate: 63,
    captain: 'David Brown',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function TeamsScreen() {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl mb-1">My Teams</h1>
            <p className="text-green-100 text-sm">{teams.length} teams managed</p>
          </div>
          <Button 
            size="sm" 
            className="bg-white text-green-600 hover:bg-green-50"
          >
            <Plus size={16} className="mr-1" />
            Create
          </Button>
        </div>

        {/* Team Selector Cards */}
        <div className="space-y-2">
          {teams.map((team) => (
            <Card
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className={`p-3 cursor-pointer transition-all ${
                selectedTeam.id === team.id
                  ? 'bg-white text-gray-900 shadow-lg scale-105'
                  : 'bg-white/10 backdrop-blur border-white/20 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${team.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                  <span className="text-sm">{team.name.substring(0, 2)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm mb-1">{team.name}</h3>
                  <div className="flex gap-3 text-xs opacity-80">
                    <span>{team.players} Players</span>
                    <span>{team.matches} Matches</span>
                    <span>{team.winRate}% Win Rate</span>
                  </div>
                </div>
                {selectedTeam.id === team.id && (
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Details */}
      <div className="px-6 mt-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="text-green-600" size={20} />
              <span className="text-sm text-gray-600">Wins</span>
            </div>
            <p className="text-2xl">{selectedTeam.wins}</p>
            <p className="text-xs text-gray-500 mt-1">out of {selectedTeam.matches} matches</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-blue-600" size={20} />
              <span className="text-sm text-gray-600">Win Rate</span>
            </div>
            <p className="text-2xl">{selectedTeam.winRate}%</p>
            <Progress value={selectedTeam.winRate} className="mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="text-purple-600" size={20} />
              <span className="text-sm text-gray-600">Squad</span>
            </div>
            <p className="text-2xl">{selectedTeam.players}</p>
            <p className="text-xs text-gray-500 mt-1">active players</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">Captain</span>
            </div>
            <p className="text-sm">{selectedTeam.captain}</p>
            <Badge variant="outline" className="text-xs mt-2">Team Leader</Badge>
          </Card>
        </div>

        {/* Squad List */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Squad Players</h3>
            <Button size="sm" variant="outline">
              <Plus size={14} className="mr-1" />
              Add
            </Button>
          </div>

          <div className="space-y-3">
            {['John Smith', 'Mike Johnson', 'David Brown', 'Chris Wilson', 'Tom Anderson'].map((player, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${selectedTeam.color} rounded-full flex items-center justify-center text-white text-xs`}>
                    {player.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm">{player}</p>
                    <p className="text-xs text-gray-500">
                      {idx === 0 ? 'Captain, Batsman' : ['Bowler', 'All-Rounder', 'Wicket Keeper', 'Batsman'][idx % 4]}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Make Captain</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Performance */}
        <Card className="p-4">
          <h3 className="text-sm mb-3">Recent Form</h3>
          <div className="flex gap-2">
            {['W', 'W', 'L', 'W', 'W', 'W', 'L', 'W'].map((result, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                  result === 'W' ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {result}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
