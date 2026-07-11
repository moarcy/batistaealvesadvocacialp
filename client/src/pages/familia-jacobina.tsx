import { motion, Variants } from "framer-motion";
import { trackEvent, startTimeTracking, getReferrer } from "@/lib/analytics";
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
  Heart,
  Home,
  Baby,
  FileHeart,
  Landmark,
  ShieldAlert,
  TrendingUp,
  Briefcase,
  Award
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Wifi, Building2, HelpCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/557499133391";

export default function FamiliaJacobina() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // SEO: Dynamic meta tags for this page
    document.title = "Advogado de Família em Jacobina e Miguel Calmon | Divórcio, Guarda, Pensão | Batista & Alves";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Advogado de família em Jacobina e Miguel Calmon. Especialista em divórcio, guarda de filhos, pensão alimentícia, união estável e inventário. Atendimento presencial em Miguel Calmon e online para toda a região.');
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Advogado de Família em Jacobina e Miguel Calmon | Batista & Alves Advocacia');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', 'Especialista em Direito de Família em Jacobina e Miguel Calmon. Divórcio, guarda, pensão, inventário. Atendimento presencial e online.');
  }, []);

  useEffect(() => {
    // Rastreia referrer na chegada
    trackEvent('pageview', '/direito-de-familia-jacobina-miguel-calmon', { referrer: getReferrer() });
    // Rastreia tempo de permanência
    const cleanup = startTimeTracking('/direito-de-familia-jacobina-miguel-calmon');
    return cleanup;
  }, []);

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
              <Scale className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <span className="text-base md:text-xl font-bold text-white">Batista & Alves Advocacia</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#areas" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Áreas de Atuação</a>
            <a href="#sobre" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Sobre</a>
            <a href="/guia" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Guia de Direitos</a>
            <a href="#contato" className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">Contato</a>
            <Button
              className="bg-primary text-background hover:bg-primary/90 font-semibold rounded-full px-6 shadow-[0_4px_14px_rgba(245,179,1,0.2)]"
              onClick={() => {
                trackEvent('click', 'whatsapp_header_desktop');
                window.open(WHATSAPP_LINK, "_blank");
              }}
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
            <a href="/guia" className="text-lg font-medium text-gray-300" onClick={() => setIsMenuOpen(false)}>Guia de Direitos</a>
            <a href="#contato" className="text-lg font-medium text-gray-300" onClick={() => setIsMenuOpen(false)}>Contato</a>
            <Button
              className="w-full bg-primary text-background font-bold mt-2"
              onClick={() => {
                trackEvent('click', 'whatsapp_header_mobile');
                window.open(WHATSAPP_LINK, "_blank");
              }}
            >
              Falar no WhatsApp
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
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
                <span className="text-primary font-semibold tracking-wide text-sm uppercase">Atendimento em Jacobina e Miguel Calmon – BA</span>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
                  Advogado de Família em Jacobina e Miguel Calmon – Especialista em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCCA3F] via-[#F5B301] to-[#D49A00] animate-shimmer">Direito de Família</span>
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl border-l-2 border-primary/30 pl-4 sm:pl-6">
                  Passando por um divórcio? Precisa resolver a guarda dos filhos ou a pensão alimentícia? Sabemos que essas situações são difíceis e mexem com toda a família. Estamos aqui para te ajudar com respeito, clareza e sem complicação. Escritório em Miguel Calmon, com atendimento online para Jacobina e toda a região.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-primary text-[#080C14] hover:bg-[#D49A00] font-bold text-base sm:text-lg h-14 sm:h-16 px-6 sm:px-10 rounded-full shadow-[0_0_40px_rgba(245,179,1,0.3)] hover:shadow-[0_0_60px_rgba(245,179,1,0.5)] hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto"
                  onClick={() => {
                    trackEvent('click', 'whatsapp_hero');
                    window.open(WHATSAPP_LINK, "_blank");
                  }}
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
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>Atendimento presencial em Miguel Calmon</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Wifi className="h-4 w-4 text-primary" />
                  <span>Atendimento online para Jacobina e região</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Sigilo garantido</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Escritório Especializado</span>
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
                    <p className="text-gray-400 text-xs md:text-sm whitespace-nowrap">Direito de Família</p>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full relative z-20 items-end">
                {/* Dr. Felipe Alves */}
                <div className="relative group bg-[#0F172A] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 shadow-2xl h-[260px] sm:h-[380px] lg:h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent opacity-90 z-10" />
                  <img
                    src="/team/advogado-felipe-alves.jpeg"
                    alt="Dr. Felipe Alves"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 z-20">
                    <h3 className="text-base sm:text-2xl font-bold text-white mb-1 drop-shadow-md">Dr. Felipe Alves</h3>
                    <div className="h-1 w-8 sm:w-12 bg-primary rounded-full" />
                  </div>
                </div>

                {/* Dr. Hugo Batista */}
                <div className="relative group bg-[#0F172A] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/10 hover:border-primary/30 transition-all duration-500 shadow-2xl h-[260px] sm:h-[380px] lg:h-[450px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent opacity-90 z-10" />
                  <img
                    src="/team/advogado-hugo.jpeg"
                    alt="Dr. Hugo Batista"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 z-20">
                    <h3 className="text-base sm:text-2xl font-bold text-white mb-1 drop-shadow-md">Dr. Hugo Batista</h3>
                    <div className="h-1 w-8 sm:w-12 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Areas de Atuação - Bento Grid Redesign */}
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
              Como Podemos <br />
              <span className="text-primary">Te Ajudar?</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Veja abaixo os problemas que mais atendemos. Se o seu caso está aqui, podemos te orientar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
            {[
              {
                title: "Divórcio",
                desc: "Quer se separar mas não sabe por onde começar? Cuidamos de tudo — consensual ou litigioso, em cartório ou na justiça.",
                icon: FileHeart,
                className: "lg:col-span-2",
                gradient: "from-blue-500/20 to-purple-500/20"
              },
              {
                title: "Pensão alimentícia",
                desc: "Precisa pedir, aumentar, diminuir ou cobrar pensão? Orientamos você sobre valores justos e seus direitos.",
                icon: Heart,
                className: "",
                gradient: "from-emerald-500/20 to-teal-500/20"
              },
              {
                title: "Guarda dos filhos",
                desc: "Quem fica com as crianças? Lutamos para garantir o melhor para os seus filhos, com respeito e sensibilidade.",
                icon: Baby,
                className: "md:row-span-2",
                gradient: "from-orange-500/20 to-red-500/20"
              },
              {
                title: "Direito de visita",
                desc: "Quer ver seu filho com mais frequência ou definir os dias certinhos? Ajudamos a organizar isso legalmente.",
                icon: Clock,
                className: "",
                gradient: "from-pink-500/20 to-rose-500/20"
              },
              {
                title: "União estável",
                desc: "Moram juntos mas não casaram no papel? Você tem direitos. Podemos reconhecer ou dissolver a união.",
                icon: Home,
                className: "",
                gradient: "from-indigo-500/20 to-cyan-500/20"
              },
              {
                title: "Paternidade",
                desc: "O pai não reconheceu o filho? Ou quer comprovar que é o pai? Conduzimos todo o processo para você.",
                icon: Users,
                className: "md:col-span-2 lg:col-span-2",
                gradient: "from-violet-500/20 to-fuchsia-500/20"
              },
              {
                title: "Inventário e herança",
                desc: "Alguém da família faleceu e precisa dividir os bens? Resolvemos o inventário com segurança, evitando brigas.",
                icon: Landmark,
                className: "",
                gradient: "from-primary/20 to-yellow-500/20"
              },
              {
                title: "Violência doméstica",
                desc: "Se você está em perigo, podemos agir rápido para conseguir medida protetiva e garantir sua segurança e dos seus filhos.",
                icon: ShieldAlert,
                className: "md:col-span-2 lg:col-span-3",
                gradient: "from-red-500/20 to-orange-500/20"
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
            Não encontrou o seu caso aqui? Fale com a gente. Cada família é diferente e atendemos cada situação com atenção.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#0B1220] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#F5B301 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mx-auto">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold text-sm uppercase">Perguntas Frequentes</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Dúvidas Sobre <span className="text-primary">Direito de Família?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Reunimos as perguntas mais comuns de quem está passando por questões familiares em Jacobina e Miguel Calmon.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Quanto custa um advogado de família em Jacobina ou Miguel Calmon?",
                a: "Os honorários variam conforme a complexidade do caso (divórcio consensual, por exemplo, é mais simples que uma disputa de guarda). Oferecemos uma primeira conversa para entender sua situação, com valores acessíveis e possibilidade de parcelamento. Fale conosco pelo WhatsApp para saber mais."
              },
              {
                q: "Preciso ir presencialmente ao escritório?",
                a: "Nosso escritório fica em Miguel Calmon, com atendimento presencial. Se você está em Jacobina ou em outras cidades da região, também realizamos atendimento por videochamada (WhatsApp ou Google Meet) com total segurança jurídica. Você escolhe o que for mais prático."
              },
              {
                q: "Quanto tempo demora um divórcio?",
                a: "Depende do tipo. O divórcio consensual (quando ambos concordam) pode ser feito em cartório e resolvido em poucos dias. Já o litigioso (quando há discordância) tramita na justiça e pode levar de alguns meses a mais de um ano, dependendo do caso."
              },
              {
                q: "Como funciona a pensão alimentícia?",
                a: "A pensão é calculada com base nas necessidades de quem recebe (geralmente os filhos) e nas possibilidades de quem paga. Pode ser definida por acordo entre as partes ou por decisão judicial. Se o valor atual está inadequado, é possível pedir revisão."
              },
              {
                q: "Posso pedir a guarda do meu filho?",
                a: "Sim. A guarda pode ser unilateral ou compartilhada. A Justiça sempre prioriza o melhor interesse da criança. Avaliamos sua situação e orientamos sobre a melhor estratégia para proteger o seu direito de convivência."
              },
              {
                q: "Meu marido/esposa não quer assinar o divórcio. O que eu faço?",
                a: "Você não precisa da autorização do outro para se divorciar. Quando não há acordo, ingressamos com o divórcio litigioso na justiça. O processo segue normalmente mesmo sem o consentimento da outra parte."
              },
              {
                q: "O que é união estável e quais são meus direitos?",
                a: "A união estável é quando duas pessoas vivem juntas como casal, sem casamento formal. Ela gera direitos como partilha de bens, pensão e herança. Podemos regularizar ou dissolver a união estável com segurança jurídica."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left bg-[#0F172A] border border-white/5 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{item.q}</h3>
                    <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-gray-400 mt-4 leading-relaxed text-base"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">Ainda tem dúvidas? Fale diretamente com um advogado.</p>
            <Button
              className="bg-primary text-[#080C14] hover:bg-[#D49A00] font-bold h-12 px-8 rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300"
              onClick={() => {
                trackEvent('click', 'whatsapp_faq');
                window.open(WHATSAPP_LINK, "_blank");
              }}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Tirar minha dúvida no WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Direitos - Asymmetrical Layout */}
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
                Está Passando por Uma <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#D49A00]">Situação Difícil na Família?</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Não precisa enfrentar isso sozinho. Quanto antes procurar orientação, mais rápido a gente encontra uma saída — e muitas vezes sem precisar ir pra justiça.
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

                  <h3 className="text-2xl font-bold text-white mb-4">Conte o Seu Caso</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    Escutamos sua situação, explicamos seus direitos de forma clara e mostramos o melhor caminho — sem compromisso.
                  </p>

                  <Button
                    className="w-full bg-primary text-[#080C14] hover:bg-[#D49A00] font-bold h-12 rounded-xl text-base shadow-lg shadow-primary/10 hover:shadow-primary/30 transition-all duration-300"
                    onClick={() => {
                      trackEvent('click', 'whatsapp_direitos');
                      window.open(WHATSAPP_LINK, "_blank");
                    }}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Conversar pelo WhatsApp
                  </Button>
                </div>
              </motion.div>

              {/* Rights List */}
              <div className="lg:col-span-7 grid gap-4">
                {[
                  { label: "Divórcio e divisão de bens", desc: "Quem fica com o quê? A gente resolve isso da forma mais justa." },
                  { label: "Guarda dos filhos", desc: "Garantimos que as crianças fiquem protegidas e com quem cuida de verdade." },
                  { label: "Pensão alimentícia", desc: "Pedimos ou revisamos o valor para que seja justo pra todo mundo." },
                  { label: "União estável", desc: "Morou junto? Tem direitos sim. A gente explica tudo." },
                  { label: "Reconhecimento de paternidade", desc: "O pai precisa ser responsável. A gente entra com o processo." },
                  { label: "Inventário e herança", desc: "Resolvemos a parte burocrática para evitar conflito entre a família." }
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

      {/* Processo - Advanced Timeline */}
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Como Funciona o Atendimento?</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central Glowing Line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 md:-translate-x-1/2 shadow-[0_0_15px_rgba(245,179,1,0.4)]" />

            <div className="space-y-12 md:space-y-20">
              {[
                {
                  title: "Você nos conta o que está acontecendo",
                  desc: "Pode ser pelo WhatsApp, por ligação ou presencialmente em Miguel Calmon. A gente escuta sem julgamento.",
                  icon: FileText
                },
                {
                  title: "Explicamos seus direitos e opções",
                  desc: "Sem linguagem complicada. Você vai entender exatamente o que pode fazer e qual o melhor caminho.",
                  icon: TrendingUp
                },
                {
                  title: "Tentamos resolver sem briga",
                  desc: "Sempre que possível, buscamos acordo. É mais rápido, mais barato e menos desgastante pra todos — especialmente pras crianças.",
                  icon: Users
                },
                {
                  title: "Se precisar, vamos pra justiça",
                  desc: "Quando não tem acordo, entramos com a ação necessária e lutamos pelos seus direitos com toda a força.",
                  icon: Briefcase
                },
                {
                  title: "Ficamos com você até o final",
                  desc: "Nada de te deixar sem resposta. Você vai saber de cada passo do processo e pode nos ligar sempre que precisar.",
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

      {/* Por Que Escolher - Feature Grid */}
      <section id="sobre" className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Por Que as Pessoas <br />
              <span className="text-primary">Nos Escolhem?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Sabemos que contratar um advogado é uma decisão importante. Por isso, fazemos questão de ser diferentes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "A gente escuta de verdade",
                desc: "Antes de falar de processo, queremos entender o que você está sentindo e passando. Cada família tem sua história."
              },
              {
                icon: Scale,
                title: "Solução feita pra você",
                desc: "Não existe receita pronta. Pensamos no melhor caminho para a sua situação específica."
              },
              {
                icon: MessageCircle,
                title: "Falamos de um jeito que você entende",
                desc: "Nada de linguagem difícil. Explicamos tudo de forma clara, passo a passo, sem enrolação."
              },
              {
                icon: ShieldCheck,
                title: "Preço justo e transparente",
                desc: "Você sabe quanto vai pagar desde o primeiro contato. Sem surpresas, com possibilidade de parcelar."
              },
              {
                icon: Users,
                title: "Você fala direto com o advogado",
                desc: "Nada de ser atendido por estagiário ou secretária. Quem cuida do seu caso é quem te atende."
              },
              {
                icon: FileText,
                title: "Ninguém fica sabendo",
                desc: "Tudo que você nos contar fica entre nós. Sigilo total, pode confiar."
              },
              {
                icon: Clock,
                title: "Resolvemos rápido",
                desc: "Sabemos que você quer resolver logo. Agimos com agilidade em cada etapa do processo.",
                className: "md:col-span-2 lg:col-span-3"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`group ${item.className || ""}`}
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

      {/* Atendimento Rápido Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#D49A00]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#080C14] mb-6">Não Deixe Pra Depois</h2>
            <p className="text-[#080C14]/80 font-medium text-lg mb-8">
              Problemas de família só pioram quando a gente adia. Quanto antes você procurar ajuda, mais rápido e mais barato tudo se resolve. Fale com a gente agora — é rápido e sem compromisso.
            </p>
            <Button
              size="lg"
              className="bg-[#080C14] text-white hover:bg-black/80 font-bold text-lg h-14 px-10 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
              onClick={() => {
                trackEvent('click', 'whatsapp_atendimento_rapido');
                window.open(WHATSAPP_LINK, "_blank");
              }}
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Escritório de Advocacia Especializado em Direito de Família</h2>
            <p className="text-gray-400 text-lg mb-6">
              O Batista & Alves Advocacia presta atendimento jurídico especializado em Direito de Família para clientes de Jacobina, Miguel Calmon e toda a região do Piemonte da Diamantina.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300">
                <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-2">Atendimento Presencial</h3>
                <p className="text-gray-400 text-sm">Escritório em Miguel Calmon – BA, com atendimento presencial e acolhedor.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300">
                <Wifi className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="text-white font-bold text-lg mb-2">Atendimento Online</h3>
                <p className="text-gray-400 text-sm">Para clientes de Jacobina e toda a Bahia, com praticidade, agilidade e segurança jurídica.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contato" className="py-24 bg-[#111827] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Fale com um Advogado de Família em Jacobina ou Miguel Calmon</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Proteja seus direitos e os interesses da sua família com orientação jurídica especializada.
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
            onClick={() => {
              trackEvent('click', 'whatsapp_footer_cta');
              window.open(WHATSAPP_LINK, "_blank");
            }}
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
                Advocacia especializada em Direito de Família em Jacobina e Miguel Calmon. Compromisso com ética, discrição, segurança jurídica e atendimento humanizado.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Navegação</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#areas" className="hover:text-primary transition-colors">Áreas de Atuação</a></li>
                <li><a href="#sobre" className="hover:text-primary transition-colors">Sobre o Escritório</a></li>
                <li><a href="/guia" className="hover:text-primary transition-colors">Guia Jurídico</a></li>
                <li><a href="#contato" className="hover:text-primary transition-colors">Entre em Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contato</h4>
              <ul className="space-y-4 text-gray-500">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Jacobina e Miguel Calmon – BA
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  (74) 99133-3391
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
