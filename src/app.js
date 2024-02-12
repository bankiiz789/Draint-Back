require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middleware/not-found");

const app = express();

app.use(cors());
app.use(express.json());

app.use(notFound());
//Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` server is running on port ${PORT} `);
});
