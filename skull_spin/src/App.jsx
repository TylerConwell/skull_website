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