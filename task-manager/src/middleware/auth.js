const auth = async (req, res, next) => {
	console.log('ITS\'A ME A MIDDLEWARE');
	next();
};

export default auth;
