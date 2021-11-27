import express from 'express';
const router = express.Router();

import jwt from 'jsonwebtoken';

import { userValidate } from '../validations/user.js';
import { loginValidate } from '../validations/login.js';

import { User } from '../models/User.js';
import { UserSession } from '../models/UserSession.js';
import { auth } from '../middleware/auth.js';
import { secret } from '../config/keys.js';
import { UserCourses } from '../models/UserCourse.js';

router.get('/', auth, (req, res) => {
    const userId = req.cookies["userId"] || req.body.userId;

    User.findById(userId)
    .then((user) => {
      UserCourses.findOne({ userId: userId })
        .then((data) => {
          res.json({ user: user, courses: data ? data.courses : [] });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get('/allUsers', (req, res) => {
  const page = req.query.page || 1;
  const nPerPage = req.query.nPerPage || 2000;

  User.find(
    {isAdmin: false}
  )
  .skip(page > 0 ? (page - 1) * nPerPage : 0)
    .limit(nPerPage)
    .then((response) => {
      User.count()
        .then((count) => {
          if (count === 0) {
            res.status(400).json({
              "zeroStudents" : "Zero students registered"
            })
          }
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

router.get('/search', (req, res) => {
  const value = req.query.value;

  User.find({
    $and: [
      { name: { $regex: ".*" + value + ".*", $options:'i'} },
      { isAdmin: false }
    ],
  })
    .limit(10)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("Error: " + err));
})

router.post('/delete', (req, res) => {
  const userId = req.body._id
  if (!userId) {
    res.json("Enter user to delete");
  }
  User.findOneAndDelete({ _id: userId })
  .then(() => {
    res.status(200).json("Done!");
  })
  .catch((err) => {
    res.status(400).json("Error: " + err);
  });
});

router.post('/register', (req, res) => {
    console.log(req.body);
    const {errors, isValid} = userValidate(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({
        userId: req.body.userId
    })
    .then(user => {
        if(user) {
            return res.status(400).json({userId: "userId already exists"});
        } else {
            const newUser = new User({
                name: req.body.name,
                userId: req.body.userId,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            });

            newUser.password = newUser.generateHash(req.body.password);

            newUser
                .save()
                .then(() => {
                  res.status(201).json({
                    message: "User added successfully!",
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    error: error,
                  });
                });
        }
    });
});

// POST request to login api/users/login
router.post('/login', (req, res) => {
    const {errors, isValid} = loginValidate(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else {
        User.findOne({
            userId: req.body.userId
        }).then(user => {
            if (!user) {
                res.status(400).json({
                    userIdnotfound: "userId Not Found",
            });
            }else {
              if (user.validPassword(req.body.password)) {
                  const token = jwt.sign({ userId: user._id }, secret, {
                      expiresIn: "24h",
                  });

                  UserSession.replaceOne(
                      { userId: user._id },
                      { userId: user._id, token: token },
                      { upsert: true }
                  )
                  .then((session) => {
                      if (user.isAdmin) {
                          res.status(200).json({
                              userId: user._id,
                              token: token,
                              expiresIn: 1,
                              isAdmin: true,
                          });
                      } else {
                          res.status(200).json({
                              userId: user._id,
                              token: token,
                              expiresIn: 1,
                              isAdmin: false,
                              name: user.name,
                            });
                      }
                  })
                  .catch((err) => {
                      res.status(401).json(err);
                  });
            } else {
                return res.status(401).json({
                    passwordincorrect: "incorrect password",
                });
            }
          }
        })
        .catch((error) => {
            res.status(500).json({
                error: error,
            });
        });
    }
});

router.get('/logout', auth, (req, res) => {
    const userId = req.cookies["userId"] || req.query.userId;
    res.clearCookie("token");
    res.clearCookie("userId");
    UserSession.findOneAndDelete({ userId: userId })
        .then(() => {
          res.status(200).json("Done!");
          console.log(userId);
        })
        .catch((err) => {
          res.status(400).json("Error: " + err);
    });
});

router.get("/userInfo", auth, (req, res) => {
    User.findOne({ userId: req.body.userId }).then((user) => {
        res.status(200).json({
        name: user.name,
        userId: user.userId,
        });
    });
});

router.get("/auth", auth, (req, res) => {
    console.log(req);
    res.status(200).json("True");
});

router.get("/userCourse", auth, (req, res) => {
    const userId = req.cookies["userId"] || req.query.userId;
    UserCourses.aggregate([
        {
            $match: { userId: userId },
        },
        {
            $project: {
              courses: {
                $map: {
                  input: "$courses",
                  as: "item1",
                  in: {
                    $toObjectId: "$$item1",
                  },
                },
              },
            },
          },
          {
            $lookup: {
              from: "courses",
              localField: "courses",
              foreignField: "_id",
              as: "information",
            },
          },
          {
            $project: {
              information: 1,
              courses: 1,
            },
          },
        ]).exec((err, result) => {
            if (err) {
              res.status(500).json(err.message);
            }
            if (result) {
              if (result.length === 0) res.status(400).json("Error: Data not found");
              else res.status(200).json(result);
            }
          });
});

router.post("/addCourse", auth, (req, res)=> {
    console.log(req.body.userId || req.query.userId);

    const userId = req.cookies["userId"] || req.query.userId;
    const courseId = req.body.courseId;
    if (!courseId) {
      res.json("No such course exists");
    }
    UserCourses.updateOne(
      { userId: userId.trim() },
      { userId: userId, $addToSet: { courses: courseId } },
      { upsert: true }
    )
    .then(() => {
      res.json("courseId updated");
    })
    .catch((err) => res.status(401).json("Error: " + err.response));
});

router.post("/removeCourse", auth, (req, res)=> {
    const userId = req.cookies["userId"] || req.query.userId;
    const courseId = req.query.courseId;
    if (!courseId) {
      res.json("Not enrolled in the course");
    }   
    console.log("Deleting: " + courseId);   
    UserCourses.updateOne(
      { userId: userId.trim() },
      { userId: userId, $pull: { courses: courseId } },
      { upsert: true }
    )
    .then(() => {
      res.json("Removed");
    })
    .catch((err) => res.status(401).json(err));
});

router.post("/setUserCourses", auth, (req, res)=>{
    console.log(req.body.userId || req.query.userId);
    UserCourses.replaceOne(
        { userId: req.body.userId },
        { userId: req.body.userId, courses: req.body.courses },
        { upsert: true }
    )
        .then(() => {
          res.json("Added!");
        })
        .catch((err) => res.status(401).json("Error: " + err));
});

export default router;