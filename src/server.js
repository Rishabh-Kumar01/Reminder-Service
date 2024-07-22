const utils = require("./utils/index.util");
const config = require("./config/index.config");
const routes = require("./routes/index.route");
const db = require("./models/index");
const { subscribeMessage, createChannel } =
  require("./utils/index.util").messageQueue;
const { NotificationService } = require("./services/index.services");

const app = utils.imports.express();

// Server & Database Connection
const setupAndStartServer = async () => {
  // Middlewares
  app.use(utils.imports.morgan("dev"));
  app.use(utils.imports.cors());
  app.use(utils.imports.helmet());
  app.use(utils.imports.compression());
  app.use(utils.imports.bodyParser.json());
  app.use(utils.imports.bodyParser.urlencoded({ extended: true }));
  app.use("/api", routes);
  utils.jobs();

  const channel = await createChannel();
  await subscribeMessage(
    channel,
    NotificationService.subscribeEvents,
    config.serverConfig.REMINDER_BINDING_KEY
  );

  app.listen(config.serverConfig.PORT, async () => {
    console.log(`SERVER IS RUNNING ON PORT ${config.serverConfig.PORT}`);
    // await config.connection();
  });

  if (config.serverConfig.DB_SYNC === true) {
    await db.sequelize.sync({ alter: true });
  }
};

// Call the function to start the server and connect to the database
setupAndStartServer();

// Home Route
app.get("/", (request, response) => {
  response.send("Hello Server!!!😊😊😊😊");
});

module.exports = app;
