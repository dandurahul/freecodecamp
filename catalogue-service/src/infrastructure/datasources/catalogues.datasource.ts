import mongoose, { connect, models, set } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
  const dbUrl = process.env.DB_URL;
  const _dbHost = process.env.DB_HOST;
  const _dbPort = process.env.DB_PORT;
  const dbUser = process.env.DB_USER;
  const dbPwd = process.env.DB_PWD;
  const _dbDatabase = process.env.DB_DATABASE;
  const dbConnectionString = `${dbUrl}`;
  mongoose.connect(dbConnectionString);

  set("strictQuery", false);

  Object.values(models).forEach((model) => {
    const schema = model.schema;
    schema.set("versionKey", false);
    schema.set("toJSON", { virtuals: true });
  });
  // set('debug', true);
  let db = mongoose.connection;
  db.on("open", () => {
    console.log("Connected to MongoDB");
  });

  // Event: Connection Error
  db.on("error", (error) => {
    console.error("MongoDB Connection Error:", error);
  });

  // Event: Connection Close
  db.on("close", () => {
    console.log("Connection to MongoDB closed");
  });
} catch (error) {
  console.error("MongoDB connection error:", error);
}
