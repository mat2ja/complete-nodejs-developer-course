console.log('client side javascript 💛');

const url = `http://localhost:3000/weather?address=mali losinj`;

fetch(url)
	.then((res) => res.json())
	.then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			console.log(data.location);
			console.log(data.forecast);
		}
	})
	.catch((err) => console.log(err));
