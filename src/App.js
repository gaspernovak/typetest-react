import './App.css';

function App() {

  function handleChange(event){
    console.log(event.target.value);
  }

  return (
    <div className="App" >
      <div className="Wordlist">
      <p>
        plague plain plan planet player plug podium poetry point police poodle pool pope popular porsche
      </p>
      <input className="input w-100" onChange={handleChange}/>
      </div>
    </div>
  );
}

export default App;
