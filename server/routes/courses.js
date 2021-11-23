import express from 'express';
const router = express.Router();

import { auth } from '../middleware/auth.js';
import { Course } from '../models/Course.js'

router.route("/").get(auth, (req, res) => {
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

router.post('/add').post((req, res) => {
    addCourse(
        req.body.courseID,
        req.body.courseName,
        req.body.professorName,
        req.body.slot,
        req.body.capacity,
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

async function addCourse(
    courseID,
    courseName,
    professorName,
    slot,
    capacity,
    description,
    image,
    prerequisites,
    Url
) {
    const course = new Course({
        courseID: courseID,
        courseName: courseName,
        professorName: professorName,
        slot: slot,
        capacity: capacity,
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

router.route("/update").post((req, res) => {
      Course.replaceOne(
        { course_id: req.body.course_id },
        { course_name: req.body.course_name, prerequisite: req.body.prerequisite },
        { upsert: true }
      ) //This will create one if could found.
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

router.route("/search").get(auth, (req, res) => {
  const value = req.query.value;

  Course.find({
    $or: [
      { course_id: { $regex: ".*" + value + ".*" } },
      { course_name: { $regex: ".*" + value + ".*" } },
    ],
  })
    .limit(10)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});