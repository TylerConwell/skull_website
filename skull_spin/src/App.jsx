import React, { useState, useEffect } from 'react';
import './App.css';

// Import ASCII Assets
import skull_prt1 from './assets/skull_prt1.txt?raw';
import skull_prt2 from './assets/skull_prt2.txt?raw';
import skull_prt3 from './assets/skull_prt3.txt?raw';
import skull_prt4 from './assets/skull_prt4.txt?raw';

import hand_prt1 from './assets/hand_prt1.txt?raw';
import hand_prt2 from './assets/hand_prt2.txt?raw';
import hand_prt3 from './assets/hand_prt3.txt?raw';

// Data Arrays
const all_skull_pics = [skull_prt1, skull_prt2, skull_prt3, skull_prt4];
const all_hand_pics = [hand_prt1, hand_prt2, hand_prt3];

const boot_up_screen = [
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

const hand_boot_up = [
    "!!! CRITICAL ERROR !!!",
    "A problem has been detected and the system has been bypassed.",
    "CRITICAL THREAD TERMINATED.",
    "Manual Override Detected.",
    "STOP:0x000000F$ (0x00000003, 0x81F5AF14)",
    "LOADING REDACTED DATA..."
];

// Helper for the scramble/corruption effect
const scrambleText = (text) => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
    return text.split('').map(char => {
        if (char === '\n' || char === ' ') return char;
        return Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char;
    }).join('');
};

function App() {
    // State Machine
    const [system_state, set_system_state] = useState('off'); // off, booting, ready, glitching, hacked
    const [boot_lines, set_boot_lines] = useState([]);
    const [index, set_index] = useState(0);
    const [hand_index, set_hand_index] = useState(0);
    const [displayed_content, set_displayed_content] = useState("");
    const [is_typing, set_is_typing] = useState(false);
    const [is_corrupting, set_is_corrupting] = useState(false);

    // --- EFFECT: Handle Booting (Green) and Glitching (Red) Sequences ---
    useEffect(() => {
        if (system_state === 'booting' || system_state === 'glitching') {
            const logs = system_state === 'booting' ? boot_up_screen : hand_boot_up;
            let current_line = 0;
            set_boot_lines([]); 

            const interval = setInterval(() => {
                if (current_line < logs.length) {
                    set_boot_lines(prev => [...prev, logs[current_line]]);
                    current_line++;
                } else {
                    clearInterval(interval);
                    const nextState = system_state === 'booting' ? 'ready' : 'hacked';
                    setTimeout(() => set_system_state(nextState), 800);
                }
            }, 150);
            return () => clearInterval(interval);
        }
    }, [system_state]);

    // --- EFFECT: Typing Art Logic ---
    useEffect(() => {
        if (system_state === 'ready' || system_state === 'hacked') {
            const current_collection = (system_state === 'ready') ? all_skull_pics : all_hand_pics;
            const current_idx = (system_state === 'ready') ? index : hand_index;
            
            const lines = (current_collection[current_idx] || "").trimEnd().split('\n');
            let current_line = 0;
            set_displayed_content("");
            set_is_typing(true);

            const interval = setInterval(() => {
                if (current_line < lines.length) {
                    const line_text = lines[current_line];
                    if (typeof line_text !== 'undefined') {
                        set_displayed_content(prev => prev + line_text + '\n');
                    }
                    current_line++;
                } else {
                    clearInterval(interval);
                    set_is_typing(false);
                }
            }, 40);
            return () => clearInterval(interval);
        }
    }, [index, hand_index, system_state]);

    // --- HANDLER: Toggle with Corruption Effect ---
    const handleToggle = () => {
        if (is_typing || is_corrupting) return;
        set_is_corrupting(true);
        setTimeout(() => {
            set_is_corrupting(false);
            set_system_state(system_state === 'ready' ? 'glitching' : 'booting');
        }, 700);
    };

    // --- RENDER LOGIC ---

    if (system_state === 'off') {
        return (
            <div className="power-screen">
                <button className="power-btn" onClick={() => set_system_state('booting')}>[ POWER ON ]</button>
            </div>
        );
    }

    if (system_state === 'booting' || system_state === 'glitching') {
        return (
            <div className={`terminal-screen ${system_state}`}>
                {boot_lines.map((line, i) => (
                    <p key={i} className="boot-line">{line}</p>
                ))}
                <span className="cursor">█</span>
            </div>
        );
    }

    return (
        <div className={`app-container ${system_state === 'hacked' ? 'red-alert' : ''} ${is_corrupting ? 'glitch-shake' : ''}`}>
            <div className="terminal-window">
                <pre className="ascii-art">
                    {is_corrupting ? scrambleText(displayed_content) : displayed_content}
                    <span className="cursor">█</span>
                </pre>
            </div>

            <div className="interface-footer">
                <nav className="controls">
                    {(system_state === 'ready' ? all_skull_pics : all_hand_pics).map((_, i) => (
                        <button 
                            key={i}
                            onClick={() => !is_typing && (system_state === 'ready' ? set_index(i) : set_hand_index(i))}
                            className={(system_state === 'ready' ? index : hand_index) === i ? 'active' : ''}
                            disabled={is_typing || is_corrupting}
                        >
                            {system_state === 'ready' ? `Spec ${i + 1}` : `Data ${i + 1}`}
                        </button>
                    ))}
                </nav>

                <button className="toggle-system-btn" onClick={handleToggle} disabled={is_typing || is_corrupting}>
                    {system_state === 'ready' ? "ACCESS CLASSIFIED //" : "RESTORE SYSTEM //"}
                </button>
            </div>
        </div>
    );
}

export default App;