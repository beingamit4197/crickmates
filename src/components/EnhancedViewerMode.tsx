import { useState } from 'react';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetDescription,
} from './ui/bottom-sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Radio, Share2, Heart, ThumbsUp, Flame, Star, MessageCircle, BarChart3, Trophy, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import { Progress } from './ui/progress';
import MatchAnalytics from './MatchAnalytics';

interface EnhancedViewerModeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match?: any;
}

const reactions = [
  { id: 'fire', emoji: '🔥', label: 'Fire', color: 'from-orange-500 to-red-500' },
  { id: 'clap', emoji: '👏', label: 'Clap', color: 'from-yellow-500 to-orange-500' },
  { id: 'wow', emoji: '😮', label: 'Wow', color: 'from-blue-500 to-purple-500' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-gray-500 to-gray-600' },
  { id: 'heart', emoji: '❤️', label: 'Love', color: 'from-pink-500 to-red-500' },
];

export default function EnhancedViewerMode({ open, onOpenChange, match }: EnhancedViewerModeProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [poll, setPoll] = useState({ team1: 45, team2: 55 });
  const [hasVoted, setHasVoted] = useState(false);
  const [starredPlayers, setStarredPlayers] = useState<string[]>([]);
  const [liveComments, setLiveComments] = useState([
    { id: 1, user: 'John D.', text: 'What a shot! 🔥', time: '2m ago' },
    { id: 2, user: 'Sarah M.', text: 'Great bowling spell!', time: '5m ago' },
    { id: 3, user: 'Mike R.', text: 'This is intense! 😮', time: '7m ago' },
  ]);

  if (!match) return null;

  const runRate = (match.team1.score / match.team1.overs).toFixed(2);

  const handleReaction = (reactionId: string) => {
    setSelectedReaction(reactionId);
    const emoji = reactions.find(r => r.id === reactionId)?.emoji;
    toast.success(`Reaction sent! ${emoji}`);
    
    setTimeout(() => setSelectedReaction(null), 3000);
  };

  const handleComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: liveComments.length + 1,
        user: 'You',
        text: comment,
        time: 'Just now',
      };
      setLiveComments([newComment, ...liveComments]);
      setComment('');
      toast.success('Comment posted!');
    }
  };

  const handleVote = (team: 'team1' | 'team2') => {
    if (!hasVoted) {
      setPoll(prev => ({
        team1: team === 'team1' ? prev.team1 + 1 : prev.team1,
        team2: team === 'team2' ? prev.team2 + 1 : prev.team2,
      }));
      setHasVoted(true);
      toast.success('Vote recorded!');
    }
  };

  const toggleStarPlayer = (playerName: string) => {
    setStarredPlayers(prev =>
      prev.includes(playerName)
        ? prev.filter(p => p !== playerName)
        : [...prev, playerName]
    );
    toast.success(starredPlayers.includes(playerName) ? 'Star removed' : '⭐ Player starred!');
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <BottomSheetHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center"
            >
              <Radio size={20} className="text-white" />
            </motion.div>
            <div>
              <BottomSheetTitle>{match.team1.name} vs {match.team2.name}</BottomSheetTitle>
              <BottomSheetDescription>{match.format} • {match.venue}</BottomSheetDescription>
            </div>
          </div>
          <Badge className="bg-red-500 animate-pulse border-0">
            <span className="w-2 h-2 bg-white rounded-full mr-2 inline-block"></span>
            LIVE
          </Badge>
        </div>
      </BottomSheetHeader>

      <BottomSheetContent className="pb-4">
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="live" className="text-xs rounded-lg">Live</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs rounded-lg">Analytics</TabsTrigger>
            <TabsTrigger value="scorecard" className="text-xs rounded-lg">Card</TabsTrigger>
            <TabsTrigger value="chat" className="text-xs rounded-lg">Chat</TabsTrigger>
            <TabsTrigger value="highlights" className="text-xs rounded-lg">Highlights</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {/* Live Reactions */}
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <p className="text-sm mb-3 flex items-center gap-2">
                <Flame size={16} className="text-orange-600" />
                Quick Reactions
              </p>
              <div className="flex gap-2 flex-wrap">
                {reactions.map((reaction) => (
                  <motion.button
                    key={reaction.id}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleReaction(reaction.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      selectedReaction === reaction.id
                        ? `bg-gradient-to-br ${reaction.color} text-white shadow-lg`
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{reaction.emoji}</span>
                    <span className="text-xs">{reaction.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Live Poll */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <p className="text-sm mb-3 flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-600" />
                Who will win?
              </p>
              <div className="space-y-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote('team1')}
                  disabled={hasVoted}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    hasVoted ? 'cursor-not-allowed' : 'hover:bg-white'
                  } bg-white/50`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{match.team1.name}</span>
                    <span className="text-sm">{poll.team1}%</span>
                  </div>
                  <Progress value={poll.team1} className="h-2" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVote('team2')}
                  disabled={hasVoted}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    hasVoted ? 'cursor-not-allowed' : 'hover:bg-white'
                  } bg-white/50`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{match.team2.name}</span>
                    <span className="text-sm">{poll.team2}%</span>
                  </div>
                  <Progress value={poll.team2} className="h-2" />
                </motion.button>
              </div>
              {hasVoted && (
                <p className="text-xs text-gray-600 mt-2 text-center">✓ Thanks for voting!</p>
              )}
            </div>

            {/* Current Score */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${match.team1.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                    {match.team1.logo}
                  </div>
                  <div>
                    <p className="text-sm">{match.team1.name}</p>
                    <p className="text-xs text-gray-600">Batting</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-4xl">
                    {match.team1.score}<span className="text-2xl text-gray-600">/{match.team1.wickets}</span>
                  </p>
                  <p className="text-xs text-gray-600">({match.team1.overs} ov)</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-gray-600">
                  Run Rate: {runRate}
                </span>
                {match.target && (
                  <span className="text-gray-600">Target: {match.target}</span>
                )}
              </div>
            </div>

            {/* Star Players */}
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
              <p className="text-sm mb-3 flex items-center gap-2">
                <Star size={16} className="text-yellow-600" />
                Star Players
              </p>
              <div className="space-y-2">
                {['John Smith', 'Mike Johnson', 'David Brown'].map((player, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <span className="text-sm">{player}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleStarPlayer(player)}
                      className="p-1"
                    >
                      <Star
                        size={18}
                        className={starredPlayers.includes(player) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}
                      />
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Overs */}
            <div>
              <p className="text-sm mb-3">Recent Overs</p>
              <div className="space-y-2">
                {[
                  { over: '15.3', balls: ['4', '1', 'W', '0', '6', '2'], runs: 13 },
                  { over: '15', balls: ['1', '2', '0', '1', '4', '0'], runs: 8 },
                  { over: '14', balls: ['6', '0', '1', '1', '2', '4'], runs: 14 },
                ].map((over, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm w-12">{over.over}</span>
                    <div className="flex gap-1 flex-1">
                      {over.balls.map((ball, ballIdx) => (
                        <div
                          key={ballIdx}
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                            ball === 'W'
                              ? 'bg-red-500 text-white'
                              : ball === '6'
                              ? 'bg-purple-500 text-white'
                              : ball === '4'
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {ball}
                        </div>
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">{over.runs}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <MatchAnalytics matchData={match} />
          </TabsContent>

          <TabsContent value="scorecard" className="space-y-4">
            {/* Batting Scorecard */}
            <div>
              <h4 className="text-sm mb-3 flex items-center gap-2">
                <Users size={16} className="text-green-600" />
                {match.team1.name} Innings
              </h4>
              <div className="space-y-2">
                {[
                  { name: 'John Smith', runs: 45, balls: 32, fours: 4, sixes: 2, sr: 140.6, out: false },
                  { name: 'Mike Johnson', runs: 23, balls: 18, fours: 2, sixes: 1, sr: 127.8, out: false },
                  { name: 'Tom Wilson', runs: 34, balls: 28, fours: 3, sixes: 1, sr: 121.4, out: true, dismissal: 'c Brown b Miller' },
                  { name: 'Chris Lee', runs: 18, balls: 15, fours: 2, sixes: 0, sr: 120.0, out: true, dismissal: 'b Taylor' },
                ].map((player, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="text-sm">{player.name}</p>
                        {player.out && <p className="text-xs text-gray-500">{player.dismissal}</p>}
                      </div>
                      <p className="text-sm">{player.runs}({player.balls})</p>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-600">
                      <span>4s: {player.fours}</span>
                      <span>6s: {player.sixes}</span>
                      <span>SR: {player.sr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Bowling Scorecard */}
            <div>
              <h4 className="text-sm mb-3">Bowling</h4>
              <div className="space-y-2">
                {[
                  { name: 'David Brown', overs: 3, maidens: 0, runs: 28, wickets: 1, economy: 9.33 },
                  { name: 'James Miller', overs: 4, maidens: 1, runs: 24, wickets: 2, economy: 6.0 },
                  { name: 'Tom Taylor', overs: 3.3, maidens: 0, runs: 32, wickets: 1, economy: 9.14 },
                ].map((bowler, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm">{bowler.name}</p>
                      <p className="text-sm">{bowler.overs}-{bowler.maidens}-{bowler.runs}-{bowler.wickets}</p>
                    </div>
                    <p className="text-xs text-gray-600">Economy: {bowler.economy}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            {/* Live Chat Room */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200">
              <p className="text-sm mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-green-600" />
                Live Chat ({liveComments.length})
              </p>

              <div className="space-y-3 max-h-80 overflow-y-auto mb-3">
                <AnimatePresence>
                  {liveComments.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-white rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm">{msg.user}</p>
                        <p className="text-xs text-gray-500">{msg.time}</p>
                      </div>
                      <p className="text-sm text-gray-700">{msg.text}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  className="flex-1"
                />
                <Button onClick={handleComment} size="sm">
                  <MessageCircle size={16} />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="highlights" className="space-y-4">
            <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
              <p className="text-sm mb-3 flex items-center gap-2">
                <Trophy size={16} className="text-yellow-600" />
                Key Moments
              </p>

              <div className="space-y-3">
                {[
                  { time: '15.3', event: 'SIX! John Smith launches it over long-on', type: 'six' },
                  { time: '14.5', event: 'WICKET! Tom Wilson caught at mid-wicket', type: 'wicket' },
                  { time: '12.2', event: 'FIFTY! John Smith reaches his half-century', type: 'milestone' },
                  { time: '10.4', event: 'FOUR! Mike Johnson drives through covers', type: 'four' },
                  { time: '8.1', event: 'WICKET! Chris Lee bowled', type: 'wicket' },
                ].map((highlight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      highlight.type === 'six'
                        ? 'bg-purple-50 border-purple-500'
                        : highlight.type === 'wicket'
                        ? 'bg-red-50 border-red-500'
                        : highlight.type === 'milestone'
                        ? 'bg-yellow-50 border-yellow-500'
                        : 'bg-green-50 border-green-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">{highlight.time}</Badge>
                      {highlight.type === 'six' && <span>🚀</span>}
                      {highlight.type === 'wicket' && <span>🎯</span>}
                      {highlight.type === 'milestone' && <span>🎉</span>}
                      {highlight.type === 'four' && <span>🔥</span>}
                    </div>
                    <p className="text-sm">{highlight.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Share Button */}
        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full" onClick={() => toast.success('Share link copied!')}>
            <Share2 size={16} className="mr-2" />
            Share Match
          </Button>
        </div>
      </BottomSheetContent>
    </BottomSheet>
  );
}
