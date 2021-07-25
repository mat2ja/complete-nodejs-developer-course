console.log('client side javascript 💛');

const clearElement = (elem) => (elem.textContent = '');
const setElement = (elem, content) => (elem.innerText = content);

const fetchWeather = async (query) => {
	const url = `http://localhost:3000/weather?address=${query}`;

	clearElement(messageSuccess);
	clearElement(messageError);
	setElement(messageLoading, 'Loading...');
	await fetch(url)
		.then((res) => res.json())
		.then((data) => {
			clearElement(messageLoading);
			if (data.error) {
				setElement(messageError, data.error);
			} else {
				setElement(messageSuccess, `${data.location}\n${data.forecast}`);
			}
		})
		.catch((err) => {
			clearElement(messageLoading);
			setElement(messageError, err);
		});
};

const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');

const messageSuccess = document.querySelector('#message-success');
const messageError = document.querySelector('#message-error');
const messageLoading = document.querySelector('#message-loading');

weatherForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const location = search.value;
	await fetchWeather(location);
	search.value = '';
});
