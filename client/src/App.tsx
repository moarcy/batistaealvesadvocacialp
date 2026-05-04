import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Guia from "@/pages/guia.tsx";
import ArtigoSemCarteira from "@/pages/artigos/sem-carteira";
import ArtigoHorasExtras from "@/pages/artigos/horas-extras";
import ArtigoInsalubridade from "@/pages/artigos/insalubridade";
import ArtigoPericulosidade from "@/pages/artigos/periculosidade";
import ArtigoCooperado from "@/pages/artigos/cooperado";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackEvent } from "./lib/analytics";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Não rastrear acessos administrativos ao dashboard
    if (location !== "/dashboard") {
      trackEvent('pageview', location);
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/guia" component={Guia} />
      <Route path="/guia/sem-carteira" component={ArtigoSemCarteira} />
      <Route path="/guia/horas-extras" component={ArtigoHorasExtras} />
      <Route path="/guia/insalubridade" component={ArtigoInsalubridade} />
      <Route path="/guia/periculosidade" component={ArtigoPericulosidade} />
      <Route path="/guia/cooperado" component={ArtigoCooperado} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
