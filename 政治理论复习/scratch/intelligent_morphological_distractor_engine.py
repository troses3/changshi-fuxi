import json
import re
import random

# Load dataset
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Extract all words to use as a semantic pool
all_words = [item['word'].strip() for item in data]
all_words_clean = [re.sub(r'[“”"《》【】]', '', w) for w in all_words]

# Group words by length to serve as natural distractors
words_by_length = {}
for w in all_words_clean:
    if not any(char.isdigit() for char in w): # exclude pure numeric words from generic text matching
        L = len(w)
        if L not in words_by_length:
            words_by_length[L] = []
        if w not in words_by_length[L]:
            words_by_length[L].append(w)

def get_natural_distractors_by_length(w_clean, L, count=3, hint=""):
    pool = []
    # Gather candidates from length L, L-1, L+1
    for l in [L, L-1, L+1]:
        if l in words_by_length:
            pool.extend(words_by_length[l])
            
    # Filter candidates
    valid = []
    for c in pool:
        if c != w_clean and c not in hint.replace("______", "") and w_clean not in c and c not in w_clean:
            if c not in valid:
                valid.append(c)
                
    if len(valid) >= count:
        # Shuffle deterministically based on word so it's stable
        import hashlib
        seed = int(hashlib.md5(w_clean.encode('utf-8')).hexdigest(), 16) % 10000
        random.Random(seed).shuffle(valid)
        return valid[:count]
    return []

# Suffix matching pools
SUFFIX_POOLS = {
    "主义": ["经验主义", "形式主义", "教条主义", "主观主义", "宗派主义", "实用主义", "虚无主义", "资本主义", "封建主义", "霸权主义"],
    "思想": ["毛泽东思想", "邓小平理论", "科学发展观", "战略思想", "法治思想", "强军思想"],
    "理论": ["毛泽东思想", "邓小平理论", "科学发展观", "战略思想", "法治思想", "强军思想"],
    "体系": ["治理体系", "法治体系", "制度体系", "组织体系", "监督体系", "话语体系"],
    "能力": ["治理能力", "创新能力", "服务能力", "保障能力", "发展能力", "竞争能力"],
    "机制": ["体制机制", "激励机制", "约束机制", "监督机制", "协调机制", "保障机制"],
    "制度": ["根本制度", "基本制度", "重要制度", "分配制度", "保障制度", "产权制度"],
    "体制": ["经济体制", "政治体制", "文化体制", "社会体制", "生态体制", "管理体制"],
    "原则": ["基本原则", "首要原则", "根本原则", "重要原则", "客观原则", "指导原则"],
    "理念": ["创新理念", "绿色理念", "开放理念", "共享理念", "协调理念", "发展理念"],
    "特征": ["本质特征", "基本特征", "时代特征", "鲜明特征", "主要特征", "显著特征"],
    "要求": ["根本要求", "必然要求", "内在要求", "基本要求", "核心要求", "首要要求"],
    "任务": ["首要任务", "根本任务", "基本任务", "核心任务", "战略任务", "主要任务"],
    "目的": ["根本目的", "最终目的", "主要目的", "核心目的", "直接目的", "本质目的"],
    "前提": ["根本前提", "基本前提", "重要前提", "首要前提", "必然前提", "核心前提"],
    "保证": ["根本保证", "制度保证", "政治保证", "组织保证", "坚强保证", "有力保证"],
    "动力": ["根本动力", "内生动力", "强大动力", "核心动力", "持久动力", "不竭动力"],
    "基础": ["物质基础", "政治基础", "社会基础", "群众基础", "思想基础", "理论基础"],
    "核心": ["领导核心", "权力核心", "战略核心", "价值核心", "政治核心", "思想核心"],
    "化": ["现代化", "法治化", "规范化", "制度化", "科学化", "全球化", "信息化", "市场化", "大众化"],
    "性": ["普遍性", "特殊性", "客观性", "必然性", "偶然性", "主观性", "绝对性", "相对性"],
    "感": ["获得感", "幸福感", "安全感", "认同感", "归属感", "责任感", "使命感", "紧迫感"]
}

# Prefix matching pools
PREFIX_POOLS = {
    "最": ["最本质的特征", "最大的政治", "最深厚的根基", "最根本的保证", "最广泛的共识", "最核心的要求", "最直接的体现", "最突出的优势"],
    "全面": ["全面深化改革", "全面依法治国", "全面从严治党", "全面建设社会主义现代化国家", "全面建成小康社会", "全面推进乡村振兴"],
    "第一": ["第一要务", "第一动力", "第一资源", "第一位", "第一标准"],
    "第二": ["第二大经济体", "第二个百年奋斗目标", "第二阶段", "第二步", "第二大原则"],
    "大": ["大局观", "大历史观", "大时代观", "大食物观", "大农业观", "大生态观"]
}

# Generic fallback lists if all else fails
GENERIC_2 = ["改革", "发展", "稳定", "创新", "协调", "绿色", "开放", "共享", "安全", "法治", "民主", "文明", "和谐", "美丽"]
GENERIC_3 = ["全方位", "深层次", "宽领域", "高水平", "高质量", "多极化", "新常态", "大格局"]
GENERIC_4 = ["守正创新", "稳中求进", "先立后破", "问题导向", "系统观念", "胸怀天下", "自立自强", "求真务实", "实事求是", "与时俱进"]
GENERIC_5 = ["新发展理念", "高质量发展", "高水平开放", "新发展格局", "新质生产力", "共同富裕观", "总体安全观"]

def fix_catchalls_intelligently(item):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    L = len(w_clean)
    hint = item['hint'].strip()
    current_d = [d['word'] for d in item.get('distractors', [])]
    
    # Are we using a catchall?
    catchalls = ['守正创新', '稳中求进', '先立后破', '高水平科技自立自强', '全过程人民民主', '创新', '协调', '绿色', '科学理论指导', '社会主义核心价值观']
    has_catchall = any(c in current_d for c in catchalls)
    
    # Also fix if length mismatch is severe
    length_mismatch = any(abs(len(re.sub(r'[“”"《》【】]', '', d)) - L) >= 4 for d in current_d)
    
    # Don't touch numeric items if they look good
    if any(char.isdigit() for char in w) and "4%" not in w:
        if not has_catchall:
            return item

    if has_catchall or (length_mismatch and not any(char.isdigit() for char in w)):
        candidates = []
        
        # 1. Structure Match (A和B)
        if "和" in w_clean and L <= 10:
            candidates.extend(["改革和法治", "发展和安全", "效率和公平", "民主和集中", "继承和创新", "独立和自主"])
            
        # 2. Suffix Match
        for suff, pool in SUFFIX_POOLS.items():
            if w_clean.endswith(suff):
                candidates.extend(pool)
                
        # 3. Prefix Match
        for pref, pool in PREFIX_POOLS.items():
            if w_clean.startswith(pref):
                candidates.extend(pool)
                
        # 4. Long sentence natural distractors (Cross-Pollination)
        if L >= 7:
            natural = get_natural_distractors_by_length(w_clean, L, count=10, hint=hint)
            candidates.extend(natural)
            
        # 5. Length-based generic fallback
        if L == 2:
            candidates.extend(GENERIC_2)
        elif L == 3:
            candidates.extend(GENERIC_3)
        elif L == 4:
            candidates.extend(GENERIC_4)
        elif L == 5:
            candidates.extend(GENERIC_5)
        elif L == 6:
            candidates.extend(get_natural_distractors_by_length(w_clean, 6, count=10, hint=hint))
            
        # 6. Filter and finalize
        valid = []
        for c in candidates:
            c_clean = re.sub(r'[“”"《》【】]', '', c)
            if c != w and c_clean != w_clean and c_clean not in hint.replace("______", ""):
                # Disallow exact subsets/supersets to avoid logic errors
                if w_clean not in c_clean and c_clean not in w_clean:
                    if c not in valid:
                        valid.append(c)
            if len(valid) >= 3:
                break
                
        # If we still don't have 3, use natural pool completely
        if len(valid) < 3:
            natural_fallback = get_natural_distractors_by_length(w_clean, L, count=10, hint=hint)
            for c in natural_fallback:
                if c not in valid:
                    valid.append(c)
                if len(valid) >= 3:
                    break
                    
        # Ultimate fallback (should never happen)
        while len(valid) < 3:
            import string
            valid.append("选项未覆盖" + "".join(random.choices(string.ascii_letters, k=3)))
            
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in valid[:3]]
        
    return item

fixed_count = 0
for item in data:
    orig_d = [d['word'] for d in item.get('distractors', [])]
    updated = fix_catchalls_intelligently(item)
    new_d = [d['word'] for d in updated.get('distractors', [])]
    if orig_d != new_d:
        fixed_count += 1

print(f"Intelligently fixed {fixed_count} items via semantic & length-based cross-pollination.")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

# Regenerate Review Documents
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

with open('political_theory_review_table.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

print("Review documents strictly updated.")
