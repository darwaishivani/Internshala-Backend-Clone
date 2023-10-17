const { catchAsyncErrors } = require("../middleware/catchAsyncErrors");
const Employe = require("../models/employeModel");
const InternshipModel = require("../models/internshipModel");
const JobModel = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendTocken");
const { Sendmail } = require("../utils/nodemailer");
const path = require("path");
const imagekit = require("../utils/imagekit").initImageKit();

exports.homepage = catchAsyncErrors(async (req, res, next) => {
	res.json({ message: "Hello from Employe homepage" });
});

exports.currentemploye = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findById(req.id)
		.populate("jobs")
		.populate("internships")
		.exec();

	res.json({ employe });
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
	// res.json(req.body)
	const employe = await new Employe(req.body).save();
	// res.status(201).json(employe);
	sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findOne({ email: req.body.email })
		.select("+password")
		.exec();

	// console.log(employe);

	if (!employe)
		return next(
			new ErrorHandler("Employe not found with this Email address", 404)
		);

	const isMatch = employe.comparepassword(req.body.password);
	if (!isMatch) return next(new ErrorHandler("Wrong Credintials", 500));

	// res.json(employe);
	sendtoken(employe, 200, res);
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
	res.clearCookie("token");
	res.json({ message: "successfully signout" });
});

exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findOne({ email: req.body.email }).exec();

	if (!employe)
		return next(
			new ErrorHandler("User not found with this Email address", 404)
		);

	const otp = Math.floor(Math.random() * 9000 + 1000);

	Sendmail(req, res, next, otp);

	employe.resetPasswordToken = `${otp}`;

	await employe.save();

	res.json({ message: "mail sent sucessfully check inbox/spam" });
});

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findOne({ email: req.body.email }).exec();

	if (!employe)
		return next(
			new ErrorHandler("User not found with this Email address", 404)
		);
	if (employe.resetPasswordToken == req.body.otp) {
		employe.resetPasswordToken = "0";
		employe.password = req.body.password;
		await employe.save();
	} else {
		return next(
			new ErrorHandler("Invalid reset password link Please try again ", 500)
		);
	}
	res.status(200).json({
		message: "Password changed",
	});
});

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findById(req.id).exec();
	employe.password = req.body.password;
	await employe.save();

	sendtoken(employe, 201, res);
});

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
	await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
	res.status(200).json({
		sucess: true,
		message: "Student details updated sucessfully",
	});
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findById(req.params.id).exec();
	const file = req.files.oganizationlogo;
	const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
		file.name
	)}`;

	if (employe.oganizationlogo.fileId !== "") {
		await imagekit.deleteFile(employe.oganizationlogo.fileId);
	}

	const { fileId, url } = await imagekit.upload({
		file: file.data,
		fileName: modifiedFileName,
	});
	employe.oganizationlogo = { fileId, url };
	await employe.save();
	res.status(200).json({
		sucess: true,
		message: "Organization logo Uploaded",
	});
});

//-----------Internship-------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findById(req.id).exec();
	const internship = await new InternshipModel(req.body);
	internship.employe = employe._id;
	employe.internships.push(internship._id);
	await internship.save();
	await employe.save();
	res.status(201).json({ sucess: true, internship });
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
	const { internships } = await Employe.findById(req.id)
		.populate("internships")
		.exec();
	res.status(200).json({ sucess: true, internships });
});

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
	const internship = await InternshipModel.findById(req.params.id).exec();
	// if(!internship) return new ErrorHandler("Internship Not found");
	res.status(200).json({ sucess: true, internship });
});

//-----------Jobs-------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findById(req.id).exec();
	const job = await new JobModel(req.body);
	job.employe = employe._id;
	employe.jobs.push(job._id);
	await job.save();
	await employe.save();
	res.status(201).json({ sucess: true, job });
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
	const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
	res.status(200).json({ sucess: true, jobs });
});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
	const job = await JobModel.findById(req.params.id).exec();
	// if(!job) return new ErrorHandler("Internship Not found");
	res.status(200).json({ sucess: true, job });
});

// -------------delete Employee---------

exports.deleteemploye = catchAsyncErrors(async (req, res, next) => {
	const employe = await Employe.findById(req.id).exec();
	const job = await JobModel.find().exec();
	const internship = await InternshipModel.find().exec();

	console.log(job);

	job.forEach(async (job) => {
		if (job.employe.equals(employe._id)) {
			// console.log(job.employe, employe._id);
			// job.remove();
			job.deleteOne();
		}
	});

	internship.forEach(async (internship) => {
		if (internship.employe.equals(internship._id)) {
			// console.log(internship.employe, employe._id);
			internship.deleteOne();
		}
	});

	await Employe.findByIdAndDelete(req.id).exec();

	res.json({ message: " Employe Deleted" });
});
