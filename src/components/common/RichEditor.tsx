import React, { useState, useRef } from 'react';
import { 
  Bold, Italic, Heading2, Heading3, List, ListOrdered, 
  Quote, Link as LinkIcon, Eye, Edit3, HelpCircle 
} from 'lucide-react';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const RichEditor: React.FC<RichEditorProps> = ({
  value,
  onChange,
  label = 'Article Full Content',
  placeholder = 'Write or paste the full news article here...'
}) => {
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText ? selectedText.length : 4)
      );
    }, 0);
  };

  const handleHeading = (level: 2 | 3) => {
    const hashes = level === 2 ? '## ' : '### ';
    insertFormatting(`\n${hashes}`, '\n');
  };

  const handleList = (ordered = false) => {
    const marker = ordered ? '\n1. ' : '\n- ';
    insertFormatting(marker, '\n');
  };

  const handleQuote = () => {
    insertFormatting('\n> ', '\n');
  };

  const handleLink = () => {
    const url = prompt('Enter link URL (e.g., https://example.com):', 'https://');
    if (url) {
      insertFormatting('[', `](${url})`);
    }
  };

  // Basic markdown renderer for preview tab
  const renderFormattedPreview = (raw: string) => {
    if (!raw.trim()) {
      return <p className="text-slate-400 italic">No content written yet. Switch to Edit mode to write your article.</p>;
    }

    const lines = raw.split('\n');
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h4 key={index} className="text-xl font-bold text-slate-900 mt-5 mb-2 font-heading">
            {trimmed.replace('### ', '')}
          </h4>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h3 key={index} className="text-2xl font-bold text-slate-900 mt-6 mb-3 font-heading border-b pb-2">
            {trimmed.replace('## ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-brand-500 pl-4 py-1.5 my-3 bg-brand-50/50 rounded-r text-slate-700 italic">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <li key={index} className="ml-5 list-disc text-slate-700 my-1">
            {trimmed.substring(2)}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={index} className="ml-5 list-decimal text-slate-700 my-1">
            {trimmed.replace(/^\d+\.\s/, '')}
          </li>
        );
      } else if (trimmed === '') {
        elements.push(<div key={index} className="h-3" />);
      } else {
        // Handle bold (**text**)
        const parsed = trimmed.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        elements.push(
          <p key={index} className="text-slate-700 leading-relaxed my-2">
            {parsed}
          </p>
        );
      }
    });

    return <div className="prose max-w-none">{elements}</div>;
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setMode('write')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              mode === 'write' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              mode === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview Formatted
          </button>
        </div>
      </div>

      <div className="border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 bg-white">
        {/* Editor Toolbar */}
        {mode === 'write' && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 text-slate-700 text-sm">
            <button
              type="button"
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Bold (**text**)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Italic (*text*)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-slate-300 mx-1" />
            <button
              type="button"
              onClick={() => handleHeading(2)}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Heading 2 (## Title)"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading(3)}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Heading 3 (### Subtitle)"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-slate-300 mx-1" />
            <button
              type="button"
              onClick={() => handleList(false)}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Bullet List (- item)"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleList(true)}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Numbered List (1. item)"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleQuote}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Quote (> text)"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleLink}
              className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition"
              title="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <div className="ml-auto text-xs text-slate-400 flex items-center gap-1 pr-2">
              <HelpCircle className="w-3.5 h-3.5" /> Markdown supported
            </div>
          </div>
        )}

        {/* Content Area */}
        {mode === 'write' ? (
          <textarea
            ref={textareaRef}
            rows={14}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 font-mono text-sm text-slate-800 placeholder-slate-400 focus:outline-none resize-y min-h-[280px]"
          />
        ) : (
          <div className="p-6 bg-white min-h-[340px] max-h-[500px] overflow-y-auto">
            {renderFormattedPreview(value)}
          </div>
        )}
      </div>
    </div>
  );
};
