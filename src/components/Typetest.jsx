import './Typetest.css';
import React, { useEffect, useState } from "react";
import axios from "axios"

function Typetest() {
  const [words, setWords] = useState([]);
  
  const [counter, setCounter] = useState(0);

  function handleChange(event) {
    if (counter == 0){
      setCounter(30)
    }
    let etv = event.target

    if (etv.value == words[0] + " ") {
      let temp = words.slice(1);
      setWords(temp)
      etv.value = ''
    }

    let word = words[0].match(etv.value)
    var word_element = document.getElementById(0)
    if (word != etv.value) {
      word_element.classList.add("Word-error")
    } else {
      word_element.classList.remove("Word-error")
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3001/wordlist").then((data) => {
      setWords(data?.data);
    });
  }, []);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
      <div className="Wordlist">
        <div className='Timer'>
          {counter ? "00:"+counter : "00:00"}
        </div>
        <p>
          {words &&
            words.map((word, key) =>
              <span className="Word" id={key} key={key}>{word} </span>
            )
          }
        </p>
        <input autoFocus className="w-100 Word-input" onChange={handleChange} />
      </div>
    </div>
  );
}

export default Typetest;
