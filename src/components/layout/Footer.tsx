import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-sm font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-display text-lg font-bold text-foreground">Palpitei</span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/hoje" className="hover:text-foreground transition-colors">
              Tips
            </Link>
            <Link to="/resultados" className="hover:text-foreground transition-colors">
              Resultados
            </Link>
            <Link to="/planos" className="hover:text-foreground transition-colors">
              Planos
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2026 Palpitei. Todos os direitos reservados.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/70">
            ⚠️ Aposte com responsabilidade. Conteúdo apenas para maiores de 18 anos.
          </p>
        </div>
      </div>
    </footer>
  );
}
