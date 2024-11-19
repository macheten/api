import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
}

const db = {
  courses: [
    { id: 1, title: "back-end" },
    { id: 2, title: "front-end" },
    { id: 3, title: "devops" },
    { id: 4, title: "automation qa" },
  ],
}

app.get("/", (req: Request, res: Response) => {
  res.json("Hello, my friend!");
})
app.get("/courses/:id", (req, res) => {
  const foundCourses = db.courses.find((c) => c.id === +req.params.id);
  if (!foundCourses) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCourses);
})
app.get("/courses", (req, res) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter(
      (c) => c.title.indexOf(req.query.title as string) > -1
    );
  }
  res.json(foundCourses);
})
app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404); // bad request
    return;
  }

  const createdCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(createdCourse);
  res.status(HTTP_STATUSES.CREATED_201).json(createdCourse);
})
app.delete("/courses/:id", (req, res) => {
  const foundCourse = db.courses.find((c) => c.id === +req.params.id);
  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  db.courses = db.courses.filter((c) => c.id !== foundCourse.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})
app.put("/courses/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400); // bad request
    return;
  }

  const foundCourse = db.courses.find((c) => c.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  foundCourse.title = req.body.title;
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})
