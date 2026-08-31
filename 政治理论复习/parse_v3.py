"""
parse_v3.py - 政治理论背诵清单解析器 v3
核心修复：
1. word 字段从单字/短词"延伸"成完整考点短语
2. 一句话一个主条目，避免同 meaning 多 word
3. meaning 去掉编号前缀，干净句子
4. 过滤噪音（数字词、广告语等）
5. 更精准的 distractors 策略
"""
import os, re, json, random

SOURCE_FILE = "/Volumes/Seagate Expansion Drive/00考公/【01】2027花生/【王君涛】政治理论/背诵清单/【四海】政治理论背诵清单汇总版（7.20更正）.txt"
OUTPUT_DIR = "/Users/gougou/学习/Antigravity/考公/政治理论复习/src/data"

# ====== 清单1（十五五规划上）手工条目 ======
# 原文第一章不含【】括号标记，需要手工提取核心考点
MANUAL_LIST1 = [
    ('根本动力', '坚持稳中求进工作总基调，以改革创新为根本动力，以满足人民日益增长的美好生活需要为根本目的，以全面从严治党为根本保障'),
    ('根本目的', '以满足人民日益增长的美好生活需要为根本目的，以全面从严治党为根本保障'),
    ('根本保证', '把党的领导贯穿经济社会发展各方面全过程，为我国社会主义现代化建设提供根本保证'),
    ('高质量发展', '以推动高质量发展为主题，推动经济实现质的有效提升和量的合理增长'),
    ('战略机遇', '我国发展处于战略机遇和风险挑战并存、不确定难预料因素增多的时期'),
    ('市场化法治化国际化', '打造市场化法治化国际化一流营商环境，形成既"放得活"又"管得好"的经济秩序'),
    ('新安全格局', '以新安全格局保障新发展格局'),
    ('教育科技人才一体', '十五五目标：教育科技人才一体发展格局基本形成'),
    ('居民收入增长和经济增长同步', '居民收入增长和经济增长同步、劳动报酬提高和劳动生产率提高同步，分配结构得到优化'),
    ('实体经济', '坚持把发展经济的着力点放在实体经济上；构建以先进制造业为骨干的现代化产业体系'),
    ('新型基础设施', '适度超前建设新型基础设施，推进信息通信网络、全国一体化算力网、重大科技基础设施等建设和集约高效利用'),
    ('人工智能', '全面实施"人工智能+"行动，以人工智能引领科研范式变革'),
    ('稳步扩大制度型开放', '稳步扩大制度型开放，以服务业为重点扩大市场准入和开放领域，扩大单边开放领域和区域'),
    ('硬联通', '深化基础设施"硬联通"、规则标准"软联通"、同共建国家人民"心联通"'),
    ('科研范式变革', '以人工智能引领科研范式变革，推动基础科学突破'),
]

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
    22: {'group': '【清单22】方针政策 11 · 最新法典', 'subcategory': '生态环境法典与民营经济促进法', 'chapter': '第五章 2026新法典与时政考察'},
}

# ====== 噪音过滤关键词 ======
SKIP_PATTERNS = [
    r'关注.*公众号', r'花生十三', r'第\d+页',
    r'不用背', r'理解.*就行', r'这条不背', r'简单了解',
    r'建议时间紧张', r'学习永远不可能穷尽',
    r'还有一个问题，大家容易', r'\d+%正确率', r'大联考',
    r'注意.*区别', r'备注：', r'^附：',
    r'小伙伴', r'盲目的背', r'做题', r'【目的】', r'【解决方案】', 
    r'选择题', r'讲义', r'真题', r'特别注意', r'解题思路', r'下课之前',
    r'【补充】', r'【扩展】', r'【总结】', r'【注】', r'【注意】', r'【解析】'
]

# ====== 纯词性词黑名单（不可作为独立考点词的词）======
# 这些词在不延伸时是无效考点词（都是2字以内的通用词）
GENERIC_2CHAR = {
    '社会', '市场', '全国', '省级', '基层', '化石', '增加', '扩大',
    '稳步', '有序', '协调', '改革', '建设', '发展', '推动', '加快',
    '坚持', '促进', '提高', '完善', '实施', '推进', '加强', '保障',
    '优化', '创新', '主动', '积极', '重点', '关键', '全面', '深化',
}

def clean_text(raw):
    text = raw.replace('\r\n', '\n').replace('\r', '\n')
    text = re.sub(r'关注"花生十三"公众号[^\n]*', '', text)
    text = re.sub(r'第\s*\d+\s*页', '', text)
    text = text.replace('\x0c', '\n')
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text

def is_skip_line(line):
    for pat in SKIP_PATTERNS:
        if re.search(pat, line):
            return True
    return False

def extend_keyword_phrase(keyword, sentence, max_extend=6):
    """
    原逻辑尝试向后延伸，但会导致：
    1. 随意截断固定长度（如6个字）导致“事业单位”变成“事业单”。
    2. 导致 word 包含原文没有的字符（原文被【】隔开），从而在 App.jsx 的 quiz 模式下 replace('______') 失败，直接把带答案的原句暴露给用户。
    因此，直接废弃延伸逻辑，严格以老师给定的【】内容作为考点词。
    """
    return keyword

def generate_hint(word, meaning):
    """
    生成不含考点词本身的语境提示句（挖空格式）。
    
    核心逻辑：
    1. 在 meaning 中精确找到 word
    2. 提取包含 word 的子句
    3. 将 word 替换为 ______
    4. 如果 hint 有效内容太少（<8字），扩大窗口或使用全句
    5. 如果 word 在 meaning 中找不到，尝试模糊匹配或使用全句
    """
    if not word or not meaning:
        return meaning[:60] if meaning else ''

    SENTENCE_STOPS = set('。！？\n')
    SOFT_STOPS = set('，、；：')

    def extract_clause_hint(text, w, left_ctx=80, right_ctx=80):
        """从 text 中找到 w，截取周围子句，把 w 替换成 ______"""
        idx = text.find(w)
        if idx == -1:
            return None

        # 左边界
        start = idx
        prefix_dots = ""
        for i in range(idx - 1, max(0, idx - left_ctx) - 1, -1):
            if text[i] in SENTENCE_STOPS:
                start = i + 1
                break
            if text[i] in SOFT_STOPS and (idx - i) >= 20:
                start = i + 1
                prefix_dots = "..."
                break
        else:
            start = max(0, idx - left_ctx)
            if start > 0: prefix_dots = "..."

        # 右边界
        end = idx + len(w)
        suffix_dots = ""
        for i in range(idx + len(w), min(len(text), idx + len(w) + right_ctx)):
            if text[i] in SENTENCE_STOPS:
                end = i + 1
                break
            if text[i] in SOFT_STOPS and (i - idx - len(w)) >= 20:
                end = i
                suffix_dots = "..."
                break
        else:
            end = min(len(text), idx + len(w) + right_ctx)
            if end < len(text): suffix_dots = "..."

        clause = prefix_dots + text[start:end].strip() + suffix_dots
        return clause.replace(w, '______')

    # 第一次尝试：精确匹配
    hint = extract_clause_hint(meaning, word)

    # 精确匹配失败（word 不在 meaning 里，例如格式拆分问题）
    if hint is None:
        # 尝试：用全句（不挖空），至少给用户情境信息
        # 注意：此时 word 确实不在 meaning 里，无法挖空
        return meaning[:70] + ('…' if len(meaning) > 70 else '')

    # 质量检查：有效内容（去掉空格、横线、标点后）是否够长
    useful_chars = hint.replace('______', '').strip('、，。！？；：…\n ')
    if len(useful_chars) < 8:
        # 扩大窗口重试
        hint_wide = extract_clause_hint(meaning, word, left_ctx=40, right_ctx=40)
        if hint_wide:
            useful_wide = hint_wide.replace('______', '').strip('、，。！？；：…\n ')
            if len(useful_wide) >= 8:
                return hint_wide
        # 最后兜底：用全句挖空（word 确实在 meaning 里）
        fallback_with_blank = meaning.replace(word, '______')
        if '______' in fallback_with_blank:
            blank_idx = fallback_with_blank.find('______')
            fb_start = max(0, blank_idx - 20)
            fb_end = min(len(fallback_with_blank), blank_idx + len(word) + 25)
            return fallback_with_blank[fb_start:fb_end].strip()
        # word 替换失败（理论上不会发生，因为 hint != None 说明 extract_clause_hint 成功了）
        return meaning[:70] + ('…' if len(meaning) > 70 else '')

    return hint


def is_meaningful_word(word, sentence):
    """检查该词是否足够有意义，可以作为独立考点词"""
    # 过滤：纯数字或百分比
    if re.match(r'^[\d\.\%\~～、\s]+$', word):
        return False
    # 过滤：噪音
    if '大联考' in word or '正确率' in word:
        return False
    # 过滤：黑名单通用词（且长度<=2）
    if word in GENERIC_2CHAR and len(word) <= 2:
        return False
    # 过滤：单字词
    if len(word) <= 1:
        return False
    return True

def extract_entries_from_sentence(sentence_raw, meta, list_num):
    """
    从一个原始句子（可能多行拼接）中提取所有条目。
    策略：
    - 提取所有【keyword】
    - 每个keyword尝试延伸为短语
    - 过滤无意义的词
    - 每个最终 word 生成一条 entry
    - 所有条目共享同一 meaning（整句去掉编号和括号）
    """
    # 合并换行（去掉软换行）
    sentence = re.sub(r'\n\s*', '', sentence_raw.strip())
    
    if is_skip_line(sentence):
        return []
    if len(sentence) < 6:
        return []
    
    # 去掉句子末尾的教师补充说明（括号内说明，如"(这条不用背...)"）
    sentence = re.sub(r'（[^）]{5,60}不用背[^）]*）', '', sentence)
    sentence = re.sub(r'（[^）]{5,60}理解.*就行[^）]*）', '', sentence)
    sentence = re.sub(r'注意.*?区别.*', '', sentence)
    sentence = re.sub(r'简单说【.*?】', '', sentence)
    
    # 提取干净 meaning（去掉编号前缀、去掉【】标记）
    meaning = re.sub(r'^[\d]+[\.\．、。\s]+', '', sentence).strip()
    meaning = meaning.replace('【', '').replace('】', '')
    meaning = re.sub(r'\s+', '', meaning)
    
    if len(meaning) < 4:
        return []
    
    # examples = 原始句子（含【】标记，用于挖空模式还原）
    example = re.sub(r'^[\d]+[\.\．、。\s]+', '', sentence).strip()
    example = re.sub(r'\s+', '', example)
    
    # 提取所有 【keyword】
    raw_blanks = re.findall(r'【([^】\n]+)】', sentence)
    
    entries = []
    seen_words = set()  # 避免同一句中重复 word
    
    for raw_kw in raw_blanks:
        raw_kw = raw_kw.strip()
        
        if not is_meaningful_word(raw_kw, sentence):
            # 尝试延伸
            extended = extend_keyword_phrase(raw_kw, sentence)
            if extended == raw_kw or not is_meaningful_word(extended, sentence):
                continue  # 延伸后仍无意义，跳过
            final_word = extended
        else:
            # keyword 本身有意义，但仍尝试适当延伸（仅对<=4字的词）
            if len(raw_kw) <= 4:
                extended = extend_keyword_phrase(raw_kw, sentence)
                # 只有延伸后仍属于句子的才用
                clean_s = sentence.replace('【', '').replace('】', '')
                if extended in clean_s and extended != raw_kw:
                    final_word = extended
                else:
                    final_word = raw_kw
            else:
                final_word = raw_kw
        
        # 去重
        if final_word in seen_words:
            continue
        seen_words.add(final_word)
        
        # 过滤最终词长度（1字 或 超长）
        if len(final_word) < 2 or len(final_word) > 18:
            continue
        
        hint = generate_hint(final_word, meaning)
        # 如果最终生成的 hint 去除空格等字符后仍然极短，说明语境彻底丧失，拒绝收录该考点
        if len(hint.replace('______', '').strip('、，。！？；：…\n ')) < 6:
            continue
            
        entries.append({
            'word': final_word,
            'meaning': meaning,
            'hint': hint,
            'examples': [example],
            'group': meta['group'],
            'subcategory': meta['subcategory'],
            'chapter': meta['chapter'],
            'listNum': list_num,
            'color': '重点',
        })
    
    return entries

def parse_source(text):
    """解析整个文本，按清单分章，按编号分句"""
    # 清单1-2: 政治理论背诵清单 \n1\n\n十五五上
    # 清单3-22: 政治理论基础知识练习清单 \n3\n\n马原（上）
    # 统一pattern匹配两种格式
    section_pattern = r'(?:政治理论背诵清单|政治理论基础知识练习清单)[ ]*\n(\d+)\n'
    parts = re.split(section_pattern, text)
    
    all_entries = []
    
    # 先注入清单1手工条目（原文第一章无【】标记）
    meta1 = LIST_META[1]
    for word, meaning in MANUAL_LIST1:
        hint = generate_hint(word, meaning)
        if len(hint.replace('______', '').strip('、，。！？；：…\n ')) < 6:
            continue
        all_entries.append({
            'word': word,
            'meaning': meaning,
            'hint': hint,
            'examples': [meaning],
            'group': meta1['group'],
            'subcategory': meta1['subcategory'],
            'chapter': meta1['chapter'],
            'listNum': 1,
            'color': '重点',
        })
    
    # parts[0] = 前导内容
    # parts[1] = "1", parts[2] = 第一清单的内容
    # parts[3] = "2", parts[4] = 第二清单的内容, ...
    for i in range(1, len(parts), 2):
        list_num_str = parts[i].strip()
        body = parts[i+1] if i+1 < len(parts) else ''
        
        try:
            list_num = int(list_num_str)
        except ValueError:
            continue
        
        meta = LIST_META.get(list_num, {
            'group': f'【清单{list_num}】政治理论考点',
            'subcategory': '方针政策与理论要点',
            'chapter': '第四章 最新重要方针政策'
        })
        
        # 在清单体内，按"编号+句号"分割句子
        # 每个句子：以数字编号开头到下一个数字编号开头
        lines = body.split('\n')
        
        # 把软换行的行合并（下一行不以数字/特殊符号开头就是上一行的延续）
        merged_sentences = []
        current = ''
        
        for line in lines:
            line_stripped = line.strip()
            if not line_stripped:
                continue
            
            # 判断是否是新句子的开始
            is_new = bool(re.match(r'^(\d+[\.\．]|[（(][一二三四五六七八九十\d]+[)）]|※|第[一二三四五六七八九十\d]+组|[一二三四五六七八九十]+、)', line_stripped))
            
            if is_new:
                if current.strip():
                    merged_sentences.append(current.strip())
                current = line_stripped
            else:
                # 续行：如果当前行以已有内容结尾，检查是否需要连接
                if current:
                    # 如果上一行结尾不是标点，才直接连接
                    if current and current[-1] not in '，。！？、；：':
                        current += line_stripped
                    else:
                        current += line_stripped
                else:
                    current = line_stripped
        
        if current.strip():
            merged_sentences.append(current.strip())
        
        for sentence in merged_sentences:
            if is_skip_line(sentence):
                continue
            if '【' not in sentence:
                # 没有挖空标记的句子，暂时跳过
                # (可后续加规则处理无标记的重要句子)
                continue
            
            entries = extract_entries_from_sentence(sentence, meta, list_num)
            all_entries.extend(entries)
    
    return all_entries

def deduplicate(entries):
    """去重：同一 (word, group) 的条目只保留第一条"""
    seen = set()
    result = []
    for e in entries:
        key = (e['word'], e['group'])
        if key not in seen:
            seen.add(key)
            result.append(e)
    return result

def deduplicate_same_meaning(entries):
    """
    核心去重：同一 meaning 且 word 相似度高的，只保留最长的 word。
    这解决了"根本动力"和"根本目的"共用同一个 meaning 的问题。
    注意：这个问题本身是合理的（同一原句确实可以考多个填空词），
    保留所有条目是对的，只要 word 字段足够有区分度就好。
    """
    return entries  # v3 暂时不做合并，word 已足够区分

def build_distractors(entries):
    """
    为每个条目生成3个干扰项。
    优先：同一清单（同一考点群）内的条目
    次选：同一章节
    最后：全局随机
    """
    rng = random.Random(42)  # 固定随机种子，保证可重现
    
    # 建立索引
    by_group = {}
    by_chapter = {}
    for e in entries:
        by_group.setdefault(e['group'], []).append(e)
        by_chapter.setdefault(e['chapter'], []).append(e)
    
    def get_bigrams(w):
        if len(w) < 2: return set()
        return set([w[i:i+2] for i in range(len(w)-1)])

    def calculate_score(target, candidate):
        score = 0
        t_word = target['word']
        c_word = candidate['word']
        
        # 1. 词干重合度（双字或多字连续重合，赋予极高权重）
        t_bigrams = get_bigrams(t_word)
        c_bigrams = get_bigrams(c_word)
        common_bigrams = t_bigrams & c_bigrams
        score += len(common_bigrams) * 500
        
        # 2. 单字重合度（剔除高频词、数字、方位词等无意义重合）
        stop_chars = {'的', '和', '与', '在', '是', '了', '、', '，', '。', 
                      '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', 
                      '上', '下', '大', '小', '中', '第', '个'}
        t_chars = set(t_word) - stop_chars
        c_chars = set(c_word) - stop_chars
        common_chars = t_chars & c_chars
        score += len(common_chars) * 10
        
        # 3. 长度差异惩罚（让选项长短看起来更匀称）
        len_diff = abs(len(t_word) - len(c_word))
        score -= len_diff * 5
        
        # 4. 业务逻辑关联（保底分数）
        if target['group'] == candidate['group']:
            score += 50
        elif target['chapter'] == candidate['chapter']:
            score += 20
            
        return score

    for entry in entries:
        word = entry['word']
        group = entry['group']
        chapter = entry['chapter']
        my_hint = entry['hint']
        
        candidates = []
        used_words = {word}
        used_hints = {my_hint}
        
        # 候选池
        pool = [e for e in entries if e['word'] not in used_words]
        rng.shuffle(pool)  # 打乱，使得分数相同时有随机性
        
        # 按混淆度打分排序
        pool.sort(key=lambda x: calculate_score(entry, x), reverse=True)
        
        for cand in pool:
            if cand['word'] not in used_words and cand['hint'] not in used_hints:
                candidates.append({'word': cand['word'], 'meaning': cand['meaning'], 'hint': cand['hint']})
                used_words.add(cand['word'])
                used_hints.add(cand['hint'])
            if len(candidates) >= 3:
                break
        
        entry['distractors'] = candidates[:3]
    
    return entries

def self_check(entries):
    """互检报告"""
    print(f"\n{'='*50}")
    print(f"✅ 自检报告")
    print(f"{'='*50}")
    print(f"总条目数: {len(entries)}")
    
    from collections import Counter, defaultdict
    
    # 检查1：word 长度分布
    word_lens = Counter(len(e['word']) for e in entries)
    print(f"\n📊 word 字段长度分布:")
    for l in sorted(word_lens.keys()):
        print(f"  {l}字: {word_lens[l]}条")
    
    # 检查2：meaning 以编号开头的数量
    bad_meaning = sum(1 for e in entries if re.match(r'^\d+[\.\．]', e['meaning']))
    print(f"\n⚠️  meaning 以编号开头: {bad_meaning}条 (应为0)")
    
    # 检查3：同 meaning 被多个 word 使用
    meaning_to_words = defaultdict(list)
    for e in entries:
        meaning_to_words[e['meaning']].append(e['word'])
    shared = {m: ws for m, ws in meaning_to_words.items() if len(ws) > 1}
    print(f"\n⚠️  同 meaning 被多个 word 共用: {len(shared)}组 (涉及{sum(len(v) for v in shared.values())}条)")
    for m, ws in list(shared.items())[:3]:
        print(f"   meaning: {m[:60]}...")
        print(f"   words: {ws}")
    
    # 检查4：单字词数量
    single_char = [e['word'] for e in entries if len(e['word']) <= 2]
    print(f"\n⚠️  word ≤2字的条目: {len(single_char)}条")
    if single_char:
        print(f"   前10个: {single_char[:10]}")
    
    # 检查5：group 分布
    print(f"\n📊 group 分布:")
    for g, cnt in sorted(Counter(e['group'] for e in entries).items(), key=lambda x: x[1]):
        print(f"  {cnt:3d}条  {g}")
    
    # 检查6：distractor 数量不足
    missing_dist = sum(1 for e in entries if len(e.get('distractors', [])) < 3)
    print(f"\n⚠️  distractors 不足3个: {missing_dist}条 (应为0)")
    
    print(f"\n{'='*50}")

def main():
    if not os.path.exists(SOURCE_FILE):
        print(f"❌ 找不到源文件: {SOURCE_FILE}")
        return
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    with open(SOURCE_FILE, 'r', encoding='utf-8', errors='ignore') as f:
        raw_text = f.read()
    
    text = clean_text(raw_text)
    
    print("📖 开始解析...")
    entries = parse_source(text)
    print(f"  初步提取: {len(entries)}条")
    
    entries = deduplicate(entries)
    print(f"  去重后: {len(entries)}条")
    
    # 清洗：修复因PDF换行导致的截断词（如"适度规模经" → 去掉孤立动词结尾）
    # 如果 word 末尾是动词单字且 meaning 中 word+"营/动/理/学" 有完整词，尝试补全
    TRUNCATION_FIX = {'经': '经营', '管': '管理', '合': '合作', '运': '运动', '统': '统一'}
    for e in entries:
        word = e['word']
        last_char = word[-1] if word else ''
        if last_char in TRUNCATION_FIX:
            full_suffix = TRUNCATION_FIX[last_char]
            # 如果补全后的词在 meaning 中存在，则使用补全词
            full_word = word[:-1] + full_suffix
            if full_word in e['meaning']:
                e['word'] = full_word
    
    entries = build_distractors(entries)
    print(f"  生成干扰项完成")
    
    self_check(entries)
    
    # 输出 JSON
    json_path = os.path.join(OUTPUT_DIR, 'political_theory.json')
    js_path = os.path.join(OUTPUT_DIR, 'political_theory.js')
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(entries, f, ensure_ascii=False, indent=2)
    
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write("export const initialPoliticalTheory = " + json.dumps(entries, ensure_ascii=False, indent=2) + ";\n")
    
    print(f"\n✅ 输出完成!")
    print(f"   JSON: {json_path}")
    print(f"   JS:   {js_path}")

if __name__ == '__main__':
    main()
