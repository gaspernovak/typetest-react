import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios"

function App() {

  const [words, setWords] = useState([]);
  const [word, setWord] = useState("")

  function handleChange(event){
    if(event.target.value == words[0] + " "){
      let temp = words.slice(1);
      setWords(temp) 
      event.target.value = ''
    }

    console.log(event.target.value.lenght)
  }

  useEffect(() => {
    axios.get("http://localhost:3001/wordlist").then((data) => {
      setWords(data?.data);
    });
  }, []);

  return (
    <div className="App" >
      <div className="Wordlist">
        <p>
          {words &&
            words.map((word, key) =>
              <span key={key}>{word} </span> 
            )
          }
        </p>
      <input className="input w-100" onChange={handleChange}/>
      </div>
    </div>
  );
}

export default App;
