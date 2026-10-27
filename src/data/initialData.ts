import { NewsItem, Director, OrgSettings } from '../types/database';

export const initialSettings: OrgSettings = {
  name: 'National Foundation for Development & Governance',
  short_name: 'NFDG Sri Lanka',
  tagline: 'Fostering Transparency, Empowering Communities, Advancing Progress',
  description: 'An independent national apex organization dedicated to sustainable institutional development, public policy research, leadership excellence, and community advancement across the nation.',
  mission: 'To empower institutions and civil society through ethical leadership, sustainable resource governance, and participatory research initiatives that improve societal well-being.',
  vision: 'A transparent, resilient, and prosperous society steered by forward-looking leadership and equitable opportunities for all.',
  founded_year: 2008,
  email: 'info@organization.lk',
  phone: '+94 11 289 4500',
  hotline: '+94 77 123 4567',
  address: 'Level 14, Apex Tower, 45 Galle Road',
  city: 'Colombo 03',
  country: 'Sri Lanka',
  registration_no: 'GA-2008-8841',
  socials: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
  primary_color: '#1e40af'
};

export const initialDirectors: Director[] = [
  {
    id: 'dir-1',
    name: 'Dr. Senaka Wickramasinghe',
    position: 'Chairman of the Board',
    biography: 'Dr. Wickramasinghe is a senior public economist and corporate strategist with over 28 years of institutional advisory experience across South Asia. Former Senior Economic Advisor to multilateral development agencies and fellow of the Institute of Directors.',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    display_order: 1,
    is_active: true,
    email: 'chairman@organization.lk',
    linkedin_url: 'https://linkedin.com',
    committee: 'Executive Board',
    term_start: '2021-01',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'dir-2',
    name: 'Prof. Anoma Jayasuriya',
    position: 'Vice Chairperson',
    biography: 'Distinguished Professor of Environmental Policy and Sustainability. Has authored 40+ peer-reviewed treatises on climate resilience, participatory governance, and community infrastructure planning.',
    photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    display_order: 2,
    is_active: true,
    email: 'vicechair@organization.lk',
    linkedin_url: 'https://linkedin.com',
    committee: 'Executive Board',
    term_start: '2022-03',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'dir-3',
    name: 'Deshamanya Rohan Fernando, PC',
    position: 'Director of Governance & Legal Affairs',
    biography: 'President’s Counsel with four decades of legal standing in constitutional law, administrative justice, and statutory compliance. Chairs the Audit and Risk Governance Subcommittee.',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    display_order: 3,
    is_active: true,
    email: 'legal@organization.lk',
    linkedin_url: 'https://linkedin.com',
    committee: 'Audit & Governance',
    term_start: '2019-06',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'dir-4',
    name: 'Ms. Tharushi Samarasinghe, FCA',
    position: 'Director of Finance & Operations',
    biography: 'Fellow Chartered Accountant and veteran chief financial executive. Spearheads financial transparency, donor project compliance, and modern ERP transitions for international development projects.',
    photo_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    display_order: 4,
    is_active: true,
    email: 'finance@organization.lk',
    linkedin_url: 'https://linkedin.com',
    committee: 'Finance & Remuneration',
    term_start: '2020-08',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'dir-5',
    name: 'Eng. Kusal Gunaratne',
    position: 'Director of Digital Strategy & Innovation',
    biography: 'Tech pioneer and systems architect who previously led national digital transformation roadmaps and civic tech data platforms. Oversees data governance and digital capacity programs.',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    display_order: 5,
    is_active: true,
    email: 'digital@organization.lk',
    linkedin_url: 'https://linkedin.com',
    committee: 'Innovation & Technology',
    term_start: '2023-01',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'dir-6',
    name: 'Mrs. Chandani Abeykoon',
    position: 'Director of Community Engagement',
    biography: 'Social anthropologist and civic community organizer. Led rural empowerment programs across 18 districts, focusing on youth entrepreneurship and women in governance.',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    display_order: 6,
    is_active: true,
    email: 'community@organization.lk',
    linkedin_url: 'https://linkedin.com',
    committee: 'Community Outreach',
    term_start: '2021-11',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  },
  {
    id: 'dir-7',
    name: 'Mr. Sarath Mendis',
    position: 'Former Director of Strategy (Emeritus)',
    biography: 'Served as Board Member and Strategic Planning Advisor between 2014 and 2021. Successfully laid the foundation for the organization’s current 10-year development charter.',
    photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    display_order: 7,
    is_active: false,
    committee: 'Advisory Council',
    term_start: '2014-01',
    term_end: '2021-12',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z'
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Annual Leadership Summit 2026: Accelerating Sustainable Development Goals',
    slug: 'annual-leadership-summit-2026-accelerating-sustainable-development-goals',
    excerpt: 'Over 400 national leaders, institutional directors, and civic innovators gathered in Colombo to ratify the National Sustainable Governance Charter for 2026-2030.',
    content: `### Historic Gathering at Apex Convention Centre

The National Foundation for Development & Governance successfully concluded its flagship Annual Leadership Summit today. With representatives from all 9 provinces, regional development chambers, and multilateral partner bodies, the summit focused on key pillars:

- **Institutional Integrity & Transparency:** Enhancing public accountability mechanisms through digital oversight and citizen dashboards.
- **Climate Resilient Infrastructure:** Aligning regional projects with carbon-neutral standards and water conservation guidelines.
- **Youth Leadership & Civic Engagement:** Launching the 2026 National Youth Fellowship with 100 subsidized positions.

> "Our strength lies in collective civic determination. True leadership is not about maintaining authority, but about equipping communities to solve their own challenges with dignity and transparency."  
> — *Dr. Senaka Wickramasinghe, Chairman of the Board*

#### Key Deliverables Ratified
Delegates unanimously signed the **Colombo Accord on Transparent Governance**, committing partner bodies to publish annual integrity audits and open-data reports accessible to the general public.

The Foundation will establish five regional monitoring centers over the upcoming financial quarters to support municipal council implementation.`,
    cover_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
    category: 'Event',
    author: 'Editorial Secretariat',
    author_role: 'Communications Office',
    published_at: '2026-03-15T08:30:00Z',
    status: 'published',
    views: 1240,
    featured: true,
    created_at: '2026-03-15T08:00:00Z',
    updated_at: '2026-03-15T08:30:00Z'
  },
  {
    id: 'news-2',
    title: 'Board of Directors Announces Expansion of Rural Technology Hubs',
    slug: 'board-of-directors-announces-expansion-of-rural-technology-hubs',
    excerpt: 'Phase III of the National Digital Empowerment Initiative will install 15 solar-powered learning and technology centers across regional districts.',
    content: `Following the Board of Directors quarterly review meeting, the Foundation has approved a capital allocation of LKR 180 Million dedicated to establishing 15 state-of-the-art Technology and Learning Hubs in underserved regional communities.

Each hub will feature:
1. High-speed broadband satellite connectivity.
2. Solar microgrids ensuring uninterrupted 24/7 power.
3. Training laboratories for modern software development, digital marketing, and agritech innovation.
4. Co-working facilities for local grassroots entrepreneurs and students.

Eng. Kusal Gunaratne, Director of Digital Strategy, noted that pilot hubs in Monaragala and Polonnaruwa have already trained over 1,200 rural graduates, with 68% securing remote or regional employment within six months.

Construction work will commence in April 2026 with community partner oversight.`,
    cover_image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    category: 'Announcement',
    author: 'Board Secretariat',
    author_role: 'Governance Council',
    published_at: '2026-03-02T10:15:00Z',
    status: 'published',
    views: 890,
    featured: true,
    created_at: '2026-03-02T09:00:00Z',
    updated_at: '2026-03-02T10:15:00Z'
  },
  {
    id: 'news-3',
    title: 'Quarterly Financial & Transparency Audit Report Q4 Released',
    slug: 'quarterly-financial-and-transparency-audit-report-q4-released',
    excerpt: 'Demonstrating our ongoing commitment to public trust, the full unedited independent audit report for the preceding fiscal quarter is now available.',
    content: `In compliance with the Foundation's Open Governance Standard, the complete independent audit report for the fourth fiscal quarter has been published.

The audit was performed by an independent international audit firm, confirming 100% compliance across all project expenditure, procurement cycles, and grant disbursements.

**Highlights of the report include:**
- Program expenditure ratio maintained at 88.4% of total budget.
- Administrative costs contained within 7.2%.
- Zero non-compliance findings across 24 concurrent district development grants.

Citizens and researchers can download the complete audited PDF package from our publications archive.`,
    cover_image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200',
    category: 'Governance',
    author: 'Audit & Risk Committee',
    author_role: 'Financial Oversight',
    published_at: '2026-02-18T14:00:00Z',
    status: 'published',
    views: 540,
    featured: false,
    created_at: '2026-02-18T13:30:00Z',
    updated_at: '2026-02-18T14:00:00Z'
  },
  {
    id: 'news-4',
    title: 'Women in Leadership Fellowship: 2026 Applications Now Open',
    slug: 'women-in-leadership-fellowship-2026-applications-open',
    excerpt: 'A 9-month executive mentorship and leadership accelerator designed for women leaders driving societal impact in non-profit, health, and education sectors.',
    content: `Applications are officially open for the prestigious 2026 cohort of the Women in Leadership Fellowship (WLF).

Supported by international civil society partners, the program provides:
- Executive mentorship from former cabinet advisors and Fortune 500 directors.
- Capstone grant funding up to LKR 1,500,000 for approved community development initiatives.
- Strategic networking retreats in Colombo and Kandy.

Eligible applicants must have at least 3 years of demonstrated grassroots or organizational management experience.

Deadline for online submissions is April 30, 2026. Interested candidates should submit their CV and statement of purpose via the online portal.`,
    cover_image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200',
    category: 'Community',
    author: 'Ms. Tharushi Samarasinghe',
    author_role: 'Program Director',
    published_at: '2026-02-05T11:00:00Z',
    status: 'published',
    views: 1620,
    featured: false,
    created_at: '2026-02-05T10:00:00Z',
    updated_at: '2026-02-05T11:00:00Z'
  },
  {
    id: 'news-5',
    title: 'Strategic Partnership Signed with Clean Energy Research Council',
    slug: 'strategic-partnership-signed-with-clean-energy-research-council',
    excerpt: 'New collaborative agreement aims to accelerate micro-hydro and biomass pilot installations across agricultural estates in Uva and Central provinces.',
    content: `A memorandum of understanding (MoU) was signed this morning between our Board of Directors and the Clean Energy Research Council.

The multi-year alliance will target renewable energy integration for 50 agricultural communities, reducing operational reliance on fossil fuel generators while generating carbon offset credits for community development trusts.

A joint technical committee has been constituted to oversee environmental feasibility and local stakeholder consultations.`,
    cover_image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1200',
    category: 'Press Release',
    author: 'Communications Bureau',
    author_role: 'Media Relations',
    published_at: '2026-01-20T16:45:00Z',
    status: 'published',
    views: 710,
    featured: false,
    created_at: '2026-01-20T16:00:00Z',
    updated_at: '2026-01-20T16:45:00Z'
  },
  {
    id: 'news-6',
    title: '[Draft] Upcoming Stakeholder Consultation: National Health Policy Draft 2027',
    slug: 'draft-upcoming-stakeholder-consultation-health-policy-2027',
    excerpt: 'Internal draft announcement for the upcoming healthcare access roundtables slated for Q3.',
    content: `This article is currently under editorial review. Staff are preparing the complete briefing packet and registration links for institutional delegates.`,
    cover_image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200',
    category: 'Announcement',
    author: 'Internal Staff',
    author_role: 'Editor',
    published_at: '2026-04-01T00:00:00Z',
    status: 'draft',
    views: 12,
    featured: false,
    created_at: '2026-03-20T12:00:00Z',
    updated_at: '2026-03-20T12:00:00Z'
  }
];
