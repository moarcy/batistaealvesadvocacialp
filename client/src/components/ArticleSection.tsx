import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { ArticleSection as ArticleSectionType } from "@/lib/articles";

interface ArticleSectionProps {
  section: ArticleSectionType;
  index: number;
}

export default function ArticleSection({ section, index }: ArticleSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {section.heading && (
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          {section.heading}
        </h2>
      )}

      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-white/80 text-base leading-relaxed font-light">
          {p}
        </p>
      ))}

      {section.list && (
        <ul className="space-y-3 mt-4">
          {section.list.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-white/80 text-base leading-relaxed font-light">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {section.highlight && (
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary p-6 md:p-8 rounded-r-2xl mt-4 shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="flex items-start gap-4 relative z-10">
            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-white font-medium text-lg leading-relaxed tracking-wide">
              {section.highlight}
            </p>
          </div>
        </div>
      )}

      {section.subSections?.map((sub, i) => (
        <div key={i} className="mt-10 space-y-5">
          <h3 className="text-lg font-bold text-primary/90">{sub.heading}</h3>
          {sub.paragraphs?.map((p, j) => (
            <p key={j} className="text-white/80 text-base leading-relaxed font-light">{p}</p>
          ))}
          {sub.highlight && (
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl mt-4">
              <p className="text-white font-medium">{sub.highlight}</p>
            </div>
          )}
        </div>
      ))}

      {section.links && section.links.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-400 mb-4 flex items-center gap-2">
            <span className="h-px bg-white/10 flex-1"></span>
            Veja também
            <span className="h-px bg-white/10 flex-1"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.links.map((link, i) => (
              <ArticleCard key={i} href={link.href} label={link.label} />
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
