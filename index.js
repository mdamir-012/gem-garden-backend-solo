const express = require("express");
const { connection } = require("./models/db");
const {
  userController,
} = require("./routes/user.routes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("homepage");
});

app.use("/user", userController);

app.listen(8080, async () => {
  try {
    await connection;
    console.log(`connected to mongodb succesfully`);
  } catch (error) {
    console.log(error);
  }
  console.log(`listening on port 8080`);
});
