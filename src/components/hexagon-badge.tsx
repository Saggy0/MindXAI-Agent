import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Lock, Check } from 'lucide-react';

interface HexagonBadgeProps {
  icon: React.ElementType;
  title: string;
  isUnlocked?: boolean;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export function HexagonBadge({
  icon: Icon,
  title,
  isUnlocked = false,
  imageUrl,
  onClick,
  className,
}: HexagonBadgeProps) {
  return (
    <div
      className={cn(
        "relative group flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="relative aspect-square w-40 h-40">
        <div className="hexagon absolute inset-0 bg-card border-2 border-dashed border-border group-hover:border-primary transition-colors">
          {isUnlocked && imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="hexagon object-cover"
              data-ai-hint="wellness activity"
            />
          )}
        </div>
        <div className="hexagon absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center p-4">
          {!isUnlocked ? (
            <Lock className="h-10 w-10 text-primary-foreground/50 mb-2" />
          ) : (
            <Icon className="h-10 w-10 text-primary-foreground mb-2" />
          )}
          <h3 className="text-center font-bold text-primary-foreground text-sm truncate">{title}</h3>
        </div>
        {isUnlocked && (
          <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1.5 z-10">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
