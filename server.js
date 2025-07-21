import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const PORT =
  process.env.NODE_ENV === "development" ? 5000 : process.env.NEXT_PUBLIC_PROD_API_KEY;

// const PROT = process.env.NODE_ENV_DEV;

app.listen(PORT, () => {
  console.log(`✅ Server running on ${PORT}`);
});
