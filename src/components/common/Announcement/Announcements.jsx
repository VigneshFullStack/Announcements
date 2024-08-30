import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncements } from "../../../features/announcementSlice.js";
import Skeleton from "@mui/material/Skeleton";
import "../../../styles/components/Announcements.scss";
import { formatDate } from "../../../utils/formatDate.js";

const Announcements = () => {
  const dispatch = useDispatch();
  const { announcements, loading, error } = useSelector(
    (state) => state.announcements
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (!scrollContainer) return;

    let scrollTop = 0;
    const scrollStep = 1; // Adjust speed as needed

    const autoScroll = () => {
      if (scrollContainer) {
        scrollTop += scrollStep;
        if (scrollTop >= scrollContainer.scrollHeight / 2) {
          scrollTop = 0; // Reset scrollTop for seamless scrolling
        }
        scrollContainer.scrollTop = scrollTop;
      }
    };

    const scrollInterval = setInterval(autoScroll, 30);

    return () => clearInterval(scrollInterval);
  }, [announcements]);

  if (loading) {
    return (
      <div className="widget">
        <div className="widget-header announcements cl1">
          <span className="widget-header-text">Notifications</span>
          <span className="announcement-count">0</span>
        </div>
        <div className="announcement-widget-body mt-3" ref={scrollRef}>
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
      <div className="widget-header announcements cl1">
        <span className="widget-header-text">Notifications</span>
        <span className="announcement-count">{announcements.length}</span>
      </div>
      <div className="announcement-widget-body mt-3" ref={scrollRef}>
        {announcements.concat(announcements).map((event, index) => (
          <div key={index} className="widget-content-card">
            <label>{formatDate(event.date)}</label>
            <p>{event.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
