import express from 'express';
const router = express.Router();

import { auth } from '../middleware/auth.js';
import { Course } from '../models/Course.js';
import { courseValidate } from '../validations/course.js';

router.get('/', auth, (req, res) => {
    const page = req.query.page || 1;
    const nPerPage = req.query.nPerPage || 2000;

    Course.find()
    .skip(page > 0 ? (page - 1) * nPerPage : 0)
    .limit(nPerPage)
    .then((response) => {
      Course.count()
        .then((count) => {
          res.json({
            array: response,
            count: count,
            nbOfPage: Math.ceil(count / nPerPage),
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post('/add', (req, res) => {

    const {errors, isValid} = courseValidate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    addCourse(
        req.body.courseID,
        req.body.courseName,
        req.body.professorName,
        req.body.capacity,
        req.body.credits,
        req.body.description,
        req.body.image,
        req.body.prerequisites,
        req.body.Url
    )
    .then(() => {
      res.status(201).json({
        message: "Course added successfully!",
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

export default router;

async function addCourse(
    courseID,
    courseName,
    professorName,
    capacity,
    credits,
    description,
    image,
    prerequisites,
    Url
) {
    const course = new Course({
        courseID: courseID,
        courseName: courseName,
        professorName: professorName,
        capacity: capacity,
        credits: credits,
        description: description,
        image: image,
        prerequisites: prerequisites,
        Url: Url
    })

    try {
        await course.save();
    } catch (error) {
        throw error;
    }
}

router.post("/update", (req, res) => {
  const {errors, isValid} = courseValidate(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Course.replaceOne(
    { courseID: req.body.courseID },
    { 
      courseID: req.body.courseID,
      courseName: req.body.courseName,
      professorName: req.body.professorName,
      capacity: req.body.capacity,
      credits: req.body.credits,
      description: req.body.description,
      image: req.body.image,
      Url: req.body.Url},
    { upsert: true }
  )
    .then(() => {
      res.status(201).json({
        message: "Course updated successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
    });
    });
});

router.get("/search", auth, (req, res) => {
  const value = req.query.value;

  Course.find({
    $or: [
      { courseID: { $regex: ".*" + value + ".*" , $options:'i'} },
      { courseName: { $regex: ".*" + value + ".*", $options:'i' } },
    ],
  })
    .limit(10)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/display", auth, (req, res) => {
  const value = req.query.value;

  Course.find({
    _id: value
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});