import React, { useState, useEffect } from 'react';
import './App.css';

// import the skull files as raw strings for vite use
import skull_prt1 from './assets/skull_prt1.txt?raw';
import skull_prt2 from './assets/skull_prt2.txt?raw';
import skull_prt3 from './assets/skull_prt3.txt?raw';
import skull_prt4 from './assets/skull_prt4.txt?raw';

// both arrays for the art and the bios start up
const ALL_ART = [skull_prt1, skull_prt2, skull_prt3, skull_prt4];
const BOOT_LOGS = [
  "",
  "Bios Version:           5S4WB8X0.06F",
  "Service tag:                   XXXXX",
  "System Time               [10:44:23]",
  "System Date         [Tue 12/30/2025]",
  ">Primary IDE        :[Not Detected]",
  ">Primary IDE Slave   :[Not Detected]",
  "SATA1           :[HJ-PT-ST DVDRM GH]",
  "SATA2             :[SAMSUNG HD103SJ]",
  "SATA3                :[Not Detected]",
  "SATA4               :[Not Dectected]",
  ">Storage Configuration              ",
  ">System Information                 ",
  "Legacy Diskette [1.44/1.25 MB 3^1/2]",
  "Legact Diskette B:        [Disabled]",
  ">Secondary Master             [None]",
  "Secondary Slave               [None]",
  "System Memory:                640 KB",
  "Extended Memory:          1047552 KB"
];

function App() {
  // make the system a simple state machine with it being off, on or booting up
  const [systemState, setSystemState] = useState('off');

  // the boot up is also going to be a state machine with displaying or not
  const [bootLines, setBootLines] = useState([]);

  // the index is for the array to show what skull im showing right now
  const [index, setIndex] = useState(0);

  // the cursor display on what part of the text is being spit out
  const [displayedContent, setDisplayedContent] = useState("");

  // seeing if the cursor is typing the text out or if it has went to the end
  const [isTyping, setIsTyping] = useState(false);

  // next page after the button for starting has been pressing and shows the bios set up, booting up
  useEffect(() => {
    if (systemState === 'booting') {
      let currentLine = 0;
      const interval = setInterval(() => {
        if (currentLine < BOOT_LOGS.length) {
          setBootLines(prev => [...prev, BOOT_LOGS[currentLine]]);
          currentLine++;
        } 
        
        else {
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
        } 
        
        else {
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
            Spec {i + 1}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;