import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import knowledgeData from './data/knowledge_db.json';
import questionData from './data/question_db.json';

const STORAGE_KEY = 'cs-fuxi-tracker-v1';

export default function App() {
  // 数据源与列表状态
  const [activeMode, setActiveMode] = useState(() => {
    return localStorage.getItem('cs-fuxi-mode') || 'knowledge'; // 'knowledge' | 'quiz'
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // 卡片数据与状态 (knowledge / quiz 都具有 status: 'new'|'known'|'unsure'|'unknown')
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, unsure: 0, unknown: 0 });
  const [filter, setFilter] = useState('all'); // 'all', 'known', 'unsure', 'unknown'
  const [isRandom, setIsRandom] = useState(() => {
    return localStorage.getItem('cs-fuxi-random') === 'true';
  });
  const [history, setHistory] = useState([]); // 导航历史

  // 真题选择的选项
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);

  // 卡片高度测量 Ref (1:1 成语项目动态测高)
  const cardBackInnerRef = useRef(null);
  const [cardHeight, setCardHeight] = useState('340px');

  // 保存模式与随机设置
  useEffect(() => {
    localStorage.setItem('cs-fuxi-mode', activeMode);
  }, [activeMode]);

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

  // 当前激活的项目
  const currentItem = currentCategoryItems[safeIndex] || null;

  // 初始化加载与模式切换
  useEffect(() => {
    const rawData = activeMode === 'knowledge' ? knowledgeData : questionData;
    const stored = localStorage.getItem(`${STORAGE_KEY}_${activeMode}`);
    let loadedItems = [];
    if (stored) {
      try {
        loadedItems = JSON.parse(stored);
      } catch (e) {
        loadedItems = [];
      }
    }
    
    if (!loadedItems || loadedItems.length === 0) {
      loadedItems = rawData.map(item => ({
        ...item,
        status: 'new'
      }));
    }

    setItems(loadedItems);
    
    // 计算当前分类在载入数据中的子集
    const catItems = loadedItems.filter(item => {
      if (selectedCategory === 'all') return true;
      return item.chapter === selectedCategory;
    });

    if (catItems.length === 0 && selectedCategory !== 'all') {
      setSelectedCategory('all');
    }

    const targetPool = catItems.length > 0 ? catItems : loadedItems;

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

    setIsFlipped(false);
    setSelectedQuizOption(null);
    setHistory([]);
  }, [activeMode]);

  // 分类筛选重置
  useEffect(() => {
    if (currentCategoryItems.length === 0) return;
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

  // 1:1 成语项目 - 动态测高 (Height Measurement Effect)
  useEffect(() => {
    setTimeout(() => {
      if (cardBackInnerRef.current) {
        const contentHeight = cardBackInnerRef.current.scrollHeight;
        setCardHeight(`${Math.max(340, contentHeight)}px`);
      }
    }, 50);
  }, [selectedQuizOption, currentItem, isFlipped, activeMode]);

  // 点击统计项状态筛选
  const handleFilterClick = (targetFilter) => {
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
      setFilter(targetFilter);
      setCurrentIndex(targetIndex);
      setIsFlipped(false);
      setSelectedQuizOption(null);
    } else {
      alert(`在当前选中的章节中没有处于该状态的卡片，已为你切换到“全部章节”。`);
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

  // 1:1 成语项目 - 下一张与状态标记切换算法
  const handleNext = (status) => {
    if (!currentItem) return;

    // 找到在原始全量 items 中的真实索引
    const realIndex = items.findIndex(i => i.id === currentItem.id);
    if (realIndex === -1) return;

    const updatedItems = [...items];
    updatedItems[realIndex].status = status;
    setItems(updatedItems);
    setIsFlipped(false);
    setSelectedQuizOption(null);

    // 记录上一张的历史
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
              finalCandidates = candidateIndices.filter(idx => idx !== currentIndex);
            }
            nextIndex = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
          } else {
            const allIndices = Array.from({ length: updatedCategoryItems.length }, (_, i) => i);
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

  // 1:1 成语项目 - 退回上一卡
  const handlePrev = (e) => {
    e.stopPropagation();
    if (history.length > 0) {
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

  if (!currentItem) return <div className="loading">加载常识题库中...</div>;

  const total = items.length;
  const progress = ((stats.known) / (total || 1)) * 100;

  return (
    <div className="app-container">
      {/* Header - 1:1 成语项目视效 */}
      <header className="header">
        <h1>
          <span>📚</span>
          <span className="title-text">常识题库</span>
        </h1>
        
        <div className="progress-container">
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

          {/* 五大常识分类过滤器 */}
          <div className="cat-filter-row">
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
                className={`cat-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 模式与随机/顺序选择栏 - 1:1 成语项目样式 */}
          <div className="mode-toggle">
            <button
              className={`mode-btn ${activeMode === 'knowledge' ? 'active' : ''}`}
              onClick={() => setActiveMode('knowledge')}
            >
              考点模式
            </button>
            <button
              className={`mode-btn ${activeMode === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveMode('quiz')}
            >
              真题演练
            </button>
            <span className="mode-divider"></span>
            <button
              className={`mode-btn ${!isRandom ? 'active' : ''}`}
              onClick={() => setIsRandom(false)}
            >
              顺序
            </button>
            <button
              className={`mode-btn ${isRandom ? 'active' : ''}`}
              onClick={() => {
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
          </div>
        </div>
      </header>

      {/* Main Content - 1:1 成语项目卡片布局 */}
      <main className="main-content">
        <div
          className={`card-container ${selectedQuizOption !== null ? 'expanded' : ''}`}
          style={{ height: cardHeight }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            
            {/* 卡片正面 */}
            <div className="card-front">
              {activeMode === 'knowledge' ? (
                <h2 
                  className="idiom-word" 
                  style={(() => {
                    const len = (currentItem.title || '').length;
                    if (len <= 4) return { fontSize: '2.6rem', fontWeight: '800', letterSpacing: '0.1rem' };
                    if (len <= 8) return { fontSize: '1.9rem', fontWeight: '700', letterSpacing: '0.04rem', lineHeight: '1.35' };
                    if (len <= 14) return { fontSize: '1.5rem', fontWeight: '700', letterSpacing: '0.02rem', lineHeight: '1.4' };
                    return { fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0', lineHeight: '1.45' };
                  })()}
                >
                  {currentItem.title}
                </h2>
              ) : (
                <div style={{ padding: '0 0.5rem', textAlign: 'left', width: '100%' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '700' }}>
                    🎯 来源：{currentItem.source || '真题演练'}
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: '700', lineHeight: '1.7', color: 'var(--text-primary)' }}>
                    {currentItem.stem}
                  </h2>
                </div>
              )}

              <div className="card-hint">
                点击翻转查看{activeMode === 'knowledge' ? '考点精释' : '真题选项'}
              </div>

              {currentItem.status !== 'new' && (
                <div className="status-badge" style={{ backgroundColor: getStatusColor(currentItem.status) }}>
                  上次标记: {currentItem.status === 'known' ? '认识' : currentItem.status === 'unsure' ? '模糊' : '不认识'}
                </div>
              )}
            </div>

            {/* 卡片反面 */}
            <div className="card-back">
              <div className="card-back-inner" ref={cardBackInnerRef}>
                <div className="group-tag">
                  {currentItem.chapter} {currentItem.section ? `· ${currentItem.section}` : ''}
                </div>

                <div className="card-back-content">
                  {activeMode === 'knowledge' ? (
                    <>
                      <h3>{currentItem.title}</h3>
                      <div className="full-definition-container">
                        <strong>【{currentItem.title}】的考点精释</strong>
                        <span>{currentItem.content}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '0.8rem' }}>
                        {currentItem.stem}
                      </h3>
                      
                      <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                        请选择正确的选项：
                      </div>

                      <div className="options-container">
                        {currentItem.options.map((opt) => {
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
                              onClick={(e) => {
                                e.stopPropagation();
                                if (selectedQuizOption === null) {
                                  setSelectedQuizOption(opt.key);
                                }
                              }}
                              disabled={selectedQuizOption !== null}
                            >
                              <span className="option-label">{opt.key}. </span>
                              <span style={{ flex: 1 }}>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* 答题后展现权威解析 */}
                      {selectedQuizOption !== null && (
                        <div className="full-definition-container" style={{ borderLeftColor: selectedQuizOption === currentItem.answer ? '#10b981' : '#ef4444' }}>
                          <strong style={{ color: selectedQuizOption === currentItem.answer ? '#10b981' : '#ef4444' }}>
                            【{selectedQuizOption === currentItem.answer ? '回答正确' : '回答错误'}】正确答案是 {currentItem.answer}
                          </strong>
                          <span>{currentItem.analysis}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 1:1 成语项目 - 底部导航控制按钮区 (未翻转或真题模式未作答时隐藏) */}
        <div className={`action-buttons ${(!isFlipped || (activeMode === 'quiz' && selectedQuizOption === null)) ? 'hidden' : ''}`}>
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

        {/* 1:1 成语项目 - 重置进度控制组件 */}
        <div className="controls">
          <button className="btn-text" onClick={() => {
            if (window.confirm('确定要重置当前模式下的学习进度吗？')) {
              localStorage.removeItem(`${STORAGE_KEY}_${activeMode}`);
              window.location.reload();
            }
          }}>
            <svg className="reset-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
            <span className="reset-text">重置进度</span>
          </button>
        </div>
      </main>
    </div>
  );
}
