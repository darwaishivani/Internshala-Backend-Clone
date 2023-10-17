const express = require("express");
const router = express.Router();

const {
	homepage,
	studentsignup,
	studentsignin,
	studentsignout,
	currentUser,
	studentsendmail,
	studentforgetlink,
	studentresetpassword,
	studentupdate,
	studentavatar,
	applyinternship,
	applyjob,
	studentdelete,
	readalljobs,
	readallinternships,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middleware/auth");

// GET /
router.get("/", homepage);

//POST /student
router.post("/student", isAuthenticated, currentUser);

//POST /student/signup
router.post("/student/signup", studentsignup);

//POST /student/signin
router.post("/student/signin", studentsignin);

//GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

//POST /student/send-mail
router.post("/student/send-mail", studentsendmail);

//GET  /student/forget-link/:studentid
router.post("/student/forget-link/", studentforgetlink);

//POST  /student/reset-password/:studentid
router.post(
	"/student/reset-password/:id",
	isAuthenticated,
	studentresetpassword
);

//POST  /student/update/:studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

//POST  /student/avtar/:studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

//GET  /student/delete/:studentid
router.get("/student/delete", isAuthenticated, studentdelete);

//--------------------Read jobs------------

//POST  /student/alljobs
router.post("/student/alljobs", isAuthenticated, readalljobs);

//--------------------Read jobs------------ 

//POST  /student/allinternships
router.post("/student/allinternships", isAuthenticated, readallinternships);

//------------------apply internship----------

//POST  /student/apply/internship:id
router.post(
	"/student/apply/internship/:internshipid",
	isAuthenticated,
	applyinternship
);

//------------------apply job---------------

//POST  /student/apply/job:id
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;
