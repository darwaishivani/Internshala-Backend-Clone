  const express = require("express");
const router = express.Router();

const {
	homepage,
	employesignup,
	employesignin,
	employesignout,
	currentemploye,
	employesendmail,
	employeforgetlink,
	employeresetpassword,
	employeupdate,
	employeavatar,
	createinternship,
	readinternship,
	readsingleinternship,
	readsinglejob,
	readjob,
	createjob,
	deleteemploye,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middleware/auth");

// GET /
router.get("/", isAuthenticated, homepage);

//POST /current
router.post("/current", isAuthenticated, currentemploye);

//POST /signup
router.post("/signup", employesignup);

//POST /signin
router.post("/signin", employesignin);

//GET /signout
router.get("/signout", isAuthenticated, employesignout);

//POST /send-mail
router.post("/send-mail", employesendmail);

//GET  /forget-link/
router.post("/forget-link/", employeforgetlink);

//POST  /reset-password/:employeid
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);

//POST  /update/:employeid
router.post("/update/:id", isAuthenticated, employeupdate);

//POST  /avtar/:employid
router.post("/avatar/:id", isAuthenticated, employeavatar);

//-----------Internship-------------

//POST  /employe/internship/create
router.post("/internship/create", isAuthenticated, createinternship);

//POST  /employe/internship/read
router.post("/internship/read", isAuthenticated, readinternship);

//POST  /employe/internship/read/:id
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);
module.exports = router;

//-----------Job-------------

//POST  /employe/job/create
router.post("/job/create", isAuthenticated, createjob);

//POST  /employe/job/read
router.post("/job/read", isAuthenticated, readjob);

//POST  /employe/job/read/:id
router.post("/job/read/:id", isAuthenticated, readsinglejob);

//GET  /employe/delete
router.get("/delete", isAuthenticated, deleteemploye);


module.exports = router;
