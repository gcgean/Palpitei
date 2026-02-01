import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ResultsSummaryCard } from '@/components/tips/ResultsSummaryCard';
import { TipCard } from '@/components/tips/TipCard';
import { StatsCard } from '@/components/tips/StatsCard';
import { resultsSummary, recentResults, marketStats } from '@/data/mockData';
import { Calendar, BarChart3, History } from 'lucide-react';

type Period = '7D' | '30D' | '90D' | 'ALL';

const periods: { value: Period; label: string }[] = [
  { value: '7D', label: '7 dias' },
  { value: '30D', label: '30 dias' },
  { value: '90D', label: '90 dias' },
  { value: 'ALL', label: 'Total' },
];

export default function Resultados() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('30D');
  const summary = resultsSummary[selectedPeriod];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Resultados
                </h1>
                <p className="text-muted-foreground">
                  Acompanhe o desempenho das nossas tips por período
                </p>
              </div>
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

        {/* Summary */}
        <section className="container py-8">
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                Resumo do Período
              </h2>
            </div>
            <ResultsSummaryCard summary={summary} />
          </div>
        </section>

        {/* Market Performance */}
        <section className="container pb-8">
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Performance por Mercado
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">{marketStats.length} mercados</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {marketStats.map((stat, index) => (
                <StatsCard key={index} stats={stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Results */}
        <section className="container pb-8">
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Resultados Recentes
                </h2>
              </div>
              <span className="text-sm text-muted-foreground">{recentResults.length} tips</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentResults.map((tip) => (
                <TipCard key={tip.id} tip={tip} showResult />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
