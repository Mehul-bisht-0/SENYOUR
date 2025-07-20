import { useState } from "react";
import { Plus, TrendingUp, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DiscussionThread from "@/components/DiscussionThread";
import QuestionForm from "@/components/QuestionForm";

const Index = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [threads, setThreads] = useState([
    {
      id: "1",
      title: "How to prepare for Data Structures interviews at FAANG companies?",
      content: "I'm a 3rd year CSE student and I want to start preparing for interviews at top tech companies. What's the best approach to master DSA? Should I focus on competitive programming or just practice interview questions?",
      author: {
        id: "1",
        name: "Rahul Sharma",
        year: "3rd Year",
        branch: "CSE",
        credibilityPoints: 125,
        isVerified: true
      },
      tags: ["interview", "dsa", "faang", "career"],
      upvotes: 24,
      downvotes: 2,
      comments: 18,
      timeAgo: "2 hours ago",
      category: "question" as const,
      isHelpful: true
    },
    {
      id: "2", 
      title: "Complete Notes for Digital Signal Processing - 6th Sem ECE",
      content: "Sharing my comprehensive DSP notes with solved examples, important formulas, and previous year questions. Covers all units including Z-transform, DFT, FFT, and filter design.",
      author: {
        id: "2",
        name: "Priya Patel", 
        year: "Final Year",
        branch: "ECE",
        credibilityPoints: 89,
        isVerified: true
      },
      tags: ["notes", "dsp", "ece", "6th-sem"],
      upvotes: 45,
      downvotes: 1,
      comments: 12,
      timeAgo: "4 hours ago", 
      category: "resource" as const
    },
    {
      id: "3",
      title: "Anyone interested in forming a study group for Machine Learning?",
      content: "Looking for 4-5 motivated students to form a study group for Andrew Ng's ML course. We can meet every weekend and discuss concepts, work on projects together.",
      author: {
        id: "3",
        name: "Amit Kumar",
        year: "2nd Year", 
        branch: "CSE",
        credibilityPoints: 67,
        isVerified: false
      },
      tags: ["study-group", "machine-learning", "collaboration"],
      upvotes: 18,
      downvotes: 0,
      comments: 23,
      timeAgo: "6 hours ago",
      category: "discussion" as const
    },
    {
      id: "4",
      title: "Internship opportunity at startup - Backend Development",
      content: "My friend's startup is looking for backend interns. Tech stack: Node.js, MongoDB, AWS. Stipend: 15k/month. Great learning opportunity for 2nd/3rd year students.",
      author: {
        id: "4",
        name: "Sneha Reddy",
        year: "Final Year",
        branch: "CSE", 
        credibilityPoints: 156,
        isVerified: true
      },
      tags: ["internship", "backend", "startup", "nodejs"],
      upvotes: 67,
      downvotes: 3,
      comments: 31,
      timeAgo: "1 day ago",
      category: "resource" as const
    }
  ]);

  const handleQuestionSubmit = (newQuestion: any) => {
    setThreads([newQuestion, ...threads]);
    setShowQuestionForm(false);
  };

  const sortedThreads = {
    latest: [...threads].sort((a, b) => Date.now() - Date.now()),
    popular: [...threads].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)),
    trending: [...threads].sort((a, b) => b.comments - a.comments)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 max-w-4xl">
          {/* Welcome Banner */}
          <div className="mb-6 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20">
            <h1 className="text-2xl font-bold mb-2">
              Welcome to <span className="text-primary">SENYOUR Connect</span>
            </h1>
            <p className="text-muted-foreground mb-4">
              Connect with seniors, share knowledge, and grow together. Ask questions, share resources, and build your academic network.
            </p>
            <Button onClick={() => setShowQuestionForm(true)} className="shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Ask Your First Question
            </Button>
          </div>

          {/* Question Form */}
          {showQuestionForm && (
            <div className="mb-6">
              <QuestionForm 
                onSubmit={handleQuestionSubmit}
                onCancel={() => setShowQuestionForm(false)}
              />
            </div>
          )}

          {/* Filter Tabs */}
          <Tabs defaultValue="latest" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="latest" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Trending
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {threads.length} discussions
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  156 active users
                </Badge>
              </div>
            </div>

            {/* Thread Lists */}
            <TabsContent value="latest" className="space-y-4">
              {sortedThreads.latest.map((thread) => (
                <DiscussionThread key={thread.id} {...thread} />
              ))}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-4">
              {sortedThreads.popular.map((thread) => (
                <DiscussionThread key={thread.id} {...thread} />
              ))}
            </TabsContent>
            
            <TabsContent value="trending" className="space-y-4">
              {sortedThreads.trending.map((thread) => (
                <DiscussionThread key={thread.id} {...thread} />
              ))}
            </TabsContent>
          </Tabs>

          {/* Load More */}
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Discussions
            </Button>
          </div>
        </main>
        
        {/* Right Sidebar - Quick Actions */}
        <aside className="w-72 p-6 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions */}
            <div className="p-4 bg-card rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setShowQuestionForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ask Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Share Resource
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Find Study Group
                </Button>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="p-4 bg-card rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-3">Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: "Aditi Singh", points: 245, branch: "CSE" },
                  { name: "Rohit Verma", points: 198, branch: "ECE" },
                  { name: "Kavya Nair", points: 176, branch: "EEE" }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.branch}</p>
                    </div>
                    <Badge variant="outline" className="text-credible border-credible">
                      {contributor.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
