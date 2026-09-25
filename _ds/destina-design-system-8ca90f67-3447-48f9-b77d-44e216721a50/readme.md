# Destina Design System

Design system for **Destina Genomics** — a biotech company (Granada, Spain) developing chemistry-based molecular diagnostics that read nucleic-acid biomarkers (miRNA, CK18, Osteopontin) directly. The system governs:

- **DG internal apps** — Destina Home (launcher), DG Time (clock in/out), DG Holidays (days off), DG Account (profile), Market Intelligence Monitor.
- **Public website** — `destina-genomics.com`.
- **All digital brand material** — decks, documents, email.

Tone: clinical, precise, modern; never playful.

## Sources
Everything was derived from the uploaded `Destina Design System.zip` (`uploads/Destina Design System/`):
- `DESTINA.md` — tokens, component specs, do/don't (Spanish). Primary source.
- `destina.css` — the single stylesheet; split here into `tokens/*.css` with values unchanged.
- `SKILL.md` — original agent skill.
- `assets/` — logo pack (monograms, logotypes, wordmarks in blue/white).

`DESTINA.md` references production screenshots (`assets/reference/`) and a `Destina DESIGN.md`; **neither was in the upload**. All UI kits are rebuilt from the written spec only. No codebase or Figma file was provided.

## Core concepts
- **One blue** — Destina Blue `#0039CA` is the brand: everything interactive, accent headlines, focus, data. Other colours carry meaning, never decoration.
- **Lab precision** — white surfaces, tabular numerals, 24 h time, copy that says exactly what happened.
- **Blue light** — shadows and backgrounds are blue-tinted, never neutral grey (except the modal).
- **Floating card** — every DG app is a white card floating on a very soft blue→white gradient.

## CONTENT FUNDAMENTALS
- **UI language:** English. Holiday names stay in Spanish ("Día de la Hispanidad", "Autonómico"); dates formatted with `es-ES` locale where long-form.
- **Voice:** clear, functional, calm. State what happened and nothing more — "Clocked in at 08:42", "Request sent to your manager."
- **Person:** address the user as **you** ("You have 14 days remaining"). The company is "Destina" or "Destina Genomics"; never "we" inside apps.
- **Casing:** buttons and statuses in **Title Case** ("Clock In", "View My History", "Not Clocked In"); sentences in sentence case ("Select your action"). ALL CAPS only via the `label` / `label-sm` styles.
- **Buttons:** verb first, 1–3 words — "Send Request", "Save Changes", "Clock Out".
- **Numbers & time:** 24 h (`08:42`), durations `7h 42m`, dates `Mon 21 Sep` / `12 – 16 Oct 2026` (en dash with spaces). Tabular numerals in tables and clocks.
- **Errors:** problem + fix, no blame — "Choose a start and end date."
- **No emoji, no exclamation marks, no marketing language** in the apps. The website may be more descriptive but stays factual.

## VISUAL FOUNDATIONS
- **Colour:** one dominant hue, Destina Blue `#0039CA` (dark `#002b9b`, light `#1a4fd6`, bg `#f0f5ff`). Red `#FB1414` = danger / clock out. Yellow `#FFC21A` = warning / break / Holidays, always with `#111` text. Green `#16a34a` = success. Never pure black; darkest ink `#111111`. DG apps use sampled production action fills (`#0056ff`, `#ff3b3b`, `#ffb81c`, `#5a5a5a`). Market Intelligence is the only multi-hue surface (category colours `--mi-*`).
- **Type:** Inter for apps; Outfit for Market Intelligence; Montserrat (+ Inter headlines) for the website. Display 900 / −0.04em; H1 700 / −0.02em in blue; H2/H3 600; body 400 / 1.6. Labels uppercase 700 with +0.06–0.08em. Never below 0.7rem, never weight < 400.
- **Spacing:** 4 · 8 · 16 · 24 · 32 · 48 · 64. Section rhythm 48px, gutters 24px (20 mobile), content max 1200px, nav 64px, grid gap 1.25rem.
- **Backgrounds:** app `#f5f7ff`; surfaces white. DG apps sit on a vertical blue→white gradient (`--bg-app-gradient`). Heroes get a 7% blue radial spotlight. The only dark surface is the website's photographic hero (molecular render). No dark mode. No textures, patterns or illustrations; gradients are always very soft and blue-only, plus one `--bg-featured` blue gradient for a single featured card.
- **Imagery:** cool, blue-dominated, scientific (molecular renders). No warm photography or grain.
- **Corner radii:** 4 tags · 6 compact buttons · 8 inputs · 10 controls/rows · 12 full-width submit · 14 buttons/icon tiles · 16 panels/tables · 20 modals · 24 cards · 32 DG app card · pill for badges.
- **Cards:** white, radius 24, hairline border `rgba(0,0,0,.06)`, `--shadow-card` (blue-tinted + faint neutral). DG app card: radius 32, 396px (640 Holidays), `--shadow-app-card`.
- **Shadows:** always blue-tinted `rgba(0,57,202,.10–.45)` with a faint neutral second layer. The modal is the only neutral shadow. Filled buttons carry `--shadow-btn`.
- **Borders:** hairline `rgba(0,0,0,.06)`; inputs `#E6E6E6`; hover/focus → `rgba(0,57,202,.15)` or primary. Side accents only in two places: InfoPanel (5px left rule) and AccentRow (3px). MI StatCards use a category left rule.
- **Transparency & blur:** only three cases — nav white 88% + blur 16; glass white 85% + blur 20; modal backdrop black 50% + blur 4.
- **Motion:** `transition: all .2s ease`. Entrances `dg-fadeUp` / `dg-fadeInUp` / `dg-slideIn` with `cubic-bezier(.22,1,.36,1)`. No bounces, no infinite decorative loops.
- **Hover:** cards lift 4px (+ scale 1.01), stronger shadow, blue border; filled buttons darken and lift 2px; secondary buttons get blue border + `#f0f5ff`; table rows 3% blue.
- **Press:** white ripple on ActionButton; no shrink.
- **Disabled:** `opacity: .6`, except clock actions → flat grey `#e9e9e9` / `#bcbcbc`.
- **Focus:** primary border + ring `0 0 0 3px rgba(0,57,202,.2)`.
- **Layout:** DG apps are a single centred column (≤420px); sticky 64px nav on web/Home; bottom tab bar inside DG app cards. Breakpoints 420 · 768 · 1200 · 1440.
- **Logo:** blue on white / neutral / glass; white only on Destina Blue. Wordmarks for narrow horizontal spaces. Monogram 32–40px in nav, 64px in hero. Keep the ®.

## ICONOGRAPHY
- **Lucide** (outline, 2px stroke), loaded from CDN `unpkg.com/lucide-static@0.452.0` via the `Icon` component (CSS mask → inherits `currentColor`). No icon files were supplied; the exact Lucide version used in production is unconfirmed.
- Sizes: 16 in badges/tables/links, 18–20 in buttons, 22 in ActionButtons/tab bar, 24 in tiles.
- AppCard icons sit in a 48px tile, radius 14, with the accent at 8%.
- **No emoji, no unicode glyphs as icons.** The monogram is never used as a UI icon.
- Brand marks are PNG only (`assets/`): `monogram-blue.png` (default), `monogram-white.png` (on blue only), `logotype-primary-*` (horizontal), `logotype-secondary-*` (stacked, with "Genomics"), `wordmark-primary-*` ("Destina"), `wordmark-secondary-*` ("Destina Genomics").

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css`.
- `assets/` — logo pack (11 PNGs).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — React primitives, one card per folder.
- `ui_kits/` — `dg-apps/`, `destina-home/`, `market-intelligence/`, `website/`.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent Skill wrapper.

## Components
- **core/** — `Icon`, `Button`, `ActionButton`
- **forms/** — `Input` (text/date/select/textarea), `Switch`
- **feedback/** — `Badge` (status, holiday tags, semantic), `InfoPanel`, `Modal`
- **layout/** — `Panel`, `AccentRow`, `Card`, `StatCard`, `Table`
- **apps/** — `DGAppCard`, `TabBar`, `AppCard`
- **web/** — `WebNav`, `PillLabel`, `GlassChip`

All are named in `DESTINA.md`'s spec except the following.

### Intentional additions
- `Icon` — wrapper for the Lucide CDN set (spec mentions an `Icon` component).
- `Table` — spec describes table radius and row hover but no named component.
- `WebNav` — spec describes nav styling but names no component.

## UI kits
- `ui_kits/dg-apps/` — DG Time (clock in / break / clock out, history), DG Holidays (request form, tags), DG Account.
- `ui_kits/destina-home/` — launcher with AppCard grid.
- `ui_kits/market-intelligence/` — category dashboard + feed (Outfit).
- `ui_kits/website/` — destina-genomics.com landing.

## Fonts
Inter, Outfit and Montserrat load from Google Fonts (no font binaries supplied). Replace with self-hosted files if brand licensing requires it.
