import { useEffect } from "react";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleSection from "@/components/ArticleSection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { artigoPericulosidade } from "@/lib/articles";

export default function ArtigoPericulosidade() {
  const article = artigoPericulosidade;

  useEffect(() => {
    document.title = `${article.title} | Batista & Alves Advocacia`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", article.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [article]);

  return (
    <ArticleLayout title={article.title} ctaMessage={article.ctaMessage}>
      <article className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">
        
        <header className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
            {article.title}
          </h1>
          <p className="text-xl text-white/80 leading-[1.8] font-light">
            {article.intro}
          </p>
        </header>

        <WhatsAppCTA message={article.ctaMessage} variant="inline" className="w-full md:w-auto h-14 px-8 text-lg" />

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
