import os
import sys
import re
import json
import random

SOURCE_FILE = "/Volumes/Seagate Expansion Drive/00考公/【01】2027花生/【王君涛】政治理论/背诵清单/【四海】政治理论背诵清单汇总版（7.20更正）.txt"
OUTPUT_DIR = "/Users/gougou/学习/Antigravity/考公/政治理论复习/src/data"

CHAPTER_MAP = {
    1: ('第一章 十五五规划专题', '清单 1: 十五五上'),
    2: ('第一章 十五五规划专题', '清单 2: 十五五下'),
    3: ('第二章 马克思主义基本原理', '清单 3: 马原（上）· 唯物论与辨证法'),
    4: ('第二章 马克思主义基本原理', '清单 4: 马原（中）· 辩证法规律与思维能力'),
    5: ('第二章 马克思主义基本原理', '清单 5: 马原（下）· 认识论与唯物史观'),
    6: ('第二章 马克思主义基本原理', '清单 6: 马政经与新思想（上）'),
    7: ('第三章 习近平新时代思想', '清单 7: 创新理论 2 · 14个方略与13个成就'),
    8: ('第三章 习近平新时代思想', '清单 8: 创新理论 3 · 全面从严治党与党建'),
    9: ('第三章 习近平新时代思想', '清单 9: 创新理论 4 · 习近平法治思想'),
    10: ('第三章 习近平新时代思想', '清单 10: 创新理论 5 · 文化使命与人大制度'),
    11: ('第三章 习近平新时代思想', '清单 11: 创新理论 6 · 改革方向与强军思想'),
    12: ('第三章 习近平新时代思想', '清单 12: 创新理论 7 · 总体国家安全观'),
    13: ('第四章 最新重要方针政策', '清单 13: 方针政策 2 · 稳中求进与高质量发展'),
    14: ('第四章 最新重要方针政策', '清单 14: 方针政策 3 · 科技强国与科技攻关'),
    15: ('第四章 最新重要方针政策', '清单 15: 方针政策 4 · 农业强国与高标准农田'),
    16: ('第四章 最新重要方针政策', '清单 16: 方针政策 5 · 民生保障与社会治理'),
    17: ('第四章 最新重要方针政策', '清单 17: 方针政策 6 · 中国特色大国外交'),
    18: ('第四章 最新重要方针政策', '清单 18: 方针政策 7 · 网络生态治理'),
    19: ('第四章 最新重要方针政策', '清单 19: 方针政策 8 · 重要指示批示精要'),
    20: ('第四章 最新重要方针政策', '清单 20: 方针政策 9 · 树立践行正确政绩观'),
    21: ('第五章 2026新法典与时政考察', '清单 21: 方针政策 10 · 地方考察与党建14坚持'),
    22: ('第五章 2026新法典与时政考察', '清单 22: 方针政策 11 · 生态环境法典与民营经济法')
}

# Domain Distractor pools
DOMAIN_DISTRACTORS = {
    '地位与作用': ['根本保证', '根本动力', '根本目的', '根本前提', '首要任务', '鲜明主题', '本质属性', '政治立场', '最高原则', '生命线', '工作基点', '基础和关键', '关键所在', '战略支撑', '重要组成部分', '生力军'],
    '规律与属性': ['客观实在性', '运动', '绝对性', '相对性', '前进性', '曲折性', '主观能动性', '社会历史性', '自觉能动性', '直接现实性', '阶级性', '实践性', '科学性', '人民性', '开放性'],
    '党建与政治': ['政治建设', '思想建设', '组织建设', '作风建设', '纪律建设', '制度建设', '党中央集中统一领导', '党管干部', '自我革命', '社会革命', '中国共产党领导', '党性', '群众路线'],
    '经济与民生': ['实体经济', '先进制造业', '新质生产力', '高质量发展', '初次分配', '再分配', '第三次分配', '橄榄型', '金字塔型', '公共服务', '民营经济', '公有制经济', '统一大市场', '新发展格局'],
    '监督与纪律': ['常态', '大多数', '少数', '极少数', '警告', '严重警告', '撤销党内职务', '留党察看', '开除党籍', '政治纪律', '组织纪律', '廉洁纪律', '群众纪律', '工作纪律', '生活纪律'],
    '法律与治理': ['依法治国', '依宪治国', '依法执政', '依宪执政', '非禁即入', '属地管辖', '无过错责任', '从重处罚', '预防为主', '系统治理', '生态优先', '民事责任', '行政责任'],
    '通用哲学': ['主要矛盾', '次要矛盾', '矛盾主要方面', '矛盾次要方面', '内因', '外因', '量变', '质变', '肯定', '否定', '扬弃', '感性认识', '理性认识', '真理尺度', '价值尺度', '生产力', '生产关系', '经济基础', '上层建筑']
}

def clean_text(raw_text):
    text = re.sub(r'关注“花生十三”公众号[^\n]*', '', raw_text)
    text = re.sub(r'第\s*\d+\s*页', '', text)
    text = text.replace('\x0c', '\n')
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text

def normalize_spaces_and_newlines(s):
    s = re.sub(r'([^\n。；？！：\d])\n([^\n。；？！：\d\s（(])', r'\1\2', s)
    s = re.sub(r'[ \t]+', ' ', s)
    return s.strip()

def extract_teacher_note(item_str):
    notes = []
    note_patterns = [
        r'（(?:理解|注意|不用背|知道|广东|这(?:条|句话)|不需要背|会出|想填空|想背诵|特别注意|顺序被打乱)[^）]*）',
        r'\((?:理解|注意|不用背|知道|广东|这(?:条|句话)|不需要背|会出|想填空|想背诵|特别注意|顺序被打乱)[^\)]*\)',
        r'※[^※]+※',
        r'特别提醒：[^\n]+',
        r'【回答上一节课的问题】[^\n]+',
        r'建议时间紧张的小伙伴[^\n]+',
        r'学习永远不可能穷尽[^\n]+'
    ]
    for p in note_patterns:
        matches = re.findall(p, item_str)
        for m in matches:
            notes.append(m.strip())
    return '；'.join(notes) if notes else None

def generate_item_title(raw_str, default_index, list_num, list_title):
    cleaned = re.sub(r'^\s*(\d+[\.．、]|（[一二三四五六七八九十\d]+）|※|一、|二、|三、|四、|五、|第一组|第二组|第三组|第四组)\s*', '', raw_str)
    cleaned = cleaned.replace('【', '').replace('】', '').replace('\n', ' ')
    
    if '：' in cleaned:
        t = cleaned.split('：')[0].strip()
        if 2 <= len(t) <= 24:
            return t
    if '——' in cleaned:
        t = cleaned.split('——')[0].strip()
        if 2 <= len(t) <= 24:
            return t
            
    phrases = re.split(r'[，。；！]', cleaned)
    for phrase in phrases:
        p = phrase.strip()
        if 4 <= len(p) <= 24:
            return p
            
    short_theme = list_title.split('·')[0].replace('清单', '').strip()
    return f"{short_theme} · 核心考点 #{default_index}"

def get_distractors_for_blank(blank, all_blanks):
    distractors = set()
    
    # 1. Domain match
    for domain, pool in DOMAIN_DISTRACTORS.items():
        if blank in pool:
            for item in pool:
                if item != blank and item not in distractors:
                    distractors.add(item)
                    if len(distractors) >= 3:
                        break
        if len(distractors) >= 3:
            break
            
    # 2. Similar length from all extracted blanks
    if len(distractors) < 3:
        same_len_candidates = [b for b in all_blanks if b != blank and abs(len(b) - len(blank)) <= 2 and len(b) > 1]
        random.shuffle(same_len_candidates)
        for c in same_len_candidates:
            distractors.add(c)
            if len(distractors) >= 3:
                break
                
    # 3. Fallback
    fallback_pool = DOMAIN_DISTRACTORS['地位与作用'] + DOMAIN_DISTRACTORS['党建与政治'] + DOMAIN_DISTRACTORS['经济与民生']
    random.shuffle(fallback_pool)
    for fb in fallback_pool:
        if fb != blank and fb not in distractors:
            distractors.add(fb)
            if len(distractors) >= 3:
                break
                
    return list(distractors)[:3]

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

    knowledge_cards = []
    question_cards = []
    
    all_extracted_blanks = re.findall(r'【([^】\n]+)】', text)
    all_extracted_blanks = [b.strip() for b in all_extracted_blanks if b.strip() and len(b.strip()) <= 15]

    item_id_counter = 1
    question_id_counter = 1

    for i in range(1, len(parts), 2):
        header = parts[i].strip()
        body = parts[i+1].strip() if i+1 < len(parts) else ''

        num_match = re.search(r'清单\s*(\d+)', header)
        list_num = int(num_match.group(1)) if num_match else (i // 2 + 1)
        
        chapter_name, section_name = CHAPTER_MAP.get(list_num, ('第四章 最新重要方针政策', f'清单 {list_num}'))

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

        item_in_list = 1
        for raw_item in raw_items:
            content = normalize_spaces_and_newlines(raw_item.strip())
            if not content or len(content) < 4:
                continue

            if content.startswith('建议时间紧张的小伙伴') or content.startswith('学习永远不可能穷尽哲学观点') or content.startswith('还有一个问题，大家容易站在'):
                continue

            teacher_note = extract_teacher_note(content)
            
            blanks = re.findall(r'【([^】\n]+)】', content)
            blanks = [b.strip() for b in blanks if b.strip()]

            title = generate_item_title(content, item_in_list, list_num, section_name)

            card = {
                'id': f'k_{item_id_counter:04d}',
                'chapter': chapter_name,
                'section': section_name,
                'title': title,
                'content': content,
                'teacherNote': teacher_note
            }
            knowledge_cards.append(card)

            # Generate Questions for Question DB
            valid_blanks = [b for b in blanks if 2 <= len(b) <= 14 and not b.startswith('http')]
            if valid_blanks:
                for target_blank in valid_blanks[:2]:
                    # Stem with blank
                    stem = content.replace(f'【{target_blank}】', '（      ）')
                    stem = re.sub(r'【([^】]+)】', r'\1', stem)

                    distractors = get_distractors_for_blank(target_blank, all_extracted_blanks)
                    
                    options_list = [target_blank] + distractors
                    random.shuffle(options_list)

                    labels = ['A', 'B', 'C', 'D']
                    options = []
                    correct_answer = 'A'
                    for idx, opt_text in enumerate(options_list):
                        lbl = labels[idx]
                        if opt_text == target_blank:
                            correct_answer = lbl
                        options.append({
                            'key': lbl,
                            'text': opt_text
                        })

                    analysis = f"【官方权威原文】\n{content}"
                    if teacher_note:
                        analysis += f"\n\n📌【名师指津】{teacher_note}"

                    question = {
                        'id': f'q_{question_id_counter:04d}',
                        'chapter': chapter_name,
                        'section': section_name,
                        'q_num': question_id_counter,
                        'source': f'2027政治理论 · {section_name.split("·")[0].strip()}',
                        'stem': stem,
                        'options': options,
                        'answer': correct_answer,
                        'analysis': analysis
                    }
                    question_cards.append(question)
                    question_id_counter += 1

            item_id_counter += 1
            item_in_list += 1

    knowledge_path = os.path.join(OUTPUT_DIR, 'knowledge_db.json')
    question_path = os.path.join(OUTPUT_DIR, 'question_db.json')

    with open(knowledge_path, 'w', encoding='utf-8') as f:
        json.dump(knowledge_cards, f, ensure_ascii=False, indent=2)

    with open(question_path, 'w', encoding='utf-8') as f:
        json.dump(question_cards, f, ensure_ascii=False, indent=2)

    print(f"Generated unified datasets:")
    print(f"- {len(knowledge_cards)} Knowledge points -> {knowledge_path}")
    print(f"- {len(question_cards)} Questions -> {question_path}")

if __name__ == '__main__':
    main()
