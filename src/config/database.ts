import mongoose from "mongoose";
import Seeder from "../seeeder";
const keys = require("./keys");
import { ServerResponse } from "@localmarket/common";

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
  throw new ServerResponse("network connection error:Try again Later", 500);
});

export { mongoose };
