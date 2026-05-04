import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Activity, Users, MousePointerClick, Percent, LogOut, Clock, Globe, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Metrics = {
  uniqueVisits: number;
  totalVisits: number;
  totalClicks: number;
  ctr: string;
  eventsByDate: any[];
  pageViewsByPath?: Record<string, number>;
  clicksByPath?: Record<string, number>;
  avgTimeOnPage?: number;
  referrers?: Record<string, number>;
  scrollDepthByPath?: Record<string, { d50: number; d100: number }>;
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterMode, setFilterMode] = useState<"date" | "datetime">("date");
  const { toast } = useToast();

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth-status");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchMetrics();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchMetrics();
      } else {
        toast({
          title: "Erro de login",
          description: data.message || "Credenciais inválidas",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
    setMetrics(null);
  };

  const fetchMetrics = async (start?: string, end?: string) => {
    try {
      let url = "/api/app-metrics";
      const params = new URLSearchParams();
      if (start) params.append("startDate", start);
      if (end) params.append("endDate", end);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 401) setIsAuthenticated(false);
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setMetrics(data);
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro",
        description: "Falha ao carregar métricas.",
        variant: "destructive",
      });
    }
  };

  const applyFilter = () => {
    if (!startDate && !endDate) {
      fetchMetrics();
      return;
    }
    // Converte 'YYYY-MM-DD' para ISO quando no modo só-data
    const toISO = (val: string, isEnd: boolean) => {
      if (!val) return undefined;
      if (filterMode === "date" && val.length === 10) {
        // Para o fim do dia, usamos 23:59:59 local ou UTC conforme a necessidade do servidor.
        // O servidor geralmente espera ISO. New Date(val) em 'YYYY-MM-DD' assume UTC ou Local dependendo do browser.
        // Vamos ser explicitos para evitar confusão de fuso.
        return isEnd ? `${val}T23:59:59.999Z` : `${val}T00:00:00.000Z`;
      }
      // datetime-local ("YYYY-MM-DDTHH:mm")
      return new Date(val).toISOString();
    };
    fetchMetrics(toISO(startDate, false), toISO(endDate, true));
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    fetchMetrics();
  };

  const handleFilterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") applyFilter();
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-white">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080C14]">
        <Card className="w-full max-w-md bg-[#0F172A] border-white/10 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Dashboard Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Usuário</label>
                <Input
                  className="bg-background/50 border-white/20 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu usuário"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <Input
                  type="password"
                  className="bg-background/50 border-white/20 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-[#080C14] hover:bg-primary/90 font-bold">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#D49A00]">
            Analytics Overview
          </h1>
          {/* Barra de Filtros */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            {/* Toggle modo data / data+hora */}
            <div className="flex rounded-lg overflow-hidden border border-white/10 text-xs shrink-0">
              <button
                className={`px-3 py-1.5 transition-colors ${
                  filterMode === "date" ? "bg-primary text-[#080C14] font-bold" : "bg-[#0F172A] text-gray-400 hover:text-white"
                }`}
                onClick={() => setFilterMode("date")}
              >Dia</button>
              <button
                className={`px-3 py-1.5 transition-colors ${
                  filterMode === "datetime" ? "bg-primary text-[#080C14] font-bold" : "bg-[#0F172A] text-gray-400 hover:text-white"
                }`}
                onClick={() => setFilterMode("datetime")}
              >Dia + Hora</button>
            </div>

            <input
              type={filterMode === "date" ? "date" : "datetime-local"}
              className="bg-[#0F172A] border border-white/10 rounded-md text-white text-xs h-9 px-3 w-[150px] sm:w-[180px] focus:outline-none focus:border-primary/50"
              value={startDate}
              placeholder="De"
              onChange={(e) => setStartDate(e.target.value)}
              onKeyDown={handleFilterKeyDown}
            />
            <span className="text-xs text-gray-400 hidden sm:inline">até</span>
            <input
              type={filterMode === "date" ? "date" : "datetime-local"}
              className="bg-[#0F172A] border border-white/10 rounded-md text-white text-xs h-9 px-3 w-[150px] sm:w-[180px] focus:outline-none focus:border-primary/50"
              value={endDate}
              placeholder="Até"
              onChange={(e) => setEndDate(e.target.value)}
              onKeyDown={handleFilterKeyDown}
            />

            <Button
              size="sm"
              className="bg-primary text-[#080C14] hover:bg-primary/90 font-bold h-9 px-4 shrink-0"
              onClick={applyFilter}
            >
              Aplicar
            </Button>

            {(startDate || endDate) && (
              <Button
                size="sm"
                variant="outline"
                className="border-white/10 hover:bg-white/5 text-gray-400 h-9 px-3 shrink-0"
                onClick={clearFilter}
              >
                ✕ Limpar
              </Button>
            )}

            <Button variant="outline" onClick={handleLogout} className="border-white/10 hover:bg-white/5 h-9 w-full sm:w-auto shrink-0">
              <LogOut className="h-4 w-4 mr-2" /> <span>Sair</span>
            </Button>
          </div>
        </div>

        {metrics && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[#0F172A] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Total de Visitas</CardTitle>
                  <Activity className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{metrics.totalVisits}</div>
                  <p className="text-xs text-gray-500 mt-1">Acessos registrados</p>
                </CardContent>
              </Card>
              
              <Card className="bg-[#0F172A] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Visitantes Únicos</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{metrics.uniqueVisits}</div>
                  <p className="text-xs text-gray-500 mt-1">Baseado em sessões</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0F172A] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Cliques no WhatsApp</CardTitle>
                  <MousePointerClick className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{metrics.totalClicks}</div>
                  <p className="text-xs text-gray-500 mt-1">Total de conversões</p>
                </CardContent>
              </Card>

              <Card className="bg-[#0F172A] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Taxa de Clique (CTR)</CardTitle>
                  <Percent className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">{metrics.ctr}%</div>
                  <p className="text-xs text-gray-500 mt-1">Visitantes vs Cliques</p>
                </CardContent>
              </Card>
            </div>

            {/* Card: Tempo Médio de Permanência */}
            {metrics.avgTimeOnPage !== undefined && (
              <Card className="bg-[#0F172A] border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">Tempo Médio na Página</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">
                    {metrics.avgTimeOnPage >= 60
                      ? `${Math.floor(metrics.avgTimeOnPage / 60)}m ${metrics.avgTimeOnPage % 60}s`
                      : `${metrics.avgTimeOnPage}s`}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Média por sessão de leitura</p>
                </CardContent>
              </Card>
            )}

            <Card className="bg-[#0F172A] border-white/10 h-[300px] md:h-[400px] flex flex-col p-4 md:p-6">
              <h3 className="text-lg font-medium text-white mb-6">Tráfego e Conversões</h3>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.eventsByDate} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="visits" name="Visitas" stroke="#F5B301" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="clicks" name="Cliques" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Listas Detalhadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Visitas por Página */}
              <Card className="bg-[#0F172A] border-white/10 p-4 md:p-6">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" /> Visitas por Página
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {metrics.pageViewsByPath && Object.entries(metrics.pageViewsByPath)
                    .sort(([, a], [, b]) => b - a)
                    .map(([path, count]) => (
                    <div key={path} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-300 text-sm truncate max-w-[70%]" title={path}>
                        {path === '/' ? '/ (Home)' : path}
                      </span>
                      <span className="bg-primary/20 text-primary font-bold px-3 py-1 rounded-full text-xs">
                        {count} acessos
                      </span>
                    </div>
                  ))}
                  {(!metrics.pageViewsByPath || Object.keys(metrics.pageViewsByPath).length === 0) && (
                    <p className="text-gray-500 text-sm">Nenhum dado de acesso no período.</p>
                  )}
                </div>
              </Card>

              {/* Cliques por Origem */}
              <Card className="bg-[#0F172A] border-white/10 p-4 md:p-6">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                  <MousePointerClick className="h-5 w-5 mr-2 text-emerald-400" /> Origem dos Cliques no WhatsApp
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {metrics.clicksByPath && Object.entries(metrics.clicksByPath)
                    .sort(([, a], [, b]) => b - a)
                    .map(([path, count]) => (
                    <div key={path} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-300 text-sm truncate max-w-[70%]" title={path}>
                        {path.replace('whatsapp_', '').replace(/_/g, ' ').replace('cta', 'Botão ').toUpperCase()}
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1 rounded-full text-xs">
                        {count} cliques
                      </span>
                    </div>
                  ))}
                  {(!metrics.clicksByPath || Object.keys(metrics.clicksByPath).length === 0) && (
                    <p className="text-gray-500 text-sm">Nenhum clique registrado no período.</p>
                  )}
                </div>
              </Card>
            </div>

            {/* Origem do Tráfego */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-[#0F172A] border-white/10 p-4 md:p-6">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-blue-400" /> Origem do Tráfego
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {metrics.referrers && Object.entries(metrics.referrers)
                    .sort(([, a], [, b]) => b - a)
                    .map(([source, count]) => (
                    <div key={source} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-300 text-sm capitalize">{source}</span>
                      <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded-full text-xs">
                        {count} visitas
                      </span>
                    </div>
                  ))}
                  {(!metrics.referrers || Object.keys(metrics.referrers).length === 0) && (
                    <p className="text-gray-500 text-sm">Nenhum dado de origem no período.</p>
                  )}
                </div>
              </Card>

              {/* Profundidade de Leitura */}
              <Card className="bg-[#0F172A] border-white/10 p-4 md:p-6">
                <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-400" /> Leitura dos Artigos
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {metrics.scrollDepthByPath && Object.entries(metrics.scrollDepthByPath)
                    .sort(([, a], [, b]) => b.d100 - a.d100)
                    .map(([path, depth]) => (
                    <div key={path} className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <p className="text-gray-300 text-sm truncate mb-2" title={path}>{path}</p>
                      <div className="flex gap-3">
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">
                          50%: {depth.d50}x
                        </span>
                        <span className="bg-purple-700/30 text-purple-200 px-2 py-0.5 rounded text-xs">
                          100%: {depth.d100}x
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!metrics.scrollDepthByPath || Object.keys(metrics.scrollDepthByPath).length === 0) && (
                    <p className="text-gray-500 text-sm">Nenhum dado de leitura no período.</p>
                  )}
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
