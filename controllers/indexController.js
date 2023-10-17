// const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentModel");
const StudentModel = require("../models/studentModel");
const JobModel = require("../models/jobModel");
const InternshipModel = require("../models/internshipModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendTocken");
const { Sendmail } = require("../utils/nodemailer");
const path = require("path");

const imagekit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
	res.json({ message: "Hello from homepage" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id)
		.populate("jobs")
		.populate("internships")
		.exec();

	console.log(student);	
	res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
	console.log(req.body);
	const student = await new StudentModel(req.body).save();
	// res.status(201).json(student);
	sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
	const student = await Student.findOne({ email: req.body.email })
		.select("+password")
		.exec();

	console.log(student);

	if (!student)
		return next(
			new ErrorHandler("User not found with this Email address", 404)
		);

	const isMatch = student.comparepassword(req.body.password);
	if (!isMatch) return next(new ErrorHandler("Wrong Credintials", 500));

	// res.json(student);
	sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
	res.clearCookie("token");
	res.json({ message: "successfully signout" });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findOne({ email: req.body.email }).exec();

	if (!student)
		return next(
			new ErrorHandler("User not found with this Email address", 404)
		);

	const otp = Math.floor(Math.random() * 9000 + 1000);
	// console.log(otp);
	Sendmail(req, res, next, otp);
	student.resetPasswordToken = `${otp}`;
	// console.log(student.resetPasswordToken);
	await student.save();
	res.json({ message: "mail sent sucessfully check inbox/spam" });
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findOne({ email: req.body.email }).exec();

	if (!student)
		return next(
			new ErrorHandler("User not found with this Email address", 404)
		);

	if (student.resetPasswordToken == req.body.otp) {
		console.log(student.resetPasswordToken);
		student.resetPasswordToken = "0";
		console.log(student.resetPasswordToken);
		student.password = req.body.password;
		await student.save();
	} else {
		return next(
			new ErrorHandler("Invalid reset password link Please try again ", 500)
		);
	}

	res.status(200).json({
		message: "Password changed",
	});
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	student.password = req.body.password;
	await student.save();

	sendtoken(student, 201, res);
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
	await StudentModel.findByIdAndUpdate(req.params.id, req.body, {
		runValidators: true,
	}).exec();
	res.status(200).json({
		sucess: true,
		message: "Student details updated sucessfully",
	});
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.params.id).exec();
	const file = req.files.avatar;
	const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
		file.name
	)}`;

	if (student.avatar.fileId !== "") {
		await imagekit.deleteFile(student.avatar.fileId);
	}

	const { fileId, url } = await imagekit.upload({
		file: file.data,
		fileName: modifiedFileName,
	});

	student.avatar = { fileId, url };

	await student.save();

	res.status(200).json({
		sucess: true,
		message: "Profile Image Uploaded",
	});
});

exports.studentdelete = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const jobs = await JobModel.find().exec();
	const internships = await InternshipModel.find().exec();
	// console.log(jobs);

	jobs.forEach(async (job) => {
		job.students.forEach(async (studentId, idx) => {
			if (studentId.equals(student._id)) {
				// console.log(studentId, student._id, idx);
				job.students.splice(idx, 1);
				await job.save();
			}
		});
	});

	internships.forEach(async (internship) => {
		internship.students.forEach(async (studentId, idx) => {
			if (studentId.equals(student._id)) {
				// console.log(studentId, student._id, idx);
				internship.students.splice(idx, 1);
				await internship.save();
			}
		});
	});

	// console.log(jobs);
	// console.log(internships);
	await StudentModel.findByIdAndDelete(req.id).exec();
	res.json({ message: "Student's account Deleted!" });
});

// --------------read jobs -------------

exports.readalljobs = catchAsyncErrors(async (req, res, next) => {
	const jobs = await JobModel.find().exec();

	res.status(200).json({ jobs });
});

// --------------read internships -------------

exports.readallinternships = catchAsyncErrors(async (req, res, next) => {
	const internships = await InternshipModel.find().exec();

	res.status(200).json({ internships });
});

//--------------- apply internship ---------------

exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const internship = await InternshipModel.findById(
		req.params.internshipid
	).exec();

	student.internships.push(internship._id);
	internship.students.push(student._id);
	await student.save();
	await internship.save();
	res.json({ student, internship });
});

//--------------- apply job ---------------

exports.applyjob = catchAsyncErrors(async (req, res, next) => {
	const student = await StudentModel.findById(req.id).exec();
	const job = await JobModel.findById(req.params.jobid).exec();

	student.jobs.push(job._id);
	job.students.push(student._id);
	await student.save();
	await job.save();
	res.json({ student, job });
});
