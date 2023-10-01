const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// routes import
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/db");

// rest object
const app = express();

// connect Db
connectDb();

// view template engine
app.set("view engine", "pug");
app.set("views", "./views");

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// routes - user routes
app.use("/api/v1/user", userRoutes);

// pug template
app.get("/", (req, res) => {
  res.render("index");
});

// port | host
const PORT = 5000;

// server listening
app.listen(PORT, () => {
  console.log(`listening port on ${PORT}`.bgMagenta.white);
});
