import { motion, Variants } from "framer-motion";
import {
  Scale,
  Users,
  MapPin,
  MessageCircle,
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Briefcase,
  TrendingUp,
  Award
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WHATSAPP_LINK = "https://wa.me/5574999443002";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-white">Batista & Alves Advocacia</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#areas" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Áreas de Atuação</a>
            <a href="#sobre" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Sobre</a>
            <a href="#contato" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Contato</a>
            <Button
              className="bg-primary text-background hover:bg-primary/90 font-semibold rounded-full px-6 shadow-[0_4px_14px_rgba(245,179,1,0.2)]"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              Falar no WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-card border-b border-white/5 p-6 flex flex-col gap-4 absolute w-full"
          >
            <a href="#areas" className="text-lg font-medium text-gray-300" onClick={() => setIsMenuOpen(false)}>Áreas de Atuação</a>
            <a href="#sobre" className="text-lg font-medium text-gray-300" onClick={() => setIsMenuOpen(false)}>Sobre</a>
            <a href="#contato" className="text-lg font-medium text-gray-300" onClick={() => setIsMenuOpen(false)}>Contato</a>
            <Button
              className="w-full bg-primary text-background font-bold mt-2"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              Falar no WhatsApp
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Premium Design with Original Copy */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-20 overflow-hidden font-sans">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[#080C14] z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-glow delay-1000" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            {/* Content Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 relative"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-primary font-semibold tracking-wide text-sm uppercase">Atendimento em Salvador – BA</span>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  Advogado Trabalhista em Salvador – Especialista em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCCA3F] via-[#F5B301] to-[#D49A00] animate-shimmer">Direito do Trabalho</span>
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl border-l-2 border-primary/30 pl-6">
                  Se você precisa de um advogado trabalhista em Salvador, é fundamental contar com atuação técnica, estratégica e focada em resultados reais. O Batista & Alves Advocacia atua na defesa dos direitos do trabalhador, conduzindo ações trabalhistas com análise criteriosa, fundamentação sólida e estratégia processual adequada ao seu caso.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 pt-4">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-primary text-[#080C14] hover:bg-[#D49A00] font-bold text-lg h-16 px-10 rounded-full shadow-[0_0_40px_rgba(245,179,1,0.3)] hover:shadow-[0_0_60px_rgba(245,179,1,0.5)] hover:-translate-y-1 transition-all duration-300 group"
                  onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 fill-current" />
                    Falar com um advogado agora
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Atendimento rápido</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Resposta técnica</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Sigilo garantido</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Column - Equal Partners Side by Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative w-full mb-20 md:mb-32"
            >
              {/* RESTORED: Background Glow for Premium Feel */}
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30 animate-pulse-glow" />

              {/* Floating Badge */}
              {/* Floating Badge */}
              <div className="absolute -bottom-20 md:-bottom-28 left-0 right-0 flex justify-center z-30 pointer-events-none">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="glass px-4 py-3 md:px-6 md:py-4 rounded-2xl border-l-4 border-primary shadow-2xl pointer-events-auto flex items-center gap-3 backdrop-blur-md bg-[#0F172A]/80 w-[90%] md:w-auto mx-auto"
                >
                  <div className="bg-primary/20 p-2 md:p-3 rounded-full shrink-0">
                    <ShieldCheck className="text-primary h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-base md:text-lg whitespace-nowrap">Escritório Especializado</p>
                    <p className="text-gray-400 text-xs md:text-sm whitespace-nowrap">Direito Trabalhista</p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-6 w-full relative z-20 items-end">
                {/* Dr. Felipe Alves */}
                <div className="relative group bg-[#0F172A] rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 shadow-2xl h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent opacity-90 z-10" />
                  <img
                    src="/team/advogado-felipe-alves.jpeg"
                    alt="Dr. Felipe Alves"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">Dr. Felipe Alves</h3>
                    <div className="h-1 w-12 bg-primary rounded-full" />
                  </div>
                </div>

                {/* Dr. Hugo Batista */}
                <div className="relative group bg-[#0F172A] rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 shadow-2xl h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent opacity-90 z-10" />
                  <img
                    src="/team/advogado-hugo.jpeg"
                    alt="Dr. Hugo Batista"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">Dr. Hugo Batista</h3>
                    <div className="h-1 w-12 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Areas de Atuação - Bento Grid Redesign with Original Copy */}
      <section id="areas" className="py-24 bg-[#0B1220] relative overflow-hidden">
        {/* Decorative Background - Hex Pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#F5B301 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Escritório Especializado em <br />
              <span className="text-primary">Ação Trabalhista em Salvador</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Atuamos em todas as fases da reclamação trabalhista, desde a análise inicial até a execução de sentença.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
            {[
              {
                title: "Reclamação trabalhista por verbas rescisórias",
                desc: "Recuperação integral de valores não pagos na demissão.",
                icon: FileText,
                className: "lg:col-span-2",
                gradient: "from-blue-500/20 to-purple-500/20"
              },
              {
                title: "Cobrança de horas extras",
                desc: "Cálculo e cobrança de todo o tempo trabalhado além da jornada.",
                icon: Clock,
                className: "",
                gradient: "from-emerald-500/20 to-teal-500/20"
              },
              {
                title: "Adicional noturno",
                desc: "Garantia do acréscimo salarial para trabalho noturno.",
                icon: TrendingUp,
                className: "md:row-span-2",
                gradient: "from-orange-500/20 to-red-500/20"
              },
              {
                title: "Insalubridade e periculosidade",
                desc: "Adicionais devidos por exposição a agentes nocivos ou perigo.",
                icon: ShieldCheck,
                className: "",
                gradient: "from-pink-500/20 to-rose-500/20"
              },
              {
                title: "Reconhecimento de vínculo empregatício",
                desc: "Formalização do trabalho sem carteira assinada.",
                icon: Users,
                className: "",
                gradient: "from-indigo-500/20 to-cyan-500/20"
              },
              {
                title: "Reversão de justa causa",
                desc: "Anulação de demissão por justa causa indevida.",
                icon: Scale,
                className: "md:col-span-2 lg:col-span-2",
                gradient: "from-violet-500/20 to-fuchsia-500/20"
              },
              {
                title: "Indenização por assédio moral",
                desc: "Reparação por danos morais e assédio no ambiente de trabalho.",
                icon: MessageCircle,
                className: "",
                gradient: "from-primary/20 to-yellow-500/20"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0F172A] p-8 hover:border-primary/30 transition-all duration-500 shadow-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${item.className}`}>

                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/20 transition-colors duration-500">
                      <item.icon className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <ChevronRight className="text-primary h-6 w-6" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-400 text-lg mt-12"
          >
            Cada caso é avaliado com base na legislação atualizada e jurisprudência dos Tribunais do Trabalho.
          </motion.p>
        </div>
      </section>

      {/* Direitos - Asymmetrical Layout with Original Copy */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Diagonal Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-[#1E293B] z-0" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Fui Demitido em Salvador. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#D49A00]">Quais São Meus Direitos?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Muitas rescisões contêm erros de cálculo que prejudicam o trabalhador.
                Identificamos cada centavo que a empresa deixou de pagar.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Sticky Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="lg:col-span-5 sticky top-32"
              >
                <div className="glass-card p-8 rounded-3xl border border-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-all duration-500" />

                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-[#D49A00] flex items-center justify-center mb-8 shadow-lg shadow-primary/20">
                    <Scale className="h-8 w-8 text-[#080C14]" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">Auditoria Completa</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    Realizamos auditoria completa da rescisão para identificar valores não pagos corretamente.
                  </p>

                  <Button
                    className="w-full bg-primary text-[#080C14] hover:bg-[#D49A00] font-bold h-12 rounded-xl text-base shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300"
                    onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Solicitar Análise
                  </Button>
                </div>
              </motion.div>

              {/* Rights List */}
              <div className="lg:col-span-7 grid gap-4">
                {[
                  { label: "Saldo de salário", desc: "Dias trabalhados no mês da demissão." },
                  { label: "Aviso prévio", desc: "Indenizado ou trabalhado, com proporcionalidade por tempo de serviço." },
                  { label: "Férias + 1/3", desc: "Vencidas e proporcionais, sempre com o terço constitucional." },
                  { label: "13º salário proporcional", desc: "Calculado com base nos meses trabalhados no ano." },
                  { label: "FGTS + multa de 40%", desc: "Liberação do fundo e multa rescisória." },
                  { label: "Seguro-desemprego", desc: "Guia para habilitação no benefício." }
                ].map((right, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 flex items-center gap-5"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-white font-bold text-lg block mb-1">{right.label}</span>
                      <span className="text-gray-400 text-sm">{right.desc}</span>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-gray-600 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo Trabalhista - Advanced Timeline with Original Copy */}
      <section className="py-32 bg-[#080C14] relative overflow-hidden">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,179,1,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,179,1,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Processo Trabalhista em Salvador: Como Funciona?</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Glowing Line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 md:-translate-x-1/2 shadow-[0_0_15px_rgba(245,179,1,0.4)]" />

            <div className="space-y-12 md:space-y-20">
              {[
                {
                  title: "Análise Inicial",
                  desc: "Avaliação detalhada de documentos e histórico contratual.",
                  icon: FileText
                },
                {
                  title: "Cálculo de Valores",
                  desc: "Apuração técnica das verbas devidas.",
                  icon: TrendingUp
                },
                {
                  title: "Protocolo da Ação",
                  desc: "Distribuição da reclamação trabalhista perante a Justiça do Trabalho em Salvador.",
                  icon: Briefcase
                },
                {
                  title: "Audiência e Instrução",
                  desc: "Atuação estratégica na produção de provas e sustentação jurídica.",
                  icon: Users
                },
                {
                  title: "Execução",
                  desc: "Cobrança efetiva após decisão favorável.",
                  icon: Award
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex items-center md:items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(245,179,1,1)]" />
                    <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
                  </div>

                  {/* Empty spacer for desktop alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:transform hover:scale-105 group">
                      <div className={`mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-lg shadow-primary/10 ${i % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                        } ${i % 2 === 0 ? "float-right" : "float-left"} md:float-none`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="clear-both" />

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 leading-relaxed text-sm md:text-base">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por Que Escolher - Feature Grid with Original Copy */}
      <section id="sobre" className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Por Que Escolher um <br />
              <span className="text-primary">Advogado Trabalhista Especialista?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Direito do Trabalho exige conhecimento técnico específico, domínio de prazos processuais e experiência prática.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                title: "Estratégia jurídica individualizada",
                desc: "Cada caso é único e merece análise personalizada para maximizar resultados."
              },
              {
                icon: MessageCircle,
                title: "Comunicação objetiva",
                desc: "Linguagem clara e acompanhamento constante em todas as etapas do processo."
              },
              {
                icon: ShieldCheck,
                title: "Transparência nos honorários",
                desc: "Valores claros desde o início, sem surpresas ao longo do processo."
              },
              {
                icon: Users,
                title: "Atendimento direto com advogado",
                desc: "Você será atendido diretamente por advogados especializados, não por estagiários."
              },
              {
                icon: FileText,
                title: "Sigilo absoluto",
                desc: "Suas informações e seu caso são tratados com total confidencialidade."
              },
              {
                icon: Clock,
                title: "Agilidade processual",
                desc: "Atuação focada em resultados rápidos dentro dos prazos legais."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl hover:bg-[#1E293B] hover:border-primary/30 transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <item.icon className="h-24 w-24 text-primary rotate-12" />
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atendimento Rápido Section - RESTORED PREMIUM GOLD DESIGN */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#D49A00]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080C14] mb-6">Atendimento Rápido e Seguro</h2>
            <p className="text-[#080C14]/80 font-medium text-lg mb-8">
              Se houve descumprimento da legislação trabalhista, o tempo é fator relevante. Entre em contato para análise do seu caso e orientação precisa sobre seus direitos.
            </p>
            <Button
              size="lg"
              className="bg-[#080C14] text-white hover:bg-black/80 font-bold text-lg h-14 px-10 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com um advogado agora
            </Button>
          </div>
        </div>
      </section>

      {/* Escritório com Atuação Estratégica - Restored */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Escritório de Advocacia Trabalhista com Atuação Estratégica</h2>
            <p className="text-gray-400 text-lg mb-6">
              O Batista & Alves Advocacia possui atuação consolidada em Salvador, oferecendo suporte jurídico completo em Direito do Trabalho.
            </p>
            <p className="text-gray-400 text-lg">
              Também realiza atendimento em Miguel Calmon e cidades adjacentes, inclusive de forma virtual.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contato" className="py-24 bg-[#111827] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Fale com um Advogado Trabalhista em Salvador</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Não deixe seus direitos serem ignorados.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Atendimento imediato
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Avaliação personalizada
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Defesa técnica especializada
            </span>
          </div>

          <Button
            size="lg"
            className="bg-primary text-background hover:bg-primary/90 font-bold text-lg h-16 px-10 rounded-full shadow-[0_8px_30px_rgba(245,179,1,0.3)] hover:scale-105 transition-all duration-300"
            onClick={() => window.open(WHATSAPP_LINK, "_blank")}
          >
            Entrar em contato agora
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1220] border-t border-white/5 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <Scale className="h-10 w-10 text-primary" />
                  <span className="text-2xl font-bold text-white">Batista & Alves Advocacia</span>
                </div>
              </div>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Advocacia especializada em Direito Trabalhista em Salvador.
                Compromisso com a ética, agilidade e resultados para nossos clientes.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Navegação</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#areas" className="hover:text-primary transition-colors">Áreas de Atuação</a></li>
                <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre o Escritório</a></li>
                <li><a href="#contato" className="hover:text-primary transition-colors">Entre em Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contato</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Salvador – BA
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  (74) 99944-3002
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-white/5 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Batista & Alves Advocacia. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
