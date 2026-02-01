import { TrendingUp, TrendingDown, Target, XCircle, MinusCircle } from 'lucide-react';
import type { ResultSummary } from '@/data/mockData';

interface ResultsSummaryCardProps {
  summary: ResultSummary;
}

export function ResultsSummaryCard({ summary }: ResultsSummaryCardProps) {
  const isPositive = summary.profitUnits >= 0;

  return (
    <div className="glass-card p-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Greens</span>
          </div>
          <p className="text-3xl font-bold text-primary">{summary.greens}</p>
        </div>

        <div className="text-center p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <span className="text-sm text-muted-foreground">Reds</span>
          </div>
          <p className="text-3xl font-bold text-destructive">{summary.reds}</p>
        </div>

        <div className="text-center p-4 rounded-xl bg-secondary border border-border">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MinusCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Voids</span>
          </div>
          <p className="text-3xl font-bold text-muted-foreground">{summary.voids}</p>
        </div>

        <div className="text-center p-4 rounded-xl bg-accent/10 border border-accent/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-primary" />
            ) : (
              <TrendingDown className="h-5 w-5 text-destructive" />
            )}
            <span className="text-sm text-muted-foreground">Lucro</span>
          </div>
          <p className={`text-3xl font-bold ${isPositive ? 'text-primary' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{summary.profitUnits.toFixed(1)}u
          </p>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div>
          <p className="text-sm text-muted-foreground">Total de Tips</p>
          <p className="text-xl font-bold text-foreground">{summary.totalTips}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Winrate</p>
          <p className="text-xl font-bold text-primary">{summary.winrate.toFixed(1)}%</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Período</p>
          <p className="text-xl font-bold text-foreground">
            {summary.period === 'ALL' ? 'Total' : `Últimos ${summary.period.replace('D', ' dias')}`}
          </p>
        </div>
      </div>
    </div>
  );
}
