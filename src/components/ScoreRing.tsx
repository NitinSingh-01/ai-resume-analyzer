import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function ScoreRing({ score, size = 120, strokeWidth = 8, label, className }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return "text-success";
    if (s >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-1000 ease-out stroke-current", getColor(score))}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-bold">{score}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  );
}
