import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Check,
  X,
  Clock,
  TrendingUp
} from 'lucide-react';
import { todayTips, profitableTips, recentResults } from '@/data/mockData';

const allTips = [...todayTips, ...profitableTips, ...recentResults];

export default function AdminTips() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTips = allTips.filter((tip) => {
    const matchesSearch =
      tip.game.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.game.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.market.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || tip.result === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getResultBadge = (result?: string) => {
    switch (result) {
      case 'GREEN':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            <Check className="h-3 w-3" />
            GREEN
          </span>
        );
      case 'RED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
            <X className="h-3 w-3" />
            RED
          </span>
        );
      case 'VOID':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            VOID
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
            <Clock className="h-3 w-3" />
            Pendente
          </span>
        );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tip..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
            >
              <option value="all">Todos</option>
              <option value="PENDING">Pendentes</option>
              <option value="GREEN">Greens</option>
              <option value="RED">Reds</option>
              <option value="VOID">Voids</option>
            </select>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Nova Tip
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold text-foreground">{allTips.length}</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Greens</p>
            <p className="text-2xl font-bold text-primary">
              {allTips.filter((t) => t.result === 'GREEN').length}
            </p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Reds</p>
            <p className="text-2xl font-bold text-destructive">
              {allTips.filter((t) => t.result === 'RED').length}
            </p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
            <p className="text-2xl font-bold text-accent">
              {allTips.filter((t) => !t.result || t.result === 'PENDING').length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Jogo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Campeonato</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mercado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Palpite</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Odd</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Pro</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTips.map((tip) => (
                  <tr key={tip.id} className="border-b border-border/30 hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {tip.game.homeTeam.shortName} vs {tip.game.awayTeam.shortName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tip.game.date} {tip.game.time}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span>{tip.game.championship.logo}</span>
                        <span className="text-sm text-muted-foreground">{tip.game.championship.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">{tip.market}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{tip.prediction}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-primary">{tip.odd.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {tip.isPro ? (
                        <span className="badge-pro">PRO</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">{getResultBadge(tip.result)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
