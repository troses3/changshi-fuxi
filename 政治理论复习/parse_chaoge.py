import os
import re
import json
import random

SOURCE_FILE = "/Users/gougou/学习/Antigravity/考公/政治理论复习/chaoge.txt"
OUTPUT_DIR = "/Users/gougou/学习/Antigravity/考公/政治理论复习/src/data"

def parse_chaoge(text):
    # 分节
    sections = re.split(r'(第[一二三四五六七八九十]+节[^\n]*)', text)
    
    entries = []
    
    current_chapter = "【超格】政治理论"
    list_num = 100 # 超格作为独立序号
    
    for i in range(1, len(sections), 2):
        section_title = sections[i].strip()
        body = sections[i+1] if i+1 < len(sections) else ''
        
        # 将 [背诵要点答案] 与正文分隔
        parts = re.split(r'[\[［【]背诵要点答案[\]］】]', body)
        content_text = parts[0].strip()
        answer_text = parts[1].strip() if len(parts) > 1 else ''
        
        if not answer_text:
            continue
            
        # 提取答案列表
        # 答案可能有多组，用数字编号区分
        ans_lines = answer_text.split('\n')
        answers = []
        current_ans = []
        for line in ans_lines:
            line = line.strip()
            if not line:
                continue
            # 匹配 1.[答案] 或 l.［答案】
            match = re.match(r'^(?:[lI1\d]+)[\.．、\s]*[\[［【]答案[\]］】][\s]*(.*)', line)
            if match:
                ans_str = match.group(1).strip()
                ans_str = re.sub(r'。$', '', ans_str) # 去掉结尾句号
                items = [a.strip() for a in re.split(r'[、，；]', ans_str) if a.strip()]
                # 如果这个问题有多个填空，它会返回一个列表
                answers.append(items)
            else:
                # 可能是续行
                match2 = re.match(r'^[\[［【]答案[\]］】][\s]*(.*)', line)
                if match2:
                    ans_str = match2.group(1).strip()
                    ans_str = re.sub(r'。$', '', ans_str)
                    items = [a.strip() for a in re.split(r'[、，；]', ans_str) if a.strip()]
                    answers.append(items)

        # 处理正文的题目
        # 匹配空白：全角空格、\t、各种空格的连续组合
        # 先统一一下空格为特殊标记
        text_lines = content_text.split('\n')
        q_idx = 0
        
        for line in text_lines:
            line = line.strip()
            if not line:
                continue
            
            # 清理类似 “1. ” 的前缀
            clean_line = re.sub(r'^\d+[\.\．、\s]+', '', line)
            
            # 找到所有的空白处作为填空位
            # RTF转换后，空位可能是 "\t \t" 或者多个空格
            # 我们把连续的空白（至少2个）当做填空位
            blanks = re.findall(r'[\t 　]{2,}|_{2,}', clean_line)
            
            if blanks:
                if q_idx < len(answers):
                    ans_list = answers[q_idx]
                    
                    # 生成entries
                    # 假设一句话对应一个答案组
                    meaning_full = clean_line
                    # 把原本的空位替换回去，形成完整的句子
                    temp_meaning = clean_line
                    for j, ans in enumerate(ans_list):
                        if j < len(blanks):
                            temp_meaning = temp_meaning.replace(blanks[j], f"【{ans}】", 1)
                    
                    meaning_clean = temp_meaning.replace('【', '').replace('】', '')
                    
                    for j, ans in enumerate(ans_list):
                        if not ans or len(ans) > 20: continue
                        
                        hint = temp_meaning.replace(f"【{ans}】", "______")
                        hint = hint.replace('【', '').replace('】', '')
                        
                        entries.append({
                            'word': ans,
                            'meaning': meaning_clean,
                            'hint': hint,
                            'examples': [meaning_clean],
                            'group': section_title,
                            'subcategory': current_chapter,
                            'chapter': '超格精简版',
                            'listNum': list_num,
                            'color': '重点'
                        })
                q_idx += 1
                
    return entries

def build_distractors(entries):
    rng = random.Random(42)
    for entry in entries:
        word = entry['word']
        my_hint = entry['hint']
        
        candidates = []
        used_words = {word}
        
        pool = [e for e in entries if e['word'] not in used_words]
        rng.shuffle(pool)
        
        for cand in pool:
            if cand['word'] not in used_words:
                candidates.append({'word': cand['word'], 'meaning': cand['meaning'], 'hint': cand['hint']})
                used_words.add(cand['word'])
            if len(candidates) >= 3:
                break
        
        entry['distractors'] = candidates[:3]
    return entries

if __name__ == "__main__":
    if not os.path.exists(SOURCE_FILE):
        print(f"Error: {SOURCE_FILE} not found.")
        exit(1)
        
    with open(SOURCE_FILE, 'r', encoding='utf-8') as f:
        text = f.read()
        
    entries = parse_chaoge(text)
    entries = build_distractors(entries)
    print(f"Parsed {len(entries)} entries from Chaoge.")
    
    js_path = os.path.join(OUTPUT_DIR, 'political_theory_chaoge.js')
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write("export const chaogePoliticalTheory = " + json.dumps(entries, ensure_ascii=False, indent=2) + ";\n")
    
    print(f"Output written to {js_path}")
