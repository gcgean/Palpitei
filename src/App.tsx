import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Hoje from "./pages/Hoje";
import Resultados from "./pages/Resultados";
import Planos from "./pages/Planos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Campeonatos from "./pages/Campeonatos";
import CampeonatoDetalhe from "./pages/CampeonatoDetalhe";
import MercadoDetalhe from "./pages/MercadoDetalhe";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminCampeonatos from "./pages/admin/AdminCampeonatos";
import AdminMercados from "./pages/admin/AdminMercados";
import AdminTimes from "./pages/admin/AdminTimes";
import AdminTips from "./pages/admin/AdminTips";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hoje" element={<Hoje />} />
            <Route path="/resultados" element={<Resultados />} />
            <Route path="/planos" element={<Planos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/campeonatos" element={<Campeonatos />} />
            <Route path="/campeonato/:slug" element={<CampeonatoDetalhe />} />
            <Route path="/campeonato/:slug/mercado/:marketSlug" element={<MercadoDetalhe />} />
            <Route path="/perfil" element={<Perfil />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/campeonatos" element={<AdminCampeonatos />} />
            <Route path="/admin/mercados" element={<AdminMercados />} />
            <Route path="/admin/times" element={<AdminTimes />} />
            <Route path="/admin/tips" element={<AdminTips />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
