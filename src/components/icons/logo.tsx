import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-primary-foreground group-data-[state=collapsed]:text-primary", className)}>
      <div className="rounded-lg bg-sidebar-accent/50 p-2 group-data-[state=collapsed]:bg-transparent">
        <BrainCircuit className="h-6 w-6" />
      </div>
      <span className="font-headline text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
        mindX Agent
      </span>
    </div>
  );
}

    