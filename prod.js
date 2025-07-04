import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();



const PORT = process.env.NODE_ENV_PORD;

// const PROT = process.env.NODE_ENV_DEV;

console.log(PORT);


app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});
