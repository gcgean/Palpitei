import { TrendingUp, TrendingDown, Lock } from 'lucide-react';
import type { MarketStats } from '@/data/mockData';

interface StatsCardProps {
  stats: MarketStats;
  isPro?: boolean;
}

export function StatsCard({ stats, isPro = false }: StatsCardProps) {
  const sampleSize = stats.greens + stats.reds;
  const breakeven = (1 / stats.oddRef) * 100;
  const isAboveBreakeven = stats.winrate > breakeven;

  return (
    <div className={`glass-card p-4 hover-lift ${stats.isProfitable ? 'border-primary/30' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{stats.championship.logo}</span>
          <div>
            <p className="font-semibold text-foreground text-sm">{stats.championship.name}</p>
            <p className="text-xs text-muted-foreground">{stats.market}</p>
          </div>
        </div>
        {stats.isProfitable && (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
            <TrendingUp className="h-3 w-3" />
            Lucrativo
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">Greens</p>
          <p className="text-lg font-bold text-primary">{stats.greens}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">Reds</p>
          <p className="text-lg font-bold text-destructive">{stats.reds}</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground mb-1">Winrate</p>
          <p className={`text-lg font-bold ${isAboveBreakeven ? 'text-primary' : 'text-destructive'}`}>
            {stats.winrate.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* ROI / Details */}
      <div className="flex items-center justify-between pt-3 border-t border-border/30">
        <div>
          <p className="text-xs text-muted-foreground">ROI ({stats.period})</p>
          {isPro ? (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Lock className="h-3 w-3" />
              <span className="text-sm">Pro</span>
            </div>
          ) : (
            <p className={`font-bold ${stats.roi >= 0 ? 'text-primary' : 'text-destructive'}`}>
              {stats.roi >= 0 ? '+' : ''}{stats.roi.toFixed(1)}%
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Odd Ref.</p>
          <p className="font-semibold text-foreground">{stats.oddRef.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Amostra</p>
          <p className="font-semibold text-foreground">{sampleSize}</p>
        </div>
      </div>
    </div>
  );
}
