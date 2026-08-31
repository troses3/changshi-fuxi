import json
import re

# Comprehensive Master Thesaurus for Chaoge 27 and Chaoge 26
REFINED_DISTRACTORS = {
    # 四个伟大与相关表述（当题干已有其他三者时，必须使用同构四字伟大短语）
    "伟大梦想": ["伟大实践", "伟大探索", "伟大创造", "伟大征程"],
    "伟大工程": ["伟大实践", "伟大探索", "伟大创造", "伟大征程"],
    "伟大事业": ["伟大实践", "伟大探索", "伟大创造", "伟大征程"],
    "伟大斗争": ["伟大实践", "伟大探索", "伟大创造", "伟大征程"],
    "党的建设新的伟大工程": ["中国特色社会主义伟大实践", "具有许多新的历史特点的伟大探索", "中华民族伟大复兴的宏伟蓝图"],
    
    # 战略政策（坚决杜绝“封闭僵化/照抄照搬”等贬义词作为选项）
    "改革开放": ["创新驱动", "依法治国", "科教兴国", "对外开放"],
    "独立自主": ["自力更生", "实事求是", "对外开放", "求真务实"],
    "自力更生": ["独立自主", "艰苦奋斗", "改革创新", "求真务实"],
    "全新选择": ["崭新路径", "科学选择", "历史抉择", "战略抉择"],
    "重大超越": ["重大突破", "深刻变革", "历史跃升", "重大跨越"],
    
    # 生态方针与保护原则（杜绝贬义词和万能口号）
    "节约优先": ["预防为主", "综合治理", "生态优先", "统筹兼顾"],
    "保护优先": ["防范为主", "综合治理", "空间均衡", "生态优先"],
    "自然恢复为主": ["系统治理为主", "源头防控为主", "综合施策为主"],
    "保护第一": ["预防为主", "安全第一", "质量第一", "效益优先"],
    "合理利用": ["科学利用", "适度利用", "综合利用", "循环利用"],
    "最小干预": ["适度干预", "分类施策", "精准保护", "审慎干预"],
    "绿水青山就是金山银山": ["良好生态是最普惠民生", "人与自然是生命共同体", "山水林田湖草沙一体化"],
    "生态优先": ["效益优先", "统筹兼顾", "绿色发展", "安全第一"],
    
    # 政治地位词与帽子
    "显著标志": ["本质特征", "核心要求", "最大优势", "根本标志"],
    "最大优势": ["最本质特征", "最高原则", "根本保证", "坚实依托"],
    "最本质特征": ["最大优势", "最高原则", "根本保证", "核心要求"],
    "最本质的特征": ["最大政治优势", "最根本保证", "最高原则", "核心支柱"],
    "最大的政治优势、制度优势": ["最强大的发展动能", "最坚实的物质支撑", "最可靠的安全屏障", "最重要的制度基石"],
    "重中之重": ["头等大事", "第一要务", "战略总纲", "关键一招"],
    "战略总纲": ["根本方针", "首要原则", "重要抓手", "行动纲领"],
    "总抓手": ["总布局", "总纲领", "总方针", "突破口"],
    "着力点": ["突破口", "出发点", "落脚点", "切入点"],
    "第一位": ["根本性", "基础性", "关键性", "先导性"],
    "一以贯之的主题": ["根本战略导向", "主要衡量标准", "首要攻坚任务", "长期行动指南"],
    "治本之策": ["关键一招", "应急之举", "基础工作", "战略抓手"],
    "铁规矩、硬杠杠": ["重要抓手、基本原则", "第一要务、生命线", "根本指针、战略导向", "制度笼子、纪律底线"],
    
    # 党的建设与从严治党
    "政治建设": ["思想建设", "组织建设", "作风建设", "纪律建设"],
    "思想建设": ["政治建设", "组织建设", "作风建设", "纪律建设"],
    "组织建设": ["政治建设", "思想建设", "作风建设", "纪律建设"],
    "作风建设": ["政治建设", "思想建设", "纪律建设", "制度建设"],
    "纪律建设": ["政治建设", "思想建设", "作风建设", "组织建设"],
    "制度建设": ["文化建设", "队伍建设", "阵地建设", "能力建设"],
    "贯穿其中": ["放在首位", "作为基础", "作为统领", "作为抓手"],
    "自我革命": ["社会革命", "技术革命", "制度变革", "理论创新"],
    "最大毒瘤": ["主要矛盾", "致命短板", "最大隐患", "核心风险"],
    "反腐败": ["作风建设", "纪律审查", "巡视监督", "制度建设"],
    "最彻底的自我革命": ["最重要的政治任务", "最坚强的政治保证", "最有效的监督举措", "最深刻的自我净化"],
    "不敢腐": ["不能腐", "不想腐", "不愿腐"],
    "不能腐": ["不敢腐", "不想腐", "不愿腐"],
    "不想腐": ["不敢腐", "不能腐", "不愿腐"],
    "震慑": ["约束", "自觉", "引导"],
    "笼子": ["震慑", "自觉", "防线"],
    "自觉": ["震慑", "约束", "监督"],
    
    # 国家安全与强军目标
    "政治安全": ["经济安全", "军事安全", "文化安全", "社会安全"],
    "人民安全": ["政治安全", "经济安全", "社会安全", "生态安全"],
    "经济安全": ["政治安全", "人民安全", "科技安全", "金融安全"],
    "军事、科技、文化、社会安全": ["资源、生态、网络、核安全", "生物、太空、极地、深海安全", "金融、海外利益、粮食安全"],
    "听党指挥": ["能打胜仗", "作风优良", "政治建军", "纪律严明"],
    "能打胜仗": ["听党指挥", "作风优良", "科技强军", "英勇顽强"],
    "作风优良": ["听党指挥", "能打胜仗", "依法治军", "服务人民"],
    "政治建军": ["改革强军", "科技强军", "依法治军", "人才强军"],
    "改革强军": ["政治建军", "科技强军", "依法治军", "战略强军"],
    "科技强军": ["政治建军", "改革强军", "依法治军", "人才强军"],
    "依法治军": ["科技强军", "改革强军", "政治建军", "从严治军"],
    "核心战斗力": ["第一生产力", "战略支撑力", "首要保障力", "关键制胜力"],
    
    # 四大考验与四大危险（同构选项）
    "四大考验": ["四大危险", "三大攻坚战", "四项纪律"],
    "执政考验": ["内部管理考验", "社会治理考验", "意识形态考验", "外部环境考验"],
    "改革开放考验": ["对外交流考验", "市场经济考验", "社会治理考验", "深化转型考验"],
    "市场经济考验": ["资本运作考验", "金融风险考验", "外部环境考验", "产业竞争考验"],
    "外部环境考验": ["国际博弈考验", "风高浪急考验", "地缘政治考验", "全球治理考验"],
    "四大危险": ["四大考验", "三大攻坚战", "四项原则"],
    "精神懈怠危险": ["作风漂浮危险", "本领恐慌危险", "思想僵化危险", "能力不足危险"],
    "能力不足危险": ["精神懈怠危险", "本领恐慌危险", "思想僵化危险", "脱离群众危险"],
    "脱离群众危险": ["作风漂浮危险", "特权享受危险", "官僚主义危险", "消极腐败危险"],
    "消极腐败危险": ["特权享受危险", "作风不良危险", "精神懈怠危险", "思想蜕变危险"],
    
    # 其它高频词汇
    "民生保障": ["社会治理", "公共服务", "权益维护"],
    "就业": ["教育", "医疗", "住房"],
    "最基本的民生、最大的民生": ["最核心的福祉、最关键的保障", "最迫切的要求、最重要的任务", "最长远的战略、最根本的支撑"],
    "最公平的公共产品": ["最普惠的民生福祉", "最宝贵的物质财富", "最重要的发展条件"],
    "最普惠的民生福祉": ["最公平的公共产品", "最坚实的制度保障", "最直接的获得感"],
    "立党为公、执政为民": ["实事求是、与时俱进", "艰苦奋斗、戒骄戒躁", "清正廉洁、克己奉公"],
    "共建共治共享": ["共商共建共享", "自治法治德治", "统筹协调联动"],
    "社会治理制度": ["基层自治制度", "平安建设体系", "行政管理体制"]
}

# 1. Update chaogePoliticalTheory (src/data/political_theory_chaoge.js)
with open('src/data/political_theory_chaoge.js', 'r', encoding='utf-8') as f:
    content = f.read()

part1 = content.split('export const chaogeContrastItems')[0]
contrast_part = 'export const chaogeContrastItems' + content.split('export const chaogeContrastItems')[1]
m = re.search(r'export\s+const\s+chaogePoliticalTheory\s*=\s*(\[.*\]);', part1, re.DOTALL)
chaoge_data = json.loads(m.group(1))

def clean_item_distractors(item):
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    hint = item['hint'].strip()
    clean_hint = hint.replace("______", "")
    
    candidates = []
    if w in REFINED_DISTRACTORS:
        candidates.extend(REFINED_DISTRACTORS[w])
    elif w_clean in REFINED_DISTRACTORS:
        candidates.extend(REFINED_DISTRACTORS[w_clean])
    else:
        # Check current distractors
        for d in item.get('distractors', []):
            dw = d['word']
            if dw not in ["改革创新", "求真务实", "攻坚克难", "系统观念", "封闭僵化", "因循守旧", "照抄照搬", "老路邪路", "历史倒退", "过度商业化"]:
                candidates.append(dw)
                
    # Filter candidates
    valid = []
    for c in candidates:
        c_clean = re.sub(r'[“”"《》【】]', '', c)
        if c != w and c_clean != w_clean and c_clean not in clean_hint:
            if c not in valid:
                valid.append(c)
        if len(valid) == 3:
            break
            
    # Intelligent backup
    if len(valid) < 3:
        if "伟大" in w:
            b_pool = ["伟大实践", "伟大探索", "伟大创造", "伟大征程"]
        elif "安全" in w:
            b_pool = ["网络安全", "生态安全", "文化安全", "科技安全"]
        elif "建设" in w:
            b_pool = ["能力建设", "队伍建设", "阵地建设", "文化建设"]
        elif "危险" in w:
            b_pool = ["作风漂浮危险", "本领恐慌危险", "思想僵化危险", "特权享受危险"]
        elif "考验" in w:
            b_pool = ["社会治理考验", "意识形态考验", "内部管理考验", "网络舆论考验"]
        elif len(w_clean) == 4:
            b_pool = ["战略举措", "重要支柱", "制度保证", "发展动力", "本质要求", "主要标志"]
        else:
            b_pool = ["根本原则", "重要抓手", "基本路线", "战略支点"]
            
        for b in b_pool:
            b_clean = re.sub(r'[“”"《》【】]', '', b)
            if b != w and b_clean != w_clean and b_clean not in clean_hint and b not in valid:
                valid.append(b)
            if len(valid) == 3:
                break
                
    item['distractors'] = [{"word": dw, "meaning": f"【{dw}】", "hint": f"【{dw}】"} for dw in valid[:3]]
    return item

fixed_chaoge = []
for item in chaoge_data:
    fixed_chaoge.append(clean_item_distractors(item))

# Save back to src/data/political_theory_chaoge.js
js_code = f"// 超格(27) 核心精选全量多维挖空题库 (共 {len(fixed_chaoge)} 题)\n"
js_code += "export const chaogePoliticalTheory = " + json.dumps(fixed_chaoge, ensure_ascii=False, indent=2) + ";\n\n"
js_code += contrast_part

with open('src/data/political_theory_chaoge.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"Updated chaogePoliticalTheory ({len(fixed_chaoge)} items) with flawless distractors.")

# 2. Also update political_theory_chaoge_27.js (2459 items)
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content_27 = f.read()

m27 = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content_27, re.DOTALL)
data_27 = json.loads(m27.group(1))

fixed_27 = []
for item in data_27:
    fixed_27.append(clean_item_distractors(item))

js_code_27 = f"// 2026年政治理论背诵手册 159页全量 (共 {len(fixed_27)} 题)\n"
js_code_27 += "export const chaoge27PoliticalTheory = " + json.dumps(fixed_27, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_code_27)

print(f"Updated chaoge27PoliticalTheory ({len(fixed_27)} items) with flawless distractors.")

# 3. Regenerate markdown review table
md_lines = []
md_lines.append(f"# 《超格(27) 核心精选题库 · 多维挖空全量审校表》 (共 {len(fixed_chaoge)} 题)\n")
md_lines.append("> **说明**：基于 2027 核心 128 句官方母句进行全方位深度挖空，涵盖核心概念、政治定位词、主宾搭配、成套要素等全部真题考法，供人工逐题审阅。\n\n")

current_chapter = ""
for idx, item in enumerate(fixed_chaoge):
    chap = item.get('chapter', '未分类')
    if chap != current_chapter:
        current_chapter = chap
        md_lines.append(f"\n## 📖 {current_chapter}\n")
        
    g = item.get('group', '')
    w = item.get('word', '')
    hint = item.get('hint', '')
    d_list = [d['word'] for d in item.get('distractors', [])]
    meaning = item.get('meaning', '')
    
    options_str = f"**正解**：`{w}` ｜ **干扰项**：`{d_list[0]}`、`{d_list[1]}`、`{d_list[2]}`"
    
    md_lines.append(f"### 第 {idx + 1} 题 ｜ {g}")
    md_lines.append(f"- **【挖空题干】**：{hint}")
    md_lines.append(f"- **【选项配置】**：{options_str}")
    md_lines.append(f"- **【官方原句】**：{meaning}\n")

with open('超格27核心题库_多维挖空全量审校表.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

with open('political_theory_chaoge27_expanded_review.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(md_lines))

print("Regenerated all review tables successfully!")
