import app from "./app.js";
import { PORT } from "./config/env.js";
import { connectToMongoDb } from "./database/mongodb.js";

app.get("/", (req, res) => {
  res.send("Welcome To Image Friendly App");
});

app.listen(PORT, async () => {
  console.log(`Server started on port http://localhost:${PORT}`);
  await connectToMongoDb();
});
