import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUpcomingHolidays } from "../../../features/upcomingHolidaySlice.js";
import Skeleton from "@mui/material/Skeleton";
import { formatDatebyString } from "../../../utils/formatDatebyString.js";
import "../../../styles/components/Announcements.scss";

const UpcomingHolidays = () => {
  const dispatch = useDispatch();
  const { upcomingHolidays, loading, error } = useSelector(
    (state) => state.upcomingHolidays
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(getUpcomingHolidays());
  }, [dispatch]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    let scrollTop = 0;
    const scrollStep = 1;

    const autoScroll = () => {
      scrollTop += scrollStep;
      if (scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
        scrollTop = 0; // Reset scroll position
      }
      scrollContainer.scrollTop = scrollTop;
    };

    const scrollInterval = setInterval(autoScroll, 30);

    return () => clearInterval(scrollInterval);
  }, [upcomingHolidays]);

  if (loading) {
    return (
      <div className="widget">
        <div className="widget-header upcoming-holidays">
          <span className="widget-header-text">Upcoming Holidays</span>
          <span className="upcoming-holidays-count">0</span>
        </div>
        <div className="upcoming-holidays-widget-body mt-3" ref={scrollRef}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="widget-content-card">
              <Skeleton variant="text" height={30} width="60%" />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="rectangular" className="mt-1" height={80} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="widget">
      <div className="widget-header upcoming-holidays">
        <span className="widget-header-text">Upcoming Holidays</span>
        <span className="upcoming-holidays-count">
          {upcomingHolidays.length}
        </span>
      </div>
      <div className="upcoming-holidays-widget-body mt-3" ref={scrollRef}>
        {upcomingHolidays.map((holiday, index) => (
          <div key={index} className="widget-content-card">
            <div className="card-title">
              {formatDatebyString(holiday.fromDate)}
            </div>
            <div className="card-subtitle mb-2">{holiday.location}</div>
            <p className="card-text">{holiday.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingHolidays;
