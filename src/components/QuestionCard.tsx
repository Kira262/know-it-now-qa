import { ArrowUp, ArrowDown, MessageSquare, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  hasAcceptedAnswer?: boolean;
}

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="group hover:shadow-[var(--shadow-hover)] transition-all duration-200 border-border/50">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <Button variant="vote" size="icon" className="w-8 h-8">
              <ArrowUp className="w-4 h-4" />
            </Button>
            <span className={`text-sm font-medium ${question.votes > 0 ? 'text-vote-up' : question.votes < 0 ? 'text-vote-down' : 'text-muted-foreground'}`}>
              {question.votes}
            </span>
            <Button variant="vote" size="icon" className="w-8 h-8">
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col items-center gap-2 min-w-[60px] text-sm text-muted-foreground">
            <div className={`flex flex-col items-center ${question.hasAcceptedAnswer ? 'text-vote-up' : ''}`}>
              <span className="font-medium">{question.answers}</span>
              <span className="text-xs">answers</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span className="text-xs">{question.views}</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <Link 
              to={`/questions/${question.id}`}
              className="block group-hover:text-primary transition-colors"
            >
              <h3 className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
                {question.title}
              </h3>
            </Link>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {question.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {question.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-1 bg-tag-bg text-tag-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author and Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={question.author.avatar} />
                  <AvatarFallback className="text-xs">
                    <User className="w-3 h-3" />
                  </AvatarFallback>
                </Avatar>
                <Link 
                  to={`/users/${question.author.name}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {question.author.name}
                </Link>
                <span className="text-xs text-muted-foreground">
                  {question.author.reputation}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(question.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}