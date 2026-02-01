import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { championships, marketStats, recentResults } from '@/data/mockData';
import { TipCard } from '@/components/tips/TipCard';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Period = '7D' | '30D' | '90D' | 'ALL';

const periods: { value: Period; label: string }[] = [
  { value: '7D', label: '7 dias' },
  { value: '30D', label: '30 dias' },
  { value: '90D', label: '90 dias' },
  { value: 'ALL', label: 'Total' },
];

export default function MercadoDetalhe() {
  const { slug, marketSlug } = useParams<{ slug: string; marketSlug: string }>();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30D');
  
  const championship = championships.find((c) => c.slug === slug);
  const stats = marketStats.find(
    (s) => s.championship.slug === slug && s.marketSlug === marketSlug
  );
  
  // Filter results for this market
  const marketResults = recentResults.filter(
    (r) => r.game.championship.slug === slug && r.marketSlug === marketSlug
  );

  if (!championship || !stats) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Mercado não encontrado
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

  const sampleSize = stats.greens + stats.reds;
  const breakeven = (1 / stats.oddRef) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container py-8 md:py-12">
            <Link 
              to={`/campeonato/${slug}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {championship.name}
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{championship.logo}</span>
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      {stats.market}
                    </h1>
                    <p className="text-muted-foreground">{championship.name}</p>
                  </div>
                </div>
              </div>
              
              {stats.isProfitable && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Mercado Lucrativo</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Period Filter */}
        <section className="border-b border-border/50 sticky top-16 z-40 bg-background/95 backdrop-blur-xl">
          <div className="container py-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Período:</span>
              <div className="flex gap-1">
                {periods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => setSelectedPeriod(period.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedPeriod === period.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-5 text-center">
              <p className="text-sm text-muted-foreground mb-2">Greens</p>
              <p className="text-3xl font-bold text-primary">{stats.greens}</p>
            </div>
            <div className="glass-card p-5 text-center">
              <p className="text-sm text-muted-foreground mb-2">Reds</p>
              <p className="text-3xl font-bold text-destructive">{stats.reds}</p>
            </div>
            <div className="glass-card p-5 text-center">
              <p className="text-sm text-muted-foreground mb-2">Winrate</p>
              <p className={`text-3xl font-bold ${stats.winrate >= breakeven ? 'text-primary' : 'text-destructive'}`}>
                {stats.winrate.toFixed(1)}%
              </p>
            </div>
            <div className="glass-card p-5 text-center">
              <p className="text-sm text-muted-foreground mb-2">ROI</p>
              <p className={`text-3xl font-bold ${stats.roi >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {stats.roi >= 0 ? '+' : ''}{stats.roi.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="glass-card p-6 mb-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Análise de Lucratividade
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Odd Referência</p>
                <p className="text-xl font-bold text-foreground">{stats.oddRef.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Breakeven</p>
                <p className="text-xl font-bold text-foreground">{breakeven.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amostra</p>
                <p className="text-xl font-bold text-foreground">{sampleSize} tips</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2">
                {stats.isProfitable ? (
                  <>
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-primary font-medium">
                      Winrate {(stats.winrate - breakeven).toFixed(1)}% acima do breakeven
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-5 w-5 text-destructive" />
                    <span className="text-destructive font-medium">
                      Winrate {(breakeven - stats.winrate).toFixed(1)}% abaixo do breakeven
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Pro History Section */}
          <div className="glass-card p-6 border-accent/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Histórico Completo
                </h3>
                <span className="badge-pro">PRO</span>
              </div>
              <Link to="/planos">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Desbloquear
                </Button>
              </Link>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Acesse o histórico completo de tips deste mercado, incluindo gráficos de evolução do ROI e análises detalhadas.
            </p>

            {/* Blurred Preview */}
            <div className="relative">
              <div className="grid gap-4 md:grid-cols-2 blur-sm pointer-events-none">
                {recentResults.slice(0, 4).map((tip) => (
                  <TipCard key={tip.id} tip={tip} showResult />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-accent mx-auto mb-2" />
                  <p className="font-semibold text-foreground">Conteúdo exclusivo Pro</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
