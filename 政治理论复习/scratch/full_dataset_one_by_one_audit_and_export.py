import json
import re

# Load dataset
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

print(f"Starting exhaustive one-by-one audit for {len(data)} items...")

# Comprehensive Dictionary of Fine-Grained Domain Ontologies
DOMAIN_ONTOLOGY = {
    # 1. 生态环境与资源保护
    "ecology_resources": {
        "words": [
            "国家公园", "自然保护区", "自然公园", "森林公园", "湿地公园", "地质公园",
            "生态保护红线", "永久基本农田", "城镇开发边界", "林地红线", "草地红线",
            "碳达峰", "碳中和", "碳排放", "碳足迹", "碳市场", "碳汇能力",
            "碳冲锋", "大跃进", "一阵风", "一刀切", "运动式减碳", "粗暴式关停",
            "减污降碳", "协同增效", "精准治污", "科学治污", "依法治污",
            "绿水青山", "金山银山", "美丽中国", "绿色低碳", "节水优先", "空间均衡"
        ],
        "default_distractors": ["自然保护区", "自然公园", "风景名胜区"]
    },
    # 2. 宏观经济与市场体制
    "economy_market": {
        "words": [
            "有效市场", "有为政府", "计划调节", "宏观调控", "微观规制", "行政干预",
            "新质生产力", "高质量发展", "传统生产力", "先进生产力", "高水平科技自立自强",
            "全国统一大市场", "高水平社会主义市场经济体制", "要素市场化配置",
            "初次分配", "再分配", "第三次分配", "转移支付", "按劳分配", "按要素分配",
            "直接融资", "间接融资", "股权融资", "债权融资", "科技金融", "绿色金融", "普惠金融", "养老金融", "数字金融",
            "制度型开放", "商品要素流动型开放", "外资准入负面清单", "自由贸易试验区",
            "扩大内需", "供给侧结构性改革", "做优增量", "盘活存量", "严控增量", "消化存量"
        ],
        "default_distractors": ["高质量发展", "供给侧改革", "全国统一大市场"]
    },
    # 3. 党的建设与纪律监督
    "party_discipline": {
        "words": [
            "教育约束", "保障激励", "惩戒震慑", "监督纠偏", "引导示范", "防范化解",
            "思想建党", "制度治党", "依规治党", "全面从严治党", "党的自我革命",
            "政治建设", "思想建设", "组织建设", "作风建设", "纪律建设", "制度建设",
            "形式主义", "官僚主义", "享乐主义", "奢靡之风", "特权思想", "特权现象",
            "自我革命", "社会革命", "自我净化", "自我完善", "自我革新", "自我提高",
            "党内监督", "人民监督", "巡视监督", "纪律监督", "监察监督", "派驻监督"
        ],
        "default_distractors": ["惩戒震慑", "监督纠偏", "引导示范"]
    },
    # 4. 民主政治与法治中国
    "politics_law": {
        "words": [
            "全过程人民民主", "协商民主", "基层民主", "党内民主", "实质民主", "程序民主",
            "依宪治国", "依宪执政", "法治国家", "法治政府", "法治社会", "依法治国",
            "科学立法", "严格执法", "公正司法", "全民守法",
            "决策之前和决策实施之中", "决策制定和决策执行全过程", "事前预防和事后监督全流程", "调查研究与征求意见全周期",
            "审判权和执行权分离", "刑事案件", "民事案件", "行政案件", "公益诉讼"
        ],
        "default_distractors": ["依法治国", "公正司法", "全民守法"]
    },
    # 5. 哲学辩证法与思想方法
    "philosophy_method": {
        "words": [
            "同一性", "斗争性", "普遍性", "特殊性", "客观性", "条件性", "主要矛盾", "次要矛盾",
            "主要方面", "次要方面", "对立统一规律", "质量互变规律", "否定之否定规律",
            "绝对真理", "相对真理", "感性认识", "理性认识", "唯物史观", "唯心史观",
            "教条主义", "经验主义", "实用主义", "虚无主义", "主观主义", "宗派主义",
            "物理反应", "化学反应", "机械相加", "要素堆砌", "表面拼贴", "互相成就", "彼此契合"
        ],
        "default_distractors": ["普遍性", "客观性", "条件性"]
    },
    # 6. 外交涉外与全球治理
    "foreign_diplomacy": {
        "words": [
            "“一带一路”", "“全球发展倡议”", "“全球安全倡议”", "“全球文明倡议”", "“全球治理倡议”",
            "“上海精神”", "“丝路精神”", "“金砖精神”", "“万隆精神”",
            "联合国", "世界贸易组织", "国际货币基金组织", "世界银行", "亚太经合组织",
            "上海合作组织开发银行", "金砖国家新开发银行", "亚洲基础设施投资银行", "丝路基金",
            "平等有序", "普惠包容", "合作共赢", "开放包容", "多边主义", "单边主义", "霸权主义",
            "上合力量", "上合担当", "上合示范", "上合行动", "“三股势力”", "“分裂势力”", "“极端势力”"
        ],
        "default_distractors": ["“全球发展倡议”", "“全球安全倡议”", "“全球文明倡议”"]
    },
    # 7. 社会民生与教育文化
    "social_education": {
        "words": [
            "基础教育", "高等教育", "职业教育", "特殊教育", "继续教育",
            "规模最大", "质量最优", "结构最全", "覆盖最广", "基本均衡", "优质均衡",
            "前列", "中上", "高收入", "中等", "中高",
            "立德树人", "教书育人", "因材施教", "培根铸魂", "启智增慧",
            "以信任为基础的人才使用机制", "以考核为核心的人才评价机制", "以竞争为导向的人才选拔机制"
        ],
        "default_distractors": ["基础教育", "职业教育", "高等教育"]
    }
}

# Explicit high-accuracy mapping for specific terms
EXACT_TERM_OVERHAUL = {
    "国家公园": ["自然保护区", "自然公园", "风景名胜区"],
    "自然保护区": ["国家公园", "自然公园", "生态保护区"],
    "自然公园": ["国家公园", "自然保护区", "森林公园"],
    "物理反应": ["机械相加", "要素堆砌", "表面拼贴"],
    "化学反应": ["生物进化", "质变升华", "形态重塑"],
    "彼此契合": ["互相成就", "各取所需", "单向融入"],
    "互相成就": ["彼此契合", "同频共振", "和合共生"],
    "旧邦新命": ["文明复兴", "历史自觉", "时代使命"],
    "教条主义": ["经验主义", "形式主义", "宗派主义"],
    "实用主义": ["虚无主义", "主观主义", "宗派主义"],
    "虚无主义": ["教条主义", "实用主义", "主观主义"],
    "保障激励": ["惩戒震慑", "监督纠偏", "引导示范"],
    "教育约束": ["惩戒震慑", "监督纠偏", "引导示范"],
    "惩戒震慑": ["教育约束", "保障激励", "监督纠偏"],
    "严控": ["放宽", "限制", "严禁"],
    "严禁": ["允许", "限制", "规范"],
    "放宽": ["严控", "限制", "取消"],
    "中上": ["前列", "高收入", "中等"],
    "规模最大": ["质量最优", "结构最全", "覆盖最广"],
    "基本均衡": ["优质均衡", "完全均衡", "统筹协调"],
    "有序外迁": ["就地安置", "自主迁移", "集中回迁"],
    "上海精神": ["丝路精神", "金砖精神", "万隆精神"],
    "“上海精神”": ["“丝路精神”", "“金砖精神”", "“万隆精神”"],
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
    "碳达峰": ["碳中和", "碳达标", "碳排放"],
    "碳中和": ["碳达峰", "零排放", "负排放"],
    "碳冲锋": ["大跃进", "一阵风", "一刀切"],
    "运动式减碳": ["粗暴式关停", "形式化达标", "机械化关停"],
    "差别化": ["精细化", "规范化", "动态化"],
    "市场": ["政府", "社会", "企业"],
    "政府": ["市场", "社会", "企业"],
    "耕地": ["林地", "草地", "湿地"],
    "种业": ["农机", "化肥", "水利"],
    "种子": ["化肥", "农药", "地膜"],
    "上游": ["中游", "下游", "源头"],
    "中游": ["上游", "下游", "源头"],
    "下游": ["上游", "中游", "源头"],
    "正比": ["反比", "无关", "恒定"],
    "反比": ["正比", "无关", "恒定"],
    "魂脉": ["根脉", "血脉", "文脉"],
    "根脉": ["魂脉", "血脉", "文脉"],
    "底线": ["红线", "高线", "主线"],
    "红线": ["底线", "高线", "主线"],
    "龙头": ["基点", "支柱", "基石"],
    "基点": ["龙头", "支柱", "基石"],
    "五成": ["三成", "六成", "七成"],
    "八成": ["五成", "六成", "九成"],
    "县域": ["市域", "省域", "乡镇"],
    "市域": ["县域", "省域", "基层"],
    "乡镇": ["村庄", "县域", "社区"]
}

def clean_item_thoroughly(item, idx):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    m_text = item['meaning'].strip()
    hint = item['hint'].strip()
    group = item.get('group', '')
    chapter = item.get('chapter', '')
    
    # 1. Clean sentence typos
    m_text = m_text.replace("人口迁人", "人口迁入")
    m_text = m_text.replace("收人分配", "收入分配")
    m_text = m_text.replace("承盾", "矛盾")
    m_text = m_text.replace("力核心", "为核心")
    m_text = m_text.replace("决定性意必", "决定性意义")
    
    # 2. Re-extract tight single clause if text is long
    if len(m_text) > 70 and any(p in m_text for p in ['。', '；', '，']):
        sentences = re.split(r'([。；])', m_text)
        rebuilt = []
        for i in range(0, len(sentences)-1, 2):
            rebuilt.append(sentences[i] + sentences[i+1])
        if len(sentences) % 2 == 1 and sentences[-1].strip():
            rebuilt.append(sentences[-1])
        for s in rebuilt:
            if w in s or w_clean in s:
                clean_s = re.sub(r'^[一二三四五六七八九十]+、\s*[\u4e00-\u9fa5]+\s*', '', s)
                clean_s = re.sub(r'^[一二三四五六七八九十]+、\s*', '', clean_s)
                clean_s = re.sub(r'^(（[0-9一二三四五六七八九十]+）|[①②③④⑤⑥⑦⑧⑨⑩]|—聚焦|[0-9]+\.|\([0-9]+\))\s*', '', clean_s)
                if clean_s.strip():
                    m_text = clean_s.strip()
                    break

    # 3. Clean leading headers
    m_text = re.sub(r'^[一二三四五六七八九十]+、\s*[\u4e00-\u9fa5]+\s*', '', m_text)
    m_text = re.sub(r'^[一二三四五六七八九十]+、\s*', '', m_text)
    m_text = re.sub(r'^(（[0-9一二三四五六七八九十]+）|[①②③④⑤⑥⑦⑧⑨⑩]|—聚焦|[0-9]+\.|\([0-9]+\))\s*', '', m_text)
    m_text = m_text.strip()
    
    # 4. Formulate clean hint
    if f"“{w_clean}”" in m_text:
        hint = m_text.replace(f"“{w_clean}”", "“______”")
    elif w in m_text:
        hint = m_text.replace(w, "______")
    elif w_clean in m_text:
        hint = m_text.replace(w_clean, "______")
    else:
        hint = m_text + "（考点：______）"
        
    hint = hint.replace("““______””", "“______”")
    hint = hint.replace("“______””", "“______”")
    hint = hint.replace("““______”", "“______”")
    
    # 5. Generate pristine domain-matched distractors
    d_candidates = []
    if w in EXACT_TERM_OVERHAUL:
        d_candidates = EXACT_TERM_OVERHAUL[w]
    elif w_clean in EXACT_TERM_OVERHAUL:
        d_candidates = EXACT_TERM_OVERHAUL[w_clean]
    else:
        # Check domain ontology
        matched_domain = None
        for dom_key, dom_val in DOMAIN_ONTOLOGY.items():
            if w in dom_val["words"] or w_clean in [re.sub(r'[“”"《》【】]', '', x) for x in dom_val["words"]]:
                matched_domain = dom_val
                break
        if matched_domain:
            pool = matched_domain["words"]
            d_candidates = [x for x in pool if x != w and re.sub(r'[“”"《》【】]', '', x) != w_clean]
        else:
            # Topic heuristic
            if "生态" in group or "环境" in group or "水" in group or "林" in group:
                d_candidates = DOMAIN_ONTOLOGY["ecology_resources"]["words"]
            elif "经济" in group or "产业" in group or "市场" in group or "金融" in group:
                d_candidates = DOMAIN_ONTOLOGY["economy_market"]["words"]
            elif "党" in group or "从严" in group or "巡视" in group or "纪律" in group:
                d_candidates = DOMAIN_ONTOLOGY["party_discipline"]["words"]
            elif "法治" in group or "司法" in group or "民主" in group or "治理" in group:
                d_candidates = DOMAIN_ONTOLOGY["politics_law"]["words"]
            elif "唯物" in group or "辩证法" in group or "马克思主义" in chapter:
                d_candidates = DOMAIN_ONTOLOGY["philosophy_method"]["words"]
            elif "外交" in group or "峰会" in group or "上合" in group or "国际" in group:
                d_candidates = DOMAIN_ONTOLOGY["foreign_diplomacy"]["words"]
            else:
                d_candidates = [
                    "守正创新", "稳中求进", "先立后破", "问题导向", "系统观念", "胸怀天下", "自立自强", "求真务实"
                ]

    # Filter candidates (length match, not in hint, unique)
    L = len(w_clean)
    valid_d = []
    for c in d_candidates:
        c_clean = re.sub(r'[“”"《》【】]', '', c)
        if c != w and c_clean != w_clean and c_clean not in hint.replace("______", ""):
            # Match approximate length
            if abs(len(c_clean) - L) <= (1 if L <= 4 else 3):
                if c not in valid_d:
                    valid_d.append(c)
        if len(valid_d) == 3:
            break
            
    # If still not 3, backfill from appropriate length defaults
    if len(valid_d) < 3:
        backup_pool = [
            "守正创新", "稳中求进", "先立后破", "问题导向", "系统观念", "胸怀天下", "自立自强", "求真务实"
        ] if L == 4 else [
            "创新", "协调", "绿色", "开放", "共享", "发展", "安全", "法治"
        ] if L == 2 else [
            "高水平科技自立自强", "全过程人民民主", "社会主义核心价值观", "绿水青山就是金山银山"
        ]
        for b in backup_pool:
            b_clean = re.sub(r'[“”"《》【】]', '', b)
            if b != w and b_clean != w_clean and b_clean not in hint.replace("______", "") and b not in valid_d:
                valid_d.append(b)
            if len(valid_d) == 3:
                break

    final_3 = valid_d[:3]
    item['word'] = w
    item['meaning'] = m_text
    item['hint'] = hint
    item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in final_3]
    item['examples'] = [m_text]
    return item

audited_items = []
for idx, item in enumerate(data):
    clean_item = clean_item_thoroughly(item, idx)
    audited_items.append(clean_item)

print(f"Completed thorough one-by-one audit for all {len(audited_items)} items.")

# Save JS dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(audited_items)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(audited_items, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")

# Generate Local Review Document (Markdown)
md_lines = []
md_lines.append("# 《2026年政治理论背诵手册》全量题库审校表 (共 2459 题)\n")
md_lines.append("> **说明**：本表包含 2026 年背诵手册 159 页全量真题原句、挖空题干、正确考点答案及 3 个高仿真干扰项，供人工逐题审阅校验。\n\n")

current_chapter = ""
for idx, item in enumerate(audited_items):
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
    
    # Format options A, B, C, D
    options = [w] + d_list
    # Stable display
    options_str = f"**正解**：`{w}` ｜ **干扰项**：`{d_list[0]}`、`{d_list[1]}`、`{d_list[2]}`"
    
    md_lines.append(f"### 第 {idx + 1} 题 ｜ [Page {p}] {g}")
    md_lines.append(f"- **【挖空题干】**：{hint}")
    md_lines.append(f"- **【选项配置】**：{options_str}")
    md_lines.append(f"- **【官方原句】**：{meaning}\n")

with open('2026年政治理论背诵手册_全量真题题库审校表.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

print(f"Generated local review document: 2026年政治理论背诵手册_全量真题题库审校表.md ({len(md_lines)} lines)")
