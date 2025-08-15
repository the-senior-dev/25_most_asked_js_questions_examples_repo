const express = require("express");

const port = 3001;

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
