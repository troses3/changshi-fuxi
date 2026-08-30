import { useState, useEffect, useRef } from 'react';
import { initialIdioms } from './data/idioms';
import './App.css';

const STORAGE_KEY = 'idiom-tracker-data-v5';

const getShortMeaning = (meaning) => {
  if (!meaning) return "";
  
  // Split by Chinese period
  let parts = meaning.split('。')
    .map(p => p.trim())
    .filter(p => {
      if (!p) return false;
      if (p.includes('：') || p.includes(':')) return false; // Filter out parts with colons
      
      // Filter out references starting with "同“" or "同 \"" or similar
      const isSynonymRef = p.startsWith('同“') || p.startsWith('同"') || p.startsWith('同「') || p.startsWith('同 \'') || p.startsWith('同\'');
      return !isSynonymRef;
    });
    
  if (parts.length === 0) {
    return meaning; // Fallback if everything is filtered out
  }
  
  const keywords = ['比喻', '形容', '指', '是指', '后指', '多形容', '后多比喻', '也比喻', '用于', '表示', '意思是', '本意指', '通常指'];
  
  // Find first part containing a keyword
  let firstKwIdx = -1;
  for (let idx = 0; idx < parts.length; idx++) {
    const part = parts[idx];
    if (keywords.some(kw => part.includes(kw))) {
      firstKwIdx = idx;
      break;
    }
  }
  
  if (firstKwIdx !== -1) {
    const matchedPart = parts[firstKwIdx];
    // If the matched keyword starts with "也" (e.g. "也比喻", "也指", "也形容"),
    // it implies the literal part and metaphorical part are complementary,
    // so we preserve the original full meaning.
    const startsWithAlso = matchedPart.startsWith('指导') ? false : (
      matchedPart.startsWith('也比喻') || 
      matchedPart.startsWith('也指') || 
      matchedPart.startsWith('也形容') || 
      matchedPart.startsWith('也用于') || 
      matchedPart.startsWith('也表示')
    );
    
    if (!startsWithAlso) {
      // Discard all parts before the keyword part (which are likely pure literal meanings)
      parts = parts.slice(firstKwIdx);
    }
  }
  
  // Extra layer of cleaning: double check inside the final parts to strip any inner "同“..." sentences
  parts = parts.filter(p => {
    const isSynonymRef = p.startsWith('同“') || p.startsWith('同"') || p.startsWith('同「') || p.startsWith('同 \'') || p.startsWith('同\'');
    return !isSynonymRef;
  });
  
  const result = parts.join('。') + (meaning.endsWith('。') ? '。' : '');
  
  // Safe fallback if resulting string is too short/empty
  if (result.replace(/[。，；、“”‘’（）]/g, '').trim().length > 1) {
    return result;
  }
  
  return meaning;
};

const renderHighlightedText = (text, query) => {
  if (!text) return '';
  if (!query || !query.trim()) return text;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) => {
    return regex.test(part) ? (
      <span key={i} className="highlight">
        {part}
      </span>
    ) : (
      part
    );
  });
};

function App() {
  // 智能合并最新成语数据库与本地用户学习状态
  const [idioms, setIdioms] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY) || 
                   localStorage.getItem('idiom-tracker-data-v4') || 
                   localStorage.getItem('idiom-tracker-data-v3') || 
                   localStorage.getItem('idiom-tracker-data-v2') || 
                   localStorage.getItem('idiom-tracker-data');
    const statusMap = {};
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach(p => {
            if (p.word && p.status && p.status !== 'new') {
              statusMap[p.word] = p.status;
            }
          });
        }
      } catch (e) {}
    }
    return initialIdioms.map(item => ({
      ...item,
      status: statusMap[item.word] || 'new'
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, unsure: 0, unknown: 0 });
  const [filter, setFilter] = useState('all'); // 'all', 'known', 'unsure', 'unknown'
  const [isRandom, setIsRandom] = useState(() => {
    return localStorage.getItem('idiom-tracker-random') === 'true';
  });
  const [quizMode, setQuizMode] = useState(() => {
    return localStorage.getItem('idiom-tracker-quiz-mode') || 'meaning'; // 'meaning' or 'sentence'
  });
  const [currentExample, setCurrentExample] = useState('');
  const [history, setHistory] = useState([]); // Track navigation history

  // New UI states and refs
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const headerRef = useRef(null);
  const modeBarRef = useRef(null);
  const actionButtonsRef = useRef(null);
  const [calculatedMarginTop, setCalculatedMarginTop] = useState(0);

  // 搜索前进度现场快照与一键返回状态
  const preSearchStateRef = useRef(null);
  const [returnToPreSearch, setReturnToPreSearch] = useState(null);

  const searchMatchedIdioms = (searchQuery && searchQuery.trim() !== '') 
    ? idioms.filter(item => {
        const q = searchQuery.trim().toLowerCase();
        return (
          item.word.toLowerCase().includes(q) ||
          (item.meaning && item.meaning.toLowerCase().includes(q)) ||
          (item.group && item.group.toLowerCase().includes(q)) ||
          (item.subcategory && item.subcategory.toLowerCase().includes(q))
        );
      })
    : [];

  const handleOpenSearch = () => {
    if (!preSearchStateRef.current) {
      preSearchStateRef.current = {
        index: currentIndex,
        filter: filter,
        quizMode: quizMode,
        displayIndex: currentIndex + 1,
        total: idioms.length
      };
    }
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    // 若未通过搜索结果跳转，则自动恢复搜索前现场
    if (preSearchStateRef.current && !returnToPreSearch) {
      const snap = preSearchStateRef.current;
      setFilter(snap.filter);
      setCurrentIndex(snap.index);
      setIsFlipped(false);
      setSelectedOption(null);
      preSearchStateRef.current = null;
    }
  };

  const handleSelectSearchItem = (targetItem) => {
    const snap = preSearchStateRef.current || {
      index: currentIndex,
      filter: filter,
      quizMode: quizMode,
      displayIndex: currentIndex + 1,
      total: idioms.length
    };
    setReturnToPreSearch(snap);
    preSearchStateRef.current = null;

    setHistory(prev => [...prev, currentIndex]);

    const targetIndex = idioms.findIndex(i => i.word === targetItem.word);
    if (targetIndex !== -1) {
      setFilter('all');
      setSearchQuery('');
      setIsSearchOpen(false);
      setCurrentIndex(targetIndex);
      setIsFlipped(false);
      setSelectedOption(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestorePreSearch = () => {
    if (returnToPreSearch) {
      setFilter(returnToPreSearch.filter);
      setCurrentIndex(returnToPreSearch.index);
      setIsFlipped(false);
      setSelectedOption(null);
      setReturnToPreSearch(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    localStorage.setItem('idiom-tracker-random', isRandom);
  }, [isRandom]);

  useEffect(() => {
    localStorage.setItem('idiom-tracker-quiz-mode', quizMode);
  }, [quizMode]);

  useEffect(() => {
    // Pick a random starting index if random mode is active on load
    const isRandomStored = localStorage.getItem('idiom-tracker-random') === 'true';
    if (isRandomStored && idioms.length > 0) {
      const candidateIndices = [];
      idioms.forEach((idiom, index) => {
        if (idiom.status !== 'known') {
          candidateIndices.push(index);
        }
      });

      if (candidateIndices.length > 0) {
        const randIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
        setCurrentIndex(randIndex);
      } else {
        const randIndex = Math.floor(Math.random() * idioms.length);
        setCurrentIndex(randIndex);
      }
    }
  }, []);

  useEffect(() => {
    if (idioms.length > 0) {
      const known = idioms.filter(i => i.status === 'known').length;
      const unsure = idioms.filter(i => i.status === 'unsure').length;
      const unknown = idioms.filter(i => i.status === 'unknown').length;
      setStats({ known, unsure, unknown });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(idioms));
    }
  }, [idioms]);

  const currentIdiom = idioms[currentIndex];

  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  const cardBackInnerRef = useRef(null);
  const [cardHeight, setCardHeight] = useState('340px');

  // Dynamic Height & Auto Scroll into view (Aligned with 政治理论标准)
  useEffect(() => {
    if (cardBackInnerRef.current) {
      const contentHeight = cardBackInnerRef.current.scrollHeight;
      setCardHeight(`${Math.max(340, contentHeight)}px`);
    }

    if (selectedOption !== null && isFlipped) {
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
  }, [selectedOption, currentIdiom, isFlipped, quizMode]);

  // Precise Vertical Centering Logic (True Geometric Symmetry across all 3 steps)
  useEffect(() => {
    const calculateMargin = () => {
      if (headerRef.current && modeBarRef.current && searchQuery.trim() === '') {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom + window.scrollY;
        const modeBarTop = modeBarRef.current.getBoundingClientRect().top;
        const space = modeBarTop - headerBottom;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const gapPx = 0.75 * rem;

        let currentHeight = 340;
        if (isFlipped && cardBackInnerRef.current) {
          const cardH = Math.max(340, cardBackInnerRef.current.scrollHeight);
          if (selectedOption !== null) {
            const buttonsH = (actionButtonsRef.current && actionButtonsRef.current.offsetHeight) ? actionButtonsRef.current.offsetHeight : 44;
            const totalContentHeight = cardH + gapPx + buttonsH;
            let margin = (space - totalContentHeight) / 2 - gapPx;
            setCalculatedMarginTop(Math.max(0, margin));
            return;
          } else {
            currentHeight = cardH;
          }
        }

        let margin = (space - currentHeight) / 2 - gapPx;
        setCalculatedMarginTop(Math.max(0, margin));
      }
    };

    setTimeout(calculateMargin, 40);
    window.addEventListener('resize', calculateMargin);
    
    const observer = new ResizeObserver(calculateMargin);
    if (headerRef.current) observer.observe(headerRef.current);
    if (modeBarRef.current) observer.observe(modeBarRef.current);
    if (cardBackInnerRef.current) observer.observe(cardBackInnerRef.current);
    if (actionButtonsRef.current) observer.observe(actionButtonsRef.current);

    return () => {
      window.removeEventListener('resize', calculateMargin);
      observer.disconnect();
    };
  }, [searchQuery, isSearchOpen, isPanelOpen, isFlipped, selectedOption, currentIndex, quizMode]);

  useEffect(() => {
    if (idioms.length > 0 && currentIdiom) {
      const targetText = quizMode === 'sentence' ? currentIdiom.word : getShortMeaning(currentIdiom.meaning);
      
      // Find candidates in the same group
      const sameGroupCandidates = idioms.filter(i => {
        if (i.word === currentIdiom.word) return false;
        if (quizMode === 'meaning' && getShortMeaning(i.meaning) === targetText) return false;
        return i.group === currentIdiom.group;
      });
      
      let distractors = [];
      const shuffledGroupCandidates = [...sameGroupCandidates].sort(() => Math.random() - 0.5);
      for (const cand of shuffledGroupCandidates) {
        if (distractors.length >= 3) break;
        const candText = quizMode === 'sentence' ? cand.word : getShortMeaning(cand.meaning);
        if (!distractors.some(d => (quizMode === 'sentence' ? d.word === cand.word : getShortMeaning(d.meaning) === candText))) {
          distractors.push(cand);
        }
      }
      
      // If we don't have enough, pick from other groups
      if (distractors.length < 3) {
        const otherCandidates = idioms.filter(i => {
          if (i.word === currentIdiom.word) return false;
          if (distractors.some(d => d.word === i.word)) return false;
          if (quizMode === 'meaning') {
            const sm = getShortMeaning(i.meaning);
            if (sm === targetText || distractors.some(d => getShortMeaning(d.meaning) === sm)) return false;
          }
          return true;
        });
        const shuffledOtherCandidates = [...otherCandidates].sort(() => Math.random() - 0.5);
        const needed = 3 - distractors.length;
        distractors = [...distractors, ...shuffledOtherCandidates.slice(0, needed)];
      }

      const opts = [
        { 
          text: targetText, 
          fullText: currentIdiom.meaning,
          isCorrect: true,
          word: currentIdiom.word
        },
        ...distractors.map(d => ({
          text: quizMode === 'sentence' ? d.word : getShortMeaning(d.meaning),
          fullText: d.meaning,
          isCorrect: false,
          word: d.word
        }))
      ];
      
      // Shuffle the 4 options randomly
      const shuffled = [...opts].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setSelectedOption(null);
      
      if (currentIdiom.examples && currentIdiom.examples.length > 0) {
        const randomEx = currentIdiom.examples[Math.floor(Math.random() * currentIdiom.examples.length)];
        setCurrentExample(randomEx);
      } else {
        setCurrentExample('');
      }
    }
  }, [currentIndex, idioms.length, quizMode]);

  const handleFilterClick = (targetFilter) => {
    if (filter === targetFilter) {
      setFilter('all');
      return;
    }
    const count = targetFilter === 'known' ? stats.known :
                  targetFilter === 'unsure' ? stats.unsure :
                  targetFilter === 'unknown' ? stats.unknown : 0;
    if (count === 0) {
      alert(`当前没有处于“${targetFilter === 'known' ? '已掌握' : targetFilter === 'unsure' ? '模糊' : '生词'}”状态的成语！`);
      return;
    }
    const targetIndex = idioms.findIndex(i => i.status === targetFilter);
    if (targetIndex !== -1) {
      setFilter(targetFilter);
      setCurrentIndex(targetIndex);
      setIsFlipped(false);
      setSelectedOption(null);
    }
  };

  const handleNext = (status) => {
    const updatedIdioms = [...idioms];
    updatedIdioms[currentIndex].status = status;
    setIdioms(updatedIdioms);
    setIsFlipped(false);
    
    // Save to history before navigating
    setHistory(prev => [...prev, currentIndex]);

    // Select next idiom index
    setTimeout(() => {
      let nextIndex = currentIndex;
      let activeFilter = filter;
      let candidates = [];
      
      if (filter !== 'all') {
        candidates = updatedIdioms
          .map((idiom, index) => ({ status: idiom.status, index }))
          .filter(item => item.status === filter)
          .map(item => item.index);
        
        if (candidates.length === 0) {
          activeFilter = 'all';
          setFilter('all');
          alert(`恭喜！你已复习完该类别的所有成语，系统已自动切回“全部”模式。`);
        }
      }
      
      if (activeFilter === 'all') {
        if (isRandom) {
          const candidateIndices = [];
          updatedIdioms.forEach((idiom, index) => {
            if (idiom.status !== 'known') {
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
            const allIndices = Array.from({length: idioms.length}, (_, i) => i);
            const otherIndices = allIndices.filter(idx => idx !== currentIndex);
            nextIndex = otherIndices.length > 0 
              ? otherIndices[Math.floor(Math.random() * otherIndices.length)]
              : 0;
          }
        } else {
          let found = false;
          for (let i = 0; i < idioms.length; i++) {
            let checkIndex = (currentIndex + 1 + i) % idioms.length;
            if (updatedIdioms[checkIndex].status !== 'known') {
              nextIndex = checkIndex;
              found = true;
              break;
            }
          }
          if (!found) {
            nextIndex = (currentIndex + 1) % idioms.length;
          }
        }
      } else {
        // Filtered mode
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'known': return 'rgba(16, 185, 129, 0.8)';
      case 'unsure': return 'rgba(245, 158, 11, 0.8)';
      case 'unknown': return 'rgba(239, 68, 68, 0.8)';
      default: return 'rgba(107, 114, 128, 0.8)';
    }
  };

  if (!currentIdiom) return <div className="loading">加载中...</div>;

  const total = idioms.length;
  const progress = ((stats.known) / total) * 100;

  return (
    <div className="app-container">
      <header className="header" ref={headerRef}>
        <div className="header-nav-bar">
          {/* 左上角：重置当前题库进度 */}
          <button 
            className="header-icon-btn reset-header-btn" 
            title="重置当前题库进度"
            onClick={() => {
              if(window.confirm('确定要重置所有学习进度吗？')) {
                localStorage.removeItem(STORAGE_KEY);
                window.location.reload();
              }
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
          </button>
          
          {/* 中间：可交互的沉浸指示胶囊（点击展开/收起题型与掌握度面板） */}
          <button 
            className={`header-meta-pill ${isPanelOpen ? 'active' : ''}`}
            onClick={() => setIsPanelOpen(prev => !prev)}
            title={isPanelOpen ? "收起筛选面板" : "展开题型与掌握度面板"}
          >
            <span className="pill-db-name">📚 成语题库</span>
            <span className="pill-divider">·</span>
            <span className="pill-cat-name">{quizMode === 'meaning' ? '🎯 看词选义' : '📖 选词填空'}</span>
            <span className="pill-progress-text">({currentIndex + 1}/{idioms.length})</span>
            <span className={`pill-chevron ${isPanelOpen ? 'open' : ''}`}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>

          {/* 右上角：搜索按钮 */}
          <button 
            className={`header-icon-btn search-header-btn ${(isSearchOpen || searchQuery) ? 'active' : ''}`} 
            onClick={() => {
              if (isSearchOpen || searchQuery) {
                handleCloseSearch();
              } else {
                handleOpenSearch();
              }
            }} 
            title="搜索成语"
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
              placeholder={`搜索成语词目、释义 (${idioms.length} 题)...`}
              value={searchQuery}
              onChange={(e) => {
                if (!preSearchStateRef.current && e.target.value) {
                  preSearchStateRef.current = {
                    index: currentIndex,
                    filter: filter,
                    quizMode: quizMode,
                    displayIndex: currentIndex + 1,
                    total: idioms.length
                  };
                }
                setSearchQuery(e.target.value);
              }}
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
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
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
        )}
      </header>

      <main className="main-content">
        {searchQuery.trim() !== '' ? (
          <div className="search-knowledge-view">
            <div className="search-results-bar">
              <span className="search-count-text">
                共匹配到 <strong>{searchMatchedIdioms.length}</strong> 个成语
              </span>
              <button className="search-clear-action-btn" onClick={handleCloseSearch}>
                清空搜索
              </button>
            </div>

            {searchMatchedIdioms.length === 0 ? (
              <div className="empty-state-card">
                <h3>未找到匹配成语</h3>
                <p>请尝试缩短关键词或搜索其他成语</p>
                <button className="empty-state-btn" onClick={handleCloseSearch}>
                  清空搜索
                </button>
              </div>
            ) : (
              <div className="knowledge-cards-list">
                {searchMatchedIdioms.map((idiom, idx) => (
                  <div key={idx} className="knowledge-card" onClick={() => handleSelectSearchItem(idiom)}>
                    <div className="knowledge-card-top">
                      <div className="knowledge-chapter-wrap">
                        <span className="knowledge-chapter-name">{idiom.group}</span>
                        {idiom.subcategory && <span className="knowledge-group-name">· {idiom.subcategory}</span>}
                      </div>
                      <span className={`knowledge-status-tag status-tag-${idiom.status}`}>
                        {idiom.status === 'known' ? '已掌握' : idiom.status === 'unsure' ? '模糊' : idiom.status === 'unknown' ? '生词' : '未学'}
                      </span>
                    </div>
                    <div className="search-result-word-row" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0.2rem 0' }}>
                      <strong className="search-result-word" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        {renderHighlightedText(idiom.word, searchQuery)}
                      </strong>
                      {idiom.color && idiom.color !== '中性' && (
                        <span className={`color-tag ${idiom.color === '贬义' ? 'negative' : 'positive'}`} style={{ padding: '0.15rem 0.5rem', fontSize: '0.75rem' }}>
                          {idiom.color}
                        </span>
                      )}
                    </div>
                    <div className="search-result-meaning" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {renderHighlightedText(idiom.meaning, searchQuery)}
                    </div>
                    {idiom.examples && idiom.examples.length > 0 && (
                      <div className="search-result-example" style={{ fontSize: '0.85rem', color: '#64748b', background: 'rgba(0,0,0,0.02)', padding: '0.4rem 0.6rem', borderRadius: '8px', borderLeft: '2px solid var(--accent-color)', marginTop: '0.3rem' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>例句：</strong>{renderHighlightedText(idiom.examples[0], searchQuery)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 从搜索结果临时跳转时的醒目返回胶囊 */}
            {returnToPreSearch && (
              <div className="search-return-banner">
                <div className="banner-info">
                  <span className="banner-badge">搜索结果</span>
                  <span className="banner-tip">正在练习搜索选中的成语</span>
                </div>
                <button className="banner-return-btn" onClick={handleRestorePreSearch}>
                  ↩️ 返回原刷题进度 (第 {returnToPreSearch.displayIndex} 题)
                </button>
              </div>
            )}

            <div className={`card-container ${selectedOption !== null ? 'expanded' : ''}`} style={{ height: isFlipped ? cardHeight : '340px', marginTop: `${calculatedMarginTop}px` }} onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-front">
              <div className="card-top-bar">
                <div className="group-tag" style={{ margin: 0 }}>
                  {currentIdiom.group} {currentIdiom.subcategory ? `· ${currentIdiom.subcategory}` : ''}
                </div>
                {currentIdiom.status !== 'new' && (
                  <div className="status-badge-inline" style={{ backgroundColor: getStatusColor(currentIdiom.status) }}>
                    上次标记: {currentIdiom.status === 'known' ? '认识' : currentIdiom.status === 'unsure' ? '模糊' : '不认识'}
                  </div>
                )}
              </div>

              <div className="card-front-center-content">
                {quizMode === 'sentence' ? (
                  <h2 className="idiom-word sentence-blank" style={{ margin: 0, width: '100%', textAlign: 'justify', lineHeight: '1.65' }}>
                    {currentExample ? currentExample.replace(new RegExp(currentIdiom.word, 'g'), '______') : '（暂无例句）'}
                  </h2>
                ) : (
                  <h2 className="idiom-word" style={{ margin: 0 }}>{currentIdiom.word}</h2>
                )}
                <div className="card-hint" style={{ marginTop: '1.25rem', width: '100%', textAlign: 'center' }}>
                  点击翻转查看{quizMode === 'sentence' ? '选项' : '释义'}
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="card-back-inner" ref={cardBackInnerRef}>
                <div className="group-tag">
                  {currentIdiom.group} {currentIdiom.subcategory ? `· ${currentIdiom.subcategory}` : ''}
                </div>
                <div className="card-back-content">
                  {quizMode === 'sentence' ? (
                    <div className="sentence-question">
                      {currentExample ? currentExample.replace(new RegExp(currentIdiom.word, 'g'), '______') : '（暂无例句）'}
                    </div>
                  ) : (
                    <h3>{currentIdiom.word}</h3>
                  )}
                  <div className="quiz-title">请选择正确的{quizMode === 'sentence' ? '成语' : '释义'}：</div>
                  <div className={`options-container ${quizMode === 'sentence' ? 'options-grid-2x2' : ''} ${selectedOption === null ? 'quiz-not-answered' : ''}`}>
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
                          <span className="option-label">{['A', 'B', 'C', 'D'][index]}. </span>
                          <span className={quizMode === 'sentence' ? 'option-text-word' : 'option-text'}>{opt.text}</span>
                          {selectedOption !== null && opt.isCorrect && (
                            <span className="option-status-icon correct-icon">✓</span>
                          )}
                          {selectedOption !== null && !opt.isCorrect && selectedOption === index && (
                            <span className="option-status-icon incorrect-icon">✗</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (() => {
                    const distractorOpts = shuffledOptions.filter(o => !o.isCorrect);
                    return (
                      <div className="quiz-feedback-details">
                        <div className="idiom-details">
                          {currentIdiom.color !== '中性' && (
                            <span className={`color-tag ${currentIdiom.color === '贬义' ? 'negative' : 'positive'}`}>
                              {currentIdiom.color}
                            </span>
                          )}
                        </div>
                        
                        <div className="full-definition-container">
                          <strong>【{currentIdiom.word}】的完整释义</strong>
                          <span className="full-definition-text">{currentIdiom.meaning}</span>
                        </div>

                        {distractorOpts.map((opt, idx) => {
                          const isUserSelected = selectedOption !== null && shuffledOptions[selectedOption] === opt;
                          return (
                            <div key={idx} className={`full-definition-container distractor-definition ${isUserSelected ? 'user-selected-distractor' : ''}`}>
                              <strong>
                                【{opt.word}】的完整释义
                                {isUserSelected && " - 你误选了此项"}
                              </strong>
                              <span className="full-definition-text">{opt.fullText}</span>
                            </div>
                          );
                        })}

                        {currentIdiom.examples && currentIdiom.examples.length > 0 && (
                          <div className="examples-container">
                            {currentIdiom.examples.map((ex, exIdx) => {
                              // Highlight the filled idiom in the sentence if this is the example used
                              const isCurrentExample = quizMode === 'sentence' && ex === currentExample;
                              return (
                                <div key={exIdx} className={`example-item ${isCurrentExample ? 'highlighted-example' : ''}`}>
                                  <strong>例{exIdx + 1}：</strong>
                                  {isCurrentExample ? (
                                    <span>
                                      {ex.split(new RegExp(`(${currentIdiom.word})`, 'g')).map((part, i) => 
                                        part === currentIdiom.word ? <span key={i} className="filled-idiom">{part}</span> : part
                                      )}
                                    </span>
                                  ) : ex}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

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
      </main>

      {/* 底部悬浮模式栏（极简单层设计，无多层套娃） */}
      <nav className="floating-mode-bar" ref={modeBarRef}>
        <button className={`mode-btn ${quizMode === 'meaning' ? 'active' : ''}`} onClick={() => setQuizMode('meaning')}>
          释义模式
        </button>
        <button className={`mode-btn ${quizMode === 'sentence' ? 'active' : ''}`} onClick={() => setQuizMode('sentence')}>
          例句模式
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
