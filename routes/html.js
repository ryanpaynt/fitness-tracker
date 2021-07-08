var path = require("path");

app.get("/excersise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});