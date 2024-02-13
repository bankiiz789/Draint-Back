//lib
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Error handle
const notFound = require("./middleware/not-found");
const error = require("./middleware/error");

//Route
const authRoute = require("./routes/auth-route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);

app.use(notFound);
app.use(error);
//Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` server is running on port ${PORT} `);
});
