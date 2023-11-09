import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./src/routes/route";
const app = express();
app.use(bodyParser.json());

app.use("/api/v1", apiRouter);

/**
 * Start the server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
