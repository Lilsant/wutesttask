import React from "react";
import Calendar from "./components/Calendar/Calendar";
import Task from "./components/Task/Task";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  return (
    <div className="App">
      <Calendar />
      <Task />
      <TaskForm />
    </div>
  );
}

export default App;
