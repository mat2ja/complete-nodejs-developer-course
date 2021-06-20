const getNotes = require('./notes.js');
const chalk = require('chalk');

console.log(chalk.red.bold.italic(getNotes()));
console.log(chalk.keyword('green')(getNotes()));
console.log(chalk.keyword('lightgreen').underline('great success!'));
console.log(
	chalk.inverse('woah im inversed woah', chalk.bgBlueBright('H.T.B'))
);
console.log(chalk.bgCyanBright.black('black panther'));
console.log(chalk.hex('#BADA55').bold('BADASS😎!'));
console.log(chalk.rgb(123, 45, 67)('reddish color'));

const pinkMsg = chalk.bgKeyword('pink').black('puhanic')
console.log(pinkMsg)