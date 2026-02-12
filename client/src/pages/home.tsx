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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0B1220_0%,#111827_100%)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,179,1,0.08),transparent_40%)] z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Atendimento em Salvador – BA
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  Advogado Trabalhista em Salvador – Especialista em <span className="text-primary">Direito do Trabalho</span>
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  Se você precisa de um advogado trabalhista em Salvador, é fundamental contar com atuação técnica, estratégica e focada em resultados reais. O Batista & Alves Advocacia atua na defesa dos direitos do trabalhador, conduzindo ações trabalhistas com análise criteriosa, fundamentação sólida e estratégia processual adequada ao seu caso.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary text-background hover:bg-primary/90 font-bold text-base h-14 px-8 rounded-full shadow-[0_8px_24px_rgba(245,179,1,0.25)] hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar com um advogado agora
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-6 text-sm text-gray-500 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Atendimento rápido</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Resposta técnica</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Sigilo garantido</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Foto Felipe Alves - Centralizada no rosto */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-40 z-10" />
                  <img
                    src="/team/advogado-felipe-alves.jpeg"
                    alt="Dr. Felipe Alves - Advogado Trabalhista"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" style={{ objectPosition: "center 20%" }}
                  />
                </div>

                {/* Foto Hugo */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-40 z-10" />
                  <img
                    src="/team/advogado-hugo.jpeg"
                    alt="Dr. Hugo - Advogado Trabalhista"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card border border-white/10 p-4 rounded-xl shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Escritório Especializado</p>
                    <p className="text-xs text-gray-400">Direito Trabalhista em Salvador</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Escritório Especializado Section */}
      <section id="areas" className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Escritório Especializado em Ação Trabalhista em Salvador</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full mt-6" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-gray-400 text-lg max-w-3xl mx-auto"
            >
              Atuamos em todas as fases da reclamação trabalhista, desde a análise inicial até a execução de sentença.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "Reclamação trabalhista por verbas rescisórias",
              "Cobrança de horas extras",
              "Adicional noturno",
              "Insalubridade e periculosidade",
              "Reconhecimento de vínculo empregatício",
              "Reversão de justa causa",
              "Indenização por assédio moral"
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative bg-card border border-white/5 p-6 rounded-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(245,179,1,0.15)]"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary font-bold text-lg">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <p className="text-gray-200 leading-relaxed font-medium">{service}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center text-gray-400 text-lg"
          >
            Cada caso é avaliado com base na legislação atualizada e jurisprudência dos Tribunais do Trabalho.
          </motion.p>
        </div>
      </section>

      {/* Fui Demitido Section */}
      <section className="py-24 bg-gradient-to-br from-card via-card to-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            >
              Fui Demitido em Salvador. Quais São Meus Direitos?
            </motion.h2>

            <div className="grid lg:grid-cols-5 gap-8 items-center">
              {/* Left highlight box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="lg:col-span-2"
              >
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 p-8 rounded-2xl sticky top-24">
                  <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                    <Scale className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Auditoria Completa</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Realizamos auditoria completa da rescisão para identificar valores não pagos corretamente.
                  </p>
                  <Button
                    className="w-full bg-primary text-background hover:bg-primary/90 font-bold"
                    onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Solicitar Análise
                  </Button>
                </div>
              </motion.div>

              {/* Rights list */}
              <div className="lg:col-span-3">
                <p className="text-gray-400 text-lg mb-6">
                  Ao ser demitido, o trabalhador pode ter direito a:
                </p>
                <div className="grid gap-4">
                  {[
                    "Saldo de salário",
                    "Aviso prévio",
                    "Férias + 1/3",
                    "13º salário proporcional",
                    "FGTS + multa de 40%",
                    "Seguro-desemprego"
                  ].map((right, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="group flex items-center gap-4 bg-background/50 backdrop-blur-sm p-5 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-background/80 transition-all duration-300"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-gray-200 font-semibold text-lg">{right}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo Trabalhista Section */}
      <section className="py-24 bg-[#0B1220] relative overflow-hidden">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,179,1,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,179,1,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Processo Trabalhista em Salvador: Como Funciona?</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block" />

              <div className="space-y-8">
                {[
                  {
                    title: "Análise Inicial",
                    description: "Avaliação detalhada de documentos e histórico contratual.",
                    icon: FileText
                  },
                  {
                    title: "Cálculo de Valores",
                    description: "Apuração técnica das verbas devidas.",
                    icon: TrendingUp
                  },
                  {
                    title: "Protocolo da Ação",
                    description: "Distribuição da reclamação trabalhista perante a Justiça do Trabalho em Salvador.",
                    icon: Briefcase
                  },
                  {
                    title: "Audiência e Instrução",
                    description: "Atuação estratégica na produção de provas e sustentação jurídica.",
                    icon: Users
                  },
                  {
                    title: "Execução",
                    description: "Cobrança efetiva após decisão favorável.",
                    icon: Award
                  }
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                    className="relative flex gap-6 items-start group"
                  >
                    {/* Timeline dot */}
                    <div className="relative z-10 hidden md:block">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-[0_0_30px_rgba(245,179,1,0.3)] group-hover:shadow-[0_0_40px_rgba(245,179,1,0.5)] transition-all duration-300">
                        <step.icon className="h-7 w-7 text-background" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 bg-gradient-to-br from-card to-card/50 border border-white/10 p-6 md:p-8 rounded-2xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,179,1,0.1)]">
                      <div className="flex items-start gap-4 md:hidden mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                          <step.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">{step.title}</h3>
                        <span className="text-primary/40 font-bold text-3xl hidden md:block">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-lg">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que Escolher Section */}
      <section id="sobre" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Por Que Escolher um Advogado Trabalhista Especialista?</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Direito do Trabalho exige conhecimento técnico específico, domínio de prazos processuais e experiência prática.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Card className="bg-background border-white/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 h-full group">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <item.icon className="h-6 w-6 text-primary group-hover:text-background transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atendimento Rápido Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Atendimento Rápido e Seguro</h2>
            <p className="text-gray-400 text-lg mb-8">
              Se houve descumprimento da legislação trabalhista, o tempo é fator relevante. Entre em contato para análise do seu caso e orientação precisa sobre seus direitos.
            </p>
            <Button
              size="lg"
              className="bg-primary text-background hover:bg-primary/90 font-bold text-lg h-14 px-10 rounded-full shadow-[0_8px_24px_rgba(245,179,1,0.25)] hover:scale-105 transition-all duration-300"
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com um advogado agora
            </Button>
          </div>
        </div>
      </section>

      {/* Escritório com Atuação Estratégica */}
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

