import "../../../src/Pages/Sudoku/Board.css";
import React from "react";

//component for displaying the board

export default function Board({ board, handleChange, handleFocus, mode }) {
  let cellId = 0;

  //go through each cell and display based on the object properties

  let theBoard = board.map((row) =>
    row.map((obj) => {
      let classes = getClasses(obj, cellId);
      let color = setColor(obj);
      let styles = {
        color: color,
        background: obj.highlighted ? "	rgb(211,211,211)" : "",
      };

      //handle notes
      let notes = []; //notes stores all the labels for each note
      obj.noteValues.forEach((noteValue) => {
        //it's location is determined by the class n1, n2, n3, etc.
        let noteClasses = "note-label n";
        noteClasses += String(noteValue);
        notes.push(
          <label key={Math.random()} className={noteClasses}>
            {noteValue}
          </label>
        );
      });

      //this is what theBoard will be a 2D array of
      return (
        <div key={Math.random()} className="cell-holder">
          {notes}
          <input
            //the " " space is critical as it makes a blank cell trigger onChange because " " !== ""
            value={obj.value === 0 ? " " : obj.value}
            //id is assigned 0 to 80 so onChange event can figure out which cell
            id={cellId++}
            className={classes}
            style={styles}
            onChange={handleChange}
            onFocus={handleFocus}
            readOnly={obj.fixed}
            //autoFocus makes it so the previously changed value is the focus - this was lost becase a new input was created each time
            autoFocus={obj.previouslyChanged}
            autoComplete="off"
          ></input>
        </div>
      );
    })
  );

  //determines the color to style the object with based on whether it's a fixed location and the mode you are in
  function setColor(obj) {
    let color = "gray";
    if (obj.fixed) color = "black";
    else if (mode === "Easy")
      if (obj.correctLocation) color = "green";
      else color = "red";
    return color;
  }

  //determines borders for edges of the board so they are darker.
  function getClasses(obj, cellId) {
    let classes = "cell ";
    classes += cellId % 27 < 9 ? "top " : "";
    classes +=
      cellId % 9 === 0 || cellId % 9 === 3 || cellId % 9 === 6 ? "left " : "";
    classes += cellId % 9 === 8 ? "right " : "";
    classes += cellId >= 72 ? "bottom " : "";
    return classes;
  }

  return <div id="sudoku-grid">{theBoard}</div>;
}
