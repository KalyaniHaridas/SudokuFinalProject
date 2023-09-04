import React from "react";
import "./SudokuFacts.css"; // Make sure to import the CSS file for styling



import {toast} from "react-toastify"
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logo from '../../images/e.jpg'


const SudokuFacts = () => {
  const navigate = useNavigate();
  const ask=()=>
  {
    toast.error("Logging Off")
    navigate("/")
  }
  return (
    <div>
       <div className="row shadow sticky-top">
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "black" }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logo}  alt="" id="headerlogoProfile" />
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
              <span className="navbar-toggler-icon" style={{ backgroundColor: "grey" }}></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" onClick={() => navigate("/boardd")} id="headerBtn">
                    Play Game
                  </a>
                </li>
                {/* <li className="nav-item">
                 <button className="btn btn-primary">Light</button>
                </li> */}
              
                {/* Add more menu items here */}
              </ul>
              <div className="">
                <motion.button
                  className="btn btn-primary SignButton float-start"
                  whileHover={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                  whileTap={{ backgroundColor: "rgb(220, 222, 224)", color: "black" }}
                  onClick={() => ask()}
                >
                 LogOut
                </motion.button>
              </div>
              <br></br>
              <br></br>
            </div>
          </div>
        </nav>
      </div>
    <div className="sudoku-facts-container">
      <div className="sudoku-facts-content">
        <h2>Sudoku Facts You Might Not Know About!</h2>
        <p className="sudoku-fact">
          Here are some interesting facts about the Sudoku Game :
        </p>
        <ul className="sudoku-fact-list">
          <li>
            Surprisingly Sudoku was not invented in Japan as popular belief it
            is the states instead!, it's origins actually traces back to France
            and date back to 1895!
          </li>
          <li>
            Sudoku wasn't widely known until it was published as a puzzle in a
            Japanese newspaper in the early 1980s.
          </li>
          <li>
            There must be AT LEAST 17 clues in order for a Sudoku Board to have
            a unique solution.
          </li>
          <li>
            Flight attendants can't solve Sudoku. Sudokus are addictive and also
            distracting, and a flight attendants' job is to pay attention to the
            passengers. Hence British Airways forbids it's attendants from
            playing Sudoku free puzzles during take-off and landing.
          </li>
          <li>
            The Guinness World Record for “the fastest time to complete a Sudoku
            is less than 1 minute and a half.
          </li>
          <li>
            Several celebrities have admitted to being addicted to Sudoku. A few
            of them are Neil Patrick Harris, Joan Rivers, and Wentworth Miller,
            to name a few.
          </li>
          <li>
            One cannot complete all of the possible Sudoku puzzles in an entire
            lifetime.There are far more than 1 billion valid Sudoku puzzles in
            existence!
          </li>
          <li>
            Sudoku has become one of the few healthy habits to develop an
            addiction to, even amongst health professionals advocating its many
            benefits.
          </li>
          <li>
            An additional advantage of this popular pastime is that it can be
            utilized as a suitable exercise for the brain in those inflicted
            with Alzheimers and Dementia, assisting them in maintaining mental
            development and alertness.
          </li>

          {/* Add more facts here */}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default SudokuFacts;
