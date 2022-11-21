import React, { useState } from "react";
import "./Task.css";
import more from "./more.svg";
import done from "./done.png";
import edit from "./edit.png";
import remove from "./delete.png";
import TaskEditForm from "../TaskEditForm/TaskEditForm";

export default function Task({ task, deleteTask, completeTask, onTaskEdit }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  console.log(task);

  function onEditBtnClick() {
    setIsEdit(true);
  }

  function onSubmitEditForm(taskInfo) {
    setIsEdit(false);
    onTaskEdit(taskInfo);
  }

  if (isEdit)
    return <TaskEditForm onSubmitEditForm={onSubmitEditForm} task={task} />;

  return (
    <div className="task">
      <div className="task__main">
        <div className="task__main-info">
          <h3 className="task__title">{task.title}</h3>
          <span className="task__time">{task.time}</span>
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
          <p className="task__description">{task.description}</p>
          <div className="task__buttons-container">
            <button
              className="task__btn task__btn--edit "
              onClick={() => {
                onEditBtnClick();
              }}
            >
              <img className="task__icon" src={edit} alt="edit" />
            </button>
            <button
              className="task__btn task__btn--delete"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <img className="task__icon" src={remove} alt="delete" />
            </button>
            <button
              className="task__btn task__btn--done "
              onClick={() => {
                completeTask(task.id);
              }}
            >
              <img className="task__icon" src={done} alt="done" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
