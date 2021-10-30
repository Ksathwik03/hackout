const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const cors = require('cors')
const app = express()
app.use(cors({
    origin: '*'
}));


app.use(express.static(path.join(__dirname, "public")));


// DB CONFIG
const db = require("./config/keys").MongoURI;

if (db) {
  mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/", require("./Routes/routes.js"));
app.use("/product",require("./Routes/productRoutes.js"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
