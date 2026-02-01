import { Check, Zap, Crown, TrendingUp, Lock, BarChart3, History, Bell } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const features = {
  free: [
    { icon: Zap, text: 'Tips 1X2 diárias' },
    { icon: BarChart3, text: 'Resultados básicos' },
    { icon: TrendingUp, text: 'Winrate por campeonato' },
  ],
  pro: [
    { icon: Zap, text: 'Tips 1X2 diárias' },
    { icon: BarChart3, text: 'Resultados completos' },
    { icon: TrendingUp, text: 'Tips de mercados lucrativos' },
    { icon: History, text: 'Histórico completo por mercado' },
    { icon: Crown, text: 'ROI detalhado por período' },
    { icon: Bell, text: 'Alertas de oportunidades' },
  ],
};

export default function Planos() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border/50 bg-gradient-to-b from-accent/5 to-transparent">
          <div className="container py-12 md:py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Crown className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Maximize seus lucros</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Escolha o plano ideal
              <br />
              <span className="gradient-text">para suas apostas</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Acesse tips de mercados com histórico comprovado de lucratividade e leve suas apostas para o próximo nível.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="glass-card p-6 md:p-8">
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Gratuito</h3>
                <p className="text-muted-foreground text-sm">
                  Perfeito para começar a acompanhar tips
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-foreground">R$ 0</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {features.free.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{feature.text}</span>
                    </li>
                  );
                })}
              </ul>

              <Button variant="outline" className="w-full" size="lg">
                Plano Atual
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="glass-card p-6 md:p-8 border-accent/30 relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4">
                <span className="badge-pro">POPULAR</span>
              </div>

              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="h-6 w-6 text-accent" />
                    <h3 className="font-display text-2xl font-bold text-foreground">Pro</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Acesso completo a todos os recursos
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-foreground">R$ 29</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-primary mt-1">Economize 20% no plano anual</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.pro.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <li key={index} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                          <Icon className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <span className="text-foreground">{feature.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold" size="lg">
                  Assinar Pro
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Cancele quando quiser. Sem compromisso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h4 className="font-semibold text-foreground mb-2">O que são mercados lucrativos?</h4>
                <p className="text-muted-foreground text-sm">
                  São combinações de campeonato + mercado que apresentam winrate acima do breakeven, 
                  com amostra mínima significativa, resultando em ROI positivo consistente.
                </p>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-semibold text-foreground mb-2">Como funciona o cancelamento?</h4>
                <p className="text-muted-foreground text-sm">
                  Você pode cancelar sua assinatura a qualquer momento. O acesso Pro continua 
                  até o final do período pago.
                </p>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-semibold text-foreground mb-2">Quais formas de pagamento?</h4>
                <p className="text-muted-foreground text-sm">
                  Aceitamos cartão de crédito, débito e Pix via Mercado Pago.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
