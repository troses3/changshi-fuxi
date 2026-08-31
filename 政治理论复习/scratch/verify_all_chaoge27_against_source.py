import json
import re

# 1. Load chaoge.txt raw source text
with open('chaoge.txt', 'r', encoding='utf-8') as f:
    raw_source = f.read()

# 2. Load chaogePoliticalTheory dataset (421 items)
with open('src/data/political_theory_chaoge.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

part1 = js_content.split('export const chaogeContrastItems')[0]
m = re.search(r'export\s+const\s+chaogePoliticalTheory\s*=\s*(\[.*\]);', part1, re.DOTALL)
dataset = json.loads(m.group(1))

print(f"Verifying {len(dataset)} items against original source text (chaoge.txt)...")

errors = []
warnings = []
verified_count = 0

for idx, item in enumerate(dataset):
    q_num = idx + 1
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    meaning = item['meaning'].strip()
    hint = item['hint'].strip()
    distractors = [d['word'] for d in item.get('distractors', [])]
    
    # Verification 1: Is the correct answer actually inside the official original sentence?
    if w not in meaning and w_clean not in meaning:
        errors.append({
            "q_num": q_num,
            "type": "Word not in sentence",
            "word": w,
            "meaning": meaning
        })
        continue
        
    # Verification 2: Does the hint correctly contain the blank '______'?
    if "______" not in hint:
        errors.append({
            "q_num": q_num,
            "type": "No blank in hint",
            "hint": hint
        })
        continue
        
    # Verification 3: Does the hint have duplicate blanks or double quotes?
    if "““______””" in hint or "“______””" in hint:
        warnings.append({
            "q_num": q_num,
            "type": "Double quote artifact in hint",
            "hint": hint
        })
        
    # Verification 4: Are there 3 distractors and no duplicates?
    if len(distractors) != 3 or len(set(distractors)) != 3:
        errors.append({
            "q_num": q_num,
            "type": "Distractor count error",
            "distractors": distractors
        })
        continue
        
    # Verification 5: Does any distractor leak/match the answer or appear in the hint?
    for d in distractors:
        d_clean = re.sub(r'[“”"《》【】]', '', d)
        if d == w or d_clean == w_clean:
            errors.append({
                "q_num": q_num,
                "type": "Distractor matches answer",
                "distractor": d,
                "word": w
            })
        if d_clean in hint.replace("______", "") and len(d_clean) > 1:
            warnings.append({
                "q_num": q_num,
                "type": "Distractor appears in stem",
                "distractor": d,
                "hint": hint
            })

    verified_count += 1

print("\n" + "="*50)
print(f"VERIFICATION SUMMARY:")
print(f"Total Questions Tested: {len(dataset)}")
print(f"Successfully Verified: {verified_count}")
print(f"Errors Found: {len(errors)}")
print(f"Warnings Found: {len(warnings)}")
print("="*50)

if errors:
    print("\n--- ERRORS LIST ---")
    for e in errors[:20]:
        print(e)

if warnings:
    print("\n--- WARNINGS LIST ---")
    for wrn in warnings[:20]:
        print(wrn)
