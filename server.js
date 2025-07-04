import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;

console.log(PORT);


// const PROT = process.env.NODE_ENV_DEV;

app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});
