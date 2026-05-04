import { useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, CheckCircle2, AlertCircle } from "lucide-react";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleCard from "@/components/ArticleCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { PILLAR_CARDS, WHATSAPP_MESSAGES } from "@/lib/articles";

export default function GuiaDireitos() {
  
  useEffect(() => {
    document.title = "Direitos Trabalhistas em Salvador: Guia Completo | Batista & Alves";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Guia completo sobre direitos trabalhistas em Salvador. Saiba o que você pode cobrar em casos de horas extras, insalubridade, trabalho sem carteira e mais.");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ArticleLayout 
      title="Direitos Trabalhistas em Salvador: O Que Você Pode Cobrar e Como Agir"
      ctaMessage={WHATSAPP_MESSAGES.geral}
    >
      <article className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-20">
        
        {/* Hero Section */}
        <header className="flex flex-col gap-8 text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-20 h-20 mx-auto mb-10"
          >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <div className="relative w-full h-full bg-[#0F172A]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(245,179,1,0.15)]">
              <Scale className="h-10 w-10 text-primary" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg"
          >
            Direitos Trabalhistas em Salvador:<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#D49A00]">O Que Você Pode Cobrar e Como Agir</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 leading-relaxed font-light max-w-2xl mx-auto"
          >
            Se você trabalha ou trabalhou em Salvador e tem dúvidas sobre seus direitos, este guia foi feito para te dar clareza rápida e objetiva.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pt-6"
          >
            <WhatsAppCTA message={WHATSAPP_MESSAGES.geral} className="h-14 px-8 text-lg w-full sm:w-auto" />
          </motion.div>
        </header>

        {/* Intro */}
        <section className="text-white/80 text-lg leading-[1.8] font-light flex flex-col gap-8">
          <p>
            Muitos trabalhadores deixam de receber valores importantes por não saberem que têm direito — ou por acreditarem que "não vale a pena correr atrás".
          </p>
          <div className="bg-[#0F172A] border-l-4 border-primary p-6 rounded-r-xl shadow-lg">
            <p className="text-white font-medium text-xl">
              Na prática, a maioria dos casos tem solução.
            </p>
          </div>
        </section>

        {/* Grid de Artigos (Hub) */}
        <section className="flex flex-col gap-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">Situações Mais Comuns em Salvador</h2>
            <p className="text-white/80 text-lg font-light">Se você já passou por alguma dessas situações, este conteúdo é para você:</p>
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
              <h2 className="text-3xl font-bold text-white">Como Saber se Você Foi Prejudicado</h2>
              <p className="text-white/80 text-lg font-light">Você pode ter direitos a receber se:</p>
            </div>
            <ul className="flex flex-col gap-4">
              {[
                "A empresa não assinou sua carteira",
                "Você trabalhava além do horário",
                "Não recebeu adicionais obrigatórios",
                "Foi dispensado sem receber corretamente"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-lg font-light leading-[1.8]">
                  <AlertCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white font-semibold text-lg mt-6">Esses são sinais claros de irregularidade.</p>
          </section>

          <section className="py-12 flex flex-col gap-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white">O Que Você Pode Receber</h2>
              <p className="text-white/80 text-lg font-light">Dependendo do caso, é possível recuperar:</p>
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
                  <span className="text-gray-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl mt-6">
              <p className="text-white font-medium text-lg">Em muitos casos, o valor acumulado pode ser significativo.</p>
            </div>
          </section>

          <section className="py-12 flex flex-col gap-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white">Prazo Para Buscar Seus Direitos</h2>
              <p className="text-white/80 text-lg font-light">
                Você pode cobrar direitos referentes aos últimos <strong className="text-white">5 anos</strong>.
              </p>
            </div>
            <div className="bg-[#0F172A] border-l-4 border-red-500 p-6 rounded-r-xl shadow-lg">
              <p className="text-white font-medium text-lg">
                Isso significa que quanto antes agir, maior a chance de recuperar valores.
              </p>
            </div>
          </section>

          <section className="py-12 flex flex-col gap-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white">Vale a Pena Procurar um Advogado?</h2>
              <p className="text-white/80 text-lg font-light">Sim, principalmente quando:</p>
            </div>
            <ul className="flex flex-col gap-4">
              {[
                "Existe dúvida sobre valores",
                "Há indícios de irregularidade",
                "O trabalhador não recebeu corretamente"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/80 text-lg font-light leading-[1.8]">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-white font-semibold text-lg mt-6">Uma análise técnica evita riscos e mostra exatamente o que pode ser feito.</p>
          </section>

        </div>

      </article>
    </ArticleLayout>
  );
}
