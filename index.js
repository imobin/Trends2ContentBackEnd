const express = require("express");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Hi")
})


app.listen(3000, () => console.log("running on 3000"));





