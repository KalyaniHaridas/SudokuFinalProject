import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../images/e.jpg";
import signinImg from "../../images/card4.jpg";
import URL from "../URL/Url";
import "./Sign.css";

export default function Signin() {
  const scroolUp = () => {
    window.scrollTo(0, 0);
  };

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SignIn = () => {
    const body = {
      email,
      password,
    };
    if (email == "admin@gmail.com" && password == "admin") {
      toast.success("Logged in As Admin");
      navigate("/Admin");
    } else {
      const url = `http://localhost:7071/Player/signin?email=${email}&password=${password}`;
      axios.get(url, body).then((response) => {
        const result = response.data;

        if (result.status == undefined) {
          const { playerId, firstName, lastName, email, phoneNo } = result;
          sessionStorage["currentplayerId"] = playerId;
          sessionStorage["currentfirstName"] = firstName;
          sessionStorage["currentlastName"] = lastName;
          sessionStorage["currentemail"] = email;
          sessionStorage["currentphoneNo"] = phoneNo;
          navigate("/boardd");
          toast.success("Logged in successfully");
        } else {
          toast.error(result["error"]);
        }

        console.log(result);
      });
    }
  };
  return (
    <motion.div
      style={{ overflowX: "hidden" }}
      onLoad={scroolUp}
      className="fixedcontent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="row shadow sticky-top">
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "black" }}
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
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
                    onClick={() => navigate("/")}
                    id="headerBtn"
                  >
                    Home
                  </a>
                </li>

                <li></li>
              </ul>

              <div className="">
                <motion.button
                  className="btn btn-primary SignButton float-start"
                  whileHover={{
                    backgroundColor: "rgb(220, 222, 224)",
                    color: "black",
                  }}
                  whileTap={{
                    backgroundColor: "rgb(220, 222, 224)",
                    color: "black",
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <br />
      <div style={{ backgroundColor: "whitesmoke" }}>
        <br />
        <div
          className="container"
          style={{ backgroundColor: "white", minHeight: "300px" }}
        >
          <br />
          <center>
            <h3 className="py-3">SignIn Here</h3>
          </center>{" "}
          <hr />
          <div className="row">
            <div className="col">
              <center>
                <img
                  src={signinImg}
                  alt=""
                  style={{ marginTop: "2%", width: "80%" }}
                />
              </center>
            </div>
            <div className="col" style={{ padding: "1rem" }}>
              <div className="form">
                <form action="JavaScript:SignIn()">
                  <div className="mb-3">
                    <label className="label-control">Email</label>
                    <input
                      onChange={(e) => setemail(e.target.value)}
                      required="true"
                      type="email"
                      className="form-control shadow"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="label-control">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="5"
                      maxLength="14"
                      required="true"
                      type="password"
                      className="form-control shadow"
                    />
                  </div>
                  <div>
                    <h6>
                      No account yet ?{" "}
                      <a
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => navigate("/signup")}
                      >
                        Sign up
                      </a>
                    </h6>
                  </div>
                  <div>
                    <h6 style={{ color: "grey" }}>
                      All Rights reserved with @Sudoku-Game
                    </h6>
                  </div>
                  <div className="col">
                    <motion.button
                      className="float-end UpBtn"
                      whileHover={{
                        backgroundColor: "rgb(7, 84, 133)",
                        color: "white",
                      }}
                      onClick={SignIn}
                    >
                      Submit
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </motion.div>
  );
}
