import React, { useEffect, useState } from "react";
import "./Calendar.css";

export default function Calendar({ onDateClick }) {
  const [week, setWeek] = useState([]);
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
    <div className="calendar">
      {week.map((date) => {
        return (
          <div
            key={date.day}
            className="calendar__item"
            onClick={() => {
              onDateClick(date);
            }}
          >
            <span className="calendar__item-date">{date.day}</span>
            <span className="calendar__item-name">{date.weekday}</span>
          </div>
        );
      })}
    </div>
  );
}
