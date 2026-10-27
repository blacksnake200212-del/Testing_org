import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';
import { useOrg } from '../../context/OrgContext';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket: 'news-images' | 'director-photos';
  label?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  presets?: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  bucket,
  label = 'Cover Image',
  aspectRatio = 'video',
  presets = []
}) => {
  const { uploadFile, showToast } = useOrg();
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultPresets = bucket === 'director-photos'
    ? [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      ]
    : [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200',
      ];

  const stockList = presets.length > 0 ? presets : defaultPresets;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP)', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size is too large (Maximum 5MB allowed)', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadFile(file, bucket);
      onChange(url);
      setUrlInput(url);
      showToast('Photo uploaded and ready!', 'success');
    } catch {
      showToast('Upload failed. Please try a direct URL.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  }[aspectRatio];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'presets' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Stock Gallery
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Input / Control Column */}
        <div className="md:col-span-7 space-y-3">
          {activeTab === 'upload' && (
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isUploading
                  ? 'border-brand-400 bg-brand-50/50'
                  : 'border-slate-300 hover:border-brand-500 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="flex flex-col items-center justify-center">
                {isUploading ? (
                  <RefreshCw className="w-8 h-8 text-brand-600 animate-spin mb-2" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                )}
                <p className="text-sm font-semibold text-slate-800">
                  {isUploading ? 'Uploading to secure storage...' : 'Click or drag image file here'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  className="w-full pl-9 pr-20 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <button
                  type="button"
                  onClick={() => {
                    onChange(urlInput);
                    showToast('Image URL applied', 'info');
                  }}
                  className="absolute right-1.5 top-1.5 px-3 py-1.5 text-xs bg-slate-900 text-white rounded-md hover:bg-slate-800"
                >
                  Apply
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Paste any publicly hosted image URL from your CDN or website.
              </p>
            </div>
          )}

          {activeTab === 'presets' && (
            <div>
              <p className="text-xs text-slate-500 mb-2">Click any curated professional photo to use it:</p>
              <div className="grid grid-cols-5 gap-2">
                {stockList.map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onChange(presetUrl);
                      setUrlInput(presetUrl);
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 aspect-square transition-transform hover:scale-105 ${
                      value === presetUrl ? 'border-brand-600 ring-2 ring-brand-500' : 'border-transparent'
                    }`}
                  >
                    <img src={presetUrl} alt="Preset thumbnail" className="w-full h-full object-cover" />
                    {value === presetUrl && (
                      <div className="absolute inset-0 bg-brand-600/40 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Column */}
        <div className="md:col-span-5">
          <div className="border border-slate-200 rounded-xl p-2 bg-slate-50">
            <p className="text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Live Preview
            </p>
            <div className={`w-full overflow-hidden rounded-lg bg-slate-200 ${aspectClass} relative`}>
              {value ? (
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder on broken image
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200';
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <ImageIcon className="w-8 h-8 mb-1 text-slate-300" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
