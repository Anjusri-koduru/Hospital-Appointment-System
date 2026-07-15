const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const connectDB = require("./config/db");

// Connect Database
connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});