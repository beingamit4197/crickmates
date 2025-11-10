import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
} from './ui/bottom-sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { User, UserPlus, Mail, Phone, Hash, Users as UsersIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

const roleIcons = {
  batsman: '🏏',
  bowler: '⚡',
  'all-rounder': '🎯',
  'wicket-keeper': '🧤'
};

export default function AddPlayerDialog({ open, onOpenChange }: any) {
  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <UserPlus size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <BottomSheetTitle>Add New Player</BottomSheetTitle>
            <BottomSheetDescription>
              Add a new player to your cricket team
            </BottomSheetDescription>
          </div>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Player Avatar Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User size={40} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors">
                <span className="text-white text-lg">+</span>
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="playerName" className="text-sm mb-2 block flex items-center gap-2">
                <User size={14} className="text-gray-500" />
                Player Name
              </Label>
              <Input 
                id="playerName" 
                placeholder="Enter player name" 
                className="h-12 bg-gray-50 border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="role" className="text-sm mb-2 block flex items-center gap-2">
                <UsersIcon size={14} className="text-gray-500" />
                Role
              </Label>
              <Select>
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batsman">
                    <div className="flex items-center gap-2">
                      <span>🏏</span>
                      Batsman
                    </div>
                  </SelectItem>
                  <SelectItem value="bowler">
                    <div className="flex items-center gap-2">
                      <span>⚡</span>
                      Bowler
                    </div>
                  </SelectItem>
                  <SelectItem value="all-rounder">
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      All-Rounder
                    </div>
                  </SelectItem>
                  <SelectItem value="wicket-keeper">
                    <div className="flex items-center gap-2">
                      <span>🧤</span>
                      Wicket Keeper
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age" className="text-sm mb-2 block">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="25" 
                  className="h-12 bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="jerseyNo" className="text-sm mb-2 block flex items-center gap-2">
                  <Hash size={14} className="text-gray-500" />
                  Jersey No.
                </Label>
                <Input 
                  id="jerseyNo" 
                  type="number" 
                  placeholder="7" 
                  className="h-12 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Playing Style */}
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <span>🎯</span>
                Playing Style
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="battingStyle" className="text-sm mb-2 block">Batting Style</Label>
                  <Select>
                    <SelectTrigger className="h-11 bg-white border-blue-200">
                      <SelectValue placeholder="Select batting style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="right-hand">Right-Hand Bat</SelectItem>
                      <SelectItem value="left-hand">Left-Hand Bat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bowlingStyle" className="text-sm mb-2 block">Bowling Style</Label>
                  <Select>
                    <SelectTrigger className="h-11 bg-white border-blue-200">
                      <SelectValue placeholder="Select bowling style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="right-arm-fast">Right-Arm Fast</SelectItem>
                      <SelectItem value="left-arm-fast">Left-Arm Fast</SelectItem>
                      <SelectItem value="right-arm-spin">Right-Arm Spin</SelectItem>
                      <SelectItem value="left-arm-spin">Left-Arm Spin</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <span>📞</span>
                Contact Information
              </h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="contact" className="text-sm mb-2 block flex items-center gap-2">
                    <Phone size={14} className="text-gray-500" />
                    Phone Number
                  </Label>
                  <Input 
                    id="contact" 
                    type="tel" 
                    placeholder="+44 1234 567890" 
                    className="h-11 bg-white border-green-200"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm mb-2 block flex items-center gap-2">
                    <Mail size={14} className="text-gray-500" />
                    Email Address
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="player@example.com" 
                    className="h-11 bg-white border-green-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
            onClick={() => {
              toast.success('Player added successfully!', {
                description: 'The player has been added to your team.'
              });
              onOpenChange(false);
            }}
          >
            <UserPlus size={16} className="mr-2" />
            Add Player
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
