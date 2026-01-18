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
  X
} from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/professional_brazilian_lawyers_in_a_modern_office.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const WHATSAPP_LINK = "https://wa.me/5574999999999"; // Placeholder number

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-white">
              Batista & Alves <span className="text-primary">Advocacia</span>
            </span>
          </div>

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
                  Atendimento em Miguel Calmon – BA
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  Advocacia especializada para proteger seus direitos com <span className="text-primary">confiança</span>.
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  O Batista & Alves Advocacia atua em Direito Previdenciário, Trabalhista e do Consumidor, ajudando clientes a resolver conflitos jurídicos com clareza, ética e proximidade.
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
                  <span>Atendimento humano</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Resposta rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Sigilo garantido</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-60 z-10" />
                <img 
                  src={heroImage} 
                  alt="Advogados Batista & Alves" 
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 lg:left-6 bg-card border border-white/10 p-4 rounded-xl shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Escritório Premium</p>
                    <p className="text-xs text-gray-400">Referência na região</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="sobre" className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Por que Batista & Alves?</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Scale,
                title: "Especialização Jurídica",
                desc: "Atuação focada nas principais áreas que impactam a vida do cidadão, garantindo profundidade técnica."
              },
              {
                icon: Users,
                title: "Atendimento Próximo",
                desc: "Linguagem clara, acompanhamento constante e transparência total em cada etapa do processo."
              },
              {
                icon: MapPin,
                title: "Atuação Local",
                desc: "Forte presença em Miguel Calmon e região, com conhecimento da realidade e judiciário local."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-card border-white/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 h-full group">
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

      {/* Conversational UI / Services Section */}
      <section id="areas" className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Como podemos ajudar você hoje?
              </h2>
              <p className="text-gray-400 text-lg">
                Selecione uma das perguntas abaixo ou entre em contato diretamente para uma análise personalizada do seu caso.
              </p>
              
              <div className="space-y-4">
                {[
                  "Tenho direito à aposentadoria?",
                  "O INSS negou meu benefício, e agora?",
                  "Fui demitido, quais são meus direitos?",
                  "Posso processar uma empresa?"
                ].map((question, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-background border border-white/5 hover:border-primary/50 cursor-pointer transition-all hover:translate-x-2"
                    onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-gray-200 group-hover:text-primary transition-colors font-medium">{question}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-gray-600 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.div>
                ))}
              </div>

              <Button 
                className="w-full sm:w-auto mt-4 bg-primary text-background hover:bg-primary/90 font-bold rounded-full px-8 py-6 text-lg shadow-[0_4px_20px_rgba(245,179,1,0.15)]"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              >
                Conversar agora no WhatsApp
              </Button>
            </div>

            {/* Visual Abstract Representation */}
            <div className="relative h-[500px] w-full bg-background rounded-2xl border border-white/5 p-6 overflow-hidden hidden lg:flex flex-col">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,179,1,0.03),transparent_70%)]" />
              
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                <div className="h-3 w-3 rounded-full bg-red-500/20" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                <div className="h-3 w-3 rounded-full bg-green-500/20" />
                <div className="ml-auto text-xs text-gray-500 font-mono">BATISTA_ALVES_CHAT_V1.0</div>
              </div>

              <div className="space-y-6 flex-1 overflow-hidden">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5 text-background" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] border border-white/5">
                    <p className="text-gray-300 text-sm">Olá! Bem-vindo ao Batista & Alves Advocacia. Como podemos te auxiliar juridicamente hoje?</p>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="bg-primary/10 p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-primary/20">
                    <p className="text-primary-foreground text-sm">Preciso revisar meu benefício do INSS.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Scale className="h-5 w-5 text-background" />
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] border border-white/5">
                    <p className="text-gray-300 text-sm">Perfeito. Somos especialistas em Direito Previdenciário. Vamos agendar uma análise detalhada do seu caso?</p>
                    <div className="mt-3">
                       <span className="text-primary text-xs font-bold uppercase tracking-wider">Agendamento Disponível</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                 <div className="h-12 bg-white/5 rounded-full flex items-center px-4 text-gray-500 text-sm">
                    Digite sua mensagem...
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
               <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
               <div className="grid grid-cols-2 gap-6 relative">
                 <div className="bg-[#0F172A] p-8 py-10 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                    <ShieldCheck className="h-12 w-12 text-primary stroke-[1.5]" />
                    <h4 className="font-bold text-white text-lg tracking-tight">Sigilo Absoluto</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Suas informações 100% protegidas.</p>
                 </div>
                 <div className="bg-[#0F172A] p-8 py-10 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                    <FileText className="h-12 w-12 text-primary stroke-[1.5]" />
                    <h4 className="font-bold text-white text-lg tracking-tight">Ética da OAB</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Atuação rigorosa conforme o código.</p>
                 </div>
                 <div className="bg-[#0F172A] p-8 py-10 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                    <MessageCircle className="h-12 w-12 text-primary stroke-[1.5]" />
                    <h4 className="font-bold text-white text-lg tracking-tight">Comunicação Clara</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Sem "juridiquês", você entende tudo.</p>
                 </div>
                 <div className="bg-[#0F172A] p-8 py-10 rounded-2xl border border-white/5 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                    <Clock className="h-12 w-12 text-primary stroke-[1.5]" />
                    <h4 className="font-bold text-white text-lg tracking-tight">Soluções Reais</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Foco no resultado, não em promessas.</p>
                 </div>
               </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Credibilidade construída com trabalho sério.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Entendemos que por trás de cada processo existe uma história, uma família e um direito que precisa ser respeitado. 
                Nossa missão é lutar por esse direito com todas as ferramentas legais disponíveis, mantendo você informado e seguro durante toda a jornada.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-gray-300">Escritório físico em Miguel Calmon – BA</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-gray-300">Equipe constantemente atualizada</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-gray-300">Transparência nos honorários</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#111827] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Não enfrente seu problema jurídico sozinho.</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Conte com a experiência do Batista & Alves Advocacia para buscar a melhor solução para o seu caso.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12 text-sm font-medium text-gray-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> Atendimento direto com advogado
            </span>
            <span className="flex items-center gap-2">
               <CheckCircle2 className="h-5 w-5 text-primary" /> Foco em soluções práticas
            </span>
            <span className="flex items-center gap-2">
               <CheckCircle2 className="h-5 w-5 text-primary" /> Miguel Calmon – BA
            </span>
          </div>

          <Button 
            size="lg"
            className="bg-primary text-background hover:bg-primary/90 font-bold text-lg h-16 px-10 rounded-full shadow-[0_8px_30px_rgba(245,179,1,0.3)] hover:scale-105 transition-all duration-300"
            onClick={() => window.open(WHATSAPP_LINK, "_blank")}
          >
            Falar agora pelo WhatsApp
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
                <Scale className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-white">
                  Batista & Alves <span className="text-primary">Advocacia</span>
                </span>
              </div>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Advocacia especializada em Direito Previdenciário, Trabalhista e do Consumidor. 
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
                  Miguel Calmon – BA
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  (74) 99999-9999
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
