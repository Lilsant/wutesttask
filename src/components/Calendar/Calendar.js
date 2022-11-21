import React, { useEffect, useState } from "react";
import TaskSection from "../TaskSection/TaskSection";
import "./Calendar.css";

export default function Calendar() {
  const [dayNumber, setDayNumber] = useState(0);
  const [week, setWeek] = useState([]);
  const [isActive, setIsActive] = useState(false);

  function onDateClick(currentDay) {
    setDayNumber(currentDay);
    console.log(week);
  }

  function onTaskArrChange(arr) {
    let newElement = week[dayNumber];
    newElement.tasks = arr;
    let newArr = [
      ...week.slice(0, dayNumber),
      newElement,
      ...week.slice(dayNumber + 1),
    ];
    setWeek(newArr);
  }

  function createWeekArray() {
    for (let i = 0; i <= 6; i++) {
      let curr = new Date();
      let dayInfo = {};
      let first = curr.getDate() + i;
      let day = new Date(curr.setDate(first)).getDate();
      let weekday = new Date(curr.setDate(first))
        .toLocaleString("en-us", {
          weekday: "long",
        })
        .slice(0, 3);
      dayInfo = {
        id: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(2, 10),
        day: day,
        weekday: weekday,
        tasks: [],
      };
      setWeek((state) => [...state, dayInfo]);
    }
  }

  useEffect(() => {
    createWeekArray();
  }, []);

  if (!week) {
    return null;
  }
  return (
    <>
      <div className="calendar">
        {week.map((date, i) => {
          return (
            <>
              <div
                key={date.day}
                className="calendar__item"
                onClick={() => {
                  onDateClick(i);
                }}
              >
                <span className="calendar__item-date">{date.day}</span>
                <span className="calendar__item-name">{date.weekday}</span>
              </div>
            </>
          );
        })}
      </div>
      {dayNumber ? (
        <TaskSection
          tasks={week[dayNumber].tasks}
          onTaskArrChange={onTaskArrChange}
        />
      ) : null}
    </>
  );
}
