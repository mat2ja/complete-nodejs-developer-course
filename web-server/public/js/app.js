console.log('client side javascript 💛');

const fetchWeather = async (query) => {
	const url = `http://localhost:3000/weather?address=${query}`;

	await fetch(url)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				messageError.textContent = data.error;
				clearElement(messageSuccess);
			} else {
				messageSuccess.innerText = `${data.location}\n${data.forecast}`;
				clearElement(messageError);
			}
		})
		.catch((err) => {
			messageError.textContent = data.error;
			clearElement(messageSuccess);
		});
};

const clearElement = (elem) => (elem.textContent = '');

const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');

const messageSuccess = document.querySelector('#message-success');
const messageError = document.querySelector('#message-error');

weatherForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const location = search.value;
	await fetchWeather(location);
	search.value = '';
});
