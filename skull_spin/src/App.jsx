import React, {useState, useEffect} from 'react';
import './App.css';
// import Footer from './components/Footer';

// import all the ascii skulls as raw str's for vite
import skull_prt1 from './assets/skull_prt1.txt?raw';
import skull_prt2 from './assets/skull_prt2.txt?raw';
import skull_prt3 from './assets/skull_prt3.txt?raw';
import skull_prt4 from './assets/skull_prt4.txt?raw';

// import all the ascii hands as raw str's as well
import hand_prt1 from './assets/hand_prt1.txt?raw';
import hand_prt2 from './assets/hand_prt2.txt?raw';
import hand_prt3 from './assets/hand_prt3.txt?raw';

// adding the array for the skull ascii pics
const all_skull_pics = [skull_prt1, skull_prt2, skull_prt3, skull_prt4];

// adding the array for the hand ascii pics
const all_hand_pics = [hand_prt1, hand_prt2, hand_prt3];

// array for the boot up screen with text for cursor iteration
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

// hacked screen, for the hands, in red
const hand_boot_up = [
    "",
    "A problem has been detected and windows has been shut down",
    " to prevent damage to your computer.",
    "A process of thread crucial to system operation has unexpectedly",
    " exited or been terminated.",
    "If this is the first time you've seen this stop error screen,",
    "restart yo _  ur com _ pUterRrrr.",
    "",
    "STOP:0x000000F$ (0x00000003, 0x81F5AF14, 0x805C749A)",
    "Loading redacted data..."
];

// corruption funct for the scrambling of the words
const scrambleText = (text) => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/"
    return text.split('').map(char => {
        if (char === '/n' || char === ' ') return char;
        return Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char;
    }).join('');
};

function App() {
    // make state machine for the power screen, tell if system off or on
    const [system_state, set_system_state] = useState('off');

    // state for the boot up screen when its displaying
    const [boot_lines, set_boot_lines] = useState([]);

    // state for indexing of variable in the arrays
    const [index, set_index] = useState(0);

    // state for indexing the hand ascii as well if diff
    const [hand_index, set_hand_index] = useState(0);

    // state for what is displaying and when
    const [displayed_content, set_displayed_content] = useState("");

    // state for cursor on what is being texted on screen
    const [is_typing, set_is_typing] = useState(false);
    // state for the second hacker screen
    const [is_corrupting, set_is_corrupting] = useState(false);

    // next page after button pushed and boot up shown
    useEffect(() => {
        // if the system is booting up then start the cursor text
        if (system_state === 'booting' || system_state === 'glitching') {
            const logs = system_state === 'booting' ? boot_up_screen : hand_boot_up;
            let current_line = 0;
            set_boot_lines([]);

            const interval = setInterval(() => {
                // if not at the end then keep printing
                // if (current_line < boot_up_screen.length) {
                //     set_boot_lines(prev => [...prev, boot_up_screen[current_line]]);
                //     current_line++;
                // }

                if (current_line < logs.length) {
                    set_boot_lines(prev => [...prev, logs[current_line]]);
                    current_line++;
                }

                else {
                    // when at the end of the text go to other screen
                    clearInterval(interval);
                    const nextState = system_state === 'booting' ? 'ready' : 'hacked';
                    setTimeout(() => set_system_state(nextState), 800);
                    // setTimeout(() => set_system_state('ready'), 1000);
                }
            }, 400); // the speed of the boot_up_lines going down
            return() => clearInterval(interval);
        }
    }, [system_state]);


    // glitch and hacking booting up logic in green and red
    useEffect(() => {
        if (system_state === 'ready' || system_state === 'hacked') {
            const current_collection = (system_state === 'ready') ? all_skull_pics : all_hand_pics;
            const current_idx = (system_state === 'ready') ? index : hand_index;
            const lines = (current_collection[current_idx] || "").trimEnd().split('\n')
            let current_line = 0;
            set_displayed_content("");
            set_is_typing(true);

            // set_boot_lines([]); // clears the old bios screen
            // const interval = setInterval(() => {
            //     if (current_line < hand_boot_up.length) {
            //         set_boot_lines(prev => [...prev, hand_boot_up[current_line]]);
            //         current_line++;
            //     }
            const interval = setInterval(() => {
                if (current_line < lines.length) {
                    const line_text = lines[current_line];
                    if (typeof line_text !== 'undefined') {
                        set_displayed_content(prev => prev + line_text + '\n');
                    }
                    current_line++;
                }
                else {
                    clearInterval(interval);
                    // setTimeout(() => set_system_state('hacked'), 1500); // put hacked in the system state
                    set_is_typing(false);
                }
            }, 400);
            return () => clearInterval(interval);
        }
    }, [index, hand_index, system_state]);

    // toggle the corruption effect on the hacked screen
    const handleToggle = () => {
        if (is_typing || is_corrupting) return;
        set_is_corrupting(true);
        setTimeout(() => {
            set_is_corrupting(false);
            set_system_state(system_state === 'ready' ? 'glitching' : 'booting');
        }, 700);
    };

    // render logic
    if (system_state === 'off') {
        return (
            <div className="power-screen">
                <button className="power-btn" onClick={() => set_system_state('booting')}>
                        [POWER ON]
                </button>
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

    // // ascii typing effect logic, scrolling down when 'ready'
    // useEffect(() => {
    //     const current_collection = (system_state === 'ready') ? all_skull_pics : all_hand_pics;
    //     const current_art_index = (system_state === 'ready') ? index : hand_index;

    //     if (system_state === 'ready') {
    //         const lines = (all_skull_pics[index] || "").trimEnd().split('\n');
    //         let current_line = 0;
    //         set_displayed_content("");
    //         set_is_typing(true);

    //         const interval = setInterval(() => {
    //             if (current_line < lines.length) {
    //                 const line_text = lines[current_line];
    //                 if (typeof line_text !== 'undefined') {
    //                     set_displayed_content(prev => prev + line_text + '\n');
    //                 }
    //                 current_line++;
    //             }

    //             else {
    //                 clearInterval(interval);
    //                 set_is_typing(false);
    //             }
    //         }, 50);
    //         return() => clearInterval(interval);
    //     }
    // }, [index, system_state]);

    // // state of button if its on then it clicks button and goes to the other page for booting
    // if (system_state === 'off') {
    //     return (
    //         <div className="power-screen">
    //             <button className="power-btn" onClick={() => set_system_state('booting')}>
    //                     [POWER ON]
    //             </button>
    //         </div>
    //     );
    // }

    // // booting up screen does the cursor and will use a hash map to save the info
    // if (system_state === 'booting') {
    //     return (
    //         <div className="terminal-screen booting">
    //             {boot_lines.map((line, i) => (
    //                 <p key={i} className="boot-line">{line}</p>
    //             ))}
    //             <span className="cursor">█</span>
    //         </div>
    //     );
    // }

    // making the part where it all gonna print out and see whats broken
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