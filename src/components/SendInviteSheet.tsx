import { useState } from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetFooter,
} from './ui/bottom-sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Send, Users, Search, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SendInviteSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchDetails?: any;
}

const teamPlayers = [
  { id: 1, name: 'John Smith', role: 'Batsman', available: true },
  { id: 2, name: 'Mike Johnson', role: 'All-Rounder', available: true },
  { id: 3, name: 'David Brown', role: 'Bowler', available: false },
  { id: 4, name: 'Chris Wilson', role: 'Wicket Keeper', available: true },
  { id: 5, name: 'Tom Anderson', role: 'Batsman', available: true },
  { id: 6, name: 'James Taylor', role: 'Bowler', available: true },
  { id: 7, name: 'Robert Lee', role: 'All-Rounder', available: true },
  { id: 8, name: 'Daniel Martin', role: 'Batsman', available: false },
];

export default function SendInviteSheet({ open, onOpenChange, matchDetails }: SendInviteSheetProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = teamPlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePlayer = (id: number) => {
    setSelectedPlayers(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSendInvites = () => {
    toast.success('Invitations sent!', {
      description: `${selectedPlayers.length} players have been invited to the match.`
    });
    setSelectedPlayers([]);
    onOpenChange(false);
  };

  const roleColors: any = {
    'Batsman': 'from-blue-500 to-blue-600',
    'Bowler': 'from-red-500 to-red-600',
    'All-Rounder': 'from-purple-500 to-purple-600',
    'Wicket Keeper': 'from-green-500 to-green-600',
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Send size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <BottomSheetTitle>Send Match Invites</BottomSheetTitle>
            <BottomSheetDescription>
              Select players to invite for the match
            </BottomSheetDescription>
          </div>
        </div>

        {/* Selected Count */}
        {selectedPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200"
          >
            <p className="text-sm text-green-700">
              {selectedPlayers.length} player{selectedPlayers.length !== 1 ? 's' : ''} selected
            </p>
          </motion.div>
        )}
      </BottomSheetHeader>

      <BottomSheetContent>
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Tabs for Different Invite Options */}
          <Tabs defaultValue="team" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="team">Team Players</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-2 max-h-96 overflow-y-auto mt-4">
              {filteredPlayers.map((player) => (
                <motion.label
                  key={player.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPlayers.includes(player.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                  } ${!player.available ? 'opacity-50' : ''}`}
                >
                  <Checkbox
                    checked={selectedPlayers.includes(player.id)}
                    onCheckedChange={() => togglePlayer(player.id)}
                    disabled={!player.available}
                    className="w-5 h-5"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${roleColors[player.role]} rounded-xl flex items-center justify-center text-white shadow-md`}>
                      <span className="text-sm">{player.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{player.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {player.role}
                        </Badge>
                        {!player.available && (
                          <Badge variant="destructive" className="text-xs">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.label>
              ))}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4 mt-4">
              <div className="text-center py-12">
                <UserPlus size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500 mb-2">No contacts added yet</p>
                <Button variant="outline" size="sm">
                  <UserPlus size={16} className="mr-2" />
                  Add Contact
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setSelectedPlayers(teamPlayers.filter(p => p.available).map(p => p.id))}
            >
              Select All Available
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setSelectedPlayers([])}
            >
              Clear Selection
            </Button>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="inviteMessage" className="text-sm mb-2 block">
              Add a message (Optional)
            </Label>
            <Input
              id="inviteMessage"
              placeholder="e.g., Don't forget your gear!"
              className="h-12 bg-gray-50 border-gray-200"
            />
          </div>
        </div>
      </BottomSheetContent>

      <BottomSheetFooter>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            onClick={handleSendInvites}
            disabled={selectedPlayers.length === 0}
          >
            <Send size={16} className="mr-2" />
            Send ({selectedPlayers.length})
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
