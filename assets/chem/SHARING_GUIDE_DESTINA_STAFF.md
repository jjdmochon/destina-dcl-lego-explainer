# DESTINA Genomica — Staff Sharing & Distribution Protocols

This guide outlines the four most practical methods to share the **DESTINA Chemical Catalogue Master App** with Destina Genomics team members (PTS Granada lab, Edinburgh staff, and remote collaborators).

---

### Comparison of Sharing Methods

| Method | Effort for You | Effort for Staff | Best Used For |
| :--- | :--- | :--- | :--- |
| **1. Portable Single File (`.html`)** | **Zero** (file ready) | **Zero** (1 click) | Email attachment, Slack, offline laptops/iPads |
| **2. Google Drive Shared Folder** | **1 minute** | **Zero** (open from G: drive) | Internal team with Google Workspace sync |
| **3. Hosted Internal Link (Vercel)** | **2 minutes** | **Zero** (browser bookmark) | Permanent link with Destina PIN access |
| **4. Instant Live Tunnel (Localtunnel)** | **10 seconds** | **Zero** (click link) | Live meetings, design review, video calls |

---

### Method 1: Portable Single-File App (Easiest & Most Robust)

We compiled the entire catalog into a self-contained, zero-dependency HTML file:
`DESTINA_Chemical_Catalogue_Portable.html` (2.5 MB).

- **How to share**:
  - Attach directly to an email or message to staff.
  - Or upload to your Destina Google Drive.
- **How staff uses it**:
  - Double-click the file.
  - It opens immediately in Chrome, Edge, Safari, or Firefox on **Windows, macOS, iPad, iPhone, or Linux**.
  - **Key Benefit**: Requires zero server, zero installation, zero unzipping, and works 100% offline (trains, flights, cleanroom workstations). All 81 chemical structures and connection tables are embedded.

---

### Method 2: Google Drive Team Folder Sync

Since your directory is already located on Google Drive (`G:\Mi unidad\...`):

1. **Option A (Shared Drive)**:
   - Drag or copy the folder `Destina chemical catalog` into Destina's Shared Drive (*Unidades Compartidas / Destina R&D*).
2. **Option B (Folder Sharing)**:
   - In Windows File Explorer, right-click `Destina chemical catalog` → **Google Drive** → **Compartir** (Share).
   - Enter your team members' emails or group alias (e.g. `team@destinagenomics.com`).
3. **Staff Usage**:
   - Staff with Google Drive for Desktop can open `run_destina_app_internal.bat` or `DESTINA_Chemical_Catalogue_Portable.html` straight from their synchronized drive.

---

### Method 3: Private Hosted Web Link (Vercel with Passcode)

If you want a dedicated internal web URL that any team member can bookmark on their phone or browser without sending files:

1. Open PowerShell in `g:\Mi unidad\Developer\animations\Destina chemical catalog`.
2. Run:
   ```powershell
   npx vercel
   ```
3. Follow the 3 prompts to deploy to a private URL (e.g., `https://destina-chem-catalog.vercel.app`).
4. To protect it from public access:
   - Add a simple 4-digit Destina lab access gate, or
   - Enable Vercel Password Protection / Google SSO in project settings.

---

### Method 4: Instant Live Tunnel for Team Calls & Reviews

If you are on a Google Meet or Zoom call and want colleagues to interact with the app running live on your workstation:

1. Ensure the local server is running on port 8085 (`run_destina_app_internal.bat`).
2. Run in a terminal:
   ```powershell
   npx localtunnel --port 8085
   ```
   *Or via Cloudflare Tunnel:*
   ```powershell
   cloudflared tunnel --url http://localhost:8085
   ```
3. Share the generated temporary HTTPS URL in the meeting chat.
4. When the call ends, simply close the terminal window. The link immediately expires.

---

### Method 5: Pre-Packaged Staff ZIP

For team members who prefer a complete, organized archive:
- File: [`DESTINA_Chemical_Catalogue_v4.0_Staff_Package.zip`](file:///g:/Mi%20unidad/Developer/animations/Destina%20chemical%20catalog/DESTINA_Chemical_Catalogue_v4.0_Staff_Package.zip) (5.80 MB)
- Contains:
  - `DESTINA_Chemical_Catalogue_Portable.html` (instant standalone file)
  - Full modular application (`index.html`, `styles.css`, `app.js`, `data.js`)
  - All 81 vector SVGs, Claude Vision PNGs, and MDL `.mol` files
  - `run_destina_app_internal.bat` (1-click desktop app mode launcher)
  - `INTERNAL_RUN_GUIDE.md`
