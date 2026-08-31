import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

POLICY_ACTION_VERBS = {
    "有序外迁": ["就地安置", "自主迁移", "集中回迁"],
    "就地安置": ["有序外迁", "分散安置", "异地搬迁"],
    "异地搬迁": ["就地安置", "生态移民", "返乡定居"],
    "分类施策": ["精准施策", "一刀切断", "协同发力"],
    "精准帮扶": ["兜底保障", "普惠支持", "动态监测"],
    "动态调整": ["定期评估", "清单管理", "长效固化"],
    "盘活存量": ["扩大增量", "做优增量", "提高质量"],
    "做优增量": ["盘活存量", "做大总量", "优化结构"],
    "严控增量": ["盘活存量", "消化存量", "做优增量"],
    "消化存量": ["严控增量", "做优增量", "做大总量"],
    "先立后破": ["破立并举", "大干快上", "急于求成"],
    "稳扎稳打": ["急功近利", "步步为营", "久久为功"],
    "疏解功能": ["承接产业", "集聚要素", "优化布局"],
    "提质增效": ["扩面提标", "降本增效", "纾困解难"],
    "降本增效": ["提质增效", "节支增收", "减负让利"]
}

replaced = 0
for item in data:
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    if w in POLICY_ACTION_VERBS:
        d_words = POLICY_ACTION_VERBS[w]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]
        replaced += 1
    elif w_clean in POLICY_ACTION_VERBS:
        d_words = POLICY_ACTION_VERBS[w_clean]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]
        replaced += 1

print(f"Enriched {replaced} practical policy action verbs.")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
