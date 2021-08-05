const doWorkPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		Math.random() < 0.5 ? reject('This is my error') : resolve([7, 4, 1]);
	}, 2000);
	console.log('outside timeout');
});

doWorkPromise
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
