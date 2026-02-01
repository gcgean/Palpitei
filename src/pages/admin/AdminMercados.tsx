import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Pencil, 
  Trash2, 
  Search,
  Check,
  TrendingUp
} from 'lucide-react';
import { marketStats } from '@/data/mockData';
import { toast } from 'sonner';

// Get unique markets
const uniqueMarkets = Array.from(
  new Map(marketStats.map((m) => [m.marketSlug, { 
    slug: m.marketSlug, 
    name: m.market,
    isActive: true 
  }])).values()
);

export default function AdminMercados() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const filteredMarkets = uniqueMarkets.filter(
    (m) => m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = () => {
    toast.success('Arquivo importado com sucesso! (simulação)');
    setShowImportModal(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar mercado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowImportModal(true)}
            >
              <Upload className="h-4 w-4" />
              Importar Excel
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Novo Mercado
            </Button>
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="glass-card p-6 max-w-md w-full mx-4">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Importar Mercados
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Faça upload de um arquivo Excel (.xlsx) com as colunas:
              </p>
              <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                <li>• <code className="text-primary">code</code> - Código do mercado</li>
                <li>• <code className="text-primary">name</code> - Nome do mercado</li>
                <li>• <code className="text-primary">slug</code> - URL slug</li>
                <li>• <code className="text-muted-foreground">group_name</code> - Grupo (opcional)</li>
                <li>• <code className="text-muted-foreground">is_active</code> - Ativo (opcional)</li>
              </ul>
              
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arraste o arquivo aqui ou clique para selecionar
                </p>
                <Button variant="outline" size="sm">
                  Selecionar arquivo
                </Button>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowImportModal(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleImport}>
                  Importar
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Mercado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Slug</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Campeonatos</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredMarkets.map((market, index) => {
                  const champCount = marketStats.filter((m) => m.marketSlug === market.slug).length;
                  const profitableCount = marketStats.filter(
                    (m) => m.marketSlug === market.slug && m.isProfitable
                  ).length;
                  
                  return (
                    <tr key={index} className="border-b border-border/30 hover:bg-secondary/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">{market.name}</span>
                          {profitableCount > 0 && (
                            <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded">
                              {profitableCount} lucrativo{profitableCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{market.slug}</td>
                      <td className="py-3 px-4 text-center text-foreground">{champCount}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                          <Check className="h-3 w-3" />
                          Ativo
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
