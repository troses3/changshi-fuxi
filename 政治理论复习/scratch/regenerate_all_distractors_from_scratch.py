import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Exhaustive Semantic Domain Ontology
DOMAIN_POOLS = {
    # 1. 纪律监督与党建职能 (4字)
    "discipline_functions": [
        "教育约束", "保障激励", "惩戒震慑", "监督纠偏", "引导示范", "防范化解", 
        "制度约束", "激励关怀", "宽严相济", "抓早抓小", "防微杜渐", "标本兼治"
    ],
    # 2. 战略定位与科学属性 (4字)
    "strategic_position": [
        "根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "根本原则",
        "根本制度", "基本方略", "战略举措", "战略任务", "战略支撑", "首要任务",
        "重要基石", "重要保障", "坚强后盾", "本质要求", "内在要求", "必然要求",
        "政治保证", "组织保证", "物质基础", "精神力量", "制度保障", "关键一招"
    ],
    # 3. 思想工作与方针原则 (4字)
    "work_principles": [
        "守正创新", "稳中求进", "先立后破", "自信自立", "胸怀天下", "问题导向", 
        "系统观念", "人民至上", "实事求是", "解放思想", "与时俱进", "求真务实",
        "自立自强", "深化改革", "自我革命", "统筹兼顾", "底线思维", "战略思维",
        "辩证思维", "历史思维", "法治思维", "创新思维", "精准施策", "因地制宜"
    ],
    # 4. 经济发展与市场要素 (4字)
    "economy_elements": [
        "新质生产力", "高质量发展", "供给侧改革", "全国统一大市场", "新型工业化",
        "新型城镇化", "乡村全面振兴", "数字经济", "实体经济", "民营经济", "先进制造",
        "现代服务", "专精特新", "有效市场", "有为政府", "营商环境", "要素流通",
        "顶层设计", "基层探索", "战略谋划", "系统集成", "协同高效", "东数西算"
    ],
    # 5. 国际外交与涉外倡议 (4字)
    "foreign_affairs": [
        "上海精神", "丝路精神", "金砖精神", "万隆精神", "平等有序", "普惠包容",
        "合作共赢", "开放包容", "多边主义", "单边主义", "阵营对抗", "霸权主义",
        "欧亚地区", "亚太地区", "全球南方", "人类命运"
    ],
    # 6. 生态绿色与碳减排 (4字)
    "ecology_terms": [
        "碳达峰", "碳中和", "碳排放", "碳足迹", "减污降碳", "绿色低碳", "生态红线",
        "碳冲锋", "大跃进", "一阵风", "一刀切", "运动式减碳", "粗暴式关停", "美丽中国"
    ],
    # 7. 司法与法治范畴 (4字)
    "judiciary_law": [
        "依宪治国", "依宪执政", "法治国家", "法治政府", "法治社会", "依法治国",
        "公正司法", "全民守法", "审判权和执行权分离", "刑事案件", "民事案件", "行政案件"
    ],
    # 8. 哲学辩证法范畴 (2-4字)
    "philosophy": [
        "同一性", "斗争性", "普遍性", "特殊性", "客观性", "条件性", "主要矛盾", "次要矛盾",
        "主要方面", "次要方面", "对立统一", "质量互变", "否定之否定", "绝对真理", "相对真理"
    ],
    # 9. 分配体制范畴 (4字)
    "distribution": [
        "初次分配", "再分配", "第三次分配", "转移支付", "税收调节", "社会保障", "按劳分配", "按要素分配"
    ],
    # 10. 管理与治理形容词 (3字)
    "governance_3": [
        "差别化", "精细化", "规范化", "动态化", "清单化", "常态化", "长效化", "制度化", "法治化"
    ],
    # 11. 核心理论概念 (5-6字)
    "core_number_terms": [
        "“十个明确”", "“十四个坚持”", "“十三个方面成就”", "“六个必须坚持”", 
        "“两个确立”", "“两个维护”", "“四个意识”", "“四个自信”", "“四个全面”", "“五位一体”"
    ],
    # 12. 梯队与水平 (2-4字)
    "ranking_level": [
        "中上", "前列", "高收入", "中等", "中高", "领先", "一流"
    ]
}

# Explicit high-accuracy mapping for specific terms
EXACT_KEYWORDS_MAP = {
    "保障激励": ["教育约束", "惩戒震慑", "监督纠偏"],
    "教育约束": ["保障激励", "惩戒震慑", "监督纠偏"],
    "惩戒震慑": ["教育约束", "保障激励", "监督纠偏"],
    "监督纠偏": ["教育约束", "保障激励", "惩戒震慑"],
    "东数西算": ["南水北调", "西电东送", "西气东输"],
    "多边主义": ["单边主义", "保护主义", "霸权主义"],
    "单边主义": ["多边主义", "保护主义", "霸权主义"],
    "刑事案件": ["民事案件", "行政案件", "经济纠纷"],
    "顶层设计": ["基层探索", "重点突破", "整体推进"],
    "基层探索": ["顶层设计", "战略谋划", "统筹推进"],
    "上海精神": ["丝路精神", "金砖精神", "万隆精神"],
    "“上海精神”": ["“丝路精神”", "“金砖精神”", "“万隆精神”"],
    "丝路精神": ["上海精神", "金砖精神", "万隆精神"],
    "“一带一路”": ["“全球发展倡议”", "“全球安全倡议”", "“全球文明倡议”"],
    "“小而美”": ["“高精尖”", "“精而专”", "“特而优”"],
    "决策之前和决策实施之中": ["决策制定和决策执行全过程", "事前预防和事后监督全流程", "调查研究与征求意见全周期"],
    "同一性": ["斗争性", "客观性", "普遍性"],
    "斗争性": ["同一性", "绝对性", "相对性"],
    "普遍性": ["特殊性", "客观性", "条件性"],
    "特殊性": ["普遍性", "客观性", "条件性"],
    "初次分配": ["再分配", "第三次分配", "转移支付"],
    "再分配": ["初次分配", "第三次分配", "转移支付"],
    "第三次分配": ["初次分配", "再分配", "转移支付"],
    "中上": ["前列", "高收入", "中等"],
    "规模最大": ["质量最优", "结构最全", "覆盖最广"],
    "碳达峰": ["碳中和", "碳达标", "碳排放"],
    "碳中和": ["碳达峰", "零排放", "负排放"],
    "碳冲锋": ["大跃进", "一阵风", "一刀切"],
    "运动式减碳": ["粗暴式关停", "形式化达标", "机械化关停"],
    "差别化": ["精细化", "规范化", "动态化"]
}

def generate_distractors_from_scratch(word, chapter, group, meaning):
    w = word.strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    
    # 1. Exact map
    if w in EXACT_KEYWORDS_MAP:
        return EXACT_KEYWORDS_MAP[w]
    if w_clean in EXACT_KEYWORDS_MAP:
        return EXACT_KEYWORDS_MAP[w_clean]
        
    # 2. Check which domain pool contains the word or its clean version
    for pool_name, pool_words in DOMAIN_POOLS.items():
        if w in pool_words or w_clean in [re.sub(r'[“”"《》【】]', '', x) for x in pool_words]:
            matches = [x for x in pool_words if x != w and re.sub(r'[“”"《》【】]', '', x) != w_clean]
            if len(matches) >= 3:
                return matches[:3]
                
    # 3. Context & Semantic Fallbacks based on group/chapter
    L = len(w_clean)
    if "纪律" in meaning or "监督" in meaning or "从严治党" in group:
        matches = [x for x in DOMAIN_POOLS["discipline_functions"] if len(re.sub(r'[“”"《》【】]', '', x)) == L and x != w]
        if len(matches) >= 3: return matches[:3]
        
    if "经济" in group or "市场" in group or "生产力" in meaning:
        matches = [x for x in DOMAIN_POOLS["economy_elements"] if len(re.sub(r'[“”"《》【】]', '', x)) == L and x != w]
        if len(matches) >= 3: return matches[:3]
        
    if "外交" in group or "峰会" in group or "国际" in group or "上海合作组织" in group:
        matches = [x for x in DOMAIN_POOLS["foreign_affairs"] if len(re.sub(r'[“”"《》【】]', '', x)) == L and x != w]
        if len(matches) >= 3: return matches[:3]

    if "生态" in group or "绿色" in group or "碳" in meaning:
        matches = [x for x in DOMAIN_POOLS["ecology_terms"] if len(re.sub(r'[“”"《》【】]', '', x)) == L and x != w]
        if len(matches) >= 3: return matches[:3]

    if "辩证法" in group or "唯物" in group or "认识论" in group:
        matches = [x for x in DOMAIN_POOLS["philosophy"] if len(re.sub(r'[“”"《》【】]', '', x)) == L and x != w]
        if len(matches) >= 3: return matches[:3]

    # 4. Standard 4-character strategy / principle fallback
    if L == 4:
        pool = DOMAIN_POOLS["strategic_position"] + DOMAIN_POOLS["work_principles"]
        matches = [x for x in pool if x != w and re.sub(r'[“”"《》【】]', '', x) != w_clean]
        return matches[:3]
    elif L == 2:
        pool = ["创新", "协调", "绿色", "开放", "共享", "发展", "安全", "法治", "民主", "公平"]
        matches = [x for x in pool if x != w and x != w_clean]
        return matches[:3]
    elif L == 3:
        matches = [x for x in DOMAIN_POOLS["governance_3"] if x != w]
        return matches[:3]
    elif 5 <= L <= 6:
        matches = [x for x in DOMAIN_POOLS["core_number_terms"] if x != w]
        return matches[:3]
    else:
        pool = [
            "国内大循环为主体、国内国际双循环相互促进",
            "创新、协调、绿色、开放、共享",
            "经济建设、政治建设、文化建设、社会建设、生态文明建设",
            "更为完善的制度保证、更为坚实的物质基础、更为主动的精神力量"
        ]
        matches = [x for x in pool if x != w]
        return matches[:3]

regenerated_count = 0
for item in data:
    d_list = generate_distractors_from_scratch(
        item['word'], item.get('chapter', ''), item.get('group', ''), item.get('meaning', '')
    )
    item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_list[:3]]
    regenerated_count += 1

print(f"Completely regenerated distractors from scratch for all {regenerated_count} items.")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
