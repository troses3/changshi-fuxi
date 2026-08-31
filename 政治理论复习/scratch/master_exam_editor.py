import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# 1. Clean Unbalanced Quotes in Keywords
WORD_CLEANUPS = {
    "一带一路”合作": "“一带一路”",
    "“一带一路”合作": "“一带一路”",
    "小而美”民生": "“小而美”",
    "“小而美”民生": "“小而美”",
    "互利合作、相互成": "互利合作、相互成就",
    "永不敌": "永不为敌",
    "三股势力": "“三股势力”",
    "世界贸易组织力核心": "世界贸易组织为核心"
}

# 2. Master Semantic Topic Dictionary for High-Precision Distractors
TOPIC_THEMES = {
    # 国际与外交倡议
    "global_initiatives": [
        "全球发展倡议", "全球安全倡议", "全球文明倡议", "全球治理倡议"
    ],
    # 国际组织与机构
    "intl_orgs_short": [
        "联合国", "世界贸易组织", "国际货币基金组织", "世界银行", "亚太经合组织"
    ],
    "intl_orgs_long": [
        "上海合作组织开发银行", "金砖国家新开发银行", "亚洲基础设施投资银行", "丝路基金"
    ],
    # 精神系列
    "spirit_4": [
        "上海精神", "丝路精神", "金砖精神", "万隆精神", "长征精神", "延安精神", "建党精神"
    ],
    # 上合四担当
    "sco_four_terms": [
        "上合力量", "上合担当", "上合示范", "上合行动"
    ],
    # 多极化与全球化特征
    "globalization_traits": [
        "平等有序", "普惠包容", "合作共赢", "开放包容"
    ],
    # 合作理念
    "cooperation_principles": [
        "志同道合", "求同存异", "互利共赢", "休戚与共", "守望相助", "同舟共济"
    ],
    # 国际安全与治理中心
    "security_centers": [
        "禁毒", "反恐", "网络安全", "经贸合作", "防扩散"
    ],
    # 势力分类
    "forces_types": [
        "“三股势力”", "“分裂势力”", "“极端势力”", "“恐怖势力”", "“外部干涉”"
    ],
    # 决策程序
    "decision_process": [
        "决策之前和决策实施之中", "决策制定和决策执行全过程", "事前预防和事后监督全流程", "调查研究与征求意见全周期"
    ],
    # 分配体制
    "distribution_system": [
        "初次分配", "再分配", "第三次分配", "转移支付", "税收调节", "社保保障"
    ],
    # 唯物辩证法核心范畴
    "dialectic_terms": [
        "同一性", "斗争性", "普遍性", "特殊性", "客观性", "条件性", "质变与量变", "肯定与否定"
    ],
    # 战略定位四字
    "strategy_positions_4": [
        "根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "根本原则",
        "根本制度", "基本方略", "战略举措", "战略任务", "战略支撑", "首要任务",
        "重要基石", "重要保障", "坚强后盾", "本质要求", "内在要求", "必然要求"
    ],
    # 核心理论系列
    "core_series": [
        "“十个明确”", "“十四个坚持”", "“十三个方面成就”", "“六个必须坚持”", 
        "“两个确立”", "“两个维护”", "“四个意识”", "“四个自信”", "“四个全面”", 
        "“五位一体”", "“两个结合”"
    ],
    # 绿色低碳转型
    "green_carbon": [
        "碳达峰", "碳中和", "碳排放", "碳足迹", "减污降碳", "绿色低碳", "生态红线", "清洁能源"
    ],
    "carbon_warnings": [
        "碳冲锋", "大跃进", "一阵风", "一刀切", "运动式减碳", "粗暴式关停", "形式化达标"
    ],
    # 治理Adjectives
    "governance_adjectives": [
        "差别化", "精细化", "规范化", "动态化", "清单化", "常态化", "长效化", "科学化", "协同化"
    ]
}

def clean_word_and_hint(item):
    w = item['word'].strip()
    m_text = item['meaning'].strip()
    
    # 1. Clean typo in meaning
    m_text = m_text.replace("世界贸易组织力核心", "世界贸易组织为核心")
    m_text = m_text.replace("宣告世代友好、永不敌。", "宣告世代友好、永不为敌。")
    m_text = m_text.replace("对重大战略、重点领域、薄弱环节", "重大战略、重点领域、薄弱环节")
    m_text = re.sub(r'^(（[0-9一二三四五六七八九十]+）|[①②③④⑤⑥⑦⑧⑨⑩]|—聚焦|[0-9]+\.|\([0-9]+\))\s*', '', m_text)
    m_text = re.sub(r'^健全协商民主机制\s*', '', m_text)
    m_text = re.sub(r'^（一）所有制：坚持“两个毫不动摇”\s*', '', m_text)
    
    # 2. Fix specific sliced words
    if w in WORD_CLEANUPS:
        w = WORD_CLEANUPS[w]
    elif w == "一带一路":
        w = "“一带一路”"
    elif w == "小而美":
        w = "“小而美”"
        
    item['word'] = w
    item['meaning'] = m_text
    
    # 3. Formulate pristine hint
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    if f"“{w_clean}”" in m_text:
        hint = m_text.replace(f"“{w_clean}”", "“______”")
    elif w in m_text:
        hint = m_text.replace(w, "______")
    elif w_clean in m_text:
        hint = m_text.replace(w_clean, "______")
    else:
        hint = m_text
        
    # Clean double quote wrapping in hint if needed
    hint = hint.replace("““______””", "“______”")
    hint = hint.replace("“______””", "“______”")
    hint = hint.replace("““______”", "“______”")
    
    item['hint'] = hint
    item['examples'] = [m_text]
    return item

def assign_high_grade_distractors(item):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    
    for theme_name, theme_list in TOPIC_THEMES.items():
        if w in theme_list or w_clean in [re.sub(r'[“”"《》【】]', '', x) for x in theme_list]:
            matches = [x for x in theme_list if x != w and re.sub(r'[“”"《》【】]', '', x) != w_clean]
            if len(matches) >= 3:
                item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in matches[:3]]
                return item
                
    # Fallback to existing distractors if clean, or standard policy choices
    curr_d = item.get('distractors', [])
    clean_d = [d.get('word', '') for d in curr_d if d.get('word', '') != w and not any(p in d.get('word', '') for p in ['可不', '具体地块', '就业教育', '国家政权', '短实新', '第一', '群众', '攀登'])]
    if len(clean_d) >= 3:
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in clean_d[:3]]
    else:
        # Generate length-appropriate policy distractors
        L = len(w_clean)
        if L == 2:
            defaults = ["创新", "协调", "绿色", "开放", "共享", "发展", "安全", "法治"]
        elif L == 4:
            defaults = ["守正创新", "稳中求进", "先立后破", "问题导向", "系统观念", "胸怀天下", "自立自强"]
        elif 5 <= L <= 8:
            defaults = ["高水平科技自立自强", "全过程人民民主", "社会主义核心价值观", "绿水青山就是金山银山", "中国式现代化"]
        else:
            defaults = ["国内大循环为主体、国内国际双循环相互促进", "坚持党的全面领导、坚持以人民为中心", "经济建设、政治建设、文化建设、社会建设、生态文明建设"]
        matches = [x for x in defaults if x != w and re.sub(r'[“”"《》【】]', '', x) != w_clean]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in matches[:3]]
        
    return item

processed_items = []
for item in data:
    item = clean_word_and_hint(item)
    item = assign_high_grade_distractors(item)
    processed_items.append(item)

# Save
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(processed_items)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(processed_items, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print(f"Successfully processed and polished {len(processed_items)} items.")
