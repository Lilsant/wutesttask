import React, { useState } from "react";
import "./TaskForm.css";

export default function TaskForm() {
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
    time: "",
  });

  console.log(formInfo.title, " ", formInfo.description);
  return (
    <div className="form__container">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="form__input"
          placeholder="Title"
          onChange={(e) => {
            setFormInfo((state) => (state.title = e.target.value));
          }}
          value={formInfo.title}
        />
        <input
          className="form__input"
          placeholder="Description"
          onChange={(e) => {
            setFormInfo((state) => (state.description = e.target.value));
          }}
          value={formInfo.description}
        />
        <input type="time" className="form__input" placeholder="Time" />
        <button type="submit" className="form__btn">
          Add
        </button>
      </form>
    </div>
  );
}
