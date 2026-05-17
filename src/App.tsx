import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fetchSitesMetadata, SiteMetadata } from "./services/api.ts";

const siteConfig: Record<string, { id: string, label: string, hoverColor: string, decor?: string, image: string, desc: string }> = {
  art: { 
    id: "01", 
    label: "数字艺术", 
    decor: "ART", 
    image: "/art.png",
    hoverColor: "hover:bg-[#8b5cf6]",
    desc: "探索永恒经典与人工智能的碰撞。本馆致力于通过尖端 AI 技术重新发现世界艺术遗产，每日为您呈现跨越时空的艺术盛宴。"
  },
  life: { 
    id: "02", 
    label: "命理哲学", 
    decor: "LIFE", 
    image: "/life.png",
    hoverColor: "hover:bg-[#059669]",
    desc: "基于人工智能的传统八字命理解读工具，结合《易经》、阴阳五行、天干地支，为您提供精准、深度的个人命理排盘与运势解析。"
  },
  celeb: { 
    id: "03", 
    label: "名人图谱", 
    decor: "CELEB", 
    image: "/celeb.png",
    hoverColor: "hover:bg-[#2563eb]",
    desc: "AI 驱动的历史长河与关系脉络还原平台。基于 Gemini 构建，发掘、解析并可视化任意两位历史人物之间的隐藏跨时空联系。"
  },
  book: { 
    id: "04", 
    label: "瞬间创作", 
    decor: "BOOK", 
    image: "/book.png",
    hoverColor: "hover:bg-[#c2410c]",
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
    <div className="min-h-screen flex flex-col font-display select-none bg-brand-paper text-brand-ink overflow-x-hidden">
      {/* Top Navigation Bar */}
      <nav className="w-full px-6 md:px-12 py-5 md:py-8 flex justify-between items-end border-b editorial-line bg-brand-paper/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col gap-1">
          <div className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-sans font-black text-brand-ink/30 flex items-center gap-2">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 border border-brand-accent/40 rounded-sm"
            />
            门户版本 Alpha / 2026
          </div>
          <div className="h-[2px] w-8 bg-brand-accent/20" />
        </div>
        
        {/* FANSO Logo Design */}
        <div className="flex flex-col items-center group cursor-pointer relative">
          <div className="flex items-center gap-1">
            <span className="text-4xl md:text-6xl font-black tracking-tighter leading-none transition-all group-hover:tracking-normal duration-700 italic">FANSO</span>
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-brand-accent rounded-full mt-3" 
            />
          </div>
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-[1px] bg-brand-ink"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="text-right hidden sm:flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold opacity-80">智慧策展</span>
            <svg width="12" height="12" viewBox="0 0 24 24" className="text-brand-accent">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <motion.path 
                d="M12 6v6l4 2" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ originX: "12px", originY: "12px" }}
              />
            </svg>
          </div>
          <div className="text-[10px] opacity-40 font-sans tracking-wide hover:opacity-100 transition-opacity cursor-pointer">WWW.FANSO.SITE</div>
        </div>
      </nav>

      {/* Main Entry Grid */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full relative">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-r editorial-line animate-pulse bg-brand-ink/5 h-80 sm:h-full" />
          ))
        ) : (
          sites.map((site) => {
            const type = site.url.split("//")[1].split(".")[0];
            const config = siteConfig[type] || { id: "??", label: "外部", desc: "", image: "", hoverColor: "hover:bg-brand-ink" };

            return (
              <motion.a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: parseInt(config.id) * 0.1 }}
                className={`group relative flex flex-col justify-between p-8 md:p-12 border-b sm:border-b-0 sm:border-r editorial-line transition-all duration-700 hover:z-10 min-h-[350px] sm:min-h-0
                  ${config.hoverColor}`}
              >
                <div className="z-10">
                  <div className="flex items-center gap-3 mb-4 md:mb-8">
                    <span className="text-[10px] font-sans font-black uppercase tracking-[0.4em] transition-colors duration-300 group-hover:text-white/40 text-brand-ink/40">
                      {config.id} /
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-white text-brand-ink/60">
                      {config.label}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none transition-colors duration-500 group-hover:text-white">
                    {type.toUpperCase()}<br/>
                    <span className="font-light not-italic opacity-20 group-hover:opacity-40">FANSO</span>
                  </h2>
                </div>

                {/* Background Thumbnail Image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-top opacity-[0.06] group-hover:opacity-[0.25] transition-all duration-1000 pointer-events-none scale-110 group-hover:scale-100 saturate-0 hover:saturate-100"
                  style={{ backgroundImage: `url(${config.image})` }}
                />

                <div className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  {/* Fixed height for alignment */}
                  <div className="mb-8 overflow-hidden">
                    <p className="text-sm md:text-base leading-relaxed opacity-70 font-sans font-medium group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-[-4px]">
                      {config.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-[2px] bg-brand-ink group-hover:bg-white transition-all duration-500 group-hover:w-24"></div>
                    <div className="font-sans text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-4">
                      <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 tracking-[0.5em]">进入频道</span>
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-current overflow-hidden p-1 transition-all duration-700 transform group-hover:rotate-[360deg] shadow-2xl group-hover:shadow-white/20">
                        <img src={config.image} className="w-full h-full object-cover rounded-full" alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-brand-ink/5 opacity-0 group-hover:opacity-20 transition-opacity duration-1000" />
                
                {config.decor && (
                  <div className="absolute bottom-0 left-0 p-4 text-[80px] md:text-[180px] font-black opacity-[0.02] pointer-events-none group-hover:text-white group-hover:opacity-[0.05] transition-all duration-1000 leading-none select-none">
                    {config.decor}
                  </div>
                )}
              </motion.a>
            );
          })
        )}
      </main>

      {/* Bottom Info Footer */}
      <footer className="w-full px-6 md:px-12 py-8 md:py-16 flex flex-col md:flex-row justify-between items-center bg-[#1c1c1c] text-white/90 gap-10">
        <div className="flex flex-wrap justify-center md:justify-start gap-10 md:gap-20">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-sans font-black">策展联盟</span>
            <span className="text-sm font-sans font-bold hover:text-brand-accent transition-colors cursor-pointer">FANSO GLOBAL NETWORK</span>
            <div className="w-12 h-[1px] bg-brand-accent/50" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-sans font-black">系统状态</span>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
              />
              <span className="text-sm font-sans font-bold">节点全线就绪</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-sans font-black">视觉年份</span>
            <span className="text-sm font-sans font-bold tabular-nums">EST. 2026 // ALPHA</span>
          </div>
        </div>
        
        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-6">
          <div className="h-[2px] w-48 md:w-64 bg-white/5 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full w-1/4 bg-brand-accent shadow-[0_0_10px_rgba(194,65,12,0.5)]"
              animate={{ x: ["-100%", "400%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "slow" }}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-[10px] font-bold">FB</span>
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-[10px] font-bold">X</span>
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                <span className="text-[10px] font-bold">IN</span>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
            <span className="text-[10px] uppercase font-sans font-black tracking-[0.3em] opacity-30">
              版权所有 © 2026 FANSO
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

