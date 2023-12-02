const express = require("express");
const { connection } = require("./db");
const { userController } = require("./routes/user.routes");
const { productsController } = require("./routes/products.routes");
const {userInfoController} =require("./routes/userPersonalInfo.routes")
const { authentication } = require("./middlewares/authentication");
const app = express();

app.use(express.json());



app.use("/user", userController);

app.use(authentication)

app.use("/product", productsController);
app.use("/userInfo", userInfoController)

app.get("/", (req, res) => {
  res.send("homepage of gem-garden");
});


app.listen(8080, async () => {
  try {
    await connection;
    console.log(`connected to mongodb succesfully`);
  } catch (error) {
    console.log(error);
  }
  console.log(`listening on port 8080`);
});
