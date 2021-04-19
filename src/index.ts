import express from "express";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler } from "@localmarket/common";
import "./config/database";
import cors from "cors";
import { json } from "body-parser";
import "express-async-errors";
import path from "path";
import { rootRoute } from "./root__route";
import swaggerUi from 'swagger-ui-express'
import specs from './docs/swagger.json'
import "./sheduler";

const app = express();

const PORT = process.env.PORT || 5000;
app.set("trust-proxy", true);
app.use(cors());
app.use(json());

//*view template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

/* 

*/
app.use("/docs", swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }));
rootRoute(app);


//serve static asset in production
if (process.env.NODE_ENV === "production") {
  //server asset
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));
