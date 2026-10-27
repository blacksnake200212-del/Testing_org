import React from 'react';
import { useOrg } from '../../context/OrgContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useOrg();

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/90 border-emerald-500/50 text-white shadow-emerald-950/40',
    error: 'bg-rose-900/90 border-rose-500/50 text-white shadow-rose-950/40',
    info: 'bg-blue-900/90 border-blue-500/50 text-white shadow-blue-950/40'
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  }[toast.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md w-full">
      <div className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl ${bgStyles}`}>
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" />
        <div className="flex-1 text-sm font-medium pr-2">
          {toast.message}
        </div>
        <button
          onClick={hideToast}
          className="text-white/70 hover:text-white transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
