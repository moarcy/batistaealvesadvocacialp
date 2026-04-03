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
import { Activity, Users, MousePointerClick, Percent, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Metrics = {
  uniqueVisits: number;
  totalVisits: number;
  totalClicks: number;
  ctr: string;
  eventsByDate: any[];
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [metrics, setMetrics] = useState<Metrics | null>(null);
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

  const fetchMetrics = async (startDate?: string, endDate?: string) => {
    try {
      let url = "/api/analytics/metrics";
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
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
    <div className="min-h-screen bg-[#080C14] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#D49A00]">
            Analytics Overview
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <Input 
                type="date"
                className="bg-[#0F172A] border-white/10"
                onChange={(e) => fetchMetrics(e.target.value, undefined)}
              />
              <span className="self-center">até</span>
              <Input 
                type="date"
                className="bg-[#0F172A] border-white/10"
                onChange={(e) => fetchMetrics(undefined, e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-white/10 hover:bg-white/5">
              <LogOut className="h-4 w-4 mr-2" /> Sair
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

            <Card className="bg-[#0F172A] border-white/10 h-[400px] flex flex-col p-6">
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
          </>
        )}
      </div>
    </div>
  );
}
