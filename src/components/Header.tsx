import { useState } from "react";
import { Search, Plus, Bell, User, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b glass backdrop-blur-xl">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary neon-glow">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden font-bold sm:inline-block">
            <span className="neon-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              SENYOUR
            </span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex neon-glow">
            Connect
          </Badge>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center space-x-2 md:max-w-md lg:max-w-lg">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions, topics, or resources..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <Button size="sm" className="hidden sm:flex neon-glow">
            <Plus className="mr-2 h-4 w-4" />
            Ask Question
          </Button>
          
          <Button variant="ghost" size="sm" className="relative neon-glow">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="sm" className="neon-glow">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;