import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Crown,
  User,
  Shield,
  MoreVertical,
  Mail
} from 'lucide-react';

// Mock users data
const mockUsers = [
  {
    id: '0',
    name: 'Administrador',
    email: 'admin@palpitei.com',
    plan: 'PRO',
    role: 'ADMIN',
    memberSince: '2025-01-01',
  },
  {
    id: '1',
    name: 'João Silva',
    email: 'demo@palpitei.com',
    plan: 'PRO',
    role: 'USER',
    memberSince: '2025-08-15',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'free@palpitei.com',
    plan: 'FREE',
    role: 'USER',
    memberSince: '2025-12-01',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    plan: 'PRO',
    role: 'USER',
    memberSince: '2025-10-20',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@email.com',
    plan: 'FREE',
    role: 'USER',
    memberSince: '2025-11-15',
  },
];

export default function AdminUsuarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    
    return matchesSearch && matchesPlan;
  });

  const proCount = mockUsers.filter((u) => u.plan === 'PRO').length;
  const freeCount = mockUsers.filter((u) => u.plan === 'FREE').length;
  const adminCount = mockUsers.filter((u) => u.role === 'ADMIN').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-sm"
            >
              <option value="all">Todos os planos</option>
              <option value="PRO">Pro</option>
              <option value="FREE">Free</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20">
                <Crown className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pro</p>
                <p className="text-2xl font-bold text-accent">{proCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Free</p>
                <p className="text-2xl font-bold text-foreground">{freeCount}</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold text-primary">{adminCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Usuário</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">E-mail</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Plano</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Membro desde</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border/30 hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          user.role === 'ADMIN' ? 'bg-accent/20' : 'bg-primary/20'
                        }`}>
                          <span className={`font-medium ${
                            user.role === 'ADMIN' ? 'text-accent' : 'text-primary'
                          }`}>
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {user.plan === 'PRO' ? (
                        <span className="badge-pro">PRO</span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-secondary text-muted-foreground text-xs font-medium">
                          FREE
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {user.role === 'ADMIN' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          <Shield className="h-3 w-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Usuário</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(user.memberSince).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
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
