import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProjectList() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api`).then((response) => {
      setAPIData(response.data);
    });
  }, []);
  return (
    <div className="main">
      <Link to="/">
        <button
          style={{ background: "blue", color: "white" }}
          className="ui button right"
        >
          Add Project
        </button>
      </Link>

      {APIData.map((data) => {
        return (
          <div className="item">
            <div className="content">
              <div className="header">{data.title}</div>
              <div>{data.description}</div>
              <div>{data.url}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ProjectList;
