# KMIT Website — Admin Panel Implementation Plan

## Goal
To implement a robust, secure, and user-friendly **Admin Portal** for the college website. This portal will allow authorized personnel to manage website content dynamically without requiring developer intervention, ensuring the site remains up-to-date with academic schedules, placements, and campus news.

---

## 1. What Changes Does an Admin Make in a College Website?
A college website is a living entity. Based on best practices and the existing schemas (`AcademicDoc`, `Department`, `Faculty`, `Notice`, `Page`, `SiteData`), an admin will handle:

*   **Academics & Faculty:** Updating faculty profiles, managing department details, uploading syllabi, and updating academic calendars/exam schedules.
*   **Announcements & Notices:** Pushing urgent alerts to the homepage ticker, publishing circulars, and managing the notice board.
*   **Placements & Recruiters:** Adding new recruiter logos, updating placement statistics (e.g., Highest CTC, total offers), and posting student testimonials.
*   **Dynamic Pages & Content:** Editing text and images on static pages (About Us, Infrastructure, Anti-Ragging Committees, etc.).
*   **Media Management:** Uploading and organizing campus event galleries, newsletters, and PDF documents.
*   **Site Configuration:** Updating global contact information, footer links, and social media URLs.

---

## 2. How Will the Data Be Stored?
*   **Primary Database (MongoDB):** We will utilize the existing MongoDB setup with Mongoose models. Document-based storage is ideal for the hierarchical and varied data of a college website (e.g., nesting faculty inside departments).
*   **Models Utilized:** `User` (Admin accounts), `Department`, `Faculty`, `Notice`, `Page` (Dynamic content), `AcademicDoc` (Syllabi), `SiteData` (Global settings), and `AuditLog` (Tracking admin actions).
*   **Media Storage:** Images, PDFs, and videos will be stored in a dedicated directory (e.g., `server/uploads`) and served statically, or integrated with cloud storage (AWS S3 / Cloudinary) to ensure the server doesn't get bloated. Database models will store the URL references.

---

## 3. How Can It Be Accessed & Authorization (RBAC)
*   **Secure Entry Point:** Accessible via a dedicated route (e.g., `kmit.in/admin`). 
*   **Authentication:** JWT (JSON Web Tokens) issued upon successful login, stored securely in HTTP-only cookies or local storage.
*   **Role-Based Access Control (RBAC):** Implementing tiered access using the `adminRoles.js` configuration:
    *   **Super Admin:** Has unrestricted access to all modules, user creation, and site configuration.
    *   **Department HOD (Admin):** Can only edit their specific department's page, faculty list, and syllabi.
    *   **Content Editor:** Can post notices, news, and update event galleries, but cannot alter core academic data or site settings.

---

## 4. What Can Be Changed vs. What Cannot Be Changed
To maintain the integrity and aesthetic of the award-winning frontend design, we must enforce strict boundaries on what CMS users can do.

### ✅ What CAN be changed (Mutable):
*   **Content & Text:** Paragraphs, headings, and lists within designated dynamic pages (`Page.js`).
*   **Entities:** Faculty details, departmental stats, recruiter lists, and notice board items.
*   **Media Assets:** Replacing images (constrained by aspect ratio checks during upload) and PDF documents.
*   **Global Settings:** Phone numbers, email addresses, and admission portal links.

### ❌ What CANNOT be changed (Immutable / Restricted):
*   **Core Layout & Design System:** The overarching UI structure, CSS variables, color palettes, and typography are hardcoded. Admins cannot break the layout by injecting custom CSS or structural HTML.
*   **Audit Logs:** Records of who changed what (`AuditLog.js`) are append-only. No admin (even Super Admin) can delete audit trails.
*   **System Architecture:** Database schemas, API endpoints, and authentication mechanisms.
*   **Hard-Coded Pages:** Complex interactive sections (like the 3D Hero Slider or Interactive Campus Map) may have locked layouts where only the text/images can be swapped, not the components themselves.

---

## 4.5 Page-by-Page Scrutiny: What Gets Administered?

We have scrutinized the 100+ SPA pages and homepage sections to determine exactly what will be wired into the Admin Portal. 

### A. Homepage Sections (`src/components/`)
*   **`EventsSection` & `Ticker`:** 
    *   **Editable:** Event titles, dates, descriptions, links, and scrolling ticker news.
    *   **Restricted:** The horizontal scroll speed, card dimensions, and layout of the events grid.
*   **`HeroSlider` & `WelcomeSection`:** 
    *   **Editable:** Background images, overlay text, stats/numbers, and Principal's welcome message.
    *   **Restricted:** The slide transition animations and CSS glassmorphism effects.
*   **`PlacementSection` & `RecruitersSection`:**
    *   **Editable:** Highest CTC, total offers, recruiter logos (upload), and placement ticker data.
    *   **Restricted:** The overall card layout and grid structure.

### B. Academic & Department Pages (`DeptDetailPage`, `SyllabusPage`, `CoursesOfferedPage`)
*   **Editable:** HOD's message, vision/mission text, faculty roster (names, designations, photos), syllabus PDFs (uploading new academic year documents), and course intake numbers.
*   **Restricted:** The tabbed interface design of the department page. Admins fill out a form, and the frontend dynamically populates the tabs.

### C. Admissions & Placements (`AdmissionsPage`, `FeesPage`, `EapcetRanksPage`, `PlacementsPage`)
*   **Editable:** Fee structures (updating yearly tables), cutoff ranks (uploading CSVs or editing tables), admission deadlines, and linking to the external payment portal.
*   **Restricted:** The structural grouping of these pages. You cannot delete the "Admissions" section itself, only its contents.

### D. Events, Co-Curriculars & Clubs (`ClubsPage`, `SportsPage`, `AnnualEventsPage`, `TessellatorPage`)
*   **Editable:** Creating new clubs, updating club student-lead names, adding image galleries for recent events (e.g., Tessellator fest photos), and updating sports achievements.
*   **Restricted:** The masonry or carousel layout of the photo galleries. The admin only uploads images; the UI handles the arrangement.

### E. Research & Innovation (`ResearchLabsPage`, `ResearchPublicationsListPage`, `ResearchCoEPage`)
*   **Editable:** Lists of publications, patents filed, Center of Excellence details, and funding amounts.
*   **Restricted:** The structural layout of the research tabs and the table styling for publications.

### F. Administration & Governance (`ManagementPage`, `CommitteesPage`, `IQACPage`, `IDMCPage`)
*   **Editable:** Member names, designations, profile photos, committee meeting minutes (PDF uploads), and policy text.
*   **Restricted:** The hierarchical display of management (e.g., Chairman always appears first based on predefined UI logic, not admin sorting).

### G. Infrastructure & Facilities (`CampusPage`, `LibraryPage`, `AuditoriumPage`)
*   **Editable:** Text descriptions, operating hours (for the library), and facility images.
*   **Restricted:** The icon sets used for different facilities (these are hardcoded to match the design system).

---

## 4.6 Deep Scrutiny: Table Management Strategy

Tables represent a significant portion of structured data on the college website. We have identified exactly which pages use data tables and designed a strategy for admins to update them without breaking the responsive mobile view.

**Pages Identified with Tables:**
*   **Admissions & Fees:** `AdmissionsPage`, `AdmissionProcedurePage`, `FeesPage`, `EapcetRanksPage`, `EcetRanksPage`
*   **Academics & Exams:** `SyllabusPage`, `CoursesOfferedPage`, `CalendarPage`, `EvaluationPage`, `ExamsPage`, `DeptDetailPage`
*   **Committees & Councils:** `CommitteesPage`, `StudentCouncilPage`, `ParishadPage`, `IDMCPage`, `IICPage`
*   **Placements:** `PlacementsPage`, `PlacementStatsPage`, `PlacementArchivePage`
*   **Events & Sports:** `SportsPage`, `NSSEventsPage`
*   **Research & Facilities:** `ResearchLabsPage`, `ResearchCoEPage`, `LibraryPage`
*   **Miscellaneous:** `DynamicPage` (Generic user-created tables)

**How Admin Will Manage Tables:**
1.  **Strict-Schema Tables (e.g., `CoursesOfferedPage`, `EapcetRanksPage`, `FeesPage`)**
    *   **Editable:** The row data (values like Intake numbers, Ranks, Fee Amounts). Admins will use a spreadsheet-like grid in the Admin Portal (via `SpreadsheetTable.jsx`) to edit cells, add rows, or upload a CSV file.
    *   **Restricted:** Column headers and table structure are locked. Admins cannot add a new column (like "Extra Fee") if the frontend design doesn't support it.
2.  **Document/Link Tables (e.g., `SyllabusPage`, `CalendarPage`, `ExamsPage`)**
    *   **Editable:** Admins can add rows consisting of a "Title" and a "File Upload" (PDF). The portal will automatically generate the download link.
    *   **Restricted:** The styling of the download buttons and the table width.
3.  **Flexible Content Tables (e.g., `DynamicPage`, `LibraryPage`)**
    *   **Editable:** Admins can build basic tables using the Rich Text Editor (like Quill/TipTap) for ad-hoc data.
    *   **Restricted:** The Rich Text Editor will strip out advanced HTML table styling (like custom colors or fixed widths) to ensure all tables automatically get the `.data-table` class and remain mobile-responsive.

---

## 5. Phased Implementation Plan

To ensure a smooth rollout, we will build this in **6 phases**:

### Phase 1: Foundation & Security (The Core)
*   Setup JWT Authentication logic (Login/Logout APIs).
*   Scaffold the Admin Dashboard shell (Sidebar, Header, Layout) in React.
*   Implement Route Guards to protect `/admin/*` routes.
*   Create the `User` management module (Super Admins can create other admins).

### Phase 2: UI/UX & Dashboard Aesthetics (The Layout)
*   Design a modern, responsive Sidebar with collapsible states and icons.
*   Implement dark/light mode compatibility for the admin panel.
*   Create standardized UI components (Spreadsheet tables, Modal popups, Toast notifications).
*   Implement a Global Search bar to quickly navigate between admin modules.

### Phase 3: Communication & Notices (Quick Wins)
*   Build the CRUD (Create, Read, Update, Delete) UI for **Notices & Announcements**.
*   Connect the frontend Ticker and Noticeboard to fetch live data from the database instead of static files.
*   Implement `AuditLog` middleware to track who posts or deletes notices.

### Phase 4: Academics & People (The Bulk)
*   Build the **Department Editor** (Managing HOD details, vision, mission).
*   Build the **Faculty Directory Manager** (Adding professors, photos, designations).
*   Build the **Academic Docs Manager** (Uploading syllabi, academic calendars as PDFs).

### Phase 5: Placements & Content Pages
*   Build the **Placements Module** (Managing statistics, recruiter logos, testimonials).
*   Build the **Site Pages Editor** (A Rich Text Editor like Quill or TipTap for admins to edit dynamic pages like "About Us" or "Committees").
*   Implement the **Media Library** (A central place to view, upload, and delete images/PDFs).

### Phase 6: Workflow, Review & Polish
*   Implement a **Draft/Publish Workflow** (using `WorkflowItem.js`) so edits can be saved as drafts and reviewed before going live.
*   Dashboard Analytics: Show admins quick stats (e.g., "5 Active Notices", "12 Pending Drafts", "Last login at...").
*   Final QA, security penetration testing, and deployment.

---

## User Review Required
> [!IMPORTANT]
> Please review the roles defined in Section 3. Do we need a "Workflow/Approval" system where a Junior Editor submits a draft and the Super Admin approves it before it goes live, or can all authorized admins publish directly?

## Open Questions
1. **Media Storage:** Should we store uploaded images and PDFs locally on your server, or would you prefer setting up a cloud bucket (like AWS S3) for better scalability?
2. **Rich Text Editor:** For editing page content, do you prefer a simple Markdown editor or a visual WYSIWYG editor (like Microsoft Word)?

---

## 7. Current Project Status (Handover Notes)

**Phase 1 & Phase 2 have been successfully completed.**
- **Authentication & Security:** JWT validation and role-based access control (RBAC) middleware are fully implemented.
- **Settings & User Management:** Super admins can create, suspend, edit roles, and permanently delete users.
- **Content CRUD:** The backend and frontend are fully wired up for Notices, Exams, Academics, Placements, Media, Pages, and Departments.
- **UI Overhaul:** The entire admin panel has been restyled with a unified, premium SaaS aesthetic (custom dropdowns, greyed text consistency, polished buttons, and responsive sidebars).
- **Edit Workflows:** Dedicated edit functionalities have been added across Content, Academics, and Settings modules, replacing previous bugs where edits required a delete/recreate loop.

**Pending Work for Next Developers:**
1. **Frontend Client Integration:** The public-facing website components now need to be updated to fetch and render this dynamic data from the MongoDB backend (currently, they are likely still using static mocked data).
2. **Approval Workflows:** The UI has badges for "Draft" and "Published", but advanced multi-tier approval workflows (where a junior editor submits a draft and an HOD approves) still need their logic fully enforced if required.
3. **Analytics Dashboard:** The dashboard currently has placeholder analytics. It needs to be hooked up to `adminApi.dashboard` to fetch real data summaries (e.g., total active notices, recent logins).
