import express from "express";
import "./database-source/database-connection";
const app = express();
const PORT = process.env.PORT || 1001;
app.listen(PORT, () => {
  console.log(`mongodb server is running on port ${PORT}`);
});
