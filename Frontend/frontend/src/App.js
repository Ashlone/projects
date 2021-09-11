import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import AddProject from "./components/AddProject";
import Header from "./components/Header";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Route exact path="/" component={AddProject} />
        <Route exact path="/projects" component={ProjectList} />
      </Router>
    </div>
  );
}

export default App;
