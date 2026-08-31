import json
import re
import random

# Read existing database
with open('src/data/political_theory_chaoge_27.js', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'export\s+const\s+chaoge27PoliticalTheory\s*=\s*(\[.*\]);', content, re.DOTALL)
if not m:
    print("Error: Could not parse chaoge27PoliticalTheory")
    exit(1)

data = json.loads(m.group(1))
print(f"Total items loaded: {len(data)}")

# Comprehensive Taxonomies
POOLS = {
    "noun_2": [
        "魂脉", "根脉", "血脉", "文脉", "命脉", "支柱", "基石", "龙头", "基点",
        "核心", "主体", "主线", "底线", "红线", "源泉", "动力", "法宝", "堡垒",
        "先导", "纽带", "窗口", "前沿", "要义", "精髓", "主权", "安全", "发展"
    ],
    "verb_2": [
        "创新", "协调", "绿色", "开放", "共享", "发展", "改革", "稳定", "法治",
        "民主", "公平", "正义", "富强", "文明", "和谐", "美丽", "统筹", "协同",
        "深化", "巩固", "提升", "拓展", "完善", "规范", "引领", "驱动"
    ],
    "principles_4": [
        "守正创新", "稳中求进", "先立后破", "自信自立", "胸怀天下", "问题导向", 
        "系统观念", "人民至上", "实事求是", "解放思想", "与时俱进", "求真务实",
        "自立自强", "深化改革", "自我革命", "统筹兼顾", "底线思维", "战略思维",
        "辩证思维", "历史思维", "法治思维", "创新思维", "精准施策", "因地制宜",
        "固本培元", "革故鼎新", "立德树人", "教书育人", "破立并举", "久久为功"
    ],
    "position_4": [
        "根本保证", "根本目的", "根本动力", "根本途径", "根本遵循", "根本原则",
        "根本制度", "基本方略", "战略举措", "战略任务", "战略支撑", "首要任务",
        "重要基石", "重要保障", "坚强后盾", "本质要求", "内在要求", "必然要求",
        "制度保障", "物质基础", "精神力量", "政治保证", "组织保证", "坚实依托",
        "关键一招", "必由之路", "决定性因素", "战略导向", "制度支撑", "基础前提"
    ],
    "economic_4": [
        "新质生产力", "高质量发展", "供给侧改革", "全国统一大市场", "新型工业化",
        "新型城镇化", "乡村振兴", "数字经济", "实体经济", "民营经济", "先进制造",
        "现代服务", "专精特新", "隐形冠军", "龙头企业", "创新驱动", "现代流通",
        "要素市场", "公平竞争", "宏观调控", "有效市场", "有为政府", "营商环境"
    ],
    "core_num_5_6": [
        "“十个明确”", "“十四个坚持”", "“十三个方面成就”", "“六个必须坚持”", "“两个确立”", 
        "“两个维护”", "“四个意识”", "“四个自信”", "“四个全面”", "“五位一体”", 
        "“两个结合”", "“三新一高”", "“三大战役”", "“四大考验”", "“四种危险”"
    ],
    "modernization_features": [
        "人口规模巨大", "全体人民共同富裕", "物质文明和精神文明相协调", 
        "人与自然和谐共生", "走和平发展道路", "中国特色社会主义", "高质量发展",
        "发展全过程人民民主", "丰富人民精神世界", "实现全体人民共同富裕",
        "促进人与自然和谐共生", "推动构建人类命运共同体", "创造人类文明新形态"
    ],
    "phrases_6_8": [
        "富强民主文明和谐美丽", "社会主义现代化强国", "中华民族伟大复兴",
        "中国式现代化", "高水平科技自立自强", "全过程人民民主", "社会主义核心价值观",
        "绿水青山就是金山银山", "美丽中国建设", "党的自我革命", "全面从严治党",
        "依法治国和依规治党", "社会治理现代化", "国家安全体系", "人类命运共同体"
    ],
    "long_phrases": [
        "国内大循环为主体、国内国际双循环相互促进",
        "创新、协调、绿色、开放、共享",
        "坚持党的全面领导、坚持以人民为中心",
        "经济建设、政治建设、文化建设、社会建设、生态文明建设",
        "建设中国特色社会主义法治体系、建设社会主义法治国家",
        "听党指挥、能打胜仗、作风优良",
        "政治建军、改革强军、科技强军、人才强军、依法治军",
        "更为完善的制度保证、更为坚实的物质基础、更为主动的精神力量",
        "坚持人民至上、坚持自信自立、坚持守正创新、坚持问题导向、坚持系统观念、坚持胸怀天下"
    ],
    "philosophy": [
        "对立统一规律", "质量互变规律", "否定之否定规律", "主要矛盾和次要矛盾",
        "矛盾的主要方面和次要方面", "客观规律性与主观能动性", "感性认识与理性认识",
        "绝对真理与相对真理", "生产力与生产关系", "经济基础与上层建筑",
        "社会存在与社会意识", "唯物史观与唯心史观", "群众观点与群众路线",
        "普遍联系与永恒发展", "变与不变、继承与发展", "实践是检验真理的唯一标准"
    ]
}

# Explicit repairs for slice fragments
WORD_REPAIRS = {
    "城化": "同城化",
    "互相成": "互相成就",
    "海图强": "向海图强",
    "不能": "全盘接受",
    "既要": "创造更高效率",
    "又要": "维护社会公平",
    "摆脱": "摆脱传统增长方式",
    "超过": "发达国家总和",
    "高等": "高等教育",
    "基础": "基础教育",
    "质优": "高素质劳动者",
    "不仅是经济问题": "经济问题与政治问题",
    "不可能": "稳中求进、逐步实现",
    "十个明确”“十四个坚持”“十三个方面成": "“十个明确”“十四个坚持”“十三个方面成就”"
}

def clean_text_punctuation(text):
    if not text:
        return ""
    text = text.replace("o", "。")
    text = text.replace("”o", "”。")
    text = text.replace("’", "”")
    text = text.replace("‘", "“")
    text = text.replace(";", "；")
    text = text.replace("?", "？")
    text = text.replace("!", "！")
    return text

# Build all high-quality words pool
all_high_quality_words = set()
for item in data:
    w = item.get('word', '').strip()
    if len(w) >= 2 and w not in WORD_REPAIRS:
        all_high_quality_words.add(w)

all_words_list = list(all_high_quality_words)

def select_distractors(tw, chapter, group):
    tw_clean = re.sub(r'[“”"《》【】]', '', tw)
    L = len(tw_clean)
    
    candidates = []
    
    if any(p in tw for p in ["“", "”", "个明确", "个坚持", "个确立", "个维护", "个自信", "个意识", "个结合"]):
        pool = POOLS["core_num_5_6"]
        candidates = [w for w in pool if w != tw and re.sub(r'[“”"《》【】]', '', w) != tw_clean]
    elif any(p in tw for p in ["规律", "矛盾", "唯物", "辩证", "认识", "真理", "能动性", "生产力", "经济基础", "上层建筑"]):
        pool = POOLS["philosophy"]
        candidates = [w for w in pool if w != tw and abs(len(w) - len(tw)) <= 3]
    elif any(p in tw for p in ["根本", "重要", "战略", "基本", "首要", "坚强", "本质", "内在", "必然", "保证", "目的", "动力", "途径", "遵循", "方略", "举措", "支撑", "基石"]):
        pool = POOLS["position_4"]
        candidates = [w for w in pool if w != tw and len(w) == len(tw_clean)]
    elif L == 2:
        pool = POOLS["noun_2"] if any(p in tw for p in ["脉", "石", "头", "点", "心", "体", "线", "权", "安", "展"]) else POOLS["verb_2"]
        candidates = [w for w in pool if w != tw and len(w) == 2]
    elif L == 4:
        if any(p in tw for p in ["新质", "市场", "产业", "经济", "工业", "城镇", "发展", "开放", "制造"]):
            pool = POOLS["economic_4"] + POOLS["principles_4"]
        else:
            pool = POOLS["principles_4"] + POOLS["position_4"]
        candidates = [w for w in pool if w != tw and len(w) == 4]
    elif 5 <= L <= 8:
        pool = POOLS["phrases_6_8"] + POOLS["modernization_features"]
        candidates = [w for w in pool if w != tw and abs(len(w) - L) <= 2]
    elif L > 8:
        pool = POOLS["long_phrases"]
        candidates = [w for w in pool if w != tw and abs(len(w) - L) <= 6]
        
    # Supplement from same length words in dataset
    if len(candidates) < 3:
        same_len = [w for w in all_words_list if len(w) == len(tw) and w != tw and w not in candidates]
        random.shuffle(same_len)
        candidates.extend(same_len[:4])
        
    # Supplement from close length words
    if len(candidates) < 3:
        close_len = [w for w in all_words_list if abs(len(w) - len(tw)) <= 1 and w != tw and w not in candidates]
        random.shuffle(close_len)
        candidates.extend(close_len[:4])

    final_3 = candidates[:3]
    while len(final_3) < 3:
        final_3.append("科学理论指导")
        
    return [{"word": dw, "meaning": dw, "hint": dw} for dw in final_3]

cleaned_items = []
repaired_count = 0

for item in data:
    word = item.get('word', '').strip()
    meaning = clean_text_punctuation(item.get('meaning', '').strip())
    hint = clean_text_punctuation(item.get('hint', '').strip())
    examples = [clean_text_punctuation(ex) for ex in item.get('examples', [])]
    
    # Check if word needs repair
    if word in WORD_REPAIRS:
        word = WORD_REPAIRS[word]
        repaired_count += 1
        
    # Fix hint blank
    if word in meaning:
        hint = meaning.replace(word, "______")
    elif re.sub(r'[“”"《》【】]', '', word) in meaning:
        clean_w = re.sub(r'[“”"《》【】]', '', word)
        hint = meaning.replace(clean_w, "______")
    elif "______" not in hint:
        hint = meaning + "（考察考点：______）"
        
    # Fix trailing particles on blank
    hint = re.sub(r'______([就化性的])', r'______', hint)
    
    # Generate high standard distractors
    distractors = select_distractors(word, item.get('chapter', ''), item.get('group', ''))
    
    new_item = {
        "id": item.get('id', ''),
        "page": item.get('page', 0),
        "chapter": item.get('chapter', ''),
        "group": item.get('group', ''),
        "word": word,
        "meaning": meaning,
        "hint": hint,
        "distractors": distractors,
        "examples": examples if examples else [meaning]
    }
    cleaned_items.append(new_item)

print(f"Repaired {repaired_count} sliced words")
print(f"Total processed items: {len(cleaned_items)}")

# Verify no broken items
broken = 0
for idx, item in enumerate(cleaned_items):
    if '______' not in item['hint']:
        broken += 1
    if len(item['distractors']) != 3:
        broken += 1
    if item['word'] in [d['word'] for d in item['distractors']]:
        broken += 1

print(f"Verification: {broken} broken items (0 expected)")

# Save new JS file
js_output = f"// 2026年政治理论背诵手册 159页全量 (共 {len(cleaned_items)} 题)\nexport const chaoge27PoliticalTheory = " + json.dumps(cleaned_items, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/political_theory_chaoge_27.js', 'w', encoding='utf-8') as f:
    f.write(js_output)

print("Saved cleanly to src/data/political_theory_chaoge_27.js")
