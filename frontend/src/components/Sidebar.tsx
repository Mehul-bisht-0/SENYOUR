import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  Users, 
  Star, 
  TrendingUp,
  Filter,
  ChevronDown,
  Code,
  Calculator,
  Atom,
  PenTool,
  Globe,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [branchesOpen, setBranchesOpen] = useState(true);

  const mainNavItems = [
    { href: "/", label: "Home", icon: Home, badge: null },
    { href: "/popular", label: "Popular", icon: TrendingUp, badge: "Hot" },
    { href: "/resources", label: "Resources", icon: BookOpen, badge: null },
    { href: "/contributors", label: "Top Contributors", icon: Users, badge: null },
    { href: "/saved", label: "Saved", icon: Star, badge: null },
  ];

  const categories = [
    { label: "Questions", count: 234 },
    { label: "Study Materials", count: 156 },
    { label: "Project Ideas", count: 89 },
    { label: "Career Guidance", count: 67 },
    { label: "Internships", count: 45 },
    { label: "Placements", count: 78 },
  ];

  const branches = [
    { label: "Computer Science", icon: Code, count: 1250, color: "text-blue-600" },
    { label: "Electronics", icon: Calculator, count: 890, color: "text-green-600" },
    { label: "Mechanical", icon: PenTool, count: 756, color: "text-orange-600" },
    { label: "Chemical", icon: Atom, count: 534, color: "text-purple-600" },
    { label: "Civil", icon: Briefcase, count: 445, color: "text-yellow-600" },
    { label: "Others", icon: Globe, count: 234, color: "text-gray-600" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] overflow-y-auto border-r glass backdrop-blur-xl">
      <div className="p-4 space-y-6">
        
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Categories Section */}
        <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium text-sm">
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Categories
              </span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", categoriesOpen && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-1">
            {categories.map((category) => (
              <button
                key={category.label}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <span>{category.label}</span>
                <Badge variant="outline" className="text-xs">
                  {category.count}
                </Badge>
              </button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Branches Section */}
        <Collapsible open={branchesOpen} onOpenChange={setBranchesOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-medium text-sm">
              <span>Branches</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", branchesOpen && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-1">
            {branches.map((branch) => (
              <button
                key={branch.label}
                className="flex items-center justify-between w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors group"
              >
                <div className="flex items-center space-x-2">
                  <branch.icon className={cn("h-4 w-4", branch.color)} />
                  <span className="text-left">{branch.label}</span>
                </div>
                <Badge variant="outline" className="text-xs group-hover:border-primary">
                  {branch.count}
                </Badge>
              </button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Stats */}
        <div className="p-3 glass-card rounded-lg neon-glow">
          <h4 className="font-medium text-sm mb-2">Today's Activity</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>New Questions</span>
              <span className="font-medium text-primary neon-text">23</span>
            </div>
            <div className="flex justify-between">
              <span>Resources Shared</span>
              <span className="font-medium text-credible">18</span>
            </div>
            <div className="flex justify-between">
              <span>Active Users</span>
              <span className="font-medium text-foreground">156</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;