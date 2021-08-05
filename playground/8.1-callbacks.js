const doWorkCallback = (callback) => {
	setTimeout(() => {
		Math.random() < 0.5
			? callback('This is my error')
			: callback(undefined, [1, 4, 7]);
	}, 2000);
};

doWorkCallback((error, result) => {
	if (error) {
		return console.log(error);
	}
	console.log(result);
});
