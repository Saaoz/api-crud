const dotenv = require("dotenv");

dotenv.config();

// first step (1)

const express = require("express");
const { default: mongoose } = require("mongoose");

const port = 8000;
//add this after fix error or crash coming
const cors = require("cors");
const app = express();

//import router (3)

	const router = require("./router");
//add bcs error "TypeError: Cannot read properties of undefined"
	app.use(cors());

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));


// add a middleware after u create router.js (2)

	app.use(router);


app.listen(port, async () => {
	console.log(`server up on port ${port}`);
});


//connecting our app to MongoDB (4) 
//but before create ur API on MONGODB and create .env to create MONGODBURL

mongoose
	.connect(process.env.MONGODB_URL, {
   		useNewUrlParser: true,
    	useUnifiedTopology: true,
	})
	.then(() => {
    	console.log("Connected to MongoDB");
	})
	.catch((err) => {
    	console.log(err);
	});
	