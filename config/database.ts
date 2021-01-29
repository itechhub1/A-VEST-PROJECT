import mongoose from "mongoose";
import Seeder from "../src/seeder";
const keys = require("../config/keys");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  Seeder();
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error( "database error",err.message);
});

export { mongoose };
