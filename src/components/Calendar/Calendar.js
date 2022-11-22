import React, { useEffect, useState } from "react";
import { db, getData, sendData } from "../../firebase/firebase";
import TaskSection from "../TaskSection/TaskSection";
import { collection, addDoc, getDocs } from "firebase/firestore";

import "./Calendar.css";

export default function Calendar() {
  const [dayNumber, setDayNumber] = useState(0);
  const [week, setWeek] = useState([]);

  async function getDataNow() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    if (querySnapshot.size == 0) return null;
    querySnapshot.forEach((doc) => console.log(doc.data()));
  }

  function onDateClick(currentDay) {
    setDayNumber(currentDay);
  }

  function onTaskArrChange(arr) {
    let newElement = week[dayNumber];
    newElement.tasks = arr;
    let newArr = [
      ...week.slice(0, dayNumber),
      newElement,
      ...week.slice(dayNumber + 1),
    ];
    newArr.map((el) => {
      el.tasks.sort((a, b) => {
        return (
          parseFloat(a.time.replace(":", "")) -
          parseFloat(b.time.replace(":", ""))
        );
      });
    });
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
    const data = getData();
    data.then((res) => {
      if (res === null) sendData(week);
      return;
    });
    getDataNow();
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
                className={
                  i === dayNumber
                    ? "calendar__item calendar__item--active"
                    : "calendar__item"
                }
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
