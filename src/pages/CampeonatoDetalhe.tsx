import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatsCard } from '@/components/tips/StatsCard';
import { championships, marketStats, todayTips, profitableTips } from '@/data/mockData';
import { TipCard } from '@/components/tips/TipCard';
import { ArrowLeft, TrendingUp, BarChart3, Zap } from 'lucide-react';

export default function CampeonatoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  
  const championship = championships.find((c) => c.slug === slug);
  const champStats = marketStats.filter((s) => s.championship.slug === slug);
  const champTips = [...todayTips, ...profitableTips].filter(
    (t) => t.game.championship.slug === slug
  );
  const profitableCount = champStats.filter((s) => s.isProfitable).length;

  if (!championship) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Campeonato não encontrado
            </h1>
            <Link to="/campeonatos" className="text-primary hover:underline">
              Voltar para campeonatos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container py-8 md:py-12">
            <Link 
              to="/campeonatos" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-5xl">{championship.logo}</span>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {championship.name}
                </h1>
                <p className="text-muted-foreground">{championship.country}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Mercados</p>
                <p className="text-2xl font-bold text-foreground">{champStats.length}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Lucrativos</p>
                <p className="text-2xl font-bold text-primary">{profitableCount}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Tips Hoje</p>
                <p className="text-2xl font-bold text-foreground">{champTips.length}</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-sm text-muted-foreground mb-1">Win % Médio</p>
                <p className="text-2xl font-bold text-foreground">
                  {champStats.length > 0 
                    ? (champStats.reduce((s, c) => s + c.winrate, 0) / champStats.length).toFixed(0)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Today's Tips for this Championship */}
        {champTips.length > 0 && (
          <section className="container py-8 border-b border-border/30">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                Tips de Hoje
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {champTips.map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>
        )}

        {/* Market Statistics */}
        <section className="container py-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Estatísticas por Mercado (30D)
            </h2>
          </div>
          
          {champStats.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {champStats.map((stat, index) => (
                <Link key={index} to={`/campeonato/${slug}/mercado/${stat.marketSlug}`}>
                  <StatsCard stats={stat} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-muted-foreground">
                Nenhuma estatística disponível para este campeonato ainda.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
