import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionCard } from "@/components/QuestionCard";

// Mock data
const mockQuestions = [
  {
    id: "1",
    title: "How to implement authentication with JWT in React?",
    description: "I'm building a React application and need to implement JWT-based authentication. What's the best approach for storing tokens and handling authentication state across components?",
    tags: ["react", "jwt", "authentication", "javascript"],
    author: {
      name: "john_dev",
      avatar: "",
      reputation: 1250
    },
    votes: 15,
    answers: 3,
    views: 245,
    createdAt: "2024-01-15T10:30:00Z",
    hasAcceptedAnswer: true
  },
  {
    id: "2", 
    title: "TypeScript generic constraints not working as expected",
    description: "I'm trying to create a generic function with constraints but TypeScript is throwing errors. Here's my code and the error message I'm getting...",
    tags: ["typescript", "generics", "constraints"],
    author: {
      name: "sarah_codes",
      avatar: "",
      reputation: 890
    },
    votes: 8,
    answers: 1,
    views: 156,
    createdAt: "2024-01-15T08:15:00Z"
  },
  {
    id: "3",
    title: "Best practices for state management in large React applications",
    description: "I'm working on a large React application with complex state requirements. Should I use Redux, Zustand, or Context API? What are the trade-offs?",
    tags: ["react", "state-management", "redux", "zustand", "context-api"],
    author: {
      name: "alex_frontend",
      avatar: "",
      reputation: 2100
    },
    votes: 22,
    answers: 7,
    views: 432,
    createdAt: "2024-01-14T16:45:00Z",
    hasAcceptedAnswer: true
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox: When to use which?",
    description: "I keep getting confused about when to use CSS Grid versus Flexbox. Can someone explain the key differences and provide some practical examples?",
    tags: ["css", "grid", "flexbox", "layout"],
    author: {
      name: "css_ninja",
      avatar: "",
      reputation: 670
    },
    votes: 12,
    answers: 4,
    views: 298,
    createdAt: "2024-01-14T12:20:00Z"
  },
  {
    id: "5",
    title: "How to optimize React app performance?",
    description: "My React application is getting slow with large datasets. What are some effective techniques to optimize performance? Should I use React.memo, useMemo, or something else?",
    tags: ["react", "performance", "optimization", "memo"],
    author: {
      name: "perf_enthusiast",
      avatar: "",
      reputation: 1580
    },
    votes: 18,
    answers: 5,
    views: 387,
    createdAt: "2024-01-13T14:30:00Z",
    hasAcceptedAnswer: true
  }
];

const filterTabs = [
  { id: "newest", label: "Newest" },
  { id: "active", label: "Active" },
  { id: "unanswered", label: "Unanswered" },
  { id: "votes", label: "Most Votes" }
];

export default function Questions() {
  const [activeFilter, setActiveFilter] = useState("newest");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">All Questions</h1>
          <p className="text-muted-foreground mt-1">
            {mockQuestions.length} questions
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="votes">Most Votes</SelectItem>
              <SelectItem value="active">Recently Active</SelectItem>
              <SelectItem value="unanswered">Unanswered</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1 border-b">
        {filterTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeFilter === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveFilter(tab.id)}
            className="rounded-b-none"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Question List */}
      <div className="space-y-4">
        {mockQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <Button variant="outline">
          Load More Questions
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}