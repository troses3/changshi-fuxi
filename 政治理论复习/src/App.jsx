import { useState, useEffect, useRef, useMemo } from 'react';
import { initialPoliticalTheory } from './data/political_theory';
import { chaogePoliticalTheory, chaogeContrastItems } from './data/political_theory_chaoge';
import { chaoge27PoliticalTheory } from './data/political_theory_chaoge_27';
import './App.css';

const getShortMeaning = (meaning) => {
  if (!meaning) return "";
  
  let parts = meaning.split('。')
    .map(p => p.trim())
    .filter(p => {
      if (!p) return false;
      if (p.includes('：') || p.includes(':')) return false;
      const isSynonymRef = p.startsWith('同“') || p.startsWith('同"') || p.startsWith('同「');
      return !isSynonymRef;
    });
    
  if (parts.length === 0) {
    return meaning;
  }
  
  const keywords = ['指', '是指', '是', '即', '属于', '体现了', '决定', '要求', '标志', '作为'];
  let firstKwIdx = -1;
  for (let idx = 0; idx < parts.length; idx++) {
    const part = parts[idx];
    if (keywords.some(kw => part.includes(kw))) {
      firstKwIdx = idx;
      break;
    }
  }
  
  if (firstKwIdx !== -1) {
    parts = parts.slice(firstKwIdx);
  }
  
  const result = parts.join('。') + (meaning.endsWith('。') ? '。' : '');
  if (result.replace(/[。，；、“”‘’（）]/g, '').trim().length > 1) {
    return result;
  }
  
  return meaning;
};

const escapeRegExp = (str) => {
  if (!str) return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const renderSentenceWithBlank = (sentence, word) => {
  if (!sentence) return '（暂无例句）';
  if (!word) return sentence;

  const escaped = escapeRegExp(word);
  const regex = new RegExp(escaped, 'g');
  if (regex.test(sentence)) {
    return sentence.replace(regex, '______');
  }

  const cleanWord = word.replace(/[“”"''《》【】]/g, '');
  if (cleanWord && cleanWord !== word) {
    const cleanEscaped = escapeRegExp(cleanWord);
    const cleanRegex = new RegExp(`[“"《]?${cleanEscaped}[”"》]?`, 'g');
    if (cleanRegex.test(sentence)) {
      return sentence.replace(cleanRegex, '______');
    }
  }

  return sentence;
};

const renderHighlightedSentence = (sentence, word) => {
  if (!sentence) return null;
  if (!word) return <span>{sentence}</span>;

  const escaped = escapeRegExp(word);
  let regex = new RegExp(`(${escaped})`, 'g');
  if (!regex.test(sentence)) {
    const cleanWord = word.replace(/[“”"''《》【】]/g, '');
    if (cleanWord && cleanWord !== word) {
      const cleanEscaped = escapeRegExp(cleanWord);
      regex = new RegExp(`([“"《]?${cleanEscaped}[”"》]?)`, 'g');
    }
  }

  const parts = sentence.split(regex);
  return parts.map((part, i) => {
    const isTarget = part === word || part.replace(/[“”"''《》【】]/g, '') === word.replace(/[“”"''《》【】]/g, '');
    return isTarget ? (
      <span key={i} className="filled-idiom">{part}</span>
    ) : (
      part
    );
  });
};

function SpeedItemCard({ item, idx, globalMasked }) {
  const [isRevealed, setIsRevealed] = useState(!globalMasked);

  useEffect(() => {
    setIsRevealed(!globalMasked);
  }, [globalMasked]);

  const displayEx = item.examples && item.examples.length > 0 ? item.examples[0] : item.meaning;
  const escaped = escapeRegExp(item.word);
  let regex = new RegExp(`(${escaped})`, 'g');
  if (!regex.test(displayEx)) {
    const cleanWord = item.word.replace(/[“”"''《》【】]/g, '');
    if (cleanWord && cleanWord !== item.word) {
      const cleanEscaped = escapeRegExp(cleanWord);
      regex = new RegExp(`([“"《]?${cleanEscaped}[”"》]?)`, 'g');
    }
  }
  const parts = displayEx ? displayEx.split(regex) : [item.meaning];

  const toggleReveal = (e) => {
    e.stopPropagation();
    setIsRevealed(prev => !prev);
  };

  return (
    <div className="speed-item-card" onClick={toggleReveal}>
      <div className="speed-word-row">
        <span className="speed-label">考点 {idx + 1}</span>
        <span 
          className={`speed-blank ${!isRevealed ? 'masked' : 'revealed'}`}
          onClick={toggleReveal}
          title={!isRevealed ? '点击揭晓' : '点击遮挡'}
        >
          {item.word}
        </span>
      </div>
      <div className="speed-meaning">
        {parts.map((part, i) => {
          const isTarget = part === item.word || part.replace(/[“”"''《》【】]/g, '') === item.word.replace(/[“”"''《》【】]/g, '');
          return isTarget ? (
            <span 
              key={i} 
              className={`speed-inline-blank ${!isRevealed ? 'masked' : 'revealed'}`}
              title={!isRevealed ? '点击揭晓' : '点击遮挡'}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </div>
    </div>
  );
}

function KnowledgeSentenceCard({ sentenceItem, searchQuery }) {
  const highlightMatch = (text, query) => {
    if (!query || !text) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="search-highlight">{part}</mark> : part
    );
  };

  const sentenceText = sentenceItem.meaning || sentenceItem.title || '';

  return (
    <div className="knowledge-sentence-card">
      <div className="knowledge-card-top">
        <span className="knowledge-chapter-name">{sentenceItem.chapter}</span>
        {sentenceItem.group && <span className="knowledge-group-name">· {sentenceItem.group}</span>}
      </div>

      <div className="knowledge-sentence-text">
        {highlightMatch(sentenceText, searchQuery)}
      </div>
    </div>
  );
}

function App() {
  const headerRef = useRef(null);
  const skipCategoryResetRef = useRef(true);
  const modeBarRef = useRef(null);
  const cardBackInnerRef = useRef(null);
  const actionButtonsRef = useRef(null);

  const [calculatedMarginTop, setCalculatedMarginTop] = useState(0);
  const [cardHeight, setCardHeight] = useState('340px');

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedDs = localStorage.getItem('pt-tracker-datasource') || 'huasheng';
    const savedMode = localStorage.getItem('pt-tracker-active-mode') || 'contrast';
    const saved = localStorage.getItem(`pt-tracker-current-index_${savedDs}_${savedMode}`);
    if (saved !== null) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 0) return parsed;
    }
    return 0;
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, unsure: 0, unknown: 0 });
  const [filter, setFilter] = useState('all'); // 'all', 'known', 'unsure', 'unknown'
  const [isRandom, setIsRandom] = useState(() => {
    return localStorage.getItem('pt-tracker-random') === 'true';
  });
  const [activeMode, setActiveMode] = useState(() => {
    return localStorage.getItem('pt-tracker-active-mode') || 'contrast';
  }); // 'quiz', 'speed', 'contrast'
  const [dataSource, setDataSource] = useState(() => {
    const saved = localStorage.getItem('pt-tracker-datasource');
    if (saved === 'chaoge') return 'chaoge26';
    return saved || 'huasheng';
  }); // 'huasheng', 'chaoge26', 'chaoge27'
  const [hideBlanksInSpeedMode, setHideBlanksInSpeedMode] = useState(true);
  const [currentExample, setCurrentExample] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem(`pt-tracker-current-index_${dataSource}_${activeMode}`, currentIndex);
  }, [currentIndex, dataSource, activeMode]);

  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 搜索查看独立状态：完全解耦，绝不污染正常刷题 cursor (currentIndex)
  const [inspectingSearchItem, setInspectingSearchItem] = useState(null);

  // Dynamic Vertical Centering Calculation (True Geometric Symmetry across all 3 steps)
  useEffect(() => {
    const calcMargin = () => {
      if (headerRef.current && modeBarRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom + window.scrollY;
        const modeBarTop = modeBarRef.current.getBoundingClientRect().top;
        const space = modeBarTop - headerBottom;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const gapPx = 0.75 * rem;

        let currentHeight = 340;
        if (isFlipped && cardBackInnerRef.current) {
          const cardH = Math.max(340, cardBackInnerRef.current.scrollHeight);
          if (selectedOption !== null) {
            // Step 3 (出答案): 将卡片高度 + 间距 + 底部操作按钮高度作为一个整体参与垂直居中
            const buttonsHeight = (actionButtonsRef.current && actionButtonsRef.current.offsetHeight) ? actionButtonsRef.current.offsetHeight : 44;
            const totalContentHeight = cardH + gapPx + buttonsHeight;
            let margin = (space - totalContentHeight) / 2 - gapPx;
            setCalculatedMarginTop(Math.max(0, margin));
            return;
          } else {
            // Step 2 (待作答): 居中背面选项卡片
            currentHeight = cardH;
          }
        }

        let margin = (space - currentHeight) / 2 - gapPx;
        setCalculatedMarginTop(Math.max(0, margin));
      }
    };
    
    setTimeout(calcMargin, 40);
    window.addEventListener('resize', calcMargin);
    
    const observer = new ResizeObserver(calcMargin);
    if (headerRef.current) observer.observe(headerRef.current);
    if (modeBarRef.current) observer.observe(modeBarRef.current);
    if (cardBackInnerRef.current) observer.observe(cardBackInnerRef.current);
    if (actionButtonsRef.current) observer.observe(actionButtonsRef.current);
    
    return () => {
      window.removeEventListener('resize', calcMargin);
      observer.disconnect();
    };
  }, [isFlipped, selectedOption, activeMode, currentIndex, isPanelOpen, isSearchOpen]);

  // Safe LocalStorage helpers
  const safeStorage = {
    get: (key) => {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    set: (key, val) => {
      try { localStorage.setItem(key, val); } catch (e) { console.warn('LocalStorage save failed:', e); }
    },
    remove: (key) => {
      try { localStorage.removeItem(key); } catch (e) {}
    }
  };

  useEffect(() => {
    safeStorage.set('pt-tracker-random', String(isRandom));
  }, [isRandom]);

  useEffect(() => {
    safeStorage.set('pt-tracker-active-mode', activeMode);
  }, [activeMode]);

  useEffect(() => {
    safeStorage.set('pt-tracker-datasource', dataSource);
  }, [dataSource]);

  // Load from local storage or initial with automatic schema synchronization
  useEffect(() => {
    let storageKey = 'pt-tracker-v17-huasheng';
    let oldKey = 'pt-tracker-v16-huasheng';
    let sourceData = initialPoliticalTheory;

    if (dataSource === 'chaoge26' || dataSource === 'chaoge') {
      if (activeMode === 'contrast') {
        storageKey = 'pt-tracker-v17-chaoge26-contrast';
        oldKey = 'pt-tracker-v16-chaoge26-contrast';
        sourceData = chaogeContrastItems;
      } else {
        storageKey = 'pt-tracker-v17-chaoge26-cloze';
        oldKey = 'pt-tracker-v16-chaoge26-cloze';
        sourceData = chaoge27PoliticalTheory; // 2026年政治理论背诵手册 159页全量 (2,163题)
      }
    } else if (dataSource === 'chaoge27') {
      if (activeMode === 'contrast') {
        storageKey = 'pt-tracker-v17-chaoge27-contrast';
        oldKey = 'pt-tracker-v16-chaoge27-contrast';
        sourceData = chaogeContrastItems;
      } else {
        storageKey = 'pt-tracker-v17-chaoge27-cloze';
        oldKey = 'pt-tracker-v16-chaoge27-cloze';
        sourceData = chaogePoliticalTheory; // 2027 纯享精选版 (137/421题)
      }
    }

    const stored = safeStorage.get(storageKey) || safeStorage.get(oldKey);
    let statusMap = {};
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach(i => {
            if (i.word && i.status) {
              statusMap[i.word] = i.status;
            }
          });
        } else if (typeof parsed === 'object' && parsed !== null) {
          statusMap = parsed;
        }
      } catch (e) {
        statusMap = {};
      }
    }
    
    // Always keep latest dataset definition and chapter taxonomy, preserving user's learning status
    const loadedItems = sourceData.map(item => ({
      ...item,
      status: statusMap[item.word] || 'new'
    }));

    setItems(loadedItems);

    const savedIndexKey = `pt-tracker-current-index_${dataSource}_${activeMode}`;
    const savedIndex = safeStorage.get(savedIndexKey);
    
    if (savedIndex !== null) {
      const parsed = parseInt(savedIndex, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < loadedItems.length) {
        setCurrentIndex(parsed);
      } else {
        setCurrentIndex(0);
      }
    } else {
      const isRandomStored = safeStorage.get('pt-tracker-random') === 'true';
      if (isRandomStored && loadedItems.length > 0) {
        const candidateIndices = [];
        loadedItems.forEach((item, index) => {
          if (item.status !== 'known') {
            candidateIndices.push(index);
          }
        });

        if (candidateIndices.length > 0) {
          const randIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
          setCurrentIndex(randIndex);
        } else {
          const randIndex = Math.floor(Math.random() * loadedItems.length);
          setCurrentIndex(randIndex);
        }
      } else {
        setCurrentIndex(0);
      }
    }
    
    setSelectedCategory('all');
    setFilter('all');
    setHistory([]);
    setIsFlipped(false);
    setSelectedOption(null);
  }, [dataSource, activeMode]);

  // Update stats & save status map only (super lightweight, 0 quota issues)
  useEffect(() => {
    if (items.length > 0) {
      const known = items.filter(i => i.status === 'known').length;
      const unsure = items.filter(i => i.status === 'unsure').length;
      const unknown = items.filter(i => i.status === 'unknown').length;
      setStats({ known, unsure, unknown });
      
      let storageKey = 'pt-tracker-v17-huasheng';
      if (dataSource === 'chaoge26' || dataSource === 'chaoge') {
        if (activeMode === 'contrast') {
          storageKey = 'pt-tracker-v17-chaoge26-contrast';
        } else {
          storageKey = 'pt-tracker-v17-chaoge26-cloze';
        }
      } else if (dataSource === 'chaoge27') {
        if (activeMode === 'contrast') {
          storageKey = 'pt-tracker-v17-chaoge27-contrast';
        } else {
          storageKey = 'pt-tracker-v17-chaoge27-cloze';
        }
      }
      
      const statusMap = {};
      items.forEach(i => {
        if (i.status && i.status !== 'new') {
          statusMap[i.word] = i.status;
        }
      });
      safeStorage.set(storageKey, JSON.stringify(statusMap));
    }
  }, [items, dataSource, activeMode]);

  // Filtered by chapter only (搜索完全解耦，不污染分类刷题列表)
  const currentCategoryItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.chapter === selectedCategory;
  });

  // 🔍 搜索结果按官方权威原句聚合去重（避免同一个原句因不同挖空词重复出现多张卡片）
  const searchMatchedSentences = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    const map = new Map();

    const targetList = items.filter(item => {
      if (selectedCategory === 'all') return true;
      return item.chapter === selectedCategory;
    });

    for (const item of targetList) {
      const w = (item.word || '').toLowerCase();
      const m = (item.meaning || '').toLowerCase();
      const h = (item.hint || '').toLowerCase();
      const t = (item.title || '').toLowerCase();
      const s = (item.subtitle || '').toLowerCase();
      
      const matches = w.includes(q) || m.includes(q) || h.includes(q) || t.includes(q) || s.includes(q);
      if (matches) {
        const sentenceKey = (item.meaning || item.title || item.word || '').trim();
        if (!map.has(sentenceKey)) {
          map.set(sentenceKey, {
            id: sentenceKey,
            chapter: item.chapter,
            group: item.group,
            meaning: item.meaning || item.title,
            words: item.word ? [item.word] : [],
          });
        } else {
          const existing = map.get(sentenceKey);
          if (item.word && !existing.words.includes(item.word)) {
            existing.words.push(item.word);
          }
        }
      }
    }
    return Array.from(map.values());
  }, [items, searchQuery, selectedCategory]);

  const safeIndex = (currentCategoryItems.length > 0 && currentIndex >= currentCategoryItems.length) ? 0 : currentIndex;
  const currentItem = inspectingSearchItem || currentCategoryItems[safeIndex] || (currentCategoryItems.length > 0 ? currentCategoryItems[0] : null);

  // Category switch
  useEffect(() => {
    if (currentCategoryItems.length === 0) return;
    
    if (skipCategoryResetRef.current) {
      skipCategoryResetRef.current = false;
      return;
    }

    if (isRandom) {
      setCurrentIndex(Math.floor(Math.random() * currentCategoryItems.length));
    } else {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
    setSelectedOption(null);
  }, [selectedCategory]);

  // Dynamic Height & Auto Scroll into view
  useEffect(() => {
    if (cardBackInnerRef.current) {
      const contentHeight = cardBackInnerRef.current.scrollHeight;
      setCardHeight(`${Math.max(340, contentHeight)}px`);
    }

    if (selectedOption !== null && (activeMode === 'quiz' || activeMode === 'contrast') && isFlipped) {
      const scrollTimer = setTimeout(() => {
        const actionBtnEl = actionButtonsRef.current;
        const floatingBarEl = document.querySelector('.floating-mode-bar');

        if (actionBtnEl && floatingBarEl) {
          const btnRect = actionBtnEl.getBoundingClientRect();
          const floatingRect = floatingBarEl.getBoundingClientRect();
          
          // 目标下间距：10px
          const targetGap = 10;
          const diff = btnRect.bottom - (floatingRect.top - targetGap);
          
          if (diff > 2) {
            window.scrollBy({
              top: diff,
              behavior: 'smooth'
            });
          }
        }
      }, 50);

      return () => clearTimeout(scrollTimer);
    } else if (!isFlipped) {
      // 翻转回正面时平滑复位至顶部，确保正面卡片绝对几何居中
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedOption, currentItem, isFlipped, activeMode]);

  // Shuffle options
  useEffect(() => {
    if (currentCategoryItems.length > 0 && currentItem && (activeMode === 'quiz' || activeMode === 'contrast')) {
      let distractors = currentItem.distractors || [];
      
      if (distractors.length < 3) {
        const sameGroupCandidates = currentCategoryItems.filter(i => i.group === currentItem.group && i.word !== currentItem.word);
        const shuffledGroupCandidates = [...sameGroupCandidates].sort(() => Math.random() - 0.5);
        const moreDistractors = shuffledGroupCandidates.slice(0, 3 - distractors.length);
        distractors = [...distractors, ...moreDistractors.map(d => ({ word: d.word, meaning: d.meaning, hint: d.hint || d.meaning }))];
      }

      if (distractors.length < 3) {
        const otherCandidates = items.filter(i => i.word !== currentItem.word && !distractors.some(d => d.word === i.word));
        const shuffledOtherCandidates = [...otherCandidates].sort(() => Math.random() - 0.5);
        const needed = 3 - distractors.length;
        distractors = [...distractors, ...shuffledOtherCandidates.slice(0, needed).map(d => ({ word: d.word, meaning: d.meaning, hint: d.hint || d.meaning }))];
      }

      const isWordOption = activeMode === 'quiz' || currentItem.questionType === 'word';
      const opts = [
        { 
          text: isWordOption ? currentItem.word : currentItem.meaning, 
          fullText: currentItem.meaning,
          isCorrect: true,
          word: currentItem.word
        },
        ...distractors.slice(0, 3).map(d => ({
          text: isWordOption ? d.word : d.meaning,
          fullText: d.meaning,
          isCorrect: false,
          word: d.word
        }))
      ];
      
      const shuffled = [...opts].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setSelectedOption(null);
      
      if (currentItem.examples && currentItem.examples.length > 0) {
        const randomEx = currentItem.examples[Math.floor(Math.random() * currentItem.examples.length)];
        setCurrentExample(randomEx);
      } else {
        setCurrentExample('');
      }
    }
  }, [currentIndex, currentCategoryItems.length, activeMode, selectedCategory]);

  const handleFilterClick = (targetFilter) => {
    if (filter === targetFilter) {
      setFilter('all');
      return;
    }
    const count = targetFilter === 'known' ? stats.known :
                  targetFilter === 'unsure' ? stats.unsure :
                  targetFilter === 'unknown' ? stats.unknown : 0;
    if (count === 0) {
      alert(`当前没有处于“${targetFilter === 'known' ? '已掌握' : targetFilter === 'unsure' ? '模糊' : '生词'}”状态的考点！`);
      return;
    }
    const targetIndex = currentCategoryItems.findIndex(i => i.status === targetFilter);
    if (targetIndex !== -1) {
      setFilter(targetFilter);
      setCurrentIndex(targetIndex);
      setIsFlipped(false);
      setSelectedOption(null);
    }
  };

  const handleNext = (status) => {
    if (!currentItem) return;

    // 如果当前处于搜索独立预览状态，更新状态后直接关闭预览，无缝回到主进度！
    if (inspectingSearchItem) {
      const realIndex = items.findIndex(i => i.word === inspectingSearchItem.word && i.group === inspectingSearchItem.group);
      if (realIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[realIndex].status = status;
        setItems(updatedItems);
      }
      setIsFlipped(false);
      setSelectedOption(null);
      setInspectingSearchItem(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const realIndex = items.findIndex(i => i.word === currentItem.word && i.group === currentItem.group);
    if (realIndex === -1) return;

    const updatedItems = [...items];
    updatedItems[realIndex].status = status;
    setItems(updatedItems);
    setIsFlipped(false);

    setHistory(prev => [...prev, currentIndex]);

    setTimeout(() => {
      let nextIndex = currentIndex;
      let activeFilter = filter;

      const updatedCategoryItems = updatedItems.filter(item => {
        if (selectedCategory === 'all') return true;
        return item.chapter === selectedCategory;
      });

      let candidates = [];
      if (filter !== 'all') {
        candidates = updatedCategoryItems
          .map((item, index) => ({ status: item.status, index }))
          .filter(item => item.status === filter)
          .map(item => item.index);
        
        if (candidates.length === 0) {
          activeFilter = 'all';
          setFilter('all');
          alert(`恭喜！你已复习完该分类下的所有考点，系统已自动切回“全部”模式。`);
        }
      }
      
      if (activeFilter === 'all') {
        if (isRandom) {
          const candidateIndices = [];
          updatedCategoryItems.forEach((item, index) => {
            if (item.status !== 'known') {
              candidateIndices.push(index);
            }
          });
          
          if (candidateIndices.length > 0) {
            let finalCandidates = candidateIndices;
            if (candidateIndices.length > 1) {
              finalCandidates = candidateIndices.filter(idx => idx !== currentIndex);
            }
            nextIndex = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
          } else {
            const allIndices = Array.from({length: updatedCategoryItems.length}, (_, i) => i);
            const otherIndices = allIndices.filter(idx => idx !== currentIndex);
            nextIndex = otherIndices.length > 0 
              ? otherIndices[Math.floor(Math.random() * otherIndices.length)]
              : 0;
          }
        } else {
          let found = false;
          for (let i = 0; i < updatedCategoryItems.length; i++) {
            let checkIndex = (currentIndex + 1 + i) % updatedCategoryItems.length;
            if (updatedCategoryItems[checkIndex].status !== 'known') {
              nextIndex = checkIndex;
              found = true;
              break;
            }
          }
          if (!found) {
            nextIndex = (currentIndex + 1) % updatedCategoryItems.length;
          }
        }
      } else {
        if (isRandom) {
          let finalCandidates = candidates;
          if (candidates.length > 1) {
            finalCandidates = candidates.filter(idx => idx !== currentIndex);
          }
          nextIndex = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
        } else {
          const nextCandidate = candidates.find(idx => idx > currentIndex);
          nextIndex = nextCandidate !== undefined ? nextCandidate : candidates[0];
        }
      }
      
      setCurrentIndex(nextIndex);
    }, 300);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentIndex(prevIndex);
      setIsFlipped(false);
      setSelectedOption(null);
    }
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setInspectingSearchItem(null);
  };

  const handleSelectSearchItem = (targetItem) => {
    setInspectingSearchItem(targetItem);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsFlipped(false);
    setSelectedOption(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'known': return 'rgba(16, 185, 129, 0.8)';
      case 'unsure': return 'rgba(245, 158, 11, 0.8)';
      case 'unknown': return 'rgba(239, 68, 68, 0.8)';
      default: return 'rgba(107, 114, 128, 0.8)';
    }
  };

  if (items.length === 0) return <div className="loading">加载政治理论题库中...</div>;

  const total = items.length;
  const progress = ((stats.known) / (total || 1)) * 100;

  return (
    <div className="app-container">
      <header className="header" ref={headerRef}>
        <div className="header-nav-bar">
          {/* 左上角：重置当前题库进度 */}
          <button 
            className="header-icon-btn reset-header-btn" 
            title="重置当前题库进度"
            onClick={() => {
              const dbName = dataSource === 'huasheng' ? '花生' : (dataSource === 'chaoge27' ? '超格(27)' : '超格(26)');
              if(window.confirm(`确定要重置当前数据库（${dbName}）的学习进度吗？`)) {
                let storageKey = 'pt-tracker-v17-huasheng';
                if (dataSource === 'chaoge26' || dataSource === 'chaoge') {
                  storageKey = activeMode === 'contrast' ? 'pt-tracker-v17-chaoge26-contrast' : 'pt-tracker-v17-chaoge26-cloze';
                } else if (dataSource === 'chaoge27') {
                  storageKey = activeMode === 'contrast' ? 'pt-tracker-v17-chaoge27-contrast' : 'pt-tracker-v17-chaoge27-cloze';
                }
                localStorage.removeItem(storageKey);
                window.location.reload();
              }
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
          </button>

          {/* 中间：可交互的沉浸指示胶囊（点击展开/收起题库与筛选控制面板） */}
          <button 
            className={`header-meta-pill ${isPanelOpen ? 'active' : ''}`}
            onClick={() => setIsPanelOpen(prev => !prev)}
            title={isPanelOpen ? "收起控制面板" : "展开题库与章节面板"}
          >
            <span className="pill-db-name">{dataSource === 'huasheng' ? '🥜 花生' : (dataSource === 'chaoge27' ? '📖 超格27' : '📖 超格26')}</span>
            <span className="pill-divider">·</span>
            <span className="pill-cat-name">
              {selectedCategory === 'all' ? '全部章节' : (
                selectedCategory.includes('十五五') ? '🚩 十五五' :
                selectedCategory.includes('马原') ? '🧠 马原政经' :
                selectedCategory.includes('新思想') || selectedCategory.includes('习近平') ? '🌟 新思想' :
                selectedCategory.includes('方针') || selectedCategory.includes('重大') ? '🚀 方针政策' :
                selectedCategory.includes('新法典') || selectedCategory.includes('时政') ? '🛡️ 时政法典' :
                selectedCategory.length > 6 ? selectedCategory.slice(0, 5) + '...' : selectedCategory
              )}
            </span>
            <span className="pill-progress-text">({safeIndex + 1}/{currentCategoryItems.length})</span>
            <span className={`pill-chevron ${isPanelOpen ? 'open' : ''}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>

          {/* 右上角：搜索按钮 */}
          <button 
            className={`header-icon-btn search-header-btn ${(isSearchOpen || searchQuery) ? 'active' : ''}`}
            title="搜索考点原句"
            onClick={() => {
              if (isSearchOpen || searchQuery) {
                handleCloseSearch();
              } else {
                handleOpenSearch();
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* 顶部展开式搜索栏 */}
        {(isSearchOpen || searchQuery.trim() !== '') && (
          <form 
            className="search-bar-box"
            onSubmit={(e) => {
              e.preventDefault();
              e.target.querySelector('input')?.blur();
            }}
          >
            <svg className="search-box-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="search"
              enterKeyHint="search"
              autoFocus
              className="search-box-input"
              placeholder={`搜索考点词、官方原句 (${items.length} 题)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.target.blur();
                }
              }}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-box-clear"
                onPointerDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseSearch();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCloseSearch();
                }}
                title="清空搜索"
              >
                ✕
              </button>
            )}
          </form>
        )}

        {/* 沉浸式下拉抽屉面板 */}
        {isPanelOpen && (
          <div className="progress-container panel-drawer-open">
            <div className="db-toggle-row">
              <div className="db-toggle">
                <button className={`db-btn ${dataSource === 'huasheng' ? 'active' : ''}`} onClick={() => setDataSource('huasheng')}>🥜 花生</button>
                <button className={`db-btn ${dataSource === 'chaoge26' || dataSource === 'chaoge' ? 'active' : ''}`} onClick={() => setDataSource('chaoge26')}>📖 超格(26)</button>
                <button className={`db-btn ${dataSource === 'chaoge27' ? 'active' : ''}`} onClick={() => setDataSource('chaoge27')}>📖 超格(27)</button>
              </div>
            </div>

            <div className="stats-row">
              <div className="stats">
                <button 
                  className={`stat-item ${filter === 'known' ? 'active-known' : ''}`}
                  onClick={() => handleFilterClick('known')}
                  title="只复习已掌握"
                >
                  <span className="dot dot-known"></span>
                  已掌握: <span className="stat-count">{stats.known}</span>
                </button>

                <button 
                  className={`stat-item ${filter === 'unsure' ? 'active-unsure' : ''}`}
                  onClick={() => handleFilterClick('unsure')}
                  title="只复习模糊"
                >
                  <span className="dot dot-unsure"></span>
                  模糊: <span className="stat-count">{stats.unsure}</span>
                </button>

                <button 
                  className={`stat-item ${filter === 'unknown' ? 'active-unknown' : ''}`}
                  onClick={() => handleFilterClick('unknown')}
                  title="只复习生词"
                >
                  <span className="dot dot-unknown"></span>
                  生词: <span className="stat-count">{stats.unknown}</span>
                </button>

                <button 
                  className={`stat-item ${filter === 'all' ? 'active-all' : ''}`}
                  onClick={() => setFilter('all')}
                  title="查看全部"
                >
                  总计: <span className="stat-count">{total}</span>
                </button>
              </div>
            </div>

            {/* 单行横向滑动章节栏 */}
            <div className="category-scroll-container">
              <div className="category-scroll-track">
                {dataSource === 'huasheng' ? [
                  { key: 'all', label: '全部章节' },
                  { key: '第一章 十五五规划专题', label: '🚩 十五五规划' },
                  { key: '第二章 马克思主义基本原理', label: '🧠 马原政经' },
                  { key: '第三章 习近平新时代思想', label: '🌟 习近平新时代思想' },
                  { key: '第四章 最新重要方针政策', label: '🚀 重大方针政策' },
                  { key: '第五章 2026新法典与时政考察', label: '🛡️ 新法典与时政' },
                ].map(cat => (
                  <button
                    key={cat.key}
                    className={`cat-chip ${selectedCategory === cat.key ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                    }}
                  >
                    {cat.label}
                  </button>
                )) : (dataSource === 'chaoge26' || dataSource === 'chaoge') ? [
                  { key: 'all', label: '全部章节' },
                  { key: '第一章 习近平新时代思想', label: '🌟 习近平新时代思想' },
                  { key: '第二章 时政理论与重大部署', label: '🚀 时政理论与重大部署' },
                  { key: '第三章 2026新法典与热点专题', label: '🛡️ 新法典与热点' },
                ].map(cat => (
                  <button
                    key={cat.key}
                    className={`cat-chip ${selectedCategory === cat.key ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                    }}
                  >
                    {cat.label}
                  </button>
                )) : [
                  { key: 'all', label: '全部章节' },
                  { key: '第一部分 创新理论与新时代', label: '🌟 创新理论与新时代' },
                  { key: '第二部分 改革发展与国家治理', label: '🚀 改革发展与国治' },
                  { key: '第三部分 2027备考前瞻与新法', label: '🛡️ 备考前瞻与新法' },
                ].map(cat => (
                  <button
                    key={cat.key}
                    className={`cat-chip ${selectedCategory === cat.key ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="main-content">
        {searchQuery.trim() !== '' ? (
          <div className="search-knowledge-view">
            <div className="search-results-bar">
              <span className="search-count-text">
                共匹配到 <strong>{searchMatchedSentences.length}</strong> 条官方原句
              </span>
              <button className="search-clear-action-btn" onClick={handleCloseSearch}>
                清空搜索
              </button>
            </div>

            {searchMatchedSentences.length === 0 ? (
              <div className="empty-state-card">
                <h3>未找到匹配原句</h3>
                <p>请尝试缩短关键词，或切换上方全部章节与题库</p>
                <button className="empty-state-btn" onClick={handleCloseSearch}>
                  清空搜索
                </button>
              </div>
            ) : (
              <div className="knowledge-cards-list">
                {searchMatchedSentences.map((sent, idx) => (
                  <KnowledgeSentenceCard
                    key={`${sent.id}-${idx}`}
                    sentenceItem={sent}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 从搜索结果临时跳转时的醒目返回胶囊 */}
            {inspectingSearchItem && (
              <div className="search-return-banner">
                <div className="banner-info">
                  <span className="banner-badge">搜索结果</span>
                  <span className="banner-tip">正在练习搜索选中的考点</span>
                </div>
                <button className="banner-return-btn" onClick={() => setInspectingSearchItem(null)}>
                  ↩️ 返回原刷题进度 (第 {safeIndex + 1} 题)
                </button>
              </div>
            )}

            {/* 卡片模式：挖空特训 & 易混辨析 */}
            {(activeMode === 'quiz' || activeMode === 'contrast') && (
              <>
                <div className={`card-container ${selectedOption !== null ? 'expanded' : ''}`} style={{ height: isFlipped ? cardHeight : '340px', marginTop: `${calculatedMarginTop}px` }} onClick={() => setIsFlipped(!isFlipped)}>
                  <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                    {/* 卡片正面 */}
                    <div className="card-front">
                      <div className="card-top-bar">
                        <div className="group-tag" style={{ margin: 0 }}>
                          {currentItem.group && currentItem.subcategory && currentItem.group !== currentItem.subcategory 
                            ? `${currentItem.group} · ${currentItem.subcategory}` 
                            : (currentItem.group || currentItem.subcategory || currentItem.chapter || '')}
                        </div>
                        {currentItem.status !== 'new' && (
                          <div className="status-badge-inline" style={{ backgroundColor: getStatusColor(currentItem.status) }}>
                            上次标记: {currentItem.status === 'known' ? '认识' : currentItem.status === 'unsure' ? '模糊' : '不认识'}
                          </div>
                        )}
                      </div>
                      
                      <div className="card-front-center-content">
                        {activeMode === 'quiz' ? (
                          <h2 className="idiom-word sentence-blank" style={{ margin: 0, width: '100%', textAlign: 'justify', lineHeight: '1.65' }}>
                            {renderSentenceWithBlank(currentExample || currentItem.meaning, currentItem.word)}
                          </h2>
                        ) : (
                          <div className="contrast-front-container" style={{ width: '100%' }}>
                            <h2 className="contrast-front-title">
                              {currentItem.title || currentItem.word}
                            </h2>
                            <div className="contrast-front-sub">
                              {currentItem.subtitle || `请辨析【${currentItem.word}】的科学定位与对应官方论断`}
                            </div>
                          </div>
                        )}
                        <div className="card-hint" style={{ marginTop: '1.25rem', width: '100%', textAlign: 'center' }}>
                          点击翻转查看{activeMode === 'quiz' ? '备选考点词' : '辨析选项'}
                        </div>
                      </div>
                    </div>

                    {/* 卡片反面 */}
                    <div className="card-back">
                      <div className="card-back-inner" ref={cardBackInnerRef}>
                        <div className="group-tag">
                          {currentItem.group && currentItem.subcategory && currentItem.group !== currentItem.subcategory 
                            ? `${currentItem.group} · ${currentItem.subcategory}` 
                            : (currentItem.group || currentItem.subcategory || currentItem.chapter || '')}
                        </div>
                        <div className="card-back-content">
                          {activeMode === 'quiz' ? (
                            <>
                              <div className="sentence-question">
                                {renderSentenceWithBlank(currentExample || currentItem.meaning, currentItem.word)}
                              </div>
                              <div className="quiz-title">请选择正确的考点词：</div>
                            </>
                          ) : (
                            <>
                              <h3 style={{ marginBottom: '0.4rem', color: 'var(--text-primary)' }}>【{currentItem.title || currentItem.word}】</h3>
                              <div className="sentence-question contrast-question-title" style={{ fontSize: '0.98rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'left', lineHeight: '1.45' }}>
                                {currentItem.question || `请选择与【${currentItem.word}】严格对应的科学论断：`}
                              </div>
                            </>
                          )}

                          <div className={`options-container ${(activeMode === 'quiz' || currentItem.questionType === 'word') ? 'options-grid-2x2' : 'options-vertical-contrast'} ${selectedOption === null ? 'quiz-not-answered' : ''}`}>
                            {shuffledOptions.map((opt, index) => {
                              let btnClass = "option-btn";
                              if (selectedOption !== null) {
                                if (opt.isCorrect) {
                                  btnClass += " correct";
                                } else if (selectedOption === index) {
                                  btnClass += " incorrect";
                                }
                                btnClass += " disabled";
                              }

                              return (
                                <button
                                  key={index}
                                  className={btnClass}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (selectedOption === null) {
                                      setSelectedOption(index);
                                    }
                                  }}
                                  disabled={selectedOption !== null}
                                >
                                  <span className="option-label">
                                    {selectedOption !== null && opt.isCorrect ? '✓ ' : selectedOption !== null && selectedOption === index ? '✗ ' : `${['A', 'B', 'C', 'D'][index]}. `}
                                  </span>
                                  <span className={(activeMode === 'quiz' || currentItem.questionType === 'word') ? 'option-text-word' : 'option-text'}>{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* 挖空特训作答反馈 */}
                          {activeMode === 'quiz' && selectedOption !== null && (
                            <div className="quiz-feedback-details">
                              <div className="example-item highlighted-example">
                                <strong>🎯 官方原文：</strong>
                                <span>
                                  {renderHighlightedSentence(currentExample || currentItem.meaning, currentItem.word)}
                                </span>
                              </div>
                              {selectedOption !== null && !shuffledOptions[selectedOption]?.isCorrect && (
                                <div className="incorrect-choice-tip">
                                  你误选了 <strong>【{shuffledOptions[selectedOption]?.word}】</strong>，正确考点应为 <strong>【{currentItem.word}】</strong>
                                </div>
                              )}
                            </div>
                          )}

                          {/* 易混辨析作答反馈：权威对照解析 */}
                          {activeMode === 'contrast' && selectedOption !== null && (
                            <div className="contrast-feedback-details">
                              <div className="explanation-title">💡 易混考点权威辨析：</div>
                              <div className="contrast-explanation-list">
                                <div className="contrast-exp-item main-exp">
                                  <span className="exp-badge correct-badge">正确项</span>
                                  <strong className="exp-word">【{currentItem.word}】</strong>：
                                  <span className="exp-meaning">{currentItem.meaning}</span>
                                </div>
                                {currentItem.distractors && currentItem.distractors.map((d, dIdx) => (
                                  <div key={dIdx} className="contrast-exp-item distractor-exp">
                                    <span className="exp-badge dist-badge">易混项</span>
                                    <strong className="exp-word">【{d.word}】</strong>：
                                    <span className="exp-meaning">{d.meaning}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部操作按钮 */}
                <div 
                  ref={actionButtonsRef}
                  className={`action-buttons ${(!isFlipped || selectedOption === null) ? 'hidden' : ''}`}
                >
                  <button className="btn btn-prev" onClick={handlePrev} disabled={history.length === 0}>
                    上一题
                  </button>
                  <button className="btn btn-unknown" onClick={(e) => { e.stopPropagation(); handleNext('unknown'); }}>
                    不认识
                  </button>
                  <button className="btn btn-unsure" onClick={(e) => { e.stopPropagation(); handleNext('unsure'); }}>
                    模糊
                  </button>
                  <button className="btn btn-known" onClick={(e) => { e.stopPropagation(); handleNext('known'); }}>
                    认识
                  </button>
                </div>
              </>
            )}

            {/* 扩展模式：速览速记 */}
            {activeMode === 'speed' && (
              <div className="list-mode-container">
                <div className="list-mode-header">
                  <h3>速览速记 - {currentCategoryItems.length} 个考点</h3>
                  <button className="toggle-mask-btn" onClick={() => setHideBlanksInSpeedMode(!hideBlanksInSpeedMode)}>
                    {hideBlanksInSpeedMode ? '揭晓全部' : '遮挡考点'}
                  </button>
                </div>
                {currentCategoryItems.map((item, idx) => (
                  <SpeedItemCard 
                    key={`${item.word}-${idx}`} 
                    item={item} 
                    idx={idx} 
                    globalMasked={hideBlanksInSpeedMode} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* 底部悬浮模式栏（极简单层设计，无多层套娃） */}
      <nav className="floating-mode-bar" ref={modeBarRef}>
        <button className={`mode-btn ${activeMode === 'contrast' ? 'active' : ''}`} onClick={() => setActiveMode('contrast')}>
          易混辨析
        </button>
        <button className={`mode-btn ${activeMode === 'quiz' ? 'active' : ''}`} onClick={() => setActiveMode('quiz')}>
          挖空特训
        </button>
        <button className={`mode-btn ${activeMode === 'speed' ? 'active' : ''}`} onClick={() => setActiveMode('speed')}>
          速览速记
        </button>

        <span className="mode-divider"></span>

        <button className={`mode-btn random-btn ${!isRandom ? 'active' : ''}`} onClick={() => setIsRandom(false)}>
          顺序
        </button>
        <button className={`mode-btn random-btn ${isRandom ? 'active' : ''}`} onClick={() => setIsRandom(true)}>
          随机
        </button>
      </nav>
    </div>
  );
}

export default App;

// vercel trigger 2026-08-31 14:15
