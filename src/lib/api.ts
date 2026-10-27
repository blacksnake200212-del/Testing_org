import { supabase, isSupabaseConfigured } from './supabase';
import { localStore } from './storage';
import { NewsItem, Director, OrgSettings, AuditLog } from '../types/database';

export const api = {
  // ---------------- NEWS API ----------------
  async getNews(): Promise<NewsItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('published_at', { ascending: false });
        if (error) throw error;
        return data as NewsItem[];
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
        return localStore.getNews();
      }
    }
    return localStore.getNews();
  },

  async getPublishedNews(): Promise<NewsItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        if (error) throw error;
        return data as NewsItem[];
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
        return localStore.getPublishedNews();
      }
    }
    return localStore.getPublishedNews();
  },

  async getNewsById(id: string): Promise<NewsItem | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .or(`id.eq.${id},slug.eq.${id}`)
          .single();
        if (error) throw error;
        return data as NewsItem;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
        return localStore.getNewsById(id) || null;
      }
    }
    return localStore.getNewsById(id) || null;
  },

  async saveNews(newsItem: Partial<NewsItem> & { title: string; content: string }): Promise<NewsItem> {
    if (isSupabaseConfigured && supabase) {
      try {
        if (newsItem.id && !newsItem.id.startsWith('news-')) {
          // Existing Supabase record
          const { data, error } = await supabase
            .from('news')
            .update({
              title: newsItem.title,
              slug: newsItem.slug,
              excerpt: newsItem.excerpt,
              content: newsItem.content,
              cover_image: newsItem.cover_image,
              category: newsItem.category,
              author: newsItem.author,
              author_role: newsItem.author_role,
              published_at: newsItem.published_at,
              status: newsItem.status,
              featured: newsItem.featured,
              updated_at: new Date().toISOString()
            })
            .eq('id', newsItem.id)
            .select()
            .single();
          if (error) throw error;
          localStore.saveNews(newsItem); // keep local mirrored
          return data as NewsItem;
        } else {
          // New Supabase record
          const slug = (newsItem.slug || newsItem.title)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          const { data, error } = await supabase
            .from('news')
            .insert([{
              title: newsItem.title,
              slug,
              excerpt: newsItem.excerpt,
              content: newsItem.content,
              cover_image: newsItem.cover_image,
              category: newsItem.category,
              author: newsItem.author,
              author_role: newsItem.author_role,
              published_at: newsItem.published_at || new Date().toISOString(),
              status: newsItem.status || 'published',
              featured: Boolean(newsItem.featured)
            }])
            .select()
            .single();
          if (error) throw error;
          localStore.saveNews(data as NewsItem);
          return data as NewsItem;
        }
      } catch (err) {
        console.error('Supabase save failed, saving to local store:', err);
      }
    }
    return localStore.saveNews(newsItem);
  },

  async deleteNews(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('news').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Supabase delete failed:', err);
      }
    }
    return localStore.deleteNews(id);
  },

  // ---------------- DIRECTORS API ----------------
  async getDirectors(): Promise<Director[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('directors')
          .select('*')
          .order('display_order', { ascending: true });
        if (error) throw error;
        return data as Director[];
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
        return localStore.getDirectors();
      }
    }
    return localStore.getDirectors();
  },

  async getActiveDirectors(): Promise<Director[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('directors')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        if (error) throw error;
        return data as Director[];
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local store:', err);
        return localStore.getActiveDirectors();
      }
    }
    return localStore.getActiveDirectors();
  },

  async saveDirector(item: Partial<Director> & { name: string; position: string; biography: string }): Promise<Director> {
    if (isSupabaseConfigured && supabase) {
      try {
        if (item.id && !item.id.startsWith('dir-')) {
          const { data, error } = await supabase
            .from('directors')
            .update({
              name: item.name,
              position: item.position,
              biography: item.biography,
              photo_url: item.photo_url,
              display_order: item.display_order,
              is_active: item.is_active,
              email: item.email,
              linkedin_url: item.linkedin_url,
              committee: item.committee,
              updated_at: new Date().toISOString()
            })
            .eq('id', item.id)
            .select()
            .single();
          if (error) throw error;
          localStore.saveDirector(item);
          return data as Director;
        } else {
          const { data, error } = await supabase
            .from('directors')
            .insert([{
              name: item.name,
              position: item.position,
              biography: item.biography,
              photo_url: item.photo_url,
              display_order: item.display_order || 99,
              is_active: item.is_active !== undefined ? item.is_active : true,
              email: item.email,
              linkedin_url: item.linkedin_url,
              committee: item.committee || 'Executive Board'
            }])
            .select()
            .single();
          if (error) throw error;
          localStore.saveDirector(data as Director);
          return data as Director;
        }
      } catch (err) {
        console.error('Supabase director save failed:', err);
      }
    }
    return localStore.saveDirector(item);
  },

  async reorderDirectors(orderedIds: string[]): Promise<Director[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        for (let i = 0; i < orderedIds.length; i++) {
          await supabase
            .from('directors')
            .update({ display_order: i + 1 })
            .eq('id', orderedIds[i]);
        }
      } catch (err) {
        console.error('Supabase reorder failed:', err);
      }
    }
    return localStore.reorderDirectors(orderedIds);
  },

  async deleteDirector(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('directors').delete().eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error('Supabase delete director failed:', err);
      }
    }
    return localStore.deleteDirector(id);
  },

  // ---------------- SETTINGS API ----------------
  async getSettings(): Promise<OrgSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('org_settings')
          .select('settings')
          .single();
        if (error) throw error;
        if (data?.settings) return data.settings as OrgSettings;
      } catch (err) {
        console.warn('Supabase settings fetch failed:', err);
      }
    }
    return localStore.getSettings();
  },

  async saveSettings(settings: OrgSettings): Promise<OrgSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('org_settings')
          .upsert({ id: 'primary', settings, updated_at: new Date().toISOString() });
      } catch (err) {
        console.error('Supabase settings save failed:', err);
      }
    }
    return localStore.saveSettings(settings);
  },

  // ---------------- FILE UPLOAD (Images) ----------------
  async uploadImage(file: File, bucket: 'news-images' | 'director-photos'): Promise<string> {
    if (isSupabaseConfigured && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        return data.publicUrl;
      } catch (err) {
        console.warn('Supabase storage upload failed, converting to Base64:', err);
      }
    }

    // Fallback: Convert to optimized base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  // ---------------- AUDIT LOGS ----------------
  async getAuditLogs(): Promise<AuditLog[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('audit_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(50);
        if (error) throw error;
        return data as AuditLog[];
      } catch (err) {
        console.warn('Supabase audit logs failed:', err);
      }
    }
    return localStore.getAuditLogs();
  }
};
