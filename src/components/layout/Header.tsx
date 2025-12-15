import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/fittrack-logo.png";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-card/95 backdrop-blur-sm shadow-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 animate-fade-in-up">
          <img 
            src={logo} 
            alt="FitTrack Logo" 
            className="h-10 w-auto transition-smooth hover:scale-105"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-primary transition-smooth"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/10 transition-smooth"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full animate-pulse" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 transition-smooth"
          >
            <Settings className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 transition-smooth"
              >
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {user?.user_metadata?.full_name || user?.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
