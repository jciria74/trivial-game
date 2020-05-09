import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MyContext from "./context";
import Home from "./Components/Home/Home";
import Quizz from "./Components/Quizz/Quizz";


function App() {
  
  //Estado
  const [hooksState, setHooksState] = useState({
    dataAPI: '',
    isloaded: '',
    points: 0
  });
  //Para poder exportar el estado y la funcion que lo cambia desde cualquier componente mediante contexto:
  const stateAndFunction = { hooksState, setHooksState };


  return (
    <MyContext.Provider value={stateAndFunction}>
      <Router>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/quizz" exact component={Quizz} />
        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
