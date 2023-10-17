const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const StudentModel = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

exports.resume = catchAsyncErrors(async (req, res, next) => {
	const { resume } = await StudentModel.findById(req.id).exec();

	res.json({ message: "Secure Resume Page!", resume });
});

// education routes

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.education.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "Education Added!" });
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const { resume } = await StudentModel.findById(req.id).exec();
	const eduIndex = student.resume.education.findIndex(
		(i) => i.id === req.params.eduid
	);
	student.resume.education[eduIndex] = {
		...student.resume.education[eduIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "Education Updated!" });
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const { resume } = await StudentModel.findById(req.id).exec();
	const filterdeducation = student.resume.education.filter(
		(i) => i.id !== req.params.eduid
	);
	student.resume.education = filterdeducation;

	await student.save();
	res.json({ message: "Education Deleted!" });
});

// jobs route

exports.addjobs = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.jobs.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "jobs Added!" });
});

exports.editjobs = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const eduIndex = student.resume.jobs.findIndex(
		(i) => i.id === req.params.jobid
	);
	student.resume.jobs[eduIndex] = {
		...student.resume.jobs[eduIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "Jobs Updated!" });
});

exports.deletejobs = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdjobs = student.resume.jobs.filter(
		(i) => i.id !== req.params.jobid
	);
	student.resume.jobs = filterdjobs;

	await student.save();
	res.json({ message: "jobs Deleted!" });
});

// internship rountes

exports.addinternship = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.internships.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "internships Added!" });
});

exports.editinternship = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const eduIndex = student.resume.internships.findIndex(
		(i) => i.id === req.params.internid
	);
	student.resume.internships[eduIndex] = {
		...student.resume.internships[eduIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "internships Updated!" });
});

exports.deleteinternship = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdinternships = student.resume.internships.filter(
		(i) => i.id !== req.params.internid
	);
	student.resume.internships = filterdinternships;

	await student.save();
	res.json({ message: "internships Deleted!" });
});

// responsibilities route

exports.addresponsibility = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "responsibilities Added!" });
});

exports.editresponsibility = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const respIndex = student.resume.responsibilities.findIndex(
		(i) => i.id === req.params.respid
	);
	student.resume.responsibilities[respIndex] = {
		...student.resume.responsibilities[respIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "responsibilities Updated!" });
});

exports.deleteresponsibility = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdresponsibilities = student.resume.responsibilities.filter(
		(i) => i.id !== req.params.respid
	);
	student.resume.responsibilities = filterdresponsibilities;

	await student.save();
	res.json({ message: "responsibilities Deleted!" });
});

//courses

exports.addcourses = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.courses.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "courses Added!" });
});

exports.editcourses = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const courseIndex = student.resume.courses.findIndex(
		(i) => i.id === req.params.courseid
	);
	student.resume.courses[courseIndex] = {
		...student.resume.courses[courseIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "courses Updated!" });
});

exports.deletecourses = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdcourses = student.resume.courses.filter(
		(i) => i.id !== req.params.courseid
	);
	student.resume.courses = filterdcourses;

	await student.save();
	res.json({ message: "courses Deleted!" });
});

// projects

exports.addprojects = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.projects.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "projects Added!" });
});

exports.editprojects = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const projectIndex = student.resume.projects.findIndex(
		(i) => i.id === req.params.projectid
	);
	student.resume.projects[projectIndex] = {
		...student.resume.projects[projectIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "projects Updated!" });
});

exports.deleteprojects = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdprojects = student.resume.projects.filter(
		(i) => i.id !== req.params.projectid
	);
	student.resume.projects = filterdprojects;

	await student.save();
	res.json({ message: "projects Deleted!" });
});

//skills

exports.addskills = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.skills.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "Skills Added!" });
});

exports.editskills = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const skillIndex = student.resume.skills.findIndex(
		(i) => i.id === req.params.skillsid
	);
	student.resume.skills[skillIndex] = {
		...student.resume.skills[skillIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "Skills Updated!" });
});

exports.deleteskills = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdskills = student.resume.skills.filter(
		(i) => i.id !== req.params.skillsid
	);
	student.resume.skills = filterdskills;

	await student.save();
	res.json({ message: "Skills Deleted!" });
});

// accomplishments

exports.addaccomplishments = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: "accomplishments Added!" });
});

exports.editaccomplishments = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();
	const accomplishmentsIndex = student.resume.accomplishments.findIndex(
		(i) => i.id === req.params.accomplishmentsid
	);
	student.resume.accomplishments[accomplishmentsIndex] = {
		...student.resume.accomplishments[accomplishmentsIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: "accomplishments Updated!" });
});

exports.deleteaccomplishments = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	// const { resume } = await StudentModel.findById(req.id).exec();

	const filterdaccomplishments = student.resume.accomplishments.filter(
		(i) => i.id !== req.params.accomplishmentsid
	);
	student.resume.accomplishments = filterdaccomplishments;

	await student.save();
	res.json({ message: "accomplishments Deleted!" });
});


