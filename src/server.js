const utils = require("./utils/index.util");
const config = require("./config/index.config");
const routes = require("./routes/index.route");
const db = require("./models/index");
const { EmailService } = require("./services/index.services");

const app = utils.imports.express();
// Middlewares
app.use(utils.imports.morgan("dev"));
app.use(utils.imports.cors());
app.use(utils.imports.helmet());
app.use(utils.imports.compression());
app.use(utils.imports.bodyParser.json());
app.use(utils.imports.bodyParser.urlencoded({ extended: true }));

// Server & Database Connection
const setupAndStartServer = async () => {
  app.listen(config.serverConfig.PORT, async () => {
    console.log(`SERVER IS RUNNING ON PORT ${config.serverConfig.PORT}`);
    // await config.connection();
  });

  if (config.serverConfig.DB_SYNC === true) {
    await db.sequelize.sync({ alter: true });
  }

  // Email Service
  // await EmailService.sendBasicEmail(
  //   "support@gmail.com",
  //   "airlinesystem1@gmail.com",
  //   "Welcome to Airline System",
  //   "Thank you for signing up with us. We are excited to have you on board."
  // );
};

// Call the function to start the server and connect to the database
setupAndStartServer();

// Home Route
app.get("/", (request, response) => {
  response.send("Hello Server!!!😊😊😊😊");
});

module.exports = app;
