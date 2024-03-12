const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const mongoose = require("mongoose");
const errorHandler = require("./src/middleware/errorhandler.middleware");
const developer = require("./src/routes/developer.route");
const model = require("./src/routes/model.route");
const ai = require("./src/routes/ai.route");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.config');

dotenv.config();

mongoose
    .connect(process.env.DB_CONNECT_STRING, {
        ssl: process.env.SSL === "true",
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const app = express();
const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(errorHandler);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
    })
);

app.use("/dev", developer);
app.use("/model", model);
app.use("/ai", ai);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
