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
  Users
} from 'lucide-react';
import { teams } from '@/data/mockData';
import { toast } from 'sonner';

export default function AdminTimes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  const filteredTeams = teams.filter(
    (t) => t.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              placeholder="Buscar time..."
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
              Novo Time
            </Button>
          </div>
        </div>

        {/* Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="glass-card p-6 max-w-md w-full mx-4">
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Importar Times
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Faça upload de um arquivo Excel (.xlsx) com as colunas:
              </p>
              <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                <li>• <code className="text-primary">external_id</code> - ID externo</li>
                <li>• <code className="text-primary">name</code> - Nome do time</li>
                <li>• <code className="text-primary">slug</code> - URL slug</li>
                <li>• <code className="text-muted-foreground">short_name</code> - Sigla (opcional)</li>
                <li>• <code className="text-muted-foreground">country</code> - País (opcional)</li>
                <li>• <code className="text-muted-foreground">logo_url</code> - Logo URL (opcional)</li>
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

        {/* Stats */}
        <div className="flex gap-4">
          <div className="glass-card p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Times</p>
              <p className="text-xl font-bold text-foreground">{teams.length}</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredTeams.map((team) => (
            <div key={team.id} className="glass-card p-4 hover:border-primary/30 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="font-display font-bold text-lg text-primary">{team.shortName}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="font-medium text-foreground text-sm truncate">{team.name}</p>
              <p className="text-xs text-muted-foreground">ID: {team.id}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
