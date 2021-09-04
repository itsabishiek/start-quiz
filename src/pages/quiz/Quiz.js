import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Question from "../../components/question/Question";
import "./Quiz.css";

const Quiz = ({ name, questions, setQuestions, score, setScore }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#01bf71",
      },
      type: "dark",
    },
  });

  const handleShuffle = (opts) => {
    return opts.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [currQues, questions]);

  console.log(questions);
  console.log(options);

  return (
    <div className="quiz">
      <span className="subtitle">Welcome, {name}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>Score: {score}</span>
          </div>

          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            setQuestions={setQuestions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
          />
        </>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <CircularProgress
            style={{ margin: 100 }}
            color="primary"
            size={70}
            thickness={1}
          />
        </ThemeProvider>
      )}
    </div>
  );
};

export default Quiz;
