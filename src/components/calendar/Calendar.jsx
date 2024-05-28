import dayjs from "dayjs";
import { useState } from "react";
import { generateDate, months } from "../../utils/generateDate";
import cn from "../../utils/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Calendar({ handleDateChange }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDates, setSelectedDates] = useState([]);

  const nextMonth = today.add(1, "month");

  const isDateSelected = (date) => {
    return selectedDates.some((d) => d.isSame(date, "day"));
  };

  const handleDateClick = (date) => {
    let newSelectedDates = [];
  
    if (selectedDates.length === 2) {
      if (isDateSelected(date)) {
        newSelectedDates = selectedDates.filter((d) => !d.isSame(date, "day"));
      } else {
        const closestDateIndex = selectedDates.findIndex(
          (d) =>
            Math.abs(d.diff(date, "day")) ===
            Math.min(...selectedDates.map((d) => Math.abs(d.diff(date, "day"))))
        );
        newSelectedDates = [...selectedDates];
        newSelectedDates[closestDateIndex] = date;
      }
    } else if (selectedDates.length === 1) {
      if (isDateSelected(date)) {
        newSelectedDates = selectedDates.filter((d) => !d.isSame(date, "day"));
      } else {
        newSelectedDates = [...selectedDates, date];
      }
    } else {
      newSelectedDates = [date];
    }
  
    setSelectedDates(newSelectedDates);
    handleDateChange(newSelectedDates);
  };
  

  const isBetweenSelectedDates = (date) => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates.sort((a, b) => a - b);
      return date.isAfter(start) && date.isBefore(end);
    }
    return false;
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-8">
      {/* Current Month Calendar */}
      <div className="w-80 h-80 mr-8">
        <div className="flex items-center justify-between">
          <button
            className="flex gap-10 items-center"
            type="button"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          >
            <GrFormPrevious className="w-5 h-5 cursor-pointer hover:scale-105 transition-all" />
          </button>
          <h1 className="select-none md:text-lg font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div></div>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>
        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-10 md:h-14  grid place-content-center text-xs md:text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today
                        ? "bg-gray-700 text-white"
                        : "",
                      isDateSelected(date)
                        ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white"
                        : isBetweenSelectedDates(date)
                        ? "bg-rose-200"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-rose-200 transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      handleDateClick(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Next Month Calendar */}
      <div className="w-80 h-80">
        <div className="flex justify-between items-center">
          <div></div>
          <h1 className="select-none text-lg font-semibold">
            {months[nextMonth.month()]}, {nextMonth.year()}
          </h1>
          <button
            className="flex gap-10 items-center"
            type="button"
            onClick={() => {
              setToday(nextMonth.month(nextMonth.month() + 1));
            }}
          >
            <GrFormNext className="w-5 h-5 cursor-pointer hover:scale-105 transition-all" />
          </button>
        </div>
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            return (
              <h1
                key={index}
                className="text-xs md:text-sm text-center h-8 w-8 md:h-14 md:w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            );
          })}
        </div>

        <div className="grid grid-cols-7">
          {generateDate(nextMonth.month(), nextMonth.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="p-2 text-center h-10 md:h-14 grid place-content-center text-xs md:text-sm border-t"
                >
                  <h1
                    className={cn(
                      currentMonth ? "" : "text-gray-400",
                      today
                        ? "bg-black text-white"
                        : "",
                      isDateSelected(date)
                        ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white"
                        : isBetweenSelectedDates(date)
                        ? "bg-rose-200"
                        : "",
                      "h-10 w-10 rounded-full grid place-content-center hover:bg-rose-200 transition-all cursor-pointer select-none"
                    )}
                    onClick={() => {
                      handleDateClick(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
