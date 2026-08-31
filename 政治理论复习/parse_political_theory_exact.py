import os
import sys
import re
import json
import random

SOURCE_FILE = "/Volumes/Seagate Expansion Drive/00考公/【01】2027花生/【王君涛】政治理论/背诵清单/【四海】政治理论背诵清单汇总版（7.20更正）.txt"
OUTPUT_DIR = "/Users/gougou/学习/Antigravity/考公/政治理论复习/src/data"

LIST_META = {
    1: {'group': '【清单1】十五五规划（上）', 'subcategory': '十五五战略导向与经济体系', 'chapter': '第一章 十五五规划专题'},
    2: {'group': '【清单2】十五五规划（下）', 'subcategory': '农业农村与民生安全保障', 'chapter': '第一章 十五五规划专题'},
    3: {'group': '【清单3】马原（上）· 唯物论', 'subcategory': '物质运动与意识能动性', 'chapter': '第二章 马克思主义基本原理'},
    4: {'group': '【清单4】马原（中）· 辩证法', 'subcategory': '三大规律与六大思维能力', 'chapter': '第二章 马克思主义基本原理'},
    5: {'group': '【清单5】马原（下）· 唯物史观', 'subcategory': '认识论与社会基本矛盾', 'chapter': '第二章 马克思主义基本原理'},
    6: {'group': '【清单6】马政经与新思想', 'subcategory': '商品价值论与十个明确', 'chapter': '第二章 马克思主义基本原理'},
    7: {'group': '【清单7】创新理论 2 · 方略与成就', 'subcategory': '14个治国方略与13个成就', 'chapter': '第三章 习近平新时代思想'},
    8: {'group': '【清单8】创新理论 3 · 全面从严治党', 'subcategory': '党建思想与监督执纪四种形态', 'chapter': '第三章 习近平新时代思想'},
    9: {'group': '【清单9】创新理论 4 · 法治思想', 'subcategory': '习近平法治思想核心要义', 'chapter': '第三章 习近平新时代思想'},
    10: {'group': '【清单10】创新理论 5 · 文化与人大', 'subcategory': '文化使命与全过程人民民主', 'chapter': '第三章 习近平新时代思想'},
    11: {'group': '【清单11】创新理论 6 · 改革与强军', 'subcategory': '全面深化改革与强军思想', 'chapter': '第三章 习近平新时代思想'},
    12: {'group': '【清单12】创新理论 7 · 国家安全观', 'subcategory': '总体国家安全观核心内涵', 'chapter': '第三章 习近平新时代思想'},
    13: {'group': '【清单13】方针政策 2 · 稳中求进', 'subcategory': '高质量发展与现代化产业体系', 'chapter': '第四章 最新重要方针政策'},
    14: {'group': '【清单14】方针政策 3 · 科技强国', 'subcategory': '高水平科技自立自强战略', 'chapter': '第四章 最新重要方针政策'},
    15: {'group': '【清单15】方针政策 4 · 农业强国', 'subcategory': '高标准农田与乡村全面振兴', 'chapter': '第四章 最新重要方针政策'},
    16: {'group': '【清单16】方针政策 5 · 民生保障', 'subcategory': '基本公共服务与社会治理', 'chapter': '第四章 最新重要方针政策'},
    17: {'group': '【清单17】方针政策 6 · 大国外交', 'subcategory': '人类命运共同体与全球倡议', 'chapter': '第四章 最新重要方针政策'},
    18: {'group': '【清单18】方针政策 7 · 网络生态', 'subcategory': '网络生态治理与意识形态安全', 'chapter': '第四章 最新重要方针政策'},
    19: {'group': '【清单19】方针政策 8 · 指示批示', 'subcategory': '最新重要指示批示精要', 'chapter': '第四章 最新重要方针政策'},
    20: {'group': '【清单20】方针政策 9 · 政绩观', 'subcategory': '树立和践行正确政绩观', 'chapter': '第四章 最新重要方针政策'},
    21: {'group': '【清单21】方针政策 10 · 调研考察', 'subcategory': '地方考察调研与党建14个坚持', 'chapter': '第五章 2026新法典与时政考察'},
    22: {'group': '【清单22】方针政策 11 · 最新法典', 'subcategory': '生态环境法典与民营经济促进法', 'chapter': '第五章 2026新法典与时政考察'}
}

DOMAIN_TERMS = {
    '根本系列': [
        ('根本指导思想', '马克思主义是我们立党立国、兴党兴国的根本指导思想'),
        ('根本保证', '坚持和加强党的全面领导是推进中国式现代化的根本保证'),
        ('根本动力', '改革创新是推动高质量发展和中国式现代化的根本动力'),
        ('根本目的', '满足人民日益增长的美好生活需要，增进民生福祉'),
        ('根本领导制度', '党的领导制度是我国的根本领导制度'),
        ('根本工作路线', '群众路线是无产阶级政党的根本工作路线和生命线')
    ],
    '马原哲学': [
        ('客观实在性', '物质的唯一特性，标志客观实在的哲学范畴'),
        ('运动', '物质的根本属性和存在方式，是绝对的、无条件的'),
        ('主要矛盾', '在矛盾体系中处于支配地位，决定事物的发展方向'),
        ('矛盾的主要方面', '在矛盾统一体中起主导作用，决定事物的性质'),
        ('实践', '人类能动地改造世界的客观物质活动，是认识的来源和目的'),
        ('社会存在', '社会生活的物质方面，决定社会意识'),
        ('社会意识', '社会生活的精神方面，具有相对独立性'),
        ('生产力', '人类改造自然的物质力量，社会进步的最高标准'),
        ('生产关系', '物质资料生产过程中形成的人与人之间的社会关系')
    ],
    '四种形态': [
        ('常态', '“红红脸、出出汗”成为监督执纪的常态'),
        ('大多数', '党纪轻处分、组织调整成为违纪处理的大多数'),
        ('少数', '党纪重处分、重大职务调整成为极少数之前的少数处理'),
        ('极少数', '严重违纪涉嫌犯罪追究刑事责任的成为极少数')
    ],
    '分配与经济': [
        ('初次分配', '提高劳动报酬比重，各类要素由市场评价贡献按贡献决定报酬'),
        ('再分配', '加强税收、社会保障、转移支付等再分配调节'),
        ('第三次分配', '引导、支持有意愿有能力的企业和社会群体积极参与公益慈善'),
        ('橄榄型', '形成中等收入群体持续扩大、两头小中间大的合理分配格局'),
        ('实体经济', '坚持把发展经济的着力点放在实体经济上'),
        ('首要任务', '高质量发展是全面建设社会主义现代化国家的首要任务'),
        ('鲜明主题', '推动高质量发展是我国经济发展的鲜明主题')
    ],
    '法典与法规': [
        ('非禁即入', '市场准入负面清单以外领域，各类经济组织皆可依法平等进入'),
        ('无过错责任', '实施破坏生态环境行为造成损害的，不论有无过错均应承担民事责任'),
        ('民事责任', '责任竞合且财产不足以支付时，优先承担民事责任'),
        ('依法治国', '坚持依法治国首先要坚持依宪治国，坚持依法执政首先要依宪执政')
    ]
}

def clean_text(raw_text):
    text = re.sub(r'关注“花生十三”公众号[^\n]*', '', raw_text)
    text = re.sub(r'第\s*\d+\s*页', '', text)
    text = text.replace('\x0c', '\n')
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text

def normalize_line(s):
    s = re.sub(r'([^\n。；？！：\d])\n([^\n。；？！：\d\s（(])', r'\1\2', s)
    s = re.sub(r'[ \t]+', ' ', s)
    return s.strip()

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: Source file {SOURCE_FILE} not found!")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with open(SOURCE_FILE, 'r', encoding='utf-8', errors='ignore') as f:
        raw_text = f.read()

    text = clean_text(raw_text)
    section_pattern = r'(政治理论[^\n]*清单\s*\d+[^\n]*)'
    parts = re.split(section_pattern, text)

    all_entries = []
    
    for i in range(1, len(parts), 2):
        header = parts[i].strip()
        body = parts[i+1].strip() if i+1 < len(parts) else ''

        num_match = re.search(r'清单\s*(\d+)', header)
        list_num = int(num_match.group(1)) if num_match else (i // 2 + 1)
        
        meta = LIST_META.get(list_num, {
            'group': f'【清单{list_num}】政治理论考点',
            'subcategory': '方针政策与理论要点',
            'chapter': '第四章 最新重要方针政策'
        })

        lines = [l.strip() for l in body.split('\n') if l.strip()]
        
        start_idx = 0
        if lines and ('清单' in lines[0] or '十五五' in lines[0] or '马原' in lines[0] or '创新理论' in lines[0] or '方针政策' in lines[0]):
            start_idx = 1
            if len(lines) > 1 and (re.match(r'^\d+$', lines[1]) or '讲义' in lines[1] or '页' in lines[1]):
                start_idx = 2

        raw_items = []
        curr_lines = []

        for line in lines[start_idx:]:
            is_new = False
            if re.match(r'^(\d+[\.．、]|（[一二三四五六七八九十\d]+）|※|一、|二、|三、|四、|五、|第一组|第二组|第三组|第四组)', line):
                is_new = True
            elif line.startswith('【回答上一节课的问题】') or line.startswith('监督执纪四种形态') or line.startswith('纪律处分种类') or line.startswith('逐步把永久基本农田') or line.startswith('第二十三次集体学习') or line.startswith('特别提醒：') or line.startswith('附：'):
                is_new = True

            if is_new and curr_lines:
                raw_items.append('\n'.join(curr_lines))
                curr_lines = [line]
            else:
                curr_lines.append(line)

        if curr_lines:
            raw_items.append('\n'.join(curr_lines))

        for raw_item in raw_items:
            content = normalize_line(raw_item.strip())
            if not content or len(content) < 4:
                continue

            if content.startswith('建议时间紧张的小伙伴') or content.startswith('学习永远不可能穷尽哲学观点') or content.startswith('还有一个问题，大家容易站在'):
                continue

            blanks = re.findall(r'【([^】\n]+)】', content)
            blanks = [b.strip() for b in blanks if b.strip() and 2 <= len(b.strip()) <= 15]

            # If no brackets found, check for key terms in content
            if not blanks:
                for d_cat, term_pairs in DOMAIN_TERMS.items():
                    for t_word, _ in term_pairs:
                        if t_word in content and t_word not in blanks:
                            blanks.append(t_word)

            if not blanks:
                # Find leading phrase or core noun
                core_match = re.search(r'[\u4e00-\u9fa5]{2,6}(?:制度|思想|原则|规律|要求|战略|格局|目标|体系|任务|动力|保证)', content)
                if core_match:
                    blanks.append(core_match.group(0))

            clean_sentence = content.replace('【', '').replace('】', '')

            # Create an entry for each primary keyword found
            for primary_word in blanks[:2]:
                # Generate concise meaning from the sentence
                meaning_candidate = clean_sentence
                if len(clean_sentence) > 65:
                    # Cut to relevant clause
                    clauses = re.split(r'[。；]', clean_sentence)
                    for c in clauses:
                        if primary_word in c and len(c.strip()) >= 6:
                            meaning_candidate = c.strip() + '。'
                            break

                all_entries.append({
                    'word': primary_word,
                    'meaning': meaning_candidate,
                    'examples': [clean_sentence],
                    'group': meta['group'],
                    'subcategory': meta['subcategory'],
                    'chapter': meta['chapter'],
                    'listNum': list_num,
                    'color': '重点'
                })

    # Deduplicate entries with same word and group
    unique_entries = []
    seen = set()
    for e in all_entries:
        key = (e['word'], e['group'])
        if key not in seen:
            seen.add(key)
            unique_entries.append(e)

    # Now enrich each entry with 3 smart distractors
    all_words = list(set(e['word'] for e in unique_entries))
    
    for entry in unique_entries:
        curr_word = entry['word']
        curr_group = entry['group']
        
        # 1. Look for domain-matched distractors
        matched_distractors = []
        for domain, pairs in DOMAIN_TERMS.items():
            words_in_domain = [w for w, _ in pairs]
            if curr_word in words_in_domain:
                for w, m in pairs:
                    if w != curr_word and w not in [d['word'] for d in matched_distractors]:
                        matched_distractors.append({'word': w, 'meaning': m})
                        if len(matched_distractors) >= 3:
                            break
            if len(matched_distractors) >= 3:
                break
                
        # 2. Look for same group candidates
        if len(matched_distractors) < 3:
            same_group = [e for e in unique_entries if e['group'] == curr_group and e['word'] != curr_word]
            random.shuffle(same_group)
            for sg in same_group:
                if sg['word'] not in [d['word'] for d in matched_distractors]:
                    matched_distractors.append({'word': sg['word'], 'meaning': sg['meaning']})
                    if len(matched_distractors) >= 3:
                        break

        # 3. Fallback from global pool
        if len(matched_distractors) < 3:
            other_candidates = [e for e in unique_entries if e['word'] != curr_word and e['word'] not in [d['word'] for d in matched_distractors]]
            random.shuffle(other_candidates)
            for oc in other_candidates:
                matched_distractors.append({'word': oc['word'], 'meaning': oc['meaning']})
                if len(matched_distractors) >= 3:
                    break

        entry['distractors'] = matched_distractors[:3]

    # Save to src/data/political_theory.js and political_theory.json
    js_output_path = os.path.join(OUTPUT_DIR, 'political_theory.js')
    json_output_path = os.path.join(OUTPUT_DIR, 'political_theory.json')

    with open(js_output_path, 'w', encoding='utf-8') as f:
        f.write("export const initialPoliticalTheory = " + json.dumps(unique_entries, ensure_ascii=False, indent=2) + ";\n")

    with open(json_output_path, 'w', encoding='utf-8') as f:
        json.dump(unique_entries, f, ensure_ascii=False, indent=2)

    print(f"Successfully generated {len(unique_entries)} structured political theory items!")
    print(f"Saved JS to {js_output_path}")

if __name__ == '__main__':
    main()
