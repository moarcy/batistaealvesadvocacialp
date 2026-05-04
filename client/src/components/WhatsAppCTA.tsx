import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/articles";
import { trackEvent } from "@/lib/analytics";

import { useLocation } from "wouter";

interface WhatsAppCTAProps {
  message: string;
  variant?: "inline" | "banner";
  className?: string;
}

export default function WhatsAppCTA({ message, variant = "inline", className = "" }: WhatsAppCTAProps) {
  const link = whatsappLink(message);
  const [location] = useLocation();

  const handleCTA = () => {
    trackEvent("click", `whatsapp_cta${location.replace(/\//g, '_')}`);
    window.open(link, "_blank");
  };

  if (variant === "banner") {
    return (
      <div className={`bg-[#0F172A] border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${className}`}>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Fale com um Advogado Trabalhista</h3>
          <p className="text-gray-400 text-sm">
            Atendimento rápido, sigiloso e direto com advogado. Solicite uma análise do seu caso.
          </p>
        </div>
        <Button
          size="lg"
          className="bg-primary text-[#080C14] hover:bg-primary/90 font-bold rounded-full w-full md:w-auto whitespace-nowrap shadow-[0_4px_14px_rgba(245,179,1,0.2)] hover:scale-105 transition-transform"
          onClick={handleCTA}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Análise Sem Compromisso
        </Button>
      </div>
    );
  }

  return (
    <Button
      className={`bg-primary text-[#080C14] hover:bg-primary/90 font-bold rounded-full shadow-[0_4px_14px_rgba(245,179,1,0.2)] hover:scale-105 transition-transform ${className}`}
      onClick={handleCTA}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      Falar com advogado agora
    </Button>
  );
}
