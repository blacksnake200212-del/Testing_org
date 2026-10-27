import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NewsItem, Director, OrgSettings, AuditLog } from '../types/database';
import { api } from '../lib/api';

interface OrgContextType {
  news: NewsItem[];
  publishedNews: NewsItem[];
  directors: Director[];
  activeDirectors: Director[];
  settings: OrgSettings;
  auditLogs: AuditLog[];
  isLoading: boolean;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
  refreshAll: () => Promise<void>;
  saveNewsItem: (newsData: Partial<NewsItem> & { title: string; content: string }) => Promise<NewsItem>;
  deleteNewsItem: (id: string) => Promise<boolean>;
  saveDirectorItem: (dirData: Partial<Director> & { name: string; position: string; biography: string }) => Promise<Director>;
  deleteDirectorItem: (id: string) => Promise<boolean>;
  reorderDirectorList: (orderedIds: string[]) => Promise<Director[]>;
  saveOrgSettings: (newSettings: OrgSettings) => Promise<OrgSettings>;
  uploadFile: (file: File, bucket: 'news-images' | 'director-photos') => Promise<string>;
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [settings, setSettings] = useState<OrgSettings>(api.getSettings as any);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const refreshAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedNews, fetchedDirectors, fetchedSettings, fetchedLogs] = await Promise.all([
        api.getNews(),
        api.getDirectors(),
        api.getSettings(),
        api.getAuditLogs()
      ]);
      setNews(fetchedNews);
      setDirectors(fetchedDirectors);
      setSettings(fetchedSettings);
      setAuditLogs(fetchedLogs);
    } catch (e) {
      console.error('Error refreshing organization data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const saveNewsItem = async (newsData: Partial<NewsItem> & { title: string; content: string }) => {
    try {
      const result = await api.saveNews(newsData);
      showToast(newsData.id ? 'News article updated successfully!' : 'New article published successfully!', 'success');
      await refreshAll();
      return result;
    } catch (err: any) {
      showToast(err.message || 'Failed to save news article', 'error');
      throw err;
    }
  };

  const deleteNewsItem = async (id: string) => {
    try {
      await api.deleteNews(id);
      showToast('Article removed successfully', 'info');
      await refreshAll();
      return true;
    } catch (err: any) {
      showToast('Failed to delete article', 'error');
      return false;
    }
  };

  const saveDirectorItem = async (dirData: Partial<Director> & { name: string; position: string; biography: string }) => {
    try {
      const result = await api.saveDirector(dirData);
      showToast(dirData.id ? 'Director profile updated successfully!' : 'New board member added!', 'success');
      await refreshAll();
      return result;
    } catch (err: any) {
      showToast(err.message || 'Failed to save director', 'error');
      throw err;
    }
  };

  const deleteDirectorItem = async (id: string) => {
    try {
      await api.deleteDirector(id);
      showToast('Director profile removed', 'info');
      await refreshAll();
      return true;
    } catch (err: any) {
      showToast('Failed to delete director', 'error');
      return false;
    }
  };

  const reorderDirectorList = async (orderedIds: string[]) => {
    try {
      const updated = await api.reorderDirectors(orderedIds);
      showToast('Board display order updated', 'success');
      setDirectors(updated);
      return updated;
    } catch (err: any) {
      showToast('Failed to update board order', 'error');
      throw err;
    }
  };

  const saveOrgSettings = async (newSettings: OrgSettings) => {
    try {
      const updated = await api.saveSettings(newSettings);
      setSettings(updated);
      showToast('Organization settings updated', 'success');
      return updated;
    } catch (err: any) {
      showToast('Failed to save organization settings', 'error');
      throw err;
    }
  };

  const uploadFile = async (file: File, bucket: 'news-images' | 'director-photos') => {
    try {
      return await api.uploadImage(file, bucket);
    } catch (err: any) {
      showToast('Failed to upload image file', 'error');
      throw err;
    }
  };

  const publishedNews = news.filter(n => n.status === 'published');
  const activeDirectors = directors.filter(d => d.is_active);

  return (
    <OrgContext.Provider
      value={{
        news,
        publishedNews,
        directors,
        activeDirectors,
        settings,
        auditLogs,
        isLoading,
        toast,
        showToast,
        hideToast,
        refreshAll,
        saveNewsItem,
        deleteNewsItem,
        saveDirectorItem,
        deleteDirectorItem,
        reorderDirectorList,
        saveOrgSettings,
        uploadFile
      }}
    >
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error('useOrg must be used within an OrgProvider');
  }
  return context;
};
