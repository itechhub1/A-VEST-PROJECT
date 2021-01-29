import express from "express";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler } from "@localmarket/common";
import cors from "cors";
import { json } from "body-parser";
import "express-async-errors";
const app = express();

const PORT = process.env.PORT || 5000;
app.set("trust-proxy", true);
app.use(cors());
app.use(json());

app.use(
  cookieSession({
    secure: false,
    signed: false,
  })
);

app.get("/docs", (req, res) => {
  res.send("<h2>Aimart API ENDPOINTS Documentations</h2>");
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server has started on port ${PORT}`));
