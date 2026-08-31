import json
import re
import random

# Read existing database
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Specialized Fine-Grained Domain Dictionary
DOMAIN_CLUSTERS = {
    "distribution": [
        "初次分配", "再分配", "第三次分配", "转移支付", "按劳分配", "按要素分配"
    ],
    "contradiction_philosophy": [
        "普遍性", "特殊性", "客观性", "条件性", "主要矛盾", "次要矛盾", 
        "主要方面", "次要方面", "同一性", "斗争性", "对立统一", "质变与量变"
    ],
    "policy_adjectives_3": [
        "差别化", "精细化", "规范化", "动态化", "清单化", "常态化", "长效化", 
        "制度化", "法治化", "科学化", "协同化", "精准化", "网格化", "一体化"
    ],
    "policy_adjectives_4": [
        "先立后破", "稳扎稳打", "精准施策", "因地制宜", "分类指导", "统筹兼顾",
        "久久为功", "标本兼治", "破立并举", "提质增效", "扩面提标", "降本增效"
    ],
    "security_forces": [
        "“三股势力”", "“外部势力”", "“分裂势力”", "“敌对势力”", "“霸权主义”"
    ],
    "digital_tech_transformation": [
        "智能驱动", "数字赋能", "科技赋能", "融合发展", "模式创新", "业态升级",
        "数实融合", "智慧协同", "数据要素", "算法支撑", "算力网络", "全链协同"
    ],
    "market_resources": [
        "市场机制", "政府宏观调控", "市场准入", "公平竞争", "要素流通", "全国统一大市场",
        "有效市场", "有为政府", "营商环境", "有效投资", "激发活力", "规范发展"
    ],
    "strategic_position_4": [
        "根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "根本原则",
        "根本制度", "基本方略", "战略举措", "战略任务", "战略支撑", "首要任务",
        "重要基石", "重要保障", "坚强后盾", "本质要求", "内在要求", "必然要求",
        "制度保障", "物质基础", "精神力量", "政治保证", "组织保证", "前线位置"
    ],
    "party_revolution_4": [
        "自我革命", "社会革命", "自我净化", "自我完善", "自我革新", "自我提高",
        "全面从严", "思想建党", "制度治党", "依规治党", "风清气正", "正风肃纪"
    ],
    "core_number_series": [
        "“十个明确”", "“十四个坚持”", "“十三个方面成就”", "“六个必须坚持”", 
        "“两个确立”", "“两个维护”", "“四个意识”", "“四个自信”", "“四个全面”", 
        "“五位一体”", "“两个结合”", "“三新一高”"
    ],
    "ecological_concepts": [
        "碳达峰", "碳中和", "碳排放", "碳足迹", "碳市场", "碳汇能力",
        "绿水青山", "金山银山", "美丽中国", "减污降碳", "绿色低碳", "生态红线"
    ],
    "modernization_long_goals": [
        "富强民主文明和谐美丽", "社会主义现代化强国", "中华民族伟大复兴",
        "中国式现代化", "高水平科技自立自强", "全过程人民民主", "社会主义核心价值观"
    ]
}

# Clean noise word function
def is_valid_distractor(w):
    if not w or len(w) <= 1:
        return False
    if any(char.isdigit() for char in w):
        return False
    if any(p in w for p in ['年内', '期满', '不能', '既要', '又要', '建成', '超过', '开始', '来自', '进行']):
        return False
    return True

# Clean all candidates in data
cleaned_vocab = set()
for item in data:
    w = item.get('word', '').strip()
    if is_valid_distractor(w):
        cleaned_vocab.add(w)

vocab_by_len = {}
for w in cleaned_vocab:
    l = len(re.sub(r'[“”"《》【】]', '', w))
    if l not in vocab_by_len:
        vocab_by_len[l] = []
    vocab_by_len[l].append(w)

def match_domain_distractors(target_word, meaning, chapter, group):
    tw = target_word.strip()
    tw_clean = re.sub(r'[“”"《》【】]', '', tw)
    L = len(tw_clean)
    
    # 1. Direct domain cluster matching
    for cluster_name, cluster_words in DOMAIN_CLUSTERS.items():
        if tw in cluster_words or any(w in tw for w in cluster_words):
            matches = [w for w in cluster_words if w != tw and re.sub(r'[“”"《》【】]', '', w) != tw_clean]
            if len(matches) >= 3:
                return matches[:3]
                
    # 2. Heuristic domain categorization
    if any(k in tw for k in ["分配", "税收", "社保", "转移"]):
        pool = DOMAIN_CLUSTERS["distribution"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]
        
    if any(k in tw for k in ["矛盾", "普遍", "特殊", "同一", "斗争", "规律"]):
        pool = DOMAIN_CLUSTERS["contradiction_philosophy"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]
        
    if tw.endswith("化") and L == 3:
        pool = DOMAIN_CLUSTERS["policy_adjectives_3"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]
        
    if any(k in tw for k in ["碳", "生态", "绿色", "排污"]):
        pool = DOMAIN_CLUSTERS["ecological_concepts"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]

    if any(k in tw for k in ["根本", "重要", "战略", "基本", "首要", "必然", "本质"]):
        pool = DOMAIN_CLUSTERS["strategic_position_4"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]

    if any(k in tw for k in ["革命", "从严", "治党", "净化", "革新"]):
        pool = DOMAIN_CLUSTERS["party_revolution_4"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]

    if any(k in tw for k in ["明确", "坚持", "确立", "维护", "意识", "自信", "结合"]):
        pool = DOMAIN_CLUSTERS["core_number_series"]
        matches = [w for w in pool if w != tw]
        if len(matches) >= 3: return matches[:3]

    # 3. Fallback to clean vocabulary of exact same length
    candidates = []
    if L in vocab_by_len:
        same_len = [w for w in vocab_by_len[L] if w != tw and is_valid_distractor(w)]
        random.shuffle(same_len)
        candidates.extend(same_len)
        
    if len(candidates) < 3 and (L-1) in vocab_by_len:
        candidates.extend([w for w in vocab_by_len[L-1] if w != tw and is_valid_distractor(w)])
    if len(candidates) < 3 and (L+1) in vocab_by_len:
        candidates.extend([w for w in vocab_by_len[L+1] if w != tw and is_valid_distractor(w)])

    # Unique & format
    seen = set()
    final = []
    for c in candidates:
        if c not in seen and c != tw:
            seen.add(c)
            final.append(c)
        if len(final) == 3:
            break
            
    while len(final) < 3:
        final.append("科学理论指导")
        
    return final

# Process and update all items
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

print("Successfully updated with domain-thesaurus distractors!")
