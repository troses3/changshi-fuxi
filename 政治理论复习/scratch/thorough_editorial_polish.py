import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# 1. Clean Group Titles
GROUP_MAP = {
    "农领域重要文件": "农业农村领域重要文件",
    "在庆祝中华全国总工会成立100周年暨全国劳动模范和先进工作者表": "在庆祝中华全国总工会成立100周年大会上的讲话",
    "对关系": "正确处理推进中国式现代化的重大关系",
    "届三中《中共中央关于进一步全面深化改革、推进中国式现代化": "二十届三中全会《决定》重大部署",
    "年上海合作组织峰会讲话（2025.9）": "2025年上海合作组织峰会重要讲话",
    "年全国两会下团组讲话（2025.3）": "2025年全国两会下团组重要讲话",
    "深刻领悟“两个确立”的决定性意必": "深刻领悟“两个确立”的决定性意义",
    "统筹推进“五位一体”总体布局和协调推进“四个全面” 战略布局": "统筹推进“五位一体”和协调推进“四个全面”"
}

# 2. Comprehensive Exam-Grade Distractor Rules
EXACT_DISTRACTOR_MAP = {
    "上海精神": ["丝路精神", "金砖精神", "万隆精神"],
    "“上海精神”": ["“丝路精神”", "“金砖精神”", "“万隆精神”"],
    "决策之前和决策实施之中": ["决策制定和决策执行全过程", "事前预防和事后监督全流程", "调查研究与征求意见全周期"],
    "决策之前和决策实施中": ["决策制定和决策执行全过程", "事前预防和事后监督全流程", "调查研究与征求意见全周期"],
    "同一性": ["斗争性", "客观性", "普遍性"],
    "斗争性": ["同一性", "绝对性", "相对性"],
    "普遍性": ["特殊性", "客观性", "条件性"],
    "特殊性": ["普遍性", "客观性", "条件性"],
    "初次分配": ["再分配", "第三次分配", "转移支付"],
    "再分配": ["初次分配", "第三次分配", "转移支付"],
    "第三次分配": ["初次分配", "再分配", "转移支付"],
    "对标对表": ["自查自纠", "动真碰硬", "标本兼治"],
    "同城化": ["一体化", "协同化", "同质化"],
    "向海图强": ["向绿而行", "陆海统筹", "向新而兴"],
    "全盘接受": ["全盘西化", "盲目照搬", "生搬硬套"],
    "创造更高效率": ["维护社会公平", "实现共同富裕", "促进全面发展"],
    "维护社会公平": ["创造更高效率", "实现共同富裕", "促进全面发展"],
    "新质生产力": ["传统生产力", "先进生产力", "高质量发展"],
    "高质量发展": ["高速增长", "规模扩张", "新质生产力"],
    "碳达峰": ["碳中和", "碳达标", "碳排放"],
    "碳中和": ["碳达峰", "零排放", "负排放"],
    "碳冲锋": ["大跃进", "一阵风", "一刀切"],
    "运动式减碳": ["粗暴式关停", "形式化达标", "机械化关停"],
    "差别化": ["精细化", "规范化", "动态化"],
    "稳中求进、逐步实现": ["急功近利、大干快上", "一刀切断、全面叫停", "放任自流、顺其自然"],
    "战略举措": ["根本保证", "根本目的", "根本动力"],
    "根本保证": ["根本途径", "根本目的", "根本动力"],
    "根本目的": ["根本保证", "根本动力", "根本途径"],
    "根本动力": ["根本目的", "根本保证", "根本途径"],
    "根本遵循": ["行动指南", "基本原则", "根本方向"],
    "“十个明确”": ["“十四个坚持”", "“十三个方面成就”", "“六个必须坚持”"],
    "“十四个坚持”": ["“十个明确”", "“十三个方面成就”", "“六个必须坚持”"],
    "“六个必须坚持”": ["“十个明确”", "“十四个坚持”", "“十三个方面成就”"],
    "“两个确立”": ["“两个维护”", "“四个意识”", "“四个自信”"],
    "“两个维护”": ["“两个确立”", "“四个意识”", "“四个自信”"],
    "“四个意识”": ["“四个自信”", "“两个维护”", "“两个确立”"],
    "“四个自信”": ["“四个意识”", "“两个维护”", "“两个确立”"],
    "“两个结合”": ["“两个确立”", "“两个维护”", "“十个明确”"],
    "魂脉": ["根脉", "血脉", "文脉"],
    "根脉": ["魂脉", "血脉", "文脉"],
    "市域": ["县域", "省域", "乡镇"],
    "城乡社区": ["基层网格", "街道园区", "乡镇街道"]
}

# Clean leading section indices from sentence
def clean_sentence_leading_indices(text):
    if not text:
        return ""
    # Strip (1), (2), ①, ②, —聚焦, etc.
    text = re.sub(r'^(（[0-9一二三四五六七八九十]+）|[①②③④⑤⑥⑦⑧⑨⑩]|—聚焦|[0-9]+\.|\([0-9]+\))\s*', '', text)
    # Strip repetitive section titles e.g. "健全协商民主机制健全协商于"
    text = re.sub(r'^健全协商民主机制\s*', '', text)
    text = re.sub(r'^（一）所有制：坚持“两个毫不动摇”\s*', '', text)
    return text.strip()

polished_count = 0
for item in data:
    # 1. Clean group title
    g = item.get('group', '')
    if g in GROUP_MAP:
        item['group'] = GROUP_MAP[g]
    elif any(g.startswith(k) for k in GROUP_MAP):
        for k, v in GROUP_MAP.items():
            if g.startswith(k):
                item['group'] = v
                break
                
    # 2. Clean meaning and hint
    old_meaning = item['meaning']
    clean_meaning = clean_sentence_leading_indices(old_meaning)
    item['meaning'] = clean_meaning
    
    # Rebuild hint based on clean meaning
    w = item['word']
    if w in clean_meaning:
        item['hint'] = clean_meaning.replace(w, "______")
    elif re.sub(r'[“”"《》【】]', '', w) in clean_meaning:
        clean_w = re.sub(r'[“”"《》【】]', '', w)
        item['hint'] = clean_meaning.replace(clean_w, "______")
    else:
        item['hint'] = clean_meaning + "（考点：______）"
        
    item['examples'] = [clean_meaning]
    
    # 3. Check exact distractor map
    if w in EXACT_DISTRACTOR_MAP:
        d_words = EXACT_DISTRACTOR_MAP[w]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]
        polished_count += 1
    elif re.sub(r'[“”"《》【】]', '', w) in EXACT_DISTRACTOR_MAP:
        clean_w = re.sub(r'[“”"《》【】]', '', w)
        d_words = EXACT_DISTRACTOR_MAP[clean_w]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_words]
        polished_count += 1

print(f"Polished {polished_count} items with exact exam distractors")

# Save updated dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved successfully to src/data/political_theory_chaoge_27.js")
