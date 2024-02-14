require("dotenv").config({ path: "../.env" });

// Importing DB connect
const connectDB = require("./db/dbConnect");

// Express App
const express = require("express");
const app = express();
const PORT = 3000;

// this enable hackers to not know about the technology we are using
app.disable("x-powered-by"); // less hackers know about our stack

// Cors
const cors = require("cors");

// Cookie-Parser
const cookieParser = require("cookie-parser");

// middleware
app.use(cookieParser({}));
app.use(express.json());
app.use(express.json({ limit: "5mb" }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Importing Routes
const userRoutes = require("./routes/userRoutes");

// App Routes
app.use("/api/user", userRoutes);

// final if we have error
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Server problem";
  res
    .status(status)
    .json({ success: false, statusCode: status, message: message });
});

// Connecting to Database
connectDB(process.env.MONGO_ATLAS_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`)
    );
  })
  .catch((error) => {
    console.log("Error while connecting to database", error);
  });
