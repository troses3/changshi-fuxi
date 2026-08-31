import json
import re

# Read current database
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

EXACT_WORD_FIXES = {
    "一性": "同一性",
    "一性和斗争性相结合": "同一性和斗争性相结合",
    "标对表": "对标对表",
    "一流域内": "同一流域内",
    "内对外开放联通": "对内对外开放联通",
    "责同罪同罚，防止和纠正": "同责同罪同罚",
    "防为主、防抗救相结合": "预防为主、防抗救相结合",
    "外工作优良传统和时代特征相结合": "对外工作优良传统和时代特征相结合",
    "自我监督和人民监督相结合": "党内监督和人民监督相结合",
    "时具有": "同时具有",
    "中国具体实际相结合": "中国具体实际"
}

fixed_count = 0
for item in data:
    w = item['word']
    if w in EXACT_WORD_FIXES:
        item['word'] = EXACT_WORD_FIXES[w]
        # Re-generate hint
        if item['word'] in item['meaning']:
            item['hint'] = item['meaning'].replace(item['word'], "______")
        fixed_count += 1

print(f"Fixed {fixed_count} exact prefix slices.")

# Re-run distractor generation to ensure consistency
from domain_thesaurus_pipeline import match_domain_distractors

for item in data:
    w = item['word']
    meaning = item['meaning']
    chapter = item['chapter']
    group = item['group']
    
    distractor_words = match_domain_distractors(w, meaning, chapter, group)
    item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in distractor_words]

# Save updated dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
