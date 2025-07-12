import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/RichTextEditor";
import { Link, useNavigate } from "react-router-dom";

const popularTags = [
  "javascript", "react", "typescript", "node.js", "css", "html",
  "python", "java", "angular", "vue.js", "php", "sql", "mongodb",
  "express", "redux", "graphql", "api", "authentication", "testing"
];

export default function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagAdd = (tag: string) => {
    const normalizedTag = tag.toLowerCase().trim();
    if (normalizedTag && !selectedTags.includes(normalizedTag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, normalizedTag]);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleTagAdd(tagInput);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || selectedTags.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate back to questions list
    navigate("/");
  };

  const isFormValid = title.trim() && description.trim() && selectedTags.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Ask a Question</h1>
          <p className="text-muted-foreground mt-1">
            Get help from our community by asking a clear, specific question
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Title</CardTitle>
            <p className="text-sm text-muted-foreground">
              Be specific and imagine you're asking a question to another person
            </p>
          </CardHeader>
          <CardContent>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to implement JWT authentication in React?"
              className="text-base"
              maxLength={300}
            />
            <div className="text-xs text-muted-foreground mt-2">
              {title.length}/300 characters
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What are the details of your problem?</CardTitle>
            <p className="text-sm text-muted-foreground">
              Introduce the problem and expand on what you put in the title. Minimum 20 characters.
            </p>
          </CardHeader>
          <CardContent>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe your problem in detail. Include what you've tried, what you expected to happen, and what actually happened..."
              className="w-full"
            />
            <div className="text-xs text-muted-foreground mt-2">
              {description.length} characters (minimum 20)
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tags</CardTitle>
            <p className="text-sm text-muted-foreground">
              Add up to 5 tags to describe what your question is about
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 ml-1 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleTagRemove(tag)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Tag Input */}
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyPress}
              placeholder="Start typing to add tags... (press Enter or comma to add)"
              disabled={selectedTags.length >= 5}
              className="text-base"
            />

            {/* Popular Tags */}
            <div>
              <h4 className="text-sm font-medium mb-2">Popular tags:</h4>
              <div className="flex flex-wrap gap-2">
                {popularTags
                  .filter(tag => !selectedTags.includes(tag))
                  .slice(0, 12)
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleTagAdd(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {selectedTags.length}/5 tags selected
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            asChild
          >
            <Link to="/">Cancel</Link>
          </Button>
          
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? "Publishing..." : "Publish Your Question"}
          </Button>
        </div>
      </form>

      {/* Guidelines */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Writing a good question</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <div>• Search to see if your question has been asked before</div>
          <div>• Be specific and provide context</div>
          <div>• Include relevant code, error messages, or screenshots</div>
          <div>• Use proper formatting and grammar</div>
          <div>• Add relevant tags to help others find your question</div>
        </CardContent>
      </Card>
    </div>
  );
}