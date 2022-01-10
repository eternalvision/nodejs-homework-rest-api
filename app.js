const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersCurrentRouter = require("./routes/api/users-current");

app.use(logger(formatsLogger)); // показує в терміналі: метод/шлях/статус/час
app.use(cors());
app.use(express.json()); // явно вказує що перевести тіло запроса в json

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/users/current", usersCurrentRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
