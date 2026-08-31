import json
import re

def audit_dataset(filename, export_var):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    part1 = content.split('export const chaogeContrastItems')[0]
    m = re.search(rf'export\s+const\s+{export_var}\s*=\s*(\[.*\]);', part1, re.DOTALL)
    data = json.loads(m.group(1))

    print(f"\n{'='*60}")
    print(f"AUDITING {filename} -> {export_var} ({len(data)} items)")
    print(f"{'='*60}")

    derogatory_list = [
        '封闭僵化', '因循守旧', '照抄照搬', '老路邪路', '历史倒退', '过度商业化', 
        '依附大国', '闭关锁国', '盲目上马', '粗暴式关停', '形式化达标', '一刀切式停产',
        '消极懈怠', '腐化堕落', '弄虚作假', '脱离群众', '拜金主义', '铺张浪费'
    ]

    generic_fallbacks = [
        '守正创新', '稳中求进', '先立后破', '科学理论指导', '高水平科技自立自强', 
        '全过程人民民主', '社会主义核心价值观', '绿水青山就是金山银山'
    ]

    issues = []

    for idx, item in enumerate(data):
        w = item['word'].strip()
        w_clean = re.sub(r'[“”"《》【】]', '', w)
        hint = item['hint'].strip()
        clean_hint = hint.replace("______", "")
        distractors = [d['word'].strip() for d in item.get('distractors', [])]
        d_clean_list = [re.sub(r'[“”"《》【】]', '', d) for d in distractors]
        
        # 1. Distractor count
        if len(distractors) != 3 or len(set(distractors)) != 3:
            issues.append((idx + 1, item['id'], w, "Distractor count != 3", distractors, hint))
            continue
            
        # 2. Answer leak / match
        if w in distractors or w_clean in d_clean_list:
            issues.append((idx + 1, item['id'], w, "Distractor matches answer", distractors, hint))
            continue

        # 3. Derogatory words when stem is positive
        if not any(k in hint for k in ['不能', '严禁', '坚决', '反对', '克服', '防范', '危害', '考验', '危险', '毒瘤', '不正之风', '四风']):
            for d in distractors:
                if d in derogatory_list:
                    issues.append((idx + 1, item['id'], w, f"Derogatory distractor in positive stem: {d}", distractors, hint))
                    break

        # 4. Prefix/Suffix Morphological Asymmetry
        # 4.1 '伟大'
        if '伟大' in w:
            great_count = sum(1 for d in distractors if '伟大' in d)
            if great_count < 2:
                issues.append((idx + 1, item['id'], w, f"Prefix '伟大' asymmetry ({great_count}/3)", distractors, hint))
        # 4.2 '新时代'
        if w.startswith('新时代') and len(w_clean) > 4:
            new_count = sum(1 for d in distractors if d.startswith('新') or '时代' in d or len(d) >= 6)
            if new_count == 0:
                issues.append((idx + 1, item['id'], w, f"Prefix '新时代' asymmetry", distractors, hint))
        # 4.3 '中国式' or '中国特色'
        if ('中国式' in w or '中国特色' in w) and len(w_clean) > 4:
            cn_count = sum(1 for d in distractors if '中国' in d or '社会主义' in d or len(d) >= 6)
            if cn_count == 0:
                issues.append((idx + 1, item['id'], w, f"Prefix '中国特色' asymmetry", distractors, hint))

        # 5. Length severe mismatch (>4 chars difference) unless numeric
        if not any(char.isdigit() for char in w) and '%' not in w:
            for d in distractors:
                if abs(len(w_clean) - len(re.sub(r'[“”"《》【】]', '', d))) >= 5 and len(w_clean) >= 6:
                    issues.append((idx + 1, item['id'], w, f"Length mismatch: len({w})={len(w_clean)} vs len({d})={len(re.sub(r'[“”\"《》【】]', '', d))}", distractors, hint))
                    break

        # 6. Inappropriate generic fallback
        if any(g in distractors for g in generic_fallbacks):
            if any(char.isdigit() for char in w) or len(w_clean) < 4 or any(k in hint for k in ['会议', '大会', '年', '月', '日', '指出', '提出', '强调', '历史', '人物', '同志']):
                if w_clean not in ['守正创新', '系统观念', '问题导向', '胸怀天下']:
                    issues.append((idx + 1, item['id'], w, f"Inappropriate generic fallback", distractors, hint))

    print(f"Total Issues Found: {len(issues)}")
    for iss in issues[:25]:
        print(f"[{iss[0]}] ID: {iss[1]} | Word: 【{iss[2]}】 | Reason: {iss[3]}")
        print(f"     Hint: {iss[5]}")
        print(f"     Distractors: {iss[4]}")
        print("-" * 50)
        
    return issues

issues_cg27 = audit_dataset('src/data/political_theory_chaoge.js', 'chaogePoliticalTheory')
issues_cg26 = audit_dataset('src/data/political_theory_chaoge_27.js', 'chaoge27PoliticalTheory')
