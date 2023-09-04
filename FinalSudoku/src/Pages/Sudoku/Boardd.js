/**
 * React component for the Footer Section.
 */
import { toast } from "react-toastify";
import "../../../src/Pages/Sudoku/Board.css";
import { sudokuSolver, createRandomBoard, trimBoard } from "./sudoku";
import Settings from "./Settings";
import Board from "./Board";
import Tools from "./Tools";
import Confetti from "react-confetti";
import { useState, useEffect, useMemo, useRef } from "react";
import React from "react";
import "./Board.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logo from "../../images/e.jpg";
import axios from "axios";
export default function Boardd() {
  const [initialBoard, setInitialBoard] = useState(); //this is the original state board in object form, stored for resetting upon clear, this gets set upon creation of the board
  const [board, setBoard] = useState(); //this is the current updating board in obj form
  const [gameOn, setGameOn] = useState(false); //game has started - board has been created
  //whether you have won or not
  const [mode, setMode] = useState("Easy"); //for toggling between coloring correct answers and not
  const [difficulty, setDifficulty] = useState(40); //user can select how many starting cells
  const [notesSetting, setNotesSetting] = useState(false); //toggle between inputting notes and not
  const [winSec, setWinSec] = useState("");
  const [winMin, setWinMin] = useState("");
  const [player, setPlayer] = useState();
  const [isFrozen, setIsFrozen] = useState(false);

  const [data, setData] = useState([]);
  //initialBoard doesn't need to be state bc it doesn't cause a rerender. It needs to udpate on a new game...
  //however it appears some other variables depend on it

  // const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  // };

  // function getEvents() {
  //   axios
  //     .get("http://localhost:8080/api/players/get-player")
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setData(data);
  //     });
  // }
  // useEffect(() => {
  //   getEvents();
  // }, []);
  const upda = () => {
    navigate("/update");
  };

  const resetTimer = () => {
    setWinMin(0);
    setWinSec(0);
    setIsFrozen(false);
  };

  useEffect(() => {
    let interval;
    if (gameOn) {
      if (!isFrozen) {
        interval = setInterval(() => {
          if (winSec === 59) {
            setWinMin((minutes) => minutes + 1);
            setWinSec(0);
          } else {
            setWinSec((seconds) => seconds + 1);
          }
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [winSec, isFrozen, gameOn]);

  //array containing the state of the board before each change
  const undoMoves = useRef([]);

  //solutionBoard only changes if a new game is made, hence it only listens for the initalBoard to change
  const solutionBoard = useMemo(() => {
    if (gameOn) return solveBoard();
    // eslint-disable-next-line
  }, [initialBoard]);
  const [win, setWin] = useState(false);
  //check for win every time board changes

  const getPlayerId = () => {
    const playerId = sessionStorage.getItem("currentplayerId");
    return playerId;
  };
  const winstatus = () => {
    const play = getPlayerId();
    const body = {
      winMin,
      winSec,
      player: { playerId: play },
    };
    const url = `http://localhost:7071/winstatus/save`;
    axios.post(url, body).then((response) => {
      const result = response.data;
      if (result.status == undefined) {
        console.log("value successfully applied");
      } else {
        console.log("something happened");
      }
    });
  };

  useEffect(() => {
    if (!gameOn) return;

    if (checkWin()) {
      setWin(true);
      console.log(win.status);
      setWinMin(winMin);
      setWinSec(winSec);
      endGame();
      winstatus();
    }
    // eslint-disable-next-line
  }, [board]);

  //compares each cell's value with the solutionBoard
  function checkWin() {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (board[i][j].value !== solutionBoard[i][j]) return false;

    return true;
  }

  //event handler when create new board button is pressed
  function startGame() {
    resetTimer();
    //reset everything to default values
    setGameOn(true);
    setWin(false);
    setMode("Easy");
    setNotesSetting(false);
    //setTimeGameStarted(moment());
    undoMoves.current = [];

    //create randomBoard and trim using sudoku.js algorithms
    let randomBoard = createRandomBoard();
    trimBoard(randomBoard, difficulty);

    //turn the sudoku board of values into objects
    randomBoard = randomBoard.map((row) =>
      row.map((value) => ({
        value,
        noteValues: new Set(), //set not array bc can't repeat
        fixed: value !== 0,
        previouslyChanged: false,
        correctLocation: true,
        highlighted: false,
      }))
    );
    setInitialBoard(randomBoard);
    setBoard(randomBoard);
  }

  //event listener for input field onChange
  function cellChanged(event) {
    let enteredValue = event.target.value; //comes in as a string

    //if it's not empty, only get the last digit
    if (enteredValue !== "")
      enteredValue = enteredValue[enteredValue.length - 1];

    //only allow 1 - 9
    if (enteredValue === "0" || isNaN(enteredValue)) return;

    //each cell in Board component has an id 0 to 80, which gets converted to a row and col
    let cellNum = event.target.id;
    let row = Math.floor(cellNum / 9);
    let col = cellNum % 9;

    //add the current state of the board before it changes
    undoMoves.current.push(board);

    // send the cell and value that was changed
    //note that a value of "" gets converted to 0 by Number()
    adjustBoard(row, col, Number(enteredValue));
  }

  //this gets called by cellChanged and does the work to change the board
  function adjustBoard(row, col, enteredValue) {
    //determine if enteredValue should be for a note or the cell
    let noteValue;
    if (notesSetting) {
      noteValue = enteredValue;
      enteredValue = 0;
    }

    //if in notes, noteValue is the enteredValue and enteredValue is set to 0
    //otherwise noteValue is undefined

    setBoard((prevBoard) => {
      let newBoard = [[], [], [], [], [], [], [], [], []];
      for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
          //for the cell that was changed:
          if (i === row && j === col) {
            newBoard[i][j] = {
              ...prevBoard[i][j],
              value: enteredValue, //was set to 0 above if in note setting
              noteValues: new Set([...prevBoard[i][j].noteValues]), //same as before, but will add or remove currentnoteValue below
              previouslyChanged: true,
              correctLocation:
                enteredValue === 0 || enteredValue === solutionBoard[i][j],
              highlighted: enteredValue !== 0, //if not a notevalue, then definitely highlight because it's the one with focus
            };
            //this is where noteValues are updated, by trying to delete if already there or adding if not
            if (notesSetting && noteValue !== 0)
              //tries to delete it first. If false, that means it wasn't there to delete, so add
              !newBoard[i][j].noteValues.delete(noteValue) &&
                newBoard[i][j].noteValues.add(noteValue);
            else newBoard[i][j].noteValues.clear(); //if not in noteSetting, then all notes clear
          } else
            newBoard[i][j] = {
              ...prevBoard[i][j],
              previouslyChanged: false,
              highlighted:
                prevBoard[i][j].value === enteredValue && enteredValue !== 0, //highlights if it matches the entered value. If in note setting, it won't do anything because enteredValue == 0
            };

      return newBoard;
    });
  }

  //EventListener for input onFocus event
  //used for determining what to highlight
  function cellFocused(event) {
    let cellNum = event.target.id;
    let row = Math.floor(cellNum / 9);
    let col = cellNum % 9;

    //this is the value that I will check all cells with to determine if they should be highlighted
    let focusedValue = board[row][col].value;

    //make sure it's not the previous focus or it goes into an infinte loop since state will change and it will trigger refocus
    if (!board[row][col].previouslyChanged) {
      setBoard((prevBoard) => {
        let newBoard = [[], [], [], [], [], [], [], [], []];
        for (let i = 0; i < 9; i++)
          for (let j = 0; j < 9; j++)
            newBoard[i][j] = {
              ...prevBoard[i][j],
              noteValues: new Set([...prevBoard[i][j].noteValues]), //felt like there was a glitch with pointers and needed to re copy the entire set
              previouslyChanged: i === row && j === col,
              highlighted:
                focusedValue !== 0 && prevBoard[i][j].value === focusedValue,
            };

        return newBoard;
      });
    }
  }

  //initialize empty board - copy initalBoard's value contents (not object) into it and call sudoku solver
  function solveBoard() {
    let boardToSolve = [];
    for (let i = 0; i < 9; i++) {
      boardToSolve.push([]);
      for (let j = 0; j < 9; j++)
        boardToSolve[i].push(initialBoard[i][j].value);
    }

    sudokuSolver(boardToSolve, 0, 0);
    return boardToSolve;
  }

  function endGame() {
    setGameOn(false);
    setIsFrozen(true);

    //to not allow further changes - setBoard to the solutionBoard by converting it to objects (everything fixed)
    let solutionBoardDisplay = solutionBoard.map((row) =>
      row.map((value) => ({
        value,
        noteValues: new Set(),
        fixed: true,
        previouslyChanged: false,
        correctLocation: true,
      }))
    );
    setBoard(solutionBoardDisplay);
  }

  //eventHandler for undo button
  //sets it back to last boardState
  function undoLastMove() {
    if (undoMoves.current.length === 0) return;
    let lastBoardState = undoMoves.current.pop();
    setBoard(lastBoardState);
  }

  function getHint() {
    // let newBoardState = [];
    // for (let i = 0; i < 9; i++) {
    //   newBoardState.push([]);
    //   for (let j = 0; j < 9; j++)
    //     newBoardState[i].push(initialBoard[i][j].value);
    //}

    //   If solution was found
    // Finding all the empty nodes from the orginal given board
    let emptyNodePositionList = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j].value === 0) {
          emptyNodePositionList.push([i, j]);
        }
      }
    }
    // console.log(emptyNodePositionList[0]);

    // Selecting Random element from the empty nodes list
    const randomIndex = Math.floor(
      Math.random() * emptyNodePositionList.length
    );
    let row = emptyNodePositionList[randomIndex][0];
    let col = emptyNodePositionList[randomIndex][1];

    let newBoardState = board;
    // let solvedstate = solveBoard();
    newBoardState[row][col].value = solutionBoard[row][col].value;
    // board[row][col].isHinted = true;
    // board[row][col].isModifiable = false;

    setBoard(newBoardState);
  }

  //event handler for clear button. Resets the undo history and resets board
  function clearBoard() {
    resetTimer();
    undoMoves.current = [];
    setBoard(initialBoard);
  }

  function toggleMode() {
    setMode((prevMode) => (prevMode === "Easy" ? "Hard" : "Easy"));
  }

  function toggleNotesSetting() {
    setNotesSetting((prevNotesSetting) => !prevNotesSetting);
  }

  function handleSliderChange(event) {
    setDifficulty(event.target.value);
  }

  const [currentForm, setCurrentForm] = useState("login");
  const navigate = useNavigate();

  const loginstatus = sessionStorage.getItem("currentloginStatus");
  const checkLogin = () => {
    if (loginstatus !== "1") {
      var drop = document.getElementById("dropdown-basic");
      if (drop) {
        drop.disabled = true;
      }
    }
  };

  // Define your functions for opening and closing the signup and signin modals
  const [signUpModal, setSignUpModal] = useState(false);
  const openSignUp = () => {
    navigate("/Signup");
    setSignUpModal(true);
  };
  const closeSignUp = () => setSignUpModal(false);

  const [signInModal, setSignInModal] = useState(false);
  const openSignIn = () => {
    navigate("/signup");
    setSignInModal(true);
  };

  const closeSignIn = () => setSignInModal(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const ask = () => {
    toast.error("Logging Off");
    navigate("/");
  };
  return (
    <div className="containe">
      <div className="row shadow sticky-top">
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "black" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="" id="headerlogoProfile" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: "white" }}
            >
              <span
                className="navbar-toggler-icon"
                style={{ backgroundColor: "grey" }}
              ></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => ask()}
                    id="headerBtn"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => navigate("/howtoplay")}
                    id="headerBtn"
                  >
                    How To Play?
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => navigate("/sudokufacts")}
                    id="headerBtn"
                  >
                    Sudoku Facts
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => navigate("/feedback")}
                    id="headerBtn"
                  >
                    Feedback
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => navigate("/winstatus")}
                    id="headerBtn"
                  >
                    Win-Status
                  </a>
                </li>
                {/* <li className="nav-item">
                 <button className="btn btn-primary">Light</button>
                </li> */}

                {/* Add more menu items here */}
              </ul>
              <div className="">
                <motion.button
                  className="btn btn-primary SignButtn  mx-3 float-start"
                  whileHover={{
                    backgroundColor: "rgb(220, 222, 224)",
                    color: "black",
                  }}
                  whileTap={{
                    backgroundColor: "rgb(220, 222, 224)",
                    color: "black",
                  }}
                  onClick={() => ask()}
                >
                  LogOut
                </motion.button>
              </div>
              <div className="">
                <motion.button
                  className="btn btn-primary SignButto float-start"
                  whileHover={{
                    backgroundColor: "rgb(220, 222, 224)",
                    color: "black",
                  }}
                  whileTap={{
                    backgroundColor: "rgb(220, 222, 224)",
                    color: "black",
                  }}
                  onClick={() => upda()}
                >
                  Update Profile
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <center>
        <h1 className="my-10 py-1">SUDOKU</h1>
      </center>
      <br />

      <Settings
        // switchTheme={switchTheme}
        difficulty={difficulty}
        handleSliderChange={handleSliderChange}
        startGame={startGame}
        minutes={winMin}
        seconds={winSec}
        mode={mode}
        toggleMode={toggleMode}
      />
      {board !== undefined && (
        <Board
          board={board}
          handleChange={cellChanged}
          handleFocus={cellFocused}
          mode={mode}
        ></Board>
      )}
      {gameOn && (
        <Tools
          toggleNotesSetting={toggleNotesSetting}
          notesSetting={notesSetting}
          undoLastMove={undoLastMove}
          clearBoard={clearBoard}
          endGame={endGame}
          getHint={getHint}
        />
      )}
      <div className="containe">
        {win && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={false}
            confettiSource={{
              x: window.innerWidth / 2,
              y: window.innerHeight / 2,
            }}
          />
        )}
      </div>
    </div>
  );
}
