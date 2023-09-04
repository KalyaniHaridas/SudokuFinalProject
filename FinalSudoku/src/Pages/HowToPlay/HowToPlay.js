import React from "react";
import "./HowToPlay.css";

import { toast } from "react-toastify";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import logo from "../../images/e.jpg";

function HowToPlay() {
  const navigate = useNavigate();
  const ask = () => {
    toast.error("Logging Off");
    navigate("/");
  };
  return (
    <div>
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
                    onClick={() => navigate("/boardd")}
                    id="headerBtn"
                  >
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
            </div>
          </div>
        </nav>
      </div>
      <div className="Appp">
        <header className="Appp-header"></header>

        <main className="Appp-main">
          <h2>How to Play?</h2>
          <p>
            Welcome to the Sudoku game! The objective of the game is to fill the
            9x9 grid with digits so that each column, each row, and each of the
            nine 3x3 subgrids that compose the grid contain all of the digits
            from 1 to 9.
          </p>
          <h3>Here are the basic rules:</h3>
          <ol>
            <li>
              Each row must contain all the numbers from 1 to 9, without
              repetition.
            </li>
            <li>
              Each column must contain all the numbers from 1 to 9, without
              repetition.
            </li>
            <li>
              Each of the nine 3x3 subgrids must contain all the numbers from 1
              to 9, without repetition.
            </li>
          </ol>
          <h2>To play the game:</h2>
          <ol>
            <li>Select an empty cell.</li>
            <li>Choose a number from 1 to 9 that doesn't violate the rules.</li>
            <li>If the chosen number is valid, place it in the cell.</li>
            <li>
              Continue filling cells with numbers until the entire grid is
              complete.
            </li>
          </ol>
          <p>
            Keep in mind that each puzzle has a unique solution, and it's a
            great way to challenge your logic and deduction skills!
          </p>
        </main>
      </div>
    </div>
  );
}

export default HowToPlay;
