const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

connectDB();

app.use(urlencoded({ extended: true }));
app.use(express.json({ extended: false })); //bodyParser
app.use(cors());

app.get("/", (req, res) => res.send("API running"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
