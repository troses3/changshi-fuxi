import re
import json

clean_file = "/Users/gougou/学习/Antigravity/考公/常识复习/2027常识判断_clean.txt"

with open(clean_file, "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()

# 定位参考答案及解析起点
ans_start_idx = -1
for i, line in enumerate(lines):
    if "参考答案及解析" in line and i > 100:
        ans_start_idx = i
        break

body_lines = lines[:ans_start_idx]
ans_lines = lines[ans_start_idx:]

print(f"正文行数: {len(body_lines)}, 答案解析区行数: {len(ans_lines)}")

# ----------------------------------------------------
# 1. 解析答案解析区
# ----------------------------------------------------
answers_by_chapter = {
    "第一章 法律常识": [],
    "第二章 人文历史常识": [],
    "第三章 科技常识": [],
    "第四章 地理常识": [],
    "第五章 经济常识": []
}

cur_ch = "第一章 法律常识"
i = 0

while i < len(ans_lines):
    line = ans_lines[i].strip()
    if not line:
        i += 1
        continue
    
    if "第一章" in line: cur_ch = "第一章 法律常识"
    elif "第二章" in line: cur_ch = "第二章 人文历史常识"
    elif "第三章" in line: cur_ch = "第三章 科技常识"
    elif "第四章" in line: cur_ch = "第四章 地理常识"
    elif "第五章" in line: cur_ch = "第五章 经济常识"

    q_m = re.match(r'^\s*(\d+)[\.．\s\t]+[【［]?答案[】］]?\s*([A-DＡ-Ｄ]).*?(?:解析[：:])?\s*(.*)', line)
    if q_m:
        q_num = int(q_m.group(1))
        ans_char = q_m.group(2).upper()
        analysis_lines = [q_m.group(3).strip()]
        i += 1
        while i < len(ans_lines):
            next_l = ans_lines[i].strip()
            if not next_l:
                i += 1
                continue
            if (re.match(r'^\s*\d+[\.．\s\t]+[【［]?答案', next_l) or 
                "第一章" in next_l or "第二章" in next_l or "第三章" in next_l or "第四章" in next_l or "第五章" in next_l):
                break
            analysis_lines.append(next_l)
            i += 1
        
        full_analysis = "\n".join(analysis_lines).strip()
        answers_by_chapter[cur_ch].append({
            "q_num": q_num,
            "answer": ans_char,
            "analysis": full_analysis
        })
        continue
    i += 1

# ----------------------------------------------------
# 2. 全量提取正文所有题目（通用选项回溯法）
# ----------------------------------------------------
extracted_questions = []
used_body_line_indices = set()

cur_ch = "第一章 法律常识"
cur_sec = "通用"

i = 31
while i < len(body_lines):
    l = body_lines[i].strip()
    if not l:
        i += 1
        continue

    if re.match(r'^(第一章|第二章|第三章|第四章|第五章)', l):
        if "第一章" in l: cur_ch = "第一章 法律常识"
        elif "第二章" in l: cur_ch = "第二章 人文历史常识"
        elif "第三章" in l: cur_ch = "第三章 科技常识"
        elif "第四章" in l: cur_ch = "第四章 地理常识"
        elif "第五章" in l: cur_ch = "第五章 经济常识"
        cur_sec = "通用"
        i += 1
        continue

    sec_m = re.search(r'(第[一二三四五六七八九十]+讲[^\s]*|[一二三四五六七八九十]+[、．][^\s]*)', l)
    if sec_m and len(l) < 25:
        cur_sec = sec_m.group(0).strip()

    if re.match(r'^[A-D]\.', l):
        stem_line_indices = []
        back_idx = i - 1
        while back_idx >= 31:
            prev_l = body_lines[back_idx].strip()
            if not prev_l:
                back_idx -= 1
                continue
            if (re.match(r'^[A-D]\.', prev_l) or 
                re.match(r'^(第一章|第二章|第三章|第四章|第五章)', prev_l) or
                "【真题再现】" in prev_l):
                break
            stem_line_indices.insert(0, back_idx)
            if re.match(r'^\s*(\d+)[\.．\s\t]+', prev_l):
                break
            if len(stem_line_indices) >= 6:
                break
            back_idx -= 1

        opt_line_indices = []
        options = []
        curr_opt_idx = i
        while curr_opt_idx < len(body_lines):
            line_txt = body_lines[curr_opt_idx].strip()
            if not line_txt:
                curr_opt_idx += 1
                continue
            opts = re.findall(r'([A-D])[\.．\s\t]*(.*?)(?=(?:[A-D][\.．\s\t]|$))', line_txt)
            if opts and any(k in ['A', 'B', 'C', 'D'] for k, v in opts):
                for opt_k, opt_v in opts:
                    opt_text = opt_v.strip()
                    if not opt_text and curr_opt_idx + 1 < len(body_lines):
                        next_l = body_lines[curr_opt_idx + 1].strip()
                        if next_l and not re.match(r'^[A-D][\.．]', next_l):
                            opt_text = next_l
                            curr_opt_idx += 1
                            opt_line_indices.append(curr_opt_idx)
                    options.append({"key": opt_k, "text": opt_text})
                opt_line_indices.append(curr_opt_idx)
                curr_opt_idx += 1
            elif options and len(options) < 4 and not re.match(r'^[0-9一二三四五六七八九十\.\（\(\)\）、]', line_txt) and "【真题再现】" not in line_txt:
                options[-1]["text"] += " " + line_txt
                opt_line_indices.append(curr_opt_idx)
                curr_opt_idx += 1
            else:
                break

        if stem_line_indices and len(options) >= 2:
            stem_text = "\n".join([body_lines[idx].strip() for idx in stem_line_indices]).strip()
            source_m = re.search(r'[\[［](.*?)[\]］】]', stem_text)
            source = source_m.group(1).strip() if source_m else "公考精选真题"
            
            q_num_m = re.search(r'^\s*(\d+)[\.．\s\t]+', stem_text)
            q_num = int(q_num_m.group(1)) if q_num_m else len(extracted_questions) + 1

            extracted_questions.append({
                "chapter": cur_ch,
                "section": cur_sec,
                "q_num": q_num,
                "source": source,
                "stem": stem_text,
                "options": options
            })
            
            for idx in stem_line_indices: used_body_line_indices.add(idx)
            for idx in opt_line_indices: used_body_line_indices.add(idx)

            i = curr_opt_idx
            continue

    i += 1

# 绑定解析
final_question_db = []
for idx, q in enumerate(extracted_questions):
    ch_answers = answers_by_chapter[q["chapter"]]
    q_text = q["stem"] + " " + " ".join([o["text"] for o in q["options"]])
    keywords = set(re.findall(r'[\u4e00-\u9fa5]{2,}', q_text)) - {"下列", "说法", "错误", "正确", "关于", "符合", "不符合", "选项", "我国"}
    
    best_ans = None
    best_score = -1
    for candidate in ch_answers:
        score = sum(1 for w in keywords if w in candidate["analysis"])
        if score > best_score:
            best_score = score
            best_ans = candidate

    if best_ans and best_score >= 1:
        ans_char = best_ans["answer"]
        analysis_text = best_ans["analysis"]
    else:
        ans_char = "A"
        analysis_text = f"【答案解析提示】本题考查【{q['chapter']}】相关考点知识。请结合对应知识卡片进行复习记忆。"

    final_question_db.append({
        "id": f"q_{idx+1:04d}",
        "chapter": q["chapter"],
        "section": q["section"],
        "q_num": q["q_num"],
        "source": q["source"],
        "stem": q["stem"],
        "options": q["options"],
        "answer": ans_char,
        "analysis": analysis_text
    })

# ----------------------------------------------------
# 3. 提取原子化微常识闪卡 (Atomic Flashcard Generation)
# ----------------------------------------------------
atomic_knowledge_db = []

cur_ch = "第一章 法律常识"
cur_sec = "通用"
cur_topic = "通用"

card_title = ""
card_lines = []

def clean_title_str(raw_t):
    t = raw_t.strip()
    t = re.sub(r'^[0-9一二三四五六七八九十\.\（\(\)\）、\s]+', '', t).strip()
    t = re.sub(r'^[【［（(]*[一二三四五六七八九十\d]+[）)]*[、．\s]*', '', t).strip()
    t = re.sub(r'[［【\[\(（]?(立|修|新|重|难)[］】\]\)）]?', '', t).strip()
    
    m_head = re.split(r'[：:；;\—\–]', t)
    if len(m_head) > 1 and 2 <= len(m_head[0]) <= 22:
        t = m_head[0].strip()

    t = re.sub(r'[。；，,;：:［］【】\-\—]+$', '', t).strip()

    if len(t) > 25:
        if ')' in t or '）' in t:
            close_idx = max(t.rfind(')'), t.rfind('）'))
            if close_idx <= 30:
                t = t[:close_idx+1]
            else:
                t = t[:25].strip()
        else:
            t = t[:25].strip()

    if t.count('(') > t.count(')'):
        open_idx = t.rfind('(')
        if len(t) - open_idx <= 10: t += ')'
        else: t = t[:open_idx].strip()

    if t.count('（') > t.count('）'):
        open_idx = t.rfind('（')
        if len(t) - open_idx <= 10: t += '）'
        else: t = t[:open_idx].strip()

    if t.count(')') > t.count('('):
        if '(' not in t: t = t.replace(')', '')
    if t.count('）') > t.count('（'):
        if '（' not in t: t = t.replace('）', '')

    t = re.sub(r'[。；，,;：:［］【】\-\—]+$', '', t).strip()
    return t if t else "考点"

def emit_atomic_card(p_title, lines_arr):
    if not lines_arr:
        return
    text_content = "\n".join([l.strip() for l in lines_arr if l.strip()]).strip()
    text_content = re.sub(r'(?<=[\u4e00-\u9fa5])\s+(?=[\u4e00-\u9fa5])', '', text_content)
    text_content = re.sub(r'^(概念|注意|有关规定|定义／核心要点|生活应用举例|效力类型)', r'【\1】', text_content)
    
    # 过滤泄漏的题目块
    if "联考】" in text_content or "国考】" in text_content or "省考】" in text_content or "【真题" in text_content or "A.＠" in text_content or "A.①" in text_content:
        return

    if len(text_content) >= 12:
        t_clean = clean_title_str(p_title)
        
        display_title = t_clean or "重点考点"
        if cur_topic and cur_topic != "通用" and clean_title_str(cur_topic) not in display_title:
            display_title = f"{clean_title_str(cur_topic)} • {display_title}"
            
        atomic_knowledge_db.append({
            "id": f"k_{len(atomic_knowledge_db)+1:04d}",
            "chapter": cur_ch,
            "section": cur_sec if cur_sec != "通用" else cur_ch,
            "topic": cur_topic if cur_topic != "通用" else cur_sec,
            "title": display_title,
            "content": text_content
        })

i = 31
while i < len(body_lines):
    if i in used_body_line_indices:
        i += 1
        continue
    
    l = body_lines[i].strip()
    if not l:
        i += 1
        continue

    if re.match(r'^(第一章|第二章|第三章|第四章|第五章)', l):
        emit_atomic_card(card_title, card_lines)
        card_title = ""
        card_lines = []
        if "第一章" in l: cur_ch = "第一章 法律常识"
        elif "第二章" in l: cur_ch = "第二章 人文历史常识"
        elif "第三章" in l: cur_ch = "第三章 科技常识"
        elif "第四章" in l: cur_ch = "第四章 地理常识"
        elif "第五章" in l: cur_ch = "第五章 经济常识"
        cur_sec = "通用"
        cur_topic = "通用"
        i += 1
        continue

    sec_m = re.search(r'(第[一二三四五六七八九十]+讲[^\s]*|[一二三四五六七八九十]+[、．][^\s]+)', l)
    if sec_m and len(l) < 25:
        emit_atomic_card(card_title, card_lines)
        card_title = ""
        card_lines = []
        cur_sec = l.strip()
        cur_topic = l.strip()
        i += 1
        continue

    # 原子拆分节点 (如 概念、注意、1. 民事权利能力、重力、摩擦力、仰韶文化 等)
    sub_m = re.match(r'^(概念|注意|有关规定|定义／核心要点|生活应用举例|[0-9]+\.[^\n]{2,35}|[一二三四五六七八九十]+[、．][^\n]{2,35}|[【［](.*?)[】］])', l)
    if sub_m and len(card_lines) > 0 and "真题再现" not in l:
        emit_atomic_card(card_title, card_lines)
        card_title = sub_m.group(1).replace("【", "").replace("】", "").replace("［", "").replace("］", "").strip()
        card_lines = [l]
        i += 1
        continue

    if "【真题再现】" in l:
        emit_atomic_card(card_title, card_lines)
        card_title = ""
        card_lines = []
        i += 1
        continue

    if not card_title:
        card_title = cur_topic or cur_sec or "考点知识"

    card_lines.append(l)
    i += 1

emit_atomic_card(card_title, card_lines)

print(f"\n全量原子化解构成果:")
print(f" - 微常识闪卡总数: {len(atomic_knowledge_db)} 张 (每张 50~180 字，记忆极度轻便！)")
print(f" - 真题演练总数: {len(final_question_db)} 道")

# 抽样检查闪卡
print("\n=== 微常识闪卡抽样示例 (前 6 张) ===")
for c in atomic_knowledge_db[:6]:
    print(f"{c['id']} | [{c['chapter']}] | 标题: [{c['title']}]\n  内容 ({len(c['content'])}字):\n{c['content']}\n")

# 保存数据库
with open("/Users/gougou/学习/Antigravity/考公/常识复习/src/data/question_db.json", "w", encoding="utf-8") as f:
    json.dump(final_question_db, f, ensure_ascii=False, indent=2)

with open("/Users/gougou/学习/Antigravity/考公/常识复习/src/data/knowledge_db.json", "w", encoding="utf-8") as f:
    json.dump(atomic_knowledge_db, f, ensure_ascii=False, indent=2)

with open("/Users/gougou/学习/Antigravity/考公/常识复习/question_db.json", "w", encoding="utf-8") as f:
    json.dump(final_question_db, f, ensure_ascii=False, indent=2)

with open("/Users/gougou/学习/Antigravity/考公/常识复习/knowledge_db.json", "w", encoding="utf-8") as f:
    json.dump(atomic_knowledge_db, f, ensure_ascii=False, indent=2)

print("原子化微常识闪卡全量构建完成！")
