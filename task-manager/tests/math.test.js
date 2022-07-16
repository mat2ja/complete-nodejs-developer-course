const {
	calculateTip,
	fahrenheitToCelsius,
	celsiusToFahrenheit,
} = require('../src/math.js');

test('Should calculate total with tip', () => {
	const total = calculateTip(10, 0.3);
	expect(total).toBe(13);
});

test('Should calculate total with default tip', () => {
	const total = calculateTip(10);
	expect(total).toBe(12.5);
});

test('Should convert F to C', () => {
	const temp = fahrenheitToCelsius(32);
	expect(temp).toBe(0);
});

test('Should convert C to F', () => {
	const temp = celsiusToFahrenheit(0);
	expect(temp).toBe(32);
});
