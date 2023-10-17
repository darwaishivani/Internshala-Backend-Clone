exports.sendtoken = (role, statusCode, res) => {
	const token = role.getjwttoken();

	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		// secure:true,
	};

	res
		.status(statusCode)
		.cookie("token", token, options)
		.json({ sucess: true, id: role._id, token });
	
        // res.json({ token });
};
