import React, { useState, useEffect } from "react";
import "../../../styles/components/Calendar.scss";
import { useSelector, useDispatch } from "react-redux";
import { getHolidays } from "../../../features/holidaySlice.js";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import HolidayDetails from "./HolidayDetails .jsx";
import QRCode from "../QRCode/QRCode.jsx";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.holidays.holidays);

  useEffect(() => {
    dispatch(getHolidays());
  }, [dispatch]);

  useEffect(() => {
    renderCalendar();
  }, [date, holidays, selectedDate]);

  const generateHolidaysMap = (holidays) => {
    return holidays.reduce((acc, holiday) => {
      const holidayDate = new Date(holiday.fromDate);
      holidayDate.setHours(0, 0, 0, 0);
      const key = `${holidayDate.getFullYear()}-${
        holidayDate.getMonth() + 1
      }-${holidayDate.getDate()}`;
      acc[key] = holiday;
      return acc;
    }, {});
  };

  const renderCalendar = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const totalMonthDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const startWeekDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();

    let totalCalendarDay = 6 * 7;
    const daysArray = [];

    const holidaysMap = generateHolidaysMap(holidays);

    for (let i = 0; i < totalCalendarDay; i++) {
      let day = i - startWeekDay + 1;

      if (i < startWeekDay) {
        daysArray.push(
          <td key={i} className="padding-day">
            {prevLastDay - startWeekDay + i + 1}
          </td>
        );
      } else if (i < startWeekDay + totalMonthDay) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        const currentDateKey = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        const isHoliday = holidaysMap[currentDateKey];
        const isToday = currentDate.getTime() === today.getTime();
        const dayClass = isToday
          ? "current-day"
          : selectedDate && currentDate.getTime() === selectedDate.getTime()
          ? "selectedDate"
          : isHoliday
          ? "holiday"
          : "month-day";

        const tooltipTitle = isToday
          ? "Today"
          : isHoliday
          ? isHoliday.name
          : "";

        daysArray.push(
          <Tooltip key={i} title={tooltipTitle} placement="top">
            <td
              className={dayClass}
              onClick={() => handleDateClick(currentDate, isHoliday)}
            >
              {day}
            </td>
          </Tooltip>
        );
      } else {
        daysArray.push(
          <td key={i} className="padding-day">
            {day - totalMonthDay}
          </td>
        );
      }
    }

    setCalendarDays(daysArray);
  };

  const handleDateClick = (date, holiday) => {
    setSelectedDate(date);
    setSelectedHoliday(holiday);
  };

  const handleMonthChange = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + (direction === "prev" ? -1 : 1));
    setDate(newDate);
  };

  const handleYearChange = (type) => {
    const newDate = new Date(date);
    if (type === "prev") {
      newDate.setFullYear(date.getFullYear() - 1);
    } else if (type === "next") {
      newDate.setFullYear(date.getFullYear() + 1);
    } else if (type === "today") {
      newDate.setFullYear(new Date().getFullYear());
      newDate.setMonth(new Date().getMonth());
      newDate.setDate(new Date().getDate());
    }

    const holidaysMap = generateHolidaysMap(holidays);

    const todayKey = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
    const isTodayHoliday = holidaysMap[todayKey];

    setDate(newDate);
    setSelectedDate(newDate);
    setSelectedHoliday(isTodayHoliday || null);
  };

  const renderWeekdays = () => {
    return (
      <tr>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <th key={index} className="weekday-name">
            {day}
          </th>
        ))}
      </tr>
    );
  };

  const renderCalendarRows = () => {
    const rows = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(<tr key={i}>{calendarDays.slice(i, i + 7)}</tr>);
    }
    return rows;
  };

  return (
    <>
      <div className="calendar-container">
        <div className="card">
          <div className="calendar-toolbar">
            <div className="current-month">
              {date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div>
              <Tooltip title="Previous month" placement="top">
                <IconButton
                  className="prev month-btn"
                  onClick={() => handleMonthChange("prev")}
                  aria-label="Previous month"
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Today" placement="top">
                <IconButton
                  className="btn today"
                  onClick={() => handleYearChange("today")}
                  aria-label="Today"
                >
                  <TodayIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Next month" placement="top">
                <IconButton
                  className="next month-btn"
                  onClick={() => handleMonthChange("next")}
                  aria-label="Next month"
                >
                  <ChevronRightIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <table className="calendar">
            <thead>{renderWeekdays()}</thead>
            <tbody>{renderCalendarRows()}</tbody>
          </table>
        </div>
      </div>
      {selectedHoliday && <HolidayDetails holiday={selectedHoliday} />}
      <QRCode />
    </>
  );
};

export default Calendar;
