const dotenv = require("dotenv");
const app = require("./app");
const PORT = process.env.APPLICATION_PORT || 5353;
const NETWORK = process.env.APPLICATION_NETWORK | "127.0.0.1";
const mongoose = require("mongoose");
// const DB = process.env.MONGODB_CLOUD;
const DB = process.env.MONGODB_LOCAL;

dotenv.config("./.env");

mongoose.set("strictQuery", true);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, NETWORK, () => {
  console.log(`Server is open at ${PORT}`);
});
