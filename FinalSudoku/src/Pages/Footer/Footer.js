import React from "react";
import { useNavigate } from "react-router";
// import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="footer" style={{ overflowX: "hidden" }}>
      <br />
      <div className="row linkRow">
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <br />

      <br />

      <br />
      <div>
        <h6 className="info">
          © 2023 Sudoku-Game . All rights reserved. License Number: 123456789
        </h6>
      </div>
      <br />
      <div style={{ marginLeft: "45%", marginBottom: "2%" }}></div>
      {/* <br /> */}
    </div>
  );
}
