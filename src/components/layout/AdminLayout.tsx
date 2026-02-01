import { ReactNode } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Trophy,
  Target,
  Users,
  FileSpreadsheet,
  TrendingUp,
  LogOut,
  ChevronLeft,
  Settings,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/campeonatos', label: 'Campeonatos', icon: Trophy },
  { href: '/admin/mercados', label: 'Mercados', icon: Target },
  { href: '/admin/times', label: 'Times', icon: Users },
  { href: '/admin/tips', label: 'Tips', icon: TrendingUp },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <Shield className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <span className="font-display text-lg font-bold text-foreground">Admin</span>
              <p className="text-xs text-muted-foreground">Palpitei</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 space-y-2">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Voltar ao site
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 border-b border-border/50 bg-card/30 flex items-center justify-between px-6">
          <h1 className="font-display text-lg font-semibold text-foreground">
            {adminNav.find((n) => n.href === location.pathname)?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-sm font-medium text-accent">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
