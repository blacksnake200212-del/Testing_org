import React from 'react';

interface StatusBadgeProps {
  status: 'published' | 'draft' | 'archived' | 'active' | 'inactive';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const configs = {
    published: {
      label: 'Published',
      classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20'
    },
    draft: {
      label: 'Draft',
      classes: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20'
    },
    archived: {
      label: 'Archived',
      classes: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20'
    },
    active: {
      label: 'Active Member',
      classes: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20'
    },
    inactive: {
      label: 'Past / Emeritus',
      classes: 'bg-slate-100 text-slate-600 border-slate-200 ring-slate-500/20'
    }
  };

  const current = configs[status] || configs.published;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ring-1 ${current.classes} ${sizeClasses}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {current.label}
    </span>
  );
};
