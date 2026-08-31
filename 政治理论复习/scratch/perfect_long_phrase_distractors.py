import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

LONG_PHRASE_OVERHAUL = {
    "全球规模最大、门类最齐全、体系最完整": [
        "高端要素最集聚、产业链条最完备、国际竞争力最强",
        "创新活力最充沛、技术积淀最深厚、协同效能最高效",
        "数字化水平最高、绿色转型最深入、安全韧性最稳固"
    ],
    "持续时间最长、规模最大、牺牲最多": [
        "动员范围最广、国际影响最深、战斗最为惨烈",
        "参与人数最多、战线最为漫长、付出代价最大",
        "组织最为严密、反抗最为顽强、影响最为深远"
    ],
    "全球规模最大": [
        "技术水平最高", "覆盖范围最广", "综合实力最强"
    ],
    "更为完善的制度保证、更为坚实的物质基础、更为主动的精神力量": [
        "更为成熟的理论体系、更为科学的战略部署、更为广泛的群众基础",
        "更为坚强的政治领导、更为优越的体制机制、更为深厚的文化底蕴",
        "更为强大的综合国力、更为先进的生产方式、更为深远的国际影响"
    ],
    "国内大循环为主体、国内国际双循环相互促进": [
        "国际大循环为主体、国内国际双循环相互促进",
        "外贸出口为主导、国内消费为基础",
        "内需拉动为主导、对外开放为辅助"
    ],
    "创新、协调、绿色、开放、共享": [
        "创新、统筹、生态、合作、共赢",
        "改革、协同、低碳、共赢、普惠",
        "协调、绿色、法治、富强、共享"
    ],
    "坚持人民至上、坚持自信自立、坚持守正创新、坚持问题导向、坚持系统观念、坚持胸怀天下": [
        "坚持党的领导、坚持人民民主、坚持依法治国、坚持科学执政、坚持民主执政、坚持依法执政",
        "坚持实事求是、坚持群众路线、坚持独立自主、坚持解放思想、坚持与时俱进、坚持求真务实",
        "坚持统一思想、坚持凝聚力量、坚持深化改革、坚持扩大开放、坚持从严治党、坚持强军兴军"
    ],
    "互信、互利、平等、协商、尊重多样文明、谋求共同发展": [
        "和平合作、开放包容、互学互鉴、互利共赢、共谋发展",
        "相互尊重、平等相待、和衷共济、包容互鉴、合作共赢",
        "和平共处、求同存异、团结互助、互利共赢、共同繁荣"
    ]
}

replaced = 0
for item in data:
    w = item['word'].strip()
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    
    if w in LONG_PHRASE_OVERHAUL:
        d_list = LONG_PHRASE_OVERHAUL[w]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_list]
        replaced += 1
    elif w_clean in LONG_PHRASE_OVERHAUL:
        d_list = LONG_PHRASE_OVERHAUL[w_clean]
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in d_list]
        replaced += 1

print(f"Polished {replaced} long phrases with master exam distractors.")

# Save dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(data)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
