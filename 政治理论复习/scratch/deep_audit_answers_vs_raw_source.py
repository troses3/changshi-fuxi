import json
import re

with open('chaoge.txt', 'r', encoding='utf-8') as f:
    raw_text = f.read()

with open('src/data/political_theory_chaoge.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

part1 = js_content.split('export const chaogeContrastItems')[0]
m = re.search(r'export\s+const\s+chaogePoliticalTheory\s*=\s*(\[.*\]);', part1, re.DOTALL)
dataset = json.loads(m.group(1))

# Extract all answers listed under 【背诵要点答案】 in raw text
raw_answers = re.findall(r'［答案[］】](.*?)(?=\n\n|\n[0-9一二三四五六七八九十]+|\Z)', raw_text)
clean_raw_answers = []
for ans in raw_answers:
    # Clean answer string
    cleaned = re.sub(r'[0-9l\.、，；\s@©心]+', ' ', ans).strip()
    words = [w.strip() for w in cleaned.split() if len(w.strip()) > 1]
    clean_raw_answers.extend(words)

clean_raw_answers_set = set(re.sub(r'[“”"《》【】]', '', w) for w in clean_raw_answers)
print(f"Extracted {len(clean_raw_answers_set)} canonical answer terms from raw chaoge.txt answer keys.")

# Check coverage: how many canonical answers from original source are in our 421 items?
dataset_words = set(re.sub(r'[“”"《》【】]', '', item['word']) for item in dataset)

covered = clean_raw_answers_set.intersection(dataset_words)
missing = clean_raw_answers_set - dataset_words

print(f"Canonical raw answers in dataset: {len(covered)} / {len(clean_raw_answers_set)} ({len(covered)/len(clean_raw_answers_set)*100:.1f}%)")
if missing:
    print(f"Terms with slight wording variations or extended multi-cloze: {missing}")

# Check that every single word in our 421 items is verbatim found inside its official sentence
verbatim_errors = []
for item in dataset:
    w_clean = re.sub(r'[“”"《》【】]', '', item['word'])
    if w_clean not in item['meaning']:
        verbatim_errors.append((item['id'], item['word'], item['meaning']))

print(f"Verbatim concordance errors: {len(verbatim_errors)}")
