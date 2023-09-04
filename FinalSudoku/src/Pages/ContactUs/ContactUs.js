import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../images/e.jpg";

import "./ContactUs.css";
import { toast } from "react-toastify";

export default function ContactUs() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const loginstatus = sessionStorage.getItem("currentloginStatus");
  const chechLogin = () => {
    if (loginstatus != 1) {
      var drop = document.getElementById("dropdown-basic");
      drop.disabled = true;
    }
  };
  const logout = () => {
    toast.error("Logging Off");
    alert("Logging off");
    navigate("/");
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div>
        <div onLoad={chechLogin}>
          <div className="row shadow sticky-top">
            <nav
              className="navbar navbar-expand-lg"
              style={{ backgroundColor: "black" }}
            >
              <div className="container-fluid">
                <a className="navbar-brand" href="/Admin">
                  <img src={logo} alt="" id="headerlogoProfile" />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  style={{ backgroundColor: "white" }}
                >
                  <span
                    className="navbar-toggler-icon"
                    style={{ backgroundColor: "grey" }}
                  ></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        onClick={() => navigate("/boardd")}
                        id="headerBtn"
                      >
                        Home
                      </a>
                    </li>
                  </ul>
                  <div className="">
                    <motion.button
                      className="btn btn-primary SignButton"
                      whileHover={{
                        backgroundColor: "rgb(220, 222, 224)",
                        color: "black",
                      }}
                      whileTap={{
                        backgroundColor: "rgb(220, 222, 224)",
                        color: "black",
                      }}
                      onClick={() => logout()}
                    >
                      Logout
                    </motion.button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>
            If you have any questions or feedback, feel free to get in touch
            with us!
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <i className="fas fa-envelope"></i>
              <a href="mailto:sudokugame@gmail.com">
                Email us at sudokugame@gmail.com
              </a>
            </div>
            <div className="contact-method">
              <i className="fas fa-phone"></i>
              Call us at: <a href="tel:+1234567890">123-456-7890</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
