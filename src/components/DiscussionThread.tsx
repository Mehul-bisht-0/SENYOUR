import { useState } from "react";
import { MessageCircle, Share2, Bookmark, MoreHorizontal, Award, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VoteButtons from "./VoteButtons";
import { cn } from "@/lib/utils";

interface ThreadAuthor {
  id: string;
  name: string;
  avatar?: string;
  year: string;
  branch: string;
  credibilityPoints: number;
  isVerified: boolean;
}

interface DiscussionThreadProps {
  id: string;
  title: string;
  content: string;
  author: ThreadAuthor;
  tags: string[];
  upvotes: number;
  downvotes: number;
  comments: number;
  timeAgo: string;
  category: 'question' | 'resource' | 'discussion';
  isHelpful?: boolean;
  className?: string;
}

const DiscussionThread = ({
  id,
  title,
  content,
  author,
  tags,
  upvotes,
  downvotes,
  comments,
  timeAgo,
  category,
  isHelpful = false,
  className
}: DiscussionThreadProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'question': return 'bg-primary/10 text-primary border-primary/20';
      case 'resource': return 'bg-credible/10 text-credible border-credible/20';
      case 'discussion': return 'bg-accent/50 text-accent-foreground border-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn("group glass-card neon-glow transition-all duration-200 border-l-4", 
      category === 'question' && "border-l-primary",
      category === 'resource' && "border-l-credible", 
      category === 'discussion' && "border-l-accent",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <VoteButtons 
            initialUpvotes={upvotes}
            initialDownvotes={downvotes}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-2">
            {/* Category and Helpful Badge */}
            <div className="flex items-center space-x-2">
              <Badge className={getCategoryColor(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
              {isHelpful && (
                <Badge variant="outline" className="text-credible border-credible">
                  <Award className="w-3 h-3 mr-1" />
                  Helpful
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors cursor-pointer">
              {title}
            </h3>

            {/* Content Preview */}
            <p className="text-muted-foreground text-sm line-clamp-3">
              {content}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="font-medium">{author.name}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{author.year} {author.branch}</span>
              {author.credibilityPoints > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-credible font-medium">
                    {author.credibilityPoints} pts
                  </span>
                </>
              )}
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {timeAgo}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="w-4 h-4 mr-1" />
              {comments}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                isBookmarked && "text-primary"
              )}
            >
              <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
            </Button>
            
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscussionThread;