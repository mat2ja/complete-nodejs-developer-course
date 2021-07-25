console.log('client side javascript 💛');

const fetchWeather = async (query) => {
	const url = `http://localhost:3000/weather?address=${query}`;

	await fetch(url)
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
};

const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const location = search.value;
	fetchWeather(location);
	location.value = '';
});
