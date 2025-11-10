import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  RotateCcw, 
  Pause, 
  Play, 
  SkipForward, 
  Save, 
  Edit, 
  AlertCircle,
  RefreshCw,
  StopCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface MatchControlsPanelProps {
  matchData: any;
  onUndo: () => void;
  onPause: () => void;
  onResume: () => void;
  onSwitchInnings: () => void;
  onEndMatch: () => void;
  onEditScore: () => void;
}

export default function MatchControlsPanel({
  matchData,
  onUndo,
  onPause,
  onResume,
  onSwitchInnings,
  onEndMatch,
  onEditScore,
}: MatchControlsPanelProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showInningsDialog, setShowInningsDialog] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  const handlePauseResume = () => {
    if (isPaused) {
      onResume();
      setIsPaused(false);
      toast.success('Match resumed');
    } else {
      onPause();
      setIsPaused(true);
      toast.info('Match paused');
    }
  };

  const handleUndo = () => {
    onUndo();
    toast.info('Last ball undone');
  };

  const handleSwitchInnings = () => {
    setShowInningsDialog(true);
  };

  const confirmSwitchInnings = () => {
    onSwitchInnings();
    setShowInningsDialog(false);
    toast.success('Innings switched!');
  };

  const handleEndMatch = () => {
    setShowEndDialog(true);
  };

  const confirmEndMatch = () => {
    onEndMatch();
    setShowEndDialog(false);
    toast.success('Match ended successfully');
  };

  const handleSave = () => {
    setAutoSaveStatus('saving');
    setTimeout(() => {
      setAutoSaveStatus('saved');
      toast.success('Match saved');
    }, 1000);
  };

  return (
    <>
      <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm flex items-center gap-2">
            <RefreshCw size={16} className="text-blue-600" />
            Match Controls
          </h3>
          <div className="flex items-center gap-2">
            <Badge
              variant={autoSaveStatus === 'saved' ? 'outline' : 'default'}
              className={
                autoSaveStatus === 'saving'
                  ? 'bg-blue-500'
                  : autoSaveStatus === 'error'
                  ? 'bg-red-500'
                  : ''
              }
            >
              {autoSaveStatus === 'saved' && '✓ Saved'}
              {autoSaveStatus === 'saving' && '⏳ Saving...'}
              {autoSaveStatus === 'error' && '✗ Error'}
            </Badge>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full h-12"
              onClick={handleUndo}
            >
              <RotateCcw size={16} className="mr-2" />
              Undo Ball
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className={`w-full h-12 ${isPaused ? 'bg-green-50 border-green-500' : ''}`}
              onClick={handlePauseResume}
            >
              {isPaused ? (
                <>
                  <Play size={16} className="mr-2" />
                  Resume
                </>
              ) : (
                <>
                  <Pause size={16} className="mr-2" />
                  Pause
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Secondary Controls */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onEditScore}
            >
              <Edit size={14} className="mr-1" />
              Edit
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleSave}
            >
              <Save size={14} className="mr-1" />
              Save
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-blue-50 border-blue-500"
              onClick={handleSwitchInnings}
              disabled={matchData?.currentInnings === 2}
            >
              <SkipForward size={14} className="mr-1" />
              Innings
            </Button>
          </motion.div>
        </div>

        {/* Info Bar */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-3"
          >
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <AlertCircle size={16} />
              Match is paused
            </div>
          </motion.div>
        )}

        {/* End Match Button */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="destructive"
            className="w-full h-12"
            onClick={handleEndMatch}
          >
            <StopCircle size={16} className="mr-2" />
            End Match
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-white rounded-lg">
            <p className="text-xs text-gray-600">Balls</p>
            <p className="text-sm">
              {Math.floor(matchData?.team1?.overs || 0) * 6 + Math.floor(((matchData?.team1?.overs || 0) % 1) * 10)}
            </p>
          </div>
          <div className="p-2 bg-white rounded-lg">
            <p className="text-xs text-gray-600">Run Rate</p>
            <p className="text-sm">
              {matchData?.team1?.overs > 0 
                ? ((matchData?.team1?.score || 0) / matchData.team1.overs).toFixed(2)
                : '0.00'
              }
            </p>
          </div>
          <div className="p-2 bg-white rounded-lg">
            <p className="text-xs text-gray-600">Wickets</p>
            <p className="text-sm">{matchData?.team1?.wickets || 0}/10</p>
          </div>
        </div>
      </div>

      {/* End Match Confirmation */}
      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Match?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this match? This will finalize the scores and generate the match report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEndMatch} className="bg-red-600">
              End Match
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Switch Innings Confirmation */}
      <AlertDialog open={showInningsDialog} onOpenChange={setShowInningsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Switch Innings?</AlertDialogTitle>
            <AlertDialogDescription>
              This will end the current innings and start the second innings. Make sure all data is correct.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSwitchInnings} className="bg-blue-600">
              Switch Innings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
