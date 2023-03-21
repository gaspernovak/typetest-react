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
  const timerValue = 15
  const [words, setWords] = useState([]);
  const [counter, setCounter] = useState(-1);
  const [wpm, setWpm] = useState(0);
  const [entriesCounter, setEntriesCounter] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false);

  function handlePostLeaderboard() {
    const record = {
      "username": "foobar" + Math.floor(Math.random() * 100),
      "wpm": wpm
    }

    axios.post('http://localhost:8090/api/collections/leaderboard/records', record)
      .then(response => console.log(response))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        window.location.reload(true)
      })
  }

  function handleChange(event) {
    if (counter == -1) {
      setCounter(timerValue)
    }

    if (event.target.value == words[0] + " ") {
      setWords(words.slice(1))
      event.target.value = ''
      if (words.length == 1) {
        setWpm(calculateWpm(entriesCounter, (timerValue - counter)))
        setCounter(0)
      }
    }

    if(counter == 0){
      setWpm(calculateWpm(entriesCounter, (timerValue - counter)))
      setInputDisabled(true)
    }

    setEntriesCounter(entriesCounter + 1)
    detectError(event.target.value, words[0], document.getElementById(0))
  }

  useEffect(() => {
    axios.get("http://localhost:8090/api/collections/words/records?perPage=150").then((data) => {
      let words = []
      data.data.items.forEach(item => 
        words.push(item.word)  
      )
      setWords(words);
    });
  }, []);

  useEffect(() => {
    const timer = (counter > 0) && setInterval(() => 
      setCounter(counter - 1), 1000);
      return () => (
        clearInterval(timer)
      )
      

  }, [counter]);

  return (
    <div>
      <p className='Wpm'> WPM: {wpm} </p>
      <button onClick={handlePostLeaderboard}> submit </button>
      <div className="Wordlist">
        <div className='Timer'>
          {counter ? "00:" + counter : "00:00"}
        </div>
        <p>
          {words &&
            words.slice(0, 20).map((word, key) =>
              <span className="Word" id={key} key={key}>{word} </span>
            )
          }
        </p>
        <input autoFocus className="w-100 Word-input" onChange={handleChange} disabled={inputDisabled} />
      </div>
    </div>
  );
}

export default Typetest;
