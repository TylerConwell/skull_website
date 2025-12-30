import React, { useState, useEffect } from 'react';
import './App.css';

// Import all 4 ASCII files as raw strings
import art1 from './assets/skull_prt1.txt?raw';
import art2 from './assets/skull_prt2.txt?raw';
import art3 from './assets/skull_prt3.txt?raw';
import art4 from './assets/skull_prt4.txt?raw';

const ALL_ART = [art1, art2, art3, art4];
const BOOT_LOGS = [
  "Bios Version:           5S4WB8X0.06F",
  "Service tag:                   XXXXX",
  "                                    ",
  "System Time               [10:44:23]",
  "System Date         [Tue 12/30/2025]",
  "> Primary IDE        :[Not Detected]",
  "Master                              ",
  ">Primary IDE Slave   :[Not Detected]",
  "SATA1           :[HJ-PT-ST DVDRM GH]",
  "SATA2             :[SAMSUNG HD103SJ]",
  "SATA3                :[Not Detected]",
  "SATA4               :[Not Dectected]",
  ">Storage Configuration              ",
  ">System Information                  ",
  "Legacy Diskette [1.44/1.25 MB 3^1/2]",
  "Legact Diskette B:        [Disabled]",
  ">Secondary Master             [None]",
  "Secondary Slave               [None]",
  "System Memory:                640 KB",
  "Extended Memory:          1047552 KB",
];

function App() {
  const [systemState, setSystemState] = useState('off'); // 'off', 'booting', 'ready'
  const [bootLines, setBootLines] = useState([]);
  const [index, setIndex] = useState(0); // Which image are we on?
  const [displayedContent, setDisplayedContent] = useState(""); // The text currently typed
  const [isTyping, setIsTyping] = useState(false);
// --- BOOTING SEQUENCE LOGIC ---
  useEffect(() => {
    if (systemState === 'booting') {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < BOOT_LOGS.length) {
          setBootLines(prev => [...prev, BOOT_LOGS[currentLine]]);
          currentLine++;
        } else {
          clearInterval(interval);
          setTimeout(() => setSystemState('ready'), 1000); // Transition to main app
        }
      }, 400); // Speed of boot lines
      return () => clearInterval(interval);
    }
  }, [systemState]);

  // --- ASCII TYPING LOGIC (Only runs when systemState is 'ready') ---
  useEffect(() => {
    if (systemState === 'ready') {
      const lines = (ALL_ART[index] || "").trimEnd().split('\n');
      let currentLine = 0;
      setDisplayedContent("");
      setIsTyping(true);

      const interval = setInterval(() => {
        if (currentLine < lines.length) {
          const lineText = lines[currentLine];
          if (typeof lineText !== 'undefined') {
            setDisplayedContent(prev => prev + lineText + '\n');
          }
          currentLine++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [index, systemState]);

  // --- RENDER MODES ---

  if (systemState === 'off') {
    return (
      <div className="power-screen">
        <button className="power-btn" onClick={() => setSystemState('booting')}>
          [ POWER ON ]
        </button>
      </div>
    );
  }

  if (systemState === 'booting') {
    return (
      <div className="terminal-screen booting">
        {bootLines.map((line, i) => (
          <p key={i} className="boot-line">{line}</p>
        ))}
        <span className="cursor">█</span>
      </div>
    );
  }

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
            MODULE {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;