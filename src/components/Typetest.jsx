import './Typetest.css';
import React, { useEffect, useState } from "react";
import axios from "axios"

function Typetest() {
  const [words, setWords] = useState([]);
  
  const [counter, setCounter] = useState(0);

  function detectError(input, correctInput, wordElement){
    let match = correctInput.match(input)
    if (match != input) {
      wordElement.classList.add("Word-error")
    } else {
      wordElement.classList.remove("Word-error")
    }
  }

  function handleChange(event) {
    let etv = event.target

    if (counter == 0){
      setCounter(30)
    }

    if (etv.value == words[0] + " ") {
      let temp = words.slice(1);
      setWords(temp)
      etv.value = ''
    }

    detectError(etv.value, words[0], document.getElementById(0))

  }

  useEffect(() => {
    axios.get("http://localhost:3001/wordlist").then((data) => {
      setWords(data?.data);
    });
  }, []);

  useEffect(() => {
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
