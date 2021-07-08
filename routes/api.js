const router = require("express").Router();
const Workout = require("../models/workout");

app.get("/api/workouts", (req,res) => {
    Workout.find()
    .then(data =>{
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    });
});

app.post("/api/workouts", (req,res) => {
    Workout.create(body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
        res.status(404).json(err)
    });
});

// range
app.get("/api/workouts/range", (req,res) =>{
    Workout.create(body)
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
        res.error(404).json(err)
    });
});

app.put("/api/workouts/:id", ({body,params}, res) =>{
    Workout.findByIdAndUpdate(
        params.id,
        {$push:{excersises:body} },
        // 
        {new: true, runValidators:true}
    )
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err => {
        res.error(404).json(err);
    });
});

module.exports = router;