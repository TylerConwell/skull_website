import React, { useState, useEffect } from 'react';
import './App.css';

// Import all 4 ASCII files as raw strings
import art1 from './assets/skull_prt1.txt?raw';
import art2 from './assets/skull_prt2.txt?raw';
import art3 from './assets/skull_prt3.txt?raw';
import art4 from './assets/skull_prt4.txt?raw';

const ALL_ART = [art1, art2, art3, art4];

function App() {
  const [index, setIndex] = useState(0); // Which image are we on?
  const [displayedContent, setDisplayedContent] = useState(""); // The text currently typed
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // 1. Safety check: ensure the art exists before splitting
    const content = ALL_ART[index] || "";
    const lines = content.split('\n');
    
    let currentLine = 0;
    setDisplayedContent(""); 
    setIsTyping(true);

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        const lineText = lines[currentLine];
        
        // 2. ONLY append if the line is not undefined
        if (typeof lineText !== 'undefined') {
          setDisplayedContent((prev) => prev + lineText + '\n');
        }
        
        currentLine++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="app-container">
      <div className="terminal-window">
        <pre className="ascii-art">
          {displayedContent}
          <span className="cursor">█</span>
        </pre>
      </div>

      <nav className="controls">
        {ALL_ART.map((_, i) => (
          <button 
            key={i} 
            onClick={() => !isTyping && setIndex(i)}
            className={index === i ? 'active' : ''}
            disabled={isTyping}
          >
            Art {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;