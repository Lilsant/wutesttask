import React, { useState } from "react";
import "./TaskEditForm.css";

export default function TaskEditForm({ task, onSubmitEditForm }) {
  const [taskInfo, setTaskInfo] = useState(task);
  return (
    <div className="task__edit">
      <form
        className="task__edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitEditForm(taskInfo);
        }}
      >
        <div className="task__edit-main">
          <input
            className="task__edit-input task__edit-input--title"
            value={taskInfo.title}
            onChange={(e) => {
              setTaskInfo((state) => ({ ...state, title: e.target.value }));
            }}
          />
          <input
            type="time"
            className="task__edit-input task__edit-input--time"
            value={taskInfo.time}
            onChange={(e) => {
              setTaskInfo((state) => ({ ...state, time: e.target.value }));
            }}
          />
        </div>
        <div className="task__edit-more">
          <textarea
            type="textarea"
            className="task__edit-input task__edit-input--description"
            value={taskInfo.description}
            onChange={(e) => {
              setTaskInfo((state) => ({
                ...state,
                description: e.target.value,
              }));
            }}
          />
        </div>
        <button type="submit" className="form__btn form__btn--edit">
          Confirm
        </button>
      </form>
    </div>
  );
}
