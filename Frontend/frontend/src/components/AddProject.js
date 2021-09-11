import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();

  const addProject = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api", {
      title,
      url,
      description,
    });
    history.push("/projects");
    setTitle("");
    setUrl("");
    setDescription("");
  };

  return (
    <div className="ui main">
      <h2>Add Project</h2>
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="field">
          <label>Url</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>
        <button className="ui button blue" type="submit" onClick={addProject}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddProject;
