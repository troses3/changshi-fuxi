import json
import re

# Master Mapping of Complex Phrases and Semantic Categories
PRECISION_MAP = {
    # 复杂长句与宏观布局
    "经济建设、政治建设、文化建设、社会建设、生态文明建设五位一体": [
        "全面建设社会主义现代化国家、全面深化改革、全面依法治国、全面从严治党四个全面",
        "富强、民主、文明、和谐、美丽的社会主义现代化强国目标",
        "创新、协调、绿色、开放、共享的新发展理念五大维度"
    ],
    "更为完善的制度保证、更为坚实的物质基础、更为主动的精神力量": [
        "更为系统完备的制度体系、更为强大的综合国力、更为坚定的文化自信",
        "更为坚强的政治领导、更为扎实的经济支撑、更为充沛的创新动能",
        "更为高效的治理机制、更为繁荣的社会事业、更为稳固的安全屏障"
    ],
    "坚持和改善党的全面领导、坚持和完善中国特色社会主义制度": [
        "推进国家治理体系现代化、推进国家治理能力现代化",
        "发展全过程人民民主、保障人民当家作主",
        "全面推进依法治国、建设社会主义法治国家"
    ],
    "物质生活和精神生活都": [
        "经济发展和生态保护都",
        "城市建设和乡村发展都",
        "改革深化和对外开放都"
    ],
    "不是整齐划一的平均主义": [
        "不是同等程度的同步富裕",
        "不是劫富济贫的绝对平均",
        "不是同时同步的齐步走"
    ],
    "最高裁决者和最终评判者": [
        "直接推动者和主要受益者",
        "最广泛参与者和依靠力量",
        "最终决策者和法定监督者"
    ],
    "最显著的特征、最壮丽": [
        "最根本的动力、最鲜明",
        "最坚实的支撑、最广阔",
        "最核心的支柱、最深刻"
    ],
    "根本政治前提和制度基础": [
        "坚实物质基础和实践依托",
        "宝贵历史经验和理论准备",
        "强大精神动力和文化支撑"
    ],
    "最大确定性、最大底气": [
        "最根本保证、最坚实依托",
        "最核心支柱、最强大动力",
        "最可靠屏障、最深厚力量"
    ],

    # 辩证法与思想方法
    "客观规律性和主观能动性": [
        "矛盾普遍性和矛盾特殊性",
        "绝对真理性和相对真理性",
        "历史必然性和历史偶然性"
    ],
    "矛盾的普遍性和客观性": [
        "矛盾的同一性和斗争性",
        "认识的无限性和上升性",
        "规律的客观性和可知性"
    ],
    "战略的原则性和策略的灵活性": [
        "战略的坚定性和策略的机动性",
        "前瞻性思考和全局性谋划",
        "整体性推进和重点性突破"
    ],
    "理论品格和鲜明特征": [
        "核心内涵和本质要求",
        "战略目标和前进方向",
        "实践要求和根本保障"
    ],
    "历史唯物主义群众史观": [
        "辩证唯物主义认识论",
        "唯物辩证法普遍联系观",
        "社会基本矛盾运动规律"
    ],
    "变与不变、继承与发展": [
        "共性与个性、绝对与相对",
        "理论与实践、认识与行动",
        "整体与局部、当前与长远"
    ],
    "基本思想和工作方法": [
        "核心理念和实践要求",
        "根本宗旨和政治立场",
        "战略导向和政策举措"
    ],
    "辩证唯物主义普遍联系": [
        "唯物辩证法对立统一",
        "历史唯物主义基本矛盾",
        "辩证唯物主义认识发展"
    ],

    # 体制改革与治理能力
    "高水平社会主义市场经济体制": [
        "全国统一大市场体系",
        "现代化综合产业体系",
        "高标准自由贸易试验区体制"
    ],
    "党的领导水平和长期执政能力": [
        "国家治理效能和制度执行力",
        "宏观调控水平和综合国力",
        "政治领导力和思想引领力"
    ],
    "推进中国式现代化": [
        "建设社会主义现代化强国",
        "实现中华民族伟大复兴",
        "推进高水平对外开放"
    ],
    "全面建设社会主义现代化国家": [
        "全面推进中华民族伟大复兴",
        "全面建成社会主义现代化强国",
        "全面实现共同富裕宏伟目标"
    ],
    "中华优秀传统文化": [
        "革命文化",
        "社会主义先进文化",
        "中华文明智慧结晶"
    ],
    "中国特色社会主义制度": [
        "国家治理体系和治理能力",
        "社会主义基本经济制度",
        "全过程人民民主政治制度"
    ]
}

def repair_dataset(filename, export_var):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    part1 = content.split('export const chaogeContrastItems')[0]
    contrast_part = ('export const chaogeContrastItems' + content.split('export const chaogeContrastItems')[1]) if 'export const chaogeContrastItems' in content else ""
    
    m = re.search(rf'export\s+const\s+{export_var}\s*=\s*(\[.*\]);', part1, re.DOTALL)
    data = json.loads(m.group(1))

    repaired_count = 0
    for item in data:
        w = item['word'].strip()
        w_clean = re.sub(r'[“”"《》【】]', '', w)
        hint = item['hint'].strip()
        clean_hint = hint.replace("______", "")
        current_d = [d['word'].strip() for d in item.get('distractors', [])]
        
        # Check if needs repair
        needs_repair = False
        if any("选项未覆盖" in d for d in current_d):
            needs_repair = True
        if w in PRECISION_MAP or w_clean in PRECISION_MAP:
            needs_repair = True
        if "中华优秀传统文化" in w and any(d in ['现代化', '法治化', '规范化'] for d in current_d):
            needs_repair = True
        if "改革开放" in w and any(d in ['封闭僵化', '照抄照搬', '因循守旧'] for d in current_d):
            needs_repair = True
        if "伟大" in w and sum(1 for d in current_d if '伟大' in d) < 2:
            needs_repair = True
        if any(abs(len(w_clean) - len(re.sub(r'[“”"《》【】]', '', d))) >= 6 and len(w_clean) >= 8 for d in current_d):
            needs_repair = True

        if needs_repair:
            candidates = []
            if w in PRECISION_MAP:
                candidates.extend(PRECISION_MAP[w])
            elif w_clean in PRECISION_MAP:
                candidates.extend(PRECISION_MAP[w_clean])
            elif "伟大" in w:
                candidates.extend(["伟大实践", "伟大探索", "伟大创造", "伟大征程"])
            elif "改革开放" in w:
                candidates.extend(["创新驱动", "依法治国", "科教兴国", "对外开放"])
            elif len(w_clean) >= 12:
                # Find other long phrases in the same dataset
                long_peers = [re.sub(r'[“”"《》【】]', '', it['word']) for it in data if 8 <= len(re.sub(r'[“”"《》【】]', '', it['word'])) <= 20 and it['word'] != w]
                candidates.extend(long_peers)
            elif len(w_clean) >= 8:
                candidates.extend([
                    "全面建设社会主义现代化国家", "坚持和发展中国特色社会主义", "推进国家治理体系和治理能力现代化",
                    "以人民为中心的发展思想", "高水平科技自立自强", "社会主义核心价值观体系"
                ])
            else:
                candidates.extend(["战略举措", "重要支柱", "制度保证", "发展动力", "本质要求", "主要标志"])

            valid = []
            for c in candidates:
                c_clean = re.sub(r'[“”"《》【】]', '', c)
                if c != w and c_clean != w_clean and c_clean not in clean_hint:
                    if c not in valid:
                        valid.append(c)
                if len(valid) == 3:
                    break

            while len(valid) < 3:
                valid.append("战略支撑举措")

            item['distractors'] = [{"word": dw, "meaning": f"【{dw}】", "hint": f"【{dw}】"} for dw in valid[:3]]
            repaired_count += 1

    print(f"{export_var}: Repaired {repaired_count} items with precision distractors.")

    # Save back
    js_code = f"// {export_var} 深度精修题库 (共 {len(data)} 题)\n"
    js_code += f"export const {export_var} = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
    if contrast_part:
        js_code += "\n" + contrast_part

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(js_code)

repair_dataset('src/data/political_theory_chaoge.js', 'chaogePoliticalTheory')
repair_dataset('src/data/political_theory_chaoge_27.js', 'chaoge27PoliticalTheory')

# Regenerate both review documents
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
