import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  initialUpvotes: number;
  initialDownvotes: number;
  onVote?: (type: 'up' | 'down') => void;
  className?: string;
}

const VoteButtons = ({ 
  initialUpvotes, 
  initialDownvotes, 
  onVote,
  className 
}: VoteButtonsProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      // Remove vote
      if (type === 'up') {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
      setUserVote(null);
    } else {
      // Add new vote, remove old if exists
      if (userVote === 'up') {
        setUpvotes(prev => prev - 1);
      } else if (userVote === 'down') {
        setDownvotes(prev => prev - 1);
      }
      
      if (type === 'up') {
        setUpvotes(prev => prev + 1);
      } else {
        setDownvotes(prev => prev + 1);
      }
      setUserVote(type);
    }
    
    onVote?.(type);
  };

  const netVotes = upvotes - downvotes;

  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('up')}
        className={cn(
          "h-8 w-8 p-0 hover:bg-upvote/10",
          userVote === 'up' && "bg-upvote/20 text-upvote hover:bg-upvote/30"
        )}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      
      <span className={cn(
        "text-sm font-medium px-2 py-1 rounded",
        netVotes > 0 && "text-upvote bg-upvote/10",
        netVotes < 0 && "text-downvote bg-downvote/10",
        netVotes === 0 && "text-muted-foreground"
      )}>
        {netVotes > 0 ? `+${netVotes}` : netVotes}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('down')}
        className={cn(
          "h-8 w-8 p-0 hover:bg-downvote/10",
          userVote === 'down' && "bg-downvote/20 text-downvote hover:bg-downvote/30"
        )}
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VoteButtons;