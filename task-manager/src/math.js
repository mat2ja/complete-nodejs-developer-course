const calculateTip = (total, tipPercent = 0.15) => total + total * tipPercent;

module.exports = {
	calculateTip,
};
