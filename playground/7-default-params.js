const greeter = (name = 'pretty boy', age) => {
	console.log(`Hello ${name}👋, you're ${age}?`);
};

greeter('Matija', 21);
greeter(undefined, 22);
// greeter(process.argv[2]);
