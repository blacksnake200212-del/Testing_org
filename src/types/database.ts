export type NewsCategory = 'Press Release' | 'Event' | 'Announcement' | 'Community' | 'Achievement' | 'Governance';

export type NewsStatus = 'draft' | 'published' | 'archived';

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: NewsCategory;
  author: string;
  author_role?: string;
  published_at: string; // ISO date string
  status: NewsStatus;
  views?: number;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Director {
  id: string;
  name: string;
  position: string;
  biography: string;
  photo_url: string;
  display_order: number;
  is_active: boolean;
  email?: string;
  linkedin_url?: string;
  committee?: string; // e.g. "Executive Board", "Audit & Risk", "Advisory Council"
  term_start?: string;
  term_end?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'editor' | 'viewer';
  avatar_url?: string;
  last_login?: string;
}

export interface AuditLog {
  id: string;
  user_email: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'REORDER';
  entity_type: 'NEWS' | 'DIRECTOR' | 'SETTINGS';
  entity_name: string;
  details?: string;
  timestamp: string;
}

export interface OrgSettings {
  name: string;
  short_name: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  founded_year: number;
  email: string;
  phone: string;
  hotline: string;
  address: string;
  city: string;
  country: string;
  registration_no: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  primary_color?: string;
}
