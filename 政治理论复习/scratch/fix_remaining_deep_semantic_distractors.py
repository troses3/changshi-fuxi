import json
import re

SPECIALIZED_LONG_CLAUSES = {
    # 政治制度与民主
    "多党合作和政治协商制度、民族区域自治制度以及基层群众自治制度": [
        "人民代表大会制度、基层群众自治制度以及民族区域自治制度",
        "公有制为主体、多种所有制经济共同发展以及按劳分配为主体",
        "中国特色社会主义法律体系、行政执法体制以及司法体制"
    ],
    "人民代表大会制度这一根本政治制度，中国共产党领导的多党合作和政治协商制度、民族区域自治制度以及基层群众自治制度等基本政治制度": [
        "人民代表大会制度这一根本政治制度，以公有制为主体、多种所有制经济共同发展等基本经济制度",
        "以宪法为核心的中国特色社会主义法律体系，健全的权力运行制约和监督体系",
        "党委领导、政府负责、民主协商、社会协同、公众参与、法治保障的社会治理体制"
    ],
    "保障全面依法治国、实现国家各方面工作法治化": [
        "维护国家统一和各民族大团结、促进社会和谐稳定",
        "动员全体人民以国家主人翁地位投身社会主义建设",
        "坚持党的全面领导、保证党领导人民有效治理国家"
    ],
    "拥护祖国统一和致力于中华民族伟大复兴的爱国者": [
        "拥护宪法法律和致力于社会主义现代化建设的劳动者",
        "具有爱国情怀和致力于两岸和平发展的港澳台同胞",
        "投身创新创业和致力于经济社会发展的海内外建设者"
    ],
    "最根本的是坚持党的领导": [
        "最核心的是坚持人民当家作主",
        "最关键的是坚持全面依法治国",
        "最基础的是坚持民主集中制"
    ],
    "连续性、创新性、统一性、包容性、和平性": [
        "科学性、人民性、实践性、发展性、开放性",
        "民族性、时代性、阶级性、先进性、群众性",
        "政治性、思想性、权威性、指导性、规范性"
    ],
    "保护第一、合理利用和最小干预原则": [
        "节约优先、保护优先和自然恢复为主",
        "源头治理、系统治理和依法治理原则",
        "统筹兼顾、分类施策和重点突破原则"
    ],
    "最重要的不是看经济效益": [
        "最核心的不是看发展速度",
        "最首要的不是看规模体量",
        "最关键的不是看短期收益"
    ],
    "全面取消在就业地参保户籍限制": [
        "全面推行城乡居民医保省级统筹",
        "全面建立失业保险失业救助机制",
        "全面放宽跨区域社保转移接续条件"
    ],
    "树立发展是硬道理、安全也是硬道理的理念": [
        "坚持发展与安全并重、富国与强军统一的战略",
        "统筹外部安全和内部安全、传统安全和非传统安全",
        "树立共同、综合、合作、可持续的新安全观"
    ],
    "发展是基础、安全是前提，发展和安全是一体之两翼、驱动之双轮": [
        "安全是发展的前提、发展是安全的保障，两手抓、两手都要硬",
        "经济建设是中心、国防建设是支撑，统筹兼顾、协调推进",
        "深化改革是动力、保持稳定是基础，动态平衡、相辅相成"
    ],
    "维护国家主权、安全、发展利益，保持香港、澳门长期繁荣稳定": [
        "坚持“一国”原则和尊重“两制”差异，发挥祖国内地坚强后盾作用",
        "保障特区高度自治权和维护中央全面管治权有机统一",
        "深化内地与港澳互利合作，推进粤港澳大湾区高质量发展"
    ],
    "实现中华民族伟大复兴": [
        "推进人类命运共同体建设",
        "维护世界和平与共同发展",
        "建设社会主义现代化强国"
    ],
    "中国特色社会主义": [
        "中华优秀传统文化",
        "人类命运共同体理念",
        "科学社会主义基本原则"
    ],
    "新时代中国特色社会主义思想": [
        "毛泽东思想和邓小平理论",
        "科学发展观与和谐社会理论",
        "中国特色社会主义理论体系"
    ],
    "健全全面从严治党体系": [
        "完善党的自我革命制度规范体系",
        "强化党内法规制度执行力",
        "深化纪检监察体制机制改革"
    ],
    "全面依法治国": [
        "全面深化改革",
        "全面从严治党",
        "全面建设社会主义现代化国家"
    ]
}

def apply_long_clause_fixes(filename, export_var):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    part1 = content.split('export const chaogeContrastItems')[0]
    contrast_part = ('export const chaogeContrastItems' + content.split('export const chaogeContrastItems')[1]) if 'export const chaogeContrastItems' in content else ""
    
    m = re.search(rf'export\s+const\s+{export_var}\s*=\s*(\[.*\]);', part1, re.DOTALL)
    data = json.loads(m.group(1))

    fixed = 0
    for item in data:
        w = item['word'].strip()
        w_clean = re.sub(r'[“”"《》【】]', '', w)
        hint = item['hint'].strip()
        clean_hint = hint.replace("______", "")

        for target_key, candidate_list in SPECIALIZED_LONG_CLAUSES.items():
            if w == target_key or w_clean == target_key or target_key in w or target_key in w_clean:
                valid = [c for c in candidate_list if c != w and re.sub(r'[“”"《》【】]', '', c) != w_clean and re.sub(r'[“”"《》【】]', '', c) not in clean_hint]
                if len(valid) == 3:
                    item['distractors'] = [{"word": dw, "meaning": f"【{dw}】", "hint": f"【{dw}】"} for dw in valid]
                    fixed += 1
                    break

    print(f"{export_var}: Successfully applied {fixed} specialized long clause fixes.")

    js_code = f"// {export_var} 深度精修题库 (共 {len(data)} 题)\n"
    js_code += f"export const {export_var} = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
    if contrast_part:
        js_code += "\n" + contrast_part

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(js_code)

apply_long_clause_fixes('src/data/political_theory_chaoge.js', 'chaogePoliticalTheory')
apply_long_clause_fixes('src/data/political_theory_chaoge_27.js', 'chaoge27PoliticalTheory')

# Regenerate all review docs
def gen_review_doc(src_file, export_var, md_file, title):
    with open(src_file, 'r', encoding='utf-8') as f:
        content = f.read()
    part1 = content.split('export const chaogeContrastItems')[0]
    m = re.search(rf'export\s+const\s+{export_var}\s*=\s*(\[.*\]);', part1, re.DOTALL)
    data = json.loads(m.group(1))

    md_lines = [f"# 《{title}》 (共 {len(data)} 题)\n\n"]
    current_chapter = ""
    for idx, item in enumerate(data):
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

    with open(md_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(md_lines))
    print(f"Generated {md_file} successfully.")

gen_review_doc('src/data/political_theory_chaoge.js', 'chaogePoliticalTheory', '超格27核心题库_多维挖空全量审校表.md', '超格(27) 核心精选题库 · 多维挖空全量审校表')
gen_review_doc('src/data/political_theory_chaoge.js', 'chaogePoliticalTheory', 'political_theory_chaoge27_expanded_review.md', '超格(27) 核心精选题库 · 多维挖空全量审校表')
gen_review_doc('src/data/political_theory_chaoge_27.js', 'chaoge27PoliticalTheory', '2026年政治理论背诵手册_全量真题题库审校表.md', '2026年政治理论背诵手册_全量真题题库审校表')
gen_review_doc('src/data/political_theory_chaoge_27.js', 'chaoge27PoliticalTheory', 'political_theory_review_table.md', '2026年政治理论背诵手册_全量真题题库审校表')
