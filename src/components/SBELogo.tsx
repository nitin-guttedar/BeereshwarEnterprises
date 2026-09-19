import React from 'react';

interface SBELogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const SBELogo: React.FC<SBELogoProps> = ({
  size = 'md',
  showSubtitle = true,
}) => {
  const imgSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  };

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0">
      {/* Official SBE Brand Emblem */}
      <div className="relative shrink-0">
        <div className={`${imgSizes[size]} rounded-2xl bg-white p-1 shadow-sm border border-slate-200 dark:border-white/15 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform`}>
          <img
            src="/sbe-logo.jpg"
            alt="Shree Beereshwara Enterprises (SBE) Logo"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Brand Text Details */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-sm sm:text-base lg:text-lg font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
            SHREE BEERESHWARA
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-sbe-royal/40 text-sbe-blue dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
            SBE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 whitespace-nowrap leading-none mt-0.5">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-sbe-royal dark:text-sbe-gold">
              ENTERPRISES
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-slate-400">
              • Malaiah Since : 1999
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
