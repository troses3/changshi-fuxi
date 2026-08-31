import json
import re

with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
data = json.loads(m.group(1))

# Words to outright remove because they are OCR slicing garbage or non-exam grammatical words
DISCARD_WORDS = {
    '行列', '普及', '欧美之外首', '不仅仅', '开始', '进入', '来自', '成为',
    '具有', '要求', '提出', '强调', '通过', '经过', '不能', '作为'
}

# Repairs for functional verbs to substantive concepts
WORD_REPAIRS_MAP = {
    '中上': ('中上', '教育现代化发展总体水平跨入世界中上国家行列。', ['前列', '高收入', '中等']),
    '规模最大': ('规模最大', '经过长期努力，我国已建成世界上规模最大的教育体系。', ['质量最优', '结构最全', '覆盖最广']),
    '基本均衡': ('基本均衡', '县域义务教育基本均衡全面实现。', ['优质均衡', '完全均衡', '统筹协调']),
    '规模最宏大、门类最齐全': ('规模最宏大、门类最齐全', '我国已经发展成为全球规模最宏大、门类最齐全的人才资源大国。', ['结构最优化、布局最合理', '总量最充足、素质最过硬', '梯队最完善、机制最灵活']),
    '五成': ('五成', '民营企业对进出口和税收的贡献都在五成以上。', ['三成', '六成', '七成']),
    '研发费用加计扣除': ('研发费用加计扣除', '提高研发费用加计扣除比例。', ['增值税留抵退税', '企业所得税减免', '高新技术研发补贴']),
    '审判权和执行权分离': ('审判权和执行权分离', '深化审判权和执行权分离改革，健全国家执行体制。', ['立法权和行政权分离', '侦查权和公诉权分离', '决策权和监督权分离']),
    '审定分离': ('审定分离', '坚持审定分离，强化成本监审独立性。', ['收支两条线', '政企分开', '放管结合']),
    '中央财政支出比例': ('中央财政支出比例', '适当加强中央事权、提高中央财政支出比例。', ['地方财政支出比例', '一般公共预算比例', '专项转移支付比例']),
    '信任': ('以信任为基础的人才使用机制', '建立以信任为基础的人才使用机制。', ['以考核为核心的人才激励机制', '以竞争为导向的人才选拔机制', '以项目为载体的人才评价机制'])
}

def extract_tight_clause(full_text, keyword):
    """Extract only the single clause or sentence containing the target keyword."""
    # Split text by standard Chinese delimiters: periods, semicolons, or major commas if very long
    sentences = re.split(r'([。；])', full_text)
    
    # Reassemble with punctuation
    rebuilt_sentences = []
    for i in range(0, len(sentences)-1, 2):
        rebuilt_sentences.append(sentences[i] + sentences[i+1])
    if len(sentences) % 2 == 1 and sentences[-1].strip():
        rebuilt_sentences.append(sentences[-1])
        
    for s in rebuilt_sentences:
        if keyword in s:
            # Clean leading section numbers e.g. "一、教育强国经过长期努力" -> "经过长期努力"
            clean_s = re.sub(r'^[一二三四五六七八九十]+、\s*[\u4e00-\u9fa5]+\s*', '', s)
            clean_s = re.sub(r'^[一二三四五六七八九十]+、\s*', '', clean_s)
            clean_s = re.sub(r'^(（[0-9一二三四五六七八九十]+）|[①②③④⑤⑥⑦⑧⑨⑩]|—聚焦|[0-9]+\.|\([0-9]+\))\s*', '', clean_s)
            clean_s = clean_s.strip()
            if clean_s:
                return clean_s
                
    # Fallback to full text cleaned
    clean_full = re.sub(r'^[一二三四五六七八九十]+、\s*[\u4e00-\u9fa5]+\s*', '', full_text)
    return clean_full.strip()

clean_items = []
discarded_count = 0
repaired_count = 0

for item in data:
    w = item['word'].strip()
    m_text = item['meaning'].strip()
    
    # Discard non-exam words
    if w in DISCARD_WORDS:
        discarded_count += 1
        continue
        
    # Check if word is in repair map
    if w in WORD_REPAIRS_MAP:
        new_w, new_m, new_distractors = WORD_REPAIRS_MAP[w]
        w = new_w
        m_text = new_m
        hint = m_text.replace(w, "______")
        item['word'] = w
        item['meaning'] = m_text
        item['hint'] = hint
        item['distractors'] = [{"word": dw, "meaning": dw, "hint": dw} for dw in new_distractors]
        item['examples'] = [m_text]
        clean_items.append(item)
        repaired_count += 1
        continue
        
    # Trim giant paragraphs down to the exact clause containing the keyword
    if len(m_text) > 60 and any(p in m_text for p in ['。', '；', '，']):
        tight_m = extract_tight_clause(m_text, w)
        if w in tight_m:
            m_text = tight_m
            
    # Clean leading headers
    m_text = re.sub(r'^[一二三四五六七八九十]+、\s*[\u4e00-\u9fa5]+\s*', '', m_text)
    m_text = re.sub(r'^[一二三四五六七八九十]+、\s*', '', m_text)
    m_text = re.sub(r'^(（[0-9一二三四五六七八九十]+）|[①②③④⑤⑥⑦⑧⑨⑩]|—聚焦|[0-9]+\.|\([0-9]+\))\s*', '', m_text)
    m_text = m_text.strip()
    
    # Rebuild hint
    w_clean = re.sub(r'[“”"《》【】]', '', w)
    if f"“{w_clean}”" in m_text:
        hint = m_text.replace(f"“{w_clean}”", "“______”")
    elif w in m_text:
        hint = m_text.replace(w, "______")
    elif w_clean in m_text:
        hint = m_text.replace(w_clean, "______")
    else:
        hint = m_text
        
    # Sanitize double quotes around blank
    hint = hint.replace("““______””", "“______”")
    hint = hint.replace("“______””", "“______”")
    hint = hint.replace("““______”", "“______”")
    
    item['word'] = w
    item['meaning'] = m_text
    item['hint'] = hint
    item['examples'] = [m_text]
    clean_items.append(item)

print(f"Discarded {discarded_count} non-exam words")
print(f"Repaired {repaired_count} special items")
print(f"Total clean items: {len(clean_items)}")

# Save updated dataset
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(clean_items)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(clean_items, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
