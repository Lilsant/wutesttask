import React, { useState } from "react";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";

export default function TaskSection({ tasks, onTaskArrChange }) {
  const [taskArr, setTaskArr] = useState(tasks);

  const [completedTaskArr, setCompletedTaskArr] = useState([]);
  function onFormSubmit(taskInfo) {
    const newArr = [...taskArr, taskInfo];
    setTaskArr(newArr);
    onTaskArrChange(newArr);
  }

  function deleteTask(number) {
    let currentTaskNumber;
    for (let i = 0; i < taskArr.length; i++) {
      if (taskArr[i].id === number) currentTaskNumber = i;
    }
    const newArr = [
      ...taskArr.slice(0, currentTaskNumber),
      ...taskArr.slice(currentTaskNumber + 1),
    ];
    setTaskArr(newArr);
    onTaskArrChange(newArr);
  }

  function completeTask(number) {
    const completedTask = taskArr.map((el) => {
      if (el.id === number) return el;
    });
    deleteTask(number);
    setCompletedTaskArr((state) => [...state, completedTask]);
  }
  return (
    <div>
      {taskArr.map((task) => {
        return (
          <Task
            task={task}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
        );
      })}
      <TaskForm onFormSubmit={onFormSubmit} />
    </div>
  );
}
