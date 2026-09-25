"""Generate voiceover audio files for DESTINA miRNA Detection LEGO Explainer (v3).

Uses Gemini TTS (gemini-3.1-flash-tts-preview) via Google GenAI SDK.
Produces vo-01.wav through vo-18.wav in assets/vo/.
"""

import base64
import os
import struct
import sys
from pathlib import Path
from google import genai

API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
OUT_DIR = Path(__file__).resolve().parent

VO_LINES = [
    "Destina Genomics. Dynamic Chemical Labelling.",
    "Reading micro R N As directly from serum, one base at a time.",
    "Serum goes straight onto colour-coded beads. No extraction. No P C R.",
    "Each bead carries an abasic P N A probe, with one blank position.",
    "Micro R N A one-twenty-two, and four-fifty-one, each bind their own bead.",
    "Opposite the blank sits a single guanine.",
    "Smart C biotin samples the blank position, reversibly.",
    "It stays only if it pairs with G.",
    "Reduction then locks it in, covalently.",
    "Here, the base facing the blank is adenine, not guanine.",
    "Smart C cannot pair, so nothing is added. Single-base resolution.",
    "Streptavidin phyco-erythrin binds the biotin, and the bead glows.",
    "Mismatched and empty beads stay dark.",
    "The plate is read on a Luminex instrument.",
    "A red laser reads the bead code. Which micro R N A.",
    "A green laser reads the label. How much.",
    "Both, in the same well.",
    "Destina Genomics. Read the micro R N A itself.",
]


def pcm_to_wav(pcm_bytes: bytes, sample_rate: int = 24000, channels: int = 1, bits_per_sample: int = 16) -> bytes:
    byte_rate = sample_rate * channels * (bits_per_sample // 8)
    block_align = channels * (bits_per_sample // 8)
    chunk_size = 36 + len(pcm_bytes)
    header = struct.pack(
        "<4sI4s4sIHHIIHH4sI",
        b"RIFF",
        chunk_size,
        b"WAVE",
        b"fmt ",
        16,
        1,
        channels,
        sample_rate,
        byte_rate,
        block_align,
        bits_per_sample,
        b"data",
        len(pcm_bytes),
    )
    return header + pcm_bytes


def generate():
    if not API_KEY:
        print("[ERROR] Please set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.")
        sys.exit(1)
        
    print(f"Connecting to Gemini GenAI API...")
    client = genai.Client(api_key=API_KEY)
    
    total = len(VO_LINES)
    for idx, text in enumerate(VO_LINES, start=1):
        filename = OUT_DIR / f"vo-{idx:02d}.wav"
        print(f"[{idx}/{total}] Generating: '{text}' -> {filename.name}...")
        
        try:
            interaction = client.interactions.create(
                model="gemini-3.1-flash-tts-preview",
                input=text,
                response_format={"type": "audio"},
                generation_config={
                    "speech_config": [
                        {"voice": "Aoede"}
                    ]
                }
            )
            
            audio = interaction.output_audio
            if not audio or not audio.data:
                print(f"  [ERROR] No audio data returned for line {idx}")
                continue
                
            pcm_bytes = base64.b64decode(audio.data)
            sample_rate = audio.sample_rate or 24000
            channels = audio.channels or 1
            wav_bytes = pcm_to_wav(pcm_bytes, sample_rate=sample_rate, channels=channels)
            
            with open(filename, "wb") as f:
                f.write(wav_bytes)
                
            duration = len(pcm_bytes) / (sample_rate * channels * 2)
            print(f"  [OK] Saved {len(wav_bytes)} bytes ({duration:.2f}s)")
            
        except Exception as e:
            print(f"  [FAIL] Error generating line {idx}: {e}")

    print("\nAll voice-over files processed successfully!")


if __name__ == "__main__":
    generate()
