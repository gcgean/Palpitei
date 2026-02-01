import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { championships, marketStats } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight, Trophy } from 'lucide-react';

export default function Campeonatos() {
  // Group stats by championship
  const champStats = championships.map((champ) => {
    const stats = marketStats.filter((s) => s.championship.id === champ.id);
    const profitableCount = stats.filter((s) => s.isProfitable).length;
    const avgWinrate = stats.length > 0 
      ? stats.reduce((sum, s) => sum + s.winrate, 0) / stats.length 
      : 0;
    return {
      ...champ,
      marketsCount: stats.length,
      profitableCount,
      avgWinrate,
    };
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container py-8 md:py-12">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Campeonatos
              </h1>
            </div>
            <p className="text-muted-foreground">
              Explore estatísticas e mercados lucrativos por campeonato
            </p>
          </div>
        </section>

        {/* Championships Grid */}
        <section className="container py-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {champStats.map((champ) => (
              <Link
                key={champ.id}
                to={`/campeonato/${champ.slug}`}
                className="glass-card p-5 hover-lift group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{champ.logo}</span>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {champ.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{champ.country}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">Mercados</p>
                    <p className="text-lg font-bold text-foreground">{champ.marketsCount}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">Lucrativos</p>
                    <p className="text-lg font-bold text-primary">{champ.profitableCount}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-1">Win %</p>
                    <p className="text-lg font-bold text-foreground">{champ.avgWinrate.toFixed(0)}%</p>
                  </div>
                </div>

                {champ.profitableCount > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-2 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {champ.profitableCount} mercado{champ.profitableCount > 1 ? 's' : ''} com ROI positivo
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
