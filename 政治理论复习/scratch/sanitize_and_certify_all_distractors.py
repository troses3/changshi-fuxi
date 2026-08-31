import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Blacklist of fragmented / non-standard distractor words
BLACKLIST = [
    '主播', '水库', '湿地', '湖泊', '构性', '应先行', '可不', '地块', '最大的政治', 
    '政府指导价', '欠账', '军委主席', '总章程', '消费税', '就业见习', '农户家庭', 
    '先使用后付费', '五成', '期满', '年内', '不能', '既要', '又要', '建成', '超过',
    '短实新', '最集中', '新挑战', '防止', '目标', '公款', '保留必要', '资源型'
]

# Standard Topic Clusters
STANDARD_POOLS = {
    # 国际外交与涉外战略
    "diplomacy_intl": [
        "“一带一路”", "“全球发展倡议”", "“全球安全倡议”", "“全球文明倡议”", "“全球治理倡议”",
        "“上海精神”", "“丝路精神”", "“金砖精神”", "“万隆精神”",
        "联合国", "世界贸易组织", "国际货币基金组织", "世界银行", "亚太经合组织",
        "上海合作组织开发银行", "金砖国家新开发银行", "亚洲基础设施投资银行", "丝路基金",
        "平等有序", "普惠包容", "合作共赢", "开放包容", "互利共赢、共同发展", "和平共处、互利共赢",
        "上合力量", "上合担当", "上合示范", "上合行动",
        "“三股势力”", "“分裂势力”", "“极端势力”", "“恐怖势力”",
        "共商共建共享", "真正的多边主义", "人类命运共同体"
    ],
    # 思想理论与核心定位
    "theory_positions": [
        "根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "根本原则",
        "根本制度", "基本方略", "战略举措", "战略任务", "战略支撑", "首要任务",
        "重要基石", "重要保障", "坚强后盾", "本质要求", "内在要求", "必然要求",
        "马克思主义", "毛泽东思想", "科学社会主义", "中国特色社会主义理论体系",
        "中华优秀传统文化", "革命文化", "社会主义先进文化", "中华文明智慧结晶",
        "遵义会议", "瓦窑堡会议", "洛川会议", "六届六中全会", "七届二中全会", "十一届三中全会"
    ],
    # 经济发展与新质生产力
    "economy_industry": [
        "新质生产力", "高质量发展", "传统生产力", "先进生产力", "高水平科技自立自强",
        "全国统一大市场", "高水平社会主义市场经济体制", "要素市场化配置",
        "有效市场", "有为政府", "营商环境", "现代化产业体系", "先进制造业",
        "初次分配", "再分配", "第三次分配", "转移支付", "按劳分配", "按要素分配",
        "制度型开放", "商品和要素流动型开放", "外资准入负面清单", "自由贸易试验区",
        "“小而美”", "“高精尖”", "“精而专”", "“特而优”", "标志性工程", "示范性工程"
    ],
    # 政治制度与法治民主
    "politics_law": [
        "全过程人民民主", "协商民主", "基层民主", "党内民主",
        "决策之前和决策实施之中", "决策制定和决策执行全过程", "事前预防和事后监督全流程", "调查研究与征求意见全周期",
        "依宪治国", "依宪执政", "法治国家", "法治政府", "法治社会",
        "党的全面领导", "党的自我革命", "全面从严治党", "制度治党、依规治党"
    ],
    # 哲学与唯物辩证法
    "philosophy_dialectic": [
        "对立统一规律", "质量互变规律", "否定之否定规律", "主要矛盾和次要矛盾",
        "矛盾的主要方面和次要方面", "同一性", "斗争性", "普遍性", "特殊性",
        "客观规律性与主观能动性", "绝对真理与相对真理", "感性认识与理性认识"
    ],
    # 绿色低碳与生态环境
    "ecology_green": [
        "碳达峰", "碳中和", "碳排放", "碳足迹", "减污降碳", "绿色低碳", "生态红线",
        "碳冲锋", "大跃进", "一阵风", "一刀切", "运动式减碳", "粗暴式关停", "形式化达标",
        "差别化", "精细化", "规范化", "动态化", "清单化", "常态化", "长效化"
    ]
}

# Explicit overrides for precise terms
EXACT_OVERRIDE_MAP = {
    "“一带一路”": ["“全球发展倡议”", "“全球安全倡议”", "“全球文明倡议”"],
    "一带一路": ["全球发展倡议", "全球安全倡议", "全球文明倡议"],
    "“小而美”": ["“高精尖”", "“精而专”", "“特而优”"],
    "小而美": ["高精尖", "精而专", "特而优"],
    "互利合作、相互成就": ["互利共赢、共同发展", "和平共处、互利共赢", "开放包容、合作共赢"],
    "六届六中全会": ["遵义会议", "瓦窑堡会议", "七届二中全会"],
    "中华优秀传统文化": ["革命文化", "社会主义先进文化", "中华文明智慧结晶"],
    "马克思主义": ["毛泽东思想", "科学社会主义", "中国特色社会主义理论体系"],
    "标志性工程": ["示范性工程", "战略性工程", "基础性工程"],
    "制度型开放": ["商品要素流动型开放", "边境后规则开放", "高水平双向开放"],
    "最安全国家之一": ["最具活力经济体之一", "最大发展中国家", "重要新兴市场国家"],
    "最进步的阶级": ["最可靠的同盟军", "最具创造力的群体", "最坚强的领导力量"],
    "职工为中心": ["人民为中心", "以人民为根本", "以群众为导向"],
    "老龄化、少子化": ["高龄化、少子化", "少子化、长寿化", "老龄化、家庭小型化"],
    "市场基础制度": ["宏观调控机制", "现代产权制度", "公平竞争审查制度"],
    "关键核心技术攻关": ["基础前沿科学研究", "关键共性技术研发", "颠覆性技术创新"]
}

def is_clean_distractor(w, target_w):
    if not w or len(w) <= 1:
        return False
    if w == target_w or re.sub(r'[“”"《》【】]', '', w) == re.sub(r'[“”"《》【】]', '', target_w):
        return False
    if any(b in w for b in BLACKLIST):
        return False
    return True

def get_pure_distractors(target_w, chapter, group):
    tw = target_w.strip()
    tw_clean = re.sub(r'[“”"《》【】]', '', tw)
    L = len(tw_clean)
    
    # 1. Check exact override map
    if tw in EXACT_OVERRIDE_MAP:
        return EXACT_OVERRIDE_MAP[tw]
    if tw_clean in EXACT_OVERRIDE_MAP:
        return EXACT_OVERRIDE_MAP[tw_clean]
        
    # 2. Check topic pools
    for pool_name, pool_list in STANDARD_POOLS.items():
        if tw in pool_list or tw_clean in [re.sub(r'[“”"《》【】]', '', x) for x in pool_list]:
            matches = [x for x in pool_list if is_clean_distractor(x, tw)]
            if len(matches) >= 3:
                return matches[:3]
                
    # 3. Topic-based match by chapter/group
    if "马克思主义" in chapter or "唯物" in group:
        matches = [x for x in STANDARD_POOLS["philosophy_dialectic"] if is_clean_distractor(x, tw)]
        if len(matches) >= 3: return matches[:3]
    elif "生态" in group or "碳" in tw:
        matches = [x for x in STANDARD_POOLS["ecology_green"] if is_clean_distractor(x, tw)]
        if len(matches) >= 3: return matches[:3]
    elif "峰会" in group or "上合" in group or "金砖" in group or "国际" in group:
        matches = [x for x in STANDARD_POOLS["diplomacy_intl"] if is_clean_distractor(x, tw)]
        if len(matches) >= 3: return matches[:3]
    elif "经济" in group or "产业" in group or "市场" in group:
        matches = [x for x in STANDARD_POOLS["economy_industry"] if is_clean_distractor(x, tw)]
        if len(matches) >= 3: return matches[:3]
    elif "民主" in group or "法治" in group or "党" in group:
        matches = [x for x in STANDARD_POOLS["politics_law"] if is_clean_distractor(x, tw)]
        if len(matches) >= 3: return matches[:3]

    # 4. Standard length-matched fallback from theory positions
    matches = [x for x in STANDARD_POOLS["theory_positions"] if is_clean_distractor(x, tw)]
    return matches[:3]

sanitized_count = 0
for item in data:
    tw = item['word']
    curr_d = [d.get('word', '') for d in item.get('distractors', [])]
    
    # Check if needs re-generation
    needs_regen = False
    if tw in EXACT_OVERRIDE_MAP or re.sub(r'[“”"《》【】]', '', tw) in EXACT_OVERRIDE_MAP:
        needs_regen = True
    elif len(curr_d) < 3 or any(not is_clean_distractor(dw, tw) for dw in curr_d):
        needs_regen = True
        
    if needs_regen:
        new_d = get_pure_distractors(tw, item.get('chapter', ''), item.get('group', ''))
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in new_d[:3]]
        sanitized_count += 1

print(f"Sanitized and certified {sanitized_count} items with 100% pure standard options.")

# Final verification
remaining_bad = 0
for item in data:
    tw = item['word']
    for d in item['distractors']:
        dw = d['word']
        if not is_clean_distractor(dw, tw):
            remaining_bad += 1
            print(f"Residual bad: item {item['id']} ({tw}) -> {dw}")

print(f"Remaining bad distractors: {remaining_bad} (0 expected)")

# Save final dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
