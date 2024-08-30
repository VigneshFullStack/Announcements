import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Login.scss";
import EurolandLogo from "../../assets/images/EurolandLogo.png";
import InfozoLogo from "../../assets/images/InfozoLogo.gif";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div id="loginpage">
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <section>
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <div style={{ cursor: "pointer", marginBottom: "40px" }}>
                <Link to="/home">
                  <img
                    className="eurolandLogo"
                    src={EurolandLogo}
                    alt="Euroland Logo"
                  />
                  <img
                    className="infozoLogo"
                    src={InfozoLogo}
                    alt="Infozo Logo"
                  />
                </Link>
              </div>
              <button type="submit">
                Azure Login
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Welcome!</h1>
                <p>Euroland Announcements</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
