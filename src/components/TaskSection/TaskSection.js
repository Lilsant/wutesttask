import React, { useState } from "react";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";

export default function TaskSection({ tasks, onTaskArrChange }) {
  const [completedTaskArr, setCompletedTaskArr] = useState([]);
  console.log(tasks);
  function onFormSubmit(taskInfo) {
    taskInfo.id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10);
    const newArr = [...tasks, taskInfo];
    onTaskArrChange(newArr);
  }

  function onTaskEdit(taskInformation) {
    let currentId;
    tasks.forEach((el, i) => {
      if (el.id === taskInformation.id) currentId = i;
    });
    const newArr = tasks;
    newArr[currentId] = taskInformation;
    onTaskArrChange(newArr);
  }

  function deleteTask(number) {
    let currentTaskNumber;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === number) currentTaskNumber = i;
    }
    const newArr = [
      ...tasks.slice(0, currentTaskNumber),
      ...tasks.slice(currentTaskNumber + 1),
    ];
    onTaskArrChange(newArr);
  }

  function completeTask(number) {
    const completedTask = tasks.forEach((el) => {
      if (el.id === number) return el;
    });
    deleteTask(number);
    setCompletedTaskArr((state) => [...state, completedTask]);
  }
  return (
    <div>
      {tasks.length ? (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              completeTask={completeTask}
              onTaskEdit={onTaskEdit}
            />
          );
        })
      ) : (
        <span>На этот день не назначено никаких задач.</span>
      )}
      <TaskForm onFormSubmit={onFormSubmit} />
    </div>
  );
}
