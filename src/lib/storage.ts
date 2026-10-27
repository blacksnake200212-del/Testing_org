import { NewsItem, Director, OrgSettings, AuditLog } from '../types/database';
import { initialNews, initialDirectors, initialSettings } from '../data/initialData';

const KEYS = {
  NEWS: 'nfdg_news',
  DIRECTORS: 'nfdg_directors',
  SETTINGS: 'nfdg_settings',
  AUDIT_LOGS: 'nfdg_audit_logs',
};

// Seed initial data if not present
export const initLocalStorage = () => {
  if (!localStorage.getItem(KEYS.NEWS)) {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(initialNews));
  }
  if (!localStorage.getItem(KEYS.DIRECTORS)) {
    localStorage.setItem(KEYS.DIRECTORS, JSON.stringify(initialDirectors));
  }
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));
  }
  if (!localStorage.getItem(KEYS.AUDIT_LOGS)) {
    const initialLogs: AuditLog[] = [
      {
        id: 'log-1',
        user_email: 'admin@organization.lk',
        action: 'PUBLISH',
        entity_type: 'NEWS',
        entity_name: 'Annual Leadership Summit 2026',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'log-2',
        user_email: 'admin@organization.lk',
        action: 'UPDATE',
        entity_type: 'DIRECTOR',
        entity_name: 'Dr. Senaka Wickramasinghe',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ];
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(initialLogs));
  }
};

export const localStore = {
  // News
  getNews: (): NewsItem[] => {
    initLocalStorage();
    try {
      return JSON.parse(localStorage.getItem(KEYS.NEWS) || '[]');
    } catch {
      return initialNews;
    }
  },

  getPublishedNews: (): NewsItem[] => {
    return localStore.getNews().filter(n => n.status === 'published');
  },

  getNewsById: (id: string): NewsItem | undefined => {
    return localStore.getNews().find(n => n.id === id || n.slug === id);
  },

  saveNews: (item: Partial<NewsItem> & { title: string; content: string }): NewsItem => {
    const newsList = localStore.getNews();
    const now = new Date().toISOString();
    
    if (item.id) {
      // Update
      const index = newsList.findIndex(n => n.id === item.id);
      if (index !== -1) {
        const updated: NewsItem = {
          ...newsList[index],
          ...item,
          updated_at: now
        };
        newsList[index] = updated;
        localStorage.setItem(KEYS.NEWS, JSON.stringify(newsList));
        localStore.addAuditLog('UPDATE', 'NEWS', updated.title);
        return updated;
      }
    }

    // Create new
    const id = `news-${Date.now()}`;
    const slug = (item.slug || item.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newItem: NewsItem = {
      id,
      title: item.title,
      slug,
      excerpt: item.excerpt || item.content.slice(0, 160).replace(/[#*`_]/g, '') + '...',
      content: item.content,
      cover_image: item.cover_image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
      category: item.category || 'Announcement',
      author: item.author || 'Communications Office',
      author_role: item.author_role || 'Staff Editor',
      published_at: item.published_at || now,
      status: item.status || 'published',
      views: 0,
      featured: Boolean(item.featured),
      created_at: now,
      updated_at: now
    };

    newsList.unshift(newItem);
    localStorage.setItem(KEYS.NEWS, JSON.stringify(newsList));
    localStore.addAuditLog(newItem.status === 'published' ? 'PUBLISH' : 'CREATE', 'NEWS', newItem.title);
    return newItem;
  },

  deleteNews: (id: string): boolean => {
    const newsList = localStore.getNews();
    const item = newsList.find(n => n.id === id);
    const filtered = newsList.filter(n => n.id !== id);
    localStorage.setItem(KEYS.NEWS, JSON.stringify(filtered));
    if (item) {
      localStore.addAuditLog('DELETE', 'NEWS', item.title);
    }
    return true;
  },

  // Directors
  getDirectors: (): Director[] => {
    initLocalStorage();
    try {
      const dirs: Director[] = JSON.parse(localStorage.getItem(KEYS.DIRECTORS) || '[]');
      return dirs.sort((a, b) => a.display_order - b.display_order);
    } catch {
      return initialDirectors;
    }
  },

  getActiveDirectors: (): Director[] => {
    return localStore.getDirectors().filter(d => d.is_active);
  },

  getDirectorById: (id: string): Director | undefined => {
    return localStore.getDirectors().find(d => d.id === id);
  },

  saveDirector: (item: Partial<Director> & { name: string; position: string; biography: string }): Director => {
    const list = localStore.getDirectors();
    const now = new Date().toISOString();

    if (item.id) {
      const idx = list.findIndex(d => d.id === item.id);
      if (idx !== -1) {
        const updated: Director = {
          ...list[idx],
          ...item,
          updated_at: now
        };
        list[idx] = updated;
        list.sort((a, b) => a.display_order - b.display_order);
        localStorage.setItem(KEYS.DIRECTORS, JSON.stringify(list));
        localStore.addAuditLog('UPDATE', 'DIRECTOR', updated.name, `Position: ${updated.position}`);
        return updated;
      }
    }

    const nextOrder = list.length > 0 ? Math.max(...list.map(d => d.display_order)) + 1 : 1;
    const newDirector: Director = {
      id: `dir-${Date.now()}`,
      name: item.name,
      position: item.position,
      biography: item.biography,
      photo_url: item.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      display_order: item.display_order ?? nextOrder,
      is_active: item.is_active !== undefined ? item.is_active : true,
      email: item.email || '',
      linkedin_url: item.linkedin_url || '',
      committee: item.committee || 'Executive Board',
      created_at: now,
      updated_at: now
    };

    list.push(newDirector);
    list.sort((a, b) => a.display_order - b.display_order);
    localStorage.setItem(KEYS.DIRECTORS, JSON.stringify(list));
    localStore.addAuditLog('CREATE', 'DIRECTOR', newDirector.name, `Position: ${newDirector.position}`);
    return newDirector;
  },

  reorderDirectors: (orderedIds: string[]): Director[] => {
    const list = localStore.getDirectors();
    const updated = list.map(dir => {
      const index = orderedIds.indexOf(dir.id);
      if (index !== -1) {
        return { ...dir, display_order: index + 1 };
      }
      return dir;
    });

    updated.sort((a, b) => a.display_order - b.display_order);
    localStorage.setItem(KEYS.DIRECTORS, JSON.stringify(updated));
    localStore.addAuditLog('REORDER', 'DIRECTOR', 'Board hierarchy reordered');
    return updated;
  },

  deleteDirector: (id: string): boolean => {
    const list = localStore.getDirectors();
    const target = list.find(d => d.id === id);
    const filtered = list.filter(d => d.id !== id);
    localStorage.setItem(KEYS.DIRECTORS, JSON.stringify(filtered));
    if (target) {
      localStore.addAuditLog('DELETE', 'DIRECTOR', target.name);
    }
    return true;
  },

  // Settings
  getSettings: (): OrgSettings => {
    initLocalStorage();
    try {
      return JSON.parse(localStorage.getItem(KEYS.SETTINGS) || JSON.stringify(initialSettings));
    } catch {
      return initialSettings;
    }
  },

  saveSettings: (settings: OrgSettings): OrgSettings => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    localStore.addAuditLog('UPDATE', 'SETTINGS', 'Organization Profile and Information');
    return settings;
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => {
    initLocalStorage();
    try {
      return JSON.parse(localStorage.getItem(KEYS.AUDIT_LOGS) || '[]');
    } catch {
      return [];
    }
  },

  addAuditLog: (
    action: AuditLog['action'], 
    entity_type: AuditLog['entity_type'], 
    entity_name: string,
    details?: string
  ) => {
    const logs = localStore.getAuditLogs();
    const userEmail = localStorage.getItem('auth_user_email') || 'admin@organization.lk';
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user_email: userEmail,
      action,
      entity_type,
      entity_name,
      details,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    // keep latest 100 logs
    localStorage.setItem(KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 100)));
  },

  resetToDefault: () => {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(initialNews));
    localStorage.setItem(KEYS.DIRECTORS, JSON.stringify(initialDirectors));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));
    window.location.reload();
  }
};
