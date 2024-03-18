const app = require("express")();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const { dbConnection } = require("./app/db/db");
const userRoutes = require("./app/route/userRoute");

const PORT = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

//db
dbConnection();
//route
app.use("/api/v1/users", userRoutes);

app.use((error, req, res, next) => {
  res.status(400).json({
    success: false,
    error: error.message,
    message: "some error occured please fixed this and try again",
  });
});

//server
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
