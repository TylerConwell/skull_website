import React, {useState, useEffect} from 'react';
import './App.css';

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


    // next page after button pushed and boot up shown
    useEffect(() => {
        
    })
}