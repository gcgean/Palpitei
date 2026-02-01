import { AdminLayout } from '@/components/layout/AdminLayout';
import { 
  TrendingUp, 
  Users, 
  Trophy, 
  Target, 
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { resultsSummary, championships, marketStats, todayTips } from '@/data/mockData';

export default function AdminDashboard() {
  const stats = resultsSummary['30D'];
  const profitableMarkets = marketStats.filter((m) => m.isProfitable).length;

  const dashboardStats = [
    {
      label: 'Tips Hoje',
      value: todayTips.length,
      icon: Calendar,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Campeonatos',
      value: championships.length,
      icon: Trophy,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      label: 'Mercados Lucrativos',
      value: profitableMarkets,
      icon: Target,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Winrate (30D)',
      value: `${stats.winrate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Performance */}
          <div className="glass-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Performance (30D)
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Greens</span>
                </div>
                <span className="text-2xl font-bold text-primary">{stats.greens}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10">
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="font-medium text-foreground">Reds</span>
                </div>
                <span className="text-2xl font-bold text-destructive">{stats.reds}</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <span className="font-medium text-foreground">Lucro</span>
                </div>
                <span className="text-2xl font-bold text-primary">+{stats.profitUnits.toFixed(1)}u</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">
              Ações Rápidas
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/admin/campeonatos"
                className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
              >
                <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Importar Campeonatos</p>
              </a>
              <a
                href="/admin/mercados"
                className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
              >
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Importar Mercados</p>
              </a>
              <a
                href="/admin/tips"
                className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
              >
                <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Gerenciar Tips</p>
              </a>
              <a
                href="/admin/usuarios"
                className="p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-center"
              >
                <Users className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Ver Usuários</p>
              </a>
            </div>
          </div>
        </div>

        {/* Championships Overview */}
        <div className="glass-card p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Campeonatos Ativos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Campeonato</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">País</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Mercados</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Lucrativos</th>
                </tr>
              </thead>
              <tbody>
                {championships.map((champ) => {
                  const champMarkets = marketStats.filter((m) => m.championship.id === champ.id);
                  const profitable = champMarkets.filter((m) => m.isProfitable).length;
                  return (
                    <tr key={champ.id} className="border-b border-border/30 hover:bg-secondary/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{champ.logo}</span>
                          <span className="font-medium text-foreground">{champ.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{champ.country}</td>
                      <td className="py-3 px-4 text-center text-foreground">{champMarkets.length}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={profitable > 0 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                          {profitable}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
