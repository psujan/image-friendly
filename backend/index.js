import app from "./app.js";
import { PORT } from "./config/env.js";



app.get("/", (req, res) => {
  res.send("Welcome To Image Friendly App");
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
