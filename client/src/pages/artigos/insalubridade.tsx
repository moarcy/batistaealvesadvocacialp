import { useEffect } from "react";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleSection from "@/components/ArticleSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { artigoInsalubridade } from "@/lib/articles";
import { trackEvent, startTimeTracking, startScrollTracking, getReferrer } from "@/lib/analytics";

export default function ArtigoInsalubridade() {
  const article = artigoInsalubridade;

  useEffect(() => {
    document.title = `${article.title} | Batista & Alves Advocacia`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", article.metaDescription);
    }
    window.scrollTo(0, 0);
    trackEvent('pageview', '/guia/insalubridade', { referrer: getReferrer() });
    const cleanupTime = startTimeTracking('/guia/insalubridade');
    const cleanupScroll = startScrollTracking('/guia/insalubridade');
    return () => { cleanupTime(); cleanupScroll(); };
  }, [article]);

  return (
    <ArticleLayout title={article.title} ctaMessage={article.ctaMessage}>
      <article className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">
        
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-[1.2] tracking-tight drop-shadow-lg">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 leading-[1.75] font-light">
            {article.intro}
          </p>
        </header>

        <WhatsAppCTA message={article.ctaMessage} variant="inline" className="w-full md:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg" />

        <div className="flex flex-col divide-y divide-white/5">
          {article.sections.map((section, index) => (
            <div key={index} className={index > 0 ? "py-12" : "pb-12"}>
              <ArticleSection section={section} index={index} />
            </div>
          ))}
        </div>

      </article>
    </ArticleLayout>
  );
}
