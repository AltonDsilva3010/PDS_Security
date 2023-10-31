const express = require("express");
// const path = require("path");
const { urlencoded } = require("express");

const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json({ extended: false })); //bodyParser

app.get("/", (req, res) => res.send("API running"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
