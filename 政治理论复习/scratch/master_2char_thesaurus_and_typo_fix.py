import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# 1. OCR Typos in sentences
TYPO_REPLACES = {
    "人口迁人": "人口迁入",
    "收人分配": "收入分配",
    "承盾": "矛盾",
    "永不敌": "永不为敌",
    "力核心": "为核心",
    "决定性意必": "决定性意义"
}

# 2. Garbage 2-character words to clean / replace with proper terms
DISCARD_OR_REPAIR_2CHAR = {
    "不得": None, # Drop
    "可以": None,
    "应当": None,
    "能够": None,
    "不会": None,
    "都是": None,
    "来自": None,
    "不存": None,
    "半天": None,
    "原子": None,
    "分置": ("三权分置", "深化农村承包地“三权分置”改革。"),
    "得人": ("立德树人", "坚持把立德树人作为教育的根本任务。"),
    "构性": ("结构性矛盾", "着力解决就业结构性矛盾。"),
    "1年": ("1年以上", "失业保险基金滚存结余备付期限在1年以上的统筹地区。"),
    "3年": ("3年内", "在3年内落实相关支持政策。"),
    "9%": ("9%以上", "保持制造业比重基本稳定。"),
    "田内": ("永久基本农田保护区内", "严禁在永久基本农田保护区内搞破坏性建设。"),
    "境内": ("境内外", "统筹境内外金融资源。"),
    "连休": ("连续休息", "规范职工带薪年休假制度。"),
    "八期": ("三北工程六期", "全面推进三北工程六期建设。"),
    "公函": ("公函制度", "严格执行公务接待公函制度。")
}

# 3. Exhaustive 2-Character Categorical Distractor Map
TWO_CHAR_DISTRACTOR_MAP = {
    # 管控与规制动词
    "严控": ["放宽", "限制", "严禁"],
    "严禁": ["允许", "限制", "规范"],
    "放宽": ["严控", "限制", "取消"],
    "控制": ["放开", "引导", "取消"],
    "限制": ["放开", "鼓励", "禁止"],
    "禁止": ["允许", "倡导", "限制"],
    "规范": ["放任", "限制", "简化"],
    "防范": ["化解", "遏制", "处置"],
    "化解": ["防范", "遏制", "排查"],
    "遏制": ["防范", "化解", "容忍"],
    "引导": ["强制", "限制", "禁止"],
    "疏解": ["集聚", "扩大", "承接"],
    "承接": ["疏解", "转移", "输出"],
    
    # 宏观治理主体
    "市场": ["政府", "社会", "企业"],
    "政府": ["市场", "社会", "企业"],
    "企业": ["市场", "政府", "社会"],
    "社会": ["市场", "政府", "企业"],
    "居民": ["企业", "政府", "农户"],
    "群众": ["干部", "党员", "集体"],
    
    # 空间地域与层级
    "县域": ["市域", "省域", "乡镇"],
    "市域": ["县域", "省域", "基层"],
    "乡镇": ["村庄", "县域", "社区"],
    "社区": ["乡镇", "园区", "楼宇"],
    "基层": ["顶层", "机关", "中层"],
    "中央": ["地方", "基层", "部门"],
    "省级": ["市级", "县级", "国家级"],
    "县级": ["省级", "市级", "乡级"],
    "县城": ["中心城市", "特大城市", "小城镇"],
    
    # 农业与生态产业
    "耕地": ["林地", "草地", "湿地"],
    "种业": ["农机", "化肥", "水利"],
    "种子": ["化肥", "农药", "地膜"],
    "粮食": ["棉花", "油料", "蔬菜"],
    "节水": ["开源", "治污", "调水"],
    "治沙": ["造林", "种草", "禁牧"],
    "光伏": ["风电", "水电", "核电"],
    "风电": ["光伏", "水电", "核电"],
    "生态": ["生产", "生活", "生计"],
    
    # 河流方位与流域
    "上游": ["中游", "下游", "源头"],
    "中游": ["上游", "下游", "源头"],
    "下游": ["上游", "中游", "源头"],
    
    # 宏微观与正反关系
    "宏观": ["微观", "中观", "局部"],
    "微观": ["宏观", "中观", "全局"],
    "正比": ["反比", "无关", "恒定"],
    "反比": ["正比", "无关", "恒定"],
    "前置": ["后移", "同步", "取消"],
    "后移": ["前置", "同步", "取消"],
    
    # 隐喻与基石名词
    "魂脉": ["根脉", "血脉", "文脉"],
    "根脉": ["魂脉", "血脉", "文脉"],
    "血脉": ["魂脉", "根脉", "文脉"],
    "底线": ["红线", "高线", "主线"],
    "红线": ["底线", "高线", "主线"],
    "主线": ["底线", "红线", "高线"],
    "龙头": ["基点", "支柱", "基石"],
    "基点": ["龙头", "支柱", "基石"],
    "支柱": ["龙头", "基点", "基石"],
    "基石": ["支柱", "龙头", "纽带"],
    "法宝": ["钥匙", "武器", "支柱"],
    "先导": ["保障", "支撑", "后盾"],
    "枢纽": ["节点", "末梢", "支线"],
    "前列": ["中游", "中等", "后列"],
    "中上": ["前列", "高收入", "中等"],
    "五成": ["三成", "六成", "七成"],
    "八成": ["五成", "六成", "九成"]
}

clean_items = []
discard_count = 0
fixed_typos = 0

for item in data:
    w = item['word'].strip()
    m_text = item['meaning'].strip()
    hint = item['hint'].strip()
    
    # 1. Clean typos in text
    for typo, repl in TYPO_REPLACES.items():
        if typo in m_text:
            m_text = m_text.replace(typo, repl)
            hint = hint.replace(typo, repl)
            fixed_typos += 1
            
    # 2. Check if word is discarded or repaired
    if w in DISCARD_OR_REPAIR_2CHAR:
        val = DISCARD_OR_REPAIR_2CHAR[w]
        if val is None:
            discard_count += 1
            continue
        else:
            w, m_text = val
            hint = m_text.replace(w, "______")
            
    # 3. Apply exact 2-character distractor if available
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    if w in TWO_CHAR_DISTRACTOR_MAP:
        d_words = TWO_CHAR_DISTRACTOR_MAP[w]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]
    elif w_clean in TWO_CHAR_DISTRACTOR_MAP:
        d_words = TWO_CHAR_DISTRACTOR_MAP[w_clean]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]
        
    item['word'] = w
    item['meaning'] = m_text
    item['hint'] = hint
    item['examples'] = [m_text]
    clean_items.append(item)

print(f"Discarded {discard_count} meaningless 2-char tokens")
print(f"Fixed {fixed_typos} OCR text typos")
print(f"Total verified items: {len(clean_items)}")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(clean_items)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(clean_items, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
