import { useState } from 'react';
import { Zap, TrendingUp, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TipCard } from '@/components/tips/TipCard';
import { StatsCard } from '@/components/tips/StatsCard';
import { todayTips, profitableTips, marketStats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Tab = 'winner' | 'profitable';

export default function Hoje() {
  const [activeTab, setActiveTab] = useState<Tab>('winner');

  const profitableStats = marketStats.filter((s) => s.isProfitable);

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
                  Tips de Hoje
                </h1>
                <p className="text-muted-foreground">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Tips disponíveis</p>
                  <p className="text-2xl font-bold text-primary">{todayTips.length + profitableTips.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="border-b border-border/50 sticky top-16 z-40 bg-background/95 backdrop-blur-xl">
          <div className="container">
            <div className="flex gap-1 py-2">
              <button
                onClick={() => setActiveTab('winner')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'winner'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Zap className="h-4 w-4" />
                Vencedor (1X2)
              </button>
              <button
                onClick={() => setActiveTab('profitable')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'profitable'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                Tips Lucrativas
                <span className="badge-pro ml-1">PRO</span>
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container py-8">
          {activeTab === 'winner' ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Resultado Final (1X2)
                </h2>
                <span className="text-sm text-muted-foreground">{todayTips.length} tips</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todayTips.map((tip) => (
                  <TipCard key={tip.id} tip={tip} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              {/* Pro Banner */}
              <div className="glass-card p-6 border-accent/30 bg-gradient-to-r from-accent/10 to-transparent">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/20">
                      <Lock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-1">
                        Conteúdo Exclusivo Pro
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Desbloqueie tips de mercados lucrativos com histórico comprovado de ROI positivo
                      </p>
                    </div>
                  </div>
                  <Link to="/planos">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                      Assinar Pro
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Profitable Tips */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Tips de Mercados Lucrativos
                  </h2>
                  <span className="text-sm text-muted-foreground">{profitableTips.length} tips</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {profitableTips.map((tip) => (
                    <TipCard key={tip.id} tip={tip} />
                  ))}
                </div>
              </div>

              {/* Market Stats */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Mercados com ROI Positivo (30D)
                  </h2>
                  <span className="text-sm text-muted-foreground">{profitableStats.length} mercados</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {profitableStats.map((stat, index) => (
                    <StatsCard key={index} stats={stat} isPro />
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
