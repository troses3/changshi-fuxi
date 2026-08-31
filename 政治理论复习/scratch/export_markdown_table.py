import json
import re

# Load dataset
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

def ensure_three_distractors(item):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    hint = item['hint'].strip()
    curr_d = [d['word'] for d in item.get('distractors', []) if d.get('word', '') != w and re.sub(r'[“”"《》【】]', '', d.get('word', '')) != w_clean and re.sub(r'[“”"《》【】]', '', d.get('word', '')) not in hint.replace("______", "")]
    
    L = len(w_clean)
    backup_pool = [
        "守正创新", "稳中求进", "先立后破", "问题导向", "系统观念", "胸怀天下", "自立自强", "求真务实"
    ] if L == 4 else [
        "创新", "协调", "绿色", "开放", "共享", "发展", "安全", "法治"
    ] if L == 2 else [
        "高水平科技自立自强", "全过程人民民主", "社会主义核心价值观", "绿水青山就是金山银山"
    ]
    
    for b in backup_pool:
        b_clean = re.sub(r'[“”"《》【】]', '', b)
        if b != w and b_clean != w_clean and b_clean not in hint.replace("______", "") and b not in curr_d:
            curr_d.append(b)
        if len(curr_d) >= 3:
            break
            
    while len(curr_d) < 3:
        curr_d.append("科学理论指导")
        
    item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in curr_d[:3]]
    return item

for item in data:
    ensure_three_distractors(item)

# Save JS dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

# Generate Markdown file
md_lines = []
md_lines.append("# 《2026年政治理论背诵手册》全量题库审校表 (共 2459 题)\n")
md_lines.append("> **说明**：本表包含 2026 年背诵手册 159 页全量真题原句、挖空题干、正确考点答案及 3 个高仿真干扰项，供人工逐题审阅校验。\n\n")

current_chapter = ""
for idx, item in enumerate(data):
    chap = item.get('chapter', '未分类')
    if chap != current_chapter:
        current_chapter = chap
        md_lines.append(f"\n## 📖 {current_chapter}\n")
        
    p = item.get('page', 0)
    g = item.get('group', '')
    w = item.get('word', '')
    hint = item.get('hint', '')
    d_list = [d['word'] for d in item.get('distractors', [])]
    meaning = item.get('meaning', '')
    
    options_str = f"**正解**：`{w}` ｜ **干扰项**：`{d_list[0]}`、`{d_list[1]}`、`{d_list[2]}`"
    
    md_lines.append(f"### 第 {idx + 1} 题 ｜ [Page {p}] {g}")
    md_lines.append(f"- **【挖空题干】**：{hint}")
    md_lines.append(f"- **【选项配置】**：{options_str}")
    md_lines.append(f"- **【官方原句】**：{meaning}\n")

with open('2026年政治理论背诵手册_全量真题题库审校表.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

print(f"Successfully generated 2026年政治理论背诵手册_全量真题题库审校表.md with {len(data)} questions.")
