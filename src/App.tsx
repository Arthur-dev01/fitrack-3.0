import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Progresso from "./pages/Progresso";
import Nutricao from "./pages/Nutricao";
import Sono from "./pages/Sono";
import Treinos from "./pages/Treinos";
import Relatorios from "./pages/Relatorios";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Personalizacao from "./pages/Personalizacao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen w-full bg-background">
                    <Header />
                    <Sidebar />
                    <main className="pt-16 pl-64 transition-all duration-300">
                      <div className="p-6 max-w-7xl mx-auto">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/onboarding" element={<Onboarding />} />
                          <Route path="/personalizacao" element={<Personalizacao />} />
                          <Route path="/progresso" element={<Progresso />} />
                          <Route path="/nutricao" element={<Nutricao />} />
                          <Route path="/sono" element={<Sono />} />
                          <Route path="/treinos" element={<Treinos />} />
                          <Route path="/relatorios" element={<Relatorios />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
