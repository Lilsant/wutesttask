import React, { useEffect, useState } from "react";
import "./Calendar.css";

export default function Calendar() {
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
      console.log(weekday);
      dayInfo = {
        day: day,
        weekday: weekday,
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
          <div key={date.day} className="calendar__item">
            <span className="calendar__item-date">{date.day}</span>
            <span className="calendar__item-name">{date.weekday}</span>
          </div>
        );
      })}
    </div>
  );
}
