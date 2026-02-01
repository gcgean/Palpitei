import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Crown, 
  CreditCard, 
  Bell, 
  LogOut, 
  Settings,
  TrendingUp,
  Calendar,
  Check,
  Loader2
} from 'lucide-react';
import { resultsSummary } from '@/data/mockData';

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  const stats = resultsSummary['30D'];

  const handleLogout = () => {
    logout();
    toast.success('Você saiu da sua conta');
    navigate('/');
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    toast.success('Alterações salvas com sucesso!');
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center glass-card p-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Você não está logado
            </h1>
            <p className="text-muted-foreground mb-6">
              Faça login para acessar seu perfil
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/login">
                <Button className="bg-primary hover:bg-primary/90">Entrar</Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="outline">Criar conta</Button>
              </Link>
            </div>
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
        <section className="border-b border-border/50 bg-gradient-to-b from-accent/5 to-transparent">
          <div className="container py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 border-2 border-accent/30">
                <User className="h-10 w-10 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {user.name}
                  </h1>
                  {user.plan === 'PRO' && <span className="badge-pro">PRO</span>}
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Membro desde {new Date(user.memberSince).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </section>

        <div className="container py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="space-y-4">
              {/* Subscription Card */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${user.plan === 'PRO' ? 'bg-accent/20' : 'bg-secondary'}`}>
                    <Crown className={`h-5 w-5 ${user.plan === 'PRO' ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Plano {user.plan === 'PRO' ? 'Pro' : 'Gratuito'}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {user.plan === 'PRO' ? 'Ativo' : 'Recursos limitados'}
                    </p>
                  </div>
                </div>
                
                {user.plan === 'PRO' && user.subscriptionEnd && (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Próxima cobrança</span>
                      <span className="text-foreground font-medium">
                        {new Date(user.subscriptionEnd).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Valor</span>
                      <span className="text-foreground font-medium">R$ 29/mês</span>
                    </div>
                  </div>
                )}

                {user.plan === 'PRO' ? (
                  <Button variant="outline" className="w-full mt-4 gap-2" size="sm">
                    <CreditCard className="h-4 w-4" />
                    Gerenciar assinatura
                  </Button>
                ) : (
                  <Link to="/planos">
                    <Button className="w-full mt-4 gap-2 bg-accent text-accent-foreground hover:bg-accent/90" size="sm">
                      <Crown className="h-4 w-4" />
                      Fazer upgrade
                    </Button>
                  </Link>
                )}
              </div>

              {/* Quick Stats */}
              <div className="glass-card p-5">
                <h3 className="font-semibold text-foreground mb-4">Suas Estatísticas (30D)</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Winrate</span>
                    </div>
                    <span className="text-primary font-bold">{stats.winrate.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Greens</span>
                    </div>
                    <span className="text-foreground font-bold">{stats.greens}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Tips acompanhadas</span>
                    </div>
                    <span className="text-foreground font-bold">{stats.totalTips}</span>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="glass-card p-2">
                <nav className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-foreground bg-secondary">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">Minha Conta</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Bell className="h-4 w-4" />
                    <span className="text-sm font-medium">Notificações</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Settings className="h-4 w-4" />
                    <span className="text-sm font-medium">Configurações</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Profile Form */}
              <div className="glass-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Informações Pessoais
                </h2>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 bg-secondary border-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-secondary border-border"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        'Salvar alterações'
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Notifications Settings */}
              <div className="glass-card p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Preferências de Notificação
                </h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Tips do dia</p>
                        <p className="text-sm text-muted-foreground">Receba as tips diárias por e-mail</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Mercados lucrativos</p>
                        <p className="text-sm text-muted-foreground">Alertas de novas oportunidades</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Crown className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Atualizações Pro</p>
                        <p className="text-sm text-muted-foreground">Novidades exclusivas para assinantes</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5 accent-primary" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
