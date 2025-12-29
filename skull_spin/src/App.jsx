import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [skull_prt1, setSkullFirst] = useState("");
  const [skull_prt2, setSkullSecond] = useState("");
  const [skull_prt3, setSkullThird] = useState("");
  const [skull_prt4, setSkullFourth] = useState("");


  useEffect(() => {
    fetch("/assets/setSkullFirst.txt")
      .then(res => res.text())
      .then(setSkullFirst);

    fetch("/asset/setSkullSecond.txt")
      .then(res => res.text())
      .then(setSkullSecond);

    fetch("/asset/setSkullThird.txt")
      .then(res => res.text())
      .then(setSkullThird);

    fetch("/asset/setSkullFourth.txt")
      .then(res => res.text())
      .then(setSkullFourth);
  }, []);

  return (
    <pre className="skull">
      {skull_prt1}
      {skull_prt2}
      {skull_prt3}
      {skull_prt4}
    </pre>
  );
}

export default App
