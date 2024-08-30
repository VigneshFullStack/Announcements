import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/layout/Header.scss";
import UTCTimer from "../../utils/UTCTimer";
import EurolandLogo from "../../assets/images/EurolandLogo.png";
import InfozoLogo from "../../assets/images/InfozoLogo.gif";
import TimerImage from "../../assets/images/timer.png";
import IndiaFlag from "../../assets/images/india-flag.png";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="row">
      <div className="col-md-7 col-xxl-9 ps-4 home">
        <div
          style={{ cursor: "pointer", display: "inline-block", marginLeft: "10px" }}
          onClick={handleLoginClick}
        >
          <img
            className="eurolandLogo"
            src={EurolandLogo}
            alt="Euroland Logo"
          />
          <img className="infozoLogo" src={InfozoLogo} alt="Infozo Logo" />
        </div>
      </div>
      <div className="col-md-5 col-xxl-3 timer-container">
        <div className="utc-timer">
          <img alt="Timer" src={TimerImage} />
          <div className="time">
            <UTCTimer />
          </div>
        </div>
        <div className="location">
          <img
            className="ml-3"
            alt="India Flag"
            style={{ width: "25px", height: "20px" }}
            src={IndiaFlag}
          />
          <span className="ms-2">
            {sessionStorage.getItem("HolidaysLocation") || "INDIA"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
