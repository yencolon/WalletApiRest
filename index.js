const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const walletRouter = require("./routes/walletRoutes");

const server = express();

server.use(cors());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use("/auth", authRoutes);

server.use("/wallet", walletRouter);

server.listen(process.env.PORT || 5000, () => {
  console.log("running on port");
});
