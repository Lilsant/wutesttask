import React, { useState } from "react";
import "./Task.css";
import more from "./more.svg";
import done from "./done.png";
import edit from "./edit.png";
import remove from "./delete.png";

export default function Task() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="task">
      <div className="task__main">
        <div className="task__main-info">
          <h3 className="task__title">React Chill</h3>
          <span className="task__time">10:45 PM</span>
        </div>
        <button
          className="task__button"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? (
            <img
              className="task__button-icon task__button-icon--reverse"
              src={more}
              alt="learn more"
            />
          ) : (
            <img className="task__button-icon" src={more} alt="learn more" />
          )}
        </button>
      </div>
      {isVisible ? (
        <div className="task__more">
          <p className="task__description">
            Do React ToDo app For WomanUp and just Chill
          </p>
          <div className="task__buttons-container">
            <button className="task__btn task__btn--edit ">
              <img className="task__icon" src={edit} alt="edit" />
            </button>
            <button className="task__btn task__btn--delete ">
              <img className="task__icon" src={remove} alt="delete" />
            </button>
            <button className="task__btn task__btn--done ">
              <img className="task__icon" src={done} alt="done" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
