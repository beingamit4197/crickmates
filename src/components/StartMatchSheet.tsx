import { useState } from 'react';
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
import { ChevronRight, ChevronLeft, Play, Coins, Users as UsersIcon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface StartMatchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function StartMatchSheet({ open, onOpenChange }: StartMatchSheetProps) {
  const [step, setStep] = useState(1);
  const [tossWinner, setTossWinner] = useState('');
  const [tossDecision, setTossDecision] = useState('');

  const resetAndClose = () => {
    setStep(1);
    onOpenChange(false);
  };

  const startMatch = () => {
    toast.success('Match Started!', {
      description: 'You can now start scoring'
    });
    resetAndClose();
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Play size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <BottomSheetTitle>Start New Match</BottomSheetTitle>
            <BottomSheetDescription>
              Step {step} of 4 - {step === 1 ? 'Teams' : step === 2 ? 'Format' : step === 3 ? 'Toss' : 'Players'}
            </BottomSheetDescription>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </BottomSheetHeader>

      <BottomSheetContent>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <Label className="text-sm mb-2 block">Team A (Home Team)</Label>
                <Select>
                  <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select your team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prime">Prime XI</SelectItem>
                    <SelectItem value="warriors">Weekend Warriors</SelectItem>
                    <SelectItem value="strikers">Sunday Strikers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Team B (Opposition)</Label>
                <Select>
                  <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Select opposition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thunderbolts">Thunderbolts</SelectItem>
                    <SelectItem value="storm">Storm Chasers</SelectItem>
                    <SelectItem value="royal">Royal Challengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="venue" className="text-sm mb-2 block flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500" />
                  Venue
                </Label>
                <Input
                  id="venue"
                  placeholder="e.g., Lord's Cricket Ground"
                  className="h-12 bg-gray-50 border-gray-200"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <Label className="text-sm mb-3 block">Match Format</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 't20', label: 'T20', overs: '20 overs' },
                    { value: 'odi', label: 'ODI', overs: '50 overs' },
                    { value: 't10', label: 'T10', overs: '10 overs' },
                    { value: 'custom', label: 'Custom', overs: 'Set overs' },
                  ].map((format) => (
                    <div
                      key={format.value}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 cursor-pointer transition-all hover:bg-green-50"
                    >
                      <p className="text-sm mb-1">{format.label}</p>
                      <p className="text-xs text-gray-600">{format.overs}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Number of Overs (if custom)</Label>
                <Input
                  type="number"
                  placeholder="20"
                  className="h-12 bg-gray-50 border-gray-200"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm mb-2">Match Details</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>• Each innings: 20 overs</p>
                  <p>• Maximum 4 overs per bowler</p>
                  <p>• Powerplay: First 6 overs</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="p-5 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Coins size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm">Toss Information</p>
                    <p className="text-xs text-gray-600">Who won the toss?</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">Toss Winner</Label>
                    <RadioGroup value={tossWinner} onValueChange={setTossWinner}>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <RadioGroupItem value="teamA" id="teamA" />
                        <Label htmlFor="teamA" className="flex-1 cursor-pointer">Prime XI</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <RadioGroupItem value="teamB" id="teamB" />
                        <Label htmlFor="teamB" className="flex-1 cursor-pointer">Thunderbolts</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Decision</Label>
                    <RadioGroup value={tossDecision} onValueChange={setTossDecision}>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <RadioGroupItem value="bat" id="bat" />
                        <Label htmlFor="bat" className="flex-1 cursor-pointer">Chose to Bat</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-lg">
                        <RadioGroupItem value="bowl" id="bowl" />
                        <Label htmlFor="bowl" className="flex-1 cursor-pointer">Chose to Bowl</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  💡 Tip: The toss winner's decision will determine which team bats first
                </p>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <Label className="text-sm mb-3 block flex items-center gap-2">
                  <UsersIcon size={16} className="text-green-600" />
                  Select Playing XI (Optional)
                </Label>
                <p className="text-xs text-gray-600 mb-3">You can select players now or add them during the match</p>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {['John Smith', 'Mike Johnson', 'David Brown', 'Chris Wilson', 'Tom Anderson', 'James Taylor'].map((player, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="w-5 h-5" defaultChecked={idx < 4} />
                      <div className="flex-1">
                        <p className="text-sm">{player}</p>
                        <p className="text-xs text-gray-500">
                          {['Batsman', 'All-Rounder', 'Bowler', 'Wicket Keeper'][idx % 4]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm mb-2">Match Summary</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p>• Format: T20 (20 overs)</p>
                  <p>• Toss: Prime XI won and chose to bat</p>
                  <p>• Venue: Lord's Cricket Ground</p>
                  <p>• Selected Players: 6/11</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BottomSheetContent>

      <BottomSheetFooter>
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={16} className="mr-1" />
              Back
            </Button>
          )}
          <Button
            className={`${step === 1 ? 'w-full' : 'flex-1'} h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700`}
            onClick={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                startMatch();
              }
            }}
          >
            {step === 4 ? (
              <>
                <Play size={16} className="mr-2" />
                Start Match
              </>
            ) : (
              <>
                Next
                <ChevronRight size={16} className="ml-1" />
              </>
            )}
          </Button>
        </div>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
