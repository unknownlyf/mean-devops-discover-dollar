const DB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/dd_mean_db";

module.exports = {
  url: DB_URL
};
