# Organization Website & Content Management System (CMS)

A production-ready, full-stack institutional portal featuring a **Public Website** and a **Private Admin Dashboard** for dynamic **News Management** and **Board of Directors Management**. 

Authorized organization staff can publish press releases, appoint or reorder directors, upload photos, and update institutional information from any device **without modifying source code or redeploying the website**.

---

## Architecture & Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Lucide Icons | Responsive desktop & mobile institutional UI, rich text editor, drag-and-drop media uploader |
| **Routing** | React Router DOM v6 | Clean client-side routing with protected admin routes and SPA fallback |
| **Backend & Database** | Supabase (PostgreSQL, Auth, Storage) | Relational database, Row Level Security (RLS), image storage buckets, audit logging |
| **Hosting** | Netlify | Static SPA edge hosting, SSL/HTTPS, custom domain support (`organization.lk`) |
| **Fallback Layer** | LocalStorage Persistent Store | Immediate out-of-the-box evaluation without requiring third-party credentials upfront |

---

## 1. System Structure

### A. Public Website (No login required)
* **Home Page (`/`)**: Hero banner, statutory identity, key performance indicators, featured story, latest news grid, and executive board spotlight.
* **About Us (`/about`)**: Core mission, vision, ethical governance pillars, and chronological historical milestone timeline.
* **News & Announcements (`/news`)**: Live search filter, category tabs (*Press Release*, *Event*, *Announcement*, *Community*, *Governance*), news cards, and reading estimates.
* **Full Article View (`/news/:id`)**: Formatted rich-text reading experience, author attribution, cover image, and 1-click clipboard link sharing.
* **Board of Directors (`/directors`)**: Governing leadership gallery ordered by hierarchy (Chairman, Vice Chair, etc.), committee filters, and detailed biographical popup modals.
* **Emeritus Board Section**: Honors former board members while keeping the active executive committee up to date.
* **Contact Us (`/contact`)**: Official secretariat address, hotlines, emails, interactive inquiry form with automated ticket reference generator, and map directions.

### B. Private Admin Dashboard (Authorized Staff Access)
* **Secure Authentication (`/admin/login`)**: Role-based login (Super Admin & Editor) with instant 1-click evaluation shortcuts.
* **Dashboard Overview (`/admin/dashboard`)**: KPI cards (Total Articles, Published, Drafts, Board Members), quick action shortcuts, and live audit activity feed.
* **News Management (`/admin/news`)**: Article table with search, category filtering, instant publish/draft toggles, and deletion confirmations.
* **Rich Article Editor (`/admin/news/new` & `/admin/news/edit/:id`)**:
  * Headline & automated slug generation.
  * Short summary / lead excerpt.
  * Full article body with rich text toolbar (Headings H2/H3, Bold, Italic, Bulleted/Numbered Lists, Blockquotes, Links).
  * Cover image uploader (supports file drag-and-drop, public URLs, or stock presets).
  * Category picker, publish date selector, author details, and Home Page feature toggle.
  * **Save as Draft** (internal preparation) or **Publish Live** (public view).
  * **Live Article Preview modal** matching the public reader view before publishing.
* **Board of Directors Management (`/admin/directors`)**:
  * Add new director with name, title, committee, email, and biography.
  * Direct photo uploader with portrait aspect ratio.
  * **1-Click Hierarchy Reordering** (move directors Up/Down to rearrange Chairman, Vice Chair, etc.).
  * **Active vs. Emeritus Toggle**: Preserves historical organizational memory rather than deleting respected former leaders.
* **Organization Profile Settings (`/admin/settings`)**: Update organization name, acronym, hotline, emails, address, mission, and vision.
* **Built-in Staff Guide (`/admin/guide`)**: Visual training manual accessible directly in the browser for non-technical team members.
* **Supabase SQL Migration Assistant (`/admin/sql-setup`)**: Built-in script viewer with 1-click copy for Supabase setup.

---

## 2. Quick Start & Local Development

### Prerequisites
* **Node.js** (v18 or higher)
* **npm**

### Installation
```bash
# Clone or navigate to the project directory
cd "SAMPLE ORG"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### Instant Staff Login (Evaluation Mode)
You can evaluate the entire CMS immediately without configuring Supabase:
1. Navigate to `http://localhost:5173/admin/login` (or click **Staff Portal** in the navigation bar).
2. Click **"Admin Login"** (or enter `admin@organization.lk` / `admin123`).
3. You will enter `/admin/dashboard` where you can immediately create news, upload images, and reorder directors.

---

## 3. Connecting Supabase (Production Database & Storage)

### Step 1: Create a Supabase Project
1. Visit [supabase.com](https://supabase.com) and create a free project.
2. Note your **Project URL** and **anon / public key** from *Project Settings -> API*.

### Step 2: Run Database Migration
1. In your Supabase dashboard, open the **SQL Editor**.
2. Copy and paste the entire script from `supabase/schema.sql` (or from `/admin/sql-setup` inside the app).
3. Click **Run**. This automatically creates:
   * `news` table (with slug indexes and publication status)
   * `directors` table (with display order and active/emeritus status)
   * `profiles` table (linked to Supabase Auth)
   * `org_settings` and `audit_logs` tables
   * `news-images` and `director-photos` public storage buckets
   * Row Level Security (RLS) policies protecting database writes while allowing public reads.

### Step 3: Configure Environment Variables
Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
```
*(Alternatively, you can paste these keys into `/admin/sql-setup` inside the admin dashboard to save them to your browser session).*

---

## 4. Deploying to Netlify

This project is pre-configured for Netlify single-page application deployment:

1. **Push to Git**: Push this repository to GitHub or GitLab.
2. **Connect to Netlify**:
   * Log into [netlify.com](https://www.netlify.com).
   * Click **"Add new site" -> "Import an existing project"**.
   * Select your repository.
3. **Build Settings**:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
4. **Environment Variables**:
   * In Netlify *Site Configuration -> Environment variables*, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. **Custom Domain**:
   * Under *Domain Management*, add your organization domain (e.g., `organization.lk` or `www.organization.lk`).
   * Follow Netlify's DNS guide to point your CNAME / A records. Netlify provisions automated SSL/HTTPS certificates.

*Note: The included `netlify.toml` automatically handles SPA routing redirects (`/* -> /index.html 200`) so public and admin links never 404.*

---

## 5. Staff Operating Workflow

### How Staff Upload & Publish News
1. Open `organization.lk/admin/login` and log in.
2. Click **"Add News"** in the sidebar.
3. Enter the headline, category, publication date, and short summary.
4. Compose the article body using the rich-text formatting buttons (Headings, Quotes, Lists, Bold).
5. Upload a cover photo (drag-and-drop from your desktop, phone, or paste an image URL).
6. Click **"Preview"** to verify the formatting.
7. Click **"Publish Live"**. The public News page updates immediately without touching code!

### How Staff Update the Board of Directors
1. In the Admin Dashboard, click **"Board of Directors"**.
2. **To edit an existing director:** Click the edit icon next to their name, update their title or biography, replace their photo, and save.
3. **To appoint a new director:** Click **"Add New Director"**, enter their details and photo, and save.
4. **To reorder positions:** Use the **Up (↑)** and **Down (↓)** buttons to position the Chairman at #1, Vice Chair at #2, etc.
5. **When a director steps down:** Toggle their status from *Active* to *Past / Emeritus Member*. They will move to the historical advisory roster on the public website automatically.

---

## 6. Security & Row Level Security (RLS)

* **Public Read Permissions**: Visitors can only read articles with `status = 'published'` and directors with `is_active = true`.
* **Private Write Permissions**: Direct database inserts, updates, and deletions require authenticated staff session tokens validated by Supabase PostgreSQL RLS.
* **Audit Trail**: Every creation, modification, and status change is logged with timestamp and user email.
