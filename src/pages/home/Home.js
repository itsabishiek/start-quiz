import {
  Button,
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Categories from "../../data/Categories";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import "./Home.css";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSumbit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      history.push("/quiz");
    }
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#01bf71",
      },
      type: "dark",
    },
  });

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30, whiteSpace: "nowrap", color: "#01bf71" }}>
          Quiz Settings
        </span>

        <div className="settings__select">
          <ThemeProvider theme={darkTheme}>
            {error && <ErrorMessage>Please fill all the fields!</ErrorMessage>}
            <TextField
              style={{ marginBottom: 30 }}
              label="Enter Your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              select
              style={{ marginBottom: 30 }}
              label="Select Category"
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Categories.map((cat) => {
                return (
                  <MenuItem key={cat.category} value={cat.value}>
                    {cat.category}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              select
              style={{ marginBottom: 30 }}
              label="Select Difficulty"
              variant="outlined"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="hard">
                Hard
              </MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ color: "#fff" }}
              onClick={handleSumbit}
            >
              Start Quiz
            </Button>
          </ThemeProvider>
        </div>
      </div>

      <img src="/home_img.svg" className="banner" alt="quiz app" />
    </div>
  );
};

export default Home;
