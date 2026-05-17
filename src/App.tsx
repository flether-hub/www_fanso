import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchSitesMetadata, SiteMetadata } from "./services/api.ts";

const siteConfig: Record<string, { id: string, label: string, hoverColor: string, bgColor: string, decor?: string, image: string, desc: string }> = {
  art: { 
    id: "01", 
    label: "数字艺术", 
    decor: "ART", 
    image: "/art.png",
    hoverColor: "hover:bg-[#6d28d9]",
    bgColor: "bg-[#f0edff]",
    desc: "探索永恒经典与人工智能的碰撞。本馆致力于通过尖端 AI 技术重新发现世界艺术遗产，每日为您呈现跨越时空的艺术盛宴。"
  },
  life: { 
    id: "02", 
    label: "命理哲学", 
    decor: "LIFE", 
    image: "/life.png",
    hoverColor: "hover:bg-[#15803d]",
    bgColor: "bg-[#edfaed]",
    desc: "基于人工智能的传统八字命理解读工具，结合《易经》、阴阳五行、天干地支，为您提供精准、深度的个人命理排盘与运势解析。"
  },
  celeb: { 
    id: "03", 
    label: "名人图谱", 
    decor: "CELEB", 
    image: "/celeb.png",
    hoverColor: "hover:bg-[#1d4ed8]",
    bgColor: "bg-[#edf4ff]",
    desc: "AI 驱动的历史长河与关系脉络还原平台。基于 Gemini 构建，发掘、解析并可视化任意两位历史人物之间的隐藏跨时空联系。"
  },
  book: { 
    id: "04", 
    label: "瞬间创作", 
    decor: "BOOK", 
    image: "/book.png",
    hoverColor: "hover:bg-[#9a3412]",
    bgColor: "bg-[#fff4e8]",
    desc: "只需输入书名或主题，AI 将为您生成包含完整目录、正文章节、封面及出版信息的标准 A5 图书，开启自动化写作新纪元。"
  },
};

export default function App() {
  const [sites, setSites] = useState<SiteMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSites() {
      const data = await fetchSitesMetadata();
      const order = ["art", "life", "celeb", "book"];
      const sortedData = [...data].sort((a, b) => {
        const typeA = a.url.split("//")[1].split(".")[0];
        const typeB = b.url.split("//")[1].split(".")[0];
        return order.indexOf(typeA) - order.indexOf(typeB);
      });
      setSites(sortedData);
      setLoading(false);
    }
    loadSites();
  }, []);

  return (
    <div className="w-full min-h-screen relative flex flex-col font-display select-none bg-brand-paper text-brand-ink overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="w-full px-6 md:px-12 py-8 md:py-12 flex justify-between items-end border-b border-brand-ink/5 sticky top-0 z-50 overflow-hidden relative text-brand-ink bg-white/60 backdrop-blur-xl">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: 'url(https://images.unsplash.org/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=2000)' }}
        />

        {/* Massive Colorful SVG Animated Lines */}
        <div className="absolute inset-0 z-5 pointer-events-none opacity-60">
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0080" />
                <stop offset="50%" stopColor="#7928ca" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
              <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00dfd8" />
                <stop offset="50%" stopColor="#007cf0" />
                <stop offset="100%" stopColor="#00dfd8" />
              </linearGradient>
              <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7928ca" />
                <stop offset="50%" stopColor="#ff4d4d" />
                <stop offset="100%" stopColor="#7928ca" />
              </linearGradient>
              <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
              <filter id="neon_glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Increased density of thin, colorful dynamic paths */}
            {[...Array(10)].map((_, i) => {
              const startY = 50 + (i * 8);
              const variance = 15 + (i * 4);
              const gradients = ["url(#g1)", "url(#g2)", "url(#g3)", "url(#g1)", "url(#g2)"];
              
              return (
                <motion.path
                  key={i}
                  d={`M0,${startY} Q300,${startY - variance} 600,${startY} T1200,${startY}`}
                  fill="none"
                  stroke={gradients[i % gradients.length]}
                  strokeWidth={0.5 + (i % 1.5)}
                  filter="url(#neon_glow)"
                  animate={{
                    d: [
                      `M0,${startY} Q300,${startY - variance * 2} 600,${startY} T1200,${startY}`,
                      `M0,${startY} Q300,${startY + variance * 2} 600,${startY} T1200,${startY}`,
                      `M0,${startY} Q300,${startY - variance * 2} 600,${startY} T1200,${startY}`,
                    ],
                    strokeOpacity: [0.2 + (i * 0.02), 0.6 + (i * 0.02), 0.2 + (i * 0.02)]
                  }}
                  transition={{
                    duration: 4 + i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="relative z-20 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-brand-ink/60">
          门户版本 ALPHA / 2026
        </div>
        
        {/* FANSO Logo Design */}
        <h1 className="relative z-20 flex flex-col items-center group cursor-default">
          <div className="flex items-center gap-0.5">
            <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none transition-transform group-hover:scale-105 duration-500">FANSO</span>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-brand-accent rounded-full mt-2 animate-pulse" />
          </div>
          <div className="h-[1px] w-full bg-brand-ink/20 mt-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </h1>

        <div className="relative z-20 text-right hidden sm:block">
          <div className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold">智慧策展</div>
          <div className="text-[10px] opacity-60 font-sans tracking-wide underline decoration-brand-accent/50 underline-offset-4">www.fanso.site</div>
        </div>
      </nav>

      {/* Main Entry Grid */}
      <main className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative pb-24 md:pb-32">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r editorial-line animate-pulse bg-brand-ink/5 h-[400px] sm:h-full" />
          ))
        ) : (
          sites.map((site) => {
            const type = site.url.split("//")[1].split(".")[0];
            const config = siteConfig[type] || { id: "??", label: "外部", desc: "", image: "", hoverColor: "hover:bg-brand-ink", bgColor: "bg-white" };

            return (
              <motion.a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`进入 ${config.label} 频道`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: parseInt(config.id) * 0.1 }}
                className={`group relative flex flex-col justify-between p-8 md:p-12 border-b sm:border-b-0 sm:border-r editorial-line transition-all duration-700 hover:z-10 min-h-[400px] sm:min-h-0
                  ${config.bgColor} ${config.hoverColor}`}
              >
                <div className="z-10">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] block mb-4 md:mb-6 transition-colors duration-300 group-hover:text-white/40 text-brand-ink/40 italic">
                    {config.id}. {config.label}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-light leading-tight transition-colors duration-300 group-hover:text-white">
                    {type.toUpperCase()}<br/>
                    <span className="font-black">FANSO</span>
                  </h2>
                </div>

                {/* Background Thumbnail Image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-top opacity-[0.06] group-hover:opacity-[0.3] transition-all duration-700 pointer-events-none scale-110 group-hover:scale-100"
                  style={{ backgroundImage: `url(${config.image})` }}
                />

                <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  {/* Fixed height for alignment */}
                  <div className="h-24 md:h-32 mb-4 overflow-hidden">
                    <p className="text-xs md:text-sm leading-relaxed opacity-80 font-sans font-normal group-hover:opacity-100 transition-opacity duration-300">
                      {config.desc}
                    </p>
                  </div>
                  <div className="w-12 h-[1px] bg-brand-ink group-hover:bg-white transition-colors duration-300"></div>
                  <div className="mt-4 md:mt-6 font-sans text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
                    进入频道
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-current overflow-hidden p-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                      <img src={config.image} className="w-full h-full object-cover rounded-full" alt="" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-[#e5e7eb] opacity-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
                
                {config.decor && (
                  <div className="absolute bottom-0 right-0 p-4 text-[60px] md:text-[120px] font-black opacity-[0.02] pointer-events-none group-hover:text-white group-hover:opacity-10 transition-all duration-700">
                    {config.decor}
                  </div>
                )}
              </motion.a>
            );
          })
        )}
      </main>

      {/* Bottom Info Footer */}
      <footer className="w-full px-6 md:px-12 py-4 md:py-8 flex justify-between items-center bg-[#111111] border-t border-white/5 text-white fixed bottom-0 left-0 right-0 z-50 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 hover:opacity-100 transition-opacity duration-1000"
          style={{ backgroundImage: 'url(https://images.unsplash.org/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=2000)' }}
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        <div className="relative z-20 flex gap-6 md:gap-12">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50 font-sans font-bold">联合体</span>
            <span className="text-[10px] md:text-xs font-sans font-medium">Fanso 全球网络</span>
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-[8px] md:text-[9px] uppercase tracking-widest opacity-50 font-sans font-bold">状态</span>
            <span className="text-[10px] md:text-xs font-sans font-medium">所有节点运行正常</span>
          </div>
        </div>
        
        <div className="relative z-20 text-right flex items-center gap-6">
          <div className="h-1 w-16 md:w-32 bg-white/10 relative overflow-hidden hidden xs:block">
            <motion.div 
              className="absolute top-0 left-0 h-full w-1/3 bg-brand-accent"
              animate={{ x: [0, 80] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "reverse" }}
            />
          </div>
          <span className="text-[8px] md:text-[10px] uppercase font-sans font-black tracking-widest opacity-70">
            精选作品集 / 2026
          </span>
        </div>
      </footer>
    </div>
  );
}

