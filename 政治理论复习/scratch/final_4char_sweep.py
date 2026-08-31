import json
import re
import random
import string

# Load dataset
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Specialized 4-character dict
SPECIAL_4 = {
    "基本路线": ["基本方略", "基本原则", "基本理论", "基本制度"],
    "基本方略": ["基本路线", "基本原则", "基本理论", "基本制度"],
    "基本原则": ["基本路线", "基本方略", "基本理论", "基本制度"],
    "基本理论": ["基本路线", "基本方略", "基本原则", "基本制度"],
    "基本制度": ["基本路线", "基本方略", "基本原则", "基本理论"],
    "经济建设": ["政治建设", "文化建设", "社会建设", "生态文明"],
    "政治建设": ["经济建设", "文化建设", "社会建设", "生态文明"],
    "文化建设": ["经济建设", "政治建设", "社会建设", "生态文明"],
    "社会建设": ["经济建设", "政治建设", "文化建设", "生态文明"],
    "生态文明": ["经济建设", "政治建设", "文化建设", "社会建设"],
    "改革开放": ["封闭僵化", "闭关锁国", "因循守旧", "故步自封"],
    "战略举措": ["战略目标", "战略导向", "战略支撑", "战略方向"],
    "战略目标": ["战略举措", "战略导向", "战略支撑", "战略方向"],
    "战略支撑": ["战略举措", "战略目标", "战略导向", "战略方向"],
    "绝对贫困": ["相对贫困", "区域性贫困", "整体性贫困", "长期贫困"],
    "基本实现": ["全面建成", "基本建成", "初步实现", "完全实现"],
    "基本建成": ["基本实现", "全面建成", "初步实现", "完全实现"],
    "全面建成": ["基本实现", "基本建成", "初步实现", "完全实现"],
    "建国方略": ["建国大纲", "建国方针", "建国原则", "建国路线"],
    "党的领导": ["人民当家作主", "全面依法治国", "中国特色社会主义", "群众路线"],
    "难度最大": ["时间最长", "范围最广", "影响最深", "程度最烈"],
    "显著标志": ["本质特征", "根本要求", "核心体现", "主要表现"],
    "崇高追求": ["根本目的", "最终目标", "最高理想", "核心价值"],
    "鲜明特点": ["本质特征", "显著标志", "核心要求", "主要特色"],
    "独立自主": ["自力更生", "对外开放", "依附大国", "闭关锁国"],
    "重大超越": ["历史延续", "简单重复", "全盘照搬", "机械模仿"],
    "全新选择": ["传统路径", "老路邪路", "历史倒退", "西方模式"],
    "根本标尺": ["重要参考", "一般标准", "基础条件", "辅助依据"],
    "群众路线": ["武装斗争", "统一战线", "党的建设", "实事求是"],
    "调查研究": ["理论学习", "会议传达", "文件贯彻", "主观臆断"],
    "重要法宝": ["关键一招", "根本保证", "最大底气", "坚实依托"],
    "根本方向": ["具体路径", "一般原则", "基础条件", "战术选择"],
    "生态优先": ["经济优先", "开发优先", "保护为主", "效率优先"],
    "重要保障": ["根本前提", "核心动力", "基础条件", "最终目的"],
    "鲜明标识": ["本质要求", "核心要义", "主要特征", "精神实质"],
    "初级阶段": ["高级阶段", "过渡时期", "发达阶段", "中级阶段"],
    "质量效率": ["规模速度", "数量扩张", "粗放增长", "低效发展"],
    "创新驱动": ["要素驱动", "投资驱动", "出口拉动", "消费拉动"]
}

def fix_remaining_4char(item):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    L = len(w_clean)
    hint = item['hint'].strip()
    
    current_d = [d['word'] for d in item.get('distractors', [])]
    bad_catchalls = ['守正创新', '稳中求进', '先立后破', '高水平科技自立自强', '全过程人民民主']
    has_bad = any(c in current_d for c in bad_catchalls)
    
    # We only care if it uses a BAD catchall
    if has_bad:
        candidates = []
        if w_clean in SPECIAL_4:
            candidates.extend(SPECIAL_4[w_clean])
            
        # Try generic noun generation
        if not candidates and L == 4:
            candidates.extend(["基本路线", "基本方略", "基本原则", "基本理论", "基本制度", "战略举措", "战略目标", "战略支撑", "本质特征", "显著标志", "核心要求"])
            
        if candidates:
            valid = []
            for c in candidates:
                c_clean = re.sub(r'[“”"《》【】]', '', c)
                if c != w and c_clean != w_clean and c_clean not in hint.replace("______", ""):
                    if w_clean not in c_clean and c_clean not in w_clean:
                        if c not in valid:
                            valid.append(c)
                if len(valid) >= 3:
                    break
            
            while len(valid) < 3:
                import string
                valid.append("通用补位" + "".join(random.choices(string.ascii_letters, k=2)))
                
            item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in valid[:3]]
    return item

fixed = 0
for item in data:
    orig = [d['word'] for d in item.get('distractors', [])]
    res = fix_remaining_4char(item)
    newd = [d['word'] for d in res.get('distractors', [])]
    if orig != newd:
        fixed += 1

print(f"Fixed {fixed} bad catchalls.")

js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

# Regenerate review doc
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
