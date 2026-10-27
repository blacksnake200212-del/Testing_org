# WordPress Installation & Deployment Guide

This document describes how to deploy the **Organization Corporate Theme** and the **Board of Directors Management Plugin** to any standard WordPress hosting environment.

---

## Package Contents

```
wordpress/
├── wp-content/
│   ├── plugins/
│   │   └── org-board-of-directors/     <-- Dedicated Board Management Plugin
│   └── themes/
│       └── organization-corporate/     <-- Professional Corporate Theme
├── sample-data/
│   └── organization-content.xml        <-- 1-Click Import file (Directors, News, Pages)
└── docs/
    ├── WORDPRESS_STAFF_GUIDE.md        <-- Non-technical user guide
    └── WORDPRESS_INSTALLATION_GUIDE.md <-- Technical deployment guide
```

---

## 1. Installation Steps

### Step 1: Install WordPress
Set up WordPress on your host (e.g., Hostinger, Bluehost, WP Engine, cPanel, or LocalWP).

### Step 2: Install the Board of Directors Plugin
1. Compress the folder `org-board-of-directors` into `org-board-of-directors.zip` (or upload the folder directly to `wp-content/plugins/`).
2. In the WordPress Admin Dashboard:
   * Go to **Plugins** -> **Add New** -> **Upload Plugin**.
   * Choose `org-board-of-directors.zip` and click **Install Now**.
   * Click **Activate Plugin**.
3. You will immediately see a new **Board of Directors** menu in your WordPress sidebar.

### Step 3: Install the Corporate Theme
1. Compress the folder `organization-corporate` into `organization-corporate.zip` (or copy the folder to `wp-content/themes/`).
2. In the WordPress Admin Dashboard:
   * Go to **Appearance** -> **Themes** -> **Add New** -> **Upload Theme**.
   * Choose `organization-corporate.zip` and click **Install Now**.
   * Click **Activate**.

### Step 4: Import Sample Data (1-Click Setup)
To instantly load the pre-configured sample news, directors, and pages:
1. Go to **Tools** -> **Import**.
2. Under **WordPress**, click **Install Now** (if not already installed), then click **Run Importer**.
3. Choose the file `wordpress/sample-data/organization-content.xml`.
4. Click **Upload file and import**.
5. Assign posts to your admin user and check **Download and import file attachments**, then click **Submit**.

### Step 5: Configure Reading Settings (Front Page)
1. In the WordPress Admin, go to **Settings** -> **Reading**.
2. Under **Your homepage displays**, select **A static page**.
3. Set **Homepage** to `Home`.
4. Set **Posts page** to `News & Announcements`.
5. Click **Save Changes**.

---

## 2. Page Templates Overview

When creating pages under **Pages** -> **Add New**, assign the appropriate template in the right sidebar under **Page Attributes -> Template**:

| Page | Template Name | Function |
| :--- | :--- | :--- |
| **Home** | Front Page (Automatic) | Hero banner, stats ribbon, mission/vision, latest news, executive board highlight |
| **About Us** | `About Us` | Core mission, vision, 4 governance pillars, institutional timeline |
| **Board of Directors** | `Board of Directors` | Executive board gallery, hierarchy order, emeritus section, bio modal popup |
| **News** | Default (or Posts Page) | News cards, categories, dates, excerpts, reading links |
| **Contact Us** | `Contact Us` | Secretariat address, phone, interactive inquiry form with nonce validation |

---

## 3. Shortcode Reference

You can display the Board of Directors grid anywhere on any page using the shortcode:

```text
[board_of_directors]
```

### Supported Parameters:
* `status`: Filter by status (`active`, `emeritus`, or `all`). Default is `active`.
  ```text
  [board_of_directors status="emeritus"]
  ```
* `columns`: Number of columns on desktop (`3` or `4`). Default is `4`.
  ```text
  [board_of_directors columns="3"]
  ```
* `committee`: Filter by committee slug (e.g., `executive-board`, `audit-governance`).
  ```text
  [board_of_directors committee="executive-board"]
  ```

---

## 4. User Roles & Security

* **Administrators**: Full access to themes, plugins, settings, news, and directors.
* **Editors**: Can add, edit, and publish news articles and board members, but cannot modify theme code or plugins. This is the recommended role for Secretariat communications staff.
