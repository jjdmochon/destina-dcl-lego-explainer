"""
Build synchronized audio tracks for DESTINA DCL Explainer v3.
- Slices the master continuous recording (LEGO explainer voice off.wav) into 18 sentence clips.
- Trims silence with soft safety padding and anti-click fades.
- Adjusts tempo using WSOLA only if needed to guarantee a clean breathing pause before the next cue.
- Saves vo-01.wav ... vo-18.wav with studio-grade timing.
- Assembles a single continuous 78.50s master track: assets/vo/voiceover.wav.
"""

import numpy as np
import wave
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent
VO_DIR = Path(__file__).resolve().parent
SOURCE_WAV = BASE_DIR / "LEGO explainer voice off.wav"

# Slice search ranges in the 70.4s recording, and exact cue start & next times in authored 78.5s animation
SEGMENTS = [
    # (idx, split_start, split_end, cue_start, next_cue, text)
    (1,   0.00,  3.80,  0.60,  4.40, "Destina Genomics. Dynamic Chemical Labelling."),
    (2,   3.80,  8.00,  4.40,  8.80, "Reading microRNAs from serum, one base at a time."),
    (3,   8.00, 13.50,  8.80, 14.30, "Serum goes straight onto colour-coded beads. No extraction, no PCR."),
    (4,  13.50, 19.30, 14.30, 20.90, "Each bead carries its own probe: one for 122, another for 451."),
    (5,  19.30, 23.30, 20.90, 26.20, "122 and 451 each bind their own bead."),
    (6,  23.30, 26.30, 26.20, 30.00, "Opposite the blank sits a single guanine."),
    (7,  26.30, 30.40, 30.00, 34.20, "SMART-C-Biotin samples the blank position, reversibly."),
    (8,  30.40, 32.60, 34.20, 36.80, "It stays only on G."),
    (9,  32.60, 35.70, 36.80, 40.00, "Reduction then locks it in, covalently."),
    (10, 35.70, 39.90, 40.00, 44.30, "Here, the base facing the blank is adenine, not guanine."),
    (11, 39.90, 45.30, 44.30, 49.00, "SMART-C cannot pair, so nothing is added. Single-base resolution."),
    (12, 45.30, 49.90, 49.00, 52.80, "Streptavidin-phycoerythrin binds the biotin, and the bead glows."),
    (13, 49.90, 52.80, 52.80, 55.90, "Mismatched and empty beads stay dark."),
    (14, 52.80, 55.60, 55.90, 61.10, "The plate is read on a Luminex instrument."),
    (15, 55.60, 59.80, 61.10, 65.60, "A red laser reads the bead code: which microRNA."),
    (16, 59.80, 63.20, 65.60, 69.80, "A green laser reads the label: how much."),
    (17, 63.20, 67.00, 69.80, 73.40, "Both, in the same well."),
    (18, 67.00, 70.40, 73.40, 78.50, "Destina Genomics. Read the microRNA itself."),
]

def load_wav(path):
    with wave.open(str(path), 'rb') as wf:
        sr = wf.getframerate()
        raw = wf.readframes(wf.getnframes())
        data = np.frombuffer(raw, dtype=np.int16).astype(np.float32)
        return data, sr

def save_wav(path, data, sr):
    data_int16 = np.clip(data, -32768, 32767).astype(np.int16)
    with wave.open(str(path), 'wb') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(data_int16.tobytes())

def trim_silence(data, sr, thresh_ratio=0.015, pad_ms=60):
    thresh = np.max(np.abs(data)) * thresh_ratio
    active = np.where(np.abs(data) > thresh)[0]
    if len(active) == 0:
        return data
    pad = int(sr * pad_ms / 1000.0)
    start = max(0, active[0] - pad)
    end = min(len(data), active[-1] + pad)
    trimmed = data[start:end].copy()
    # 15ms gentle fade
    fade = int(sr * 0.015)
    if len(trimmed) > 2 * fade:
        trimmed[:fade] *= np.linspace(0, 1, fade)
        trimmed[-fade:] *= np.linspace(1, 0, fade)
    return trimmed

def wsola(x, speed, win_size=1024, hop=256):
    if abs(speed - 1.0) < 0.02:
        return x
    target_len = int(len(x) / speed)
    delta_max = win_size // 2
    w = np.hanning(win_size)
    out = np.zeros(target_len + win_size, dtype=np.float32)
    norm = np.zeros(target_len + win_size, dtype=np.float32)
    in_pos = 0.0
    out_pos = 0
    while out_pos + win_size < target_len:
        expected_in = int(round(in_pos))
        search_start = max(0, expected_in - delta_max)
        search_end = min(len(x) - win_size, expected_in + delta_max)
        if search_end > search_start and out_pos > 0:
            ref = out[out_pos : out_pos + win_size]
            best_corr = -1e9
            best_offset = search_start
            for offset in range(search_start, search_end, 2):
                chunk = x[offset : offset + win_size]
                corr = np.dot(ref, chunk)
                if corr > best_corr:
                    best_corr = corr
                    best_offset = offset
            chosen = best_offset
        else:
            chosen = min(max(0, expected_in), len(x) - win_size)
        out[out_pos : out_pos + win_size] += x[chosen : chosen + win_size] * w
        norm[out_pos : out_pos + win_size] += w
        in_pos += hop * speed
        out_pos += hop
    nz = norm > 1e-4
    out[nz] /= norm[nz]
    return out[:target_len]

def main():
    print(f"Loading source master voiceover: {SOURCE_WAV}")
    raw_master, sr = load_wav(SOURCE_WAV)
    total_duration = 78.50
    master_samples = int(total_duration * sr)
    master_track = np.zeros(master_samples, dtype=np.float32)

    print("\n--- Slicing and Aligning 18 Voice Clips ---")
    for idx, s_split, e_split, start_s, next_s, text in SEGMENTS:
        s_idx = int(s_split * sr)
        e_idx = int(e_split * sr)
        chunk = raw_master[s_idx:e_idx]

        trimmed = trim_silence(chunk, sr)
        t_dur = len(trimmed) / sr
        available_window = next_s - start_s

        # Leave a clean ~0.25s pause before the next animation cue
        target_dur = available_window - 0.25
        if t_dur > target_dur:
            speed = t_dur / target_dur
        else:
            speed = 1.0

        processed = wsola(trimmed, speed)
        proc_dur = len(processed) / sr
        margin = available_window - proc_dur

        print(f"[{idx:02d}] Start={start_s:5.2f}s | Win={available_window:4.2f}s | Speed={speed:4.2f}x | Dur={proc_dur:4.2f}s | Margin={margin:4.2f}s | {text[:38]}...")

        # Save individual clip
        clip_path = VO_DIR / f"vo-{idx:02d}.wav"
        save_wav(clip_path, processed, sr)

        # Place into continuous 78.5s master track
        insert_idx = int(start_s * sr)
        end_idx = min(master_samples, insert_idx + len(processed))
        copied_len = end_idx - insert_idx
        master_track[insert_idx:end_idx] += processed[:copied_len]

    # Save continuous master track
    master_path = VO_DIR / "voiceover.wav"
    save_wav(master_path, master_track, sr)
    print(f"\n[SUCCESS] Master track saved: {master_path.name} ({len(master_track)/sr:.2f}s, {master_path.stat().st_size} bytes)")

if __name__ == "__main__":
    main()
