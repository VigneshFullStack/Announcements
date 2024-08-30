import React from "react";
import "../../../styles/components/HolidayDetails.scss";

const HolidayDetails = ({ holiday }) => {
  if (!holiday) return null;

  return (
    <div className="calendarEvent">
      <p className="calendarEvent-title mt-4">Public Holiday :</p>
      <div className="calendarEvent-container">
        <div className="calendarEvent-container-list">
          <div className="calendarEvent-container-list-name">
            <p className="calendarEvent-container-list-name-location">
              {holiday.location}
            </p>
            <p className="mb-1 holidayName">{holiday.name}</p>
          </div>
          <p className="calendarEvent-container-list-description m-0">
            {holiday.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HolidayDetails;
