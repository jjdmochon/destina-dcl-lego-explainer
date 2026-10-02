# DESTINA Genomica — Chemical Catalogue Master App
## Internal Deployment & Execution Protocols

This document details the operational modes to run the **DESTINA Genomica Chemical Catalogue Master App** exclusively within internal environments, ensuring zero exposure to the public internet, full air-gap compliance, and adherence to ISO 9001:2015 and ISO 13485:2016 quality standards.

---

### Core Specifications
- **Catalogue Scope**: 81 validated chemical entities (SMART Cytosine cascade, chiral γ-glutamic and γ-serine PNA monomers, achiral backbones, solid-phase peptide synthesis reagents, analytical standards, and solvents).
- **Design Standard**: Official Destina Design System (One Blue `#0039CA`, 24px cards, blue-tinted shadows, tabular numerals, Lucide outline vector icons, zero emoji, clinical typography).
- **Data Integrity**: Self-contained dataset (`data.js`), vector structures (`svg/`), high-resolution Claude Vision structures (`png/`), and connection tables (`mol/`).

---

### Execution Modes

#### Mode 1: 1-Click Isolated Desktop App (Recommended)
Runs the application on a strictly isolated local loopback adapter (`127.0.0.1`) and launches a frameless Chromium desktop window.

1. Double-click the file:
   ```
   run_destina_app_internal.bat
   ```
2. **What happens automatically**:
   - Spins up a local HTTP daemon bound exclusively to `127.0.0.1:8085`.
   - Any external connection attempt from outside the local machine is dropped by the Windows TCP stack.
   - Opens Microsoft Edge or Google Chrome in dedicated native application mode (`--app=http://127.0.0.1:8085`), removing address bars, bookmarks, and tabs.
   - When finished, press any key in the console window to stop the server and release the port cleanly.

#### Mode 2: Pure Offline Air-Gapped Mode (Zero Server / Zero Ports)
Requires zero network services, zero open ports, and no administrative privileges.

1. Navigate to:
   ```
   g:\Mi unidad\Developer\animations\Destina chemical catalog\
   ```
2. Double-click `index.html` directly, or open with any modern browser:
   ```
   file:///g:/Mi unidad/Developer/animations/Destina chemical catalog/index.html
   ```
3. All 81 chemical compounds, filters, descriptors, SMILES, and SVG structures render directly from the local file system.

#### Mode 3: Local Lab Intranet Sharing (LAN Only)
Allows colleagues on the same laboratory Wi-Fi or Ethernet subnet (e.g., PTS Granada lab facility) to access the catalogue without exposing it to the outside web.

1. Double-click:
   ```
   run_destina_lab_intranet.bat
   ```
2. The script displays your workstation's local IP address (e.g., `http://192.168.1.45:8085`).
3. Share this address with lab members on the same physical router/switch.
4. Protected from external internet traffic by your local enterprise router firewall.

---

### Security, Privacy & ISO Compliance Checklist

| Requirement | Implementation | Status |
| :--- | :--- | :---: |
| **Zero Public Telemetry** | No external Google Analytics, trackers, or remote fonts required | Verified |
| **Loopback Binding** | `127.0.0.1` kernel-level rejection of external network packets | Verified |
| **Local File Sovereignty** | All 81 SVGs, PNGs, and MOL files reside locally within the directory | Verified |
| **ISO 9001:2015 Auditability** | Version-controlled structures matching QA synthesis documents | Verified |
| **ISO 13485:2016 Traceability** | Document reference links for every intermediate and reagent | Verified |

---

### Directory Architecture

```
Destina chemical catalog/
├── index.html                     <- Master Application Interface
├── styles.css                     <- Destina Design System stylesheet
├── app.js                         <- Reactive catalogue logic & pathways
├── data.js                        <- Full 81-compound database
├── catalog.json                   <- Comprehensive JSON chemical database
├── destina_compounds.sdf          <- Consolidated multi-molecule SDF file
├── claude_chem_manifest.json      <- AI vision & SMILES lookup index
├── run_destina_app_internal.bat   <- 1-click isolated desktop launcher
├── run_destina_lab_intranet.bat   <- Local lab network sharing launcher
├── INTERNAL_RUN_GUIDE.md          <- This operational protocol
├── assets/                        <- Official Destina brand marks (monograms, logotypes)
├── svg/                           <- 81 vector chemical structures
├── png/                           <- 81 Claude Vision PNG structures
└── mol/                           <- 81 MDL connection table files
```
