import React, { useState } from "react";
import "./TaskForm.css";

export default function TaskForm({ onFormSubmit }) {
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
    time: "",
    files: [],
  });

  return (
    <div className="form__container">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          setFormInfo((state) => ({ ...state, id: Date.now() }));
          onFormSubmit(formInfo);
          setFormInfo({
            title: "",
            description: "",
            time: "",
          });
        }}
      >
        <input
          className="form__input"
          placeholder="Title"
          onChange={(e) => {
            setFormInfo((state) => ({ ...state, title: e.target.value }));
          }}
          value={formInfo.title}
        />
        <input
          type="time"
          className="form__input"
          placeholder="Time"
          onChange={(e) => {
            setFormInfo((state) => ({ ...state, time: e.target.value }));
          }}
          value={formInfo.time}
        />
        <textarea
          className="form__input"
          placeholder="Description"
          onChange={(e) => {
            setFormInfo((state) => ({ ...state, description: e.target.value }));
          }}
          value={formInfo.description}
        />
        <input
          type="file"
          multiple
          className="form__input-files"
          onChange={(e) => {
            setFormInfo((state) => ({ ...state, filees: e.target.files }));
          }}
        />
        <button type="submit" className="form__btn">
          Add
        </button>
      </form>
    </div>
  );
}
