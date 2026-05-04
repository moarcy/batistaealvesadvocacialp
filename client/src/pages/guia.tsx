import { useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, CheckCircle2, AlertCircle } from "lucide-react";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleCard from "@/components/ArticleCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { PILLAR_CARDS, WHATSAPP_MESSAGES } from "@/lib/articles";
import { trackEvent, startTimeTracking, startScrollTracking, getReferrer } from "@/lib/analytics";

export default function GuiaDireitos() {

  useEffect(() => {
    document.title = "Direitos Trabalhistas em Salvador: Guia Completo | Batista & Alves";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Guia completo sobre direitos trabalhistas em Salvador. Saiba o que você pode cobrar em casos de horas extras, insalubridade, trabalho sem carteira e mais.");
    }
    window.scrollTo(0, 0);
    // Analytics: rastreia referrer, tempo de permanência e scroll
    trackEvent('pageview', '/guia', { referrer: getReferrer() });
    const cleanupTime = startTimeTracking('/guia');
    const cleanupScroll = startScrollTracking('/guia');
    return () => { cleanupTime(); cleanupScroll(); };
  }, []);

  return (
    <ArticleLayout
      title="Direitos Trabalhistas em Salvador: O Que Você Pode Cobrar e Como Agir"
      ctaMessage={WHATSAPP_MESSAGES.geral}
    >
      <div className="flex flex-col">
        {/* Hero Section Premium */}
        <header className="relative pt-6 md:pt-24 pb-10 md:pb-24 overflow-hidden border-b border-white/5">
          {/* Background Glows específicos do Hero */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 lg:items-center">

              {/* Top Text Content (Badge & Title) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 lg:row-start-1 flex flex-col gap-6 md:gap-8 text-left relative z-10"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-primary font-medium tracking-wide text-xs uppercase">Guia Completo 2026</span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
                  Direitos Trabalhistas em Salvador:<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#D49A00]">O Que Você Pode Cobrar</span>
                </h1>
              </motion.div>

              {/* Premium Image Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 relative z-10 w-full max-w-md mx-auto lg:max-w-full perspective-1000"
              >
                <div className="relative">
                  {/* Decorators */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-[2rem] transform rotate-3 scale-105 blur-md" />
                  <div className="absolute inset-0 bg-[#0F172A] rounded-[2rem] transform -rotate-1 border border-white/10" />

                  {/* Image Container */}
                  <div className="relative rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-transparent opacity-80 z-10" />
                    <img
                      src="/carteira-de-trabalho.png"
                      alt="Carteira de Trabalho Brasileira"
                      className="w-full h-auto aspect-[16/10] sm:aspect-video lg:aspect-[4/5] object-cover"
                    />

                    {/* Glassmorphism Badge */}
                    <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 z-20 bg-[#080C14]/60 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2.5 rounded-full shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm md:text-base">Seus Direitos Protegidos</p>
                          <p className="text-white/60 text-xs md:text-sm">Análise especializada em Salvador</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Text Content (P & CTA) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7 lg:row-start-2 flex flex-col gap-6 md:gap-8 text-left relative z-10"
              >
                <p className="text-base md:text-xl text-white/80 leading-relaxed font-light max-w-2xl">
                  Se você trabalha ou trabalhou em Salvador e tem dúvidas sobre seus direitos, este guia foi feito para te dar clareza rápida e objetiva. Descubra o que a lei garante a você.
                </p>

                <div className="pt-2">
                  <WhatsAppCTA message={WHATSAPP_MESSAGES.geral} className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg w-full sm:w-auto" />
                </div>
              </motion.div>

            </div>
          </div>
        </header>

        {/* Article Content Area */}
        <article className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">

          {/* Intro */}
          <section className="text-white/80 text-base leading-relaxed font-light flex flex-col gap-8">
            <p>
              Muitos trabalhadores deixam de receber valores importantes por não saberem que têm direito — ou por acreditarem que "não vale a pena correr atrás".
            </p>
            <div className="bg-[#0F172A] border-l-4 border-primary p-6 rounded-r-xl shadow-lg">
              <p className="text-white font-medium text-lg">
                Na prática, a maioria dos casos tem solução.
              </p>
            </div>
          </section>

          {/* Grid de Artigos (Hub) */}
          <section className="flex flex-col gap-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white">Situações Mais Comuns em Salvador</h2>
              <p className="text-white/80 text-base font-light">Se você já passou por alguma dessas situações, este conteúdo é para você:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PILLAR_CARDS.map((card, idx) => (
                <ArticleCard
                  key={card.slug}
                  href={`/guia/${card.slug}`}
                  label={card.label}
                  desc={card.desc}
                  index={idx}
                />
              ))}
            </div>
          </section>

          {/* Content Sections */}
          <div className="flex flex-col divide-y divide-white/5">

            <section className="pb-12 flex flex-col gap-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Como Saber se Você Foi Prejudicado</h2>
                <p className="text-white/80 text-base font-light">Você pode ter direitos a receber se:</p>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "A empresa não assinou sua carteira",
                  "Você trabalhava além do horário",
                  "Não recebeu adicionais obrigatórios",
                  "Foi dispensado sem receber corretamente"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-base font-light leading-relaxed">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold text-base mt-6">Esses são sinais claros de irregularidade.</p>
            </section>

            <section className="py-12 flex flex-col gap-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">O Que Você Pode Receber</h2>
                <p className="text-white/80 text-base font-light">Dependendo do caso, é possível recuperar:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Salários não pagos corretamente",
                  "Férias + 1/3",
                  "13º salário",
                  "FGTS + multa de 40%",
                  "Horas extras",
                  "Adicionais (insalubridade ou periculosidade)"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-gray-200 text-sm md:text-base font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl mt-6">
                <p className="text-white font-medium text-base">Em muitos casos, o valor acumulado pode ser significativo.</p>
              </div>
            </section>

            <section className="py-12 flex flex-col gap-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Prazo Para Buscar Seus Direitos</h2>
                <p className="text-white/80 text-base font-light">
                  Você pode cobrar direitos referentes aos últimos <strong className="text-white">5 anos</strong>.
                </p>
              </div>
              <div className="bg-[#0F172A] border-l-4 border-red-500 p-6 rounded-r-xl shadow-lg">
                <p className="text-white font-medium text-base">
                  Isso significa que quanto antes agir, maior a chance de recuperar valores.
                </p>
              </div>
            </section>

            <section className="py-12 flex flex-col gap-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-white">Vale a Pena Procurar um Advogado?</h2>
                <p className="text-white/80 text-base font-light">Sim, principalmente quando:</p>
              </div>
              <ul className="flex flex-col gap-4">
                {[
                  "Existe dúvida sobre valores",
                  "Há indícios de irregularidade",
                  "O trabalhador não recebeu corretamente"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80 text-base font-light leading-relaxed">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white font-semibold text-base mt-6">Uma análise técnica evita riscos e mostra exatamente o que pode ser feito.</p>
            </section>

          </div>

        </article>
      </div>
    </ArticleLayout>
  );
}
