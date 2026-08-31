import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

SPECIFIC_ID_DISTRACTORS = {
    "cg26-p23-41": ["创新、统筹、生态、合作、共赢", "改革、协同、低碳、共赢、普惠", "协调、绿色、法治、富强、共享"],
    "cg26-p23-42": ["国际大循环为主体、国内国际双循环相互促进", "外贸出口为主导、国内消费为基础", "内需拉动为主导、对外开放为辅助"],
    "cg26-p23-45": ["文化建设", "阵地建设", "能力建设"],
    "cg26-p23-46": ["社会革命", "自我净化", "自我革新"],
    "cg26-p23-47": ["技术革命", "产业革命", "制度变革"],
    "cg26-p25-65": ["经验主义", "形式主义", "宗派主义"],
    "cg26-p25-66": ["虚无主义", "主观主义", "宗派主义"],
    "cg26-p67-696": ["事中监管", "事后处置", "应急响应"],
    "cg26-p86-1016": ["公正合理", "合作共赢", "开放包容"],
    "cg26-p86-1017": ["互利共赢", "开放包容", "合作共赢"],
    "cg26-p87-1022": ["“一带一路”倡议", "人类命运共同体", "国际经贸合作倡议"],
    "cg26-p134-2065": ["文化建设", "能力建设", "队伍建设"]
}

for item in data:
    item_id = item['id']
    if item_id in SPECIFIC_ID_DISTRACTORS:
        d_words = SPECIFIC_ID_DISTRACTORS[item_id]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]

# Verification: check all 2459 items
failed = 0
for item in data:
    if len(item['distractors']) != 3:
        failed += 1
        print(f"Failed count: {item['id']} has {len(item['distractors'])} distractors")

print(f"Total failed items: {failed} (0 expected)")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
