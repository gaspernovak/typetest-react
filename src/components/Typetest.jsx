import './Typetest.css';
import React, { useEffect, useState } from "react";
import axios from "axios"

function detectError(input, correctInput, wordElement) {
  let match = correctInput.match(input)
  if (match != input) {
    wordElement.classList.add("Word-error")
  } else {
    wordElement.classList.remove("Word-error")
  }
}

function calculateWpm(allEntries, timeSeconds) {
  return Math.floor((allEntries / 5) / (timeSeconds / 60))
}

function Typetest() {
  const timerValue = 30 
  const [words, setWords] = useState([]);
  const [counter, setCounter] = useState(0);

  const [wpm, setWpm] = useState(0);
  const [entriesCounter, setEntriesCounter] = useState(0);


  function handleChange(event) {
    if (counter == 0) {
      setCounter(timerValue)
    }

    if (event.target.value == words[0] + " ") {
      setWords(words.slice(1))
      event.target.value = ''
      if (words.length == 1){
        setWpm(calculateWpm(entriesCounter, (timerValue - counter)))
        setCounter(0)
      }
    }

    setEntriesCounter(entriesCounter + 1)
    detectError(event.target.value, words[0], document.getElementById(0))
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
      
      <p className='Wpm'> WPM: {wpm} </p>
      <div className="Wordlist">
        <div className='Timer'>
          {counter ? "00:" + counter : "00:00"}
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
