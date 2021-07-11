var router = require('express').Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {

        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout)
    })
    .catch(err => {
        res.error(404).json(err)
    });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
        res.status(404).json(err)
    });
});

// range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
        res.error(404).json(err)
    });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
        res.status(404).json(err)
    });
});

router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findByIdAndUpdate(
        {_id: req.params.id},
        { 
            $inc: { totalDuration: req.body.duration },
            $push: { excersises: req.body } 
        },
        { new: true})
        .then(dbWorkout => res.json(dbWorkout))
        .catch(err => {
            res.error(404).json(err);
        });
    });
    
    module.exports = router;