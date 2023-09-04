import React from "react";

//the buttons at the bottom for switching to notes, undo, clear and show solution

function Tools({
    toggleNotesSetting,
    notesSetting,
    undoLastMove,
    clearBoard,
    endGame,
    getHint,
})  {
    return (
        <div className="settings-container ">
            <button className="btn btn-primary mx-2" onClick={toggleNotesSetting}>
            Notes
            {notesSetting && <div className="on-tooltip">ON</div>}
            </button>
            <button className="btn btn-primary mx-2" onClick={undoLastMove}>
            Undo
            </button>
            <button className="btn btn-primary mx-2" onClick={clearBoard}>
            Clear
            </button>
            {/* <button className="button-hint" onClick={getHint}>
            Hint
            </button> */}
            <button className="btn btn-primary mx-2 " onClick={endGame}>
            Show Solution
            </button>
           
      </div>
    );
}
export default Tools;