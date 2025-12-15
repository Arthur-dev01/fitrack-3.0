import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  gradient?: "primary" | "secondary" | "hero";
  onClick?: () => void;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  gradient = "primary",
  onClick,
}: StatCardProps) => {
  const gradientClass = {
    primary: "gradient-primary",
    secondary: "gradient-secondary",
    hero: "gradient-hero",
  }[gradient];

  return (
    <Card
      className={cn(
        "p-6 transition-smooth shadow-card hover:shadow-card-hover cursor-pointer",
        "animate-scale-in group"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-foreground group-hover:scale-105 transition-smooth">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", gradientClass)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1 text-sm">
          <span
            className={cn(
              "font-medium",
              trend.positive ? "text-primary" : "text-destructive"
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-muted-foreground">vs. semana passada</span>
        </div>
      )}
    </Card>
  );
};
