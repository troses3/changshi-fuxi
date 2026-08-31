import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Fine-grained contextual and ontological dictionary
FINE_GRAINED_MAP = {
    # 生态与自然保护地
    "国家公园": ["自然保护区", "自然公园", "风景名胜区"],
    "自然保护区": ["国家公园", "自然公园", "生态保护区"],
    "自然公园": ["国家公园", "自然保护区", "森林公园"],
    "生态保护红线": ["永久基本农田", "城镇开发边界", "水资源管控线"],
    "城镇开发边界": ["生态保护红线", "永久基本农田", "产业发展边界"],
    "永久基本农田": ["生态保护红线", "城镇开发边界", "林地保护红线"],
    
    # 思想倾向与态度
    "教条主义": ["经验主义", "形式主义", "实用主义"],
    "实用主义": ["教条主义", "虚无主义", "主观主义"],
    "虚无主义": ["教条主义", "实用主义", "相对主义"],
    "经验主义": ["教条主义", "主观主义", "形式主义"],
    "形式主义": ["官僚主义", "享乐主义", "奢靡之风"],
    "官僚主义": ["形式主义", "享乐主义", "奢靡之风"],
    "享乐主义": ["形式主义", "官僚主义", "奢靡之风"],
    "奢靡之风": ["形式主义", "官僚主义", "享乐主义"],
    "全盘接受": ["全盘西化", "盲目照搬", "生搬硬套"],
    "盲目照搬": ["全盘西化", "生搬硬套", "削足适履"],
    
    # 结合论与文化哲学隐喻
    "物理反应": ["机械相加", "要素堆砌", "表面拼贴"],
    "化学反应": ["生物进化", "质变升华", "形态重塑"],
    "彼此契合": ["互相成就", "各取所需", "单向融入"],
    "互相成就": ["彼此契合", "同频共振", "和合共生"],
    "旧邦新命": ["文明复兴", "历史自觉", "时代使命"],
    "道路根基": ["制度根基", "理论源泉", "实践依托"],
    "创新空间": ["发展空间", "话语空间", "制度空间"],
    "新的飞跃": ["根本转折", "重大突破", "深刻变革"],
    "最大法宝": ["最大优势", "最大底气", "根本遵循"],
    "最大优势": ["最大法宝", "最大底气", "根本保证"],
    "必由之路": ["关键一招", "本质要求", "重要抓手"],
    "精神特质": ["理论品格", "鲜明特征", "实践要求"],
    "理论品格": ["精神特质", "鲜明特征", "实践要求"],
    "实践要求": ["理论品格", "精神特质", "鲜明特征"],
    "境界格局": ["精神特质", "理论品格", "价值追求"],
    "价值追求": ["境界格局", "理论品格", "实践要求"],
    
    # 党的五大建设与制度建设
    "制度建设": ["政治建设", "思想建设", "作风建设"],
    "政治建设": ["思想建设", "组织建设", "作风建设"],
    "思想建设": ["政治建设", "组织建设", "作风建设"],
    "组织建设": ["政治建设", "思想建设", "作风建设"],
    "作风建设": ["政治建设", "思想建设", "组织建设"],
    "纪律建设": ["政治建设", "思想建设", "作风建设"],
    "自我革命": ["社会革命", "自我净化", "自我革新"],
    "社会革命": ["自我革命", "技术革命", "制度变革"],
    
    # 经济体制与市场
    "宏观调控": ["微观规制", "市场调节", "行政干预"],
    "要素市场": ["商品市场", "资本市场", "劳动力市场"],
    "全国统一大市场": ["区域分割市场", "地方保护市场", "要素单一市场"],
    "高水平社会主义市场经济体制": ["计划经济体制", "自由放任市场体制", "传统市场经济体制"],
    "有效市场": ["有为政府", "计划调节", "宏观调控"],
    "有为政府": ["有效市场", "全能政府", "监管机构"],
    "自立自强": ["开放包容", "自主创新", "独立自主"],
    "自主创新": ["引进吸收", "集成创新", "模仿借鉴"],
    
    # 现代产业体系与金融
    "科技金融": ["绿色金融", "普惠金融", "数字金融"],
    "绿色金融": ["科技金融", "普惠金融", "养老金融"],
    "普惠金融": ["科技金融", "绿色金融", "数字金融"],
    "养老金融": ["科技金融", "普惠金融", "数字金融"],
    "数字金融": ["科技金融", "绿色金融", "普惠金融"],
    "直接融资": ["间接融资", "股权融资", "债权融资"],
    "间接融资": ["直接融资", "银行信贷", "债务融资"],
    
    # 农业农村与粮食
    "粮食安全": ["能源安全", "产业安全", "生态安全"],
    "种业振兴": ["农机升级", "耕地保护", "水利建设"],
    "和美乡村": ["美丽城镇", "现代农业园区", "田园综合体"],
    "乡村全面振兴": ["新型城镇化", "城乡融合发展", "脱贫攻坚"],
    "农业强国": ["科技强国", "制造强国", "交通强国"],
    
    # 司法法治与安全
    "依宪治国": ["依法行政", "依规治党", "科学立法"],
    "依宪执政": ["依法行政", "依法执政", "从严治党"],
    "审判权和执行权分离": ["立法权和行政权分离", "侦查权和公诉权分离", "决策权和监督权分离"],
    "事前预防": ["事后处置", "事中监管", "应急响应"],
    "全链条监管": ["分段式监管", "事后惩戒", "被动式响应"],
    "穿透式监管": ["清单式监管", "多头式监管", "形式化检查"],
    
    # 国际外交与涉外
    "平等有序": ["普惠包容", "合作共赢", "开放包容"],
    "普惠包容": ["平等有序", "合作共赢", "开放包容"],
    "全球治理倡议": ["全球发展倡议", "全球安全倡议", "全球文明倡议"],
    "全球发展倡议": ["全球安全倡议", "全球文明倡议", "全球治理倡议"],
    "全球安全倡议": ["全球发展倡议", "全球文明倡议", "全球治理倡议"],
    "全球文明倡议": ["全球发展倡议", "全球安全倡议", "全球治理倡议"],
    
    # 考核与评价机制
    "以信任为基础的人才使用机制": ["以考核为核心的人才评价机制", "以竞争为导向的人才选拔机制", "以项目为载体的人才激励机制"],
    "唯论文、唯帽子、唯职称、唯学历、唯奖项": ["重实践、重实绩、重贡献、重成果", "立德树人、潜心育人、服务社会", "分类评价、代表作制、多元考核"]
}

# Universal Semantic Field Generator based on context and grammar
def generate_context_aware_distractors(item):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    m_text = item['meaning'].strip()
    hint = item['hint'].strip()
    group = item.get('group', '')
    chapter = item.get('chapter', '')
    
    # 1. Exact match
    if w in FINE_GRAINED_MAP:
        return [c for c in FINE_GRAINED_MAP[w] if c not in hint.replace("______", "")][:3]
    if w_clean in FINE_GRAINED_MAP:
        return [c for c in FINE_GRAINED_MAP[w_clean] if c not in hint.replace("______", "")][:3]
        
    # 2. Check if it's a strategic position word
    if any(k in w for k in ["根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "根本原则", "根本制度", "基本方略", "战略举措", "战略任务", "战略支撑", "首要任务"]):
        candidates = ["根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "战略举措", "首要任务", "基本方略"]
        valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
        return valid[:3]
        
    # 3. Check if it's an economic / reform phrase (4 chars)
    if "经济" in group or "市场" in group or "金融" in group or "产业" in group:
        candidates = ["高质量发展", "新质生产力", "供给侧改革", "深化体制改革", "扩大有效需求", "现代化产业体系", "创新驱动发展"]
        valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
        return valid[:3]

    # 4. Check if it's Party Building / Discipline (4 chars)
    if "党" in group or "政治" in group or "从严" in group or "巡视" in group:
        candidates = ["思想建党", "制度治党", "依规治党", "自我革命", "政治引领", "正风肃纪", "从严治党"]
        valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
        return valid[:3]

    # 5. Check if it's Law / Governance (4 chars)
    if "法治" in group or "司法" in group or "治理" in group:
        candidates = ["依法治国", "依法执政", "依法行政", "公正司法", "全民守法", "依宪治国", "依宪执政"]
        valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
        return valid[:3]

    # 6. Check if it's Ecology / Green (4 chars)
    if "生态" in group or "绿色" in group or "碳" in group:
        candidates = ["绿水青山", "绿色低碳", "减污降碳", "生态红线", "清洁低碳", "协同增效"]
        valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
        return valid[:3]

    # 7. Check if it's Philosophy (4 chars)
    if "唯物" in group or "辩证法" in group or "马克思主义" in chapter:
        candidates = ["对立统一", "质量互变", "否定之否定", "唯物史观", "实事求是", "认识与实践"]
        valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
        return valid[:3]

    # 8. High-standard 4-character principle default
    candidates = ["守正创新", "稳中求进", "先立后破", "问题导向", "系统观念", "胸怀天下", "自立自强", "求真务实"]
    valid = [c for c in candidates if c != w and c != w_clean and c not in hint.replace("______", "")]
    return valid[:3]

fixed_count = 0
for item in data:
    d_words = [d['word'] for d in item['distractors']]
    # If item has generic fallback but is NOT a strategic position concept
    if ('根本保证' in d_words or '根本目的' in d_words or '根本动力' in d_words) and not any(k in item['word'] for k in ['根本', '保证', '目的', '动力', '途径', '原则', '举措', '任务', '支撑']):
        new_d = generate_context_aware_distractors(item)
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in new_d]
        fixed_count += 1
    # Also check if word itself is in FINE_GRAINED_MAP
    elif item['word'] in FINE_GRAINED_MAP or re.sub(r'[“”"《》【】]', '', item['word']) in FINE_GRAINED_MAP:
        new_d = generate_context_aware_distractors(item)
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in new_d]
        fixed_count += 1

print(f"Fixed and contextually regenerated {fixed_count} items with authentic exam distractors.")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
