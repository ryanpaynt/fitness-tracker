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

