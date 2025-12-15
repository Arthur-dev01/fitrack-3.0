import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Apple,
  Moon,
  Dumbbell,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Início", path: "/" },
  { icon: TrendingUp, label: "Progresso", path: "/progresso" },
  { icon: Apple, label: "Nutrição", path: "/nutricao" },
  { icon: Moon, label: "Sono", path: "/sono" },
  { icon: Dumbbell, label: "Treinos", path: "/treinos" },
  { icon: Sparkles, label: "Personalização IA", path: "/personalizacao" },
  { icon: FileText, label: "Relatórios", path: "/relatorios" },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 border-r bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full w-6 h-6 bg-card shadow-md hover:shadow-lg transition-smooth"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-1 p-3 pt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth group",
                "hover:bg-primary/10",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-smooth",
                    isActive && "animate-scale-in"
                  )}
                />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-xs text-muted-foreground">
            Versão 1.0.0
          </p>
        </div>
      )}
    </aside>
  );
};
