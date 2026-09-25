# DESTINA Genomics · Dynamic Chemical Labelling (DCL) Explainer

Interactive 3D isometric (brick-built / LEGO style) scientific animation demonstrating **DESTINA Genomics'** proprietary **Dynamic Chemical Labelling (DCL)** technology for direct microRNA quantification (miR-122, miR-451) on Luminex xMAP platforms.

![DESTINA Genomics](assets/logotype-secondary-blue.png)

## Technology Overview

- **Direct Detection without PCR or RNA extraction:** Serum is placed directly into wells with colour-coded magnetic beads.
- **Abasic PNA Probes:** Beads carry peptide nucleic acid (PNA) capture probes with a single blank position facing the diagnostic base.
- **Dynamic Chemical Labelling (DCL):** SMART-C-Biotin reversibly interrogates the blank pocket, pairing exclusively with the target nucleotide (Guanine in miR-122) and covalently locking via mild reduction.
- **Single-Base Specificity:** Mismatches (such as Adenine) cannot pair, rejecting incorporation and keeping non-target beads dark.
- **Luminex xMAP Dual-Laser Detection:**
  - **Red Laser (635 nm):** Decodes bead region/signature (identifies which microRNA is captured).
  - **Green Laser (532 nm):** Excites Streptavidin-Phycoerythrin (SA-PE) reporter to quantify abundance.

## Architecture

- **Engine:** Continuous-composition reactive animation framework (`animations-v3.jsx`) running on React 18 and pure SVG isometric 3D projection.
- **Audio & Narration:** 18 synchronized studio-quality narration clips (`assets/vo/vo-01.wav` ... `vo-18.wav`), generated with Google Gemini GenAI TTS (`gemini-3.1-flash-tts-preview`, voice *Aoede*, British English clinical cadence).
- **Interactive Tweaks Panel:** Real-time controls for motion editor, subtitles/captions, callouts, camera drift/orbit, and speech rate.

## Deployment

### 1. Web Deployment (Vercel / Cloudflare Pages / GitHub Pages)
This repository is pre-configured with `vercel.json` and standard `index.html`.
- Connect this repository to [Vercel](https://vercel.com) and deploy with 1-click.
- Or enable **GitHub Pages** under repository *Settings -> Pages* (select `main` branch, `/ (root)`).

### 2. Standalone / Offline Presentation Mode
Double-click `run-offline.bat` on any Windows PC or laptop. It starts a local lightweight server and opens Chrome/Edge in full-screen application mode without needing an internet connection.

## License & Intellectual Property
© DESTINA Genomica S.L. / DESTINA Genomics Ltd. All rights reserved.
Dynamic Chemical Labelling (DCL) and SMART Nucleobases are proprietary technologies of DESTINA Genomics.
