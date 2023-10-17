require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

//DB connection
require("./models/database").connectDatabase();

// logger
const logger = require("morgan");
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
const cors = require("cors");
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
};
app.use(cors(corsOptions));

// session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.EXPRESS_SESSION_SECRET,
	})
);
app.use(cookieparser());

//express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

//routes
app.use("/", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));

// error handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middleware/errors");
app.all("*", (req, res, next) => {
	next(
		new ErrorHandler(
			`Requested Page ${req.url} is Unavailable at the moment `,
			404
		)
	);
});
app.use(generatedErrors);

app.listen(
	process.env.PORT,
	console.log(`Server running on port ${process.env.PORT}`)
);
