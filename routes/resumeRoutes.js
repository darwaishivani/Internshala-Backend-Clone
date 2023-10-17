const express = require("express");
const router = express.Router();

const {
	resume,
	addeducation,
	editeducation,
	deleteeducation,
	addjobs,
	editjobs,
	deletejobs,
	addinternship,
	editinternship,
	deleteinternship,
	addcourses,
	editcourses,
	deletecourses,
	addprojects,
	editprojects,
	deleteprojects,
	addskills,
	editskills,
	deleteskills,
	addresponsibility,
	editresponsibility,
	deleteresponsibility,
	addaccomplishments,
	editaccomplishments,
	deleteaccomplishments,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middleware/auth");

// GET /
router.get("/", isAuthenticated, resume);

//POST /add-education
router.post("/add-education", isAuthenticated, addeducation);

//POST  /edit-education/:eduid
router.post("/edit-education/:eduid", isAuthenticated, editeducation);

//POST  /delete-education/:eduid
router.post("/delete-education/:eduid", isAuthenticated, deleteeducation);

//POST /add-jobs
router.post("/add-jobs", isAuthenticated, addjobs);

//POST  /edit-jobs/:jobid
router.post("/edit-jobs/:jobid", isAuthenticated, editjobs);

//POST  /delete-jobs/:jobid
router.post("/delete-jobs/:jobid", isAuthenticated, deletejobs);

//POST /add-internship
router.post("/add-internship", isAuthenticated, addinternship);

//POST  /edit-internship/:internid
router.post("/edit-internship/:internid", isAuthenticated, editinternship);

//POST  /delete-internship/:internid
router.post("/delete-internship/:internid", isAuthenticated, deleteinternship);

//POST /add-responsibilities
router.post("/add-responsibilities", isAuthenticated, addresponsibility);

//POST  /edit-responsibilities/:respid
router.post(
	"/edit-responsibilities/:respid",
	isAuthenticated,
	editresponsibility
);

//POST  /delete-responsibilities/:respid
router.post(
	"/delete-responsibilities/:respid",
	isAuthenticated,
	deleteresponsibility
);

//POST /add-courses
router.post("/add-courses", isAuthenticated, addcourses);

//POST  /edit-courses/:courseid
router.post("/edit-courses/:courseid", isAuthenticated, editcourses);

//POST  /delete-courses/:courseid
router.post("/delete-courses/:courseid", isAuthenticated, deletecourses);

//POST /add-projects
router.post("/add-projects", isAuthenticated, addprojects);

//POST  /edit-projects/:projectid
router.post("/edit-projects/:projectid", isAuthenticated, editprojects);

//POST  /delete-projects/:jobid
router.post("/delete-projects/:projectid", isAuthenticated, deleteprojects);

//POST /add-skills
router.post("/add-skills", isAuthenticated, addskills);

//POST  /edit-skills/:skillsid
router.post("/edit-skills/:skillsid", isAuthenticated, editskills);

//POST  /delete-skills/:skillsid
router.post("/delete-skills/:skillsid", isAuthenticated, deleteskills);

//POST /add-accomplishments
router.post("/add-accomplishments", isAuthenticated, addaccomplishments);

//POST  /edit-accomplishments/:accomplishmentsid
router.post(
	"/edit-accomplishments/:accomplishmentsid",
	isAuthenticated,
	editaccomplishments
);

//POST  /delete-accomplishments/:accomplishmentsid
router.post(
	"/delete-accomplishments/:accomplishmentsid",
	isAuthenticated,
	deleteaccomplishments
);



module.exports = router;
