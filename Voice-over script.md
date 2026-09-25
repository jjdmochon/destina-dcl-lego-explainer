# DCL explainer — voice-over script (v3)

British English, calm and clinical. Timecodes are from the video start (78.5 s total). Lines are written to fit the window before the next cue.

- **0:00.6** — Destina Genomics. Dynamic Chemical Labelling.
- **0:04.4** — Reading microRNAs directly from serum, one base at a time.
- **0:08.8** — Serum goes straight onto colour-coded beads. No extraction, no PCR.
- **0:14.3** — Each bead carries an abasic PNA probe, with one blank position.
- **0:20.9** — miR-122 and miR-451 each hybridise to their own bead.
- **0:25.7** — Opposite the blank sits a single guanine.
- **0:30.0** — SMART-C-Biotin samples the blank position, reversibly.
- **0:33.9** — It stays only if it pairs with G.
- **0:36.5** — Reduction then locks it in, covalently.
- **0:40.0** — Here, the base facing the blank is adenine, not guanine.
- **0:44.1** — SMART-C cannot pair, so nothing is added. Single-base resolution.
- **0:49.0** — Streptavidin-phycoerythrin binds the biotin, and the bead glows.
- **0:52.8** — Mismatched and empty beads stay dark.
- **0:55.9** — The plate is read on a Luminex instrument.
- **1:01.1** — A red laser reads the bead code: which microRNA.
- **1:05.6** — A green laser reads the label: how much.
- **1:09.8** — Both, in the same well.
- **1:13.4** — Destina Genomics. Read the microRNA itself.

## Using a recorded voice

Drop the audio into `assets/vo/`. The video uses the first option it finds and replaces the browser voice.

1. **Per-line clips (recommended, keeps the animation timing):** `vo-01.mp3` … `vo-18.mp3`, one per line above, in order. Each clip starts at its timecode. Keep each clip shorter than the gap before the next line.
2. **Single track:** `voiceover.mp3`, 78.5 s long, with each line placed at its timecode (silence in between).

In an AI voice service (e.g. ElevenLabs), pick a calm British female voice, set stability to medium-high, and generate each line separately. Use the pronunciation spellings below if a term comes out wrong.

Pronunciation: miR-122 = "micro-R-N-A one-twenty-two"; SMART-C = "smart C"; phycoerythrin = "FY-ko-eh-RITH-rin"; PNA = "P-N-A".
