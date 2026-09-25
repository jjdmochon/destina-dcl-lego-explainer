"""
Build synchronized audio tracks for DESTINA DCL Explainer v3.
- Trims silence from all 18 voice clips.
- Adjusts tempo using WSOLA (preserving natural pitch).
- Assembles a single continuous 78.50s master track: assets/vo/voiceover.wav.
- Overwrites vo-01.wav ... vo-18.wav with the clean, non-overlapping clips.
"""

import numpy as np
import wave
from pathlib import Path

VO_DIR = Path(r"G:\Mi unidad\Developer\animations\DESTINA miRNA Detection lego Explainer\assets\vo")

# Exact cue start times in authored seconds (total duration 78.5s)
TIMINGS = [
    # (idx, start_time, next_cue_time)
    (1,  0.60, 4.40),   # 01: "Destina Genomics. Dynamic Chemical Labelling."
    (2,  4.40, 8.80),   # 02: "Reading microRNAs directly from serum, one base at a time."
    (3,  8.80, 14.30),  # 03: "Serum goes straight onto colour-coded beads. No extraction, no PCR."
    (4,  14.30, 20.90), # 04: "Each bead carries an abasic PNA probe, with one blank position."
    (5,  20.90, 26.20), # 05: "miR-122 and miR-451 each hybridise to their own bead."
    (6,  26.20, 30.00), # 06: "Opposite the blank sits a single guanine."
    (7,  30.00, 34.20), # 07: "SMART-C-Biotin samples the blank position, reversibly."
    (8,  34.20, 36.80), # 08: "It stays only if it pairs with G."
    (9,  36.80, 40.00), # 09: "Reduction then locks it in, covalently."
    (10, 40.00, 44.30), # 10: "Here, the base facing the blank is adenine, not guanine."
    (11, 44.30, 49.00), # 11: "SMART-C cannot pair, so nothing is added. Single-base resolution."
    (12, 49.00, 52.80), # 12: "Streptavidin-phycoerythrin binds the biotin, and the bead glows."
    (13, 52.80, 55.90), # 13: "Mismatched and empty beads stay dark."
    (14, 55.90, 61.10), # 14: "The plate is read on a Luminex instrument."
    (15, 61.10, 65.60), # 15: "A red laser reads the bead code: which microRNA."
    (16, 65.60, 69.80), # 16: "A green laser reads the label: how much."
    (17, 69.80, 73.40), # 17: "Both, in the same well."
    (18, 73.40, 78.50), # 18: "Destina Genomics. Read the microRNA itself."
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

def trim_silence(data, sr, thresh=400, pad_ms=40):
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
    sr = 24000
    total_duration = 78.50
    master_samples = int(total_duration * sr)
    master_track = np.zeros(master_samples, dtype=np.float32)

    print("--- Processing and Aligning Voice Clips ---")
    for idx, start_s, next_s in TIMINGS:
        in_path = VO_DIR / f"vo-{idx:02d}.wav"
        data, file_sr = load_wav(in_path)
        assert file_sr == sr

        # 1. Trim dead silence
        trimmed = trim_silence(data, sr)
        t_dur = len(trimmed) / sr
        available_window = next_s - start_s

        # 2. Compute optimal tempo speedup to leave a clean 0.35s breathing pause
        target_dur = available_window - 0.35
        if t_dur > target_dur:
            speed = t_dur / target_dur
        else:
            speed = 1.0

        # WSOLA time-stretch
        processed = wsola(trimmed, speed)
        proc_dur = len(processed) / sr
        margin = available_window - proc_dur

        print(f"[{idx:02d}] Start={start_s:5.2f}s | Win={available_window:4.2f}s | Speed={speed:4.2f}x | Dur={proc_dur:4.2f}s | Margin={margin:4.2f}s")

        # 3. Overwrite clean individual clip
        save_wav(in_path, processed, sr)

        # 4. Insert into continuous master track
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
