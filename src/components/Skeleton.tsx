import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-shimmer rounded-xl ${className}`} 
      aria-hidden="true" 
    />
  );
};

export const MetricCardSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-industrial-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-3">
      <Skeleton className="w-24 h-3.5" />
      <Skeleton className="w-32 h-8" />
      <Skeleton className="w-40 h-3" />
    </div>
  );
};

export const ShiftCardSkeleton: React.FC = () => {
  return (
    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-industrial-900/90 border border-slate-200 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-3 h-3 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="w-28 h-3.5" />
          <Skeleton className="w-48 h-2.5" />
        </div>
      </div>
      <Skeleton className="w-16 h-5" />
    </div>
  );
};

export const EmployeeCardSkeleton: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-14 h-4 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
          <Skeleton className="w-2/3 h-2.5" />
        </div>
      </div>
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-900/90 border border-slate-100 dark:border-white/5 space-y-1.5">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-24 h-2.5" />
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
        <Skeleton className="w-24 h-3" />
        <Skeleton className="w-4 h-4 rounded-full" />
      </div>
    </div>
  );
};

export const ClientCardSkeleton: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <Skeleton className="w-16 h-4" />
        <Skeleton className="w-14 h-4 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-4/5 h-5" />
        <Skeleton className="w-1/2 h-3" />
      </div>
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-industrial-900 border border-slate-200 dark:border-white/5 space-y-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
      <Skeleton className="w-36 h-3" />
    </div>
  );
};
