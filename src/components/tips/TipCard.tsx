import { Lock, TrendingUp } from 'lucide-react';
import type { Tip } from '@/data/mockData';

interface TipCardProps {
  tip: Tip;
  showResult?: boolean;
}

export function TipCard({ tip, showResult = false }: TipCardProps) {
  const { game, market, prediction, odd, result, isPro } = tip;

  const getResultBadge = () => {
    if (!showResult || !result) return null;
    
    const styles = {
      GREEN: 'bg-primary/20 text-primary border-primary/30',
      RED: 'bg-destructive/20 text-destructive border-destructive/30',
      VOID: 'bg-muted text-muted-foreground border-border',
      PENDING: 'bg-accent/20 text-accent border-accent/30',
    };

    const labels = {
      GREEN: 'GREEN ✓',
      RED: 'RED ✗',
      VOID: 'VOID',
      PENDING: 'Pendente',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${styles[result]}`}>
        {labels[result]}
      </span>
    );
  };

  return (
    <div className={`glass-card p-4 hover-lift ${isPro ? 'border-accent/30' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{game.championship.logo}</span>
          <span className="text-sm text-muted-foreground">{game.championship.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {game.status === 'live' && (
            <span className="badge-live flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              AO VIVO
            </span>
          )}
          {isPro && <span className="badge-pro">PRO</span>}
          {showResult && getResultBadge()}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="font-semibold text-foreground">{game.homeTeam.name}</p>
          <p className="text-muted-foreground">vs</p>
          <p className="font-semibold text-foreground">{game.awayTeam.name}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{game.date}</p>
          <p className="text-lg font-semibold text-foreground">{game.time}</p>
        </div>
      </div>

      {/* Prediction */}
      <div className="bg-secondary/50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{market}</p>
            {isPro ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span className="text-sm">Conteúdo exclusivo Pro</span>
              </div>
            ) : (
              <p className="font-semibold text-foreground">{prediction}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Odd</p>
            {isPro ? (
              <div className="flex items-center gap-1 text-accent">
                <Lock className="h-3 w-3" />
                <span className="font-bold">?.??</span>
              </div>
            ) : (
              <p className="font-bold text-primary text-lg">{odd.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pro CTA */}
      {isPro && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-accent">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Mercado lucrativo</span>
            </div>
            <button className="text-sm font-semibold text-accent hover:underline">
              Desbloquear →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
