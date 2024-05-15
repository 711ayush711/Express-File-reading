import express, { Application } from "express";
import fileRoute from "./routes/fileRoutes";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", fileRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server running on " + process.env.PORT || 8000);
});
