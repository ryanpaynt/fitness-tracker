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
        res.status(404).json(err)
    });
});

// range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find().limit(7).sort({ 'day': -1 })
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
        res.status(404).json(err)
    });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        console.log('CREATE WORKOUT');
        console.log(dbWorkout);
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(404).json(err)
    });
});

router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findByIdAndUpdate(
        req.params.id,
        { 
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body } 
        },
        { new: true})
        .then(dbWorkout => {
            console.log('CREATE WORKOUT');
            console.log(dbWorkout);
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(404).json(err);
        });
    });
    
    module.exports = router;