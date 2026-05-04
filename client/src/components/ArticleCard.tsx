import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface ArticleCardProps {
  href: string;
  label: string;
  desc?: string;
  index?: number;
}

export default function ArticleCard({ href, label, desc, index = 0 }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link href={href}>
        <div className="group flex items-start gap-4 p-5 rounded-2xl bg-[#0F172A] border border-white/5 hover:border-primary/50 hover:bg-[#151e32] hover:shadow-[0_0_20px_rgba(245,179,1,0.15)] transition-all duration-300 cursor-pointer">
          <div className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(245,179,1,0.5)] transition-all duration-300" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-lg group-hover:text-primary transition-colors leading-snug">
              {label}
            </p>
            {desc && (
              <p className="text-white/60 text-sm mt-1.5 leading-relaxed font-light">{desc}</p>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
