const nodmailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.Sendmail = (req, res, next, otp) => {
	const transport = nodmailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: process.env.MAIL_EMAIL_ADDRESS,
			pass: process.env.MAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: "Shiv Pvt Ltd.",
		to: req.body.email,
		subject: "Password Reset Link",
		"text": "Do not share this link to anyone",
		html: `<h1>Check below OTP to reset Password<h1/>\n${otp}`,
	};

	transport.sendMail(mailOptions, (err, info) => {
		if (err) return next(new ErrorHandler(err, 500));
		console.log(info);
		return res.status(200).json({
			message: "Mail sent Sucessfully",
			otp,
		});
	});
};
