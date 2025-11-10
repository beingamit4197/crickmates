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
import { Calendar, MapPin, Users, Clock, ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import { DatePicker } from './ui/date-picker';
import { TimePicker } from './ui/time-picker';
import { motion, AnimatePresence } from 'motion/react';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';

export default function CreateMatchDialog({ open, onOpenChange }: any) {
  const [step, setStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const resetAndClose = () => {
    setStep(1);
    onOpenChange(false);
  };

  return (
    <>
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheetHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <BottomSheetTitle>Create New Match</BottomSheetTitle>
              <BottomSheetDescription>
                Step {step} of 3 - {step === 1 ? 'Match Details' : step === 2 ? 'Location' : 'Send Invites'}
              </BottomSheetDescription>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
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
                  <Label htmlFor="team1" className="text-sm mb-2 block">Your Team</Label>
                  <Select>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select your team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prime">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg"></div>
                          Prime XI
                        </div>
                      </SelectItem>
                      <SelectItem value="warriors">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
                          Weekend Warriors
                        </div>
                      </SelectItem>
                      <SelectItem value="strikers">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg"></div>
                          Sunday Strikers
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="team2" className="text-sm mb-2 block">Opponent Team</Label>
                  <Input 
                    id="team2" 
                    placeholder="Enter opponent team name" 
                    className="h-12 bg-gray-50 border-gray-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm mb-2 block">Match Date</Label>
                    <button
                      onClick={() => setShowDatePicker(true)}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors text-left"
                    >
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm">{formatDate(selectedDate)}</span>
                    </button>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">Match Time</Label>
                    <button
                      onClick={() => setShowTimePicker(true)}
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors text-left"
                    >
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm">{selectedTime}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="overs" className="text-sm mb-2 block">Match Format</Label>
                  <Select>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t20">
                        <div className="flex items-center justify-between w-full">
                          <span>T20 Match</span>
                          <span className="text-xs text-gray-500 ml-2">20 overs</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="odi">
                        <div className="flex items-center justify-between w-full">
                          <span>ODI Match</span>
                          <span className="text-xs text-gray-500 ml-2">50 overs</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="t10">
                        <div className="flex items-center justify-between w-full">
                          <span>T10 Match</span>
                          <span className="text-xs text-gray-500 ml-2">10 overs</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="test">
                        <div className="flex items-center justify-between w-full">
                          <span>Test Match</span>
                          <span className="text-xs text-gray-500 ml-2">5 days</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Label className="text-sm mb-2 block">Match Location</Label>
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl relative overflow-hidden border-2 border-gray-200">
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%">
                        <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid2)" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                      >
                        <MapPin size={24} className="text-white" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white px-4 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        <span>Tap to select location</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="venue" className="text-sm mb-2 block">Venue Name</Label>
                  <Input 
                    id="venue" 
                    placeholder="e.g., Lord's Cricket Ground" 
                    className="h-12 bg-gray-50 border-gray-200"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm mb-2 block">Address</Label>
                  <Input 
                    id="address" 
                    placeholder="Enter venue address" 
                    className="h-12 bg-gray-50 border-gray-200"
                  />
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
                <div>
                  <Label className="text-sm mb-3 block">Select Players to Invite</Label>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                    {['John Smith', 'Mike Johnson', 'David Brown', 'Chris Wilson', 'Tom Anderson', 'James Taylor'].map((player, idx) => (
                      <label 
                        key={player} 
                        className="flex items-center gap-3 p-3 border-2 border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all hover:border-green-200 group"
                      >
                        <Checkbox className="w-5 h-5" />
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-12 h-12 bg-gradient-to-br ${
                            ['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600'][idx % 3]
                          } rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                            <span className="text-sm">{player.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{player}</p>
                            <p className="text-xs text-gray-500">
                              {['Batsman', 'All-Rounder', 'Bowler', 'Wicket Keeper'][idx % 4]}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm mb-2 block">Invitation Message (Optional)</Label>
                  <Input 
                    id="message" 
                    placeholder="Add a personal message..." 
                    className="h-12 bg-gray-50 border-gray-200"
                  />
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
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  toast.success('Match created successfully!', {
                    description: 'Invitations have been sent to selected players.'
                  });
                  resetAndClose();
                }
              }}
            >
              {step === 3 ? (
                <>
                  <Users size={16} className="mr-2" />
                  Send Invites
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

      {/* Date Picker Bottom Sheet */}
      <BottomSheet open={showDatePicker} onOpenChange={setShowDatePicker}>
        <BottomSheetHeader>
          <BottomSheetTitle>Select Match Date</BottomSheetTitle>
          <BottomSheetDescription>Choose the date for your match</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetContent>
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
        </BottomSheetContent>
        <BottomSheetFooter>
          <Button 
            className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600"
            onClick={() => setShowDatePicker(false)}
          >
            Confirm Date
          </Button>
        </BottomSheetFooter>
      </BottomSheet>

      {/* Time Picker Bottom Sheet */}
      <BottomSheet open={showTimePicker} onOpenChange={setShowTimePicker}>
        <BottomSheetHeader>
          <BottomSheetTitle>Select Match Time</BottomSheetTitle>
          <BottomSheetDescription>Choose the time for your match</BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetContent>
          <TimePicker value={selectedTime} onChange={setSelectedTime} />
        </BottomSheetContent>
        <BottomSheetFooter>
          <Button 
            className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600"
            onClick={() => setShowTimePicker(false)}
          >
            Confirm Time
          </Button>
        </BottomSheetFooter>
      </BottomSheet>
    </>
  );
}
