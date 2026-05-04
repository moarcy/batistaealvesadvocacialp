import { motion } from "framer-motion";
import { Scale, MessageCircle, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { whatsappLink } from "@/lib/articles";
import { trackEvent } from "@/lib/analytics";

interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  ctaMessage: string;
}

const WHATSAPP_BASE = "https://wa.me/5574999443002";

export default function ArticleLayout({ children, title, ctaMessage }: ArticleLayoutProps) {
  const link = whatsappLink(ctaMessage);

  const handleCTA = () => {
    trackEvent("click", link);
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#06090E] text-foreground overflow-x-hidden font-sans selection:bg-primary/20 selection:text-primary relative">
      
      {/* Premium Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full opacity-50 mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full opacity-30 mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#06090E]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Scale className="h-7 w-7 text-primary" />
            <span className="text-base font-bold text-white hidden sm:block">Batista &amp; Alves Advocacia</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/guia" className="hidden md:flex items-center gap-1 text-sm text-gray-400 hover:text-primary transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Guia de Direitos
            </Link>
            <Button
              className="bg-primary text-background hover:bg-primary/90 font-semibold rounded-full px-5 text-sm shadow-[0_4px_14px_rgba(245,179,1,0.2)]"
              onClick={handleCTA}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* CTA Final Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#D49A00]" />
        <div className="container mx-auto px-6 relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#080C14]">
              Seu Caso Merece Atenção Especializada
            </h2>
            <p className="text-[#080C14]/80 font-medium text-base">
              Atendimento direto com advogado, resposta rápida e sigilo absoluto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#080C14] text-white hover:bg-black/80 font-bold h-14 px-10 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                onClick={handleCTA}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com um advogado agora
              </Button>
              <Link href="/guia">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#080C14]/30 text-[#080C14] hover:bg-[#080C14]/10 font-semibold h-14 px-8 rounded-full w-full"
                >
                  Ver outros direitos
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 justify-center text-sm font-medium text-[#080C14]/70 pt-2">
              <span>✓ Atendimento em Salvador – BA</span>
              <span>✓ Sigilo garantido</span>
              <span>✓ Resposta técnica rápida</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1220] border-t border-white/5 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <span className="text-gray-400 font-medium">Batista &amp; Alves Advocacia</span>
          </div>
          <p>© {new Date().getFullYear()} Todos os direitos reservados. Salvador – BA.</p>
          <Link href="/guia" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Guia de Direitos
          </Link>
        </div>
      </footer>

      {/* Floating CTA Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          className="bg-primary text-[#080C14] font-bold rounded-full h-14 w-14 shadow-[0_8px_30px_rgba(245,179,1,0.4)] hover:scale-110 transition-transform duration-300 p-0"
          onClick={handleCTA}
        >
          <MessageCircle className="h-6 w-6 fill-current" />
        </Button>
      </div>
    </div>
  );
}
