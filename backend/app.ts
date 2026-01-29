require("dotenv").config();

import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes/Router";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

require("./config/db");

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
