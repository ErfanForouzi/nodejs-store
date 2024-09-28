const path = require("path");

const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const autoBind = require("auto-bind");
const { default: mongoose } = require("mongoose");
const { AllRoutes } = require("./router/router");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
require("dotenv").config();

class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    autoBind(this);
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.connectToMongoDB();
    this.connectToRedis();
    this.createServer();
    this.createRoutes();
    this.errorHandling();
  }
  configApplication() {
    this.#app.use(cors())
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: false }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "Node Js - Store Project",
              version: "2.0.0",
              description: "بزرگ ترین مرجع آموزش برنامه نویسی",
              contact:{
                name:"Erfan Forouzi",
                url:"https://freerealapi.com",
                email:"erfanforouzzziii@gmail.com"
              }
            },
            servers: [
              {
                url: "http://localhost:5000",
              },
            ],
          },
          apis: ["./app/router/**/*.js"],
        })
      )
    );
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`running server on http://localhost:${this.#PORT}`);
    });
  }
  connectToMongoDB() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => console.log("Connected to MongoDB Successfully"))
      .catch((error) => console.log("failed to connect"));
    mongoose.connection.on("connected", () =>
      console.log("mongoose connection is connected")
    );
    mongoose.connection.on("disconnected", () =>
      console.log("mongoose connection is disconnected")
    );
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("___disconnected___");
      process.exit(0);
    });
  }
  connectToRedis(){
    require("./utils/init_redis");
  }
  createRoutes() {
    this.#app.use(AllRoutes);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("آدرس مورد نظر یافت نشد"));
    });
    this.#app.use((err, req, res, next) => {
      console.log(err);
      const serverError = createError.InternalServerError();
      const statusCode = err?.statusCode ?? err?.status ?? serverError.status;
      const message = err?.message ?? serverError.message;
      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
}

module.exports = Application;
