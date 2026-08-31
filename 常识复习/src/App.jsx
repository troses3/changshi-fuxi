import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { triggerHaptic } from './utils/haptics';

import knowledgeData from './data/knowledge_db.json';
import questionData from './data/question_db.json';

const STORAGE_KEY = 'cs-fuxi-tracker-v5';

function highlightMatch(text, query) {
  if (!text) return '';
  if (!query || !query.trim()) return text;
  const q = query.trim();
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = String(text).split(regex);
  return parts.map((part, i) => 
    regex.test(part) ? <span key={i} className="search-highlight">{part}</span> : part
  );
}

/**
 * 智能分段渲染：将纯文本按 \n 拆分，识别结构化行（标题、编号、选项解析、列表圆点等），
 * 渲染为带视觉层级的段落组件。
 */
function formatContent(text) {
  if (!text) return null;
  const raw = String(text).trim();
  if (!raw) return null;

  const lines = raw.split('\n').filter(l => l.trim() !== '');

  if (lines.length === 1 && !lines[0].startsWith('【') && !lines[0].startsWith('•')) {
    return <p className="fc-para">{lines[0]}</p>;
  }

  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return null;

    // 【xxx】 开头的段落标题
    if (/^【[^】]+】/.test(trimmed)) {
      return <div key={i} className="fc-section-header">{trimmed}</div>;
    }

    // （一）（二）... 中文大编号
    if (/^[（(][一二三四五六七八九十]+[）)]/.test(trimmed)) {
      return <div key={i} className="fc-major-num">{trimmed}</div>;
    }

    // • 开头的列表项
    if (/^[•·-]\s*/.test(trimmed)) {
      return (
        <div key={i} className="fc-bullet-item">
          <span className="fc-bullet-dot">🔹</span>
          <span className="fc-bullet-text">{trimmed.replace(/^[•·-]\s*/, '')}</span>
        </div>
      );
    }

    // ①②③④ 或 (1)(2)... 或 1. 2. 数字编号
    if (/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(trimmed) || /^[（(]\d+[）)]/.test(trimmed) || /^\d+[.．、]/.test(trimmed)) {
      return <div key={i} className="fc-num-item">{trimmed}</div>;
    }

    // A项/B项/C项/D项 选项解析行
    if (/^[A-Da-d][项．.]/.test(trimmed)) {
      const isCorrect = /正确/.test(trimmed);
      const isWrong = /错误/.test(trimmed);
      return (
        <div key={i} className={`fc-option-line ${isCorrect ? 'fc-correct' : ''} ${isWrong ? 'fc-wrong' : ''}`}>
          {trimmed}
        </div>
      );
    }

    // 普通段落
    return <p key={i} className="fc-para">{trimmed}</p>;
  });
}

export default function App() {
  const headerRef = useRef(null);
  const skipCategoryResetRef = useRef(true);
  const modeBarRef = useRef(null);
  const actionButtonsRef = useRef(null);
  const cardBackInnerRef = useRef(null);

  const [cardHeight, setCardHeight] = useState('340px');
  const [calculatedMarginTop, setCalculatedMarginTop] = useState(0);

  // 搜索与面板相关状态
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 搜索查看独立状态：完全解耦，绝不污染正常刷题 cursor (currentIndex)
  const [inspectingSearchItem, setInspectingSearchItem] = useState(null);

  // 数据源与列表状态
  const [activeMode, setActiveMode] = useState(() => {
    return localStorage.getItem('cs-fuxi-mode') || 'knowledge'; // 'knowledge' | 'quiz'
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 卡片数据与状态 (智能合并最新数据库内容与本地用户学习状态)
  const [items, setItems] = useState(() => {
    const initMode = localStorage.getItem('cs-fuxi-mode') || 'knowledge';
    const rawData = initMode === 'knowledge' ? knowledgeData : questionData;
    const stored = localStorage.getItem(`${STORAGE_KEY}_${initMode}`) || localStorage.getItem(`cs-fuxi-tracker-v4_${initMode}`);
    const statusMap = {};
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach(p => {
            if (p.id && p.status && p.status !== 'new') {
              statusMap[p.id] = p.status;
            }
          });
        }
      } catch (e) {}
    }
    return rawData.map(item => ({
      ...item,
      status: statusMap[item.id] || 'new'
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const initMode = localStorage.getItem('cs-fuxi-mode') || 'knowledge';
    const saved = localStorage.getItem(`cs-fuxi-current-index_${initMode}`);
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
    return localStorage.getItem('cs-fuxi-random') === 'true';
  });
  const [history, setHistory] = useState([]);

  // 真题选择的选项
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);

  // 保存模式与随机设置及当前题号
  useEffect(() => {
    localStorage.setItem('cs-fuxi-mode', activeMode);
  }, [activeMode]);

  useEffect(() => {
    localStorage.setItem(`cs-fuxi-current-index_${activeMode}`, currentIndex);
  }, [currentIndex, activeMode]);

  useEffect(() => {
    localStorage.setItem('cs-fuxi-random', isRandom);
  }, [isRandom]);

  // 计算当前分类下的过滤列表
  const currentCategoryItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.chapter === selectedCategory;
  });

  // 安全索引保护：确保当前索引严格在有效范围内
  const safeIndex = currentCategoryItems.length > 0
    ? (currentIndex >= 0 && currentIndex < currentCategoryItems.length ? currentIndex : 0)
    : 0;

  // 当前激活的项目（搜索独立预览时显示搜索项目，否则显示当前主刷题项目）
  const currentItem = inspectingSearchItem || currentCategoryItems[safeIndex] || null;

  // 初始化加载与模式切换
  useEffect(() => {
    const rawData = activeMode === 'knowledge' ? knowledgeData : questionData;
    const stored = localStorage.getItem(`${STORAGE_KEY}_${activeMode}`) || localStorage.getItem(`cs-fuxi-tracker-v4_${activeMode}`);
    const statusMap = {};
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach(p => {
            if (p.id && p.status && p.status !== 'new') {
              statusMap[p.id] = p.status;
            }
          });
        }
      } catch (e) {}
    }
    
    const loadedItems = rawData.map(item => ({
      ...item,
      status: statusMap[item.id] || 'new'
    }));

    setItems(loadedItems);
    
    const catItems = loadedItems.filter(item => {
      if (selectedCategory === 'all') return true;
      return item.chapter === selectedCategory;
    });

    if (catItems.length === 0 && selectedCategory !== 'all') {
      setSelectedCategory('all');
    }

    const targetPool = catItems.length > 0 ? catItems : loadedItems;

    const savedIndexKey = `cs-fuxi-current-index_${activeMode}`;
    const savedIndex = localStorage.getItem(savedIndexKey);
    
    if (savedIndex !== null) {
      const parsed = parseInt(savedIndex, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < targetPool.length) {
        setCurrentIndex(parsed);
      } else {
        setCurrentIndex(0);
      }
    } else {
      if (isRandom && targetPool.length > 0) {
        const candidateIndices = [];
        targetPool.forEach((item, index) => {
          if (item.status !== 'known') {
            candidateIndices.push(index);
          }
        });
        const randIndex = candidateIndices.length > 0 
          ? candidateIndices[Math.floor(Math.random() * candidateIndices.length)]
          : Math.floor(Math.random() * targetPool.length);
        setCurrentIndex(randIndex);
      } else {
        setCurrentIndex(0);
      }
    }

    setIsFlipped(false);
    setSelectedQuizOption(null);
    setHistory([]);
  }, [activeMode]);

  // 分类筛选重置
  useEffect(() => {
    if (currentCategoryItems.length === 0) return;
    
    if (skipCategoryResetRef.current) {
      skipCategoryResetRef.current = false;
      return;
    }

    if (isRandom) {
      const candidateIndices = [];
      currentCategoryItems.forEach((item, index) => {
        if (item.status !== 'known') {
          candidateIndices.push(index);
        }
      });
      const randIndex = candidateIndices.length > 0 
        ? candidateIndices[Math.floor(Math.random() * candidateIndices.length)]
        : Math.floor(Math.random() * currentCategoryItems.length);
      setCurrentIndex(randIndex);
    } else {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
    setSelectedQuizOption(null);
  }, [selectedCategory]);

  // 更新统计数据与保存至 localStorage
  useEffect(() => {
    if (items.length > 0) {
      const known = items.filter(i => i.status === 'known').length;
      const unsure = items.filter(i => i.status === 'unsure').length;
      const unknown = items.filter(i => i.status === 'unknown').length;
      setStats({ known, unsure, unknown });
      localStorage.setItem(`${STORAGE_KEY}_${activeMode}`, JSON.stringify(items));
    }
  }, [items, activeMode]);

  // 动态居中计算 (True Geometric Symmetry across all 3 steps)
  useEffect(() => {
    const calcMargin = () => {
      if (headerRef.current && modeBarRef.current && searchQuery.trim() === '') {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom + window.scrollY;
        const modeBarTop = modeBarRef.current.getBoundingClientRect().top;
        const space = modeBarTop - headerBottom;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const gapPx = 0.75 * rem;

        let contentHeight = 340;
        if (activeMode === 'knowledge') {
          if (isFlipped && cardBackInnerRef.current) {
            const cardH = Math.max(340, cardBackInnerRef.current.scrollHeight);
            const buttonsH = (actionButtonsRef.current && actionButtonsRef.current.offsetHeight) ? actionButtonsRef.current.offsetHeight : 44;
            contentHeight = cardH + gapPx + buttonsH;
          } else {
            contentHeight = 340;
          }
        } else {
          // 真题模式
          if (cardBackInnerRef.current) {
            const cardH = Math.max(340, cardBackInnerRef.current.scrollHeight);
            if (selectedQuizOption !== null) {
              const buttonsH = (actionButtonsRef.current && actionButtonsRef.current.offsetHeight) ? actionButtonsRef.current.offsetHeight : 44;
              contentHeight = cardH + gapPx + buttonsH;
            } else {
              contentHeight = cardH;
            }
          }
        }

        let margin = (space - contentHeight) / 2 - gapPx;
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
  }, [searchQuery, selectedCategory, activeMode, isSearchOpen, isPanelOpen, isFlipped, selectedQuizOption, currentIndex]);

  // 动态测高与自动平滑滚动 (Height Measurement & Auto Scroll Effect)
  useEffect(() => {
    if (cardBackInnerRef.current) {
      const contentHeight = cardBackInnerRef.current.scrollHeight;
      setCardHeight(`${Math.max(340, contentHeight)}px`);
    }

    if (isFlipped && (selectedQuizOption !== null || activeMode === 'knowledge')) {
      const scrollTimer = setTimeout(() => {
        const actionBtnEl = actionButtonsRef.current;
        const floatingBarEl = document.querySelector('.floating-mode-bar');

        if (actionBtnEl && floatingBarEl) {
          const btnRect = actionBtnEl.getBoundingClientRect();
          const floatingRect = floatingBarEl.getBoundingClientRect();
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
  }, [selectedQuizOption, currentItem, isFlipped, activeMode]);

  // 全局搜索匹配过滤列表
  const searchMatchedItems = items.filter(item => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.trim().toLowerCase();
    if (activeMode === 'knowledge') {
      return (
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.content && item.content.toLowerCase().includes(q)) ||
        (item.chapter && item.chapter.toLowerCase().includes(q)) ||
        (item.section && item.section.toLowerCase().includes(q))
      );
    } else {
      return (
        (item.stem && item.stem.toLowerCase().includes(q)) ||
        (item.analysis && item.analysis.toLowerCase().includes(q)) ||
        (item.chapter && item.chapter.toLowerCase().includes(q)) ||
        (item.section && item.section.toLowerCase().includes(q)) ||
        (item.source && item.source.toLowerCase().includes(q)) ||
        (item.options && item.options.some(opt => opt.text && opt.text.toLowerCase().includes(q)))
      );
    }
  });

  const handleOpenSearch = () => {
    triggerHaptic('menuToggle');
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    triggerHaptic('clear');
    setIsSearchOpen(false);
    setSearchQuery('');
    setInspectingSearchItem(null);
  };

  // 点击搜索结果跳转独立预览
  const handleSelectSearchItem = (targetItem) => {
    triggerHaptic('optionSelect');
    setInspectingSearchItem(targetItem);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsFlipped(false);
    setSelectedQuizOption(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 点击统计项状态筛选
  const handleFilterClick = (targetFilter) => {
    triggerHaptic('optionSelect');
    if (filter === targetFilter) {
      setFilter('all');
      return;
    }
    const count = targetFilter === 'known' ? stats.known :
                  targetFilter === 'unsure' ? stats.unsure :
                  targetFilter === 'unknown' ? stats.unknown : 0;
    if (count === 0) {
      alert(`当前没有处于“${targetFilter === 'known' ? '已掌握' : targetFilter === 'unsure' ? '模糊' : '生词'}”状态的卡片！`);
      return;
    }
    const targetIndex = currentCategoryItems.findIndex(i => i.status === targetFilter);
    if (targetIndex !== -1) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setFilter(targetFilter);
      setCurrentIndex(targetIndex);
      setIsFlipped(false);
      setSelectedQuizOption(null);
    } else {
      alert(`在当前选中的章节中没有处于该状态的卡片，已为你切换到“全部章节”。`);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setSelectedCategory('all');
      setFilter(targetFilter);
      const allTargetIndex = items.findIndex(i => i.status === targetFilter);
      if (allTargetIndex !== -1) {
        setCurrentIndex(allTargetIndex);
      }
      setIsFlipped(false);
      setSelectedQuizOption(null);
    }
  };

  // 下一张与状态标记切换算法
  const handleNext = (status) => {
    if (!currentItem) return;

    if (status === 'known') {
      triggerHaptic('success');
    } else if (status === 'unknown') {
      triggerHaptic('error');
    } else {
      triggerHaptic('tap');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    // 如果当前处于搜索独立预览状态，更新状态后直接关闭预览，无缝回到主进度！
    if (inspectingSearchItem) {
      const realIndex = items.findIndex(i => i.id === inspectingSearchItem.id);
      if (realIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[realIndex].status = status;
        setItems(updatedItems);
      }
      setIsFlipped(false);
      setSelectedQuizOption(null);
      setInspectingSearchItem(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const realIndex = items.findIndex(i => i.id === currentItem.id);
    if (realIndex === -1) return;

    const updatedItems = [...items];
    updatedItems[realIndex].status = status;
    setItems(updatedItems);
    setIsFlipped(false);
    setSelectedQuizOption(null);

    // 记录上一张的历史
    setHistory(prev => [...prev, safeIndex]);

    setTimeout(() => {
      let nextIndex = safeIndex;
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
          alert(`恭喜！你已复习完该状态下的所有卡片，系统已自动切回“全部”模式。`);
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
              finalCandidates = candidateIndices.filter(idx => idx !== safeIndex);
            }
            nextIndex = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
          } else {
            const allIndices = Array.from({ length: updatedCategoryItems.length }, (_, i) => i);
            const otherIndices = allIndices.filter(idx => idx !== safeIndex);
            nextIndex = otherIndices.length > 0 
              ? otherIndices[Math.floor(Math.random() * otherIndices.length)]
              : 0;
          }
        } else {
          let found = false;
          for (let i = 0; i < updatedCategoryItems.length; i++) {
            let checkIndex = (safeIndex + 1 + i) % updatedCategoryItems.length;
            if (updatedCategoryItems[checkIndex].status !== 'known') {
              nextIndex = checkIndex;
              found = true;
              break;
            }
          }
          if (!found) {
            nextIndex = (safeIndex + 1) % updatedCategoryItems.length;
          }
        }
      } else {
        if (isRandom) {
          let finalCandidates = candidates;
          if (candidates.length > 1) {
            finalCandidates = candidates.filter(idx => idx !== safeIndex);
          }
          nextIndex = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
        } else {
          const nextCandidate = candidates.find(idx => idx > safeIndex);
          nextIndex = nextCandidate !== undefined ? nextCandidate : candidates[0];
        }
      }

      setCurrentIndex(nextIndex);
    }, 30);
  };

  // 上一张
  const handlePrev = (e) => {
    e.stopPropagation();
    triggerHaptic('tap');
    if (history.length > 0) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      const prevIndex = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentIndex(prevIndex);
      setIsFlipped(false);
      setSelectedQuizOption(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'known': return 'rgba(16, 185, 129, 0.8)';
      case 'unsure': return 'rgba(245, 158, 11, 0.8)';
      case 'unknown': return 'rgba(239, 68, 68, 0.8)';
      default: return 'rgba(107, 114, 128, 0.8)';
    }
  };

  if (!currentItem) return <div className="loading" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>加载常识题库中...</div>;

  const total = items.length;
  const progress = ((stats.known) / (total || 1)) * 100;

  return (
    <div className="app-container">
      {/* 顶部导航与控制区 */}
      <header className="header" ref={headerRef}>
        <div className="header-nav-bar">
          {/* 左上角：重置当前模式题库进度 */}
          <button 
            className="header-icon-btn reset-header-btn" 
            title="重置当前模式学习进度"
            onClick={() => {
              triggerHaptic('dangerReset');
              const modeName = activeMode === 'knowledge' ? '考点模式' : '真题模式';
              if(window.confirm(`确定要重置【${modeName}】的所有学习进度吗？（不可恢复）`)) {
                localStorage.removeItem(`${STORAGE_KEY}_${activeMode}`);
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
            onClick={() => {
              triggerHaptic('menuToggle');
              setIsPanelOpen(prev => !prev);
            }}
            title={isPanelOpen ? "收起筛选面板" : "展开题库与章节面板"}
          >
            <span className="pill-db-name">{activeMode === 'knowledge' ? '📖 考点模式' : '✍️ 真题演练'}</span>
            <span className="pill-divider">·</span>
            <span className="pill-cat-name">
              {selectedCategory === 'all' ? '全部章节' : (
                selectedCategory.includes('法律') ? '⚖️ 法律' :
                selectedCategory.includes('人文') ? '📜 人文历史' :
                selectedCategory.includes('科技') ? '🔬 科技' :
                selectedCategory.includes('地理') ? '🌍 地理' :
                selectedCategory.includes('经济') ? '📈 经济' :
                selectedCategory.length > 5 ? selectedCategory.slice(0, 4) + '...' : selectedCategory
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
            onClick={() => {
              if (isSearchOpen || searchQuery) {
                handleCloseSearch();
              } else {
                handleOpenSearch();
              }
            }} 
            title="搜索常识考点"
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
              placeholder={`搜索考点、题目、解析 (${items.length} 题)...`}
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
                onClick={() => {
                  triggerHaptic('optionSelect');
                  setFilter('all');
                }}
                title="查看全部"
              >
                总计: <span className="stat-count">{total}</span>
              </button>
            </div>

            {/* 单行横向滑动章节栏 */}
            <div className="category-scroll-container">
              <div className="category-scroll-track">
                {[
                  { key: 'all', label: '全部章节' },
                  { key: '第一章 法律常识', label: '⚖️ 法律' },
                  { key: '第二章 人文历史常识', label: '📜 人文历史' },
                  { key: '第三章 科技常识', label: '🔬 科技' },
                  { key: '第四章 地理常识', label: '🌍 地理' },
                  { key: '第五章 经济常识', label: '📈 经济' },
                ].map(cat => (
                  <button
                    key={cat.key}
                    className={`cat-chip ${selectedCategory === cat.key ? 'active' : ''}`}
                    onClick={() => {
                      triggerHaptic('optionSelect');
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

      {/* Main Content */}
      <main className="main-content">
        {searchQuery.trim() !== '' ? (
          <div className="search-knowledge-view">
            <div className="search-results-bar">
              <span className="search-count-text">
                共匹配到 <strong>{searchMatchedItems.length}</strong> 个{activeMode === 'knowledge' ? '考点' : '题目'}
              </span>
              <button className="search-clear-action-btn" onClick={handleCloseSearch}>
                清空搜索
              </button>
            </div>

            {searchMatchedItems.length === 0 ? (
              <div className="empty-state-card" style={{ background: 'white', borderRadius: '20px', padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>没有找到匹配的{activeMode === 'knowledge' ? '考点' : '题目'}</p>
                <button className="empty-state-btn" onClick={handleCloseSearch} style={{ marginTop: '0.8rem', padding: '0.4rem 1rem', borderRadius: '8px', border: '1px solid var(--accent-color)', background: 'white', color: 'var(--accent-color)', cursor: 'pointer', fontWeight: 600 }}>
                  清空搜索
                </button>
              </div>
            ) : (
              <div className="knowledge-cards-list">
                {searchMatchedItems.map(item => (
                  <div
                    key={item.id}
                    className="knowledge-card"
                    onClick={() => handleSelectSearchItem(item)}
                  >
                    <div className="knowledge-card-top">
                      <div className="knowledge-chapter-wrap">
                        <span className="knowledge-chapter-name">{item.chapter}</span>
                        {item.section && <span className="knowledge-group-name">· {item.section}</span>}
                      </div>
                      <span className={`knowledge-status-tag status-tag-${item.status || 'new'}`}>
                        {item.status === 'known' ? '已掌握' : item.status === 'unsure' ? '模糊' : item.status === 'unknown' ? '生词' : '未复习'}
                      </span>
                    </div>

                    {activeMode === 'knowledge' ? (
                      <>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: '700' }}>
                          {highlightMatch(item.title, searchQuery)}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                          {highlightMatch(item.content, searchQuery)}
                        </p>
                      </>
                    ) : (
                      <>
                        <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-primary)', fontWeight: '600', lineHeight: '1.6' }}>
                          {highlightMatch(item.stem, searchQuery)}
                        </h4>
                        {item.source && (
                          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>
                            🎯 来源：{highlightMatch(item.source, searchQuery)}
                          </div>
                        )}
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: '#f8fafc', padding: '0.5rem 0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-color)' }}>
                          <strong>正确答案：{item.answer}</strong>
                          <p style={{ margin: '0.3rem 0 0 0', lineHeight: '1.5' }}>
                            {highlightMatch(item.analysis, searchQuery)}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
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
                  <span className="banner-tip">正在练习搜索出的{activeMode === 'knowledge' ? '考点' : '真题'}</span>
                </div>
                <button className="banner-return-btn" onClick={() => setInspectingSearchItem(null)}>
                  ↩️ 返回原刷题进度 (第 {safeIndex + 1} 题)
                </button>
              </div>
            )}

            {activeMode === 'knowledge' ? (
              /* 考点模式：3D 翻转卡片 */
              <div
                className={`card-container ${isFlipped ? 'expanded' : ''}`}
                style={{
                  height: isFlipped ? cardHeight : '340px',
                  marginTop: `${calculatedMarginTop}px`
                }}
                onClick={() => {
                  triggerHaptic('cardFlip');
                  setIsFlipped(!isFlipped);
                }}
              >
                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                  {/* 卡片正面 */}
                  <div className="card-front">
                    <div className="card-top-bar">
                      <div className="group-tag">
                        {currentItem.chapter}{currentItem.section && currentItem.section !== currentItem.chapter ? ` · ${currentItem.section}` : ''}
                      </div>
                      {currentItem.status !== 'new' && (
                        <div className="status-badge-inline" style={{ backgroundColor: getStatusColor(currentItem.status) }}>
                          上次标记: {currentItem.status === 'known' ? '认识' : currentItem.status === 'unsure' ? '模糊' : '不认识'}
                        </div>
                      )}
                    </div>

                    <div className="card-front-center-content">
                      <h2 
                        className="idiom-word" 
                        style={(() => {
                          const len = (currentItem.title || '').length;
                          if (len <= 4) return { fontSize: '2.6rem', fontWeight: '800', letterSpacing: '0.1rem', margin: 0 };
                          if (len <= 8) return { fontSize: '1.9rem', fontWeight: '700', letterSpacing: '0.04rem', lineHeight: '1.35', margin: 0 };
                          if (len <= 14) return { fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.02rem', lineHeight: '1.4', margin: 0 };
                          return { fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0', lineHeight: '1.45', margin: 0 };
                        })()}
                      >
                        {currentItem.title}
                      </h2>

                      <div className="card-hint" style={{ marginTop: '1.25rem' }}>
                        点击翻转查看考点精释
                      </div>
                    </div>
                  </div>

                  {/* 卡片反面 */}
                  <div className="card-back">
                    <div className="card-back-inner" ref={cardBackInnerRef}>
                      <div className="group-tag">
                        {currentItem.chapter}{currentItem.section && currentItem.section !== currentItem.chapter ? ` · ${currentItem.section}` : ''}
                      </div>

                      <div className="card-back-content" style={{ width: '100%' }}>
                        <h3>{currentItem.title}</h3>
                        <div className="full-definition-container fc-container">
                          {formatContent(currentItem.content)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* 真题模式：直接交互答题卡片 */
              <div 
                className="card-front" 
                style={{ 
                  position: 'relative', 
                  height: 'auto', 
                  minHeight: '340px', 
                  justifyContent: 'flex-start', 
                  alignItems: 'stretch', 
                  padding: '1.25rem 1.5rem', 
                  cursor: 'default',
                  marginTop: selectedQuizOption === null ? `${calculatedMarginTop}px` : undefined 
                }}
              >
                <div className="card-top-bar" style={{ position: 'relative', top: 0, left: 0, right: 0, marginBottom: '0.75rem' }}>
                  <div className="group-tag" style={{ margin: 0 }}>
                    {currentItem.chapter}{currentItem.section && currentItem.section !== currentItem.chapter ? ` · ${currentItem.section}` : ''}
                  </div>

                  {currentItem.status !== 'new' && (
                    <div className="status-badge-inline" style={{ backgroundColor: getStatusColor(currentItem.status) }}>
                      上次标记: {currentItem.status === 'known' ? '认识' : currentItem.status === 'unsure' ? '模糊' : '不认识'}
                    </div>
                  )}
                </div>

                {currentItem.source && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '700', textAlign: 'left' }}>
                    🎯 来源：{currentItem.source}
                  </div>
                )}

                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.7', color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'left' }}>
                  {currentItem.stem}
                </h3>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '0.5rem', textAlign: 'left' }}>
                  请选择正确选项：
                </div>

                <div className="options-container">
                  {(currentItem.options || []).map((opt) => {
                    let btnClass = "option-btn";
                    if (selectedQuizOption !== null) {
                      if (opt.key === currentItem.answer) {
                        btnClass += " correct";
                      } else if (selectedQuizOption === opt.key) {
                        btnClass += " incorrect";
                      }
                      btnClass += " disabled";
                    }

                    return (
                      <button
                        key={opt.key}
                        className={btnClass}
                        onClick={() => {
                          if (selectedQuizOption === null) {
                            if (opt.key === currentItem.answer) {
                              triggerHaptic('success');
                            } else {
                              triggerHaptic('error');
                            }
                            setSelectedQuizOption(opt.key);
                          }
                        }}
                        disabled={selectedQuizOption !== null}
                      >
                        <span className="option-label">
                          {selectedQuizOption !== null && opt.key === currentItem.answer ? '✓ ' : selectedQuizOption !== null && selectedQuizOption === opt.key ? '✗ ' : `${opt.key}. `}
                        </span>
                        <span style={{ flex: 1, lineHeight: '1.5' }}>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 答题后展现权威解析 */}
                {selectedQuizOption !== null && (
                  <div 
                    className="full-definition-container fc-container" 
                    style={{ 
                      borderLeftColor: selectedQuizOption === currentItem.answer ? '#10b981' : '#ef4444', 
                      background: selectedQuizOption === currentItem.answer ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)',
                      marginTop: '0.8rem', 
                      textAlign: 'left' 
                    }}
                  >
                    <strong style={{ color: selectedQuizOption === currentItem.answer ? '#065f46' : '#991b1b', display: 'block', marginBottom: '0.4rem', fontSize: '0.98rem' }}>
                      【{selectedQuizOption === currentItem.answer ? '回答正确 ✓' : '回答错误 ✗'}】正确答案是 {currentItem.answer}
                    </strong>
                    {formatContent(currentItem.analysis)}
                  </div>
                )}
              </div>
            )}

            {/* 底部导航控制按钮区 (考点模式未翻转或真题模式未作答时隐藏) */}
            <div 
              ref={actionButtonsRef}
              className={`action-buttons ${((activeMode === 'knowledge' && !isFlipped) || (activeMode === 'quiz' && selectedQuizOption === null)) ? 'hidden' : ''}`}
            >
              <button className="btn btn-prev" onClick={handlePrev} disabled={history.length === 0}>
                上一题
              </button>
              <button
                className="btn btn-unknown"
                onClick={(e) => { e.stopPropagation(); handleNext('unknown'); }}
              >
                不认识
              </button>
              <button
                className="btn btn-unsure"
                onClick={(e) => { e.stopPropagation(); handleNext('unsure'); }}
              >
                模糊
              </button>
              <button
                className="btn btn-known"
                onClick={(e) => { e.stopPropagation(); handleNext('known'); }}
              >
                认识
              </button>
            </div>
          </>
        )}
      </main>

      {/* 底部悬浮模式栏 */}
      <nav className="floating-mode-bar" ref={modeBarRef}>
        <button
          className={`mode-btn ${activeMode === 'knowledge' ? 'active' : ''}`}
          onClick={() => {
            triggerHaptic('optionSelect');
            setActiveMode('knowledge');
            setIsFlipped(false);
            setSelectedQuizOption(null);
          }}
        >
          考点模式
        </button>
        <button
          className={`mode-btn ${activeMode === 'quiz' ? 'active' : ''}`}
          onClick={() => {
            triggerHaptic('optionSelect');
            setActiveMode('quiz');
            setIsFlipped(false);
            setSelectedQuizOption(null);
          }}
        >
          真题模式
        </button>
        <span className="mode-divider"></span>
        <button
          className={`mode-btn random-btn ${!isRandom ? 'active' : ''}`}
          onClick={() => {
            triggerHaptic('optionSelect');
            setIsRandom(false);
          }}
        >
          顺序
        </button>
        <button
          className={`mode-btn random-btn ${isRandom ? 'active' : ''}`}
          onClick={() => {
            triggerHaptic('optionSelect');
            setIsRandom(true);
            if (currentCategoryItems.length > 0) {
              const randIdx = Math.floor(Math.random() * currentCategoryItems.length);
              setCurrentIndex(randIdx);
              setIsFlipped(false);
              setSelectedQuizOption(null);
            }
          }}
        >
          随机
        </button>
      </nav>
    </div>
  );
}
