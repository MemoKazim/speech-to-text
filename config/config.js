module.exports = {
  app: {
    name: "Speech To Text",
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "7d",
  },
  allowed_filetypes: ["audio", "video", "image"],
};
