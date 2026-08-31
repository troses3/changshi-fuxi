import json
import re

# Load dataset
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Specialized Generator for Quantitative, Temporal, Numeric, and Percentage targets
def generate_numeric_distractors(w, hint, meaning):
    w_clean = w.strip()
    
    # 1. Specific percentage phrases
    if "高于4%" in w_clean or "4%" in w_clean:
        if "高于" in w_clean:
            return ["低于4%", "高于3%", "高于5%"]
        elif "不低于" in w_clean:
            return ["不低于3%", "不低于5%", "不低于6%"]
        elif "%" in w_clean:
            num = re.search(r'([0-9]+)%', w_clean)
            if num:
                n = int(num.group(1))
                return [f"{n-10 if n > 15 else n-2}%", f"{n+10}%", f"{n+5}%"]
            return ["3%", "5%", "6%"]
            
    # 2. General percentages e.g. 70%, 90%, 50%
    if "%" in w_clean:
        num = re.search(r'([0-9]+)%', w_clean)
        if num:
            n = int(num.group(1))
            return [f"{max(10, n-20)}%", f"{min(95, n+10)}%", f"{max(5, n-10)}%"]
            
    # 3. Ratio / Fraction phrases e.g. 0到1, 1到N
    if "0到1" in w_clean:
        return ["1到10", "1到N", "0到100"]
    if "1到N" in w_clean:
        return ["0到1", "1到10", "0到N"]
        
    # 4. Years e.g. 2035年, 到2030年, 2025年
    if re.search(r'20[2-5][0-9]年', w_clean):
        y_match = re.search(r'20([2-5][0-9])', w_clean)
        y = int(y_match.group(1))
        prefix = "到" if "到" in w_clean else ""
        return [f"{prefix}2025年" if y != 25 else f"{prefix}2030年",
                f"{prefix}2030年" if y != 30 else f"{prefix}2035年",
                f"{prefix}2035年" if y != 35 else f"{prefix}2050年"]

    # 5. Full date e.g. 2025年1月1日, 2030年1月1日
    if "2025年1月1日" in w_clean:
        return ["2024年1月1日", "2026年1月1日", "2030年1月1日"]
    if "2030年1月1日" in w_clean:
        return ["2025年1月1日", "2028年1月1日", "2035年1月1日"]
    if "7月底前" in w_clean:
        return ["6月底前", "8月底前", "12月底前"]

    # 6. Age requirements e.g. 3周岁以下
    if "3周岁以下" in w_clean or "周岁" in w_clean:
        return ["1周岁以下", "2周岁以下", "6周岁以下"]
        
    # 7. Monetary amount e.g. 每年3600元
    if "3600元" in w_clean or "元" in w_clean:
        return ["每年1200元", "每年2400元", "每年4800元"]

    # 8. Time duration (Months / Years / Days / Hours)
    if "每四个月" in w_clean:
        return ["每二个月", "每三个月", "每六个月"]
    if "每二个月" in w_clean:
        return ["每一个月", "每三个月", "每四个月"]
    if "六个月" in w_clean:
        return ["三个月", "九个月", "一年"]
    if "二十年" in w_clean:
        return ["十五年", "十八年", "二十五年"]
    if "三十年" in w_clean or "30年" in w_clean:
        return ["十五年", "二十年", "五十年"] if "三十" in w_clean else ["15年", "20年", "50年"]
    if "14年" in w_clean:
        return ["8年", "10年", "12年"]
    if "24小时内" in w_clean:
        return ["12小时内", "48小时内", "72小时内"]
    if "1天半" in w_clean:
        return ["半天", "1天", "2天"]
    if "3年内" in w_clean:
        return ["1年内", "2年内", "5年内"]
    if "2年内" in w_clean:
        return ["1年内", "3年内", "5年内"]
    if "1年以上" in w_clean:
        return ["6个月以上", "2年以上", "3年以上"]
    if "3个月" in w_clean:
        return ["1个月", "6个月", "12个月"]
    if "最长为3个月" in w_clean:
        return ["最长为1个月", "最长为6个月", "最长为12个月"]
    if "不超过三年" in w_clean:
        return ["不超过一年", "不超过两年", "不超过五年"]
    if "不超过1小时" in w_clean:
        return ["不超过半小时", "不超过2小时", "不超过3小时"]
    if "一般不超过6个月" in w_clean:
        return ["一般不超过3个月", "一般不超过1年", "一般不超过2年"]
    if "一般不超过5000字" in w_clean:
        return ["一般不超过3000字", "一般不超过4000字", "一般不超过6000字"]
    if "一般不超过4000字" in w_clean:
        return ["一般不超过3000字", "一般不超过5000字", "一般不超过6000字"]
    if "每年不起过1次" in w_clean or "每年不超过1次" in w_clean:
        return ["每年不超过2次", "每年不超过3次", "每半年不超过1次"]
    if "3个以上" in w_clean:
        return ["2个以上", "5个以上", "10个以上"]
    if "至少开展1次" in w_clean:
        return ["至少开展2次", "至少开展3次", "每季度1次"]
    if "学前一年" in w_clean:
        return ["学前两年", "学前三年", "义务教育阶段"]
    if "持股比例5%以上" in w_clean:
        return ["持股比例3%以上", "持股比例10%以上", "持股比例20%以上"]
    if "低于成本" in w_clean:
        return ["高于成本", "等于成本", "按市场指导价"]
    if "市场形成价格" in w_clean:
        return ["政府统一定价", "行业协商定价", "成本加成定价"]
    if "千万工程" in w_clean:
        return ["百县千镇万村工程", "乡村振兴工程", "美丽乡村工程"]
    if "到2035年，现代化人民城市基本建成" in w_clean:
        return ["到2025年，现代化人民城市基本建成", "到2030年，现代化人民城市基本建成", "到本世纪中叶，现代化人民城市基本建成"]
    if "农业强国全面建成" in w_clean:
        return ["科技强国全面建成", "制造强国全面建成", "交通强国全面建成"]
    if "特别重大、重大、较大、一般4" in w_clean or "特别重大" in w_clean:
        return ["特大、重大、一般3级", "一级、二级、三级、四级", "严重、较重、轻微3级"]

    return None

fixed_numeric = 0
for item in data:
    w = item['word'].strip()
    hint = item['hint'].strip()
    meaning = item['meaning'].strip()
    
    num_d = generate_numeric_distractors(w, hint, meaning)
    if num_d:
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in num_d[:3]]
        fixed_numeric += 1

print(f"Fixed {fixed_numeric} numeric/temporal/quantitative items.")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

# Regenerate review markdown
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

print(f"Updated review documents cleanly for all {len(data)} items.")
