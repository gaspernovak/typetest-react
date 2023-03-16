import './Typetest.css';
import React, { useEffect, useState } from "react";
import axios from "axios"

function Typetest() {
  const [words, setWords] = useState([]);
  function handleChange(event){
    let etv = event.target
    
    if(etv.value == words[0] + " "){
      let temp = words.slice(1);
      setWords(temp) 
      etv.value = ''
    }

    let word = words[0].match(etv.value)
    var word_element = document.getElementById(0)
    if(word != etv.value){
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

  return (
    <div>
      <div className="Wordlist">
        <p>
          {words &&
            words.map((word, key) =>
              <span className id={key} key={key}>{word} </span> 
            )
          }
        </p>
      <input className="input w-100" onChange={handleChange}/>
      </div>
    </div>
  );
}

export default Typetest;
