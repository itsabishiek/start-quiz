import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/result/Result";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState();
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState();

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    console.log(data.results);
    setQuestions(data.results);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
            />
          </Route>

          <Route path="/quiz">
            <Quiz
              name={name}
              questions={questions}
              setQuestions={setQuestions}
              score={score}
              setScore={setScore}
            />
          </Route>

          <Route path="/result">
            <Result name={name} score={score} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
