import { useState, useEffect, useRef } from 'react';
import { initialIdioms } from './data/idioms';
import './App.css';

const STORAGE_KEY = 'idiom-tracker-data-v4';

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

function App() {
  const [idioms, setIdioms] = useState([]);
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

  useEffect(() => {
    localStorage.setItem('idiom-tracker-random', isRandom);
  }, [isRandom]);

  useEffect(() => {
    localStorage.setItem('idiom-tracker-quiz-mode', quizMode);
  }, [quizMode]);

  useEffect(() => {
    // Load from local storage or use initial
    const stored = localStorage.getItem(STORAGE_KEY);
    let loadedIdioms = [];
    if (stored) {
      loadedIdioms = JSON.parse(stored);
    } else {
      loadedIdioms = initialIdioms.map(idiom => ({
        ...idiom,
        status: 'new' // 'new', 'known', 'unsure', 'unknown'
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedIdioms));
    }
    setIdioms(loadedIdioms);

    // Pick a random starting index if random mode is active on load
    const isRandomStored = localStorage.getItem('idiom-tracker-random') === 'true';
    if (isRandomStored && loadedIdioms.length > 0) {
      // Prioritize idioms that are not yet marked as 'known'
      const candidateIndices = [];
      loadedIdioms.forEach((idiom, index) => {
        if (idiom.status !== 'known') {
          candidateIndices.push(index);
        }
      });

      if (candidateIndices.length > 0) {
        const randIndex = candidateIndices[Math.floor(Math.random() * candidateIndices.length)];
        setCurrentIndex(randIndex);
      } else {
        const randIndex = Math.floor(Math.random() * loadedIdioms.length);
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

  useEffect(() => {
    // Small timeout to allow DOM to render new content before measuring
    setTimeout(() => {
      if (cardBackInnerRef.current) {
        // Measure the height required by the back of the card
        const contentHeight = cardBackInnerRef.current.scrollHeight;
        // Enforce a minimum height of 340px for the back card to prevent squishing
        setCardHeight(`${Math.max(340, contentHeight)}px`);
      }
    }, 50);
  }, [selectedOption, currentIdiom, isFlipped, quizMode]);

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
      <header className="header">
        <h1>
          <span>📚</span>
          <span className="title-text">成语题库</span>
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
          <div className="mode-toggle">
            <button className={`mode-btn ${quizMode === 'meaning' ? 'active' : ''}`} onClick={() => setQuizMode('meaning')}>释义模式</button>
            <button className={`mode-btn ${quizMode === 'sentence' ? 'active' : ''}`} onClick={() => setQuizMode('sentence')}>例句模式</button><span className="mode-divider"></span><button className={`mode-btn ${!isRandom ? 'active' : ''}`} onClick={() => setIsRandom(false)}>顺序</button>
            <button className={`mode-btn ${isRandom ? 'active' : ''}`} onClick={() => setIsRandom(true)}>随机</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className={`card-container ${selectedOption !== null ? 'expanded' : ''}`} style={{ height: cardHeight }} onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`card ${isFlipped ? 'flipped' : ''}`}>
            <div className="card-front">
              {quizMode === 'sentence' ? (
                <h2 className="idiom-word sentence-blank">
                  {currentExample ? currentExample.replace(new RegExp(currentIdiom.word, 'g'), '______') : '（暂无例句）'}
                </h2>
              ) : (
                <h2 className="idiom-word">{currentIdiom.word}</h2>
              )}
              <div className="card-hint">点击翻转查看{quizMode === 'sentence' ? '选项' : '释义'}</div>
              {currentIdiom.status !== 'new' && (
                <div className="status-badge" style={{backgroundColor: getStatusColor(currentIdiom.status)}}>
                  上次标记: {currentIdiom.status === 'known' ? '认识' : currentIdiom.status === 'unsure' ? '模糊' : '不认识'}
                </div>
              )}
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

        <div className={`action-buttons ${(!isFlipped || selectedOption === null) ? 'hidden' : ''}`}>
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
        
        <div className="controls">
          <button className="btn-text" onClick={() => {
            if(window.confirm('确定要重置所有学习进度吗？')) {
              localStorage.removeItem(STORAGE_KEY);
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

export default App;
