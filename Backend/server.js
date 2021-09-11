//importing
const fs = require("fs");
const express = require("express");
const shortid = require("shortid");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Retrieving
app.get("/api", function (req, res) {
  const data = fs.readFileSync("data.json");
  const readProjects = JSON.parse(data);
  res.send(readProjects);
});

//Creating
app.post("/api", (req, res) => {
  fs.readFile("data.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      const file = JSON.parse(data);
      let newProjectId = shortid.generate();
      JSON.stringify(newProjectId);
      file[newProjectId] = req.body;

      newProjectId = file.id;

      file.push(req.body);
      const json = JSON.stringify(file, null, 2);
      fs.writeFile("data.json", json, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send("Project created");
        }
      });
    }
  });
});

//Deleting
app.delete("/api/:id", (req, res) => {
  fs.readFile("data.json", "utf8", function (err, data) {
    let projectsData = JSON.parse(data);

    let index = projectsData.findIndex((a) => a.id === req.params.id);
    if (index > -1) {
      projectsData.splice(index, 1);
    }
    res.send(projectsData).status(200);
    fs.writeFile(
      "data.json",
      JSON.stringify(projectsData, null, 2),
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  });
});

//updating
app.put("/api/:id", (req, res) => {
  fs.readFile("data.json", "utf8", function (err, data) {
    //parse the existing data
    let projectsData = JSON.parse(data);
    //get id from the url
    const id = req.params.id;
    //get the updated data
    const updatedData = req.body;

    //check if the id exists or not
    const findExist = projectsData.find((project) => project.id === id);
    if (!findExist) {
      res.status(409).send("User does not exist");
    }

    //filter the project data
    const updatedProject = projectsData.filter((project) => project.id !== id);

    //push the updated project
    updatedProject.push(updatedData);

    res.send(updatedData);

    fs.writeFile(
      "data.json",
      JSON.stringify(updatedData),
      "utf8",
      function (err) {
        if (err) throw err;
      }
    );
  });
});

app.listen(port, function () {
  console.log(`The server is listening at http://localhost:${port}`);
});
