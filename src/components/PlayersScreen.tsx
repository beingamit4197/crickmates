import { useState } from 'react';
import { Plus, Search, Grid3x3, List, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import AddPlayerDialog from './AddPlayerDialog';
import PlayerDetailsSheet from './PlayerDetailsSheet';

const players = [
  { id: 1, name: 'John Smith', role: 'Batsman', matches: 45, average: 42.5, strike_rate: 135, trend: 'up' },
  { id: 2, name: 'Mike Johnson', role: 'Bowler', matches: 42, average: 3.2, economy: 6.8, trend: 'up' },
  { id: 3, name: 'David Brown', role: 'All-Rounder', matches: 38, average: 35.2, strike_rate: 128, trend: 'down' },
  { id: 4, name: 'Chris Wilson', role: 'Wicket Keeper', matches: 40, average: 38.5, strike_rate: 142, trend: 'up' },
  { id: 5, name: 'Tom Anderson', role: 'Batsman', matches: 35, average: 45.8, strike_rate: 148, trend: 'up' },
  { id: 6, name: 'James Taylor', role: 'Bowler', matches: 33, average: 2.8, economy: 7.2, trend: 'down' },
  { id: 7, name: 'Robert Lee', role: 'All-Rounder', matches: 30, average: 32.5, strike_rate: 125, trend: 'up' },
  { id: 8, name: 'Daniel Martin', role: 'Batsman', matches: 28, average: 40.2, strike_rate: 138, trend: 'up' },
];

export default function PlayersScreen() {
  const [viewMode, setViewMode] = useState('grid');
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredPlayers = selectedRole === 'all' 
    ? players 
    : players.filter(p => p.role.toLowerCase() === selectedRole.toLowerCase());

  return (
    <div className="min-h-screen pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl mb-1">Players</h1>
            <p className="text-green-100 text-sm">{players.length} players in your squad</p>
          </div>
          <Button 
            size="sm" 
            className="bg-white text-green-600 hover:bg-green-50"
            onClick={() => setShowAddPlayer(true)}
          >
            <Plus size={16} className="mr-1" />
            Add
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <Input
            placeholder="Search players..."
            className="pl-10 bg-white text-gray-900"
          />
        </div>
      </div>

      {/* View Toggle and Filters */}
      <div className="px-6 mt-4 flex items-center justify-between">
        <Tabs value={selectedRole} onValueChange={setSelectedRole} className="flex-1">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="batsman" className="text-xs">Batsman</TabsTrigger>
            <TabsTrigger value="bowler" className="text-xs">Bowler</TabsTrigger>
            <TabsTrigger value="all-rounder" className="text-xs">All-R</TabsTrigger>
            <TabsTrigger value="wicket keeper" className="text-xs">WK</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 ml-3">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-green-600' : ''}
          >
            <Grid3x3 size={16} />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-green-600' : ''}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Players Grid/List */}
      <div className="px-6 mt-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredPlayers.map((player) => (
              <PlayerCardGrid 
                key={player.id} 
                player={player} 
                onClick={() => {
                  setSelectedPlayer(player);
                  setShowPlayerDetails(true);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPlayers.map((player) => (
              <PlayerCardList 
                key={player.id} 
                player={player}
                onClick={() => {
                  setSelectedPlayer(player);
                  setShowPlayerDetails(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AddPlayerDialog open={showAddPlayer} onOpenChange={setShowAddPlayer} />
      <PlayerDetailsSheet open={showPlayerDetails} onOpenChange={setShowPlayerDetails} player={selectedPlayer} />
    </div>
  );
}

function PlayerCardGrid({ player, onClick }: any) {
  const roleColors: any = {
    'Batsman': 'bg-blue-600',
    'Bowler': 'bg-red-600',
    'All-Rounder': 'bg-purple-600',
    'Wicket Keeper': 'bg-green-600',
  };

  const initials = player.name.split(' ').map((n: string) => n[0]).join('');

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex flex-col items-center text-center">
        <div className={`w-16 h-16 ${roleColors[player.role]} rounded-full flex items-center justify-center text-white shadow-md mb-3`}>
          <span>{initials}</span>
        </div>
        <h3 className="text-sm mb-1">{player.name}</h3>
        <Badge variant="outline" className="text-xs mb-3">
          {player.role}
        </Badge>
        
        <div className="w-full space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Matches:</span>
            <span>{player.matches}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>
              {player.role === 'Bowler' ? 'Economy:' : 'Average:'}
            </span>
            <span className="flex items-center gap-1">
              {player.role === 'Bowler' ? player.economy : player.average}
              {player.trend === 'up' ? (
                <TrendingUp size={12} className="text-green-600" />
              ) : (
                <TrendingDown size={12} className="text-red-600" />
              )}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PlayerCardList({ player, onClick }: any) {
  const roleColors: any = {
    'Batsman': 'from-blue-500 to-blue-600',
    'Bowler': 'from-red-500 to-red-600',
    'All-Rounder': 'from-purple-500 to-purple-600',
    'Wicket Keeper': 'from-green-500 to-green-600',
  };

  const initials = player.name.split(' ').map((n: string) => n[0]).join('');

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 bg-gradient-to-br ${roleColors[player.role]} rounded-full flex items-center justify-center text-white shadow-md`}>
          <span>{initials}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm">{player.name}</h3>
            {player.trend === 'up' ? (
              <TrendingUp size={14} className="text-green-600" />
            ) : (
              <TrendingDown size={14} className="text-red-600" />
            )}
          </div>
          <Badge variant="outline" className="text-xs mb-2">
            {player.role}
          </Badge>
          <div className="flex gap-4 text-xs text-gray-600">
            <span>{player.matches} Matches</span>
            <span>
              {player.role === 'Bowler' 
                ? `Eco: ${player.economy}` 
                : `Avg: ${player.average}`}
            </span>
            {player.strike_rate && <span>SR: {player.strike_rate}</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}
