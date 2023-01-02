import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/DB.js";
import morganBody from "morgan-body";
import root from "./routes/root.js";
import path from "path";

// set up dependencies
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect DB
connectDB();

//middleware
app.use(cors());
morganBody(app);

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use("/api", root);
app.use("/image", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server connect port ${PORT}`)
);

export default app;
