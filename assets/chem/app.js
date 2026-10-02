/**
 * DESTINA Genomica — Chemical Catalogue Application Logic
 * Master Technical Platform v4.0 | 81 Chemical Entities
 * Compliant with Destina Design System
 */

document.addEventListener('DOMContentLoaded', () => {
  const compounds = window.DESTINA_CATALOG_DATA || [];
  let currentFilter = 'all';
  let searchQuery = '';
  let sortBy = 'id-asc';
  let activeView = 'catalogue';
  let activePathway = 'smart';
  let activeCompound = null;

  // DOM Elements
  const cardsGrid = document.getElementById('cardsGrid');
  const tableBody = document.getElementById('tableBody');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const resultsCount = document.getElementById('resultsCount');
  const catFilterNav = document.getElementById('categoryFilterNav');
  const viewTabs = document.querySelectorAll('.view-tab');
  const viewSections = {
    catalogue: document.getElementById('catalogueView'),
    table: document.getElementById('tableView'),
    pathways: document.getElementById('pathwaysView'),
    qc: document.getElementById('qcView')
  };
  
  // Modal Elements
  const modalOverlay = document.getElementById('compoundModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalIdBadge = document.getElementById('modalIdBadge');
  const modalFormulaBadge = document.getElementById('modalFormulaBadge');
  const modalMwBadge = document.getElementById('modalMwBadge');
  const modalCasBadge = document.getElementById('modalCasBadge');
  const modalIupac = document.getElementById('modalIupac');
  const modalRole = document.getElementById('modalRole');
  const modalDoc = document.getElementById('modalDoc');
  const modalSmiles = document.getElementById('modalSmiles');
  const modalMolblock = document.getElementById('modalMolblock');
  const modalInchi = document.getElementById('modalInchi');
  const propExactMw = document.getElementById('propExactMw');
  const propLogP = document.getElementById('propLogP');
  const propTpsa = document.getElementById('propTpsa');
  const propHbd = document.getElementById('propHbd');
  const propHba = document.getElementById('propHba');
  const propRotb = document.getElementById('propRotb');

  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleText = document.getElementById('themeToggleText');
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        <span>Dark Mode</span>
      `;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        <span>Light Mode</span>
      `;
    }
  });

  // Category definitions mapping
  const categoryMap = [
    { key: 'all', label: 'All Compounds', count: compounds.length },
    { key: 'smart', label: 'SMART Cytosine Cascade (PT-SQ-001)', matcher: c => c.group.includes('SMART') },
    { key: 'gamma-glu', label: 'γ-Glutamic PNA Platform', matcher: c => c.group.includes('Glutamic') || c.group.includes('γ-L-Glutamyl') },
    { key: 'gamma-ser', label: 'γ-Serine PNA Platform', matcher: c => c.group.includes('Serine') },
    { key: 'standard-pna', label: 'Standard PNA & Backbones', matcher: c => c.group.includes('Standard Achiral') || c.group.includes('Abasic DGL') },
    { key: 'modified-pna', label: 'PEGylated, Cationic & DAPA Monomers', matcher: c => c.group.includes('Modified PNA') },
    { key: 'spps-reagents', label: 'SPPS Coupling & Cleavage Cocktails', matcher: c => c.group.includes('Solid-Phase') || c.group.includes('Cleavage') || c.group.includes('Linkers') },
    { key: 'synthesis-organics', label: 'Specialized Synthesis Reagents & Catalysts', matcher: c => c.group.includes('Specialized Synthesis') },
    { key: 'solvents', label: 'HPLC & Process Solvents', matcher: c => c.group.includes('Solvents') },
    { key: 'rna-bases', label: 'RNA & Nucleobase Standards', matcher: c => c.group.includes('Target RNA') || c.group.includes('Analytical Standards') }
  ];

  // Render Category Filter Chips
  function renderCategoryChips() {
    catFilterNav.innerHTML = '';
    categoryMap.forEach(cat => {
      let count = 0;
      if (cat.key === 'all') {
        count = compounds.length;
      } else {
        count = compounds.filter(cat.matcher).length;
      }
      const chip = document.createElement('button');
      chip.className = `filter-chip ${currentFilter === cat.key ? 'active' : ''}`;
      chip.innerHTML = `${cat.label} <span class="chip-counter">${count}</span>`;
      chip.addEventListener('click', () => {
        currentFilter = cat.key;
        renderCategoryChips();
        applyFiltersAndRender();
      });
      catFilterNav.appendChild(chip);
    });
  }

  // Unicode Formula Formatter
  function formatFormulaUnicode(formula) {
    const subMap = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
    return (formula || '').split('').map(char => subMap[char] || char).join('');
  }

  // Filter & Sort Logic
  function getFilteredCompounds() {
    return compounds.filter(c => {
      // Category Match
      let catMatch = true;
      if (currentFilter !== 'all') {
        const catDef = categoryMap.find(item => item.key === currentFilter);
        if (catDef && catDef.matcher) {
          catMatch = catDef.matcher(c);
        }
      }
      if (!catMatch) return false;

      // Search Query Match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = (c.name || '').toLowerCase().includes(q);
        const matchId = (c.id || '').toLowerCase().includes(q);
        const matchIupac = (c.iupac || '').toLowerCase().includes(q);
        const matchCas = (c.cas || '').toLowerCase().includes(q);
        const matchFormula = (c.formula || '').toLowerCase().includes(q);
        const matchSmiles = (c.smiles || '').toLowerCase().includes(q);
        const matchRole = (c.role || '').toLowerCase().includes(q);
        const matchDoc = (c.document || '').toLowerCase().includes(q);
        return matchName || matchId || matchIupac || matchCas || matchFormula || matchSmiles || matchRole || matchDoc;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'id-asc') return a.id.localeCompare(b.id, undefined, { numeric: true });
      if (sortBy === 'id-desc') return b.id.localeCompare(a.id, undefined, { numeric: true });
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'mw-asc') return (a.mw || 0) - (b.mw || 0);
      if (sortBy === 'mw-desc') return (b.mw || 0) - (a.mw || 0);
      return 0;
    });
  }

  // Render Grid Cards (Destina Design System Style: Radius 24, Blue-tinted Shadows)
  function renderCards(filtered) {
    cardsGrid.innerHTML = '';
    if (filtered.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border: 1px solid var(--border-hairline); border-radius: var(--radius-card);">
          <div style="color: var(--text-muted); margin-bottom: 12px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">No chemical entities found</h3>
          <p style="font-size: 13px; color: var(--text-muted);">No compound matches the active search query or category filter criteria.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'dg-card';
      const formattedFormula = formatFormulaUnicode(c.formula);
      const isSmartOrPeg = c.name.includes('SMART') || c.name.includes('PEG12') || c.name.includes('AC-RP12');
      const docName = c.document ? c.document.split(' (')[0] : 'Destina SPPS Standard';
      const casText = c.cas && c.cas !== '-' ? `CAS ${c.cas}` : 'Proprietary Entity';

      card.innerHTML = `
        <div class="card-header-bar">
          <span class="code-pill">${c.id}</span>
          <span class="formula-pill">${formattedFormula} • ${c.mw.toFixed(2)} Da</span>
        </div>
        <div class="card-structure-area">
          <img src="${c.svg}" alt="${c.name}" loading="lazy" style="${isSmartOrPeg ? 'max-width: 95%;' : ''}"/>
        </div>
        <div class="card-content-area">
          <div class="card-title-text">${c.name}</div>
          <div class="card-category-lbl">${c.group.replace(/^\d+\.\s*/, '')}</div>
          <div class="card-role-snippet">${c.role}</div>
          <div class="card-footer-bar">
            <span class="footer-doc">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              ${docName}
            </span>
            <span class="footer-cas">${casText}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openCompoundModal(c));
      cardsGrid.appendChild(card);
    });
  }

  // Render Master Table
  function renderTable(filtered) {
    tableBody.innerHTML = '';
    filtered.forEach(c => {
      const tr = document.createElement('tr');
      const formattedFormula = formatFormulaUnicode(c.formula);
      tr.innerHTML = `
        <td><strong style="color: var(--dg-blue); font-family: var(--font-mono);">${c.id}</strong></td>
        <td><strong>${c.name}</strong></td>
        <td><span style="font-size: 12px; color: var(--text-muted);">${c.group.replace(/^\d+\.\s*/, '')}</span></td>
        <td><span style="font-family: var(--font-mono);">${formattedFormula}</span></td>
        <td><strong>${c.mw.toFixed(2)}</strong></td>
        <td><span style="font-family: var(--font-mono); font-size: 12px;">${c.cas || '-'}</span></td>
        <td><div class="table-smiles-box" title="${c.smiles}">${c.smiles}</div></td>
        <td>
          <button class="btn-inspect-table" title="Inspect compound details">Inspect</button>
        </td>
      `;
      tr.querySelector('.btn-inspect-table').addEventListener('click', (e) => {
        e.stopPropagation();
        openCompoundModal(c);
      });
      tr.addEventListener('click', () => openCompoundModal(c));
      tableBody.appendChild(tr);
    });
  }

  // Update Stats & Results Count
  function applyFiltersAndRender() {
    const filtered = getFilteredCompounds();
    resultsCount.textContent = `Showing ${filtered.length} of ${compounds.length} chemical entities`;
    if (activeView === 'catalogue') {
      renderCards(filtered);
    } else if (activeView === 'table') {
      renderTable(filtered);
    }
  }

  // View Switching
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.getAttribute('data-view');
      activeView = view;
      viewTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      Object.keys(viewSections).forEach(v => {
        if (v === view) {
          viewSections[v].style.display = 'block';
        } else {
          viewSections[v].style.display = 'none';
        }
      });

      applyFiltersAndRender();
      if (view === 'pathways') renderPathways();
      if (view === 'qc') renderQcDashboard();
    });
  });

  // Search & Sort Event Listeners
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    applyFiltersAndRender();
  });

  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    applyFiltersAndRender();
  });

  // Compound Modal Logic
  function openCompoundModal(c) {
    activeCompound = c;
    modalTitle.textContent = c.name;
    modalIdBadge.textContent = c.id;
    modalFormulaBadge.textContent = formatFormulaUnicode(c.formula);
    modalMwBadge.textContent = `${c.mw.toFixed(2)} Da`;
    modalCasBadge.textContent = c.cas && c.cas !== '-' ? `CAS: ${c.cas}` : 'Proprietary Entity';
    modalIupac.textContent = c.iupac || c.name;
    modalRole.textContent = c.role;
    modalDoc.textContent = c.document || 'Destina Genomica Standard Synthesis Protocol';
    modalSmiles.textContent = c.smiles;
    modalMolblock.textContent = c.molblock || 'MDL Connection table available in .mol download';
    modalInchi.textContent = c.inchi || 'Available in consolidated SDF dataset';

    // Descriptors
    const d = c.descriptors || {};
    propExactMw.textContent = (d.exact_mw || c.mw).toFixed(4);
    propLogP.textContent = (d.logp !== undefined ? d.logp.toFixed(2) : '-');
    propTpsa.textContent = (d.tpsa !== undefined ? `${d.tpsa.toFixed(1)} Å²` : '-');
    propHbd.textContent = d.hbd !== undefined ? d.hbd : '-';
    propHba.textContent = d.hba !== undefined ? d.hba : '-';
    propRotb.textContent = d.rotatable_bonds !== undefined ? d.rotatable_bonds : '-';

    // Structure Viewer default (SVG)
    modalImg.src = c.svg;
    document.querySelectorAll('.btn-mode-switch').forEach(b => b.classList.remove('active'));
    document.getElementById('switchSvgBtn').classList.add('active');

    modalOverlay.classList.add('open');
  }

  function closeCompoundModal() {
    modalOverlay.classList.remove('open');
    activeCompound = null;
  }

  modalCloseBtn.addEventListener('click', closeCompoundModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCompoundModal();
  });

  // Modal View Switchers (SVG / PNG)
  document.getElementById('switchSvgBtn').addEventListener('click', function() {
    if (!activeCompound) return;
    document.querySelectorAll('.btn-mode-switch').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    modalImg.src = activeCompound.svg;
  });

  document.getElementById('switchPngBtn').addEventListener('click', function() {
    if (!activeCompound) return;
    document.querySelectorAll('.btn-mode-switch').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    modalImg.src = activeCompound.png;
  });

  // Modal Copy Functions
  window.copyTextToClipboard = function(elementId, label) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard`);
    });
  };

  // Modal Download Functions
  window.downloadActiveMol = function() {
    if (!activeCompound || !activeCompound.mol) return;
    const link = document.createElement('a');
    link.href = activeCompound.mol;
    link.download = `${activeCompound.id}_${activeCompound.name.replace(/[^a-zA-Z0-9]/g, '_')}.mol`;
    link.click();
    showToast(`Downloading MDL Molfile: ${activeCompound.id}.mol`);
  };

  window.downloadActiveSvg = function() {
    if (!activeCompound || !activeCompound.svg) return;
    const link = document.createElement('a');
    link.href = activeCompound.svg;
    link.download = `${activeCompound.id}.svg`;
    link.click();
    showToast(`Downloading Vector SVG: ${activeCompound.id}.svg`);
  };

  window.downloadActivePng = function() {
    if (!activeCompound || !activeCompound.png) return;
    const link = document.createElement('a');
    link.href = activeCompound.png;
    link.download = `${activeCompound.id}.png`;
    link.click();
    showToast(`Downloading Claude Vision PNG: ${activeCompound.id}.png`);
  };

  // Global Toast Notification Shelf
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'dg-toast';
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // Reaction Pathway Explorer Data (All clean native Unicode, zero LaTeX)
  const pathwaysData = {
    smart: {
      title: 'SMART Cytosine REX PEG12-Biotin Synthetic Pathway (PT-SQ-001 Protocol)',
      desc: 'Controlled two-stage, six-step chemical sequence from 5-iodocytosine to the active aldehyde SMART Cytosine probe.',
      steps: [
        {
          num: 1,
          compoundId: 'DST-SMT-003',
          title: 'Step 1: Synthesis of 5-Iodo-Cytosine Acetal (Compound 1)',
          reagents: '4-amino-5-iodopyrimidin-2(1H)-one (237 Da) + 2-bromo-1,1-diethoxyethane (CAS 2032-35-1), Cs₂CO₃ in anhydrous DMF at 65 °C.',
          notes: 'N1-regioselective alkylation installing protected diethyl acetal mask. Pure product isolated by silica chromatography.'
        },
        {
          num: 2,
          compoundId: 'DST-SMT-005',
          title: 'Step 2: Sonogashira Coupling → 5-PropargylamideTfa-Cytosine Acetal (Compound 2)',
          reagents: 'Compound 1 + N-propargyltrifluoroacetamide (CAS 14719-21-2), Pd(PPh₃)₄ (cat.), CuI (cat.), Et₃N in anhydrous degassed DMF at 60 °C.',
          notes: 'Strict oxygen-free inert Argon conditions. C-C bond formation yields alkyne intermediate (MW 376.34 Da).'
        },
        {
          num: 3,
          compoundId: 'DST-SMT-006',
          title: 'Step 3: Catalytic Hydrogenation → 5-PropylamideTfa-Cytosine Acetal (Compound 3)',
          reagents: 'Compound 2 + H₂ (4-6 bar), 10% Pd on activated charcoal in anhydrous MeOH at room temperature.',
          notes: 'Quantitative alkyne reduction to flexible C5-propyl chain. Filtered through Celite pad (MW 380.37 Da).'
        },
        {
          num: 4,
          compoundId: 'DST-SMT-007',
          title: 'Step 4: Deprotection → AC-REX-NH₂ Universal Platform (Compound 4)',
          reagents: 'Compound 3 in 30% ammonium hydroxide aqueous solution at room temperature for 48 hours.',
          notes: 'Selective cleavage of trifluoroacetamide yielding nucleophilic primary amine (MW 284.36 Da) for labeling.'
        },
        {
          num: 5,
          compoundId: 'DST-SMT-009',
          title: 'Step 5: Biotin Conjugation → AC-RP12-Biotin Acetal (Compound 5)',
          reagents: 'AC-REX-NH₂ + NHS-dPEG12-Biotin (CAS 365441-71-0, MW 941 Da), Et₃N in anhydrous DMF at room temperature (16 h).',
          notes: 'Quantitative active ester amide coupling. Yields protected acetal conjugate (MW 1110.38 Da).'
        },
        {
          num: 6,
          compoundId: 'DST-SMART-001',
          title: 'Step 6: Acetal Cleavage → Active SMART Cytosine Probe SC-RP12-B (Compound 6)',
          reagents: 'Compound 5 in 10% aqueous Trifluoroacetic Acid (TFA) at room temperature for 2-3 hours.',
          notes: 'Deprotection unveils free formylmethyl aldehyde head for template-directed dynamic chemical labeling (MW 1036.25 Da).'
        }
      ]
    },
    glu: {
      title: 'Chiral γ-L-Glutamic PNA Platform (PS_Gamma Glu & SOP_EE)',
      desc: 'Stereocontrolled synthesis of γ-L-glutamic backbone and enantiopure monomers (Aglu, Cglu, Gglu, Tglu, *GL*) maintaining 100% ee.',
      steps: [
        {
          num: 1,
          compoundId: 'DST-GLU-002',
          title: 'Scheme 1, Step 1: Dess-Martin Oxidation → DGSL-Fmoc-L-Glu(OtBu)-H',
          reagents: 'Fmoc-L-Glu(OtBu)-ol (CAS 153815-59-9) + Dess-Martin Periodinane (DMP, 2.1 eq) in wet DCM at 0-5 °C.',
          notes: 'Developed by Dr. López-Delgado avoiding α-amino aldehyde epimerization (ee = 100%).'
        },
        {
          num: 2,
          compoundId: 'DST-GLU-003',
          title: 'Scheme 1, Step 2: Reductive Amination → γ-L-Glutamic Backbone',
          reagents: 'DGSL-Fmoc-L-Glu(OtBu)-H + Glycine methyl ester·HCl (2 eq), DIPEA, NaBH₃CN (1.6 eq), AcOH in MeOH at 0 °C to rt.',
          notes: 'Yields enantiopure methyl ester backbone (ee = 100%, Tr = 25.728 min on Cellulose-1 chiral column).'
        },
        {
          num: 3,
          compoundId: 'DST-GAM-004',
          title: 'Scheme 2, Step 3 & 4: Nucleobase Coupling → γ-L-Tglu Monomer',
          reagents: 'Backbone + Thymine-1-acetic acid (1.3 eq), DCC (1.3 eq), DhBtOH (1.3 eq) in DMF, followed by CaCl₂/NaOH saponification.',
          notes: 'DhBtOH prevents racemization during carbodiimide activation. Saponification in iPrOH/H₂O (7:3) selectively hydrolyzes methyl ester without cleaving Fmoc or OtBu.'
        },
        {
          num: 4,
          compoundId: 'DST-GLU-006',
          title: 'Scheme 3, Step 5 & 6: Blank Monomer *GL* Synthesis',
          reagents: 'γ-L-Glutamic Backbone + Boc₂O (3.9 eq), TEA (3.9 eq) in THF, followed by selective CaCl₂/NaOH saponification.',
          notes: 'Yields abasic chiral blank monomer *GL* (Boc-γ-L-Glu-PNA-COOH) with 100% ee (Chiral Tr = 14.929 min, RP-HPLC Tr = 6.504 min).'
        }
      ]
    },
    ser: {
      title: 'Chiral γ-Serine PNA Platform (PS_Gamma Ser Protocol)',
      desc: 'Enantioselective preparation of L- and D-serine pseudopeptide backbones and abasic blank monomers (*L-Ser* and *D-Ser*).',
      steps: [
        {
          num: 1,
          compoundId: 'DST-SER-003',
          title: 'Scheme 1, Step 1: Mixed Anhydride Reduction → Fmoc-L/D-Ser(tBu)-ol',
          reagents: 'Fmoc-L/D-Ser(tBu)-OH (CAS 71989-33-8) + N-methylmorpholine (NMM), Isobutyl chloroformate (IBCF) in DME at 0 °C; NaBH₄ in H₂O.',
          notes: 'Efficient reduction of carboxylic acid to alcohol 2a-b without racemizing the chiral α-carbon.'
        },
        {
          num: 2,
          compoundId: 'DST-SER-005',
          title: 'Scheme 1, Step 2: Dess-Martin Oxidation → Fmoc-L/D-Ser(tBu)-H',
          reagents: 'Alcohol 2a-b + Dess-Martin Periodinane (2.1 eq) in wet DCM at 0-5 °C under N₂.',
          notes: 'Oxidation yields chiral aldehyde 3a-b, used directly in reductive amination without silica degradation.'
        },
        {
          num: 3,
          compoundId: 'DST-SER-007',
          title: 'Scheme 1, Step 3: Reductive Amination → L/D-γ-Serine Backbone',
          reagents: 'Aldehyde 3a-b + Glycine methyl ester·HCl (2.5 eq), DIPEA (2.5 eq), NaBH₃CN (2.5 eq), AcOH in MeOH at 0 °C to rt.',
          notes: 'Provides pseudopeptide backbone (Compound 4a-b, MW 440.54 Da) ready for solid-phase monomer assembly.'
        },
        {
          num: 4,
          compoundId: 'DST-SER-011',
          title: 'Scheme 2, Step 4 & 5: Saponification → Blank Monomers *L-Ser* & *D-Ser*',
          reagents: 'Backbone 4a-b + Boc₂O (3 eq), TEA (3 eq) in THF; followed by CaCl₂ (0.8 M) / NaOH in iPrOH/H₂O (7:3) at 0 °C to rt.',
          notes: 'Selective hydrolysis delivers *L-Ser* (DSTNA_CBU_2 Tr = 6.413 min) and *D-Ser* (Tr = 6.459 min, 100% ee).'
        }
      ]
    }
  };

  function renderPathways() {
    const pContainer = document.getElementById('pathwayFlowContainer');
    const pSelector = document.getElementById('pathwaySelectorRow');
    
    // Render pathway tabs
    pSelector.innerHTML = `
      <button class="pathway-tab-btn ${activePathway === 'smart' ? 'active' : ''}" data-pathway="smart">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        SMART Cytosine Cascade (PT-SQ-001)
      </button>
      <button class="pathway-tab-btn ${activePathway === 'glu' ? 'active' : ''}" data-pathway="glu">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
        γ-Chiral Glutamic PNA Platform
      </button>
      <button class="pathway-tab-btn ${activePathway === 'ser' ? 'active' : ''}" data-pathway="ser">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/></svg>
        γ-Chiral Serine PNA Platform
      </button>
    `;

    pSelector.querySelectorAll('.pathway-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activePathway = btn.getAttribute('data-pathway');
        renderPathways();
      });
    });

    const curr = pathwaysData[activePathway];
    let stepsHtml = '';
    curr.steps.forEach(st => {
      const c = compounds.find(item => item.id === st.compoundId);
      const imgSrc = c ? c.svg : '';
      stepsHtml += `
        <div class="pathway-step-node" data-comp-id="${st.compoundId}">
          <div class="step-node-badge">${st.num}</div>
          <div class="step-node-preview">
            <img src="${imgSrc}" alt="${st.title}"/>
          </div>
          <div class="step-node-body">
            <div class="step-node-title">
              <span class="code-pill">${st.compoundId}</span>
              <strong style="font-size: 14px; color: var(--text-main);">${st.title}</strong>
            </div>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 6px;">${st.notes}</p>
            <div class="step-conditions-callout">
              <strong>Conditions & Reagents:</strong> ${st.reagents}
            </div>
          </div>
        </div>
      `;
    });

    pContainer.innerHTML = `
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${curr.title}</h3>
        <p style="font-size: 13px; color: var(--text-muted);">${curr.desc}</p>
      </div>
      <div class="pathway-steps-stream">
        ${stepsHtml}
      </div>
    `;

    pContainer.querySelectorAll('.pathway-step-node').forEach(card => {
      card.addEventListener('click', () => {
        const cid = card.getAttribute('data-comp-id');
        const comp = compounds.find(item => item.id === cid);
        if (comp) openCompoundModal(comp);
      });
    });
  }

  // Analytical QC Dashboard Data
  const analyticalMonomers = [
    { code: 'T', name: 'Fmoc-PNA-T-OH', tr_rp: 5.105, col_chiral: 'Achiral Base', tr_chiral: '-', ee: 'Achiral' },
    { code: 'Tpeg', name: 'Fmoc-γ-(mini-PEG)-T-PNA-OH', tr_rp: 5.223, col_chiral: 'Stereocontrolled', tr_chiral: '-', ee: 'Stereocontrolled' },
    { code: 'X', name: 'Fmoc-Aeg(Boc)-OH (Abasic Aeg)', tr_rp: 5.439, col_chiral: 'Achiral Backbone', tr_chiral: '-', ee: 'Achiral' },
    { code: 'Tlys', name: 'Fmoc-γ-L-Lys(Boc)-T-PNA-OH', tr_rp: 5.627, col_chiral: 'Stereocontrolled', tr_chiral: '-', ee: 'Stereocontrolled' },
    { code: 'Tglu', name: 'Fmoc-γ-L-Tglu-PNA-COOH', tr_rp: 5.706, col_chiral: 'Cellulose-1 (iPrOH:Hex 20:80)', tr_chiral: 37.523, ee: '100% ee' },
    { code: 'A', name: 'Fmoc-PNA-A(Bhoc)-OH', tr_rp: 5.777, col_chiral: 'Achiral Base', tr_chiral: '-', ee: 'Achiral' },
    { code: 'G', name: 'Fmoc-PNA-G(Bhoc)-OH', tr_rp: 5.804, col_chiral: 'Achiral Base', tr_chiral: '-', ee: 'Achiral' },
    { code: 'Hy', name: 'Fmoc-Hy-OH (Hydroxyethylglycine)', tr_rp: 5.841, col_chiral: 'Achiral Backbone', tr_chiral: '-', ee: 'Achiral' },
    { code: '*_*', name: 'Standard DGL Spacer', tr_rp: 5.927, col_chiral: 'Synthetic Standard', tr_chiral: '-', ee: 'Standard' },
    { code: 'C', name: 'Fmoc-PNA-C(Bhoc)-OH', tr_rp: 5.998, col_chiral: 'Achiral Base', tr_chiral: '-', ee: 'Achiral' },
    { code: 'Cpeg', name: 'Fmoc-γ-(mini-PEG)-C(Bhoc)-PNA-OH', tr_rp: 6.073, col_chiral: 'Stereocontrolled', tr_chiral: '-', ee: 'Stereocontrolled' },
    { code: 'Aglu', name: 'Fmoc-γ-L-A(Bhoc)glu-PNA-COOH', tr_rp: 6.210, col_chiral: 'Cellulose-1 (iPrOH:Hex 25:75)', tr_chiral: 32.199, ee: '100% ee' },
    { code: '*L-DAPA*', name: 'Fmoc-γ-L-DAPA(Boc)-Blank-PNA-COOH', tr_rp: 6.232, col_chiral: 'Cellulose-1', tr_chiral: '-', ee: 'Enantiopure' },
    { code: '*D-DAPA*', name: 'Fmoc-γ-D-DAPA(Boc)-Blank-PNA-COOH', tr_rp: 6.232, col_chiral: 'Cellulose-1', tr_chiral: '-', ee: 'Enantiopure' },
    { code: 'Gglu', name: 'Fmoc-γ-L-G(Bhoc)glu-PNA-COOH', tr_rp: 6.298, col_chiral: 'Cellulose-1 (iPrOH:Hex 30:70)', tr_chiral: 47.782, ee: '100% ee' },
    { code: 'Clys', name: 'Fmoc-γ-L-Lys(Boc)-C(Bhoc)-PNA-OH', tr_rp: 6.389, col_chiral: 'Stereocontrolled', tr_chiral: '-', ee: 'Stereocontrolled' },
    { code: '*L-Ser*', name: 'Blank Monomer (L-Serine derivative)', tr_rp: 6.413, col_chiral: 'Cellulose-1', tr_chiral: '-', ee: '100% ee' },
    { code: '*D-Ser*', name: 'Blank Monomer (D-Serine derivative)', tr_rp: 6.459, col_chiral: 'Cellulose-1', tr_chiral: '-', ee: '100% ee' },
    { code: 'Cglu', name: 'Fmoc-γ-L-C(Bhoc)glu-PNA-COOH', tr_rp: 6.462, col_chiral: 'Cellulose-1 (EtOH:MeOH:Hex 20:5:75)', tr_chiral: 17.682, ee: '100% ee' },
    { code: '*GL*', name: 'Blank Monomer (Boc-γ-L-Glu-PNA-COOH)', tr_rp: 6.504, col_chiral: 'Cellulose-1 (iPrOH:Hex 25:75)', tr_chiral: 14.929, ee: '100% ee' },
    { code: 'γ-L-Glu BB', name: 'γ-L-Glutamic Backbone (DGSL-g-Glu-PNA-COOMe)', tr_rp: '-', col_chiral: 'Cellulose-1 (iPrOH:Hex 20:80)', tr_chiral: 25.728, ee: '100% ee' },
    { code: 'γ-D-Glu BB', name: 'γ-D-Glutamic Backbone (DGSL-g-D-Glu-PNA-COOMe)', tr_rp: '-', col_chiral: 'Cellulose-1 (iPrOH:Hex 20:80)', tr_chiral: 48.501, ee: '100% ee' }
  ];

  function renderQcDashboard() {
    const qcTableBody = document.getElementById('qcTableBody');
    qcTableBody.innerHTML = '';
    analyticalMonomers.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: var(--dg-blue); font-family: var(--font-mono);">${m.code}</strong></td>
        <td><strong>${m.name}</strong></td>
        <td>${m.tr_rp !== '-' ? `<span style="font-family: var(--font-mono); font-weight: 700;">${m.tr_rp.toFixed(3)} min</span>` : '-'}</td>
        <td>${m.col_chiral}</td>
        <td>${m.tr_chiral !== '-' ? `<span style="font-family: var(--font-mono);">${m.tr_chiral.toFixed(3)} min</span>` : '-'}</td>
        <td>
          <span style="background: var(--dg-blue-bg); color: var(--dg-blue); border: 1px solid var(--border-blue); padding: 3px 8px; border-radius: var(--radius-pill); font-weight: 700; font-size: 11px;">
            ${m.ee}
          </span>
        </td>
      `;
      qcTableBody.appendChild(tr);
    });
  }

  // Export Hub Handlers
  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(compounds, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "destina_chemical_catalog_81.json");
    dlAnchorElem.click();
    showToast("Exported catalog.json (81 compounds)");
  });

  document.getElementById('exportSdfBtn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'destina_compounds.sdf';
    link.download = 'destina_compounds.sdf';
    link.click();
    showToast("Downloading consolidated destina_compounds.sdf");
  });

  document.getElementById('printDossierBtn').addEventListener('click', () => {
    window.print();
  });

  // Initial Run
  renderCategoryChips();
  applyFiltersAndRender();
});
