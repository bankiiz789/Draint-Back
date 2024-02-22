//lib
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Error handle
const notFound = require("./middleware/not-found");
const error = require("./middleware/error");

//Route
const authRoute = require("./routes/auth-route");
const storyRoute = require("./routes/story-route");
const authenticate = require("./middleware/authenticate");
const userRoute = require("./routes/user-route");
const commentRoute = require("./routes/comment-route");
const staffRoute = require("./routes/staff-route");
const draftRoute = require("./routes/draft-route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/story", authenticate, storyRoute);
app.use("/user", authenticate, userRoute);
app.use("/comment", authenticate, commentRoute);
app.use("/staff", authenticate, staffRoute);
app.use("/draft", authenticate, draftRoute);

app.post(
  "/upload",
  require("./middleware/upload").fields([
    // single OR array OR fields
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
    { name: "slipSrc" },
  ])
);

app.use(notFound);
app.use(error);
//Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` server is running on port ${PORT} `);
});
