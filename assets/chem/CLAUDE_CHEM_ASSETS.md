# Destina Chemical Assets for Claude & Multimodal AI Ingestion
**Destina Genomica S.L. — Chemical Biology & Diagnostics Platform**  
*Release 4.0 | 81 Computational & Visual Chemical Assets (Full Synthetic Protocols Expanded)*

---

## 1. Overview & Dual Modality for Claude

This asset pack provides dual-modality chemical representations for all **81 compounds** in the Destina library, optimized for direct ingestion by Anthropic Claude (Claude 3.5 Sonnet, Claude 3.7 Sonnet, and Claude Opus):

- **Multimodal Vision**: High-resolution, high-contrast PNG images (800×600 for standard building blocks; 1200×450 for extended SMART probes and PEG conjugates) rendered via RDKit Cairo with crisp 2.0pt bond strokes, black carbon skeletons, standard heteroatom coloring (N blue, O red, S yellow, F green, I purple, Br brown) on solid white backgrounds, and explicit stereochemical wedges/dashes.
- **Symbolic & Structural Chemistry**:
  - `destina_compounds.sdf`: Single-file consolidated SDF library containing all 81 compounds with 2D connection tables (MDL V2000 CTAB) and embedded property fields (ID, Name, Primary_Group, Formula, Molecular_Weight, Exact_Mass, IUPAC_Name, CAS_Number, Source_Document, Functional_Role, SMILES, InChI, InChIKey).
  - `claude_chem_manifest.json`: Prompt-ready JSON file containing embedded MolBlocks, canonical SMILES, InChI strings, InChIKeys, and molecular descriptors (TPSA, HBD, HBA, Rotatable Bonds).
  - `catalog.json`: Web and programmatic catalog containing full compound metadata, analytical retention times, and inline SVG representations.
  - `mol/`: 81 individual `.mol` files for atom-by-atom structural inspection.

---

## 2. Directory Layout & Compound Families

The assets are synchronized across:
* **Master Catalog**: `g:\Mi unidad\Developer\animations\Destina chemical catalog\`
* **Explainer Animation Project**: `g:\Mi unidad\Developer\animations\DESTINA miRNA Detection lego Explainer\assets\chem\`

```
assets/chem/
├── png/                         # 81 High-contrast PNGs for Claude Vision (Multimodal image input)
│   ├── 01_aeg_backbone.png ... 42_fmoc_gglu_bhoc.png
│   ├── 43_5_iodocytosine.png ... 51_ac_rp12_b.png       # SMART Cytosine cascade (PT-SQ-001)
│   ├── 52_fmoc_l_glu_otbu_ol.png ... 59_dcc.png         # γ-Glutamic platform (PS_Gamma Glu)
│   ├── 60_fmoc_l_ser_tbu_oh.png ... 70_gamma_d_ser_blank.png # γ-Serine platform (PS_Gamma Ser)
│   ├── 71_fmoc_cpeg_bhoc.png ... 77_fmoc_hy_spacer.png # PEGylated, Cationic & DAPA monomers
│   └── 78_dess_martin_periodinane.png ... 81_glycine_methyl_ester_hcl.png # Key synthesis reagents
├── mol/                         # 81 Individual MDL MolFiles (V2000 CTAB connection tables)
│   └── *.mol
├── svg/                         # 81 Scalable Vector Graphics for web & vector rendering
│   └── *.svg
├── destina_compounds.sdf        # Master consolidated SDF with embedded properties
├── catalog.json                 # Master library metadata with inline SVGs
└── claude_chem_manifest.json    # Complete JSON manifest with MolBlocks & Descriptors
```

---

## 3. Chemical Families & Protocol Provenance

1. **Standard Achiral PNA Monomers & Backbone (`01`–`05`, `11`)**:
   - `01_aeg_backbone` to `05_fmoc_pna_g_bhoc` and achiral blank `11_fmoc_aeg_abasic`.
2. **Chiral γ-L-Glutamyl PNA Monomers (`06`–`09`, `52`–`59`)**:
   - Full quartet (Aglu, Cglu, Gglu, Tglu), chiral L- and D-backbones, and the abasic blank unit `*GL*` (`57_gamma_glu_blank_gl`).
   - Derived from `PS_Gamma Glu Monomers_Version 1.docx` and `SOP_EE-GAMMA-GLU-MONOMERS.docx` (Author: Dr. Francisco Javier López-Delgado).
3. **Chiral γ-Serine PNA Monomers (`10`, `60`–`70`)**:
   - Starting amino acids (Fmoc-L/D-Ser(tBu)-OH), reduced alcohols, aldehydes, L- and D-backbones, and abasic blank monomers `*L-Ser*` (`10`/`35`) and `*D-Ser*` (`70_gamma_d_ser_blank`).
   - Derived from `PS_Gamma Ser Monomers_Version 1.docx`.
4. **SMART Cytosine Probe Synthetic Pathway (`12`/`40`, `43`–`51`)**:
   - Full 6-step synthetic route from 5-iodocytosine (`43`), bromoacetaldehyde diethyl acetal (`44`), Intermediate 1 (`45`), N-propargyltrifluoroacetamide (`46`), Intermediate 2 (`47`), Intermediate 3 (`48`), universal intermediate AC-REX-NH₂ (`49`), NHS-PEG12-Biotin (`50`), acetal precursor AC-RP12-B (`51`), to active SMART C REX PEG12-Biotin aldehyde (`12`/`40`).
   - Derived from `PT-SQ-001_PROTOCOLO DE TRABAJO PARA LA SINTESIS DE SMART CYTOSINE REX PEG12 BIOTIN.docx`.
5. **PEGylated, Cationic & Modified PNA Monomers (`71`–`77`)**:
   - `Cpeg` (`71`), `Tpeg` (`72`), `Clys` (`73`), `Tlys` (`74`), `*L-DAPA*` (`75`), `*D-DAPA*` (`76`), `Hy` (`77`).
   - Documented with retention times from analytical method `DSTNA_CBU_2`.
6. **Reagents, Linkers, Cleavage Cocktails & Solvents (`13`–`39`, `58`–`59`, `78`–`81`)**:
   - Coupling agents (DIC, Oxyma, DCC, DhBtOH), deprotection/capping (piperidine, lutidine, Ac₂O), cleavage (TFA, TIS), linkers (RAM), oxidants (Dess-Martin Periodinane), reductants (NaBH₃CN, IBCF), and amino acid esters (Gly-OMe·HCl).

---

## 4. How to Prompt Claude with These Assets

### A. Visual Inspection (Claude Vision)
Attach or provide the path to any image in `png/`. Claude Vision can:
* Verify protecting group regiochemistry (e.g., N6 vs N4 vs N2 Bhoc protection, OtBu vs tBu ethers).
* Confirm chiral center stereochemistry in γ-modified PNA monomers (e.g., (S)-γ-L vs (R)-γ-D glutamyl and seryl sidechains).
* Inspect reactive functional heads (e.g., N1-formylmethyl aldehyde in SMART C REX PEG12-Biotin, diethyl acetals in precursors).

### B. Structural & Computational Reasoning (MolBlock / SDF / JSON)
Upload `destina_compounds.sdf` or pass entries from `claude_chem_manifest.json`. Claude can:
* Read exact atom coordinates, formal charges, and connectivity.
* Parse canonical SMILES and InChI strings for cross-database indexing (PubChem, ChEMBL).
* Compute reaction stoichiometry and predict cleavage fragments in MALDI-ToF and LC-MS mass spectrometry.
