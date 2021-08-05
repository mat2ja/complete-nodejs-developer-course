const doWorkPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		Math.random() < 0.5 ? reject('Things went wrong') : resolve([7, 4, 1]);
	}, 1000);
});

// doWorkPromise
// 	.then((result) => console.log('Success:', result))
// 	.catch((error) => console.log('Error:', error));

const main = async () => {
	try {
		const result = await doWorkPromise;
		console.log('Success:', result);
	} catch (error) {
		console.log('Error:', error);
	}
};

main();
